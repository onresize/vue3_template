<template>
  <AdaptionPage>
    <el-container style="background: #f5f5f5">
      <el-header class="header_top">
        <div class="left_header">
          <div>
            <div class="bg_l"></div>
            <div class="border_r"></div>
          </div>
          <div></div>
        </div>
      </el-header>

      <el-container class="container">
        <!-- 侧边栏 -->
        <el-card style="height: 10010px; width: 227px" class="card">
          <el-aside class="home_container_aside">
            <div v-for="(item, index) in RouterList" :key="index" class="aa">
              <div class="cc">
                <span :class="IconList[index]"></span>
                <router-link
                  :to="item.path"
                  active-class="bb"
                  class="info_style"
                  >{{ item.name }}
                </router-link>
              </div>
            </div>
            <div v-if="router.name != 'page1'">
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
        </el-card>

        <!-- 右侧内容 -->
        <el-card
          :class="['card', PiniaStore.isOpenSlide ? 'scaleCard' : 'infoCard']"
        >
          <el-main class="home_container_main">
            <!--XXX 设置跨路由的动画、所有的router-view加上key只会导致动画失效 -->
            <router-view v-slot="{ Component }">
              <transition name="slide-fade">
                <component class="child-view" :is="Component" />
              </transition>
            </router-view>
          </el-main>
        </el-card>
      </el-container>
    </el-container>
  </AdaptionPage>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useMainStore } from "@/store/main";
import { version } from "../../package.json";
import AdaptionPage from "./adaptionPackage/index";

const PiniaStore = useMainStore();
let router = useRoute();
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
      ElMessage.warning("版本更新, 请尝试刷新整个网页!");
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
let RouterList = reactive<object[]>([
  { path: "page1", name: "数据处理" },
  { path: "page2", name: "数据服务" },
  { path: "page3", name: "资源目录" },
]);
// 用于动态绑定图标
let IconList = reactive<string[]>(["bg-img0", "bg-img1", "bg-img2"]);

let page2SilderList = reactive<string[]>([
  "空间属性",
  "图属联动",
  "智能量算",
  "卷低对比",
  "飞行模式",
  "覅之关闭",
]);
let page2Active = ref<number>(0);

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
  transition: all 1s;
  .el-card__body {
    padding: 0;
    box-sizing: border-box;
  }
}
.infoCard {
  width: 100%;
  height: 985px;
  margin: 15px;
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
    width: 191px;
    height: 1018px;
    background: #ffffff;
    border-left: 2px solid #e9edf2;
    position: absolute;
    z-index: 10;
    top: 62px;
    transition: all 1s;
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
        transition: all 0.7s;
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
    left: 0px;
    z-index: -1;
    opacity: 0;
  }
  .infoOpenSlide {
    left: 201px;
    opacity: 1;
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
  width: 227px;
  height: 42px;
  line-height: 42px;
}

.aa {
  width: 227px;
  display: inline-flex;
}

.bb {
  width: 227px;
  height: 42px;
  background: linear-gradient(90deg, #0066c8, #d1e7fd);
  line-height: 42px;
  text-align: center;
  opacity: 0.9;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff !important;
}

.info_style {
  width: 227px;
  height: 42px;
  line-height: 42px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  text-decoration: none;
  opacity: 0.9;
  color: #333333;
}

.cc {
  width: 227px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  > span {
    width: 26px;
    height: 26px;
    display: inline-block;
    border: 3px solid transparent;
    position: absolute;
    // border: 2px red solid;
    left: 50px;
    z-index: 2;
    margin-top: 6px;
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
  height: 1000px;
  width: 227px;
  box-sizing: border-box;
  // background: yellow;
  padding-bottom: 30px;
  overflow-x: hidden;
  .left_btn {
    width: 19px;
    height: 45px;
    background: url("@img/gjx/收起.png") no-repeat center;
    position: absolute;
    bottom: 30px;
    left: 182px;
    cursor: pointer;
    filter: opacity(0.7);
  }
  .right_btn {
    width: 19px;
    height: 45px;
    background: url("@img/gjx/打开.png") no-repeat center;
    position: absolute;
    bottom: 30px;
    left: 182px;
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
  // margin: 0 0 8px 0;
  background: linear-gradient(90deg, #1d3363, #0f2044);
  box-shadow: 0px 4px 5px 0px rgba(214, 214, 214, 0.24);
  .left_header {
    width: 358px;
    height: 42px;
    margin: 13px 0 0 0;
    // border: 2px solid yellowgreen;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    > div:nth-child(1) {
      display: flex;
      .bg_l {
        width: 24px;
        height: 24px;
        background: url("@img/gjx/菜单ICON.png") no-repeat center;
        background-size: 100% 100%;
        margin: 0 20px 0 0;
      }
      .border_r {
        height: 24px;
        width: 1px;
        margin: 1px 0 0 0;
        background: #ebeaef;
      }
    }
    > div:nth-child(2) {
      // width: 27px;
      // height: 25px;
      width: 289px;
      height: 40px;
      // border: 2px solid red;
      background: url("@img/gjx/logo.png") no-repeat center;
      background-size: 100% 100%;
    }
  }
}
</style>
