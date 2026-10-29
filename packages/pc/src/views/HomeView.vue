<template>
  <div class="main">
    <header>
      <!-- <div
        class="d-flex align-items-center justify-content-end"
        style="
          width: 100%;
          background: #000;
          margin-bottom: 10px;
          padding: 10px 0;
          padding-right: 30px;
        "
      >
        
      </div> -->
      <div class="content div-flex ac js">
        <div class="div-flex ac" :class="{ arabImg: langVal == 'arabic' }">
         
          <div  class="imgBorder" style="width: 64px; height: 64px;">
            <img src="@/assets/img/logo.png" alt="" style="width: 50px; height: 50px" />
          </div>
          <div class="imgBorder" style="width: 64px; height: 64px;margin-right: 6px;">
            <img src="@/assets/img/logo1.png" alt="" style="width: 50px; height: 50px" />
          </div>
          <div class="text">
            <p class="ai" style="width: 100%; padding-left: 20px">{{ $t('home_title') }}</p>
            <p class="ai" style="width: 100%; padding-left: 20px">{{ $t('home_title1') }}</p>
          </div>
        </div>
        <div class="div-flex ac">
          <SvgIcon name="icons_zh" size="30"></SvgIcon>
          <select
            v-model="langVal"
            class="form-select multiple"
            @change="tabChangeFn"
            style="margin: 0 12px"
          >
            <option value="en">{{ $t('en') }}</option>
            <option value="arabic">{{ $t('arab') }}</option>
          </select>
        </div>
      </div>
    </header>
    <main>
      <div class="video">
        <div class="video-background">
          <!-- <audio ref="myAudio" src="@/assets/mp3/hover_002.mp3"></audio> -->
          <VideoPlay src="https://files.arab-bee.com/website_video/one/master.m3u8"></VideoPlay>
          <!-- <VideoPlay src="/master.m3u8"></VideoPlay> -->

          <!-- <video muted id="myVideo" ref="videoRef" :poster="videoPoster" controls>
            <source :src="videoSrc" type="video/mp4" />
          </video> -->
          <!-- <canvas id="canvasId" width="640" height="360" style="display: none"></canvas> -->
          <!-- <div class="btnBox div-flex">
            <div
              class="btn"
              :class="{ active_video_btn: activeVideoBtn == index }"
              v-for="(item, index) in videoList"
              :key="index"
              @click="tabVideoFn(index)"
            >
              {{ index + 1 }}
            </div>
          </div> -->
        </div>
      </div>

      <div style="position: relative; top: -40px">
        <nav>
          <div class="content d-flex flex-row nav">
            <slotBox
              v-for="item in navList"
              :key="item.path"
              class="nav_item"
              @click="toRouLink(item)"
            >
              <div class="imgBorder">
                <img :src="item.path" style="width: 64px; height: 64px" alt="" />
              </div>
              <div v-if="Array.isArray(item.name)" style="flex: 1">
                <p v-for="e in item.name" :key="e" style="text-align: center">{{ e }}</p>
              </div>
              <p v-else-if="item.name" style="text-align: center; flex: 1">{{ item.name }}</p>
            </slotBox>
            
          </div>
          <div class="content div-flex js menuItemBox">
           
            <button3D
              class="menuItem"
              style="margin-bottom: 12px"
              :activeItem="activeItem == item.id"
              v-for="(item, index) in listDate"
              :key="index"
              @click="menuClickFn(item)"
            >
              {{ item.name }}
            </button3D>
          </div>
        </nav>
        <div class="content div-flex justify-between">
          <div class="main_left div-flex" v-if="mainList.length" :style="{ height: `100%` }">
           
            <button3D
              :activeItem="activeLeftItem == item.id"
              style="margin-bottom: 8px"
              v-for="item in mainList"
              :key="item.id"
              @click="leftTabFn(item)"
            >
              <div style="padding: 5px 0">
                <span
                  :class="`iconfont icon-${item.icon}`"
                  style="display: block; margin: 0 12px; font-size: 18px"
                ></span>
                <div class="div-flex js" style="width: 100%">
                  <p style="text-align: left">{{ item.name }}</p>
                </div>
              </div>
            </button3D>
          </div>
          <div
            ref="mainRightRef"
            class="main_right"
            :class="{ main_right_box: !['001'].includes(activeItem) }"
          >
            <imgBox
              v-if="[1, 3, 7].includes(activeLeftItem) "
            >
              <!-- 纵向 -->
              <Presideency pageType="presideency" v-if="activeLeftItem == 1" />
              <Presideency pageType="founder" v-if="activeLeftItem == 7" />
              <!-- <founder v-if="activeLeftItem == 7" /> -->
              <generalSecretary v-if="activeLeftItem == 3" />
              <!-- <Services v-if="activeItem == '003'" /> -->
            </imgBox>
            <aboutUs v-if="activeItem == '009'" />
            <RegionalOffice ref="RegionalOfficeRef" v-if="activeLeftItem == 2" />
            <ContactUs v-if="activeLeftItem == 8" />
            <organizedStructure
              v-if="activeLeftItem == 6"
              @toLink="menuClickFn({ id: '008', name: '' })"
            />
              <Presideency pageType="establishment" v-if="activeLeftItem == 5" />
              <!-- <estabPage v-if="activeLeftItem == 5" /> -->
            <boardOfGeneral v-if="activeLeftItem == 4" />
            <!-- 横向 -->
             <!-- <img src="@/assets/img/active_001.webp" alt="" v-if="activeLeftItem == 9" width="100%" /> -->
            <Services  v-if="activeLeftItem == 9" />
            <Activates v-if="activeLeftItem == 10" />
            <Media v-if="activeLeftItem == 11" />
            <News v-if="activeLeftItem == 12" />
            <regionalOfficePage v-if="activeItem == '007'" />
            <arabAfrican v-if="activeItem == '008'" />
            <!-- <div v-else style="height: 400px"></div> -->
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="footer">{{ $t('footer_16') }}</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/views/components/Svgicon/index.vue'
import Presideency from './components/Presideency.vue'
import RegionalOffice from './components/RegionalOffice.vue'
import founder from './components/founder.vue'
import Services from './components/Services.vue'
import Activates from './components/Activates.vue'
import Media from './components/Media.vue'
import News from './components/News.vue'
import ContactUs from './components/ContactUs.vue'
import regionalOfficePage from './components/regionalOfficePage.vue'
import organizedStructure from './components/organizedStructure.vue'
import UnionBoard from './components/UnionBoard.vue'
import generalSecretary from './components/generalSecretary.vue'
import estabPage from './components/estabPage.vue'
import boardOfGeneral from './components/boardOfGeneral.vue'
import arabAfrican from './components/arabAfrican.vue'
import aboutUs from './components/aboutUs.vue'
import VideoPlay from './components/VideoPlay.vue'
import { onMounted, reactive, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useI18n } from 'vue-i18n'
import button3D from '@/components/button3D.vue'
import slotBox from '@/components/slotBox.vue'
import { useRouter } from 'vue-router'
import imgBox from '@/components/imgBox.vue'
let { t } = useI18n()
defineOptions({
  name: 'HomeView'
})
const activeVm = undefined
const { changeLanguage, language } = useAppStore()
type MenuList = {
  id: string
  name: string
}
// const httpStr = 'http://file.arab-alabo.com/'
const httpStr = 'https://files.arab-bee.com/'

