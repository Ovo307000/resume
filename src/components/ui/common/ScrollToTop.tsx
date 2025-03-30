import React, { useEffect, useState } from 'react';
import { Box, Fab, Zoom, alpha, useTheme as useMuiTheme } from '@mui/material';
import { BiArrowToTop } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface ScrollToTopProps {
  threshold?: number;
  scrollTarget?: string;
  size?: 'small' | 'medium' | 'large';
  position?: {
    bottom?: number | string;
    right?: number | string;
  };
}

/**
 * 回到顶部按钮组件
 * 当页面滚动超过指定距离时显示，点击可回到顶部
 */
const ScrollToTop: React.FC<ScrollToTopProps> = ({
  threshold = 400,
  scrollTarget,
  size = 'medium',
  position = { bottom: 32, right: 24 },
}) => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';

  // 监听滚动事件，决定按钮显示与否
  useEffect(() => {
    const checkScrollTop = () => {
      if (!visible && window.scrollY > threshold) {
        setVisible(true);
      } else if (visible && window.scrollY <= threshold) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [visible, threshold]);

  // 滚动到页面顶部或指定目标
  const scrollToTop = () => {
    if (scrollTarget) {
      const element = document.querySelector(scrollTarget);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        return;
      }
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 获取按钮尺寸
  const getFabSize = () => {
    switch (size) {
      case 'small':
        return { size: 'small', iconSize: 20 };
      case 'large':
        return { size: 'large', iconSize: 28 };
      default:
        return { size: 'medium', iconSize: 24 };
    }
  };

  const { size: fabSize, iconSize } = getFabSize();

  return (
    <Zoom in={visible}>
      <Box
        component={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{
          scale: 1.1,
          y: -5,
          transition: { type: 'spring', stiffness: 400, damping: 10 }
        }}
        whileTap={{ scale: 0.9 }}
        sx={{
          position: 'fixed',
          zIndex: 100,
          ...position,
        }}
      >
        <Fab
          color="primary"
          aria-label="scroll to top"
          size={fabSize}
          onClick={scrollToTop}
          sx={{
            bgcolor: isDark
              ? alpha(muiTheme.palette.primary.main, 0.6)
              : alpha(muiTheme.palette.primary.main, 0.7),
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: isDark
              ? alpha(muiTheme.palette.primary.main, 0.3)
              : alpha(muiTheme.palette.primary.main, 0.2),
            boxShadow: isDark
              ? `0 10px 25px ${alpha(muiTheme.palette.primary.main, 0.3)},
                 0 0 15px ${alpha(muiTheme.palette.primary.main, 0.5)} inset`
              : `0 10px 25px ${alpha(muiTheme.palette.primary.main, 0.2)},
                 0 0 15px ${alpha(muiTheme.palette.primary.main, 0.3)} inset`,
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: isDark
                ? alpha(muiTheme.palette.primary.main, 0.8)
                : alpha(muiTheme.palette.primary.main, 0.9),
              boxShadow: isDark
                ? `0 15px 30px ${alpha(muiTheme.palette.primary.main, 0.4)},
                   0 0 20px ${alpha(muiTheme.palette.primary.main, 0.6)} inset`
                : `0 15px 30px ${alpha(muiTheme.palette.primary.main, 0.3)},
                   0 0 20px ${alpha(muiTheme.palette.primary.main, 0.4)} inset`,
            }
          }}
        >
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <BiArrowToTop size={iconSize} />
          </motion.div>
        </Fab>
      </Box>
    </Zoom>
  );
};

export default ScrollToTop;
