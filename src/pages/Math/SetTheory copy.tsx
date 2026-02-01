// import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import DynamicGradientText from '@/UIComponents/DynamicGradientText';
import { useTranslation } from 'react-i18next';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const SetTheory = () => {

  const [animationDirection] = useState('bg-left');

  const { t } = useTranslation('math_set_theory');
  const sections = [
    { title: t('section1.title'), content: t('section1.content') },
    { title: t('section2.title'), content: t('section2.content') },
  ];
  const [activeSection, setActiveSection] = useState(0);
  const handleSectionClick = (index:number) => {
    setActiveSection(index);
    // 滚动到对应内容区域
    document.getElementById(`section-${index}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // 渲染 LaTeX 公式
  const renderMath = (latex: string) => {
    try {
      return <div  dangerouslySetInnerHTML={{ __html: katex.renderToString(latex.replace(/-/g, '\u00A0')) }} />;
    } catch (e) {
      return <span>{latex}</span>;
    }
  };

  return (
    <div className='px-4 md:px-8'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
        <DynamicGradientText
          text="Math :: Set Theory"
          textSize="text-３xl"
          fontWeight="font-bold"
          gradientFrom="from-blue-400"
          gradientVia="via-orange-500"
          gradientTo="to-yellow-500"
          animationDirection={animationDirection}
        />
      </motion.div>
      <div className="flex relative min-h-screen">
        {/* 右侧导航栏 */}
        <div className="hidden md:block fixed top-36 right-56 p-4 bg-gray-200 shadow-lg rounded-sm w-64">
          <ul className="space-y-1">
            {sections.map((section, index) => (
              <li
                key={index}
                className={`cursor-pointer text-sm font-medium ${
                  activeSection === index ? 'text-blue-500' : 'text-gray-600'
                }`}
                onClick={() => handleSectionClick(index)}
              >
                {section.title}
              </li>
            ))}
          </ul>
        </div>

        {/* 内容区域 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 p-8 mx-auto max-w-4xl"
        >

          {/* 各个内容块 */}
          {sections.map((section, index) => (
            <div
              id={`section-${index}`}
              key={index}
              className="mb-6 p-8 rounded-sm shadow-md bg-gradient-to-r from-gray-100 to-gray-200 text-pink-950"
            >
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <div style={{ whiteSpace: "pre-wrap" }} className="tracking-wide">{renderMath(t(section.content))}</div>
              <div className='bg-gray-100 text-latex py-4 mt-4 rounded-sm'>
                {section.content}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default SetTheory;