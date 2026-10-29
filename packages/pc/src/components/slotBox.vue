<script setup lang="ts">
import { watch } from 'fs'
import { computed, onMounted, ref } from 'vue'
defineOptions({
  name: 'button3D'
})

//emit
//公共属性
//公共方法
// 播放声音
 // public/static 目录访问

// src/assets 目录访问（推荐）
// const outFn = ()=>{
//   console.log(2222);
//   isPlayFlag.value = false;

// }
//-----------------私有属性end---------------------
//生命周期
</script>
<template>
  <button type="button" class="button">
    <div class="button-top"><slot /></div>
    <div class="button-bottom"></div>
    <!-- <div class="button-base"></div> -->
    <!-- <audio ref="audioRef" :src="audioSrc" preload="auto" style="display: none;" hidden></audio> -->
    <!-- 隐藏音频元素 -->
  </button>
</template>

<style lang="scss" scoped>
.button {
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  border-width: 0;
  padding: 0 8px 12px;
  min-width: 10em;
  box-sizing: border-box;
  background: transparent;
  font: inherit;
  cursor: pointer;
  &:hover {
    font-size: 17px;
    .button-top::after {
    }
    .button-bottom {
      background: var(--vt-c-hover);
    }
    .button-top::after {
    }
  }
}
.activeItem {
  .button-top {
    transform: translateY(6px) !important; // 保持按下时的位移
  }

  .button-top::after {
    border-radius: 6px !important; // 保持按下后的圆角
    padding: 0 2px !important; // 保持按下后的内边距
    background: var(--vt-c-hover);
  }

  .button-bottom {
    border-radius: 10px 10px 8px 8px / 8px !important; // 底部圆角
    padding-top: 0 !important; // 底部内边距
    background-color: var(--vt-c-f);
  }
  .button-base {
  }
}
.button-top {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
  padding: 8px 16px;
  transform: translateY(0);
  text-align: center;
  color: #fff;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.25);
  transition-property: transform;
  transition-duration: 0.2s;
  -webkit-user-select: none;
  user-select: none;
}

.button:active .button-top {
  transform: translateY(6px);
}

.button-top::after {
  content: '';
  position: absolute;
  z-index: -1;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  box-sizing: content-box;
  background-image: var(--vt-c-bgc-lg-q);
  text-align: center;
  color: #fff;
  box-shadow:
    inset 0 0 0px 1px rgba(255, 255, 255, 0.1),
    0 1px 1px 1px rgba(255, 255, 255, 0.1);
  transition-property: border-radius, padding, width, transform;
  transition-duration: 0.2s;
}

.button:active .button-top::after {
  border-radius: 6px;
  padding: 0 2px;
}

.button-bottom {
  position: absolute;
  z-index: -1;
  bottom: 4px;
  left: 4px;
  border-radius: 8px / 16px 16px 8px 8px;
  padding-top: 6px;
  width: calc(100% - 8px);
  height: calc(100% - 10px);
  box-sizing: content-box;
  background-color: var(--vt-c);
  background-image: radial-gradient(
      4px 8px at 4px calc(100% - 8px),
      rgba(255, 255, 255, 0.25),
      transparent
    ),
    radial-gradient(
      4px 8px at calc(100% - 4px) calc(100% - 8px),
      rgba(255, 255, 255, 0.25),
      transparent
    ),
    radial-gradient(16px at -4px 0, white, transparent),
    radial-gradient(16px at calc(100% + 4px) 0, white, transparent);
  box-shadow:
    0px 2px 3px 0px rgba(0, 0, 0, 0.5),
    inset 0 -1px 3px 3px rgba(0, 0, 0, 0.4);
  transition-property: border-radius, padding-top;
  transition-duration: 0.2s;
}

.button:active .button-bottom {
  border-radius: 10px 10px 8px 8px / 8px;
  padding-top: 0;
}

.button-base {
  position: absolute;
  z-index: -2;
  top: 4px;
  left: 0;
  border-radius: 12px;
  width: 100%;
  height: calc(100% - 4px);
  background-color: rgba(0, 0, 0, 0.15);
  box-shadow:
    0 1px 1px 0 rgba(170, 117, 117, 0.75),
    inset 0 2px 2px rgba(0, 0, 0, 0.25);
}
</style>
