import { useState } from 'react';
// import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import DynamicGradientText from '@/UIComponents/DynamicGradientText';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
// import rehypeRaw from 'rehype-raw';
// import MathJax from 'react-mathjax';
// import katex from 'katex';
import 'katex/dist/katex.min.css';


// const NotesContent = () => {
//   const { t } = useTranslation('shader_is_all');

//   const [animationDirection] = useState('bg-left');

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
//       <DynamicGradientText
//         text="Notes of my mind."
//         textSize="text-4xl"
//         fontWeight="font-bold"
//         gradientFrom="from-red-400"
//         gradientVia="via-green-500"
//         gradientTo="to-pink-500"
//         animationDirection={animationDirection}
//       />

//       <h1>{t('title')}</h1>
//       <p>{t('content')}</p>
//     </motion.div>
//   );
// };

// const IsShaderAll = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <NotesContent />
//     </Suspense>
//   );
// };

const LearnPathOfAssocitaMath = () => {
  const [animationDirection] = useState('bg-left');

  const { t } = useTranslation('shader_is_all');

  return (

    <div className='px-4 md:px-8'>
      {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      </motion.div> */}
      <div className="flex relative min-h-screen">
        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 p-8 mx-auto max-w-4xl"
        >
          <DynamicGradientText
            text={t('title01')}
            textSize="text-5xl"
            fontWeight="font-bold"
            gradientFrom="from-green-400"
            gradientVia="via-purple-500"
            gradientTo="to-pink-500"
            animationDirection={animationDirection}
          />

          <ReactMarkdown
            children={t('content01')}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            className="prose prose-lg max-w-none"
          />
        </motion.div>

      </div>
    </div>

  );
};
export default LearnPathOfAssocitaMath;