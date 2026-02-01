// import { useState, useEffect, useRef } from 'react';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// const ThreePage = () => {
const ThreePage: React.FC = () => {

  // 使用泛型为 ref 添加类型
  const threeContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    // 获取父容器宽高
    const container = threeContainerRef.current;
    const w = container?.clientWidth || window.innerWidth;
    const h = container?.clientHeight || window.innerHeight;

    // 创建场景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      w / h,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    if (threeContainerRef.current) {
      threeContainerRef.current.appendChild(renderer.domElement);
    }

    // 添加 OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 启用阻尼效果（惯性）
    controls.dampingFactor = 0.25; // 阻尼系数
    controls.enableZoom = true; // 允许缩放
    controls.minDistance = 2; // 缩放的最近距离
    controls.maxDistance = 10; // 缩放的最远距离

    // Skybox Loader
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('/MarquezSpace/skybox/');

    const textureCube = loader.load([
      'xpos.png', // positive x
      'xneg.png', // negative x
      'ypos.png', // positive y
      'yneg.png', // negative y
      'zpos.png', // positive z
      'zneg.png'  // negative z
    ]);
    scene.background = textureCube;

    // 创建立方体
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 动画循环
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // 清理资源
    return () => {
      renderer.dispose();
      if (threeContainerRef.current) {
        threeContainerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-screen">
      <div
        ref={threeContainerRef}
        className="flex-grow w-full"
      ></div>
    </motion.div>
  );
}

export default ThreePage;