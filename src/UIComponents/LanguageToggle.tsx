import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(i18n.language === 'en');

  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'zh' : 'en';
    i18n.changeLanguage(newLanguage);
    setIsEnglish(newLanguage === 'en');
  };

  return (
    <div className="flex items-center">
      {/* 滑动切换按钮容器 */}
      {/* #646cff */}
      <div
        className="relative w-12 h-6 bg-gray-300 rounded-full cursor-pointer flex items-center p-1"
        onClick={toggleLanguage}
      >
        {/* 滑动按钮 */}
        <div
          className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-600 ease-in-out ${
            isEnglish ? 'translate-x-0' : 'translate-x-6'
          } `}
        ></div>
        {/* 状态文本 当前语言在滑钮旁边显示 */}
        <span className={`absolute ml-2 text-sm font-medium text-white ${isEnglish ? 'right-2' : 'left-0' } select-none`}>
          {isEnglish ? 'En' : '中'}
        </span>
      </div>
    </div>
  );
};

export default LanguageToggle;