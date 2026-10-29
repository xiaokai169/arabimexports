<template>
  <div class="regional slide-in-fwd-bottom">
    <div class="overflow">
      <div
        class="d-flex shadow-sm mb-3 p-3 bg-body-tertiary rounded align-items-start"
        :class="{ activeBtn: item.acitveBtn }"
        @click.prevent="showDetailFn(item)"
        v-for="(item, index) in listContent"
        :key="index"
      >
        <!-- 国旗 -->
        <div class="d-flex align-items-center" style="min-height: 60px">
          <div style="margin-right: 12px; flex: 2" @click.stop="toLink(item.id)">
            <img
              class="img_hover"
              :src="item.url"
              alt=""
              width="120px"
              style="margin: 0 auto; box-shadow: rgb(0 0 0 / 31%) 0px 0px 8px 0px"
            />
          </div>
          <div class="music" style="flex: 4">
            <!-- <img src="@/assets/img/music_001.png" alt="" height="70px" style="margin-bottom: 10px" /> -->
            <p style="text-align: center">{{ $t(item.title) }}</p>
            <!-- <p>national anthem</p> -->
          </div>
        </div>
        <div style="flex: 18">
          <p style="margin-bottom: 12px" :class="{ text_overflow: !item.acitveBtn }">
            {{ $t(item.introduction) }}
          </p>
          <img
            v-show="item.acitveBtn"
            src="@/assets/img/organized-structure2_04.png"
            width="100%"
            alt=""
          />
        </div>
        <!-- <div style="flex: 6">
          <p style="margin-bottom: 12px">Address: Libya Central Street</p>
          <p style="margin-bottom: 12px">Email: arab@libiya.com</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'
import listContent from '@/assets/data'
// 列表展开方法
function showDetailFn(item: any) {
  // 点击展开  显示组织机构
  item.acitveBtn = !item.acitveBtn
}
function toLink(id: any) {
  const { href } = router.resolve({ path: '/countryDetails', query: { id } })
  window.open(href, '__blank')
}
defineOptions({
  name: 'RegionalOffice'
})
// type GroupVo = {
//   id: number
//   name: string
//   path: string
//   content: string
// }

// type ResultsVo = {
//   group_type: number
//   group: GroupVo[]
// }
// let listDate = ref<GroupVo[]>([])
// let listName: Array<string>[] = [
//   [
//     'Sudan',
//     "In 2022, Sudan's gross domestic product (GDP) was $46.7 billion, with a per capita GDP of $592."
//   ],
//   [
//     'Syria',
//     "In 2020, Syria's GDP is estimated at $23 billion, down about 15% from $27 billion in 2019"
//   ],
// [
//   'Algeria',
//   "Algeria's economy is the fourth largest in Africa, with a GDP of 233 billion US dollars in 2022, a per capita GDP of 5,187 US dollars, and an economic growth rate of 3.8%"
// ],
// [
//   'Bahrain',
//   'Bahrain is the first oil-producing country in the Gulf region. Key economic figures for 2022 are as follows: GDP: $35.36 billion. GDP growth rate: 4.9%'
// ],
// [
//   'Djibouti',
//   'The Republic of Djibouti in 2021, the GDP of Djibouti is $3.371 billion, and the economic growth rate is 4.3%.'
// ],
// [
//   'Egypt',
//   "Egypt is the third largest economy in Africa, an open market economy with relatively complete industrial, agricultural and service systems. In 2021, Egypt's GDP was $385.58 billion."
// ],
// [
//   'Iraq',
//   "In 2022, Iraq's gross domestic product (GDP) was $218.4 billion. GDP per capita: $5,021, Economic growth rate: 8.1%."
// ],
// [
//   'Jordan',
//   "Jordan's main economic figures for 2022 are as follows: GDP: $48.06 billion. GDP per capita: about $4,100."
// ],
// [
//   'Kuwait',
//   "In 2022, Kuwait's GDP is $176 billion, per capita GDP is $39,000, and the economic growth rate is 7.6%."
// ],
// [
//   'Lebanon',
//   'Lebanon has a GDP of $18 billion (2021), a GDP per capita of $4,576 (2021) and an economic growth rate of -7% (2021).'
// ],
// [
//   'Libya',
//   "Libya is still in transition, political instability, frequent violence. In 2022, Libya's GDP is $38.8 billion, per capita GDP is $5,465, and GDP growth rate is -5.5%."
// ],
// [
//   'Mauritania',
//   "Mauritania. In 2022, Mauritania's GDP is $10.09 billion, with a per capita GDP of $2,330 and an economic growth rate of 4%."
// ],
// [
//   'Morocco',
//   "Morocco's GDP in 2022 is $142.87 billion, with a per capita GDP of $3,900 and an economic growth rate of 1.3%."
// ],
// [
//   'Oman',
//   'On November 9, 2000, Oman joined the World Trade Organization as its 139th member. The GDP in 2022 will be $86.3 billion, with a per capita GDP of $19,000.'
// ],
// [




