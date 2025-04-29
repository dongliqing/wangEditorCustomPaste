
import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
// import { authPageBeforeEach } from "@/utils/permission"
// import { IRoute } from "@/types/index.type"
import { Chicken, Document, Location, Setting } from '@element-plus/icons-vue';
import { buildRoutes } from "@/utils/helper"


export const layoutRoutes = [
    // {
    //     path: "home",
    //     name: "home",
    //     title: "首页",
    //     icon: Document,
    //     component: () => import("@/views/Home/Home.vue")
    // },
    {
        path: "editorCustomPaste",
        name: "editorCustomPaste",
        title: "编辑器自定义粘贴",
        icon: Document,
        component: () => import("@/views/EditorCustomPaste/EditorCustomPaste.vue")
    },
    // {
    //     path: "EditorXiumiCopy",
    //     name: "EditorXiumiCopy",
    //     title: "拷贝秀米编辑器",
    //     icon: Document,
    //     component: () => import("@/views/EditorXiumiCopy/EditorXiumiCopy.vue")
    // },
];
buildRoutes(layoutRoutes)
const routes = [
    {
        path: "/",
        redirect: "editorCustomPaste",
    },
    {
        path: "/login",
        name: "login",
        title: "登录页",
        component: () => import("@/views/Login/Login.vue")
    },
    // {
    //     path: "/personalInfo",
    //     name: "personalInfo",
    //     title: "个人信息",
    //     component: () => import("@/views/PersonalInfo/PersonalInfo.vue")
    // },
    {
        path: "/page404",
        name: "page404",
        title: "404",
        component: () => import("@/views/Page404/Page404.vue")
    },
    {
        path: "/",
        name: "layout",
        title: "管理台",
        component: () => import("@/Layout/Layout.vue"),
        children: layoutRoutes
    }
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
} as RouterOptions)

router.beforeEach((to, from, next) => {
    Nprogress.start();

    // if (!authPageBeforeEach(to.name as string)) {
    //     next({
    //         name: "page404"
    //     })
    //     return
    // }

    const { title } = to.meta;
    if (title) {
        document.title = title as string;
    }

    next();
})

router.afterEach(() => {
    Nprogress.done();
})


export default router;