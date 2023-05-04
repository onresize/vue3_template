<template>
  <!-- <AdaptionPage> -->
  <el-container class="container-box">
    <!-- 侧边栏 -->
    <div>
      <el-aside
        class="home_container_aside"
        :style="{ width: PiniaStore.isCollapse ? '65px' : '197px' }"
      >
        <el-menu
          default-active="1"
          :collapse="PiniaStore.isCollapse"
          :collapse-transition="false"
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          style="height: 100vh"
          :unique-opened="true"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>导航栏</span>
            </template>
            <el-menu-item
              v-for="(item, index) in RouterList1"
              :key="index"
              :index="index + '-' + index + 1"
              @click="changeSliderPath(item.path)"
            >
              <el-icon>
                <component :is="item.meta?.ico"></component>
              </el-icon>
              <template #title> {{ item.meta.title }}</template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item
            v-for="(item, index) in RouterList"
            :key="index"
            :index="index + 1"
            @click="changeSliderPath(item.path)"
          >
            <el-icon>
              <component :is="item.meta?.ico"></component>
            </el-icon>
            <template #title> {{ item.meta.title }}</template>
          </el-menu-item>
        </el-menu>
        <!-- 切换按钮 -->
        <div v-if="!['page1', 'home', '404'].includes(router.name)">
          <div
            v-if="PiniaStore.isOpenSlide"
            class="left_btn"
            @click="closeSlide"
          ></div>
          <div v-else class="right_btn" @click="openSlide"></div>
        </div>
      </el-aside>
      <!-- 动态伸缩侧边 -->
      <el-aside
        v-if="['page2', 'page3'].includes(router.name)"
        :class="[
          'left2_side',
          PiniaStore.isOpenSlide ? 'infoOpenSlide' : 'closeSlide',
        ]"
      >
        <!-- page2显示的侧边 -->
        <div v-show="router.name == 'page2'" class="sildeBox">
          <div
            v-for="(item, i) in page2SilderList"
            :key="i"
            :class="[page2Active == i ? 'itemSildeBox' : 'infoSliderBox']"
            @click="page2Active = i"
          >
            <span>
              {{ item }}
            </span>
          </div>
        </div>
        <!-- page3显示的侧边 -->
        <div v-show="router.name == 'page3'" class="sildeBox">
          <LazyTree></LazyTree>
        </div>
      </el-aside>
    </div>

    <!-- 右侧内容 -->
    <div>
      <el-header
        :class="[
          'header_top',
          PiniaStore.isOpenSlide ? 'scaleHeader' : 'infoHeader',
        ]"
      >
        <div class="left_header">
          <svg-icon
            :name="PiniaStore.isCollapse ? 'collapse' : 'noCollapse'"
            class="ico"
            v-show="['/home', '/page1'].includes(router.path)"
            @click="changeCollapse"
          />
        </div>
      </el-header>

      <el-card
        :class="['card', PiniaStore.isOpenSlide ? 'scaleCard' : 'infoCard']"
      >
        <el-main class="home_container_main">
          <!-- XXX 设置跨路由的动画、所有的router-view加上key只会导致动画失效 -->
          <router-view v-slot="{ Component }">
            <transition name="slide-fade">
              <keep-alive include="home">
                <component
                  class="child-view"
                  :is="Component"
                  :key="router.path"
                />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-card>
    </div>
  </el-container>
  <!-- </AdaptionPage> -->
</template>

<script setup>
import {
  ref,
  reactive,
  watch,
  computed,
  nextTick,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import { useMainStore } from "@/store/pinia";
import { version } from "../../package.json";
import AdaptionPage from "./adaptionPackage/index";
import routerList from "@/router/routes/index.ts";

let RouterList = routerList[3].children.filter(
  (v) => !["404", "home"].includes(v.name)
);
let RouterList1 = routerList[3].children.filter((v) =>
  ["404", "home"].includes(v.name)
);

let { ctx, proxy } = getCurrentInstance();

const PiniaStore = useMainStore();
let router = useRoute();
let Router = useRouter();
// console.log("路由:", router);

const infoCardWid = ref("calc(100vw - 232px)");

// 监听屏幕变化
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = window.innerWidth;
  if (!["page1", "home"].includes(router.name)) return;
  if (!PiniaStore.isCollapse && screenWidth.value < 760)
    PiniaStore.changeSliderState(true);
  if (PiniaStore.isCollapse && screenWidth.value > 760)
    PiniaStore.changeSliderState(false);
}, 100);

window.addEventListener("resize", listeningWindow, false);

onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});

const changeCollapse = () => {
  PiniaStore.changeSliderState(!PiniaStore.isCollapse);
};

