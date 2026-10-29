<template>
  <div class="training">
    <RichText :content="html" />
  </div>
</template>

<script setup lang="ts">
import RichText from '@/components/RichText.vue'
import { computed } from 'vue'
import languageData from '@shared/data/Presideency'
import { useAppStore } from '@/store/modules/app'

defineOptions({
  name: 'TrainingPrograms'
})

const appStore = useAppStore()

/** 培训项目：出口风险管理、国际营销战略、智能文凭、出口文凭、人力资源课程等 */
const html = computed(() => {
  const entry = (languageData as any).establishment ?? {}
  return entry[appStore.language] || entry.arabic || entry.en || ''
})
</script>

<style scoped lang="scss">
.training {
  padding: 2px 0 16px;
}
</style>
