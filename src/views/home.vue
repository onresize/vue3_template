<template>
  <h2>缓存home页面--{{ tim }}</h2>
</template>

<script setup name="home">
// name增强、针对vue3、安装插件：vite-plugin-vue-setup-extend
import { onActivated, onDeactivated, onMounted, onUnmounted } from "vue";
import { useMainStore } from "@/store/pinia";

const PiniaStore = useMainStore();

// 定义变量忽略.value
let tim = $ref(0);

let rTim = setInterval(() => {
  tim++;
  if (tim == 60) {
    // clearInterval(rTim);
    tim = 0;
  }
}, 1000);

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

<style scoped></style>