// مجلس الوحدة الاقتصادي.1




//   'Palestine',
//   'Key economic figures for 2021: Gross Domestic Product (GDP) : $15.027 billion, GDP growth rate: 7.1%, GDP per capita: about $3,655. '
// ],
// ['Qatar', "Qatar's GDP in 2022 is $237.995 billion, with a per capita GDP of $81,800."],
// [
//   'Saudi Arabia',
//   'In 2022, the GDP will reach $1,108.1 billion, with a GDP growth rate of 8.7% and a per capita GDP of $34,400.'
// ],
// [
//   'Somalia',
//   "Somalia's GDP in 2020 is $4.918 billion, with a per capita GDP of $309 and a GDP growth rate of -1.459%."
// ],

// ['Tunisia', "IIn 2022, Tunisia's GDP was $46.28 billion. "],
// ['Yemen', 'Key economic data for 2021 are as follows: GDP: $21.06 billion. GDP per capita: $691'],
// [
//   'Comoros',
//   'In 2021, Comoros has a GDP of $1.29 billion and a per capita GDP of $1,379, with an economic growth rate of 0.2%'
// ],
// [
//   'Arab Emirates',
//   "In 2022, the UAE's GDP is USD 446.6 billion, GDP per capita: USD 47,700, GDP growth rate: 8.9%."
// ],

// ]
// Object.values(flagLists).forEach((ele, index) => {
//   listDate.value.push({
//     id: index,
//     name: listName[index][0],
//     content: listName[index][1],
//     path: ele.default
//   })
// })
// axios.post('http://api.arab-alabo.com/api/share/country', 'lang=zh').then((res) => {
//   if (res.data.code == 200) {
//     let arr: ResultsVo[] = res.data.data || []
//     arr.forEach((ele) => {
//       if (ele.group_type != 2) {
//         ele.group.forEach((element) => {
//           listDate.value.push(element)
//         })
//       }
//     })
//     console.log(listDate)
//   }
// })
//emit
</script>

<style lang="scss" scoped>
.regional {
  padding: 10px 12px;
  overflow: auto;
}

.bg-body-tertiary {
  cursor: pointer;

  &:hover {
    transition: all 0.5s;
    color: #fff;
    background: #0078ff !important;
  }
}

.activeBtn {
  &:hover {
    background: transparent !important;
    color: #333;
  }
}

.text_overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /*省略几行写几*/
  -webkit-box-orient: vertical;
}

.overflow {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.car {
  // padding;
  margin-bottom: 10px;
  background: #eeeeee;
  padding: 8px;
  border-radius: 4px;

  &:hover {
    transition: all 0.5s;
    color: #fff;
    background: #0078ff;
  }

  i {
    all: unset;
    color: #ff8d24;
    text-decoration: none;
  }
}

// .music {
//   background: url('@/assets/img/music_001.png') no-repeat;
//   background-position: center;
//   background-size: 100%;
// }
.img_hover:hover {
  transform: scale(1.1);
  transition: all 0.3s;
}
</style>
