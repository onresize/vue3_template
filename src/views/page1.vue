<template>
  <!-- 按钮 -->
  <el-button class="upload_btn" @click="dialogVisible = true">
    <UploadFilled class="upload" />上传
  </el-button>
  <!-- 表格 -->
  <el-table
    class="table"
    :data="tableData"
    style="width: 100%; height: 90%"
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
  <!-- 弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    title=""
    width="30%"
    draggable
    :show-close="false"
    center
  >
    <el-form
      label-position="top"
      label-width="100px"
      :model="formLabelAlign"
      class="flex_dialog"
    >
      <el-form-item label="名称">
        <el-input v-model="upLoadObj.name" class="w-400" />
      </el-form-item>
      <el-form-item label="上传单位">
        <el-input v-model="upLoadObj.Lct" class="w-400" />
      </el-form-item>
      <el-form-item label="文件">
        <el-upload
          class="w-400"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="upLoadObj.desc" class="w-400" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button type="primary" @click="dialogVisible = false" class="w-100">
          上传
        </el-button>
        <el-button @click="dialogVisible = false" class="w-100">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import { useMainStore } from "@/store/main";
import { getTableList } from "@/api/page1";
import useCancelRequest from "@/hooks/useCancelRequest";

// 销毁前关闭当前页面请求
useCancelRequest();

const PiniaStore = useMainStore();
PiniaStore.$patch({
  isOpenSlide: false,
});

let total = ref<number>(100);
let queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
});

const getList = async () => {
  // const [err, data] = await getTableList();
  // if (err) {
  //   return false;
  // } else {
  //   console.log("全局：", data);
  // }
};

const dialogVisible = ref(false);
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

const upLoadObj = reactive({
  name: "",
  Lct: "",
  desc: "",
});
</script>

<style scoped lang="less">
.table {
  border-bottom: 1px solid #ebeef5;
}

.upload_btn {
  color: #2980d6;
  width: 120px;
  height: 38px;
  background: #f4f5f7;
  margin: 0 0 20px 0;
}
.upload {
  width: 1.6em;
  height: 1.6em;
  margin-right: 8px;
  color: #2980d6;
}
.info_ico {
  width: 15px;
  height: 15px;
  margin: 0 5px 0 0;
  background: url("@img/gjx/访问ICON.png") no-repeat center;
  background-size: 100% 100%;
}
.flex_dialog {
  display: grid;
  place-items: center;
}
</style>
