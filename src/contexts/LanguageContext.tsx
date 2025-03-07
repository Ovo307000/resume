import React, { createContext, useContext, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lng: Language) => void;
}

// 将LanguageContext导出，解决导入错误
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const initialLanguage = (i18n.language || 'en') as Language;
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const changeLanguage = useCallback((lng: Language) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem('language', lng);
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自定义 hook 方便使用语言上下文
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
