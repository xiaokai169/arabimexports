# arabimexports

阿拉伯进出口商联合会官网（Council of Arab Economic Unit / Arab Exporter & Importer Union）。

**PC 端与移动端同仓管理**：一个仓库、一套共享资源、两条构建命令。

---

## 为什么是两个 dist？

合并的是**代码仓库**，不是**构建产物**。

| | PC 端 | 移动端 |
|---|---|---|
| UI 库 | layui-vue + Bootstrap | Vant |
| 布局 | 1200px 定宽容器 | 375 定宽 + 安全区 |
| 目标 | 桌面浏览器 | 手机浏览器 |

两套 UI 库不能打进同一个包（体积翻倍、样式互相打架），所以**仍然是两个构建产物**。但对用户完全无感——访问同一个域名，服务端按 User-Agent 分流。

```
https://www.arabimexports.org/          → 电脑访问     → PC 版
https://www.arabimexports.org/arabFund  → 电脑访问     → PC 版
https://www.arabimexports.org/          → 手机访问     → 移动版（URL 不变）
https://www.arabimexports.org/          → 平板访问     → 移动版（URL 不变）
```

> 判定细则见下方[设备分流规则](#设备分流规则)。平板归移动端是后来的决定，早先是归 PC 端的。

> 合并前 PC 端是跳转到独立子域名 `m.arabimexports.org`，现已改为同域名。

---

## 目录结构

```
arabimexports/
├── package.json              # 工作区根（scripts / patchedDependencies）
├── pnpm-workspace.yaml
├── deploy/
│   └── .htaccess             # 同域名 UA 分流配置（Hostinger / Apache）
├── scripts/
│   └── assemble-dist.mjs     # 把两端产物组装成一个「拿来即传」的 dist/
└── packages/
    ├── shared/               # ★ 共享层：两端相同的内容只写一次
    │   ├── assets/
    │   │   ├── img/          # 296 张图片（PC 全量 283 + 移动端独有 13）
    │   │   └── fonts/        # Air_Strip_Arabic.ttf
    │   └── src/
    │       ├── data/         # Presideency.ts（49KB 富文本）、arabFund.ts
    │       ├── enums/        # LanguageEnum（两端统一命名）
    │       └── lang/package/ # arabic.ts / en.ts（PC 超集，264/263 个 key）
    ├── pc/                   # PC 端（layui-vue + Bootstrap）
    │   └── src/
    │       ├── assets/img/   # 空（图片已全部迁至 shared）
    │       ├── lang/package/ # 仅剩 zh.ts（未启用）
    │       └── views/        # 全部页面与板块组件
    └── mobile/               # 移动端（Vant）
        └── src/
            ├── assets/img/   # 仅 logo_001/002.png（压缩版，见下方「已知冲突」）
            └── lang/package/ # mobile-ar.ts / mobile-en.ts（移动端专属文案）
```

---

## 共享边界

**放进 `shared/` 的判断标准：内容完全一致，或一端是另一端的严格超集。**

| 内容 | 处理 | 依据 |
|---|---|---|
| 图片 296 张 | 全部进 shared | 同名 135 张中 133 张字节完全相同，6 个子目录完全一致 |
| 字体 | 进 shared | 两端 MD5 相同 |
| `Presideency.ts` / `arabFund.ts` | 进 shared | 两端逐字节相同 |
| i18n `arabic.ts`/`en.ts` | 用 PC 版（超集） | PC 264 key ⊃ 移动端 43 key，移动端零独有 key |
| 移动端专属 6 个 key | 留在 mobile | `countryDetails`/`activePage`/`home_intro`/`menu_placeholder`/`back_to_top`/`back`，与 PC 零冲突 |
| `LanguageEnum` | 进 shared 并统一命名 | 原来 PC 是 `arab`、移动端是 `ARAB`，现统一为 `ARAB` |
| 页面、板块组件、样式、router、store | 各自保留 | 布局与交互差异大，共享收益低于改造成本 |

**解析方式**：各应用 `vite.config.ts` 里用别名数组指向 shared（越具体的规则越靠前），因此**业务代码里一行 import 都不用改**：

```ts
alias: [
  { find: /^@\/assets\/img\//,   replacement: `${sharedImg}/` },
  { find: /^@\/assets\/fonts\//, replacement: `${sharedFonts}/` },
  { find: /^@shared\//,          replacement: `${sharedSrc}/` },
  { find: /^@\//,                replacement: `${srcDir}/` }
]
```

---

## 已知冲突与处理

### 1. `logo_001.png` / `logo_002.png` 同名但内容不同

PC 端是 94KB / 123KB，移动端是压缩过的 4.5KB / 4.5KB。**不能简单合并**。

处理：shared 里放 PC 版，移动端 `src/assets/img/` 保留自己的压缩版，并在 vite 别名里**显式覆盖**（必须排在共享规则之前）：

```ts
{ find: '@/assets/img/logo_001.png', replacement: `${srcDir}/assets/img/logo_001.png` },
```

### 2. PC 端 `HomeView.vue` 的动态 `new URL` —— 迁移中最容易踩的坑

PC 端原写法：

```js
const getImagePath = (name) => new URL(`../assets/img/${name}`, import.meta.url).href
```

**这是相对路径**，指向 `pc/src/assets/img/`。图片搬到 `shared/` 后该目录已空，而 Vite 对带变量的 `new URL` **只做目录扫描、不报错**，于是构建时**静默丢掉 93 个资源**——没有任何警告，只有对比新旧 dist 才会发现。

已改为 `import.meta.glob('@/assets/img/*.{...}')` + 按文件名建索引（glob 支持 `@` 别名）。

注意两点：
- **扩展名大小写都要列**：仓库里确实存在 `photo_00x.JPG` 这类大写后缀，而 glob 区分大小写。
- 副作用：该 glob 会扫描**全部顶层图片**，因此 PC 端构建产物里会含 12 张只有移动端用的图（合计约 1MB / 76MB，1.3%）。这是复刻原行为的代价，可接受。

> 移动端没有这个问题——它的 `HomeView.vue` 里有一段注释，说明当初就特意改成了静态 import。

**排查手法**：任何"图片/资源迁移"类改动，都要拿新旧 `dist` 做一次文件名集合对比（去掉 hash 后 `comm`），不能只看构建是否成功。

### 3. `assets/data.ts` 两端同名但已分叉

PC 的 `url` 走远程域名 `http://file.arab-alabo.com/...`，移动端改成了本地 `import` 国旗图（该远程域名已不可访问）。

处理：**没有合并**，两端各自保留自己的 `src/assets/data.ts`。如果以后要统一，应先把 PC 端也改成本地 import。

---

## 设备分流规则

**手机和平板 → 移动端，只有电脑 → PC 端。**

判定分散在**两层**，必须同步修改，否则会出现「服务端送 PC、客户端又弹回移动端」的打架：

| 层 | 位置 | 作用 |
|---|---|---|
| 服务端（主） | `deploy/.htaccess` 第 2 节 | 302 重定向，保留原路径。**只能覆盖 UA 能分辨的两类**：手机、安卓平板 |
| 客户端（兜底） | `packages/pc/index.html` 内联脚本 | 服务端认不出的那几类（iPad、折叠屏桌面模式）只能在这层兜 |

两层拆规则的方式不同：`.htaccess` 拆成「手机（2a）」和「安卓平板（2b）」两条；JS 里则是五个布尔量（`isPhone` / `isLegacyIPad` / `isAndroidTablet` / `isModernIPad` / `isDesktopModeAndroid`）取或。

其中 `isModernIPad` 和 `isDesktopModeAndroid` **在服务端没有对应规则，也不该有**——它们的 UA 特征与真 Mac / 真 Linux 桌面**逐字节相同**，服务端一认就会误伤一大片正常桌面访客。这类设备因此会先落到 PC 页面、再由 JS 跳走，**首屏闪一下是必然代价**，无法消除。

### 判定矩阵

| 设备 | 判定条件 | 去向 |
|---|---|---|
| iPhone / iPod | UA `iphone\|ipod` | 移动端 |
| 安卓手机 | UA 有 `Android` **且有** `Mobile` | 移动端 |
| 其他手机 | `windows phone\|blackberry\|webos\|iemobile\|opera mini` | 移动端 |
| 安卓平板 | UA 有 `Android` **且无** `Mobile` | 移动端 |
| 老 iPad（iPadOS 12-） | UA 里直接写 `iPad` | 移动端 |
| **iPad（iPadOS 13+）** | **客户端 JS**：UA `Macintosh` **且** `maxTouchPoints > 1` | 移动端 |
| **折叠屏 / 安卓平板（Chrome 桌面模式）** | **客户端 JS**：UA `X11; Linux` **且** `maxTouchPoints > 1` | 移动端（先闪一下 PC 版） |
| 电脑（Win / Mac / Linux / ChromeOS） | 其余全部 | PC |
| 触屏 Windows（Surface） | UA 与普通 PC 无区别 | PC（有键盘鼠标，按市面惯例） |

> **`Mobile` 这个通用标记不能漏**。安卓手机的 UA 是 `Android ... Mobile`，安卓平板则没有 `Mobile`；而 `isPhone` 若不显式包含 `Mobile`，安卓手机会两条都不沾（不是平板、也不被认作手机），直接掉进 PC。这个坑在矩阵测试里真实触发过一次。

### 平板宽度：不做额外处理（有意识的取舍）

移动端是 px 写死 + `width=device-width`，没有宽度上限容器。所以平板上的「自适应」实际表现是**随 flex 拉伸**而非重排——iPad 上元素间距会变大。

曾评估过给根容器加 `max-width` 兜底（640 / 768 两档都考虑过），**决定不加**，先按现有自适应行为上线看真实平板流量。若日后要加，只需在 `packages/mobile/src/assets/main.css` 给根容器一个 `max-width` 即可，对手机无影响（本就窄于任何合理阈值）。

### iPad 是个死结：服务端做不到

iPadOS 13 起，**iPad 的 UA 与 Mac 逐字节相同**，这是 Apple 有意为之——它连 Apple Silicon 的 Mac 也一并锁在 `Macintosh; Intel Mac OS X 10_15_7`。所以服务端**没有任何办法**分辨 iPad 和 Mac。

唯一可用的信号是客户端的 `navigator.maxTouchPoints`：Mac 报 `0`，iPad 报 `5`。

代价（无法消除，需接受）：
- **首屏会闪一下**——iPad 先落到 PC 页面，再由 JS 跳走。服务端拿不到触点数，无解。
- **禁用 JS 的 iPad** 会留在 PC 版，占比极低。

> `Macintosh` 与 `maxTouchPoints > 1` **必须同时满足**。只看触点数会误伤触屏 Windows 笔记本——Surface 的 `maxTouchPoints` 是 `10`，但它的 UA 是 `Windows NT`，靠 `Macintosh` 这一半挡住。

### 折叠屏：**分浏览器**，别只看「展开去掉 Mobile」那条老经验

「三星折叠屏展开时会主动去掉 `Mobile` 标记」这个说法流传很广——确实有出处，见 [Samsung UA 格式文档](https://developer.samsung.com/internet/user-agent-string-format.html) 的 `UX_RECOMMEND` 字段。但它**只对三星浏览器成立**：

```
三星浏览器  折叠：… (Linux; Android 14; SM-F946B) … Mobile Safari/537.36
三星浏览器  展开：… (Linux; Android 13; SM-F936N) … Safari/537.36    ← 去掉 Mobile，落进 2b
```

**Chrome 走的是完全不同的一套。** 它把折叠屏整体判定为大屏设备（>= 600dp）、**默认开启「请求桌面版网站」**，UA 直接换成：

```
Chrome  折叠 / 展开：Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/… Chrome/… Safari/…
                     ↑ Android 和 Mobile 两个标记一起消失，与真 Linux 桌面逐字节相同
```

于是 `.htaccess` 两条规则都不命中，`isPhone` / `isAndroidTablet` 也全部落空——**折叠屏会一直停在 PC 版**（实测：折叠态、展开态都一样，Chrome 对折叠屏是按设备判定、不随折叠状态切换的）。

这条**服务端补不了**：`X11; Linux x86_64` 与真 Linux 桌面无法区分，在服务端认它等于把所有 Linux 桌面访客一起误送进 `/m/`。所以折叠屏和 iPad 一样只能放在客户端 JS 里兜——靠 `navigator.maxTouchPoints`（桌面模式下它仍是 5；Windows 触屏本是 `Windows NT`，走不到这条）：

```js
var isDesktopModeAndroid = /X11; Linux/i.test(ua) && navigator.maxTouchPoints > 1;
```

> **关于大屏上的拉伸**：折叠屏和平板本来就被当作移动端送过去，而移动端是 px 写死 + 自适应拉伸，所以它们在 `/m/` 上元素间距会偏大。这是有意识的取舍，见上文「平板宽度：不做额外处理」一节。
>
> 曾试过给 `#app` 加 `max-width: 640px` 居中来收窄，**已回退**。真机上确实有效，但桌面浏览器打开 `/m/`（开发时预览移动端的主要方式）只要窗口宽于 640px，页面就缩成中间一条窄栏、两边留出大片留白，比拉伸更碍事。要再加请先想清楚预览体验怎么办。

### 明确不采用的方案

| 方案 | 为什么不用 |
|---|---|
| `Sec-CH-UA-Form-Factors`（客户端提示） | 仅 Chrome 124+ 支持，Safari / Firefox 完全不支持，实验性非 Baseline，还需 `Accept-CH` + 二次请求 |
| CSS 折叠屏 API（`horizontal-viewport-segments` / `device-posture`） | Chrome 起源试用阶段，非 Baseline，不能上生产 |
| 折叠屏**型号名**匹配（维护 `SM-F9xx` 清单） | 不可持续；且 Chrome 桌面模式下连型号都不发了，清单根本匹配不到 |
| 服务端匹配 `X11; Linux x86_64`（认折叠屏） | 会误伤**全部 Linux 桌面访客**，把他们一起送进 `/m/` |

### 已知误判

- **安卓 TV**（如 `SHIELD Android TV`）有 `Android` 无 `Mobile`，会被当成平板送去移动端。B2B 站点这类流量可忽略，不修。
- **Linux 触屏设备**（桌面 Linux + 触摸屏，极罕见）会被 `isDesktopModeAndroid` 判成折叠屏送去移动端。真 Linux 桌面报 `maxTouchPoints = 0`，只有带触摸屏的才中招，权衡后接受。

### 怎么验证

`.htaccess` 在 Windows 上跑不了，本地验证只能靠把真实 UA 串喂给同一套正则。矩阵测试覆盖 13 条真实 UA + 3 项回归（静态资源不重定向 / 已在 `/m/` 下不套娃 / cookie 防死循环）。

部署后仍需**真机**验证，重点三条：

1. 安卓平板 → 移动端（**本次改动的核心，旧规则在这里是 PC**）
2. **iPad 真机** → 移动端（不要只用 Chrome 的 UA 模拟——模拟器给不出 `maxTouchPoints = 5`，测不到这条）
3. **三星折叠屏真机，用 Chrome**（不是三星浏览器）→ 移动端。折叠态和展开态都要试——Chrome 对两种状态都发桌面 UA
4. 触屏 Windows 笔记本 → PC（确认没被误伤）

---

## URL 约定：不出现 `#`

全站用 **history 模式**，地址栏里**不允许出现 `#`**。这不是随手定的——`#` 之后的内容**浏览器不会发给服务器**，一旦用了 hash，`.htaccess` 的 UA 分流和两端的 history fallback 会**同时失效**。

现状已满足（全仓库核查过）：

| 检查项 | 现状 |
|---|---|
| 路由模式 | 两端都是 `createWebHistory`；产物里 `createWebHashHistory` **0 处** |
| 锚点链接 | 无 `href="#…"` |
| 带 `#` 的跳转 | 无 `router.push` / `replace` 带 `#` |
| 高德地图 | 依赖与 vite 代理**均未实际使用**（从未 import，产物 0 处），是模板残留，不会引入 `#` |

**以后新增代码时注意：**

1. **别把路由切成 hash 模式**（`createWebHashHistory`）——理由见上，会同时废掉服务端分流和 fallback。
2. **别用 `href="#"` 当占位**——它会跳回页首并把 `#` 写进地址栏。改用 `<button type="button">`，或去掉 `href` 只留 `@click`。
3. **拼接跳转 URL 时不要带 `#`**。

> **关于重定向**：`packages/pc/index.html` 里拼的是 `location.pathname + location.search`，**有意不带 `location.hash`**——正好符合本条约定，别把它"补全"成拼 hash。站内本来也没有锚点，不存在信息丢失。
>
> `#` 出现在别处是正常的：CSS 颜色值（`#fff`）、`app.mount('#app')`、SVG sprite 的 symbol id（`#icon-xxx`）、SCSS 的 id 选择器（`#container`）。这些都不进地址栏。

---

## 常用命令

```bash
pnpm install          # 在仓库根执行

pnpm dev:pc           # PC 端开发服务器  http://localhost:5173
pnpm dev:mobile       # 移动端开发服务器 http://localhost:5174/m/

pnpm build            # ★ 两端一起构建 + 组装 → dist/（拿来即传）
pnpm build:pc         # 只构建 PC → packages/pc/dist，并组装出**只含 PC** 的 dist/
pnpm build:mobile     # 只构建移动端 → packages/mobile/dist，并组装
pnpm assemble         # 只重新组装 dist/，不重新构建

pnpm type-check       # 两端类型检查
```

---

## 部署（Hostinger）

```bash
pnpm build        # 两端构建 + 组装，产出 dist/
```

然后把 **`dist/` 里的内容整个**上传到 `public_html/`。就这一步。

`dist/` 的结构**就是** `public_html/` 的结构，不用再进子目录挑东西：

```
dist/                     ← 整个上传到 public_html/
├── .htaccess             ← 从 deploy/ 自动拷进来
├── index.html            ← PC
├── assets/               ← PC
├── favicon.ico           ← PC
└── m/                    ← 移动端（整个 packages/mobile/dist）
    ├── index.html
    └── assets/
```

### 关于组装

组装由 `scripts/assemble-dist.mjs` 完成，**每次都先清空 `dist/` 再重建**，所以不会残留上一次的 hash 资源。

以前这一步是手工做的（分别上传到根和 `m/`），有三个坑，现在都没了：

| 以前 | 现在 |
|---|---|
| 3 个手工上传目标，容易传错位置（比如把 `pc/dist` 传成 `public_html/dist/`） | 一个文件夹，一次拖拽 |
| 传完 PC、还没传移动端的窗口期，站点处于「新 PC + 旧移动端」的不一致状态 | 一次上传，结构天然一致 |
| 411 个文件挨个 FTP | 可以整个打包成 zip 上传后解压，省掉逐文件握手的开销 |

> **`build:pc` / `build:mobile` 也会组装，但产出的是残缺的 `dist/`**（缺另一端），
> 脚本会打一段显眼的警告。那份**不要**传——缺的那端访客会被 302 到不存在的 `/m/`，
> 整类设备直接打不开。完整发布一律用 `pnpm build`。
>
> 另外注意 `build` 里写的是 `pnpm --filter ...` 而不是复用 `build:pc`/`build:mobile`：
> 因为那两个现在各自都会组装，复用的话会把 126MB 连拷三遍。

### 若要改回独立子域名部署

移动端在 `m.arabimexports.org` 根目录时，把 `packages/mobile/vite.config.ts` 里的 `base` 从 `'/m/'` 改回 `'/'`，并去掉 `.htaccess` 的分流规则。

---

## 后续可做的事（本次未做）

1. **清理 PC 端的 admin 模板残留**——`settings.ts` 里的 `tagsView`/`fixedHeader`/`sidebarLogo`/`watermarkEnabled`、`vite.config.ts` 里的 `DevUiResolver`（本项目不用 DevUI）、`tsconfig` 里不存在的 `mock/**`、`App.vue` 的无用样式，均为模板遗留，当前无实际作用。
2. **抽取硬编码的外部域名**——`http://file.arab-alabo.com`（24 处）、`https://files.arab-bee.com`（6 处）、`http://api.arab-alabo.com` 散落在组件里，建议收拢到 `shared/src/constants`。
3. **统一 localStorage 直读**——`arabFund.vue`、`generalSecretary.vue`、`imgBox.vue` 等绕过 Pinia store 直接 `localStorage.getItem('language')`，应统一走 `useAppStore`。
4. **移动端 Vant 按需引入**——目前是 `app.use(Vant)` 全量引入，但模板里**实际 0 个 `van-*` 组件**，主包 1.09MB（gzip 357KB）纯空载，可移除或改按需。
5. **加「访问电脑版 / 手机版」切换入口**——`.htaccess` 已预留 `site_version` cookie 分支，只差页面上的链接。**接入口时必须注意死循环**：iPad 是靠 JS 的 `maxTouchPoints` 认出来的，如果用户在 iPad 上选了「电脑版」，JS 会把他弹回 `/m/`，而 `.htaccess` 又按 cookie 把他弹回 PC，来回无限重定向。`packages/pc/index.html` 里已有 `preferPC` 判断挡着这件事，加链接时别把那一行删了。
6. **抽取两端近似的组件**——`VideoPlay.vue`(PC) / `VideoPlayer.vue`(移动端) 都是基于 hls.js 的播放器，`RichText.vue` 与 PC 的 `vue-dompurify-html` 用途相近，可考虑合并。
7. **PC 端 `src/directive/` 与 `components/skeleton/` 是死代码**——`main.ts` 里 `registerDirectives(app)` 已被注释，确认无用后可删除。
