import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'

const store = createPinia()
useAppStore(store)

export { store }
