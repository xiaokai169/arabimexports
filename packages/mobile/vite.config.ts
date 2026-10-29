import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
/** 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示 */
import { name, version, dependencies, devDependencies } from './package.json'

const __APP_INFO__ = {
  pkg: { name, version, dependencies, devDependencies },
  buildTimestamp: Date.now()
}

/** 本应用源码根目录 */
const srcDir = fileURLToPath(new URL('./src', import.meta.url))
/** 共享层：与 pc / mobile 同级的 packages/shared */
const sharedSrc = fileURLToPath(new URL('../shared/src', import.meta.url))
const sharedImg = fileURLToPath(new URL('../shared/assets/img', import.meta.url))
const sharedFonts = fileURLToPath(new URL('../shared/assets/fonts', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  // 移动端与 PC 端同域名部署，靠 User-Agent 分流：
  //   https://www.arabimexports.org/      → PC 版
  //   https://www.arabimexports.org/m/    → 移动版
  // 若改回独立子域名部署（m.arabimexports.org 根目录），把生产 base 改回 '/'
  //
  // 开发环境用 '/'：dev 下两端是两个端口的两个服务，并没有同域名的 /m/ 目录，
  // 带着 '/m/' 前缀开发会让 localhost:5174/arabFund 这类深链直接 404。
  // router 读的是 import.meta.env.BASE_URL，会自动跟着切换，无需额外改动。
  //
  // 注意必须排除 isPreview：`vite preview` 的 command 同样是 'serve'，
  // 只判 command 会让 preview 用 '/'，而 dist/index.html 里写的是 '/m/assets/…'，
  // 对不上就会退化成 SPA fallback 返回 text/html，模块脚本被 MIME 校验拦下 → 白屏。
  base: command === 'build' || isPreview ? '/m/' : '/',
  plugins: [vue(), vueJsx()],
  server: {
    host: true,
    port: 5174
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.vue'],
    // 数组形式按顺序匹配，越具体的规则必须越靠前
    alias: [
      // 共享静态资源 —— 图片与字体均在 packages/shared/assets
      { find: /^@\/assets\/img\//, replacement: `${sharedImg}/` },
      { find: /^@\/assets\/fonts\//, replacement: `${sharedFonts}/` },
      // 共享代码层（i18n 语言包、静态数据、枚举）
      { find: /^@shared\//, replacement: `${sharedSrc}/` },
      // 应用自身源码，放最后兜底
      { find: /^@\//, replacement: `${srcDir}/` }
    ]
  },
  build: {
    sourcemap: false
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__)
  }
}))
