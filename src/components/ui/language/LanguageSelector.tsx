import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, alpha, SxProps, Theme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiGlobe, FiCheck } from 'react-icons/fi';
// 导入国旗图标库
import { US, CN, JP } from 'country-flag-icons/react/3x2';
import IconButton from '../common/IconButton';

interface Language {
  code: string;
  countryCode: string;
  name: string;
}

interface LanguageSelectorProps {
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
  variant?: 'icon' | 'button';
}

/**
 * 自定义语言选择器组件
 * 提供优雅的动画下拉效果和多语言选择
 * 使用统一的IconButton组件实现
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  size = 'medium',
  sx,
  fullWidth = false,
  variant = 'icon'
}) => {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');
  const menuRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

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

  // 根据size属性计算图标尺寸
  const getIconSize = () => {
    switch (size) {
      case 'small': return 18;
      case 'large': return 24;
      default: return 22;
    }
  };

  const iconSize = getIconSize();

  // 渲染国旗图标
  const renderFlag = (countryCode: string, size: number = 20) => {
    const props = {
      width: size,
      height: size * 0.75,
      title: `${countryCode} flag`,
      style: {
        borderRadius: '2px',
        boxShadow: theme === 'light' ? '0 1px 2px rgba(0,0,0,0.2)' : '0 1px 2px rgba(0,0,0,0.3)',
      }
    };

    switch (countryCode) {
      case 'US':
        return <US {...props} />;
      case 'CN':
        return <CN {...props} />;
      case 'JP':
        return <JP {...props} />;
      default:
        return <FiGlobe size={size} />;
    }
  };

  // 渲染当前语言图标
  const renderCurrentLanguageIcon = () => {
    return renderFlag(currentLanguage.countryCode, iconSize);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 使用图标按钮模式
  if (variant === 'icon') {
    return (
      <Box ref={menuRef} sx={{ position: 'relative', ...sx }}>
        <IconButton
          onClick={toggleMenu}
          tooltipText={t('language.select')}
          size={size}
          ariaLabel={t('language.select')}
          icon={renderCurrentLanguageIcon()}
        />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                zIndex: 1000,
                width: 160
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: isDark
                    ? alpha('#1A1A1A', 0.9)
                    : alpha('#FFFFFF', 0.95),
                  overflow: 'hidden',
                  border: `1px solid ${
                    isDark
                      ? alpha('#ffffff', 0.1)
                      : alpha('#000000', 0.05)
                  }`,
                  boxShadow: isDark
                    ? '0 10px 25px rgba(0, 0, 0, 0.3)'
                    : '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Box sx={{ p: 1 }}>
                  {languages.map((language, index) => {
                    const isSelected = language.code === selectedLanguage;

                    return (
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
                            padding: '10px 16px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            backgroundColor: isSelected
                              ? isDark
                                ? alpha('#6366F1', 0.2)
                                : alpha('#6366F1', 0.1)
                              : 'transparent',
                            '&:hover': {
                              backgroundColor: isSelected
                                ? isDark
                                  ? alpha('#6366F1', 0.3)
                                  : alpha('#6366F1', 0.15)
                                : isDark
                                ? alpha('#ffffff', 0.05)
                                : alpha('#000000', 0.03)
                            }
                          }}
                        >
                          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                            {renderFlag(language.countryCode)}
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              flexGrow: 1,
                              fontWeight: isSelected ? 600 : 400,
                              color: isSelected
                                ? '#6366F1'
                                : 'text.primary'
                            }}
                          >
                            {language.name}
                          </Typography>
                          {isSelected && (
                            <FiCheck
                              size={16}
                              style={{
                                color: '#6366F1',
                                marginLeft: '4px'
                              }}
                            />
                          )}
                        </Box>
                      </motion.div>
                    );
                  })}
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    );
  }

  // 使用按钮模式
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      ref={menuRef}
      style={{ position: 'relative' }}
    >
      <Box
        onClick={toggleMenu}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          padding: '6px 12px',
          borderRadius: '12px',
          backgroundColor: alpha(isDark ? '#ffffff' : '#000000', 0.05),
          border: `1px solid ${alpha(isDark ? '#ffffff' : '#000000', 0.1)}`,
          boxShadow: isDark
            ? '0 4px 10px rgba(0, 0, 0, 0.3)'
            : '0 4px 10px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          width: fullWidth ? '100%' : 'auto',
          ...sx
        }}
      >
        <Box sx={{ mr: 1 }}>
          {renderCurrentLanguageIcon()}
        </Box>
        <Typography variant="body2">
          {currentLanguage.name}
        </Typography>
      </Box>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              zIndex: 1000,
              width: 160
            }}
          >
            <Paper
              elevation={3}
              sx={{
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                backgroundColor: isDark
                  ? alpha('#1A1A1A', 0.9)
                  : alpha('#FFFFFF', 0.95),
                overflow: 'hidden',
                border: `1px solid ${
                  isDark
                    ? alpha('#ffffff', 0.1)
                    : alpha('#000000', 0.05)
                }`,
                boxShadow: isDark
                  ? '0 10px 25px rgba(0, 0, 0, 0.3)'
                  : '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Box sx={{ p: 1 }}>
                {languages.map((language, index) => {
                  const isSelected = language.code === selectedLanguage;

                  return (
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
                          padding: '10px 16px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          backgroundColor: isSelected
                            ? isDark
                              ? alpha('#6366F1', 0.2)
                              : alpha('#6366F1', 0.1)
                            : 'transparent',
          '&:hover': {
                            backgroundColor: isSelected
                              ? isDark
                                ? alpha('#6366F1', 0.3)
                                : alpha('#6366F1', 0.15)
                              : isDark
                              ? alpha('#ffffff', 0.05)
                              : alpha('#000000', 0.03)
          }
        }}
      >
                        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                          {renderFlag(language.countryCode)}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            flexGrow: 1,
                            fontWeight: isSelected ? 600 : 400,
                            color: isSelected
                              ? '#6366F1'
                              : 'text.primary'
                          }}
                        >
                          {language.name}
                        </Typography>
                        {isSelected && (
                          <FiCheck
                            size={16}
                            style={{
                              color: '#6366F1',
                              marginLeft: '4px'
                            }}
                          />
                        )}
                      </Box>
                    </motion.div>
                  );
                })}
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LanguageSelector;
