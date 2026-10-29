<template>
  <div class="placeholder-box">
    <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
      <path
        d="M4 5h16v11H4zM8 20h8M12 16v4"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <p>{{ $t('menu_placeholder') }}</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ContentPlaceholder'
})
</script>

<style scoped lang="scss">
.placeholder-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 48px 0;
  color: rgba(0, 0, 0, 0.32);

  p {
    font-size: 13px;
  }
}
</style>
