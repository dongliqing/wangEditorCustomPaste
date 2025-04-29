import { createApp } from 'vue'
import '@/assets/css/tailwindcss.css' //必须在引入APP.vue之前，否则会覆盖组件库样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from "./router";
// import store from "./store";
import type { Directive } from "vue";
import * as directives from "@/directives";
// import "@/utils/polyfill";
import '@/assets/css/index.less'
import '@/assets/css/element-cover.less'

import "vant/lib/index.css";

const { MOBILE_URL, MODE } = import.meta.env;
console.log('MOBILE_URL', MOBILE_URL);

const app = createApp(App);

//注册icons全局组件
Object.entries(ElementPlusIconsVue).forEach(([key, value]) => {
    app.component(key, value);
})

//注册自定义指令
Object.entries(directives).forEach(([key, value]) => {
    app.directive(key, value as Directive);
})

app.use(router);
// app.use(store)


app.mount('#app')
