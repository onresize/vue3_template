import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import routes from "./routes";
import config from "@/config";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router4.0版本取消了next()函数、vue2不支持router4.0
router.beforeEach((to, from) => {
  console.log("进入了路由:", to.fullPath);
  NProgress.start();
});

router.afterEach((to, from) => {
  NProgress.done();
  console.log("离开了路由:", to.fullPath);
  const { title } = to.meta;
  const { websiteTitle } = config;
  document.title = title ? `${title}` : websiteTitle;
});

export default router;