const videoList = [
  { id: 1, src: `${httpStr}video/20241209/6zwj5ys34hrkj7arxsky2n2xkw5azhsy.mp4` },
  { id: 2, src: `${httpStr}video/20241210/5rca4hy38yn246tt8st4jt2z5nhn64s7.mp4` },
  { id: 3, src: `${httpStr}video/20241210/cfszkxayh8acdfinb762mfc2xzyrkx7t.mp4` },
  { id: 4, src: `${httpStr}video/20241210/5sj7jtcn6zjcdw72ahepb22h6i6xnn7w.mp4` }
]
console.log(videoList)

const mainRightRef = ref('')
const activeVideoBtn = ref(0)
const videoRef = ref()
const videoSrc = ref<string>()
const videoPoster = ref<any>()
function captureFrame(url: string, current: number | undefined) {
  const video: any = document.createElement('video')
  video.setAttribute('crossOrigin', 'anonymous')
  video.src = url
  const canvas: any = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  video.onloadedmetadata = () => {
    video.currentTime = current //指定视频的低3秒
  }
  video.oncanplay = () => {
    canvas.width = 1920
    canvas.height = 1080
    ctx.drawImage(video, 0, 0, 1920, 1080)
    const imgUrl = canvas.toDataURL('image/png')
    videoPoster.value = imgUrl
  }
}
/**
 * 按文件名取图片 URL。
 *
 * 原实现是 `new URL('../assets/img/' + name, import.meta.url).href`，它用相对路径指向
 * 本应用 src 下的图片目录。图片统一迁到 packages/shared/assets/img 之后该目录已空，
 * Vite 对这种带变量的 new URL 只做目录扫描、不会报错，结果是构建时静默丢掉大量资源。
 *
 * 改用 import.meta.glob（支持 @ 别名）。glob 返回对象的键名格式会随别名配置变化
 * （别名指向 app 之外时尤其不可预期），因此按文件名建索引、按文件名取值。
 */
