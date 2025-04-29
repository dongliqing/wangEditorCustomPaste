<template>
    <el-menu active-text-color="#ccc" background-color="#d9ecff" default-active="home" text-color="#333"
        @select="menuSelect">
        <template v-for="menu in menuList" :key="menu.name">
            <!-- 有子节点的一级菜单 -->
            <el-sub-menu :index="menu.name" v-if="menu.children">
                <template #title>
                    <el-icon v-if="menu.icon">
                        <component :is="menu.icon" />
                    </el-icon>
                    <span>{{ menu.title }}</span>
                </template>
                <template v-for="secondMenu in menu.children" :key="menu.name">
                    <!-- 有子节点的二级菜单 -->
                    <el-sub-menu :index="secondMenu.name" v-if="secondMenu.children">
                        <template #title>
                            <el-icon v-if="secondMenu.icon">
                                <component :is="secondMenu.icon" />
                            </el-icon>
                            {{ secondMenu.title }}
                        </template>
                        <!-- 三级菜单 -->
                        <el-menu-item :index="thirdMenu.name" v-for="thirdMenu in secondMenu.children"
                            :key="thirdMenu.name">
                            <el-icon v-if="thirdMenu.icon">
                                <component :is="thirdMenu.icon" />
                            </el-icon>
                            {{ thirdMenu.title }}
                        </el-menu-item>
                    </el-sub-menu>
                    <!-- 二级菜单 -->
                    <el-menu-item :index="secondMenu.name" v-else>
                        <el-icon v-if="secondMenu.icon">
                            <component :is="secondMenu.icon" />
                        </el-icon>
                        {{ secondMenu.title }}
                    </el-menu-item>
                </template>
            </el-sub-menu>
            <!-- 一级菜单 -->
            <el-menu-item :index="menu.name" v-else>
                <el-icon v-if="menu.icon">
                    <component :is="menu.icon" />
                </el-icon>
                <span>{{ menu.title }}</span>
            </el-menu-item>
        </template>

    </el-menu>
</template>



<script lang="ts" setup>
import { layoutRoutes } from "@/router/index"
import { IRoute } from "@/types/index.type";

const router = useRouter();


const buildMenu = (routes: IRoute[]) => {
    const list: IRoute[] = [];
    //过滤掉需要隐藏的路由
    routes.forEach((element: IRoute) => {
        if (element.isHidden) {
            return;
        }
        if (!element.children) {
            list.push(element);
            return;
        }
        let curRoute = { ...element };
        curRoute.children = buildMenu(element.children);;
        if (curRoute.children.length === 0) {
            delete curRoute.children;
        }
        list.push(curRoute);
    });
    return list;
}
const menuList = buildMenu(layoutRoutes);
// console.log('menuList', menuList)

const menuSelect = (key: string) => {
    console.log(key)
    router.push({
        name: key
    })
}

</script>