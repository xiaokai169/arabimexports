<template>
  <div class="boardOfGeneral slide-in-fwd-bottom d-flex center">
    <!-- <treeOrg :listDate="listDate" height="900px"></treeOrg> -->
     <!-- <img src="@/assets/img/bogs_zh.png" v-if="lang=='zh'" alt=""> -->
     <img src="@/assets/img/bogs_en.png" v-if="lang=='arabic'" alt="">
     <img src="@/assets/img/bogs_en.png" v-if="lang=='en'" alt="">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import treeOrg from '@/components/treeOrg.vue'
// import { useI18n } from 'vue-i18n'
// let { t } = useI18n()
// const treeList = [
//   t('boardOfGeneral.Tc8smGQJ'),
//   [t('boardOfGeneral.cHMd8eyh'), [t('boardOfGeneral.aAtyCHzJ'), [t('boardOfGeneral.TZfDZdGi'), [t('boardOfGeneral.tZMShTJP'), [t('boardOfGeneral.kfYDrHt4'), [t('boardOfGeneral.jzcdhcZ6'), [t('boardOfGeneral.45mkGwcr'), [t('boardOfGeneral.8G2hTBbA'), [t('boardOfGeneral.QBWwW66t')]]]]]]]]],
//   [
//     t('boardOfGeneral.6nXKdhHQ'),
//     [
//       t('boardOfGeneral.skbsMhKr'),
//       [
//         t('boardOfGeneral.i8aX82MG'),
//         [
//           t('boardOfGeneral.dZt4pXaa'),
//           [
//             t('boardOfGeneral.3DHE8KdD'),
//             [
//               t('boardOfGeneral.7GcBemw7'),
//               [t('boardOfGeneral.hbyXNFD5'), [t('boardOfGeneral.hM3hHf6z'), [t('boardOfGeneral.pGRZ2eZt')]]]
//             ]
//           ]
//         ]
//       ]
//     ]
//   ],
//   [
//     t('boardOfGeneral.CSY4GmyT'),
//     [
//       t('boardOfGeneral.tWX4P7KA'),
//       [t('boardOfGeneral.5b8GmMWn'), [t('boardOfGeneral.3m6SAMPK'), [t('boardOfGeneral.6AfP3xAE'), [t('boardOfGeneral.MydW8WaR'), [t('boardOfGeneral.5EyBZXR5'), [t('boardOfGeneral.K5y6wzMJ')]]]]]]
//     ]
//   ],
//   [
//     t('boardOfGeneral.yDfrPhzG'),
//     [
//       t('boardOfGeneral.PDbiYb3W'),
//       [
//         t('boardOfGeneral.nfBhxxJZ'),
//         [t('boardOfGeneral.GPziQXAc'), [t('boardOfGeneral.yhSbms4S'), [t('boardOfGeneral.5d2bH3QB'), [t('boardOfGeneral.GTQR8YY6')]]]]
//       ]
//     ]
//   ]
// ]

// const getDate = (arr: any, pid: any) => {
//   let obj: any = {}
//   arr.forEach((ele: any, index: any) => {
//     if (Array.isArray(ele)) {
//       if (!obj.children) {
//         obj.children = []
//       }
//       obj.children.push(getDate(ele, `${pid}-${index}`))
//     } else {
//       console.log(pid)
//       obj.style = {
//         color: '#fff',
//         background: 'linear-gradient(to bottom,  #6fb3ff ,#0168dd)',
//         borderRadius: '4px',
//         width: '240px',
//         height: '70px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }
//       // if (pid.includes('0-1')) {
//       //   obj.style.background = 'linear-gradient(to bottom, #6fb3ff ,#0168dd)'
//       // }
//       // if (pid.includes('0-2')) {
//       //   obj.style.background = 'linear-gradient(to bottom,  #d5b15e ,#d99804)'
//       // }
//       // if (pid.includes('0-3')) {
//       //   obj.style.background = 'linear-gradient(to bottom,  #6fb3ff ,#0168dd)'
//       // }
//       // if (pid.includes('0-4')) {
//       //   obj.style.background = 'linear-gradient(to bottom,  #d5b15e ,#d99804)'
//       // }

//       if (index == 0 && pid == 0) {
//         obj.style = {
//           color: '#fff',
//           background: 'linear-gradient(to bottom,  #0168dd,#6fb3ff )',
//           borderRadius: '4px',
//           width: '500px',
//           height: '70px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }
//       }
//       obj.label = ele
//     }
//   })
//   return obj
// }
// const listDate = ref(getDate(treeList, '0'))

defineOptions({
  name: 'boardOfGeneral'
})
const lang = ref<any>('en')
lang.value = window.localStorage.getItem('language')
//emit
</script>

<style lang="scss" scoped>
.bg_img {
  border-radius: 4px;
  box-shadow: 0 0 5px 2px #e6e6e6;
}

.boardOfGeneral {
  padding-bottom: 20px;
  padding-top: 20px;
  box-shadow: 0 0 5px 2px #e6e6e6;
}

p {
  font-size: 16px;
  line-height: 32px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}
</style>