// 扩展名大小写都要列 —— glob 区分大小写，仓库里确实存在 photo_00x.JPG 这类大写后缀
const imgModules = import.meta.glob(
  '@/assets/img/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,gif,GIF}',
  {
    eager: true,
    query: '?url',
    import: 'default'
  }
) as Record<string, string>

const imgUrlByName: Record<string, string> = {}
for (const [path, url] of Object.entries(imgModules)) {
  const fileName = path.split('/').pop()
  if (fileName) imgUrlByName[fileName] = url
}

const getImagePath = (name: string) => imgUrlByName[name] ?? ''
const navList = [
  { name: t('router_link_01'), to: '/arabFund', path: getImagePath('regional-office_07.png') },
  {
    // , t('router_link_03')
    name: [t('router_link_02')],
    to: '/arabExportAndImportBank',
    path: getImagePath('regional-office_09.png')
  },
  {
    name: t('router_link_08'),
    to: 'http://shop.arab-alabo.com/',
    path: getImagePath('mall_icon_001.png')
  },
  {
    name: [t('router_link_04')],
    to: '/beeFinancialServiceGroup',
    path: getImagePath('regional-office_11.png')
  },
  {
    // t('router_link_07')
    name: [t('router_link_06')],
    to: '/economics',
    path: getImagePath('regional-office_14.png')
  }
]
const regex = /^(http|https):/
const router = useRouter()
function toRouLink(item: any) {
  if (regex.test(item.to)) {
    // window.open(item.to)
  } else {
    router.push(item.to)
  }
}
function tabVideoFn(i: number) {
  captureFrame(videoList[i].src, 5 + i * 5)
  activeVideoBtn.value = i
  console.dir(videoRef.value)

  videoRef.value?.load(videoList[i].src)
  videoSrc.value = videoList[i].src
}
const listDate = ref<MenuList[]>([
  { name: t('menu_text_01'), id: '001' },
  { name: t('menu_text_09'), id: '003' },
  // { name: t('menu_text_03'), id: '004' },
  { name: t('menu_text_10'), id: '005' },
  // { name: t('menu_text_05'), id: '006' },
  { name: t('menu_text_06'), id: '007' },
  // { name: t('menu_text_07'), id: '008' },
  { name: t('menu_text_08'), id: '009' }
])
const activeItem = ref<string>('001')
const activeLeftItem = ref<number>(1)
function toLinkFn(str: string) {
  window.open(str)
}
function tabChangeFn() {
  changeLanguage(langVal.value)
  window.location.reload()
}
type MainList = {
  id: number
  type?: string
  ishiden?: boolean
  children?: boolean
  name: string
  isChidren?: boolean
  icon?: string
}
// 横向切换事件
function menuClickFn(item: MenuList) {
  activeLeftItem.value = 1
  activeItem.value = item.id
  if (item.id == '001') {
    activeLeftItem.value = 1
    mainList.value = manList
  }
  if (item.id == '003') {
    activeLeftItem.value = 9
    mainList.value = []
  }
  if (item.id == '005') {
    activeLeftItem.value = 11
    mainList.value = []
  }
  if (!['001', '003', '005'].includes(item.id)) {
    activeLeftItem.value = 0
    mainList.value = []
  }
}
function leftTabFn(item: MainList) {
  console.log(item.id);
  if(![2,3,6].includes(item.id)){
    activeLeftItem.value = item.id

  }
  if (item.isChidren) {
    return false
  }
  if (item.children) {
    mainList.value.forEach((element: any) => {
      if (element.type == 'children') {
        element.ishiden = false
      } else {
        element.ishiden = true
      }
    })
  } else {
    mainList.value.forEach((element: any) => {
      if (element.type == 'children') {
        element.ishiden = true
      } else {
        element.ishiden = false
      }
    })
  }
}
let manList: any = [
  // Presideency Regional  office General  secretary       board of
  {
    id: 1,
    name: t('menu_left_text_01'),
    icon: 'zhuxi'
  },
  {
    id: 7,
    name: t('menu_left_text_02'),
    icon: '1189'
  },
  {
    id: 2,
    name: t('menu_left_text_03'),
    icon: '4banshichu'
  },
  {
    id: 3,
    name: t('menu_left_text_04'),
    icon: 'icon-85'
  },
  {
    id: 4,
    name: t('menu_left_text_05'),
    icon: 'a-bianzu22'
  },
  {
    id: 5,
    name: t('menu_left_text_06'),
    icon: 'establishment-sign-o-'
  },
  {
    id: 6,
    name: t('menu_left_text_07'),
    icon: 'zuzhijiagou'
  },

  {
    id: 8,
    name: t('menu_left_text_08'),
    icon: '1189'
  }
]
let serviceList: any = [
  {
    id: 9,
    name: t('menu_text_02'),
    icon: 'fuwuguanli'
  },
  {
    id: 10,
    name: t('menu_text_03'),
    icon: 'huodong1'
  }
]
let news: any = [
  {
    id: 11,
    name: t('menu_text_04'),
    icon: 'qimeiti'
  },
  {
    id: 12,
    name: t('menu_text_05'),
    icon: '24gl-newspapers2'
  }
]
const mainList = ref(manList)

