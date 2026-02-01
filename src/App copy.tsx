import { useState } from 'react'
import styled from 'styled-components';
// import './App.css'
// import { Route, Switch, Link } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Notes from './pages/Notes';
import Home from './pages/Home';
import UIPage from './pages/UIPage';
import ThreePage from '@/pages/ThreePage';
// three.js
import ThreeJSInit from '@/pages/ThreePage/ThreeJSInit';
import ThreeJSkyBox from '@/pages/ThreePage/ThreeJSkyBox';
import ThreeJSChristmas from '@/pages/ThreePage/ThreeJSChristmas';
// cesiumJS
import CesiumMap from '@/pages/ThreePage/CesiumMap';


// WebGPU
import WebGPUPage from '@/pages/WebGPUPage';
import WebGPU00 from '@/pages/WebGPUPage/WebGPU00';
// import WebGPUSkyBox from '@/pages/WebGPUPage/WebGPUSkyBox';
//

// WebGPU
import WebGLPage from '@/pages/WebGLPage';
import WebGLTriangle from '@/pages/WebGLPage/WebGLTriangle';



// import Math from './pages/Math';
// import LatexInJSONForThisProject from './pages/Math/LatexInJSONForThisProject';
// import LatexInJSON from './pages/Math/LatexInJSON';
// import SetTheory from './pages/Math/SetTheory';
// // import Child from './pages/Math/Child';

import Shader from './pages/Shader';
import ShaderToyTutorial from './pages/Shader/ShaderToyTutorial';
import IsShaderAll from './pages/Shader/IsShaderAll';
import LearnPathOfAssocitaMath from '@/pages/Shader/LearnPathOfAssocitaMath';
import ShaderToy00 from '@/pages/Shader/ShaderToy00';
import ShaderToy01 from '@/pages/Shader/ShaderToy01';

// component
// import DynamicGradientText from './UIComponents/DynamicGradientText';


// import LanguageToggle from '@/UIComponents/LanguageToggle'
import '../i18n'; // 引入 i18n 配置

import { repositoryName } from './env'
const baseUrl = '/' + repositoryName;

