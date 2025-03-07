import React from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface PageTitleProps {
  title: string;
}

/**
 * 共享的页面标题组件
 * 提供带有动画和渐变下划线的页面标题
 * 增强了暗色模式支持
 */
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3rem'
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        textAlign="center"
        sx={{
          position: 'relative',
          display: 'inline-block',
          color: theme === 'dark' ? 'white' : 'inherit',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #4338CA, #6366F1)',
            borderRadius: '2px',
            opacity: theme === 'dark' ? 0.8 : 1
          }
        }}
      >
        {title}
      </Typography>
    </motion.div>
  );
};

export default PageTitle;
