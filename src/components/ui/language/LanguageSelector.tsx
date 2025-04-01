import React, { useState } from 'react';
import { Box, Menu, MenuItem, Typography, alpha, SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
// 导入国旗图标库
import { US, CN, JP } from 'country-flag-icons/react/3x2';

interface Language {
  code: string;
  countryCode: string;
  name: string;
}

interface LanguageSelectorProps {
  size?: 'small' | 'medium' | 'large';
  compact?: boolean;  // 是否使用紧凑模式
  sx?: SxProps<Theme>;  // 自定义样式
}

/**
 * 现代化语言选择器组件
 * 提供优雅的动画效果和多语言选择
 * 与主题切换器视觉保持一致
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  size = 'medium',
  compact = false,
  sx = {}
}) => {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // 支持的语言列表 - 只保留英语、中文和日语
  const languages: Language[] = [
    { code: 'en', countryCode: 'US', name: 'English' },
    { code: 'zh', countryCode: 'CN', name: '中文' },
    { code: 'ja', countryCode: 'JP', name: '日本語' }
  ];

  // 当前选中的语言
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // 尺寸映射
  const sizeMap = {
    small: 40,
    medium: 38,
    large: 44
  };

  const buttonSize = sizeMap[size];
  // 固定国旗图标大小，不再根据compact变化
  const flagSize = buttonSize * 0.65;

  // 获取背景颜色
  const getBackground = () => {
    if (isDark) {
      return 'rgba(32, 32, 35, 0.6)';
    }
    // 提高亮色模式下的背景对比度
    return 'rgba(240, 240, 250, 0.9)';
  };

  // 打开菜单
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 关闭菜单
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 切换语言
  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    handleClose();
  };

  // 容器动画
  const containerVariants = {
    hover: {
      y: -2,
      boxShadow: isDark
        ? '0 6px 12px rgba(0, 0, 0, 0.3)'
        : '0 6px 12px rgba(0, 0, 0, 0.1)'
    },
    tap: {
      y: 0,
      scale: 0.98,
      boxShadow: isDark
        ? '0 2px 5px rgba(0, 0, 0, 0.2)'
        : '0 2px 5px rgba(0, 0, 0, 0.05)'
    }
  };

  // 渲染国旗图标
  const renderFlag = (countryCode: string, size: number) => {
    const props = {
      title: `${countryCode} flag`,
      style: {
        borderRadius: '2px',
        // 增强边框可见性
        boxShadow: isDark
          ? '0 1px 3px rgba(0, 0, 0, 0.5)'
          : '0 1px 3px rgba(0, 0, 0, 0.3)',
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
        return null;
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          '&:hover .tooltip': {
            opacity: 1,
            transform: 'translateY(0)',
            visibility: 'visible'
          }
        }}
      >
        <motion.div
          whileHover="hover"
          whileTap="tap"
          variants={containerVariants}
          animate={{
            borderRadius: '12px',
            background: getBackground(),
            backdropFilter: 'blur(8px)',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.15)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: isDark
              ? '0 4px 10px rgba(0, 0, 0, 0.25)'
              : '0 4px 10px rgba(0, 0, 0, 0.12)',
            width: buttonSize,
            height: buttonSize,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          style={{
            borderRadius: '12px',
            background: getBackground(),
            backdropFilter: 'blur(8px)',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.15)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: isDark
              ? '0 4px 10px rgba(0, 0, 0, 0.25)'
              : '0 4px 10px rgba(0, 0, 0, 0.12)',
            width: buttonSize,
            height: buttonSize,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            ...sx  // 应用自定义样式
          }}
          onClick={handleClick}
          id="language-selector-button"
          aria-controls={open ? 'language-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          aria-label={t('language.select')}
        >
          <Box sx={{
            width: flagSize,
            height: flagSize * 0.75,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            {renderFlag(currentLanguage.countryCode, flagSize)}
          </Box>
        </motion.div>

        {/* 自定义工具提示 */}
        <Box
          className="tooltip"
          sx={{
            position: 'absolute',
            bottom: '-30px',
            left: '50%',
            transform: 'translateX(-50%) translateY(10px)',
            backgroundColor: isDark ? 'rgba(30, 30, 40, 0.9)' : 'rgba(50, 50, 60, 0.9)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            opacity: 0,
            visibility: 'hidden',
            transition: 'all 0.3s ease',
            zIndex: 1500,
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '0 6px 6px',
              borderStyle: 'solid',
              borderColor: `transparent transparent ${isDark ? 'rgba(30, 30, 40, 0.9)' : 'rgba(50, 50, 60, 0.9)'}`
            }
          }}
        >
          {t('language.select')}
        </Box>
      </Box>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            mt: 1.5,
            backdropFilter: 'blur(10px)',
            backgroundColor: isDark
              ? 'rgba(25, 25, 35, 0.8)'
              : 'rgba(255, 255, 255, 0.9)',
            boxShadow: isDark
              ? '0 8px 20px rgba(0, 0, 0, 0.4)'
              : '0 8px 20px rgba(0, 0, 0, 0.15)',
            border: `1px solid ${
              isDark
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.05)'
            }`,
            overflow: 'hidden',
            '& .MuiList-root': {
              padding: '4px',
            },
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            selected={lang.code === currentLanguage.code}
            sx={{
              borderRadius: '8px',
              margin: '2px 0',
              backgroundColor: lang.code === currentLanguage.code
                ? (isDark ? alpha('#a0a0ff', 0.15) : alpha('#5050ff', 0.08))
                : 'transparent',
              '&:hover': {
                backgroundColor: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 24, height: 18 }}>
                {renderFlag(lang.countryCode, 24)}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: lang.code === currentLanguage.code ? 600 : 400,
                  color: lang.code === currentLanguage.code
                    ? (isDark ? '#a0a0ff' : '#5050ff')
                    : 'text.primary',
                }}
              >
                {lang.name}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
