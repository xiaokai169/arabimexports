#!/usr/bin/env node
/**
 * 把两个端的构建产物组装成一个「拿来即传」的目录。
 *
 * 为什么需要这一步：
 *   PC 端和移动端必须分成两个 build（UI 库不兼容、base 路径不同），
 *   但**部署时的目录结构是合在一起的**——PC 铺在 public_html/ 根，
 *   移动端整个放进 public_html/m/。这个结构以前靠人手拼，
 *   于是就有了「传完 PC 再钻进 mobile/dist 传第二个」和
 *   「不小心传成 public_html/dist/」这类问题。
 *   这一步就是把手工拼接变成构建产出。
 *
 * 产物结构（= public_html/ 的结构）：
 *   dist/
 *   ├── .htaccess      ← 从 deploy/ 拷进来
 *   ├── index.html     ← packages/pc/dist
 *   ├── assets/        ← packages/pc/dist
 *   ├── favicon.ico    ← packages/pc/dist
 *   └── m/             ← packages/mobile/dist 整个
 *       ├── index.html
 *       └── assets/
 *
 * 每次组装都会**先清空 dist/**，避免上一次的 hash 资源残留。
 */

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repo = join(here, '..')

const PC_DIST = join(repo, 'packages', 'pc', 'dist')
const MOBILE_DIST = join(repo, 'packages', 'mobile', 'dist')
const HTACCESS = join(repo, 'deploy', '.htaccess')
const OUT = join(repo, 'dist')

// --- 小工具 -----------------------------------------------------------------

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

function statsOf(dir) {
  if (!existsSync(dir)) return null
  const files = walk(dir)
  const bytes = files.reduce((sum, f) => sum + statSync(f).size, 0)
  // index.html 的 mtime 就是这次构建的时间
  const idx = join(dir, 'index.html')
  const builtAt = existsSync(idx) ? statSync(idx).mtime : null
  return { count: files.length, bytes, builtAt }
}

function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

function stamp(d) {
  if (!d) return '时间未知'
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

// --- 组装 -------------------------------------------------------------------

const pc = statsOf(PC_DIST)
const mobile = statsOf(MOBILE_DIST)

if (!pc && !mobile) {
  console.error('\n❌ 两端都没有构建产物，没什么可组装的。')
  console.error('   先跑：pnpm build\n')
  process.exit(1)
}

// 先清空，防止上一次的旧 hash 资源残留（那些文件名带 hash，不会被覆盖）
rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

if (pc) cpSync(PC_DIST, OUT, { recursive: true })
if (mobile) cpSync(MOBILE_DIST, join(OUT, 'm'), { recursive: true })

if (existsSync(HTACCESS)) cpSync(HTACCESS, join(OUT, '.htaccess'))
else console.error('⚠️  没找到 deploy/.htaccess —— 产物里会缺分流配置！')

// --- 报告 -------------------------------------------------------------------

const total = statsOf(OUT)
const row = (mark, label, s) =>
  console.log(
    `  ${mark} ${label.padEnd(8)} ${s ? `${String(s.count).padStart(4)} 个文件  ${mb(s.bytes).padStart(8)}  (构建于 ${stamp(s.builtAt)})` : '缺失'}`
  )

console.log(`\n组装完成 → ${relative(repo, OUT) || 'dist'}\n`)
console.log('  包含：')
row(pc ? '✅' : '❌', 'PC 端', pc)
row(mobile ? '✅' : '❌', '移动端', mobile)
console.log(`  ${existsSync(join(OUT, '.htaccess')) ? '✅' : '❌'} .htaccess`)

console.log(`\n  合计 ${total.count} 个文件，${mb(total.bytes)}`)

// 残缺的产物不能单独上传——手机和平板会被 302 到不存在的 /m/，整类设备直接 404。
// 所以要吵，别让它悄悄过。
if (!pc || !mobile) {
  const missing = [!pc && 'PC 端', !mobile && '移动端'].filter(Boolean).join(' 和 ')
  console.log('')
  console.log(`  ⚠️  产物不完整，缺 ${missing}。`)
  console.log('     这份**不能**上传：缺少的那端访客会直接打不开。')
  console.log('     要完整发布请运行：pnpm build')
}

console.log(`\n上传：把 dist/ 里的内容整个传到 public_html/\n`)

// 残缺产物只警告不报错：单独构建某一端是正常的开发动作，
// 不能让 build:pc 因为「移动端还没构建」就失败。
// 真正拦住误传的是上面那段警告。