const langVal = ref<string>('arabic')

onMounted(() => {
  langVal.value = language || 'arabic'
  changeLanguage(langVal.value)

  tabVideoFn(0)
})
//emit
</script>

<style lang="scss" scoped>
.justify-between {
  justify-content: space-between;
}

.content {
  width: 1320px;
  margin: 0 auto;
}

.main {
  position: relative;
  width: 100%;
  background: rgb(213 202 205);
  // background: #d8d8d8;
  z-index: 1;
}

header {
  padding: 6px 0;
  background: var(--vt-c);
  color: #fff;
  overflow: hidden;

  .text {
    height: 100%;
    font-size: 24px;
    font-weight: 700;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
}

main {
  .video {
    position: relative;

    &:hover {
      .btnBox {
        display: flex;
      }
    }

    .btnBox {
      position: absolute;
      bottom: 100px;
      width: 100%;
      z-index: 999;
      text-align: right;
      display: none;
      justify-content: center;

      .btn {
        color: #fff;
        border: 1px solid #ffff;
        width: 12%;
        height: 50px;
        margin-right: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 4px;

        &:hover {
          background: rgba(1, 80, 172, 0.6);
        }
      }

      .active_video_btn {
        background: rgba(1, 104, 221, 0.6);
        color: #fff;
      }
    }
  }

  .video-background {
    position: relative;
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  #myVideo {
    width: calc(100vw);
    height: calc(100vh - 150px);
    object-fit: cover;
  }

  .main_left {
    width: calc(100% / 5 );
    height: 100%;
    flex-flow: column;
    // box-shadow: 0 0 5px -1px #9d9b9b;
    position: relative;
    margin-bottom: 6px;
    
    .main_left_box {
      position: absolute;
      height: 100%;
    }

    .left_item {
      margin-bottom: 12px;
      border-bottom: 1px solid #e6e6e6;
      border-top: none;
      padding: 20px 0;
      padding-left: 20px;
      padding-right: 20px;
      display: flex;
      align-items: center;
      border-radius: 3px;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
      // margin-bottom:6px;
      &:hover {
        color: #fff;
        background: var(--vt-c-bgc-lg);
        box-shadow: inset 0px 0px 5px 0px rgba(250, 248, 248, 0.4);
      }
    }

    .left_children {
      padding-left: 40px;
    }

    .active_left_item {
      background: var(--vt-c-bgc-lg);
      color: #fff;
      border-bottom: 1px solid;
      border-top: 1px solid;
      border-color: var(--vt-c);
      transition: all 0.5s;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4) inset;
    }

    .isArrow {
      .icon-xialajiantou1 {
        transform: rotate(180deg);
      }
    }

    .icon-xialajiantou1 {
      transform: rotate(0deg);
    }

    .ishiden {
      display: none;
    }
  }

  .main_right {
    width: calc(100% - (100% / 6 + 50px));
    background: rgb(255, 255, 255);
    position: relative;
  }
  .main_right_box {
    width: 100%;
  }
}

