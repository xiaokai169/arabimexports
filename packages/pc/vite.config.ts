import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { DevUiResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import inject from '@rollup/plugin-inject'
import { resolve } from 'path'
// import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
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
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [
        // 可以指定多个图标文件夹，支持绝对路径，支持 glob
        resolve(process.cwd(), 'src/assets/icons')
      ],
      symbolId: 'icon-[dir]-[name]'
    }),
    Components({
      resolvers: [DevUiResolver()]
    })
    // inject({
    //   modules: {
    //     $: 'jquery',
    //     jQuery: 'jquery'
    //   }
    // })

    // VueI18nPlugin({})
  ],
  server: {
    port: 5173,
    proxy: {
      '/_AMapService/v4/map/styles': {
        target: 'https://webapi.amap.com/v4/map/styles',
        changeOrigin: true,
      },
      // '/master': {
      //   target: 'http://localhost:8072/',
      //   changeOrigin: true,
      // },
      // '/v0': {
      //   target: 'http://localhost:8072/',
      //   changeOrigin: true,
      // },
      // '/v1': {
      //   target: 'http://localhost:8072/',
      //   changeOrigin: true,
      // },
      // '/v2': {
      //   target: 'http://localhost:8072/',
      //   changeOrigin: true,
      // }
    }
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.vue'],
    // 数组形式按顺序匹配，越具体的规则必须越靠前
    alias: [
      // 共享静态资源 —— 图片与字体已统一迁至 packages/shared/assets
      { find: /^@\/assets\/img\//, replacement: `${sharedImg}/` },
      { find: /^@\/assets\/fonts\//, replacement: `${sharedFonts}/` },
      // 共享代码层（i18n 语言包、静态数据、枚举）
      { find: /^@shared\//, replacement: `${sharedSrc}/` },
      // 应用自身源码，放最后兜底
      { find: /^@\//, replacement: `${srcDir}/` }
    ]
  },
  build: {
    sourcemap: true
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__)
  }
})
