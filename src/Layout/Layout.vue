<template>
  <div class="h-full">
    <el-container class="h-full">
      <el-header class="bg-[#1e80ff]">
        <Header />
      </el-header>
      <el-container class="flex-1 overflow-hidden">
        <el-aside width="200px" class="bg-[#d9ecff]">
          <SideBar />
        </el-aside>
        <el-main class="flex flex-col !pt-[14px]">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" 
            :to="item.to ? {name: item.to}: item.to">
              {{ item.label }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div class="flex-1 overflow-auto mainBox"> 
            <RouterView />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts" setup>
import Header from "./Components/Header.vue"
import SideBar from "./Components/SideBar.vue"

const router = useRouter();
const breadcrumbList = ref<Record<string, any>>([]);

watch(
  () => router.currentRoute.value,
  val => {
    const { meta } = val;
    // console.log('breadcrumb', meta, meta.breadcrumbs);
    breadcrumbList.value = meta.breadcrumbs as Record<string, any>;
  },
  {
    immediate: true,
  }
)
</script>

<style scoped>
.mainBox{
  height: calc(100% - 20px);
}
</style>
