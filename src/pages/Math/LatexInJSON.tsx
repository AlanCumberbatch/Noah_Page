import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import katex from 'katex';
import 'katex/dist/katex.min.css';
// import { Outlet, Link, useNavigate } from 'react-router-dom';

import { repositoryName } from '@/env'

const LatexInJSON = () => {


  const { t } = useTranslation('math_latex');
  const [activeSection, setActiveSection] = useState(0);
  // const sections = Object.keys(t('section1', { returnObjects: true }));
  const sections = [
    { title: t('section1.title'), content: t('section1.content') },
    { title: t('section2.title'), content: t('section2.content') },
    { title: t('section3.title'), content: t('section3.content') },
    { title: t('section4.title'), content: t('section4.content') },
    { title: t('section5.title'), content: t('section5.content') },
    { title: t('section6.title'), content: t('section6.content') },
    { title: t('section7.title'), content: t('section7.content') },
    { title: t('section8.title'), content: t('section8.content') },
    { title: t('section9.title'), content: t('section9.content') },
    { title: t('section10.title'), content: t('section10.content') },
    { title: t('section11.title'), content: t('section11.content') },
    { title: t('section12.title'), content: t('section12.content') },
    { title: t('section13.title'), content: t('section13.content') },
    { title: t('section14.title'), content: t('section14.content') },
    { title: t('section15.title'), content: t('section15.content') },
  ];
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
    <>
      <div className="flex relative min-h-screen max-w-full overflow-x-hidden">
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

          {/* 各个内容块 */}
          {sections.map((section, index) => (
            <div
              id={`section-${index}`}
              key={index}
              className="mt-6 p-8 rounded-sm shadow-md bg-gradient-to-r from-gray-100 to-gray-200 text-pink-950"
            >
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              {/* <ReactMarkdown>{section.content}</ReactMarkdown> */}
              {/* <div>{section.content}</div> */}
              <div style={{ whiteSpace: "pre-wrap" }} className="tracking-wide">{renderMath(t(section.content))}</div>
              <div className=' relative bg-gray-100 text-latex py-4 mt-4 rounded-sm'>
                {section.content}
                <div className='absolute bottom--4 right-0 flex items-center'>
                  <img className='w-8 h-3' src={`/${repositoryName}/LaTeX_logo.svg.png`} />
                  {/* <div className=''>+</div>
                  <img className='w-4' src={"/JSON_vector_logo.svg.png"}/> */}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}

export default LatexInJSON;