import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { FiCheck, FiGlobe } from 'react-icons/fi';

// 国旗表情符号映射
const FLAG_EMOJIS: Record<string, string> = {
  US: '🇺🇸',
  CN: '🇨🇳',
  JP: '🇯🇵'
};

interface Language {
  code: string;
  countryCode: string;
  name: string;
}

/**
 * 自定义语言选择器组件
 * 提供优雅的动画下拉效果和多语言选择
 */
const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');
  const menuRef = useRef<HTMLDivElement>(null);

  // 支持的语言列表 - 只保留英语、中文和日语
  const languages: Language[] = [
    { code: 'en', countryCode: 'US', name: 'English' },
    { code: 'zh', countryCode: 'CN', name: '中文' },
    { code: 'ja', countryCode: 'JP', name: '日本語' }
  ];

  // 当前选中的语言
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  // 切换语言
  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setSelectedLanguage(languageCode);
    setIsOpen(false);
  };

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 菜单动画
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  // 菜单项动画
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.05,
        duration: 0.3,
        ease: 'easeOut'
      }
    }),
    hover: {
      scale: 1.05,
      x: 5,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  };

  // 渲染国旗表情
  const renderFlag = (countryCode: string, size: number = 20) => {
    const emoji = FLAG_EMOJIS[countryCode];

    if (!emoji) {
      return <FiGlobe size={size * 0.8} />;
    }

    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${size}px`,
          lineHeight: 1,
          filter: theme === 'light' ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' : 'none'
        }}
      >
        <span role="img" aria-label={`${countryCode} flag`}>
          {emoji}
        </span>
      </Box>
    );
  };

  return (
    <Box
      ref={menuRef}
      sx={{
        position: 'relative',
        zIndex: 1200
      }}
    >
      <Tooltip title={t('common.switchLang')} arrow>
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          color="inherit"
          size="small"
          sx={{
            opacity: 0.7,
            borderRadius: '50%',
            p: 1,
            transition: 'all 0.2s',
            backgroundColor: 'transparent',
            '&:hover': {
              opacity: 1,
              backgroundColor: theme === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.05)'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderFlag(currentLanguage.countryCode, 20)}
          </Box>
        </IconButton>
      </Tooltip>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              width: '180px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: theme === 'dark'
                ? '0 8px 20px rgba(0, 0, 0, 0.25)'
                : '0 8px 20px rgba(0, 0, 0, 0.15)',
              backgroundColor: theme === 'dark'
                ? 'rgba(30, 30, 46, 0.9)'
                : 'rgba(255, 255, 255, 0.9)',
              border: `1px solid ${theme === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.08)'}`,
              backdropFilter: 'blur(8px)',
              zIndex: 1300
            }}
          >
            <Box p={1}>
              {languages.map((language, index) => (
                <motion.div
                  key={language.code}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <Box
                    onClick={() => handleLanguageChange(language.code)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor:
                        language.code === selectedLanguage
                          ? theme === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.05)'
                          : 'transparent',
                      '&:hover': {
                        backgroundColor: theme === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.03)',
                      }
                    }}
                  >
                    <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>
                      {renderFlag(language.countryCode, 20)}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        flexGrow: 1,
                        fontWeight: language.code === selectedLanguage ? 600 : 400,
                        color: theme === 'light'
                          ? 'text.primary'
                          : language.code === selectedLanguage
                            ? 'white'
                            : 'text.primary'
                      }}
                    >
                      {language.name}
                    </Typography>
                    {language.code === selectedLanguage && (
                      <FiCheck
                        size={16}
                        color={theme === 'dark' ? '#a0a0ff' : '#5050ff'}
                      />
                    )}
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default LanguageSelector;
