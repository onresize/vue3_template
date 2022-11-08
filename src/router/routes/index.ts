import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/page1",
  },
  // 匹配不到页面跳404
  { path: "/:pathMatch(.*)", redirect: { name: "404" } },
  {
    path: "/404",
    name: "404",
    meta: { title: "404" },
    component: () => import("@views/404.vue"),
  },
  {
    path: "/home",
    meta: { title: "首页" },
    component: () => import("@views/home.vue"),
    children: [
      {
        path: "/page1",
        name: "page1",
        meta: { title: "数据处理" },
        component: () => import("@views/page1.vue"),
      },
      {
        path: "/page2",
        name: "page2",
        meta: { title: "数据服务" },
        component: () => import("@views/page2.vue"),
      },
      {
        path: "/page3",
        name: "page3",
        meta: { title: "资源目录" },
        component: () => import("@views/page3.vue"),
      },
    ],
  },
];

export default routes;
