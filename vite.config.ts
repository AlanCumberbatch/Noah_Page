import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import cesium from 'vite-plugin-cesium';
// import vitePluginCopy from 'vite-plugin-copy';
import { repositoryName } from './src/env'

// process.env.NODE_ENV = 'development';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cesium()
    // vitePluginCopy({
    //   targets: [
    //     {
    //       src: '404.html',      // 需要复制的文件
    //       // dest: 'build',        // 复制到的目标目录
    //     },
    //   ],
    // }),
  ],
  // base: '/test_ts/'  // 替换为你的仓库名称
  base: `/${repositoryName}/`,  // 替换为你的仓库名称
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
