import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './en/translation.json';
import zhTranslation from './zh/translation.json';

// 获取浏览器语言设置
const browserLanguage = navigator.language.split('-')[0];
const defaultLanguage = ['zh', 'en'].includes(browserLanguage) ? browserLanguage : 'en';

// 从本地存储中读取语言偏好，如果没有则使用浏览器语言
const storedLanguage = localStorage.getItem('language') || defaultLanguage;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      zh: {
        translation: zhTranslation
      }
    },
    lng: storedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
