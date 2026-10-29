<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="div-flex slide-in-fwd-bottom" style="padding-left: 12px; padding-top: 20px">
    <div v-for="item in list" :key="item.id" class="imgBox">
      <img :src="item.path" alt="LunBo" class="box_shawdow" @click="clickFn(item.path)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { A11y, Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay' //自动播放
import 'swiper/css/effect-fade' //淡入淡出
import { ref } from 'vue'
type modlude = Record<string, { default: string }>
type GroupVo = {
  id: number
  name: string
  path: string
}
const flagLists: modlude = import.meta.glob('@/assets/img/fount_*.{png,jpg}', {
  eager: true
})
const list = ref<GroupVo[]>([])
Object.values(flagLists).forEach((ele, index) => {
  let str = ele.default.replace('/src/assets/img/Flag_of_', '')
  str = str.replaceAll('_', ' ')
  let name = str.split('.')[0]
  list.value.push({
    id: index,
    name: name,
    path: ele.default
  })
})
defineOptions({
  name: 'founderPage'
})
const modules = [A11y, Autoplay, FreeMode]
function clickFn(path: string) {
  window.open(path)
}

//emit
</script>

<style lang="scss" scoped>
.div-flex {
  flex-flow: wrap;
}
.slides {
  width: 590px;
  height: 470px;
  margin: 0 auto;
}
/* 箭头 */
.slides .swiper-button-prev,
.slides .swiper-button-next {
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.slides .swiper-button-prev:hover,
.slides .swiper-button-next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.slides .swiper-button-prev {
  left: 10px;
}

.slides .swiper-button-next {
  right: 10px;
}
.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 24px; /* 修改箭头图标的大小 */
  color: #ffffffcc;
}

/* 小圆点 */
.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0 5px;
  border-radius: 50%;
}

.swiper-pagination-bullet-active {
  background-color: rgba(255, 255, 255, 0.8);
}
.imgBox {
  width: calc(100% / 4 - 12px);
  margin-bottom: 12px;
  margin-right: 12px;
}
.box_shawdow {
  width: 100%;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: scale(1.1);
  }
}
</style>
