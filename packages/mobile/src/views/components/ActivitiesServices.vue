<template>
  <div class="acts">
    <!-- 联盟服务清单：与桌面端同源（Presideency 数据的 founder 分支，25 项） -->
    <RichText :content="html" />
  </div>
</template>

<script setup lang="ts">
import RichText from '@/components/RichText.vue'
import { computed } from 'vue'
import languageData from '@shared/data/Presideency'
import { useAppStore } from '@/store/modules/app'

defineOptions({
  name: 'ActivitiesServices'
})

const appStore = useAppStore()

/** 与桌面端同源：取 Presideency 的 founder 分支（25 项服务清单），
 *  替换原先那份过时的 i18n services_01..24 文案 */
const html = computed(() => {
  const entry = (languageData as any).founder ?? {}
  return entry[appStore.language] || entry.arabic || entry.en || ''
})
</script>

<style scoped lang="scss">
.acts {
  padding: 4px 0 16px;
}
</style>
