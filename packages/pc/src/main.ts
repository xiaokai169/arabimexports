import './assets/main.css'

import { createApp } from 'vue'
import { store } from '@/store'
import { useAppStore } from '@/store/modules/app'
import App from './App.vue'
import router from './router'
import vueI18n from './lang'
import vue3TreeOrg from 'vue3-tree-org'
import 'vue3-tree-org/lib/vue3-tree-org.css'
import VueDOMPurifyHTML from 'vue-dompurify-html';

// import { Skeleton as vSkeleton, SkeletonItem as vSkeletonItem } from '@/directive/skeleton'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import 'virtual:svg-icons-register'
const app = createApp(App)
// registerDirectives(app)
app.use(vue3TreeOrg)
app.use(VueDOMPurifyHTML)
app.use(store)

// 语言方向必须在挂载前应用。原先 changeLanguage 只在 HomeView 里调用，
// 直接打开/刷新详情页时 HomeView 不会挂载，#app 缺少 directionRtl，
// 阿语页面会按 LTR 渲染（返回按钮的箭头跑到阿语文字左侧）。
const appStore = useAppStore()
appStore.changeLanguage(appStore.language || 'arabic')

app.use(router)
app.use(vueI18n)
app.mount('#app')
