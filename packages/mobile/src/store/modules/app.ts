import defaultSettings from '@/settings'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  /**
   * 根据语言标识读取对应的语言包，持久化到 localStorage
   */
  const language = useStorage('language', defaultSettings.language)

  /**
   * 应用语言方向（阿语 RTL / 英文 LTR）
   * 与桌面端一致：在 #app 上挂 directionRtl 类名
   */
  function applyDirection(val: string) {
    const app = document.getElementById('app')
    if (val === 'arabic') {
      app?.classList.add('directionRtl')
      document.documentElement.setAttribute('dir', 'rtl')
      document.documentElement.setAttribute('lang', 'ar')
    } else {
      app?.classList.remove('directionRtl')
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', 'en')
    }
  }

  /**
   * 切换语言
   *
   * 注意：useStorage 的落盘是 post-flush 异步的，而调用方(语言切换按钮)会紧接着
   * 执行 window.location.reload()。若不在此处同步补写一次，reload 会读到旧值，
   * 表现为「点了切换但语言没变」。
   */
  async function changeLanguage(val: string) {
    language.value = val
    try {
      localStorage.setItem('language', val)
    } catch {
      /* 隐私模式等 localStorage 不可用的场景下忽略，内存中的语言仍然生效 */
    }
    applyDirection(val)
  }

  /**
   * 应用启动时按持久化语言初始化一次方向
   */
  function initLanguage() {
    applyDirection(language.value || defaultSettings.language)
  }

  return {
    language,
    changeLanguage,
    initLanguage
  }
})
