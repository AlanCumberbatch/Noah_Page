import { useState } from 'react';
import { motion } from 'framer-motion';
// import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LinkBox from '@/UIComponents/LinkBox';

import DynamicGradientText from '@/UIComponents/DynamicGradientText';
// import PagePopUps from '@/UIComponents/PagePopUps';

// import shaderToy00 from '/shader/shaderToy00.png';
// import { useTranslation } from 'react-i18next';


import { repositoryName } from '@/env'
const baseUrl = '/' + repositoryName;

const Shader = () => {
  // const { t } = useTranslation('shader_menu');
  // const navigate = useNavigate();
  // const [isPagePopUpsOpen, setIsPagePopUpsOpen] = useState(false);
  // // 关闭模态框并返回主路径
  // const closePagePopUps = () => {
  //   setIsPagePopUpsOpen(false);
  //   navigate('/MarquezSpace/shader');  // 返回主路径
  // };

  // const [animationDirection, setAnimationDirection] = useState('bg-left');
  const [animationDirection] = useState('bg-left');

  // const handleClick = () => {
  //   alert('Image clicked!');
  // };
  return (
    <div className=' px-4 md:px-8 '>

      <div className='h-12'></div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
        <DynamicGradientText
          text="Shader is AWSOME !!!"
          textSize="text-4xl"
          fontWeight="font-bold"
          gradientFrom="from-green-400"
          gradientVia="via-purple-500"
          gradientTo="to-pink-500"
          animationDirection={animationDirection}
        />
      </motion.div>
      <div className='grid grid-cols-1 md:grid-cols-6 gap-4 justify-items-center'>
        {/* 添加跳转按钮 */}
        {/* <Link to={baseUrl + '/' + 'shaderToy_tutorial'}>
          <div>ShaderToy tutorial</div>
        </Link> */}
        {/* <Link to={baseUrl + '/' + 'shader_is_all'}>
          <ImageCard
            imageSrc={exampleImg}
            altText="Placeholder Image"
            description=""
            width="w-60"
            height="h-60"
            otherStyle='border-4 border-blue-500 p-2'
            />
        </Link> */}
        <Link to={baseUrl + '/' + 'shadertoy_00'}>
          <LinkBox
            text='Shader 00'
            label='Shader'
            color="text-blue-600"
            borderColor="border-blue-500"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/' + 'shadertoy_01'}>
          <LinkBox
            text='Moving Line'
            label='Shader'
            color="text-blue-600"
            borderColor="border-blue-500"
            width="w-60"
            height="h-60"
          />
        </Link>

        {/* <Link to={baseUrl + '/' + 'learn_path_of_associate_math'}>
          <div>{t('shaderMathLearningPath')}</div>
        </Link> */}

      </div>

      {/* 渲染子路由 */}
      {/* <Outlet /> */}

      {/* 弹窗组件 */}
      {/* {isPagePopUpsOpen && <PagePopUps onClose={closePagePopUps} ><Outlet /></PagePopUps>} */}
    </div>
  );
}

export default Shader;