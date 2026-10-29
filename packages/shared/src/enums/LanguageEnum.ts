/**
 * 语言枚举（PC / 移动端共用）
 *
 * 合并前两端各有一份且成员名不一致：
 *   - PC 端：ZH_CN / EN / arab
 *   - 移动端：EN / ARAB
 * 现统一为 SCREAMING_CASE，PC 端原有的 `LanguageEnum.arab` 调用点已同步改名。
 */
export const enum LanguageEnum {
  /**
   * 中文（语言包 zh.ts 尚未启用，保留占位）
   */
  ZH_CN = 'zh',

  /**
   * 英文
   */
  EN = 'en',

  /**
   * 阿拉伯语（RTL 从右到左）
   */
  ARAB = 'arabic'
}
