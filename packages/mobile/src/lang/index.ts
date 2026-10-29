import { createI18n } from 'vue-i18n'
import { useAppStore } from '@/store/modules/app'
// 桌面端(test_admin)语言包，原样复用
import enLocale from '@shared/lang/package/en'
import arabicLocale from '@shared/lang/package/arabic'
// 移动端新增文案
import mobileEn from './package/mobile-en'
import mobileAr from './package/mobile-ar'

const appStore = useAppStore()

const messages = {
  arabic: {
    ...arabicLocale,
    ...mobileAr
  },
  en: {
    ...enLocale,
    ...mobileEn
  }
}

const i18n = createI18n({
  legacy: false,
  locale: appStore.language,
  messages: messages,
  globalInjection: true
})

export default i18n
