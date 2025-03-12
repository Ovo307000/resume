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
        ? '0 10px 25px rgba(99, 102, 241, 0.5)'
        : '0 10px 25px rgba(99, 102, 241, 0.3)',
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
      case 'small': return 40;
      case 'large': return 60;
      default: return 50;
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
          bottom: { xs: 20, sm: 30 },
          right: { xs: 20, sm: 30 },
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
                ? alpha('#6366F1', 0.9)
                : '#6366F1',
              color: '#FFFFFF',
              boxShadow: isDark
                ? '0 4px 20px rgba(99, 102, 241, 0.4)'
                : '0 4px 20px rgba(99, 102, 241, 0.25)',
              border: `1px solid ${isDark
                ? alpha('#FFFFFF', 0.1)
                : alpha('#6366F1', 0.3)}`,
              '&:hover': {
                backgroundColor: isDark
                  ? alpha('#6366F1', 1)
                  : '#4F46E5',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiArrowUp size={getIconSize()} />
            </Box>
          </Fab>
        </motion.div>
      </Box>
    </Zoom>
  );
};

export default ScrollToTopButton;
