<template>
  <AdaptionPage>
    <el-container>
      <el-header class="header_top">
        <div class="left_header" @click="toHome">
          <div></div>
        </div>
      </el-header>

      <el-container class="container">
        <!-- 侧边栏 -->
        <div>
          <el-aside class="home_container_aside">
            <div v-for="(item, index) in RouterList" :key="index" class="aa">
              <div class="cc">
                <svg-icon
                  :name="item.svg"
                  :style="{
                    color: PiniaStore.routerNowNum == index ? '#EEE' : '#666',
                  }"
                />
                <div
                  @click="changeSliderNum(index, item.path)"
                  :class="[
                    PiniaStore.routerNowNum == index ? 'bb' : 'info_style',
                  ]"
                >
                  {{ item.name }}
                </div>
                <!-- <router-link
                  :to="item.path"
                  active-class="bb"
                  class="info_style"
                  >{{ item.name }}
                </router-link> -->
              </div>
            </div>
            <!-- 切换按钮 -->
            <div v-if="!['page1', 'home'].includes(router.name)">
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
            :class="[
              'left2_side',
              PiniaStore.isOpenSlide ? 'infoOpenSlide' : 'closeSlide',
            ]"
          >
            <!-- page2显示的侧边 -->
            <div v-if="router.name == 'page2'" class="sildeBox">
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
            <div v-if="router.name == 'page3'" class="sildeBox">
              <LazyTree></LazyTree>
            </div>
          </el-aside>
        </div>

        <!-- 右侧内容 -->
        <el-card
          :class="['card', PiniaStore.isOpenSlide ? 'scaleCard' : 'infoCard']"
        >
          <el-main class="home_container_main">
            <!--XXX 设置跨路由的动画、所有的router-view加上key只会导致动画失效 -->
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
      </el-container>
    </el-container>
  </AdaptionPage>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "@/store/pinia";
import { version } from "../../package.json";
import AdaptionPage from "./adaptionPackage/index";

const PiniaStore = useMainStore();
let router = useRoute();
let Router = useRouter();
console.log("路由-------------", router);
watch(
  () => router,
  ({ name }, oldData) => {
    console.log(
      `%cVersion:%c${version}`,
      "padding: 3px; color: white; background: #023047; border-radius: 5px 0 0 5px;",
      "padding: 3px; color: white; background: #219EBC;border-radius: 0 5px 5px 0;"
    );
    // https://www.jb51.net/article/263340.htm
    if (version !== PiniaStore.version) {
      // ElMessage.warning("版本更新, 请尝试刷新整个网页!");
      PiniaStore.version = version;
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
let RouterList = reactive([
  { path: "page1", name: "数据处理", svg: "user" },
  { path: "page2", name: "数据服务", svg: "bug" },
  { path: "page3", name: "资源目录", svg: "star" },
]);
// 用于动态绑定图标
let IconList = reactive(["bg-img0", "bg-img1", "bg-img2"]);

let page2SilderList = reactive([
  "空间属性",
  "图属联动",
  "智能量算",
  "卷低对比",
  "飞行模式",
  "覅之关闭",
]);
let page2Active = ref(0);

const changeSliderNum = (num, path) => {
  PiniaStore.changeRouterNowNum(num);
  Router.push(path);
};

const toHome = () => {
  PiniaStore.changeRouterNowNum(111);
  Router.push({ name: "home" });
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
  width: calc(100% - 232px);
  height: 985px;
  margin: 15px;
  position: absolute;
  left: 197px;
}

.scaleCard {
  width: calc(100% - 430px);
  height: 985px;
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
.container {
  overflow: hidden !important;
  .left2_side {
    width: 197px;
    height: 1018px;
    background: #ffffff;
    // border: 2px solid red;
    position: absolute;
    z-index: 10;
    top: 62px;
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
}
.home_container_main {
  box-sizing: border-box;
  margin: 15px;
  height: 945px;
  overflow: hidden;
  // border: 3px solid red;
}

a {
  display: inline-block;
  width: 197px;
  height: 42px;
  line-height: 42px;
}

.aa {
  width: 197px;
  height: 42px;
  display: inline-flex;
}

.bb {
  width: 198px;
  height: 42px;
  background: linear-gradient(90deg, #0066c8, #d1e7fd);
  line-height: 42px;
  text-align: center;
  opacity: 0.9;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff !important;
  box-sizing: border-box;
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

.cc {
  width: 197px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  border: none;
  outline: none;
  > svg {
    width: 18px;
    height: 18px;
    border: 3px solid transparent;
    position: absolute;
    left: 38px;
    z-index: 2;
    margin-top: 10px;
    background-size: 100% 100%;
  }
  .bg-img0 {
    background: url("@img/gjx/数据处理ICON.png") no-repeat center;
  }
  .bg-img1 {
    background: url("@img/gjx/数据服务ICON.png") no-repeat center;
  }
  .bg-img2 {
    background: url("@img/gjx/资源目录ICON.png") no-repeat center;
  }
}

.home_container {
  overflow-y: hidden;
}

.home_container_aside {
  user-select: none;
  margin-top: -1px;
  background: #ffffff;
  height: 1100px;
  width: 197px;
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
  width: 100%;
  background: linear-gradient(90deg, #1d3363, #0f2044);
  box-shadow: 0px 4px 5px 0px rgba(214, 214, 214, 0.24);
  .left_header {
    cursor: pointer;
    width: 358px;
    height: 42px;
    margin: 13px 0 0 0;
    // border: 2px solid yellowgreen;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    > div:nth-child(1) {
      width: 289px;
      height: 40px;
      // border: 2px solid red;
      background: url("@img/gjx/logo.png") no-repeat center;
      background-size: 100% 100%;
    }
  }
}
</style>
