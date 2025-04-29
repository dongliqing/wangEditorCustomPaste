import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      resolvers: [ElementPlusResolver({
        importStyle: "sass"
      })],
      //解决eslint报错的问题
      eslintrc: {
        enabled: true
      },
      dts: "./auto-imports.d.ts"
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        }),
        VantResolver({
          importStyle: false
        })
      ],
      directoryAsNamespace: true,
    })
  ],
  css: {
    // postcss: {
    //   plugins:[
    //     {
    //       postcssPlugin: "internal:charset-removal",
    //       AtRule:{
    //         charset: atRule=>{
    //           if (atRule.name === "charset"){
    //             atRule.remove();
    //           }
    //         }
    //       }
    //     },
    //     autoprefixer,
    //     tailwindcss,
    //   ]
    // },
    //按需引入element主题样式
    preprocessorOptions: {
      scss: {
        additionalData: (content, loaderContext) => {
          if (loaderContext.endsWith("assets/css/element.scss")) {
            return content;
          }
          return `@use "@/assets/css/element.scss" as *; ${content}`;
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@@": path.resolve(__dirname),
    }
  },
  build: {
    sourcemap: true,
    minify: "terser",
    // rollupOptions:{
    //   output: {
    //     manualChunks:(id)=>{
    //       // 解决el-button开发环境下被tailwind覆盖样式，添加后会打包出一个element-plus.css
    //       if (id.includes('element-plus/theme-chalk/')) { 
    //         return 'element-plus'
    //       }
    //     },
    //     chunkFileNames: "js/[name]-[hash].js",
    //     entryFileNames: "js/[name]-[hash].js",
    //     assetFileNames: "[ext]/[name]-[hash].[ext]",
    //   }
    // },
    chunkSizeWarningLimit: 1000,
    // terserOptions:{
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true,
    //   },
    //   output:{
    //     comments: true,
    //   }
    // }
  },
  server: {
    hmr: true,
    open: true,
    port: 8080,
    host: true,
    proxy: {
      "api": {
        // target: "http://",
        changeOrigin: true,
        secure: false,
        // rewrite: path => path.replace(/^\/api/,""),
      }
    }
  }
})
