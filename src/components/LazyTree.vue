<template>
  <div>
    <!-- <el-button @click="refreshTreeList">123</el-button> -->
    <div>
      <!--element的tree组件-->
      <el-tree ref="treeRef" node-key="id" :props="props" :load="loadNode" :company="company" lazy>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        // children: 'zones',
        // isLeaf: 'leaf',
      },
      // 这里模拟数据库
      company: [
        { id: "0", pid: "0", name: "定位基础", leaf: false },
        { id: "1", pid: "0", name: "测量控制点", leaf: true },
        { id: "2", pid: "1", name: "平面控制点", leaf: false },
        { id: "3", pid: "3", name: "数学基础", leaf: false },
        { id: "4", pid: "3", name: "水系", leaf: true },
        { id: "5", pid: "4", name: "河流", leaf: true },
        { id: "6", pid: "5", name: "常年河", leaf: true },
      ],
    };
  },
  methods: {
    // 树节点进行点击，懒加载
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.getRootCompany());
      }
      // 通过延时操作，模仿接口访问时间
      setTimeout(() => {
        const data = this.getSubCompany(node.data.id);
        console.log(node);
        resolve(data);
      }, 500);
    },

    // 根据pid获取子公司(模拟接口调用反参)
    getSubCompany(pid) {
      const subCompany = this.company.filter((item) => {
        return item.pid === pid && item.pid !== item.id;
      });
      return subCompany;
    },

    // 获取根公司(模拟接口调用反参)
    getRootCompany() {
      const rootCompany = this.company.filter((item) => {
        return item.pid === item.id;
      });
      // console.log('父级数据',rootCompany)
      return rootCompany;
    },
  },
};
</script>

<style scoped></style>
