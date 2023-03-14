<template>
  <h2>home页面</h2>
</template>

<script setup lang="ts">
// defineProps defineEmits defineExpose withDefaults onMounted onUnmounted
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  defineAsyncComponent,
} from "vue";
import { useMainStore } from "@/store/pinia";

const PiniaStore = useMainStore();
PiniaStore.$patch({
  isOpenSlide: false,
});

</script>

<style scoped></style>
