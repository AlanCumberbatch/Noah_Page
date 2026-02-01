// import { useState, useEffect, useRef } from 'react';
// import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// import DynamicGradientText from '@/UIComponents/DynamicGradientText';
import LinkBox from '@/UIComponents/LinkBox';

import { repositoryName } from '@/env'
const baseUrl = '/' + repositoryName;

// const ThreePage = () => {
const WebGPUPage: React.FC = () => {

  // // const [animationDirection, setAnimationDirection] = useState('bg-left');
  // const [animationDirection] = useState('bg-left');


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='px-4 md:px-8'>

      <div className='h-12'></div>

      <div className='grid grid-cols-1 md:grid-cols-6 gap-4 justify-items-center'>
        <Link to={baseUrl + '/' + 'webgpu_init'}>
          <LinkBox
            text='WebGPU init'
            label='WebGPU'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        {/* <Link to={baseUrl + '/' + 'webgpu_skybox'}>
          <LinkBox
            text='WebGPU init'
            label='WebGPU'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link> */}
      </div>

    </motion.div>
  );
}

export default WebGPUPage;