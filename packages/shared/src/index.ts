/**
 * @arabimexports/shared —— PC 端与移动端共用层
 *
 * 这里只放「两端逐字节相同」或「一端是另一端严格超集」的内容。
 * 布局、交互、UI 库相关的东西一律留在各自应用的 src 下。
 *
 * 资源（图片、字体）不走本文件导出，而是通过各应用 vite.config.ts 里的
 * `@/assets/img`、`@/assets/fonts` 别名直接映射到 shared/assets/。
 */

// 语言枚举
export { LanguageEnum } from './enums/LanguageEnum'

// 静态数据（两端逐字节相同）
export { default as presideencyData } from './data/Presideency'
export { default as arabFundData } from './data/arabFund'
