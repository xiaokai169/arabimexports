<template>
  <div class="pre_bgc" style="padding: 35px 50px 0 50px">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <img class="slide-in-fwd-bottom qi_box" src="@/assets/img/msz_001.png" width="180px" alt="" />
      <img
        src="@/assets/img/sudan_00.png"
        width="320px"
        height="160px"
        alt=""
        class="slide-in-fwd-bottom me-5 qi_box"
      />
    </div>
    <div class="slide-in-fwd-bottom">
      <p style="font-weight: 700; margin-bottom: 12px">{{ $t('genral_01') }}</p>
      <p style="line-height: 30px">
        {{ $t('genral_02') }}
      </p>
      <img src="@/assets/img/gs_en.png" alt="" v-if="lang == 'arabic'" />
      <img src="@/assets/img/gs_en.png" alt="" v-if="lang == 'en'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'generalSecretary'
})
const lang = ref<any>('en')
lang.value = window.localStorage.getItem('language')
//emit
</script>

<style lang="scss" scoped>

p {
  // text-align: left;
}

.qi_box {
  position: relative;
  z-index: 2;
  box-shadow: 0 0 13px -3px #8d8787;
}
</style>
