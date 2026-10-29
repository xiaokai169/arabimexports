<template>
  <div>
    <div class="menuItemBox flex">
      <div class="menuItem" :class="{ menuItemLeft: textVal == 'arabic' }">
      
        <buttonBox3D style="width: 100%;" :activeItem="selectFlag == 2" @click="clickFn(2)">
          <div style="padding:  0">
            <div class="div-flex js" style="width: 100%">
              <p style="text-align: left; font-family: 'Segoe UI', Arial, sans-serif">PDF</p>
            </div>
          </div>
        </buttonBox3D>
      </div>
      <div class="menuItem" :class="{ menuItemLeft: textVal == 'arabic' }">
        <buttonBox3D style="width: 100%;" :activeItem="selectFlag == 1" @click="clickFn(1)">
          <div style="padding: 0">
            <div class="div-flex js" style="width: 100%">
              <p style="text-align: left">{{ $t('video') }}</p>
            </div>
          </div>
        </buttonBox3D>
      </div>
    </div>
    <VideoPlay src="https://files.arab-bee.com/website_video/two/master.m3u8" style="width: 100%;" v-if="selectFlag ==1"></VideoPlay>
    <div v-if="selectFlag == 2">
      <img v-for="(item, index) in sortedImages" :key="index" :src="item" width="100%" alt="" >
    <div class="fixed_box" @click="scrollToTop">
      <img src="@/assets/img/top.png" width="60px" alt="">
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import buttonBox3D from '@/components/buttonBox3D.vue'
import { computed, ref } from 'vue'
import VideoPlay from './VideoPlay.vue'
import { useAppStore } from '@/store/modules/app'
const { language } = useAppStore()
const images = import.meta.glob('@/assets/img/aboutUs/*.webp', { eager: true });
const selectFlag = ref<any>(1)
const imageList = Object.values(images).map((img: any) => img.default);
const extractNumber = (filename: any) => {
  const match = filename.match(/\d+/); // 提取文件名中的第一个连续数字
  return match ? parseInt(match[0]) : 0;
};
const sortedImages = computed(() => {
  return [...imageList].sort((a, b) => {
    return extractNumber(a) - extractNumber(b);
  });
});
console.log(sortedImages.value);

defineOptions({
  name: 'aboutUs'
})
const textObj = {
  arabic: ``,
  en: ``
}
const clickFn = (i:any)=>{
  selectFlag.value = i
}
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // 启用平滑滚动效果
  });
};
const textVal = ref<any>()
textVal.value = language || 'en'
//emit
</script>

<style lang="scss" scoped>
.menuItemBox {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 12px;

  .menuItem {
    width: calc(calc(100% / 5) - 6px);
    margin-left: 8px;

    &:first-child {
      margin-right: 0;
    }
  }

  .menuItemLeft {
    margin-left: 0;
    &:first-child {
      margin-left: 8px;
    }
  }
}

.fixed_box {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>
