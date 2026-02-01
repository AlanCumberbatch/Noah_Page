// import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
// import DynamicGradientText from '@/UIComponents/DynamicGradientText';

// 参考链接： https://shadertoyunofficial.wordpress.com

const ShaderToyTutorial = () => {
  const { t } = useTranslation('translation');
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { title: t('section1.title'), content: t('section1.content') },
    { title: t('section2.title'), content: t('section2.content') },
    { title: t('section3.title'), content: t('section3.content') },
    { title: t('section4.title'), content: t('section4.content') },
    { title: t('section5.title'), content: t('section5.content') },
    { title: t('section6.title'), content: t('section6.content') },
    { title: t('section7.title'), content: t('section7.content') },
  ];

  const handleSectionClick = (index:number) => {
    setActiveSection(index);
    // 滚动到对应内容区域
    document.getElementById(`section-${index}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="flex relative min-h-screen">
      {/* 右侧导航栏 */}
      <div className="hidden md:block fixed top-28 right-56 p-4 bg-gray-200 shadow-lg rounded-sm w-64">
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
        {/* <DynamicGradientText
          text="Everything is COMING !!!"
          textSize="text-6xl"
          fontWeight="font-bold"
          gradientFrom="from-blue-400"
          gradientVia="via-orange-500"
          gradientTo="to-yellow-500"
        /> */}

        {/* 各个内容块 */}
        {sections.map((section, index) => (
          <div
            id={`section-${index}`}
            key={index}
            className="mt-6 p-8 rounded-sm shadow-md bg-gradient-to-r from-gray-100 to-gray-200 text-pink-950"
          >
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ShaderToyTutorial;