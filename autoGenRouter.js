// 自动生成路由文件脚本、npm run dev 执行
var fs = require('fs');
const readline = require('readline');
const os = require('os');

const vueDir = './src/views/';

fs.readdir(vueDir, function (err, files) {
  if (err) {
    console.log(err);
    return;
  }
  let routers = ``, routersChildren = [];
  for (const filename of files) {
    if (filename.indexOf('.') < 0) {
      continue;
    }
    var [name, ext] = filename.split('.');
    if (ext != 'vue') {
      continue;
    }
    let routerName = null

    const contentFull = fs.readFileSync(`${vueDir}${filename}`, 'utf-8');
    var match = /\<\!\-\-\s*(.*)\s*\-\-\>/g.exec(contentFull.split(os.EOL)[0]);
    if (match) {
      routerName = match[1];
    }

    routersChildren.push(
      `{
        path: '/${name}',
        name: '${name}',
        component: () => import('@/views/${name}.${ext}')
      }`
    )
  }
  const result =
    `// 该文件由autoGenRouter.js自动生成，请勿手动修改
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
    children: [${routersChildren}]
  },
];

export default routes

`
  // console.log(routersChildren);
  fs.writeFile('./src/router/routes/index.ts', result, 'utf-8',
    (err) => {
      if (err) throw err;
      // 如果没有错误
      console.log("./src/router/routes/index.ts 生成成功！")
    });
});