<template>
  <div style="box-shadow: 0 0 5px 2px #e6e6e6; border-radius: 4px" class="slide-in-fwd-bottom" >
    <!-- @click="$emit('toLink')" -->
     <img @click="$emit('toLink')" src="@/assets/img/arab.png" alt="" width="100%"  v-if="lang == 'arabic'" />
    <img @click="$emit('toLink')" src="@/assets/img/os_en.png" alt="" width="100%" v-if="lang == 'en'" />"
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'ContactUs'
})
const emit = defineEmits(['toLink'])
const lang = ref(window.localStorage.getItem('language') || 'en')
//emit
</script>

<style lang="scss" scoped>
.arabic {
  background: url(@/assets/img/org_bg_001.png) no-repeat;
  background-size: 100% auto;
}

.arab-box {
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
  padding-top: 66px;

  div {
    width: calc(calc(100% - 40px) / 3);
  }

  .arab-btn {
    width: 100%;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, #59A1FF, #2677E0);
    color: #fff;
    border-radius: 4px;
  }
  .img-box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
  }
  .arab-left {
    padding-top: 100px;

    .left-box {
      width: 100%;
      border: 1px solid #2677E0;
      border-radius: 6px;
      padding-top: 10px;
      margin-bottom: 55px;
    }
  }
  .arab-right {
    padding-top: 100px;
    .left-box {
    width: 100%;
      border: 1px solid #2677E0;
      border-radius: 6px;
      padding-top: 10px;
      margin-bottom: 55px;
    }
  }
}
</style>
