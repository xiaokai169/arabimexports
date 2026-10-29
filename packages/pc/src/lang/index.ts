import { createI18n } from 'vue-i18n'
import { useAppStore } from '@/store/modules/app'
// 本地语言包
import enLocale from '@shared/lang/package/en'
// import zhCnLocale from './package/zh'
import arabicLocale from '@shared/lang/package/arabic'

// readWorkBook('@/lang/package/lang.xlsx')
const appStore = useAppStore()
// 通过File API读取CSV文件内容
const messages = {
  arabic: {
    ...arabicLocale
  },
  en: {
    ...enLocale
  }
}
const i18n = createI18n({
  legacy: false,
  locale: appStore.language,
  messages: messages,
  globalInjection: true
})

// 全局注册 i18n

export default i18n
