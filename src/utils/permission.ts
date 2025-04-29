import type { Menu } from "@/store/types/appStore";
import useAppStore from "@/store/modules/app";
import { menuList } from "@/constant";


//登录后调用，存储有权限的路由和按钮
export const saveAccessPermission = (
    pageUrlList: string[] = [], //菜单路由
    pageElementList: string[] = [], //页面中不需要跳转路由的按钮
    pageRouterList: string[] = []   //需要跳转路由的按钮
) => {
    const appStore = useAppStore();
    appStore.accessPageNameSet = new Set([...pageUrlList, ...pageRouterList]);
    appStore.accessPermissionSet = new Set([...pageElementList, ...pageRouterList]);
    //过滤菜单
    appStore.menuList = filterMenuList(menuList)
}

const checkPermission = (type: "page" | "button", pageOrButtonName: string) => {
    const { accessPageNameSet, accessPermissionSet } = useAppStore();
    if (type === "page") return PAGE_WHITE_LIST.has(pageOrButtonName) || accessPageNameSet.has(pageOrButtonName);
    if (type === "button") return accessPermissionSet.has(pageOrButtonName);
    return false;
}

//过滤按钮
const filterOperationBtns = (
    btnOptions: {
        permission: string;
        [propName: string]: any;
    }[]
) => {
    return btnOptions.filter(item => checkPermission("button", item.permission))
}

//无需鉴权的页面
const PAGE_WHITE_LIST = new Set(["login", "home", "page404"]);

//路由守卫跳转前鉴权
export const authPageBeforeEach = (routerName: string) => {
    return checkPermission("page", routerName);
}

const filterMenuList = (menuList: Menu[]) => {
    const accessUrlList: Menu[] = [];

    for (let i = 0; i < menuList.length; i++) {
        const menu = menuList[i];
        const key = menu.key;
        if (checkPermission("page", key)) {
            if (menu.children) {
                menu.children = menu.children.filter(child => checkPermission("page", child.key));
            }
            accessUrlList.push(menu);
        }
    }
    return accessUrlList;
} 