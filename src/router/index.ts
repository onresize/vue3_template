import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import routes from "./routes";
import config from "@/config";

import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia";

// const store = useMainStore(pinia);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router4.0版本取消了next()函数、vue2不支持router4.0
router.beforeEach((to) => {
  // 项目不需要动态路由、pinia挂载写这里才能持久化、写外面数据刷新丢失
  const store = useMainStore();

  console.log("进入路由：", to);

  NProgress.start();
});

router.afterEach((to) => {
  NProgress.done();
  console.log("离开了路由:", to.fullPath);
  const { title } = to.meta;
  const { websiteTitle } = config;
  document.title = title ? `${title}` : websiteTitle;
});

export default router;
