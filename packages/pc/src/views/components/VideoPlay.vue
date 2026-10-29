<template>
  <div class="video-box">
    <div class="video-container flex center">
      <video ref="videoEl" class="videoEl" controls :poster="coverImage"></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'vue3-video-play/dist/style.css'
import { ref, onMounted, onBeforeUnmount, reactive, nextTick } from 'vue'
import Hls from 'hls.js'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const options = reactive<any>({
  src: ''
})
const progressNum = ref<any>(0)
const interId = setInterval(() => {
  if (progressNum.value == 100) {
    clearInterval(interId)
  }
  progressNum.value += 1
}, 1000)
const videoEl = ref<HTMLVideoElement>()
const hlsInstance = ref<Hls>()
const levels = ref<any[]>([])
const selectedQuality = ref('auto')
const qualityOptions = ref<Array<{ label: string; value: number }>>([])

// 初始化HLS播放器
const initHls = () => {
  if (!videoEl.value) return
  videoEl.value.loop = true;
  if (Hls.isSupported()) {
    const hls = new Hls()
    hlsInstance.value = hls
    // 监听缓冲更新事件
    hls.on(Hls.Events.BUFFER_APPENDED, (event, data) => { })
    hls.loadSource(props.src)
    hls.attachMedia(videoEl.value)

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      levels.value = hls.levels
      updateQualityOptions()
    })

    hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
      console.log('当前分辨率:', levels.value[data.level])
    })
  } else if (videoEl.value.canPlayType('application/vnd.apple.mpegurl')) {
    options.src = props.src
  }
}

// 更新分辨率选项
const updateQualityOptions = () => {
  if (levels.value.length < 1) return

  // 按码率从高到低排序
  const sortedLevels = [...levels.value].sort((a, b) => b.bitrate - a.bitrate)

  // 取最高、中间、最低三个质量
  const high = sortedLevels[0]
  const medium = sortedLevels[Math.floor(sortedLevels.length / 2)]
  const low = sortedLevels[sortedLevels.length - 1]

  qualityOptions.value = [
    { label: `高清（${formatBitrate(high.bitrate)}）`, value: high.id },
    { label: `清晰（${formatBitrate(medium.bitrate)}）`, value: medium.id },
    { label: `流畅（${formatBitrate(low.bitrate)}）`, value: low.id }
  ]
}

const coverImage = ref<string>(''); // 新增封面图片响应式变量

const pauseAll = (index: any) => {  
    const videos = document.getElementsByTagName('video');  
    nextTick(() => {  
      for (let j = 0; j < videos.length; j++) {  
        if (j !== index) {  
          videos[j].pause();   
        }  
      }  
    });  
};  
  
const setVideo = () => {  
  const videos = document.getElementsByTagName('video');  
  nextTick(() => {  
    for (let i = 0; i < videos.length; i++) {  
      videos[i].addEventListener('play', () => {  
        pauseAll(i);  
      });  
    }  
  });  
};  
  
  // 在组件挂载后执行 setVideo 函数  
onMounted(setVideo);  
// 处理分辨率切换
const handleQualityChange = () => {
  if (!hlsInstance.value) return

  if (selectedQuality.value === 'auto') {
    hlsInstance.value.currentLevel = -1 // 启用自动切换
  } else {
    const level = parseInt(selectedQuality.value as string)
    hlsInstance.value.currentLevel = level
  }
}

// 格式化比特率显示
const formatBitrate = (bitrate: number) => {
  if (bitrate > 1000000) {
    return `${(bitrate / 1000000).toFixed(1)} Mbps`
  }
  return `${(bitrate / 1000).toFixed(0)} Kbps`
}


onMounted(() => {
  initHls()
})

onBeforeUnmount(() => {
  if (hlsInstance.value) {
    hlsInstance.value.destroy()
  }
})
</script>

<style scoped lang="scss">
.video-box {
  position: relative;
  height: 85vh;
  margin: 0 auto;
  // background: rgba($color: #000000, $alpha: 1.0);
  margin-bottom: 12px;
}

.video-container {
  position: relative;
  padding-top: 12px;
  padding-bottom: 12px;

  video {
    z-index: 40;

  }
}

.videoEl {
  position: relative;
  height: 79vh;
  width: 66vw;
}
</style>
