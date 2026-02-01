import { useState } from 'react';
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

const LatexInJSONForThisProject = () => {
  const [animationDirection] = useState('bg-left');

  const { t } = useTranslation('math_set_theory');

  return (

    <div className='px-2 md:px-4'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <DynamicGradientText
          text="Math :: Latex in JSON for this project"
          textSize="text-3xl"
          fontWeight="font-bold"
          gradientFrom="from-blue-400"
          gradientVia="via-orange-500"
          gradientTo="to-yellow-500"
          animationDirection={animationDirection}
        />
      </motion.div>
      <div className="flex relative min-h-screen">
        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 p-8 mx-auto max-w-4xl"
        >
          <ReactMarkdown
            children={t('content')}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            className="prose prose-lg max-w-non rounded-sm p-4"
          />
          <div className='rounded-sm p-4 my-6'> {t('content')} </div>
        </motion.div>

      </div>
      </div>

  );
};

export default LatexInJSONForThisProject;