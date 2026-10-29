<template>
  <header class="app-header">
    <div class="logos">
      <div class="logo-badge">
        <img src="@/assets/img/logo_001.png" alt="Council of Arab Economic Unity" />
      </div>
      <div class="logo-badge">
        <img src="@/assets/img/logo_002.png" alt="Arab Exporters and Importers Union" />
      </div>
    </div>

    <div class="titles">
      <p class="t1">{{ $t('home_title1') }}</p>
      <p class="t2">{{ $t('home_title') }}</p>
    </div>

    <!-- 语言切换按钮：对照设计稿 —— 金色渐变、左上角斜切的金色页签
         (#FFFBDA → #E2C386 → #CA9743)，内容叠在上面。
         左侧是一枚 24×24(@2x) 的金底双向箭头图标，右侧是当前语言文字；
         点它切到另一种语言。
         位置：贴顶栏内侧下角，英文在右下（斜切左上）、阿语镜像到左下（斜切右上）。
         只有首页用 AppHeader——二级页面按设计稿 4094:305 走 page-bar 那套。 -->
    <div class="lang-switch">
      <button type="button" class="lang-btn" :title="langLabel" @click="switchLang">
        <img class="switch-icon" src="@/assets/img/lang-switch-icon.png" alt="" />
        <span class="lang-label">{{ langLabel }}</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'

defineOptions({
  name: 'AppHeader'
})

const appStore = useAppStore()

/** 右侧文字：跟随当前语言 */
const langLabel = computed(() => (appStore.language === 'arabic' ? 'العربية' : 'English'))

/** 点按钮切到另一种语言 */
function switchLang() {
  const next = appStore.language === 'arabic' ? 'en' : 'arabic'
  appStore.changeLanguage(next)
  // 与桌面端行为一致：切换语言后整页刷新，保证各组件文本同步
  window.location.reload()
}
</script>

<style scoped lang="scss">
/* 顶栏：整块铺设计稿「顶部框」(4094:80) 的导出切图，
   横向绿渐变 + 四周金色描边都在图里，无需再用 CSS 拼。
   切图本身是 375×64，所以内边距要凑出 64 高（12 + logo 40 + 12），
   否则 background-size: 100% 100% 会把图纵向拉伸。 */
.app-header {
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  /* 与标题之间的 10px 由 .titles 的 padding-inline-start 给，这里不再叠 gap */
  gap: 0;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top));
  background-color: #104e40;
  background-image: url('@/assets/img/header_bg_001.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  z-index: 20;
}

.logos {
  display: flex;
  align-items: center;
  flex: 0 0 auto;

  /* 素材 logo_001 / logo_002 自身就带了浅青绿底和金色描边，
     所以这里只做圆形裁切 + 投影，不能再叠白底和 border，
     否则圈会叠成两层。 */
  .logo-badge {
    /* 设计稿 4094:97 / 4094:91：两个都是 40×40，
       位置 16 和 62 —— 中间留 6px 间隙，不是叠在一起。 */
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);

    &+.logo-badge {
      margin-inline-start: 6px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
  }
}

/* 标题：设计稿 4094:90 是一个两行文本，13px / Medium / 行高 20，
   深色字(#001a14) + 黄绿描边。
   描边用多层 text-shadow 拼外侧——`-webkit-text-stroke` 是居中描边，
   在 13px 的字上会把笔画啃细。 */
.titles {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  /* 距左侧第二个 logo 右边 10px（设计稿：logo 到 102，文字从 112 起） */
  padding-inline-start: 10px;

  p {
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #001a14;
    text-shadow:
      -1px -1px 0 #b8d94c,
      1px -1px 0 #b8d94c,
      -1px 1px 0 #b8d94c,
      1px 1px 0 #b8d94c,
      0 -1px 0 #b8d94c,
      0 1px 0 #b8d94c,
      -1px 0 0 #b8d94c,
      1px 0 0 #b8d94c;
  }
}

/* ===== 语言切换：顶栏内侧下角，贴边（英文右下、阿语左下） ===== */
.lang-switch {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  /* 按钮内部锁死 ltr：旗在左、文字在右，两种语言一致 */
  direction: ltr;
  height: 18px;

  /* 阿语：镜像到左下角 */
  .directionRtl & {
    right: auto;
    left: 0;
  }
}

/* 按钮底：设计稿给药金渐变（#FFFBDA → #E2C386 → #CA9743），高 18、直角，
   左上角切掉一个 --btn-cut 的斜角（阿语镜像到右上角）。
   文字放大后 54px 宽放不下，改为 min-width 兜底、按内容自适应。 */
.lang-btn {
  --btn-cut: 6px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: auto;
  min-width: 54px;
  height: 18px;
  padding: 0 6px;
  border: none;
  border-radius: 0;
  background: linear-gradient(90deg, #fffbda 0%, #e2c386 50%, #ca9743 100%);
  color: #5d431c;
  cursor: pointer;
  /* 英文：切左上角 */
  clip-path: polygon(
    var(--btn-cut) 0,
    100% 0,
    100% 100%,
    0 100%,
    0 var(--btn-cut)
  );

  /* 阿语：镜像 —— 渐变方向翻转，切右上角 */
  .directionRtl & {
    background: linear-gradient(270deg, #fffbda 0%, #e2c386 50%, #ca9743 100%);
    clip-path: polygon(
      0 0,
      calc(100% - var(--btn-cut)) 0,
      100% var(--btn-cut),
      100% 100%,
      0 100%
    );
  }

  &:active {
    opacity: 0.88;
  }
}

.switch-icon {
  flex: 0 0 auto;
  display: block;
  width: 12px;
  height: 12px;
}

.lang-label {
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  color: inherit;
  white-space: nowrap;
}
</style>
