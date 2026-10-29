import { Skeleton, SkeletonItem } from '@/directive/skeleton' // 获取焦点
import { App } from 'vue'

export default function registerDirectives(app: App<Element>) {
  app.directive('skeleton-page', Skeleton)
  app.directive('skeleton-page-item', SkeletonItem)
}
