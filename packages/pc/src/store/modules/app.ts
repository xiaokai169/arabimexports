// import en from '@/lang/package/en'
// import zh from '@/lang/package/zh'
import defaultSettings from '@/settings'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'
// import { computed } from 'vue'
export const useAppStore = defineStore('app', () => {
  /**
   * 根据语言标识读取对应的语言包
   */
  const language = useStorage('language', defaultSettings.language)

  /**
   * 切换语言
   *
   * @param val
   */
  async function changeLanguage(val: string) {
    language.value = val
   
    const app = document.getElementById('app')
    if (val == 'arabic') {
      // no-ts-check
      // app.addClass('document.body')
      app?.classList.add('directionRtl')
    } else {
      // no-ts-check
      app?.classList.remove('directionRtl')
      // document.body.removeClass('document.body')
    }
    console.log('🚀 ~ changeLanguage ~ val:', val)
  }
  return {
    language,
    changeLanguage
  }
})
/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
