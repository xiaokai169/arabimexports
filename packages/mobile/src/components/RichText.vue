<template>
  <div class="rich-text" v-html="content"></div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'RichText'
})

/**
 * 富文本渲染
 *
 * 内容来自项目内的静态数据文件（src/views/components/Presideency.ts），
 * 非用户输入，与桌面端一样直接使用 v-html。
 */
defineProps<{
  content: string
}>()
</script>

<style scoped lang="scss">
/* 桌面端这份 HTML 是按 A4/Word 排版的（14pt 字号、200% 行高），
   这里统一压到移动端可读的字号与行高 */
.rich-text {
  font-size: 14px;
  line-height: 1.9;
  color: #2b2b2b;
  text-align: justify;
  word-break: break-word;

  :deep(p) {
    margin: 0 0 10px;
    line-height: 1.9 !important;
    font-size: 14px !important;
  }

  :deep(span) {
    font-size: 14px !important;
  }

  :deep(ul),
  :deep(ol) {
    padding-inline-start: 20px;
    margin: 0 0 10px;
  }

  :deep(li) {
    line-height: 1.85;
    margin-bottom: 4px;
  }

  :deep(u) {
    text-decoration: underline;
    font-weight: 700;
  }

  /* 段落内的大字号标题保留强调效果，但不至于撑破移动端 */
  :deep(span[style*='14pt']) {
    font-size: 14px !important;
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
  }
}
</style>
