<template>
  <div class="div-flex js activeBox" style="flex-flow: wrap; padding-top: 24px">
    <div class="new_card" v-for="item in lists" :key="item.id">
      <div style="height: 240px; overflow: hidden">
        <video id="myVideo" width="100%" ref="videoRef">
          <source :src="item.src" type="video/mp4" />
        </video>
      </div>
      <img
        src="@/assets/img/play_icon.png"
        width="50px"
        alt="cover Image"
        class="play_icon"
        @click="toLink(item.src)"
      />
      <p class="card_title">{{ item.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// const importList = import.meta.glob('@/assets/img/news_*.png')
import { useI18n } from 'vue-i18n'
let { t } = useI18n()
type modlude = Record<string, { default: string }>
const httpStr = 'https://files.arab-bee.com/'
const importList: modlude = {
  str: { default: `${httpStr}video/20241209/mw73hr3643d35hk28ynbtnbk6nt25txi.mp4` },
  str1: { default: `${httpStr}video/20241209/a2xcthd4erwpewbwwtsthj5ixb4d3bh2.mp4` },
  str2: { default: `${httpStr}video/20241209/5bshyh7ffcccbw45wcemxdkkzkp8it5p.mp4` },
  str3: { default: `${httpStr}video/20241209/fpa6i2k8r3eaej66xhdcmekpj4ad7mj4.mp4` },
  str4: { default: `${httpStr}video/20241209/titazjyw4hhtc66nty5pysxf8e3fra74.mp4` }
}
console.log(importList)
function toLink(src: string | URL | undefined) {
  window.open(src)
}
type ListVo = {
  id: number
  title: string
  date: string
  time: string
  address: string
  src: string
}
const lists = ref<ListVo[]>([])
const videoRef = ref()
let textList = [
  t('textList_01'),
  t('textList_02'),
  t('textList_03'),
  t('textList_04'),
  t('textList_05'),
  
]
Object.values(importList).forEach((ele, index) => {
  lists.value.push({
    id: index,
    title: textList[index],
    date: '10/22',
    time: '13:00-17:00',
    address: '陕西西安',
    src: ele.default
  })
})
defineOptions({
  name: 'NewsPage'
})
//emit
</script>

<style lang="scss" scoped>
.activeBox {
  &::after {
    content: '';
    width: calc(100% / 3 - 20px);
  }
}
.play_icon {
  position: absolute;
  top: calc(50% - 45px);
  left: calc(50% - 25px);
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
}
.new_card {
  position: relative;
  width: calc(100% / 3 - 20px);
  overflow: hidden;
  padding: 0;
  padding-bottom: 10px;
  margin-bottom: 17px;
  background: #fff;
  border-radius: 6px;
  box-shadow: none;

  .card_title {
    color: #333;
    font-size: 16px;
    padding-left: 12px;
    line-height: 24px;
    margin-bottom: 10px;
  }
  .card_date {
    padding-left: 12px;
    color: #ff8d24;
    font-size: 14px;
    margin-bottom: 12px;
  }
  .card_add {
    padding-left: 12px;
    color: #999;
    font-size: 12px;
  }
  .img {
    margin-bottom: 5px;
  }
}
</style>
