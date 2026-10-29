<template>
  <div>
    <img src="@/assets/img/secretary_general_001.webp" style="width: 100%;" alt="">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineOptions({
  name: 'MediaPage'
})
//emit
</script>

<style lang="scss" scoped>
.activeBox {
  &::after {
    content: '';
    width: calc(100% / 4 - 20px);
  }
}
.card {
  width: calc(100% / 4 - 20px);
  padding: 0;
  padding-bottom: 10px;
  margin-bottom: 17px;
  background: #fff;
  border-radius: 6px;
  box-shadow: none;
  border: 1px solid #eeeeee;

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
.videoBox {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 96%;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.3;
  }
  &::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url('@/assets/img/play_icon.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    background-color: #fff;
    border-radius: 50%;

    // background: #ff8d24;
  }
}
.btn_box {
  padding: 4px 12px;
  border-radius: 4px;
  background: #979595;
  color: #fff;
  margin-left: 12px;
}
.btnActive {
  color: #fff;
  background: #0168dd;
  border: 1px solid #0168dd;
}
</style>
