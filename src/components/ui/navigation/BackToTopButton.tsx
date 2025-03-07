import React from 'react';
import { Fab, useScrollTrigger, useTheme, alpha } from '@mui/material';
import { FiArrowUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme as useAppTheme } from '../../../contexts/ThemeContext';

interface BackToTopButtonProps {
  threshold?: number;
  position?: {
    bottom?: number;
    right?: number;
  };
  color?: 'primary' | 'secondary' | 'default' | 'inherit';
  size?: 'small' | 'medium' | 'large';
}

/**
 * 返回顶部按钮组件
 * 当用户滚动超过一定阈值时显示
 * 点击后平滑滚动回页面顶部
 * 包含优雅的出现和消失动画
 */
const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  threshold = 100,
  position = { bottom: 20, right: 20 },
  color = 'primary',
  size = 'medium'
}) => {
  const muiTheme = useTheme();
  const { theme } = useAppTheme();

  // 使用滚动触发器控制按钮显示
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
  });

  // 滚动到顶部
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 按钮动画变体
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      rotate: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      rotate: 90,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },
    tap: {
      scale: 0.9,
      transition: {
        duration: 0.1
      }
    }
  };

  // 玻璃效果样式
  const glassStyle = {
    backgroundColor: alpha(
      theme === 'dark'
        ? muiTheme.palette.background.paper
        : muiTheme.palette.background.default,
      0.7
    ),
    backgroundImage: theme === 'dark'
      ? `linear-gradient(135deg, ${alpha(muiTheme.palette.primary.dark, 0.7)}, ${alpha(muiTheme.palette.primary.main, 0.4)})`
      : `linear-gradient(135deg, ${alpha(muiTheme.palette.primary.light, 0.7)}, ${alpha(muiTheme.palette.primary.main, 0.4)})`,
    backdropFilter: 'blur(8px)',
    boxShadow: theme === 'dark'
      ? `0 4px 20px ${alpha(muiTheme.palette.common.black, 0.3)}`
      : `0 4px 20px ${alpha(muiTheme.palette.primary.main, 0.3)}`,
    color: theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.white,
    border: `1px solid ${alpha(muiTheme.palette.common.white, 0.1)}`,
  };

  return (
    <AnimatePresence mode="wait">
      {trigger && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          style={{
            position: 'fixed',
            bottom: position.bottom,
            right: position.right,
            zIndex: 1000,
          }}
        >
          <Fab
            size={size}
            onClick={handleClick}
            aria-label="back to top"
            sx={{
              ...glassStyle
            }}
          >
            <FiArrowUp />
          </Fab>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
