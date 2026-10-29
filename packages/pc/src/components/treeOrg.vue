<template>
  <div :style="{ height: height, width: '100%' }">
    <vue3-tree-org
      :data="listDate"
      :horizontal="config.horizontal"
      :collapsable="config.collapsable"
      :label-style="config.style"
      :node-draggable="false"
      :draggable="draggable"
      :scalable="false"
      :only-one-node="config.onlyOneNode"
      :default-expand-level="1"
      :clone-node-drag="config.cloneNodeDrag"
      :toolBar="{
        scale: false,
        restore: false,
        expand: false,
        zoom: false,
        fullscreen: fullscreen
      }"
      @on-contextmenu="onMenus"
      @on-node-click="onNodeClick"
    >
      <!-- 自定义节点内容 -->

      <!-- 自定义展开按钮 -->
      <!-- <template v-slot:expand="{ node }">
        <div>{{ node.children.length }}</div>
      </template> -->
    </vue3-tree-org>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
const props = defineProps({
  height: {
    type: String,
    default: ''
  },
  listDate: {
    type: Array,
    require: true
  },
  fullscreen: {
    type: Boolean,
    require: false
  },
  draggable: {
    type: Boolean,
    require: false
  }
})
const { height, listDate, fullscreen, draggable } = toRefs(props)
console.log(listDate?.value, '0------------------------0')

const config = reactive({
  horizontal: false,
  collapsable: false,
  onlyOneNode: false,
  cloneNodeDrag: false,
  style: {
    background: '#fff',
    color: '#5e6d82'
  }
})
const onMenus = (e: any) => {
  console.log(e.node, e.command)
}
const onNodeClick = (e: any, data: any) => {
  // this.$Message.info(data.label)
}
const expandChange = () => {
  // this.toggleExpand(this.data, this.expandAll)
}
defineOptions({
  name: 'slotTree'
})
</script>
<style lang="scss" scoped>
.tree-org-node__text {
  text-align: left;
  font-size: 14px;
  .custom-content {
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid currentColor;
  }
}
</style>
