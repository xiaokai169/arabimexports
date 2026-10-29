/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/** vite.config.ts 中通过 define 注入的全局常量 */
declare const __APP_INFO__: {
  pkg: {
    name: string
    version: string
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
  }
  buildTimestamp: number
}

interface AppSettings {
  title: string
  version: string
  language: string
  themeColor: string
}
