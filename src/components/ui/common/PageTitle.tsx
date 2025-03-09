import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

/**
 * 共享的页面标题组件
 * 提供带有动画和渐变下划线的页面标题
 * 增强了暗色模式支持
 * 支持可选的副标题
 */
const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '3rem'
      }}
    >
      {subtitle && (
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
            mb: 1,
            fontWeight: 500
          }}
        >
          {subtitle}
        </Typography>
      )}

      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          textAlign="center"
          sx={{
            color: theme === 'dark' ? 'white' : 'inherit',
            position: 'relative',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10px',
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #4338CA, #6366F1)',
            borderRadius: '2px',
            opacity: theme === 'dark' ? 0.8 : 1
          }}
        />
      </Box>
    </motion.div>
  );
};

export default PageTitle;
