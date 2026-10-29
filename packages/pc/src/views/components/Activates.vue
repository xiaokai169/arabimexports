<template>
  <div class="active" style="flex-flow: wrap">
    <!-- <p style="font-size: 18px; font-weight: 700">Import, export and general supplies</p>
    <p>Marketing activities of Nile Marketing and Commercial Investment Company:</p>
    <p style="margin-bottom: 30px !important">
      General marketing and electronic marketing through electronic portals
    </p> -->
    <!-- <div class="flex list_item" style="display: flex;">
      <div style="width: 200px;height: 100px;margin-right:12px;"></div>
     <p style="flex:1">
      {{ $t('activates_0') }}
     </p>
    </div>
    <div class="flex list_item" style="display: flex;">
      <div style="width: 200px;height: 100px;margin-right:12px;"></div>
     <p style="flex:1">
      {{ $t('activates_0') }}
     </p>
    </div>
    <div class="flex list_item" style="display: flex;">
      <div style="width: 200px;height: 100px;margin-right:12px;"></div>
     <p style="flex:1">
      {{ $t('activates_0') }}
     </p>
    </div> -->
    <p class="course">
      {{ $t('activates_0') }}
    </p>
    <p class="course">
      {{ $t('activates_1') }}
    </p>
    <p class="course">
      {{ $t('activates_2') }}
    </p>
    <p class="course">{{ $t('activates_3') }}</p>
    <p class="course">
      {{ $t('activates_4') }}
    </p>
    <p class="course">
      {{ $t('activates_5') }}
    </p>
    <p class="course">
      {{ $t('activates_6') }}
    </p>
    <p class="course">
      {{ $t('activates_7') }}
    </p>
    <p class="course">
      {{ $t('activates_8') }}
    </p>
    <p class="course">
      {{ $t('activates_9') }}
    </p>
    <p class="course">
      {{ $t('activates_10') }}
    </p>
    <p class="course">{{ $t('activates_11') }}</p>
    <p class="course">
      {{ $t('activates_12') }}
    </p>
    <p class="course">{{ $t('activates_13') }}</p>
    <p class="course">{{ $t('activates_14') }}</p>
    <p class="course">{{ $t('activates_15') }}</p>
    <p class="course courseActive" @click="toLink">
      {{ $t('activates_16') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

defineOptions({
  name: 'activatesPage'
})
function toLink() {
  router.push({ path: '/activePage' })
}
//emit
</script>

<style lang="scss" scoped>
.activeBox {
  &::after {
    content: '';
    width: calc(100% / 4 - 20px);
  }
}
p {
  // text-align: left;
}
.active {
  // box-shadow: 0px 0px 7px 0px #ccc;
  padding: 12px;
  border-radius: 4px;
  p {
  }
}
.course {
  margin-bottom: 12px !important;
}
.courseActive {
  color: #0168dd;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.list_item {
  border-radius: 4px;
  border:1px solid ;
  border-image: linear-gradient(to right, rgba(58, 0, 14, 1), var(--vt-c-f)) 1;
  // radial-gradient(circle, red, yellow) 1;
  margin-bottom: 16px;
  box-shadow: 0 0 6px 1px rgba(8, 8, 8,0.2);
}
</style>
