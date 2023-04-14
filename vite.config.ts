import { defineConfig, loadEnv } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import viteCompression from "vite-plugin-compression";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import banner from "vite-plugin-banner";
import pkg from "./package.json";
//安装jsx插件 npm install @vitejs/plugin-vue-jsx -D
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueI18n from "@intlify/vite-plugin-vue-i18n";

const resolve = (dir: string): string => path.resolve(__dirname, dir);

export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log("当前环境env ===>", env);

  return {
    base: "/",
    server: {
      proxy: {
        '/baseApi': {
          target: env.VITE_APP_BASE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/baseApi/, ''),
        },
        '/otherAPi': {
          target: env.VITE_OTHER_BASE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/otherAPi/, ''),
        },
      },
    },

    build: {
      // sourcemap: true, // 构建后是否生成 source map 文件
      //   rollupOptions: {
      //     /**
      //      * 如果要对比较大的组件库打包单独的 chunk，可以在这里配置
      //      * @see https://rollupjs.org/guide/en/#outputmanualchunks
      //      */
      //     output: {
      //       // 其中一种方式
      //       manualChunks: {
      //         'ant-design-vue': ['ant-design-vue'],
      //         '@icon-park': ['@icon-park/vue-next'],
      //       },
      //       // 另外一种方式
      //       // manualChunks(id) {
      //       //   if (id.includes('node_modules')) {
      //       //     return id
      //       //       .toString()
      //       //       .split('node_modules/')[1]
      //       //       .split('/')[0]
      //       //       .toString()
      //       //   }
      //       // },
      //     },
      //   },
    },

    resolve: {
      alias: {
        // 兼容webpack的习惯
        "@": resolve("src"),
        "@img": resolve("src/assets/img"),
        "@less": resolve("src/assets/less"),
        "@libs": resolve("src/libs"),
        "@cp": resolve("src/components"),
        "@views": resolve("src/views"),
        // 兼容webpack的静态资源
        "~@": resolve("src"),
        "~@img": resolve("src/assets/img"),
        "~@less": resolve("src/assets/less"),
        "~@libs": resolve("src/libs"),
        "~@cp": resolve("src/components"),
        "~@views": resolve("src/views"),
      },
    },
    css: {
      /**
       * 包括 vw / rem 单位转换等
       * @see https://cn.vitejs.dev/config/#css-postcss
       */
      // postcss: {
      //   plugins: [
      //     // 使用 postcss-px2rem
      //     // px2rem({
      //     //   remUnit: 75,
      //     // }),

      //     // 使用 postcss-px-to-viewport
      //     // px2vw({
      //     //   viewportWidth: 375,
      //     //   minPixelValue: 1,
      //     // }),
      //   ],
      // },

      /**
       * 预处理器选项可以在这里配置
       * @see https://cn.vitejs.dev/config/#css-preprocessoroptions
       */
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            "primary-color": "#1890ff",
            hack: `true; @import '@less/config.less'`,
          },
        },
      },
    },
    plugins: [
      vue({
        refTransform: true, // 开启ref转换、使用$ref响应式定义、不需要.value
      }),
      vueJsx(),
      VueSetupExtend(), // * name 可以写在 script 标签上
      env.VITE_BUILD_GZIP &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: "gzip",
          ext: ".gz",
        }),
      // https://github.com/intlify/vite-plugin-vue-i18n
      VueI18n({
        include: [resolve(__dirname, "@/locales/**")],
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      /**
       * 自动导入组件，不用每次都 import
       * @see https://github.com/antfu/unplugin-vue-components#configuration
       */
      components({
        dirs: [resolve("src/components")],
        extensions: ["vue", "ts"],
        deep: true,
        dts: false,
        resolvers: [ElementPlusResolver()],
      }),
      banner(
        `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: v${pkg.description}\n * author: ${pkg.author}\n */`
      ),
    ],
    // * 打包去除 console.log && debugger
    esbuild: {
      pure: env.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },
    build: {
      outDir: "dist",
      // minify: "esbuild",
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      // 报错安装: npm i terser --legacy--peer-deps
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: env.VITE_DROP_CONSOLE,
          drop_debugger: env.VITE_DROP_CONSOLE,
        },
      },
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
