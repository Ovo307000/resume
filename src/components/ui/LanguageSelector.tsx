import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  // 语言切换处理函数
  const handleLanguageChange = () => {
    changeLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <motion.button
      onClick={handleLanguageChange}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors"
      aria-label={t('common.language')}
    >
      <span className="text-sm font-medium">
        {language === 'en' ? '中文' : 'English'}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
    </motion.button>
  );
};

export default LanguageSelector;
