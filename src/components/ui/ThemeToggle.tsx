import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import IconButton from './common/IconButton';
import { SxProps, Theme } from '@mui/material';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
}

/**
 * 主题切换按钮组件
 * 提供日/夜间模式切换功能，带有流畅动画效果
 * 使用统一的IconButton组件实现
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 'medium', sx }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  // 根据size属性计算图标尺寸
  const getIconSize = () => {
    switch (size) {
      case 'small': return 18;
      case 'large': return 24;
      default: return 22;
    }
  };

  const iconSize = getIconSize();

  // 动画变体 - 增强图标切换效果
  const iconVariants = {
    initial: { scale: 0, rotate: -30, opacity: 0 },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    },
    exit: {
      scale: 0,
      rotate: 30,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // 图标颜色 - 更加鲜明
  const getIconColor = () => {
    return isDark
      ? '#FFD700' // 金黄色在暗色模式
      : '#FF9500'; // 橙色在亮色模式
  };

  const iconColor = getIconColor();

  return (
    <IconButton
      onClick={toggleTheme}
      tooltipText={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      size={size}
      sx={sx}
      ariaLabel={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      icon={
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={iconVariants}
            >
              <FiMoon size={iconSize} color={iconColor} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={iconVariants}
            >
              <FiSun size={iconSize} color={iconColor} />
            </motion.div>
          )}
        </AnimatePresence>
      }
    />
  );
};

export default ThemeToggle;
