<template>
  <svg aria-hidden="true" :fill="color" :style="`width:${size};height:${size}`">
    <use :xlink:href="symbolId"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
defineOptions({
  name: 'svgIcons'
})
const props = defineProps({
  name: String,
  color: {
    type: String,
    default: '#fff'
  },
  size: {
    type: String,
    default: '16px'
  }
})
const symbolId = computed(() => `#icon-${props.name}`)

//emit
</script>

<style lang="scss" scoped></style>
