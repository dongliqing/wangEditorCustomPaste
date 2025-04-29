<template>
  <!-- 地图容器 -->
  <div class="map" ref="chartContainer"></div>
</template>

<script setup>
import * as echarts from 'echarts';
// import china from './china.json' // 导入china包
import zhejiang from './zhejiang.json' // 导入china包

// 定义地图容器的引用
const chartContainer = ref(null);

// 初始化地图的配置项
const option = ref({
  backgroundColor: "#FFFFFF",
  title: {
    text: "",
    subtext: "",
    x: "center"
  },
  tooltip: {
    trigger: 'item', // 鼠标悬浮时显示提示信息
  },
  //左侧小导航图标
  visualMap: {
    min: 0, // 最小值
    max: 600, // 最大值
    left: 'left', // 位置
    top: 'bottom', // 位置
    text: ['高', '低'], // 文本
    inRange: {
      color: ["#e5cdbf", "#e90606"] //此处是设置颜色过渡
    },
    calculable: true // 是否显示拖拽用的手柄
  },

  series: [
    {
      name: '数据', // 系列名称
      type: 'map', // 类型为地图
      mapType: "zhejiang",
      map: 'zhejiang', // 使用的地图类型，这里是中国地图
      // label: {
      //   show: false // 显示地图区域名称
      // },
      label: {
        normal: {
          show: true, //省份名称----你可以选择true，展示每个省份的名称
          formatter: (value) => {
            console.log('name', value.name)
            return cleanProvinceName(value.name);
          }
        },
        emphasis: {
          show: true
        },

      },


      // 是否开启鼠标缩放和平移漫游。默认不开启。
      // 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
      // roam: true,
      //设置中心点
      // center: [105.194115019531, 35.582111640625],
      // zoom: 1,//初始化大小
      itemStyle: {
        normal: {
          // areaColor: "#7eb8896b",
          areaColor: "#c9e1cda6",
          // color: "red",
          borderColor: "#7eb889",
          borderWidth: 1,
        },
        //高亮状态下的多边形和标签样式
        emphasis: {
          show: false
        },
      },

      // z: 10, //显示层级

      data: [
        { name: "杭州市", value: Math.round(Math.random() * 500) },
        { name: "丽水市", value: Math.round(Math.random() * 500) },
        // { name: "浙江省", value: Math.round(Math.random() * 500) },
        // { name: "北京市", value: "100" },
        // { name: "天津市", value: Math.round(Math.random() * 500) },
        // { name: "上海市", value: Math.round(Math.random() * 500) },
        // { name: "重庆市", value: Math.round(Math.random() * 500) },
        // { name: "河北省", value: Math.round(Math.random() * 500) },
        // { name: "河南省", value: Math.round(Math.random() * 500) },
        // { name: "云南省", value: Math.round(Math.random() * 500) },
        // { name: "辽宁省", value: Math.round(Math.random() * 500) },
        // { name: "黑龙江省", value: Math.round(Math.random() * 500) },
        // { name: "湖南省", value: Math.round(Math.random() * 500) },
        // { name: "安徽省", value: Math.round(Math.random() * 500) },
        // { name: "山东省", value: Math.round(Math.random() * 500) },
        // { name: "新疆维吾尔自治区", value: Math.round(Math.random() * 500) },
        // { name: "江苏省", value: Math.round(Math.random() * 500) },
        // { name: "江西省", value: Math.round(Math.random() * 500) },
        // { name: "湖北省", value: Math.round(Math.random() * 500) },
        // { name: "广西自治区", value: Math.round(Math.random() * 500) },
        // { name: "甘肃省", value: Math.round(Math.random() * 500) },
        // { name: "山西省", value: Math.round(Math.random() * 500) },
        // { name: "内蒙古自治区", value: Math.round(Math.random() * 500) },
        // { name: "陕西省", value: Math.round(Math.random() * 500) },
        // { name: "吉林省", value: Math.round(Math.random() * 500) },
        // { name: "福建省", value: Math.round(Math.random() * 500) },
        // { name: "贵州省", value: Math.round(Math.random() * 500) },
        // { name: "广东省", value: Math.round(Math.random() * 500) },
        // { name: "广西壮族自治区", value: Math.round(Math.random() * 500) },
        // { name: "青海省", value: Math.round(Math.random() * 500) },
        // { name: "西藏自治区", value: Math.round(Math.random() * 500) },
        // { name: "四川省", value: Math.round(Math.random() * 500) },
        // { name: "宁夏回族自治区", value: Math.round(Math.random() * 500) },
        // { name: "海南省", value: Math.round(Math.random() * 500) },
        // { name: "台湾省", value: Math.round(Math.random() * 500) },
        // { name: "香港特别行政区", value: Math.round(Math.random() * 500) },
        // { name: "澳门特别行政区", value: Math.round(Math.random() * 500) }
      ] //数据
    },

  ]
});

// 清理省份名称的函数，去掉省份名称的常见后缀
function cleanProvinceName(provinceName) {
  const suffixes = ["市", "省", "自治区", "特别行政区"];
  for (let suffix of suffixes) {
    provinceName = provinceName.replace(new RegExp(suffix + "$"), "");
  }
  return provinceName;
}


// 初始化地图函数，创建echarts实例并设置选项
const init = () => {
  echarts.registerMap('zhejiang', zhejiang)
  const myChart = echarts.init(chartContainer.value);
  myChart.setOption(option.value);
}

onMounted(() => {
  init();
});



</script>

<style scoped>
.map {
  width: 600px;
  height: 600px;
  background: #f5f5f5;
}
</style>