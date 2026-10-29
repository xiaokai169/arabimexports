<template>
  <div class="boardOfGeneral slide-in-fwd-bottom d-flex center">
    <!-- <treeOrg :listDate="listDate" height="1800px" :fullscreen="true" :draggable="true"></treeOrg> -->
     <img src="@/assets/img/ub_en.png" alt="" v-if="lang=='en'" >
     <img src="@/assets/img/ub_en.png" alt="" v-if="lang=='arabic'" >
     <!-- <img src="@/assets/img/ub_zh.png" alt="" v-if="lang=='zh'" > -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import treeOrg from '@/components/treeOrg.vue'
// const treeList = [
//   '阿拉伯进出口商联合会',
//   [
//     '理事会成员',
//     [
//       '董事会主席',
//       [
//         '秘书处',
//         [
//           '部门',
//           ['研究', ['培训和在培训', ['贸易', ['投资', ['服务', ['工业', ['农业', ['国际关系']]]]]]]]
//         ],
//         [
//           '项目',
//           [
//             '阿拉伯投资基金',
//             [
//               '电子商店',
//               [
//                 '阿拉伯出口银行',
//                 [
//                   '阿拉伯电子商务公司',
//                   [
//                     '阿拉伯金融服务公司',
//                     [
//                       '阿拉伯物流服务公司',
//                       [
//                         '阿拉伯体育投资公司',
//                         [
//                           '阿拉伯信息经济学院',
//                           [
//                             '国际调解、仲裁和调解中心',
//                             ['阿拉伯经济信息中心', ['阿拉伯培训中心', ['阿拉伯-非洲-中国商业论坛']]]
//                           ]
//                         ]
//                       ]
//                     ]
//                   ]
//                 ]
//               ]
//             ]
//           ]
//         ],
//         [
//           '助理秘书',
//           [
//             '规划和后续行动',
//             [
//               '成员资格',
//               ['人类发展', ['账户', ['新闻', ['技术信息', ['展览和会议管理部', ['管理和行政']]]]]]
//             ]
//           ]
//         ]
//       ],
//       [
//         '代表处',
//         ['沙特', ['卡塔尔', ['伊拉克', ['巴林', ['也门', ['克罗地亚', ['巴勒斯坦']]]]]]],
//         [
//           '阿拉伯联合酋长国',
//           ['摩洛哥', ['阿尔及利亚', ['科威特', ['黎巴嫩', ['阿曼', ['毛里塔尼亚']]]]]]
//         ]
//       ],
//       ['区域办事处', ['埃及', ['叙利亚', ['约旦', ['苏丹']]]]],
//       [
//         '机构',
//         ['智者', ['领导人', ['科学家', ['青年人', ['人权']]]]],
//         ['顾问', ['专家', ['先驱', ['新闻', ['妇女']]]]]
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
//         width: '200px',
//         height: '60px',
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
//           height: '60px',
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
  name: 'UnionBoard'
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
  transform: scale(0.5);
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