function App() {

  // const [animationDirection] = useState('bg-left');

  // const location = useLocation(); // 获取当前路径
  // const isActive = (path: string) => location.pathname === path;// 判断是否选中

  const MenuButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    width: 2vw;
    height: 2vw;
    padding: 0;
    margin:4px;
    border-radius: 50%;
    transition: background-color 0.5s ease; /* Smooth transition for background color */
    font-size: 16px;
    font-weight: 900;

    &:hover {
      opacity: 0.7;
      border: none;
    }
    background: linear-gradient(45deg, red, yellow, green, blue);
    background-size: 400% 400%;
    animation: gradientAnimation 3s ease infinite; /* Animating gradient on hover */

    @keyframes gradientAnimation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `;
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    console.log("12312323")
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div className="w-screen h-screen">
      {/* <Router basename="/MarquezSpace"> */}
      <Router>
        <MenuButton onClick={handleMenuClick}>☰</MenuButton>
        {/* <NavContainer>
          <NavLinks isOpen={isMenuOpen}>
            <li><Link to={baseUrl}>Home</Link></li>
            <li><Link to={baseUrl + '/shader'}>Shader</Link></li>
            <li><Link to={baseUrl + '/three'}>3D</Link></li>
            <li><Link to={baseUrl + '/webgl'}>WebGL</Link></li>
            <li><Link to={baseUrl + '/webgpu'}>WebGPU</Link></li>
            <li><Link to={baseUrl + '/custume_ui'}>Custom UI</Link></li>
          </NavLinks>
        </NavContainer> */}
        <NavContainer>
          {/* Use the isOpen state only inside the styled component */}
          <NavLinks isOpen={isMenuOpen} onClick={handleMenuClick}>
            <li><Link to={baseUrl}>Home</Link></li>
            {/* <li><Link to={baseUrl + '/shader'}>Shader</Link></li>
            <li><Link to={baseUrl + '/three'}>3D</Link></li> */}
            <li><Link to={baseUrl + '/webgl'}>WebGL</Link></li>
            <li><Link to={baseUrl + '/webgpu'}>WebGPU</Link></li>
            {/* <li><Link to={baseUrl + '/custume_ui'}>Custom UI</Link></li> */}
          </NavLinks>
        </NavContainer>
        {/*
          <nav className='flex h-12 items-center text-gray-800 px-4 md:px-8 shadow-md fixed'>
            <ul
              id="navigation"
              className="flex flex-grow items-center  h-12  text-gray-800  space-x-4 md:space-x-8"
            >
              <li className="flex-shrink-0"> <Link to="/MarquezSpace" className="block py-2 hover:text-blue-500">Entrance</Link> </li>
              <li className="flex-shrink-0"> <Link to="/MarquezSpace/custume_ui" className="block py-2 hover:text-blue-500">Custom UI</Link> </li>
              <li className="flex-shrink-0"> <Link to="/MarquezSpace/math" className="block py-2 hover:text-blue-500">Math</Link> </li>
              <li className="flex-shrink-0"> <Link to="/MarquezSpace/webgl" className="block py-2 hover:text-blue-500">WebGL</Link> </li>
              <li className="flex-shrink-0"> <Link to="/MarquezSpace/webgpu" className="block py-2 hover:text-blue-500">WebGPU</Link> </li>
              <li className="flex-shrink-0"> <Link to="/MarquezSpace/shader" className="block py-2 hover:text-blue-500">Shader</Link> </li>
              <li className="flex-shrink-0"> <Link to="/MarquezSpace/three" className="block py-2 hover:text-blue-500">3D</Link> </li>
            </ul>
            <LanguageToggle/>
          </nav>
        */}

        <Routes >
          <Route path={baseUrl} element={<Home />} />

          <Route path={baseUrl + '/' + 'shader'} element={<Shader />} />
          <Route path={baseUrl + '/' + 'shaderToy_tutorial'} element={<ShaderToyTutorial />} />
          <Route path={baseUrl + '/' + 'shader_is_all'} element={<IsShaderAll />} />
          <Route path={baseUrl + '/' + 'shadertoy_00'} element={<ShaderToy00 />} />
          <Route path={baseUrl + '/' + 'shadertoy_01'} element={<ShaderToy01 />} />
          <Route path={baseUrl + '/' + 'learn_path_of_associate_math'} element={<LearnPathOfAssocitaMath />} />
          {/* <Route path={baseUrl} element={<Shader />} />
          <Route path={baseUrl + '/' + 'shaderToy_tutorial'} element={<ShaderToyTutorial />} />
          <Route path={baseUrl + '/' + 'shader_is_all'} element={<IsShaderAll />} />
          <Route path={baseUrl + '/' + 'learn_path_of_associate_math'} element={<LearnPathOfAssocitaMath />} /> */}

          {/* <Route path={baseUrl + '/' + 'math'} element={<Math />} > */}
            {/* 子路由 */}
            {/* <Route path="set" element={<SetTheory />} /></Route> */}
          {/* <Route path={baseUrl + '/' + 'latex_in_json_for_this_project'} element={<LatexInJSONForThisProject />} /> */}
          {/* <Route path={baseUrl + '/' + 'latex_in_json'} element={<LatexInJSON />} /> */}
          {/* <Route path={baseUrl + '/' + 'set_theory'} element={<SetTheory />} /> */}

          <Route path={baseUrl + '/' + 'three'} element={<ThreePage />} />
          <Route path={baseUrl + '/' + 'three'} element={<ThreePage />} />
          <Route path={baseUrl + '/' + 'shader_init'} element={<ThreeJSInit />} />
          <Route path={baseUrl + '/' + 'three_skybox'} element={<ThreeJSkyBox />} />
          <Route path={baseUrl + '/' + 'three_christmas'} element={<ThreeJSChristmas />} />
          <Route path={baseUrl + '/' + 'cesium_init'} element={<CesiumMap />} />
          {/* <Route path={baseUrl + '/' + 'notes'} element={<Notes />} /> */}

          {/* webGL */}
          <Route path={baseUrl + '/' + 'webgl'} element={<WebGLPage />} />
          <Route path={baseUrl + '/' + 'webgl_triangle'} element={<WebGLTriangle />} />
          {/* webGPU */}
          <Route path={baseUrl + '/' + 'webgpu'} element={<WebGPUPage />} />
          <Route path={baseUrl + '/' + 'webgpu_init'} element={<WebGPU00 />} />
          {/* <Route path={baseUrl + '/' + 'webgpu_skybox'} element={<WebGPUSkyBox />} /> */}


          <Route path={baseUrl + '/' + 'custume_ui'} element={<UIPage />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
