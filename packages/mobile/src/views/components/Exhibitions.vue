<template>
  <div class="exhibitions">
    <!-- 与桌面端 boardOfGeneral 组件同款素材（桌面端阿语/英文都指向这张） -->
    <img src="@/assets/img/bogs_en.png" alt="" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ExhibitionsPage'
})
</script>

<style scoped lang="scss">
.exhibitions {
  padding: 4px 0 16px;

  img {
    display: block;
    width: 100%;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
}
</style>
