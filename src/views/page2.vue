<template>
  <!-- 表格 -->
  <el-table
    class="table"
    :data="tableData"
    style="width: 100%; height: calc(90% + 61px)"
    border
    highlight-current-row
  >
    <el-table-column type="index" label="序号" width="80" align="center" />
    <el-table-column
      prop="name"
      label="服务名称"
      min-width="180"
      align="center"
    >
      <template v-slot="{ row }">
        <span style="text-align: left">{{ row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="访问地址"
      min-width="180"
      align="center"
    />
    <el-table-column prop="address" label="操作" min-width="100" align="center">
      <template #default>
        <el-button link type="primary" size="small" class="color-33">
          <div class="info_ico"></div>
          访问
        </el-button>
        <el-button link type="primary" size="small" class="color-33">
          <div class="dev_ico"></div>
          开发示例
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination
    v-show="total > 0"
    :total="total"
    v-model:page="queryParams.pageNum"
    v-model:limit="queryParams.pageSize"
    @pagination="getList"
  />
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
import { useMainStore } from "@/store/main";

const PiniaStore = useMainStore();


PiniaStore.$patch({
  isOpenSlide: true,
});

let total = ref<number>(100);
let queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
});

const getList = () => {};

const tableData = reactive([
  {
    name: "政策资源政策服务",
    address: "https://cr.console.aliyun.com/cn-hangzho",
  },
  {
    name: "房子自有服务，例如开发商、房型结构、楼层、物业",
    address: "https://cr.console.aliyun.com/cn-hangzho",
  },
  {
    name: "商业服务商业服务商业服务商业服务",
    address: "https://cr.console.aliyun.com/cn-hangzho",
  },
  {
    name: "商业服务商业服务商业服务商业服务",
    address: "https://cr.console.aliyun.com/cn-hangzho",
  },
]);
</script>

<style scoped lang="less">
.table {
  border-bottom: 1px solid #ebeef5;
}
.info_ico {
  width: 15px;
  height: 15px;
  margin: 0 5px 0 0;
  background: url("@img/gjx/访问ICON.png") no-repeat center;
  background-size: 100% 100%;
}
.dev_ico {
  width: 15px;
  height: 15px;
  margin: 0 5px 0 0;
  background: url("@img/gjx/开发者.png") no-repeat center;
  background-size: 100% 100%;
}
</style>
