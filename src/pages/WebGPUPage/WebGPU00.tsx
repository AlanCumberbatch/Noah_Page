import React, { useEffect, useRef, useState } from "react";
import WebGPUErrorBox from './WebGPUErrorBox'
const WebGPUPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isWebGPUAvailable, setIsWebGPUAvailable] = useState(true);

  useEffect(() => {
    const createTriangle = async () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;

      // 检测 WebGPU 支持
      if (!navigator.gpu) {
        console.error("WebGPU is not supported in your browser.");
        setIsWebGPUAvailable(false);
        return;
      }
      // 获取 GPU 适配器和设备
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        console.error("Failed to get GPU adapter.");
        return;
      }
      const device = await adapter.requestDevice();
      // 配置 GPU 的 context 和 format
      const context = canvas.getContext("webgpu") as GPUCanvasContext;
      const format = navigator.gpu.getPreferredCanvasFormat();
      context.configure({
        device,
        format,
        alphaMode: "opaque",
      });

      // 定义三角形的顶点着色器和片段着色器
      const vertexShaderCode = `
        @vertex
        fn main(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4<f32> {
          var positions = array<vec2<f32>, 3>(
            vec2<f32>(0.0, 0.5),
            vec2<f32>(-0.5, -0.5),
            vec2<f32>(0.5, -0.5)
          );
          return vec4<f32>(positions[vertexIndex], 0.0, 1.0);
        }
      `;

      const fragmentShaderCode = `
        @fragment
        fn main() -> @location(0) vec4<f32> {
          return vec4<f32>(1.0, 0.0, 0.0, 1.0); // 红色
        }
      `;

      // 创建着色器模块
      const vertexModule = device.createShaderModule({ code: vertexShaderCode });
      const fragmentModule = device.createShaderModule({ code: fragmentShaderCode });

      // 创建渲染管线
      const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
          module: vertexModule,
          entryPoint: "main",
        },
        fragment: {
          module: fragmentModule,
          entryPoint: "main",
          targets: [
            {
              format,
            },
          ],
        },
        primitive: {
          topology: "triangle-list",
        },
      });

      // 创建命令编码器和渲染通道
      const commandEncoder = device.createCommandEncoder();
      const textureView = context.getCurrentTexture().createView();
      const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
          {
            view: textureView,
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 }, // 背景色
            loadOp: "clear",
            storeOp: "store",
          },
        ],
      };

      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
      passEncoder.setPipeline(pipeline);
      passEncoder.draw(3, 1, 0, 0); // 绘制三角形
      passEncoder.end();

      // 提交命令
      device.queue.submit([commandEncoder.finish()]);
    };

    createTriangle();
  }, []);

  return isWebGPUAvailable
  ? <canvas ref={canvasRef} width={800} height={600} className="w-full h-full" />
  : <WebGPUErrorBox />;
};

export default WebGPUPage;