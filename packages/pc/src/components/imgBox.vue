<template>
  <div class="slot-img-box">
    <slot></slot>
    <img class="text-top-bg" src="@/assets/img/bgc_001.png" alt="">
    <img class="text-bottom-bg" src="@/assets/img/bgc_001.png" alt="">
    <img class="centent_img" :class="{language_img:language=='arabic',en_img:language=='en'}" src="@/assets/img/bgc_002.png" alt="">
   
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

//导入接口
const language = ref(window.localStorage.getItem('language'))
//导入公共方法

//导入组件

defineOptions({
  name: 'imgBox'
})
//props

//emit

//公共属性
//公共方法
//-----------------私有属性---------------------

//-----------------私有属性end---------------------
//生命周期
</script>

<style lang="scss" scoped>
.slot-img-box {
    position: relative;
    width: 100%;
    padding: 40px 0;
    img {
        position: absolute;

    }
   .text-top-bg {
    width: 100%;
    top: 0;
    left: 0;
   }
   .text-bottom-bg {
    width: 100%;
    bottom:0;
    left:0;
    transform: rotate(180deg);
   }
   .centent_img {
    width: 400px;
    top: 150px;
    z-index: 1;
   }
   .language_img {
    left: 100px ;

   }
   .en_img {
    right: 100px ;

   }
}

</style>
