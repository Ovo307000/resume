import React from 'react';
import { Box, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

const GradientBackground: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';

  // 背景形状动画
  const shapeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.1,
      scale: 1,
      transition: { duration: 1.5, ease: 'easeOut' }
    }
  };

  // 点状装饰动画
  const dotsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.5,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.3 }
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: -1,
        background: isDark
          ? 'radial-gradient(circle at 30% 30%, rgba(66, 65, 81, 0.5) 0%, rgba(36, 32, 56, 0.5) 45%, rgba(22, 19, 32, 0.5) 100%)'
          : 'radial-gradient(circle at 30% 30%, rgba(240, 244, 255, 0.7) 0%, rgba(230, 237, 255, 0.8) 45%, rgba(220, 230, 255, 0.9) 100%)',
      }}
    >
      {/* 背景装饰形状 */}
      <Box
        component={motion.div}
        variants={shapeVariants}
        initial="hidden"
        animate="visible"
        sx={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(111, 137, 250, 0.1) 0%, rgba(70, 85, 213, 0.05) 50%, rgba(39, 50, 115, 0) 100%)'
            : 'radial-gradient(circle, rgba(111, 137, 250, 0.1) 0%, rgba(70, 85, 213, 0.05) 50%, rgba(39, 50, 115, 0) 100%)',
          filter: 'blur(40px)',
          transform: 'translateZ(0)',
        }}
      />

      {/* 点状装饰 */}
      <Box
        component={motion.div}
        variants={dotsVariants}
        initial="hidden"
        animate="visible"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0',
        }}
      />

      {/* 额外装饰元素 */}
      <Box
        component={motion.div}
        variants={shapeVariants}
        initial="hidden"
        animate="visible"
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(132, 90, 223, 0.15) 0%, rgba(95, 46, 165, 0.05) 50%, rgba(67, 26, 107, 0) 100%)'
            : 'radial-gradient(circle, rgba(132, 90, 223, 0.15) 0%, rgba(95, 46, 165, 0.05) 50%, rgba(67, 26, 107, 0) 100%)',
          filter: 'blur(30px)',
          transform: 'translateZ(0)',
        }}
      />
    </Box>
  );
};

export default GradientBackground;
