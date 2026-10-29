<template>
  <div class="gs">
    <!-- 与桌面端 General Secretariat Tab 的 Media 组件一致：整页就是一张图，无文案。
         （桌面端另有 generalSecretary.vue 是「文案 + 三张图」，但那个挂在二级菜单
         Projects 上，不是这个 Tab，别搞混。） -->
    <img src="@/assets/img/secretary_general_001.webp" alt="" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'GeneralSecretary'
})
</script>

<style scoped lang="scss">
.gs {
  padding: 4px 0 16px;

  img {
    display: block;
    width: 100%;
    border-radius: 6px;
  }
}
</style>
