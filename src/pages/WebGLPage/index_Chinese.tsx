import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LinkBox from '@/UIComponents/LinkBox';
import { repositoryName } from '@/env'

const baseUrl = '/' + repositoryName;

const WebGLPage: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='px-4 md:px-8'>
      <div className='h-12'></div>

      {/* <div className='grid grid-cols-1 md:grid-cols-6 gap-4 justify-items-center'> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 justify-items-center'>
        <Link to={baseUrl + '/basic-pipeline/triangle'}>
          <LinkBox
            text='三角形渲染'
            label='基础渲染管线'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/basic-pipeline/color'}>
          <LinkBox
            text='颜色插值'
            label='基础渲染管线'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/basic-pipeline/texture'}>
          <LinkBox
            text='纹理映射'
            label='基础渲染管线'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/basic-pipeline/transform'}>
          <LinkBox
            text='变换矩阵'
            label='基础渲染管线'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/basic-pipeline/lighting'}>
          <LinkBox
            text='基础光照'
            label='基础渲染管线'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/texture-system/loading'}>
          <LinkBox
            text='纹理加载'
            label='纹理系统'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/texture-system/multiple'}>
          <LinkBox
            text='多纹理混合'
            label='纹理系统'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/texture-system/animation'}>
          <LinkBox
            text='纹理动画'
            label='纹理系统'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        {/* <Link to={baseUrl + '/texture-system/normal'}>
          <LinkBox
            text='法线贴图'
            label='纹理系统'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/texture-system/environment'}>
          <LinkBox
            text='环境贴图'
            label='纹理系统'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/texture-system/video'}>
          <LinkBox
            text='视频纹理'
            label='纹理系统'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/texture-system/cube-map'}>
          <LinkBox
            text='立方体贴图'
            label='纹理系统'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/webgl_triangle'}>
          <LinkBox
            text='WebGL init'
            label='WebGL'
            color="text-blue-800"
            borderColor="border-blue-900"
            width="w-60"
            height="h-60"
          />
        </Link>
        <Link to={baseUrl + '/webgl_gaussian_blur'}>
          <LinkBox
            text='Gaussian Blur'
            label='WebGL'
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

export default WebGLPage;