nav {
  padding-top: 40px;
  color: #fff;

  .nav {
    margin-bottom: 12px;
    // box-shadow: 0 0 5px 2px #9d9b9b;
  }

  .nav_item {
    cursor: pointer;
    position: relative;
    width: calc(100% / 5);
    height: 100px;
    border-radius: 3px;

    // &::after {
    //   content: '';
    //   position: absolute;
    //   width: 100%;
    //   height: 0;
    //   left: 0;
    //   top: 0;
    //   background: rgba(0, 0, 0, 0.5);
    //   transition: all 0.3s;
    //   z-index: -1;
    // }
    // &::before {
    //   content: '';
    //   position: absolute;
    //   width: 100%;
    //   height: 0;
    //   left: 50%;
    //   top: 50%;
    //   transform: translate(-50%, -50%);
    //   background: rgba(0, 0, 0, 0.5);
    //   transition: all 0.3s;
    //   z-index: -1;
    // }
    // &:hover {
    //   position: relative;
    //   // z-index: 11;
    //   // box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
    //   // transform: scale(1.1);
    //   &::before {
    //     opacity: 0.6;
    //     background: rgba(185, 90, 0,0.3);
    //     height: 100%;
    //   }
    // }
    // box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.5);
  }

  .bg1 {
    font-size: 14px;
    // background: linear-gradient(0deg, #6fb3ff, #0168dd);
    background: var(--vt-c-bgc-lg);
    box-shadow: 1px 0px 0px 0px rgba(10, 4, 4, 0.35);
    border-right: 1px solid #fff;
  }

  .bg4 {
    font-size: 14px;
    background: var(--vt-c-bgc-lg);
    box-shadow: 1px 0px 0px 0px rgba(10, 4, 4, 0.35);
  }

  .bg2 {
    background: var(--vt-c-bgc-lg);
    box-shadow: 1px 0px 0px 0px rgba(180, 107, 6, 0.35);
  }

  .bg3 {
    width: calc(100% / 5);

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 5px;
      top: -25px;
      box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.5);
      border-radius: 50px;
      z-index: 19;
    }
  }

  .nav_item_unlike {
    position: absolute;
    width: 273px;
    height: 128px;
    bottom: 0;
    padding: 14px 0px 14px 27px;
    left: -0;
    z-index: 30;
    background: url('@/assets/img/regional-office_08.png') no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }

  .menuItemBox {
    flex-flow: wrap;
  }
  .menuItem {
    width: calc(calc(100% / 5) - 6px);
  }
  // .menuItem {
  //   border-bottom: 1px solid var(--vt-c-f);
  //   border-top: 1px solid var(--vt-c-f);
  //   border-radius: 4px;
  //   margin-bottom: 12px;
  //   margin-left: 6px;
  //   margin-right: 6px;
  //   width: calc(100% / 9 - 30px);
  //   border-right: 1px solid #fff;
  //   padding: 12px;
  //   background: #eaeaea !important;
  //   // box-shadow:inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  //   border-radius: 3px;
  //   color: #333;
  //   box-shadow:
  //     inset 0 0 10px 0 rgba(255, 254, 254, 0.2),
  //     0 0 10px 0 rgba(0, 0, 0, 0.6);
  //   border-right: none;
  //   &:last-child {
  //     margin-right:0;
  //   }
  //   &:first-child {
  //     margin-left:0;
  //   }
  //   &:hover {
  //     position: relative;
  //     color: #fff;
  //     background: var(--vt-c-bgc-lg) !important;
  //     opacity:0.6;
  //     &::after {
  //       content: '';
  //       position: absolute;
  //       width: 10px;
  //       height: 10px;
  //       left: 50%;
  //       transform: translateX(-50%);
  //       bottom: -10px;
  //       z-index: 10;
  //       border-left: 10px solid transparent;
  //       border-right: 10px solid transparent;
  //       border-top: 10px solid var(--vt-c);
  //     }
  //   }
  // }

  .autoItem {
    flex: auto;
    // margin-left: 12px;
    margin-bottom: 12px;

    &:last-child {
      margin-right: 0;
    }
  }

  // .activeItem {
  //   width: calc(100% / 8 + 50px);
  //   color: #fff;
  //   background: var(--vt-c-bgc-lg) !important;
  //   transition: all 0.5s;
  //   // border-bottom: 1px solid var(--vt-c-f);
  //   position: relative;

  //   &::after {
  //     content: '';
  //     position: absolute;
  //     width: 10px;
  //     height: 10px;
  //     left: 50%;
  //     transform: translateX(-50%);
  //     bottom: -9px;
  //     z-index: 1;
  //     border-left: 10px solid transparent;
  //     border-right: 10px solid transparent;
  //     border-top: 10px solid var(--vt-c-f);
  //   }
  // }
}
.imgBorder {
  border-radius: 50%;
  border: 1px solid #000;
  width: 80px;
  height: 80px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
footer {
  // padding-top: 20px;
  .footer_content {
    width: 100%;
    background: url(@/assets/img/regional-office_06.png) no-repeat;
    background-size: 100%;
    background-position: center center;
    font-size: 14px;

    p {
      padding: 6px;
      line-height: 18px;
    }
  }

  .footer {
    text-align: center;
    padding: 16px 0;
    color: rgba(255, 255, 255, 0.8);
    background: var(--vt-c);
  }
}

.form-select {
  width: 120px;
}
</style>
