<template>
  <div class="content">
    <div class="div-flex" style="margin: 20px;margin-right: 0;margin-left: 0;">
      <div class="btnBox" @click="backFn">
        <img class="back-icon" src="@/assets/img/back_001.png" width="16px" />
        {{ $t('back_lang') }}
      </div>
    </div>
    <div class="menuItemBox flex" v-if="routeName == 'economics'">
      <div class="menuItem" :class="{ menuItemLeft: textVal == 'arabic' }">

        <buttonBox3D style="width: 100%;" :activeItem="selectFlag == 'pdf'" @click="clickFn('pdf')">
          <div style="padding:  0">
            <div class="div-flex js" style="width: 100%">
              <p style="text-align: left; font-family: 'Segoe UI', Arial, sans-serif">PDF</p>
            </div>
          </div>
        </buttonBox3D>
      </div>
      <div class="menuItem" :class="{ menuItemLeft: textVal == 'arabic' }">
        <buttonBox3D style="width: 100%;" :activeItem="selectFlag == 'video'" @click="clickFn('video')">
          <div style="padding: 0">
            <div class="div-flex js" style="width: 100%">
              <p style="text-align: left">{{ $t('video') }}</p>
            </div>
          </div>
        </buttonBox3D>
      </div>
    </div>
    <div class="imgBox" v-if="selectFlag == 'pdf'">
      <img :src="item" alt="" v-for="item in thatObj.pdf" :key="item">
    </div>
    <VideoPlay :src="thatObj.video" style="width: 100%;" v-if="selectFlag == 'video'"></VideoPlay>

  </div>
</template>

<script setup lang="ts">
import buttonBox3D from '@/components/buttonBox3D.vue'
import VideoPlay from './components/VideoPlay.vue'

import router from '@/router'
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import textObj from '@shared/data/arabFund'
import { useAppStore } from '@/store/modules/app'
const { language } = useAppStore()
const route = useRoute()
const htmlText = ref()
// 定义一个函数，用于回到页面顶部
function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth' // 可选，平滑滚动效果
  });
}
const textVal = ref<any>()
textVal.value = language || 'en'
const selectFlag = ref<any>('pdf')


// const obj = {
//   bankTitle:{
//     title1:'arabFundTitle1',
//     title2:'arabFundTitle2'
//   },
//   beeTitle:{
//     title1:'bankTitle1',
//     title2:'bankTitle2'
//   },
//   fundTitle:{
//     title1:'beeTitle1',
//     title2:'beeTitle2'
//   }
// }
// const titleObj = ref({
//   title1:'',
//   title2:''
// }) 
const lang = window.localStorage.getItem('language')
const routeName = ref<any>('')
const thatObj = ref<any>({})
const clickFn = (i: any) => {
  selectFlag.value = i

}
onMounted(() => {
  scrollToTop()
  routeName.value = route.name
  thatObj.value = textObj[lang || 'en'][routeName.value]
  console.log(routeName.value);
  
})
function backFn() {
  router.back()
}

//emit
</script>

<style lang="scss" scoped>
.content {
  width: 70%;
  margin: 0 auto;
}

.imgBox {
  img {
    width: 100%;
  }
}

.btnBox {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #256e1b;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

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
</style>
