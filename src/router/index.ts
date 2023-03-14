import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import routes from "./routes";
import config from "@/config";

import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia";

const store = useMainStore(pinia);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

console.log("routerJS拿到pinia的值----------", store);

// router4.0版本取消了next()函数、vue2不支持router4.0
router.beforeEach((to) => {
  console.log("进入了路由:", to.fullPath);
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
