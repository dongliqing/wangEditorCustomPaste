<template>
  <div>
    登录页

    <el-button type="primary" @click="toHOME">回到首页</el-button>

    {{isCollapes}}
    {{menuList}}
    {{appStore.isLogin}}
    {{isLogin}}
  </div>
  
</template>


<script setup lang="ts">
import useAppStore from "@/store/modules/app";
const router = useRouter();
const appStore = useAppStore();
 
const {isCollapes, menuList, isLogin } = storeToRefs(appStore);

const toHOME = ()=>{
  router.go(-1);
}
</script>

<style scoped>
 
</style>
