<template>
  <div class="w-1200">
    <div class="btnBox ms-4" @click="backFn" style="margin: 20px">
      <img class="back-icon" src="@/assets/img/back_001.png" width="16px" />
      {{ $t('back_lang') }}
    </div>
    <div class="d-flex center">
      <img src="@/assets/img/active_img_001.jpg" width="60%" alt="" style="margin-bottom: 30px" />
    </div>
    <p>
     {{ $t('detail_p1') }}
    </p>
    <p>
     {{ $t('detail_p2') }}

     
    </p>
    <p>
     {{ $t('detail_p3') }}

    </p>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

defineOptions({
  name: ''
})
function backFn() {
  router.go(-1)
}
//emit
</script>

<style lang="scss" scoped>
.w-1200 {
  margin: 0 auto;
  width: 1200px;
  p {
    text-indent: 2em;
    font-size: 16px;
    margin-bottom: 12px !important;
  }
}
.btnBox {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 30px;
  background: #0168dd;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
</style>
