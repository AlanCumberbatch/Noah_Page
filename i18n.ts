import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import HttpBackend from 'i18next-http-backend';
// Import English JSON files
import enTranslation     from './locales/en/translation.json';
import enMath_latex      from './locales/en/math_latex.json';
import enMath_set_theory from './locales/en/math_set_theory.json';
import enMath            from './locales/en/math.json';
import enNotes           from './locales/en/notes.json';
import enShader_is_all   from './locales/en/shader_is_all.json';
import enShader_menu   from './locales/en/shader_menu.json';

// Import Chinese JSON files
import zhTranslation     from './locales/zh/translation.json';
import zhMath_latex      from './locales/zh/math_latex.json';
import zhMath_set_theory from './locales/zh/math_set_theory.json';
import zhMath            from './locales/zh/math.json';
import zhNotes           from './locales/zh/notes.json';
import zhShader_is_all           from './locales/zh/shader_is_all.json';
import zhShader_menu            from './locales/zh/shader_menu.json';

// import { repositoryName } from '@/env'

i18n
  // .use(HttpBackend) // 使用 HttpBackend 从 public/locales 加载 JSON 文件
  // .use(initReactI18next) // 初始化 react-i18next
  // .init({
  //   lng: 'en', // 设置默认语言
  //   fallbackLng: 'en', // 如果当前语言文件未找到时的回退语言
  //   debug: true, // 仅在开发环境启用
  //   backend: {
  //     loadPath: `/${repositoryName}/locales/{{lng}}/{{ns}}.json`, // JSON 文件的加载路径
  //   },
  //   interpolation: {
  //     escapeValue: false, // react 已经会自动处理 XSS
  //   },
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
        math_latex: enMath_latex,
        math_set_theory: enMath_set_theory,
        math: enMath,
        notes: enNotes,
        shader_is_all: enShader_is_all,
        shader_menu: enShader_menu,
      },
      zh: {
        translation: zhTranslation,
        math_latex:      zhMath_latex,
        math_set_theory: zhMath_set_theory,
        math:            zhMath,
        notes:           zhNotes,
        shader_is_all:   zhShader_is_all,
        shader_menu:   zhShader_menu,

      },
  },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if translation not found
    ns: ['translation', 'math_latex', 'math_set_theory', 'math', 'notes', 'shader_is_all', 'shader_menu'], // List of namespaces
    defaultNS: 'translation', // Default namespace to use
    interpolation: {
      escapeValue: false, // React already handles XSS
  },

  });

export default i18n;