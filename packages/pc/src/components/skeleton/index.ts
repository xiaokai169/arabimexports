import skeleton from './index.vue'
// 写法一：对象中定义 install 函数
const mySkeleton: any = {
  install(app: any) {
    // 定义一个实例方法
    app.config.globalProperties.sayHello = function () {
      alert('Hello, Nancy!')
    }
    // 定义一个全局指令：元素挂载后"自动聚焦"及"动态绑定数据"
    app.directive('mySkeleton', {
      mounted(el: any, binding: any) {
        el.focus()
        el.value = binding.value
      }
    })
    // 定义一个全局按钮组件
    app.component('my-skeleton', skeleton)
  }
}
export default mySkeleton
