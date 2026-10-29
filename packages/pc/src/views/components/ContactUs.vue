<template>
  <div class="d-flex">
    <div style="padding-top: 20px; flex: 11" class="left_bg_box">
      <p class="title">{{ $t('ContactUs_01') }}</p>
      <p class="margin color">{{ $t('ContactUs_02') }}</p>
      <p class="title">{{ $t('ContactUs_03') }}</p>
      <p class="margin color">{{ $t('ContactUs_04') }}</p>

      <!-- <p class="title">{{ $t('ContactUs_05') }}</p> -->
      <p class="title">{{ $t('ContactUs_06') }}</p>
      <p class="margin color">amal@arabimexports.org</p>
      <p class="title">{{ $t('ContactUs_07') }}</p>
      <p class="margin color">00201110111095</p>
      <p class="title">{{ $t('ContactUs_08') }}</p>
      <p class="margin color">www.arabimexports.org</p>
      <p class="title">{{ $t('ContactUs_09') }}</p>
      <p class="margin color" style="margin-bottom: 40px">{{ $t('ContactUs_10') }}</p>
    </div>
    <div style="flex: 18">
      <img src="@/assets/img/Contactus2_03.png" width="100%" alt="" />
      <!-- <mapPage style="width: 100%; height: 100%"></mapPage> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
defineOptions({
  name: 'ContactUs'
})
//emit
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 400px;
}
p {
  line-height: 22px !important;
  font-size: 16px;
  // text-align: left;
}

.color {
  color: #666;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 6px !important;
}

.margin {
  margin-bottom: 26px !important;
}

.left_bg_box {
  border-top: 1px solid #e7e6e6;
  padding: 40px;
  margin-right: 12px;
  background: url(@/assets/img/ContactUsbg.png) no-repeat;
  background-size: 100% 100%;
}
</style>
