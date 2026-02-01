import { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// import {createAxis, CustomPrimitive, getPlaneVBO, customPlaneByDrawCommand, getTexture} from '@/util.js'
import {customPlaneByDrawCommand} from '@/util.js'

// import Tex2D from '/cesium/skybox/xneg.png';

// import CustomDrawCommand from '@/utils/cesium/CustomDrawCommand.js';

const CesiumPage: React.FC = () => {
  const cesiumContainerRef = useRef<HTMLDivElement | null>(null);

  // const createDemo = (viewer:Cesium.Viewer)=>{
  //   // 把自己自定义的那个拿过来！
  //   // 三角形的顶点位置（x, y, z）
  //   const positionArray = [
  //     0.0, 0.0, 0.0,  // 顶点1
  //     1.0, 0.0, 0.0,  // 顶点2
  //     0.0, 1.0, 0.0,  // 顶点3
  //   ];

  //   // 三角形的索引数组（绘制顺序）
  //   const indexArray = [0, 1, 2];

  //   // 纹理坐标（可选，简单示例）
  //   const stArray = [
  //     0.0, 0.0,  // 顶点1
  //     1.0, 0.0,  // 顶点2
  //     0.0, 1.0,  // 顶点3
  //   ];

  //   // 法向量数组（可选，简单示例）
  //   const normalArray = [
  //     0.0, 0.0, 1.0,  // 顶点1
  //     0.0, 0.0, 1.0,  // 顶点2
  //     0.0, 0.0, 1.0,  // 顶点3
  //   ];

  //   const vertexShader = `
  //     attribute vec3 position;
  //     attribute vec2 st;

  //     varying vec2 v_st;

  //     void main() {
  //       gl_Position = czm_modelViewProjection * vec4(position, 1.0);
  //       v_st = st;
  //     }
  //   `;

  //   const fragmentShader = `
  //     uniform vec4 u_color;

  //     varying vec2 v_st;

  //     void main() {
  //       gl_FragColor = u_color;
  //     }
  //   `;
  //   // 创建三角形的模型矩阵（单位矩阵，表示没有变换）
  //   const modelMatrix = Cesium.Matrix4.IDENTITY;

  //   // 创建 CustomDrawCommand 实例
  //   const customDrawCommand = new CustomDrawCommand(viewer, {
  //     modelMatrix: modelMatrix,
  //     positionArray: positionArray,
  //     indexArray: indexArray,
  //     stArray: stArray,
  //     normalArray: normalArray,
  //     vs: vertexShader,
  //     fs: fragmentShader,
  //     preExecute: () => {
  //       console.log("Frame updated!");
  //     },
  //   });

  //   // 将自定义绘制命令添加到场景中
  //   viewer.scene.primitives.add(customDrawCommand);
  // }

  useEffect(() => {
    const container = cesiumContainerRef.current;
    if (!container) return;

    // 初始化 Cesium Viewer
    const viewer = new Cesium.Viewer(container, {
      animation: false,
      timeline: false,
      fullscreenButton: false,
    });

    // createDemo(viewer);

    const position = Cesium.Cartesian3.fromDegrees(116.3914, 39.9075)
    // createAxis({
    //   viewer,
    //   modelPosition: position,
    //   axisLength: 1000000.0
    // })



    const vertexShaderSource = `
        in vec3 v_position;
        in vec2 v_UV;

        out vec2 uv;

        void main() {
            gl_Position = czm_modelViewProjection * vec4(v_position,1.);
            uv = v_UV;
        }
    `;
    const fragmentShaderSource = `
      in vec2 uv;

      uniform sampler2D colorTexture;

      out vec4 fragColor;     // 输出的颜色值

      void main(){
        vec4 col = texture(colorTexture,uv);
        fragColor = col ;
      }
    `;
    const img = document.createElement('img');
    img.src = '/MarquezSpace/cesium/skybox/xneg.png';
    img.onload = () => {
      img.width = 600;
      img.height = 600;
      // container.appendChild(img);
      // 图片加载完成后创建纹理
      const context = (viewer.scene as any).context;
      // @ts-ignore
      const texture = new Cesium.Texture({
        context: context,
        source: img,
      });

      // const ColorBatchTexture = getTexture({
      //   viewer,
      // 	img,
      // })


      const uniformMap = {
        colorTexture: function(){
            return texture
        },
        // color: function(){
        //     return Cesium.Color.WHITE
        // }
      }
      const pri = customPlaneByDrawCommand(vertexShaderSource, fragmentShaderSource, uniformMap, position);
      viewer.scene.primitives.add(pri);
    };

    viewer.entities.add({
      position:  Cesium.Cartesian3.fromDegrees(116.3914, 39.9075, 6000.0),
      label: {
        text: "通过 DrawCommand 创建",
        font: "24px Helvetica",
        fillColor: Cesium.Color.SKYBLUE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      },
    });

    // 设置初始视角
    viewer.scene.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(116.3914, 39.9075, 100000), // 北京经纬度
    });

    // 清理资源
    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div
        ref={cesiumContainerRef}
        className="flex-grow w-full h-full"
      ></div>
    </div>
  );
};

export default CesiumPage;