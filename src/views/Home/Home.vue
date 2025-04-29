<template>
  <div class="h-[1000px]">
    <!-- 首页内容 -->

    <!-- <el-button @click="handleClick">我的信息</el-button> -->
  </div>
</template>


<script setup lang="ts">

const router = useRouter();
const handleClick = () => {
  router.push({
    name: "personalInfo"
  })
}
</script>

<style scoped></style>
