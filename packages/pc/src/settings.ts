import { LanguageEnum } from '@shared/enums/LanguageEnum'

const { pkg } = __APP_INFO__

const defaultSettings: AppSettings = {
  title: 'login.ZFJP2cCa',
  version: pkg.version,
  showSettings: true,
  tagsView: true,
  fixedHeader: true,
  sidebarLogo: true,
  language: LanguageEnum.ARAB,
  themeColor: '#409EFF',
  watermarkEnabled: false,
  watermarkContent: pkg.name
}

export default defaultSettings
