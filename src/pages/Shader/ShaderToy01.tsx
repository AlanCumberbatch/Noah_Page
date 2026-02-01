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
      uniform vec2 iResolution;  // Screen resolution (width, height)
      uniform float iTime;       // Time since the shader started

      // https://iquilezles.org/articles/distfunctions
      float sdCircle( in vec2 p, in vec2 c, in float r )
      {
          return length(p-c)-r;
      }

      // https://iquilezles.org/articles/distfunctions
      float sdLine( in vec2 p, in vec2 a, in vec2 b )
      {
      	vec2 pa = p-a, ba = b-a;
      	float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
      	return length( pa - ba*h );
      }

      // https://iquilezles.org/articles/distfunctions/
      vec2 opUnion( vec2 m, float d, float a )
      {
          return (d<m.x) ? vec2(d,a) : m;
      }

      // https://iquilezles.org/articles/intersectors/
      void intersectCircle( in vec2 ro, in vec2 rd, float rad, out vec4 p1)
      {
      	float b = dot( ro, rd );
      	float c = dot( ro, ro ) - rad*rad;
      	float h = b*b - c;

          if( h>0.0 )
          {
              // real
              h = sqrt(h);
              p1 = vec4( ro + (-b+h)*rd, ro );
          }
          else
          {
              // complex
              h = sqrt(-h);
              p1 = vec4( ro - b*rd, ro + h*rd );
          }
      }

      //-------------------------------------------------------------------

      void get_ray( out vec2 ro,  in float t )
      {
          ro = vec2(0.5*sin(0.12*t-0.31),0.5 * sin(t)-0.4);//变化规律 4
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord )
      {
          vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y;
          float px = 2.0/iResolution.y;

          p.y -= 0.4;


          const float rad = 0.4;
          const float cth = 0.01;


          // background
          vec3 col = vec3(0.2 - 0.1*length(p*0.5));


          // trails
          {
              vec2 dr = vec2(1e20,1.0);
              vec2 di = vec2(1e20,1.0);
              vec4 op1;
              const int num = 256;
              for( int i=0; i<num; i++ )
              {
                  float a = float(i)/float(num);

                  vec2 ro, rd;
                  get_ray( ro,  iTime - 5.0*a );//控制这句话里的数字可以控制 尾线 的长度【正比】

                  vec4 p1;
                  intersectCircle( ro, rd, rad, p1);

                  if( i>0 )
                  {
                   di = opUnion(di, sdLine( p, p1.zw, op1.zw ), a);
                  }

                  op1 = p1;
              }

              col = mix( col, vec3(1.2,0.7,0.0), smoothstep(1.0,0.7,di.y)*(1.0-smoothstep(0.0,0.01,di.x)) );
          }

          vec2 ro, rd;
          get_ray( ro,  iTime );// 让小球 引领 线的运动


          // intersections
          {
              vec4 p1;
              intersectCircle( ro, rd, rad, p1);

              float dr = sdCircle( p, p1.xy, cth );
              float di = sdCircle( p, p1.zw, cth );
              col = mix( col, vec3(1.2,0.7,0.0), 1.0-smoothstep(0.005,0.01,di) );//黄色的小球没有了
          }

          // cheap dithering
          col += sin(fragCoord.x*114.0)*sin(fragCoord.y*211.1)/512.0;

          fragColor = vec4(col,1.0);
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