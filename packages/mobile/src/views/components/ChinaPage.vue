<template>
  <div class="china">
    <!-- pdf / video 两个页签：样式与顺序同 arabFund 顶栏的 .seg（桌面端这两处文案也是硬编码） -->
    <div class="switcher">
      <button
        type="button"
        class="sw-btn sw-btn-latin"
        :class="{ active: tab === 'pdf' }"
        @click="tab = 'pdf'"
      >
        PDF
      </button>
      <button
        type="button"
        class="sw-btn"
        :class="{ active: tab === 'video' }"
        @click="tab = 'video'"
      >
        {{ $t('video') }}
      </button>
    </div>

    <VideoPlayer v-if="tab === 'video'" :src="videoSrc" />

    <div v-else class="gallery">
      <img v-for="(item, i) in sortedImages" :key="i" :src="item" alt="" loading="lazy" />
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import { computed, ref } from 'vue'

defineOptions({
  name: 'ChinaPage'
})

/** 与桌面端 aboutUs 组件同源：video 页签放宣传片，pdf 页签放 aboutUs 图集 */
const tab = ref<'video' | 'pdf'>('video')
const videoSrc = 'https://files.arab-bee.com/website_video/two/master.m3u8'

/**
 * 图集：对应桌面端的 import.meta.glob('@/assets/img/aboutUs/*.webp')
 * 桌面端按构建后 URL 里的数字排序，这里直接按文件路径里的数字排，结果一致。
 */
const modules = import.meta.glob('@/assets/img/aboutUs/*.webp', { eager: true }) as Record<
  string,
  { default: string }
>

function pageNo(path: string) {
  const match = path.match(/page_(\d+)_/)
  return match ? parseInt(match[1], 10) : 0
}

const sortedImages = computed(() =>
  Object.keys(modules)
    .sort((a, b) => pageNo(a) - pageNo(b))
    .map((key) => modules[key].default)
)
</script>

<style scoped lang="scss">
.china {
  padding: 4px 0 16px;
}

/* 与 arabFund 的 .seg 保持一致：水平居中、浅绿胶囊 + 两枚 80×24 分段，选中用绿渐变 */
.switcher {
  display: flex;
  width: fit-content;
  margin-inline: auto;
  margin-bottom: 10px;
  gap: 4px;
  padding: 2px;
  border-radius: 6px;
  background: #eff6e3;

  .sw-btn {
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

  /* PDF 是纯拉丁字母：避开 Air Strip 字体（它的大写字形看起来像小写），
     阿语模式下也让西文回落到系统字体 */
  .sw-btn-latin {
    font-family: 'arabic-only', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
}

.gallery {
  display: flex;
  flex-direction: column;
  gap: 8px;

  img {
    display: block;
    width: 100%;
    border-radius: 6px;
  }
}
</style>
