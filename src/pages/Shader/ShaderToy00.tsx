// import { useState, useEffect, useRef } from 'react';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
// import DynamicGradientText from '../UIComponents/DynamicGradientText';

// const ThreePage = () => {
const ThreePage: React.FC = () => {

  // // const [animationDirection, setAnimationDirection] = useState('bg-left');
  // const [animationDirection] = useState('bg-left');

  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;

    // 初始化场景、摄像机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // 创建平面几何体和着色器材质
    const fragmentShader = `
      uniform vec2 iResolution;
      uniform float iTime;

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;
        vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0, 2, 4));
        fragColor = vec4(col, 1.0);
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      uniforms: {
        iResolution: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
        iTime: { value: 0 },
      },
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 1;

    // 调整画布大小
    const handleResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      material.uniforms.iResolution.value.set(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // 动画循环
    const clock = new THREE.Clock();
    const animate = () => {
      material.uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // 清理资源
    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* <DynamicGradientText
        text="3D is fantastic !!!"
        textSize="text-4xl"
        fontWeight="font-bold"
        gradientFrom="from-red-400"
        gradientVia="via-green-500"
        gradientTo="to-pink-500"
        animationDirection={animationDirection}
      /> */}
      {/* <button onClick={() => setAnimationDirection('bg-right')}>
        Change Animation Direction
      </button> */}
      <div style={{ display: 'flex', width: '100%', height:'100vh',  justifyContent: 'center', alignItems:'center'}}>
        <div
          ref={mountRef}
          style={{ width: '80vh', height: '80vh', position: 'relative' }}
        ></div>
      </div>
    </motion.div>
  );
}

export default ThreePage;