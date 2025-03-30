import React, { useState, useEffect } from 'react';
import { Box, Zoom, Fab, alpha } from '@mui/material';
import { FiArrowUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface ScrollToTopButtonProps {
  threshold?: number;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * 返回顶部按钮组件
 * 优化的动画效果，符合项目整体设计风格
 */
const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  threshold = 300,
  color = 'primary',
  size = 'medium'
}) => {
  const [showButton, setShowButton] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 监听滚动事件，控制按钮显示
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowButton(scrollTop > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 按钮动画变体
  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      boxShadow: isDark
        ? '0 10px 30px rgba(99, 102, 241, 0.6)'
        : '0 10px 30px rgba(99, 102, 241, 0.4)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15
      }
    }
  };

  // 获取按钮尺寸
  const getButtonSize = () => {
    switch (size) {
      case 'small': return 42;
      case 'large': return 62;
      default: return 52;
    }
  };

  // 获取图标尺寸
  const getIconSize = () => {
    switch (size) {
      case 'small': return 18;
      case 'large': return 24;
      default: return 22;
    }
  };

  // 渲染按钮
  return (
    <Zoom in={showButton}>
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 24, sm: 36 },
          right: { xs: 24, sm: 36 },
          zIndex: 1000,
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          <Fab
            onClick={scrollToTop}
            aria-label="Scroll to top"
            sx={{
              width: getButtonSize(),
              height: getButtonSize(),
              backgroundColor: isDark
                ? alpha('#6366F1', 0.8)
                : alpha('#6366F1', 0.9),
              color: '#FFFFFF',
              boxShadow: isDark
                ? '0 4px 20px rgba(99, 102, 241, 0.5)'
                : '0 4px 20px rgba(99, 102, 241, 0.3)',
              border: `1px solid ${isDark
                ? alpha('#FFFFFF', 0.15)
                : alpha('#6366F1', 0.4)}`,
              backdropFilter: 'blur(8px)',
              '&:hover': {
                backgroundColor: isDark
                  ? alpha('#6366F1', 0.9)
                  : '#4F46E5',
              },
              transition: 'all 0.3s ease',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                background: isDark
                  ? 'linear-gradient(145deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.4))'
                  : 'linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(99, 102, 241, 0.1))',
                zIndex: -1,
                opacity: 0.6,
              }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '140%',
                  height: '140%',
                  top: '-20%',
                  left: '-20%',
                  background: isDark
                    ? 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(0, 0, 0, 0) 70%)'
                    : 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(0, 0, 0, 0) 70%)',
                  opacity: 0.4,
                  zIndex: -1
                }
              }}
            >
              <FiArrowUp
                size={getIconSize()}
                style={{
                  filter: `drop-shadow(0 2px 3px ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)'})`
                }}
              />
            </Box>
          </Fab>
        </motion.div>
      </Box>
    </Zoom>
  );
};

export default ScrollToTopButton;
