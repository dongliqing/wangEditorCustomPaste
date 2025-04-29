<template>
  <div>
    <div id="myContent" class="h-[800px]"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';



// 创建3D场景对象Scene
const scene = new THREE.Scene();


//创建一个长方体几何对象Geometry
const geometry = new THREE.BoxGeometry(10, 10, 10);
//创建一个材质对象Material
const material = new THREE.MeshLambertMaterial({
  // color: "#000"
  color: 0x0000ff,//0xff0000设置材质颜色为红色
  specular: 0x444444, //高光部分的颜色
  transparent:true,//开启透明
  opacity:0.5,//设置透明度
  wireframe:true,//线条模式渲染mesh对应的三角形数据
});
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
//设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0, 0, 0);
scene.add(mesh);



//创建一个空的几何体对象
const bufferGeometry = new THREE.BufferGeometry(); 
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 100, 0, //顶点3坐标
    0, 0, 10, //顶点4坐标
    0, 0, 100, //顶点5坐标
    50, 0, 10, //顶点6坐标
]);
// 创建属性缓冲区对象
//3个为一组，表示一个顶点的xyz坐标
const attribue = new THREE.BufferAttribute(vertices, 3); 
// 设置几何体attributes属性的位置属性
bufferGeometry.attributes.position = attribue;
// 点渲染模式
const material2 = new THREE.PointsMaterial({
    color: "blue",
    size: 8.0 //点对象像素尺寸
}); 
const points = new THREE.Points(bufferGeometry, material2); //点模型对象
//设置网格模型在三维空间中的位置坐标，默认是坐标原点
points.position.set(50, 50, 0);
scene.add(points);


// 线材质对象
const material3 = new THREE.LineBasicMaterial({
    color: 0xff0000 //线条颜色
}); 
// // 创建线模型对象
// const line = new THREE.Line(geometry, material3);
// line.position.set(0, 50, 50);
// scene.add(line);
// 闭合线条
const lineLoop = new THREE.LineLoop(geometry, material3); 
lineLoop.position.set(0, 50, 50);
scene.add(lineLoop);
//非连续的线条
const lineSegments = new THREE.LineSegments(geometry, material3);
lineSegments.position.set(50, 50, 50);
scene.add(lineSegments);

// 材质对象
const material4 = new THREE.MeshBasicMaterial({
    color: 0xff0000, //线条颜色
    side: THREE.DoubleSide, //默认只有正面可见
}); 
const mesh4 = new THREE.Mesh(bufferGeometry, material4); //网格模型对象Mesh
//设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh4.position.set(-80, 20, 50);
scene.add(mesh4);




// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

//光源render
const pointLight = new THREE.DirectionalLight(0xffffff, 4000);
// pointLight.intensity = 4000.0;//光照强度
pointLight.decay = 0.0;//设置光源不随距离衰减
//点光源位置
pointLight.position.set(0, 60, 60);//点光源放在x轴上
scene.add(pointLight); //点光源添加到场景中



// width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
const width = 800; //宽度
const height = 500; //高度
// 30:视场角度 眼角大小，表示眼睁开的角度，该值越大，则场景中的物体越小，反之亦然；
// width / height:Canvas画布宽高比, 1:近裁截面相对相机距离, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(300, 300, 300);
// camera.lookAt(mesh.position);//指向mesh对应的位置
camera.lookAt(mesh.position);//指向mesh对应的位置


// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
renderer.render(scene, camera);  //执行渲染操作
// 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs,以免渲染模糊问题
// renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor("#f5f5f5", 1); //设置背景颜色


onMounted(() => {
  const box = document.getElementById("myContent");
  box?.appendChild(renderer.domElement);
  transfer();
})




// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
     // 浏览器控制台查看相机位置变化
     console.log('camera.position',camera.position);
});//监听鼠标、键盘事件




// 实例化一个gui对象
const gui = new GUI();
//改变交互界面style属性
gui.domElement.style.right = '0px';
gui.domElement.style.width = '300px';
// gui界面上增加交互界面，改变obj对应属性
gui.add(mesh.position, 'x', 0, 100);
gui.add(mesh.position, 'y', 0, 100);
gui.add(mesh.position, 'z', 0, 100);


// // 光照强度属性.intensity
console.log('ambient.intensity',pointLight.intensity);
// 通过GUI改变mesh.position对象的xyz属性
gui.add(pointLight, 'intensity', 0, 4000);


//设置纹理贴图
const homeGeo = new THREE.PlaneGeometry(200, 200);
const textureLoader = new THREE.TextureLoader();
textureLoader.wrapS = THREE.RepeatWrapping;
// textureLoader.wrapT = THREE.RepeatWrapping;
textureLoader.repeat.x=2;
const homeTextureLoader = textureLoader.load("./home.png")
const homeMat = new THREE.MeshBasicMaterial({
  map: homeTextureLoader,
  transparent: true,
  // side: THREE.DoubleSide,  //双面可见
})
const homeMes = new THREE.Mesh(homeGeo, homeMat);
homeMes.rotateX(-Math.PI / 2);
homeMes.position.set(100, 10, 0);
scene.add(homeMes);


const transfer = () => {
  
  requestAnimationFrame(transfer); //请求再次执行函数transfer
  
  homeTextureLoader.offset.x +=0.001;//设置纹理动画：偏移量根据纹理和动画需要，设置合适的值
  mesh.rotation.x += 0.01;
  renderer.render(scene, camera);  //执行渲染操作
}



// 添加一个辅助网格地面
const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
scene.add(gridHelper);





</script>

<style scoped></style>
