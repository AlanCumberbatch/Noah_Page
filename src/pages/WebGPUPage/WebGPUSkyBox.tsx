import { useEffect, useRef, useState } from "react";
import WebGPUErrorBox from './WebGPUErrorBox'

const WebGPUSkybox: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isWebGPUAvailable, setIsWebGPUAvailable] = useState(true);

  useEffect(() => {
    const initWebGPU = async () => {
      const canvas = canvasRef.current!;
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        console.error("WebGPU not supported on this device.");
        setIsWebGPUAvailable(false);
        return;
      }

      const device = await adapter.requestDevice();
      const context = canvas.getContext("webgpu") as GPUCanvasContext;

      // Configure canvas
      const format = navigator.gpu.getPreferredCanvasFormat();
      context.configure({
        device,
        format,
        alphaMode: "opaque",
      });

      // Vertex shader
      const vertexShaderCode = `
        @vertex
        fn main(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4<f32> {
          var positions = array<vec2<f32>, 6>(
            vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
            vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0, 1.0)
          );
          let pos = positions[vertexIndex];
          return vec4<f32>(pos, 0.0, 1.0);
        }
      `;

      // Fragment shader
      const fragmentShaderCode = `
        @group(0) @binding(0) var<uniform> resolution: vec2<f32>;
        @group(0) @binding(1) var<uniform> time: f32;

        @fragment
        fn main(@builtin(position) fragCoord: vec4<f32>) -> @location(0) vec4<f32> {
          let uv = fragCoord.xy / resolution;

          // Vertical gradient: top -> light blue, bottom -> dark blue
          let gradient = mix(vec3<f32>(0.0, 0.0, 0.4), vec3<f32>(0.4, 0.6, 0.9), uv.y);

          // Debug: Output UV coordinates as color
          if (uv.x < 0.1 || uv.y < 0.1 || uv.x > 0.9 || uv.y > 0.9) {
            return vec4<f32>(uv, 0.0, 1.0);
          }

          return vec4<f32>(gradient, 1.0);
        }
      `;

      // Create pipeline
      const shaderModuleVert = device.createShaderModule({ code: vertexShaderCode });
      const shaderModuleFrag = device.createShaderModule({ code: fragmentShaderCode });

      const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: { module: shaderModuleVert, entryPoint: "main" },
        fragment: { module: shaderModuleFrag, entryPoint: "main", targets: [{ format }] },
        primitive: { topology: "triangle-list" },
      });

      // Uniform buffers
      const resolutionBuffer = device.createBuffer({
        size: 8,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      const timeBuffer = device.createBuffer({
        size: 4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: resolutionBuffer } },
          { binding: 1, resource: { buffer: timeBuffer } },
        ],
      });

      // Animation and rendering
      const render = (time: number) => {
        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();

        // Update uniforms
        device.queue.writeBuffer(resolutionBuffer, 0, new Float32Array([canvas.width, canvas.height]));
        device.queue.writeBuffer(timeBuffer, 0, new Float32Array([time / 1000]));

        // Render pass
        const renderPass = commandEncoder.beginRenderPass({
          colorAttachments: [
            {
              view: textureView,
              loadOp: "clear",
              storeOp: "store",
              clearValue: { r: 0.1, g: 0.1, b: 0.1, a: 1 },
            },
          ],
        });

        renderPass.setPipeline(pipeline);
        renderPass.setBindGroup(0, bindGroup);
        renderPass.draw(6, 1, 0, 0);
        renderPass.end();

        device.queue.submit([commandEncoder.finish()]);
        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);
    };

    initWebGPU().catch(console.error);
  }, []);

  // return <canvas ref={canvasRef} width={800} height={600} className="w-full h-full" />;
  return isWebGPUAvailable
  ? <canvas ref={canvasRef} width={800} height={600} className="w-full h-full" />
  : <WebGPUErrorBox />;
};

export default WebGPUSkybox;