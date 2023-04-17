<template>
  <div class="App bg-f5">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const key = computed(() =>
  route.name ? String(route.name) + new Date() : String(route.path) + new Date()
);
</script>

<style scoped lang="less">
.App {
  width: 100%;
  height: 100%;
}
</style>