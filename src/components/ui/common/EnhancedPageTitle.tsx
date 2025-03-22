import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

interface EnhancedPageTitleProps {
  title: string;
  subtitle?: string;
  actionLink?: string;
  actionText?: string;
  textAlign?: 'left' | 'center' | 'right';
  withAnimation?: boolean;
}

/**
 * 增强型页面标题组件
 * 提供与主页相似的风格标题，统一各页面标题样式
 */
const EnhancedPageTitle: React.FC<EnhancedPageTitleProps> = ({
  title,
  subtitle,
  actionLink,
  actionText,
  textAlign = 'left',
  withAnimation = true,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 动画变体 - 增强版，更平滑的动画效果
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.12,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  // 更现代的标题渐变
  const titleGradient = isDark
    ? 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.85) 100%)'
    : 'linear-gradient(135deg, #1a1a2e 0%, rgba(26,26,46,0.85) 100%)';

  // 更引人注目的按钮渐变
  const buttonGradient = isDark
    ? 'linear-gradient(135deg, #7928CA 0%, #FF0080 100%)'
    : 'linear-gradient(135deg, #0070F3 0%, #00DFD8 100%)';

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial={withAnimation ? "hidden" : "visible"}
      animate="visible"
      sx={{
        textAlign,
        mb: 5,
        position: 'relative',
        zIndex: 2,
        p: { xs: 2, md: 3 },
        borderRadius: '16px',
        background: isDark
          ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.7), rgba(25, 25, 45, 0.3))'
          : 'linear-gradient(135deg, rgba(245, 245, 255, 0.8), rgba(235, 235, 255, 0.4))',
        backdropFilter: 'blur(10px)',
        boxShadow: isDark
          ? '0 8px 32px rgba(0, 0, 0, 0.2)'
          : '0 8px 32px rgba(0, 0, 30, 0.08)',
        border: isDark
          ? '1px solid rgba(255, 255, 255, 0.08)'
          : '1px solid rgba(255, 255, 255, 0.7)',
      }}
    >
      {/* 装饰元素 */}
      <Box
        component={motion.div}
        initial={withAnimation ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        sx={{
          position: 'absolute',
          top: -20,
          right: 40,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isDark
            ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
            : 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
          opacity: 0.15,
          filter: 'blur(25px)',
          zIndex: 0
        }}
      />

      <motion.div variants={itemVariants}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: '2.25rem', md: '3rem' },
            fontWeight: 800,
            mb: 1.5,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            background: titleGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: isDark
              ? '0 4px 16px rgba(100, 100, 255, 0.25)'
              : '0 4px 12px rgba(0, 0, 30, 0.12)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {title}
        </Typography>
      </motion.div>

      {subtitle && (
        <motion.div variants={itemVariants}>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              maxWidth: 650,
              fontSize: { xs: '1.05rem', md: '1.2rem' },
              lineHeight: 1.7,
              color: isDark ? alpha('#fff', 0.75) : alpha('#000', 0.75),
              marginLeft: textAlign === 'center' ? 'auto' : undefined,
              marginRight: textAlign === 'center' ? 'auto' : undefined,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {subtitle}
          </Typography>
        </motion.div>
      )}

      {actionLink && actionText && (
        <motion.div variants={itemVariants}>
          <Box sx={{ mt: 2.5, mb: 1, position: 'relative', zIndex: 2 }}>
            <Link to={actionLink} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 3.5,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  color: '#fff',
                  background: buttonGradient,
                  transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: isDark
                      ? '0 8px 20px rgba(100, 0, 200, 0.25)'
                      : '0 8px 20px rgba(0, 112, 243, 0.25)'
                  }
                }}
              >
                {actionText}
                <FiArrowRight style={{ marginLeft: 10, strokeWidth: 2.5 }} />
              </Box>
            </Link>
          </Box>
        </motion.div>
      )}

      {/* 装饰线条 */}
      <Box
        component={motion.div}
        initial={withAnimation ? { opacity: 0, width: '30%' } : { opacity: 1, width: '80%' }}
        animate={{ opacity: 1, width: '80%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        sx={{
          position: 'absolute',
          bottom: -2,
          left: '10%',
          right: '10%',
          height: '3px',
          borderRadius: '3px',
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(100, 100, 255, 0.3), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(100, 100, 255, 0.2), transparent)',
          zIndex: 1
        }}
      />
    </Box>
  );
};

export default EnhancedPageTitle;
