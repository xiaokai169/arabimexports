<template>
  <div class="page">
    <!-- 顶栏按设计稿 4094:305 只剩一枚返回按钮；有视频的板块再把 pdf/video 切换摆在正中 -->
    <div class="page-bar">
      <button
        class="back"
        type="button"
        :aria-label="$t('back')"
        @click="router.back()"
      ></button>

      <!-- 经济城市页有 PDF / 视频两种内容 -->
      <div v-if="hasVideo" class="seg">
        <button
          type="button"
          class="seg-btn seg-btn-latin"
          :class="{ active: tab === 'pdf' }"
          @click="tab = 'pdf'"
        >
          PDF
        </button>
        <button
          type="button"
          class="seg-btn"
          :class="{ active: tab === 'video' }"
          @click="tab = 'video'"
        >
          {{ $t('video') }}
        </button>
      </div>
    </div>

    <main class="page-main scroll-y" :class="{ 'is-video': hasVideo && tab === 'video' }">
      <VideoPlayer v-if="hasVideo && tab === 'video'" :src="data.video" />

      <div v-else class="img-list">
        <img v-for="(item, i) in data.pdf" :key="i" :src="item" alt="" loading="lazy" />
      </div>
    </main>

    <footer class="app-footer">{{ $t('footer_16') }}</footer>
  </div>
</template>

<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import textObj from '@shared/data/arabFund'
import { useAppStore } from '@/store/modules/app'

defineOptions({
  name: 'ArabFund'
})

const route = useRoute()
const router = useRouter()
// 用 store 实例访问（而非解构），保留对语言切换的响应性
const appStore = useAppStore()

/** 当前板块的数据：{ pdf: string[], video: string } */
const data = computed(() => {
  const routeName = String(route.name ?? 'arabFund')
  const langData = (textObj as any)[appStore.language] ?? (textObj as any).en ?? {}
  return langData[routeName] ?? { pdf: [], video: '' }
})

const hasVideo = computed(() => !!data.value.video)

/** 有视频时默认展示 PDF 图册，与桌面端一致 */
const tab = ref<'pdf' | 'video'>('pdf')

// 切换板块时重置到默认内容
watch(() => route.name, () => (tab.value = 'pdf'))
</script>

<style scoped lang="scss">
@use '@/assets/page.scss';

/* 图册按设计稿通栏铺满，不留内边距和间隙 */
.page-main {
  padding: 0;
  background: transparent;

  /* 顶栏是浮层，图册的浅色留白压得住它；但视频画面从 y=0 铺满，
     返回按钮会糊在左上角，所以视频模式下给顶栏让出高度（8 + 40 + 8 = 56）。 */
  &.is-video {
    padding-top: 56px;
  }
}

/* PDF / video 切换（设计稿 4094:324）：
   168×28 的浅绿胶囊摆在正中，里面是两枚 80×24 的分段，选中那枚用绿渐变。 */
.seg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  gap: 4px;
  padding: 2px;
  border-radius: 6px;
  background: #eff6e3;

  .seg-btn {
    width: 80px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
    color: #0ba252;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &.active {
      color: #fff;
      background: linear-gradient(90deg, #104e40 0%, #0ba252 100%);
    }
  }

  /* PDF 是纯拉丁字母：避开 Air Strip 字体，阿语模式下西文回落系统字体 */
  .seg-btn-latin {
    font-family: 'arabic-only', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
}

.img-list {
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    display: block;
    background: #fff;
  }
}
</style>
