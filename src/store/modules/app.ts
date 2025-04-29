import { defineStore } from "pinia";
import store from "@/store";
import type { IAppStore } from "@/store/types/appStore";

const app = defineStore({
    id: "app",
    state: (): IAppStore => ({
        isLogin: false,
        isCollapes: false,
        selectKey: "",
        menuList: [],
        breadcrumList: [],

        accessPageNameSet: new Set(), //权限路由集合      
        accessPermissionSet: new Set(), //页面权限点集合 
    }),
    actions: {},
    persist: {
        storage: sessionStorage,
    }
})


export default function useAppStore() {
    return app(store);
}