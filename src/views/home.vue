<template>
  <div class="flex">
    <h2 class="HH2">缓存home页面--{{ tim }}</h2>
    <el-button @click="ChangeColor">修改颜色</el-button>
  </div>
  <myTextCom
    v-bind="{
      color: 'pink',
      fontSize: '20px',
      modelValue,
    }"
  >
    <template v-slot:default>
      <el-input v-model="modelValue" placeholder="" clearable></el-input
    ></template>

    <!-- XXX没有顶部和底部插槽、就显示默认插槽 -->
    <!-- <template #top> <div>顶部</div> </template>
    <template #bottom> <div>底部</div> </template> -->
  </myTextCom>
  <myPicCom
    v-bind="{
      width: '200px',
      height: '200px',
    }"
  />

  <el-button type="warning" v-longpress="longpress">长按2s触发指令</el-button>
  <el-button type="primary" v-debounce="debounceClick"
    >防抖按钮 (0.5秒后执行)</el-button
  >
  <el-button type="primary" v-throttle="throttleClick"
    >节流按钮 (每隔1S秒后执行)</el-button
  >

  <h3>演示按钮权限v-permission(当前路由只给了下面按钮增、改的权限)</h3>
  <el-row>
    <el-button v-permission="[Route.path, 'add']">增加</el-button>
    <el-button v-permission="[Route.path, 'remove']">删除</el-button>
    <el-button v-permission="[Route.path, 'edit']">修改</el-button>
    <el-button v-permission="[Route.path, 'search']">查询</el-button>
  </el-row>
</template>

<script setup name="home">
// name增强、针对vue3、安装插件：vite-plugin-vue-setup-extend
import { ref, onActivated, onDeactivated, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useMainStore } from "@/store/pinia";
import { myTextCom, myPicCom } from "@/components/hCom.js";

const PiniaStore = useMainStore();
const Route = useRoute();

const modelValue = ref("h函数-双向绑定值");

let randomColorArr = ["red", "green", "pink", "black", "yellow", "skyblue"];

let Style = ref({
  pWidth: "300px",
  pHeight: "300px",
  pMargin: "20px",
  pColor: "black",
});

const ChangeColor = () => {
  Style.value.pColor = randomColorArr
    .sort(() => Math.random() - Math.random())
    .at(2);
};

// 定义变量忽略.value
let tim = $ref(0);

let rTim = setInterval(() => {
  tim++;
  if (tim == 60) {
    // clearInterval(rTim);
    tim = 0;
  }
}, 1000);

const longpress = () => {
  ElMessage.warning("长按事件触发成功 🎉🎉🎉");
};
const debounceClick = () => {
  ElMessage.success("我是防抖按钮触发的事件 🍍🍓🍌");
};
const throttleClick = () => {
  ElMessage.success("我是节流按钮触发的事件 🍍🍓🍌");
};

onMounted(() => {
  console.log("home页面缓存-------onMounted");
});
onActivated(() => {
  PiniaStore.isOpenSlide = false;
  console.log("home页面缓存-------onActivated");
});
onDeactivated(() => {
  console.log("home页面缓存-------onDeactivated");
});
onUnmounted(() => {
  console.log("home页面缓存-------onUnmounted");
});
</script>

<style scoped lang="less">
.flex {
  width: 100%;
  display: flex;
  align-items: center;
  .HH2 {
    color: v-bind("Style.pColor");
    padding-right: 20px;
  }
}
</style>
