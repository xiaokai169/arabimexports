import './assets/main.css'

import { createApp } from 'vue'
import { store } from '@/store'
import App from './App.vue'
import router from './router'
import vueI18n from './lang'
import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vueI18n)
app.use(Vant)

app.mount('#app')
