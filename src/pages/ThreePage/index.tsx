// import { useState, useEffect, useRef } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import DynamicGradientText from '@/UIComponents/DynamicGradientText';
import LinkBox from '@/UIComponents/LinkBox';
// import ImageCard from '@/UIComponents/ImageCard';

// three.js
// import ThreeInit from '/three/Three_init.png';
// import Three_SkyBox from '/three/Three_SkyBox.png';
// cesium
// import CesiumInit from '/three/Three_init.png';

import { repositoryName } from '@/env'
const baseUrl = '/' + repositoryName;

// const ThreePage = () => {
const ThreePage: React.FC = () => {

  // const [animationDirection, setAnimationDirection] = useState('bg-left');
  const [animationDirection] = useState('bg-left');


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='px-4 md:px-8'>
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
      <div className='h-12'></div>

      <DynamicGradientText
        text="ThreeJS"
        textSize="text-4xl"
        fontWeight="font-bold"
        gradientFrom="from-blue-100"
        gradientVia="via-blue-500"
        gradientTo="to-blue-300"
        animationDirection={animationDirection}
        otherClass='p-4'
      />
      <div className='grid grid-cols-1 md:grid-cols-6 gap-4 justify-items-center'>
        <Link to={baseUrl + '/' + 'shader_init'}>
          <LinkBox
            text='Init demo'
            label='Three'
            borderColor="border-three-300"
            color="text-three"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/' + 'three_skybox'}>
        {/* <Link to={'/' + 'shader_is_all'}> */}
          <LinkBox
            text='Sky Box'
            label='Three'
            borderColor="border-three-300"
            color="text-three"
            width="w-60"
            height="h-60"
          />
        </Link>
        {/* <Link to={baseUrl + '/' + 'three_christmas'}>
          <LinkBox
            text='Christmas'
            label='Three'
            borderColor="border-three-300"
            color="text-three"
            width="w-60"
            height="h-60"
          />
        </Link> */}
      </div>
      <DynamicGradientText
        text="Cesium.js"
        textSize="text-4xl"
        fontWeight="font-bold"
        gradientFrom="from-blue-400"
        gradientVia="via-white-800"
        gradientTo="to-green-500"
        animationDirection={animationDirection}
        otherClass='p-4'
      />
      <div className='grid grid-cols-1 md:grid-cols-6 gap-4 justify-items-center'>
        <Link to={baseUrl + '/' + 'cesium_init'}>
          <LinkBox
            text='Volume Re...'
            label='Cesium'
            color="text-cesium"
            borderColor="border-cesium-300"
            width="w-60"
            height="h-60"
          />
        </Link>
      </div>

    </motion.div>
  );
}

export default ThreePage;