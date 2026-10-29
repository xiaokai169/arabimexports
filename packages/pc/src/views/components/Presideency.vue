<template>
  <div class="pre_bgc presideency" >
    
    <div class="slide-in-fwd-bottom">
      <p v-html="showText">
      </p>
    </div>
    <img src="@/assets/img/presideency_002.png" style="width: 100%;" v-if="props.pageType=='presideency'&&language=='arabic'" alt="">
    <img src="@/assets/img/presideency_003.png" style="width: 100%;" v-if="props.pageType=='presideency'&&language=='en'" alt="">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import languageData from '@shared/data/Presideency'
import { useAppStore } from '@/store/modules/app';

defineOptions({
  name: 'PresideencyPage'
})
const props = defineProps<{
  pageType:string
}>()
const {  language } = useAppStore()

// language||
let showText =ref<any>(languageData[props.pageType]['arabic'])
// import imgBox from '@/components/imgBox.vue'
//emit
</script>

<style lang="scss" scoped>
.presideency {
  padding: 0 40px 0 40px;overflow: auto; height: 82vh;
}
</style>