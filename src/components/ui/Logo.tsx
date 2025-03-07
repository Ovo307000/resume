import React from 'react';
import { Box, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

/**
 * 现代化Logo组件
 * 使用SVG而不是文字
 */
const Logo: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 动画变量
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.34, 1.56, 0.64, 1] // 弹性效果
      }
    }
  };

  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <Box
          sx={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* SVG Logo */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 背景圆 */}
            <motion.circle
              cx="18"
              cy="18"
              r="16"
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              fill={theme === 'dark' ? 'rgba(79, 70, 229, 0.15)' : 'rgba(67, 56, 202, 0.1)'}
            />

            {/* Z字母路径 */}
            <motion.path
              d="M10 12H26L10 24H26"
              stroke={theme === 'dark' ? '#6366F1' : '#4338CA'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />

            {/* 点缀的点 */}
            <motion.circle
              cx="10"
              cy="12"
              r="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
              fill="#EF4444"
            />

            <motion.circle
              cx="26"
              cy="24"
              r="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              fill="#10B981"
            />
          </svg>
        </Box>

        {/* 名字首字母小标记 */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          sx={{
            fontSize: '12px',
            fontWeight: 'bold',
            ml: 0.5,
            letterSpacing: '1px',
            color: theme === 'dark' ? 'primary.light' : 'primary.main',
            textTransform: 'uppercase'
          }}
        >
          DA
        </Box>
      </Box>
    </Link>
  );
};

export default Logo;
