// 该文件由autoGenRouter.js自动生成，请勿手动修改
import VueRouter from 'vue-router'
import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

var routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "home",
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
    path: "/layoutPage",
    name: "layoutPage",
    component: Layout,
    redirect: "home",
    children: [{
        path: '/404',
        name: '404',
        meta: {title: '404', ico: 'Guide' },
        component: () => import('@/views/404.vue')
      },{
        path: '/home',
        name: 'home',
        meta: {title: '首页', ico: 'HomeFilled' },
        component: () => import('@/views/home.vue')
      },{
        path: '/page1',
        name: 'page1',
        meta: {title: '数据处理', ico: 'setting' },
        component: () => import('@/views/page1.vue')
      },{
        path: '/page2',
        name: 'page2',
        meta: {title: '数据服务', ico: 'Operation' },
        component: () => import('@/views/page2.vue')
      },{
        path: '/page3',
        name: 'page3',
        meta: {title: '数据目录', ico: 'Memo' },
        component: () => import('@/views/page3.vue')
      }]
  },
];

export default routes

  