import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from '@mui/material';
import { FiGlobe } from 'react-icons/fi';

interface LanguageSelectorProps {
  fullWidth?: boolean;
}

/**
 * 语言选择器组件
 * 允许用户在中文和英文之间切换
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({ fullWidth = false }) => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  // 语言切换处理函数
  const handleLanguageChange = () => {
    changeLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <Tooltip
      title={t('common.language')}
      arrow
    >
      <Button
        onClick={handleLanguageChange}
        variant="outlined"
        size="small"
        startIcon={<FiGlobe />}
        fullWidth={fullWidth}
        sx={{
          borderRadius: '20px',
          textTransform: 'none',
          minWidth: fullWidth ? '100%' : 'auto',
          px: 2,
          borderColor: 'grey.300',
          color: 'text.primary',
          '&:hover': {
            borderColor: 'primary.main'
          }
        }}
      >
        {language === 'en' ? '中文' : 'English'}
      </Button>
    </Tooltip>
  );
};

export default LanguageSelector;
