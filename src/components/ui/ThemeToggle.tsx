import React from 'react';
import { Box, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { SxProps, Theme } from '@mui/material';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
  variant?: 'minimal' | 'full';
}

/**
 * 现代化主题切换按钮组件
 * 提供日/夜间模式切换功能，带有新设计和精美的动画效果
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'medium',
  sx,
  variant = 'full'
}) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  // 尺寸映射
  const sizeMap = {
    small: 32,
    medium: 38,
    large: 44
  };

  const buttonSize = sizeMap[size];
  const iconSize = buttonSize * 0.5;

  // 获取统一的背景颜色
  const getBackground = () => {
    if (isDark) {
      return 'rgba(32, 32, 35, 0.6)';
    }
    return 'rgba(255, 255, 255, 0.7)';
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

  // 图标动画
  const iconVariants = {
    initial: { opacity: 0, y: 10, rotate: -30 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: -10, rotate: 30 }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <motion.div
        whileHover="hover"
        whileTap="tap"
        variants={containerVariants}
        style={{
          borderRadius: '12px',
          background: getBackground(),
          backdropFilter: 'blur(8px)',
          border: `1px solid ${
            isDark
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)'
          }`,
          boxShadow: isDark
            ? '0 4px 10px rgba(0, 0, 0, 0.25)'
            : '0 4px 10px rgba(0, 0, 0, 0.08)',
          width: buttonSize,
          height: buttonSize,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'background 0.3s'
        }}
        onClick={toggleTheme}
        id="theme-toggle-button"
        aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      >
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={iconVariants}
          transition={{ duration: 0.2 }}
          key={isDark ? 'moon' : 'sun'}
          style={{
            color: isDark ? '#f1c40f' : '#f39c12',
            filter: `drop-shadow(0 0 3px ${
              isDark ? alpha('#f1c40f', 0.4) : alpha('#f39c12', 0.4)
            })`,
          }}
        >
          {isDark ? <FiMoon size={iconSize} /> : <FiSun size={iconSize} />}
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default ThemeToggle;
