<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/store/modules/app'

defineOptions({
  name: 'App'
})

const appStore = useAppStore()

onMounted(() => {
  // 按持久化语言初始化 RTL / LTR 方向
  appStore.initLanguage()
})
</script>