watch(
  () => router,
  ({ name }, oldData) => {
    // console.log(
    //   `%cVersion:%c${version}`,
    //   "padding: 3px; color: white; background: #023047; border-radius: 5px 0 0 5px;",
    //   "padding: 3px; color: white; background: #219EBC;border-radius: 0 5px 5px 0;"
    // );
    // https://www.jb51.net/article/263340.htm
    // if (version !== PiniaStore.version) {
    // ElMessage.warning("版本更新, 请尝试刷新整个网页!");
    // PiniaStore.version = version;
    // }
    console.log("home监听路由：", name);
    if (name == "404") {
      PiniaStore.changeIsOpenSlide(false);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

watch(
  () => PiniaStore.isCollapse,
  (val) => {
    if (["/home", "/page1"].includes(router.path)) {
      console.log("监听到侧边栏状态值：", val);
      nextTick(() => {
        if (val) {
          infoCardWid.value = "calc(100vw - 100px)";
        } else {
          infoCardWid.value = "calc(100vw - 232px)";
        }
      });
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

let key = computed(() =>
  router.name
    ? String(router.name) + new Date()
    : String(router.path) + new Date()
);

let page2SilderList = reactive([
  "空间属性",
  "图属联动",
  "智能量算",
  "卷低对比",
  "飞行模式",
  "覅之关闭",
]);
let page2Active = ref(0);

const changeSliderPath = (path) => {
  Router.push(path);
};

const closeSlide = () => {
  PiniaStore.$patch({
    isOpenSlide: false,
  });
};
const openSlide = () => {
  PiniaStore.$patch({
    isOpenSlide: true,
  });
};
</script>

<style scoped lang="less">
:deep(.card) {
  transition: all 0s !important;
  .el-card__body {
    padding: 0;
    box-sizing: border-box;
  }
}
.infoCard {
  width: v-bind(infoCardWid);
  height: calc(100% - 92px);
  margin: 15px;
  position: absolute;
}

.scaleCard {
  width: calc(100% - 430px);
  height: calc(100% - 92px);
  margin: 15px;
  position: absolute;
  left: 395px;
}

// 跨路由动画
.child-view {
  height: 100%;
  transition: all 0.7s cubic-bezier(0.58, 0.09, 0.33, 0.91);
}

/* 进入 */
.slide-fade-enter-from {
  transform: translateX(-calc(100vw));
  opacity: 0;
}
/* 离开 */
.slide-fade-leave-to {
  transform: translateX(260px);
  opacity: 0;
}
// 设置隐藏滚动条且还能滚动
.container-box {
  overflow: hidden;
  display: flex;
  width: 100vw;
  .left2_side {
    width: 197px;
    height: 100%;
    background: #ffffff;
    // border: 2px solid red;
    position: absolute;
    z-index: 10;
    top: 0;
    // transition: all 1s;
    .sildeBox {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 23px;
      // border: 2px solid red;
      display: flex;
      flex-direction: column;

      .infoSliderBox {
        box-sizing: border-box;
        width: 140px;
        height: 36px;
        line-height: 36px;
        background: #ffffff;
        border-radius: 4px;
        text-align: center;
        user-select: none;
        cursor: pointer;
        > span {
          width: 140px;
          height: 15px;
          line-height: 14px;
          font-size: 14px;
          border-radius: 2px;
          display: inline-block;
          font-family: Microsoft YaHei;
          font-weight: 400;
          opacity: 0.8;
          color: #333333;
        }
      }

      .itemSildeBox {
        box-sizing: border-box;
        width: 140px;
        height: 36px;
        line-height: 36px;
        background: #e1edf9;
        border-radius: 4px;
        text-align: center;
        user-select: none;
        // transition: all 0.7s;
        > span {
          width: 140px;
          height: 15px;
          line-height: 14px;
          font-size: 14px;
          border-left: 2px solid #0369cb;
          border-radius: 2px;
          display: inline-block;
          font-family: Microsoft YaHei;
          font-weight: 400;
          opacity: 0.8;
          color: #2980d6;
        }
      }
    }
  }
  .closeSlide {
    z-index: -1;
  }
  .infoOpenSlide {
    left: 197px;
    box-shadow: 6px 0px 12px rgba(0, 0, 0, 0.12) inset;
  }

  > div:nth-child(2) {
    flex: 1;
  }
}
.home_container_main {
  box-sizing: border-box;
  margin: 15px;
  height: 945px;
  overflow: hidden;
  // border: 3px solid red;
}

.info_style {
  width: 198px;
  height: 42px;
  line-height: 42px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  text-decoration: none;
  opacity: 0.9;
  color: #333333;
  cursor: pointer;
}

.home_container {
  overflow-y: hidden;
}

.home_container_aside {
  user-select: none;
  margin-top: -1px;
  background: #ffffff;
  width: 197px;
  height: 100vh;
  box-sizing: border-box;
  .left_btn {
    width: 19px;
    height: 45px;
    background: url("@img/gjx/收起.png") no-repeat center;
    position: absolute;
    bottom: 30px;
    left: 179px;
    cursor: pointer;
    filter: opacity(0.7);
  }
  .right_btn {
    width: 19px;
    height: 45px;
    background: url("@img/gjx/打开.png") no-repeat center;
    position: absolute;
    bottom: 30px;
    left: 179px;
    cursor: pointer;
    filter: opacity(0.7);
  }
}

.el-aside::-webkit-scrollbar {
  display: none;
}
.header_top {
  height: 62px;
  // background: linear-gradient(90deg, #1d3363, #0f2044);
  // box-shadow: 0px 4px 5px 0px rgba(214, 214, 214, 0.24);
  box-sizing: border-box;
  border: 1px solid #e4e7ed;
  background-color: #ffffff;
  overflow: hidden;
  color: #303133;

  .left_header {
    width: 358px;
    height: 42px;
    margin-left: -10px;
    // border: 2px solid yellowgreen;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    .ico {
      cursor: pointer;
      font-size: 24px;
    }
  }
}

.infoHeader {
  // width: calc(100vw - 195px);
  position: relative;
  left: 0;
}

.scaleHeader {
  // width: calc(100vw - 393px);
  position: relative;
  left: 197px;
}
</style>
