<template>
  <div class="regional-page">
    <!-- 对应桌面端 Regional Office Tab 的 regionalOfficePage 组件：
         两个区域办事处的「开发中」占位卡片。
         桌面端这里 img 的 src 是空的、文案也硬编码阿语，此处照搬（不接 i18n）。 -->
    <div class="card">
      <p class="name">مكتب إقليم الأردن للأتحاد</p>
      <p class="status">قيد التطوير</p>
    </div>
    <div class="card">
      <p class="name">مكتب أقليم سوريا للأتحاد</p>
      <p class="status">قيد التطوير</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'RegionalOfficePage'
})
</script>

<style scoped lang="scss">
.regional-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0 16px;
}

/* 桌面端是 200×100 的横排灰卡片，移动端放不下，改为纵向铺满 */
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  min-height: 100px;
  padding: 16px;
  color: #fff;
  background: rgb(171 170 170);
  border-radius: 6px;
  box-shadow: 0 0 10px 0 #858484;

  .name {
    font-size: 14px;
    font-weight: 700;
  }

  .status {
    font-size: 13px;
    opacity: 0.85;
  }
}
</style>
