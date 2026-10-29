<template>
  <div>
    <div class="gj_bg">
      <div class="d-flex container flex-column p-3 md-2" style="margin-bottom: 12px">
        <h4 class="title text-light p-2 w-100">{{ $t(detail.title) }}</h4>
        <div class="d-flex text-light">
          <div class="" style="margin-right: 12px">
            <img width="200px" :src="detail.url" alt="" />
          </div>
          <div>
            <p style="margin-bottom: 12px; font-size: 18px; font-weight: 700">{{$t('introduction')}}</p>

            <p style="font-size: 16px">{{ $t(detail.introduction) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="title d-flex justify-content-between border-bottom p-3">
        <p class="fw-bold">{{ $t('nationalProject') }}</p>
        <p class="text-secondary">{{ $t('More') }}</p>
      </div>
      <p style="text-align: center">{{ $t('noData') }}</p>
      <!-- <div class="d-flex flex-wrap justify-content-between" style="padding-top: 12px"> -->
      <!-- <div class="item d-flex" v-for="item in [1, 2, 3, 4]" :key="item">
          <img src="" alt="" />
          <div class="p-2">
            <p class="fw-b fw-bold">
              Baiyu Holdings has reached a cooperation agreement with Egypt's charging and ...
            </p>
            <p>
              On September 4th, Baiyu Holdings Limited, a B2B bulk commodity e-commerce platform and
              supply chain service provider, announcedthat its subsidiary Shenzhen Jintongyuan......
            </p>
          </div>
        </div> -->
      <!-- </div> -->
    </div>
    <div class="container">
      <div class="title d-flex justify-content-between border-bottom p-3">
        <p class="fw-bold">{{ $t('stateEnterprise') }}</p>
        <p class="text-secondary">{{ $t('More') }}</p>
      </div>
      <p style="text-align: center">{{ $t('noData') }}</p>
      <div class="d-flex flex-wrap" style="padding-top: 12px">
        <!-- <div class="d-flex w-20" v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="item">
          <div class="p-3">
            <p class="fw-b fw-bold">
              Baiyu Holdings has reached a cooperation agreement with Egypt's charging and ...
            </p>
            <p>
              On September 4th, Baiyu Holdings Limited, a B2B bulk commodity e-commerce platform and
              supply chain service provider, announcedthat its subsidiary Shenzhen Jintongyuan......
            </p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import listData from '@/assets/data'
import { useRoute } from 'vue-router'
import axios from 'axios'
const route = useRoute()
interface DetailVo {
  [x: string]: string
}

const detail = ref<any>({})

function getDetailFn() {
  detail.value = listData.find((item: any) => item.id == route.query.id)
}
getDetailFn()
console.log(route.query.id)
watch(
  () => route.query.id,
  (newRoute) => {
    detail.value = {}
    getDetailFn()
  }
)
const countryName = ref('')
defineOptions({
  name: 'countryDetails'
})
//emit
</script>

<style lang="scss" scoped>
.gj_bg {
  height: 500px;
  background: url('@/assets/img/gj_bgc_01.jpg') no-repeat;
}
.content {
  width: 80%;
  margin: 0 auto;
  padding-top: 12px;
}
.item {
  width: calc(100% / 2 - 27px);
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 0 4px 0 #b4b3b3;
  margin-bottom: 12px;
  img {
    width: 209px;
    height: 143px;
    background-color: pink;
  }
}
</style>
