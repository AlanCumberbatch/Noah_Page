import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import WebGLPage from '@/pages/WebGLPage';
import TriangleRendering from '@/pages/WebGLPage/BasicPipeline/TriangleRendering';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WebGLPage />,
    children: [
      {
        path: 'basic-pipeline/triangle',
        element: <TriangleRendering />,
      },
    ],
  },
]);

export default router;