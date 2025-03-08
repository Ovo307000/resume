import React from 'react';
import { Box, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import CustomTooltip from './common/CustomTooltip';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
}

/**
 * 主题切换按钮组件
 * 提供日/夜间模式切换功能，带有流畅动画效果
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 'medium' }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  // 根据size属性计算尺寸
  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          button: { width: 36, height: 36, borderRadius: '10px' },
          icon: 18
        };
      case 'large':
        return {
          button: { width: 48, height: 48, borderRadius: '14px' },
          icon: 24
        };
      default:
        return {
          button: { width: 42, height: 42, borderRadius: '12px' },
          icon: 22
        };
    }
  };

  const sizes = getSize();

  // 获取按钮样式
  const getButtonStyle = () => {
    // 日间模式下的样式优化
    if (theme === 'light') {
      return {
        backgroundColor: 'rgba(240, 240, 245, 0.6)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        '&:hover': {
          backgroundColor: 'rgba(230, 230, 240, 0.8)'
        }
      };
    }

    // 暗黑模式下的样式
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }
    };
  };

  // 动画变体
  const buttonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
    hover: { scale: 1.05 }
  };

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

  return (
    <CustomTooltip title={isDark ? t('common.switchToLight') : t('common.switchToDark')} arrow placement="bottom">
      <Box>
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          <IconButton
            onClick={toggleTheme}
            aria-label={isDark ? t('common.switchToLight') : t('common.switchToDark')}
            sx={{
              ...sizes.button,
              padding: 0,
              transition: 'all 0.3s ease',
              color: isDark ? '#FFD700' : '#FF9500', // 金黄色在暗色模式，橙色在亮色模式
              ...getButtonStyle()
            }}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ display: 'flex' }}
                >
                  <FiMoon size={sizes.icon} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ display: 'flex' }}
                >
                  <FiSun size={sizes.icon} />
                </motion.div>
              )}
            </AnimatePresence>
          </IconButton>
        </motion.div>
      </Box>
    </CustomTooltip>
  );
};

export default ThemeToggle;
