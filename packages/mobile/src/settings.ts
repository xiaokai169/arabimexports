import { LanguageEnum } from '@shared/enums/LanguageEnum'

const { pkg } = __APP_INFO__

const defaultSettings: AppSettings = {
  title: 'Council of Arab Economic Unit',
  version: pkg.version,
  /** 默认阿拉伯语，与桌面端一致 */
  language: LanguageEnum.ARAB,
  themeColor: '#256e1b'
}

export default defaultSettings
