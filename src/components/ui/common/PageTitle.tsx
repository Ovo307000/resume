import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  textAlign?: 'left' | 'center' | 'right';
  variant?: 'default' | 'large';
  withAnimation?: boolean;
}

/**
 * 页面标题组件
 * 提供统一的页面标题样式，支持子标题和动画效果
 */
const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  textAlign = 'left',
  variant = 'default',
  withAnimation = true,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 动画变体
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  // 尺寸映射
  const sizeMaps = {
    default: {
      titleSize: { xs: '1.75rem', sm: '2rem' },
      subtitleSize: { xs: '1rem', sm: '1.1rem' },
      spacing: 1,
    },
    large: {
      titleSize: { xs: '2rem', sm: '2.5rem' },
      subtitleSize: { xs: '1.1rem', sm: '1.25rem' },
      spacing: 2,
    }
  };

  const sizes = sizeMaps[variant];

  return (
    <Box
      sx={{
        textAlign,
        mb: 4,
        position: 'relative',
        '&::after': subtitle ? {
          content: '""',
          position: 'absolute',
          bottom: -16,
          left: textAlign === 'center' ? '50%' : 0,
          transform: textAlign === 'center' ? 'translateX(-50%)' : 'none',
          width: textAlign === 'center' ? '80px' : '40px',
          height: '3px',
          borderRadius: '2px',
          background: isDark
            ? 'linear-gradient(90deg, #6366F1, #8B5CF6)'
            : 'linear-gradient(90deg, #4F46E5, #7C3AED)'
        } : {}
      }}
    >
      <Typography
        component={motion.h1}
        initial={withAnimation ? 'hidden' : 'visible'}
        animate="visible"
        variants={titleVariants}
        variant="h1"
        sx={{
          fontSize: sizes.titleSize,
          fontWeight: 700,
          backgroundImage: isDark
            ? 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.8) 100%)'
            : 'linear-gradient(90deg, #1a1a2e 0%, rgba(26,26,46,0.8) 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: isDark
            ? '0 2px 12px rgba(100, 100, 255, 0.2)'
            : '0 2px 8px rgba(0, 0, 30, 0.15)',
          mb: sizes.spacing
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          component={motion.p}
          initial={withAnimation ? 'hidden' : 'visible'}
          animate="visible"
          variants={subtitleVariants}
          sx={{
            fontSize: sizes.subtitleSize,
            fontWeight: 400,
            color: isDark ? alpha('#fff', 0.7) : alpha('#000', 0.7),
            maxWidth: '600px',
            marginLeft: textAlign === 'center' ? 'auto' : undefined,
            marginRight: textAlign === 'center' ? 'auto' : undefined,
            lineHeight: 1.5
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default PageTitle;
