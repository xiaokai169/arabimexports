import { reactive } from 'vue'
import syriaFlag from '@/assets/img/Flag_of_Syria.svg.png'
import jordanFlag from '@/assets/img/Flag_of_Jordan.svg.png'

/**
 * 区域办事处 —— 国家数据
 *
 * 说明：桌面端此处的国旗用的是远程地址 http://file.arab-alabo.com/...，
 * 该域名目前已经无法访问（HTTP 000），会导致整片列表的国旗全部空白。
 * 移动端改为引用项目内置的国旗图片；文案沿用与桌面端相同的语言 key。
 */
const list = reactive<any[]>([
  {
    acitveBtn: false,
    name: 'data.eP2ti2aw', // Syria
    url: syriaFlag,
    content: 'data.trewGJEH'
  },
  {
    acitveBtn: false,
    name: 'data.ab33HBek', // Jordan
    url: jordanFlag,
    content: 'data.CGks7JNM'
  }
])

list.forEach((ele, index) => {
  ele.id = String(index + 1)
  ele.title = ele.name
  ele.introduction = ele.content
})

export default list
