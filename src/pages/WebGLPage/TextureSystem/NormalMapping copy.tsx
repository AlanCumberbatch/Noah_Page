import React, { useEffect, useRef } from 'react';
import { Box, Text } from '@chakra-ui/react';

const NormalMapping: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // 顶点着色器
    const vertexShaderSource = `
      attribute vec3 a_position;
      attribute vec3 a_normal;
      attribute vec2 a_texCoord;
      attribute vec3 a_tangent;
      attribute vec3 a_bitangent;

      varying vec3 v_normal;
      varying vec2 v_texCoord;
      varying vec3 v_tangent;
      varying vec3 v_bitangent;
      varying vec3 v_position;

      uniform mat4 u_modelViewMatrix;
      uniform mat4 u_projectionMatrix;

      void main() {
        v_position = (u_modelViewMatrix * vec4(a_position, 1.0)).xyz;
        v_normal = normalize((u_modelViewMatrix * vec4(a_normal, 0.0)).xyz);
        v_tangent = normalize((u_modelViewMatrix * vec4(a_tangent, 0.0)).xyz);
        v_bitangent = normalize((u_modelViewMatrix * vec4(a_bitangent, 0.0)).xyz);
        v_texCoord = a_texCoord;

        gl_Position = u_projectionMatrix * u_modelViewMatrix * vec4(a_position, 1.0);
      }
    `;

    // 片段着色器
    const fragmentShaderSource = `
      precision highp float;

      varying vec3 v_normal;
      varying vec2 v_texCoord;
      varying vec3 v_tangent;
      varying vec3 v_bitangent;
      varying vec3 v_position;

      uniform sampler2D u_normalMap;
      uniform vec3 u_lightDirection;
      uniform vec3 u_lightColor;

      void main() {
        // 从法线贴图获取法线
        vec3 normalMap = texture2D(u_normalMap, v_texCoord).xyz * 2.0 - 1.0;

        // 构建切线空间到视图空间的矩阵
        mat3 tbn = mat3(normalize(v_tangent), normalize(v_bitangent), normalize(v_normal));

        // 将法线从切线空间转换到视图空间
        vec3 normal = normalize(tbn * normalMap);

        // 计算光照
        float diffuse = max(dot(normal, normalize(-u_lightDirection)), 0.0);
        vec3 color = u_lightColor * diffuse;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // 编译着色器
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // 创建着色器程序
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // 创建平面几何体
    const positions = new Float32Array([
      -1, -1, 0,
       1, -1, 0,
      -1,  1, 0,
       1,  1, 0,
    ]);

    const normals = new Float32Array([
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ]);

    const texCoords = new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      1, 1,
    ]);

    const tangents = new Float32Array([
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
    ]);

    const bitangents = new Float32Array([
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
    ]);

    // 创建缓冲区
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const tangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tangentBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, tangents, gl.STATIC_DRAW);

    const bitangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bitangentBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, bitangents, gl.STATIC_DRAW);

    // 获取属性位置
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const normalLocation = gl.getAttribLocation(program, 'a_normal');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    const tangentLocation = gl.getAttribLocation(program, 'a_tangent');
    const bitangentLocation = gl.getAttribLocation(program, 'a_bitangent');

    // 创建法线贴图
    const normalMap = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, normalMap);

    const size = 256;
    const data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const offset = (y * size + x) * 4;
        // 创建一个简单的凹凸图案
        const nx = Math.sin(x * 0.1) * 127 + 128;
        const ny = Math.sin(y * 0.1) * 127 + 128;
        data[offset] = nx; // R
        data[offset + 1] = ny; // G
        data[offset + 2] = 255; // B
        data[offset + 3] = 255; // A
      }
    }

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    // 设置光照参数
    // const lightDirection = [0.5, 0.7, 1.0];
    const lightDirection = [0.0, 0.0, 1.0];
    const lightColor = [1.0, 1.0, 1.0];
    const lightDirectionLocation = gl.getUniformLocation(program, 'u_lightDirection');
    const lightColorLocation = gl.getUniformLocation(program, 'u_lightColor');
    gl.uniform3fv(lightDirectionLocation, lightDirection);
    gl.uniform3fv(lightColorLocation, lightColor);

    // 设置变换矩阵
    const modelViewMatrix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, -3,
      0, 0, 0, 1,
    ]);

    const projectionMatrix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, -1, -1,
      0, 0, -1, 0,
    ]);

    const modelViewMatrixLocation = gl.getUniformLocation(program, 'u_modelViewMatrix');
    const projectionMatrixLocation = gl.getUniformLocation(program, 'u_projectionMatrix');
    gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);

    // function render() {

      // 启用深度测试

      // 设置位置属性
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

      // 设置法线属性
      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
      gl.enableVertexAttribArray(normalLocation);
      gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);

      // 设置纹理坐标属性
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

      // 设置切线属性
      gl.bindBuffer(gl.ARRAY_BUFFER, tangentBuffer);
      gl.enableVertexAttribArray(tangentLocation);
      gl.vertexAttribPointer(tangentLocation, 3, gl.FLOAT, false, 0, 0);

      // 设置副切线属性
      gl.bindBuffer(gl.ARRAY_BUFFER, bitangentBuffer);
      gl.enableVertexAttribArray(bitangentLocation);
      gl.vertexAttribPointer(bitangentLocation, 3, gl.FLOAT, false, 0, 0);

      // 绘制
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // }

    // render();
  }, []);

  return (
    <div className="demo-container">
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        style={{ border: '1px solid #ccc' }}
      />
      <h2>法线贴图</h2>
      <p>这个demo展示了WebGL中的法线贴图。我们创建了一个简单的平面，
      使用法线贴图来模拟表面细节，并通过光照来展示效果。</p>
    </div>
  );
};

export default NormalMapping;