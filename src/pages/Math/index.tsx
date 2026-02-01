import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import { Outlet, useNavigate } from 'react-router-dom';

import DynamicGradientText from '@/UIComponents/DynamicGradientText';
// import ImageCard from '@/UIComponents/ImageCard';

import { repositoryName } from '@/env'
const baseUrl = '/' + repositoryName;

const Math = () => {
  const [animationDirection] = useState('bg-left');

  return (
    <div className='px-4 md:px-8'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
        <DynamicGradientText
          text="Math is Great to touch !!!"
          textSize="text-３xl"
          fontWeight="font-bold"
          gradientFrom="from-blue-400"
          gradientVia="via-orange-500"
          gradientTo="to-yellow-500"
          animationDirection={animationDirection}
        />
      </motion.div>

      {/* 添加跳转按钮 */}
      <Link to={`${baseUrl}/${'latex_in_json'}`}>
        <div>Latex in JSON</div>
      </Link>
      <Link to={`${baseUrl}/${'latex_in_json_for_this_project'}`}>
        <div>Latex in JSON For This Project</div>
      </Link>
      {/* <Link to={`${baseUrl}/${'set_theory'}`}>
        <div>Set Theory</div>
      </Link> */}

      {/* <Link to="/math/settings">
        <button className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded">
          Go to Shader
        </button>
      </Link> */}
      {/* 渲染子路由 */}
      {/* <Outlet /> */}

    </div>
  );
}

export default Math;