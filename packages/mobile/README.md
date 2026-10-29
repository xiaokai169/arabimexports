# test_admin_mobile

「阿拉伯进出口商业联合会」官网的**移动端（H5）**，与桌面端 `../test_admin` 配套。

设计依据：Figma「阿拉伯进出口商业联合会--Copy-」中的移动端首页（node `4094:13`，375×812）。

## 技术栈

| 项 | 选择 |
| --- | --- |
| 框架 | Vue 3.4（Composition API + `<script setup>`） |
| 构建 | Vite 5 |
| 语言 | TypeScript |
| 路由 | Vue Router 4 |
| 状态 | Pinia（+ `@vueuse/core` 持久化） |
| 国际化 | Vue I18n 9（阿拉伯语 / 英语） |
| UI | Vant 4（按需交互组件）+ 自写 SCSS（视觉还原设计稿） |
| 视频 | hls.js（播放联盟的 m3u8 直播/点播源） |

## 启动

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # 类型检查 + 构建到 dist/
npm run preview    # 预览构建产物
```

## 目录结构

```
src/
├── assets/
│   ├── base.css          主题色/字体/RTL，与桌面端保持一致
│   ├── main.css          全局样式 + Vant 主题色覆盖
│   ├── page.scss         二级页面通用骨架样式
│   ├── data.ts           区域办事处国家数据（国旗已改为本地图片）
│   ├── fonts/            阿拉伯文字体 Air_Strip_Arabic
│   └── img/              图片资源（从桌面端复用）
├── components/
│   ├── AppHeader.vue     顶栏：双 Logo + 双标题 + 语言切换
│   ├── VideoPlayer.vue   HLS 视频播放器
│   └── RichText.vue      富文本渲染（移动端字号/行高适配）
├── lang/
│   ├── index.ts          i18n 装配
│   └── package/
│       ├── arabic.ts / en.ts    直接复用桌面端语言包
│       └── mobile-ar.ts / mobile-en.ts   移动端新增文案
├── router/index.ts
├── store/modules/app.ts  语言状态 + RTL/LTR 方向切换
└── views/
    ├── HomeView.vue      首页
    ├── arabFund.vue      四大板块共用页（图片册 + 视频）
    ├── countryDetails.vue 国家详情
    └── components/       各内容板块
```

## 路由

| 路径 | 说明 |
| --- | --- |
| `/` | 首页：视频、Arab Bee Platform、四大板块入口、Tab、二级菜单 |
| `/arabFund` | 阿拉伯投资基金 |
| `/arabExportAndImportBank` | 阿拉伯出口银行 |
| `/beeFinancialServiceGroup` | 阿拉伯蜜蜂金融服务集团 |
| `/economics` | 经济城市（含 PDF / 视频切换） |
| `/countryDetails?id=N` | 国家详情 |
| `/activePage` | 活动页 |

## 首页结构（对照设计稿）

- 顶栏：双 Logo、`home_title` / `home_title1`、语言切换（阿 ↔ 英）
- 主视频：`https://files.arab-bee.com/website_video/one/master.m3u8`
- Arab Bee Platform 卡片 → `http://shop.arab-alabo.com/`
- 四大板块六边形入口 → 四个业务路由
- 一级 Tab（Home Page / Presidency / General Secretariat / Regional Office / China）
- 二级菜单（Home Page 下 8 项）→ 对应下方内容区

## 与桌面端的关系

直接复用：

- 语言包 `lang/package/arabic.ts`、`en.ts`（**已裁剪**，见「已知问题」第 6 条）
- 主题色变量、阿拉伯文字体
- 图片资源、国家数据 `assets/data.ts`、业务数据 `views/arabFund.ts`
- 语言切换行为：写入 `localStorage.language` → 整页刷新，与桌面端一致

移动端另做：

- 布局与交互整体重写（桌面端是 1920 宽的横向后台式布局）
- 所有页面的样式层

## 首页素材（从 Figma 导出）

首页的视觉素材是从设计稿 `4094:13` 节点导出后放进 `src/assets/img/` 的，
文件名以 `home-` / `icon-` / `logo-` 开头：

| 文件 | 用途 |
| --- | --- |
| `home_bgc.png` | 整页背景：深绿 `#064a31` + 极淡细纹理 |
| `home-hex-gold.png` | 四大板块的金色六边形徽章 |
| `home-platform-deco.png` | Arab Bee Platform 卡片右侧的包裹 + 定位插画 |
| `logo-union.png` / `logo-council.png` | 顶栏双 Logo |
| `icon-arab-fund.png` / `icon-export-bank.png` / `icon-arab-bee.png` / `icon-economic-city.png` | 四大板块图标 |

首页剩下的视觉（黄绿渐变 Tab、深绿实心选中的菜单按钮、白色小尖指示器）都是纯 CSS 画的，没有切图。

这些图在导出后都按**实际显示尺寸**压缩过（例如顶栏 Logo 从 2835×2835 压到 144×144），
否则首屏会白白多下几 MB。

设计稿的视觉要点集中在首页样式里（见 `HomeView.vue` 的 `<style>`）：
深绿花纹底、金色描边顶栏、白色圆角视频卡、金边六边形徽章、黄绿渐变 Tab、深绿实心选中的菜单按钮。

## 已知问题与待办

1. **Study / Projects / Quality 三个菜单项没有内容**，界面上已置灰禁用
   （`HomeView.vue` 的 `emptyMenuIds`），点下去没有任何反应。
   桌面端这几项对应的组件在别处，本身也没有实际内容。
2. **国家数据只有 2 条**（叙利亚、约旦），与桌面端 `data.ts` 一致。
   桌面端该文件里其余 20 多个国家是注释状态。
3. **`assets/img/aboutUs/`（76 张图，约 25MB）**：About Us 走的是文本版（`Presideency.ts`），
   这批图只被 China 页的「图集」用 `import.meta.glob` 引用，所以 **glob 会把整个目录都吃进构建产物**。
   若确定不要图集，删掉该目录并去掉 `ChinaPage.vue` 里的 glob 即可。
4. **JS 主包 1.09MB（gzip 357KB）**：Vant 目前是全量引入。
   需要压体积可改成按需引入。
5. 部分内容图未压缩（单张 500KB~1.2MB），源图如此，后续如有需要可走图片服务。
6. **语言包已裁剪**：`arabic.ts` / `en.ts` 原本含桌面端全部 262 个 key，移动端实际只用到 43 个，
   其余（`UnionBoard.*`、`boardOfGeneral.*`、`activates_*`、`services_*` 等）已删除。
   往后桌面端语言包更新时，要按移动端用到的 key 手动同步，**不能再整包覆盖**。
   注意 key 有两种写法：`menu_text_01:` 和带引号的 `'data.eP2ti2aw':`，处理时都要认。
