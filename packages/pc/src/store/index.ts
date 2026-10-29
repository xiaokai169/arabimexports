// import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
const store = createPinia()
useAppStore(store)
// 全局注册 store
// export function setupStore(app: App<Element>) {
//   app.use(store)
// }

export { store }
