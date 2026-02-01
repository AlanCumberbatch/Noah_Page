import { useState } from 'react'
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

// Custom UI
import CustomUIPage from '@/pages/UIPage';


// WebGPU
import WebGPUPage from '@/pages/WebGPUPage';
import WebGPU00 from '@/pages/WebGPUPage/WebGPU00';

// WebGL
import WebGLPage from '@/pages/WebGLPage';
import WebGLTriangle from '@/pages/WebGLPage/WebGLTriangle';
import WebGLGaussianBlur from '@/pages/WebGLPage/WebGLGaussianBlur';
import TriangleRendering from '@/pages/WebGLPage/BasicPipeline/TriangleRendering';
import ColorInterpolation from '@/pages/WebGLPage/BasicPipeline/ColorInterpolation';
import TextureMapping from '@/pages/WebGLPage/BasicPipeline/TextureMapping';
import TransformMatrix from '@/pages/WebGLPage/BasicPipeline/TransformMatrix';
import BasicLighting from '@/pages/WebGLPage/BasicPipeline/BasicLighting';
// 纹理系统
import TextureLoading from '@/pages/WebGLPage/TextureSystem/TextureLoading';
import MultipleTextures from '@/pages/WebGLPage/TextureSystem/MultipleTextures';
import TextureAnimation from '@/pages/WebGLPage/TextureSystem/TextureAnimation';
import NormalMapping from '@/pages/WebGLPage/TextureSystem/NormalMapping';
import EnvironmentMapping from '@/pages/WebGLPage/TextureSystem/EnvironmentMapping';
import VideoTexture from '@/pages/WebGLPage/TextureSystem/VideoTexture';
import CubeMap from '@/pages/WebGLPage/TextureSystem/CubeMap';

import { repositoryName } from './env'
const baseUrl = '/' + repositoryName;

function App() {
  const NavContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    padding: 20px;
  `;

  const NavLinks = styled.ul<{ isOpen: boolean }>`
    display: ${props => (props.isOpen ? 'block' : 'none')};
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 50px;
    right: 0;
    background-color: #333;
    border-radius: 5px;
    width: 200px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    li {
      padding: 10px;
      border-bottom: 1px solid #444;
      &:last-child {
        border-bottom: none;
      }

      a {
        color: white;
        text-decoration: none;
        display: block;
        &:hover {
          background-color: #555;
        }
      }
    }
  `;

  return (
    <div className="w-screen h-screen">
      <Router>
        {/* <NavContainer>
          <NavLinks isOpen={true}>
            <li><Link to={baseUrl}>Home</Link></li>
            <li><Link to={baseUrl + '/webgl'}>WebGL</Link></li>
            <li><Link to={baseUrl + '/webgpu'}>WebGPU</Link></li>
          </NavLinks>
        </NavContainer> */}
        <nav className='flex h-12 items-center text-gray-800 px-4 md:px-8 shadow-md fixed'>
          <ul
            id="navigation"
            className="flex flex-grow items-center h-12 text-gray-800 space-x-4 md:space-x-8"
          >
            <li className="flex-shrink-0"> <Link to={baseUrl} className="block py-2 hover:text-blue-500">Entrance</Link> </li>
            <li className="flex-shrink-0"> <Link to={baseUrl + '/ui'} className="block py-2 hover:text-blue-500">CustomUI</Link> </li>
            <li className="flex-shrink-0"> <Link to={baseUrl + '/webgl'} className="block py-2 hover:text-blue-500">WebGL</Link> </li>
            <li className="flex-shrink-0"> <Link to={baseUrl + '/webgpu'} className="block py-2 hover:text-blue-500">WebGPU</Link> </li>
          </ul>
        </nav>

        <Routes>
          <Route path={baseUrl} element={<Home />} />

          {/* Custom UI Routes */}
          <Route path={baseUrl + '/ui'} element={<CustomUIPage />} />

          {/* WebGL Routes */}
          <Route path={baseUrl + '/webgl'} element={<WebGLPage />} />
          <Route path={baseUrl + '/webgl_triangle'} element={<WebGLTriangle />} />
          <Route path={baseUrl + '/webgl_gaussian_blur'} element={<WebGLGaussianBlur />} />
          <Route path={baseUrl + '/basic-pipeline/triangle'} element={<TriangleRendering />} />
          <Route path={baseUrl + '/basic-pipeline/color'} element={<ColorInterpolation />} />
          <Route path={baseUrl + '/basic-pipeline/texture'} element={<TextureMapping />} />
          <Route path={baseUrl + '/basic-pipeline/transform'} element={<TransformMatrix />} />
          <Route path={baseUrl + '/basic-pipeline/lighting'} element={<BasicLighting />} />

          <Route path={baseUrl + '/texture-system/loading'} element={<TextureLoading />} />
          <Route path={baseUrl + '/texture-system/multiple'} element={<MultipleTextures />} />
          <Route path={baseUrl + '/texture-system/animation'} element={<TextureAnimation />} />
          <Route path={baseUrl + '/texture-system/normal'} element={<NormalMapping />} />
          <Route path={baseUrl + '/texture-system/environment'} element={<EnvironmentMapping />} />
          <Route path={baseUrl + '/texture-system/video'} element={<VideoTexture />} />
          <Route path={baseUrl + '/texture-system/cube-map'} element={<CubeMap />} />
          {/* WebGPU Routes */}
          <Route path={baseUrl + '/webgpu'} element={<WebGPUPage />} />
          <Route path={baseUrl + '/webgpu_init'} element={<WebGPU00 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
