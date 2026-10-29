<template>
    <div class="regionalBox">
      <div class="card">
        <img src="" alt="">
        <p>مكتب إقليم الأردن للأتحاد</p>
        <p>قيد التطوير</p>
      </div>
      <div class="card">
        <img src="" alt="">
        <p>مكتب أقليم سوريا للأتحاد</p>
        <p>قيد التطوير</p>
      </div>
    </div>
  </template>
<script setup lang="ts">
//导入接口

//导入公共方法

//导入组件

defineOptions({
  name: "regionalOfficePage",
});
//props

//emit

//公共属性
//公共方法
//-----------------私有属性---------------------

//-----------------私有属性end---------------------
//生命周期
</script>



<style lang="scss" scoped>
.regionalBox {
  height: 20vh;
  padding: 12px;
  display: flex;
}
.card {
  border: none;
  color: #fff;
  margin:0 6px ;
  width: 200px;
  height: 100px;
  box-shadow: 0px 0px 10px 0px #858484;
  background:rgb(171 170 170);
  p {
    padding: 0;
  }
}
</style>
