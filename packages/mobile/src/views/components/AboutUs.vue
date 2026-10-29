<template>
  <div class="about-us">
    <RichText :content="html" />
  </div>
</template>

<script setup lang="ts">
import RichText from '@/components/RichText.vue'
import { computed } from 'vue'
import languageData from '@shared/data/Presideency'
import { useAppStore } from '@/store/modules/app'

defineOptions({
  name: 'AboutUsPage'
})

const appStore = useAppStore()

/** 联盟介绍：成立时间、合法性、愿景/使命/价值观/目标、办公地址 */
const html = computed(() => {
  const entry = (languageData as any).presideency ?? {}
  // 桌面端数据里 en 为空，英文模式下回落到阿语，避免整页空白
  return entry[appStore.language] || entry.arabic || entry.en || ''
})
</script>

<style scoped lang="scss">
.about-us {
  padding: 2px 0 16px;
}
</style>
