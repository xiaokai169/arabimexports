<template>
  <div class="presidency">
    <!-- 与桌面端 Presidency Tab 的 Services 组件同源：
         桌面端那两个切换按钮已被注释，selectFlag 恒为 1，实际只展示这张图 -->
    <img src="@/assets/img/active_001.webp" alt="" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'PresidencyPage'
})
</script>

<style scoped lang="scss">
.presidency {
  padding: 4px 0 16px;

  img {
    display: block;
    width: 100%;
    border-radius: 6px;
  }
}
</style>
