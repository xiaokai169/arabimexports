<template>
  <div class="page">
    <!-- 顶栏按设计稿 4094:305：只有一枚返回按钮 -->
    <div class="page-bar">
      <button
        class="back"
        type="button"
        :aria-label="$t('back')"
        @click="router.back()"
      ></button>
    </div>

    <main class="page-main scroll-y">
      <img class="poster" src="@/assets/img/active_img_001.jpg" alt="" loading="lazy" />

      <p class="para">{{ $t('detail_p1') }}</p>
      <p class="para">{{ $t('detail_p2') }}</p>
      <p class="para">{{ $t('detail_p3') }}</p>
    </main>

    <footer class="app-footer">{{ $t('footer_16') }}</footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineOptions({
  name: 'ActivePage'
})

const router = useRouter()
</script>

<style scoped lang="scss">
@use '@/assets/page.scss';

.page-main {
  /* 顶栏是浮层（56px 高），内容让开它 */
  padding: 60px 16px 20px;
}

.poster {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 14px;
}

.para {
  font-size: 13.5px;
  line-height: 1.9;
  color: #2b2b2b;
  /* 中文/阿文段落的首行缩进，与桌面端一致 */
  text-indent: 2em;
  text-align: justify;
  margin-bottom: 10px;
}
</style>
