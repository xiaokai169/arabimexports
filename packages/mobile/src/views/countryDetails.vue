<template>
  <div class="page">
    <!-- 顶栏按设计稿 4094:305：只有一枚返回按钮，没有 AppHeader、也没有页面标题
         （国家名在内容区里已经有一份）。 -->
    <div class="page-bar">
      <button
        class="back"
        type="button"
        :aria-label="$t('back')"
        @click="router.back()"
      ></button>
    </div>

    <main class="page-main scroll-y">
      <section v-if="detail.title" class="hero">
        <img class="flag" :src="detail.url" :alt="detail.title" />
        <h2 class="name">{{ $t(detail.title) }}</h2>
        <p class="section-label">{{ $t('introduction') }}</p>
        <p class="intro">{{ $t(detail.introduction) }}</p>
      </section>

      <p v-else class="empty">{{ $t('noData') }}</p>

      <section class="block">
        <div class="block-head">
          <p class="block-title">{{ $t('nationalProject') }}</p>
          <p class="more">{{ $t('More') }}</p>
        </div>
        <p class="empty">{{ $t('noData') }}</p>
      </section>

      <section class="block">
        <div class="block-head">
          <p class="block-title">{{ $t('stateEnterprise') }}</p>
          <p class="more">{{ $t('More') }}</p>
        </div>
        <p class="empty">{{ $t('noData') }}</p>
      </section>
    </main>

    <footer class="app-footer">{{ $t('footer_16') }}</footer>
  </div>
</template>

<script setup lang="ts">
import listData from '@/assets/data'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'CountryDetails'
})

const route = useRoute()
const router = useRouter()

/** 与桌面端一致：按 query.id 从同一份国家数据里查找 */
const detail = computed<any>(() => {
  const id = String(route.query.id ?? '')
  return listData.find((item: any) => String(item.id) === id) ?? {}
})
</script>

<style scoped lang="scss">
@use '@/assets/page.scss';

.page-main {
  /* 顶栏是浮层（56px 高），内容让开它 */
  padding: 60px 16px 20px;
}

.hero {
  background: #fff;
  border-radius: 8px;
  padding: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;

  .flag {
    width: 90px;
    border-radius: 3px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
    margin-bottom: 10px;
  }

  .name {
    font-size: 16px;
    font-weight: 700;
    color: var(--vt-c);
    margin-bottom: 10px;
  }

  .section-label {
    font-size: 13.5px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .intro {
    font-size: 13px;
    line-height: 1.9;
    color: #444;
    text-align: justify;
  }
}

.block {
  background: #fff;
  border-radius: 8px;
  padding: 12px 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;

  .block-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--line);
  }

  .block-title {
    font-size: 14px;
    font-weight: 700;
  }

  .more {
    font-size: 12.5px;
    color: var(--txt-soft);
  }
}

.empty {
  padding: 18px 0;
  text-align: center;
  font-size: 13px;
  color: var(--txt-soft);
}
</style>
