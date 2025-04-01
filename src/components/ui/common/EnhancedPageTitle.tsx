import React from 'react';
import { Box, Typography, Divider, SxProps, Theme } from '@mui/material';
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
  sx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  subtitleSx?: SxProps<Theme>;
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
  textAlign = 'center',
  withAnimation = true,
  sx = {},
  titleSx = {},
  subtitleSx = {}
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  };

  const MotionBox = withAnimation ? motion.div : Box;
  const MotionTypography = withAnimation ? motion(Typography) : Typography;
  const MotionDivider = withAnimation ? motion(Divider) : Divider;

  // 更现代的标题渐变
  const titleGradient = isDark
    ? 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.85) 100%)'
    : 'linear-gradient(135deg, #1a1a2e 0%, rgba(26,26,46,0.85) 100%)';

  // 更引人注目的按钮渐变
  const buttonGradient = isDark
    ? 'linear-gradient(135deg, #7928CA 0%, #FF0080 100%)'
    : 'linear-gradient(135deg, #0070F3 0%, #00DFD8 100%)';

  return (
    <MotionBox
      variants={containerVariants}
      initial={withAnimation ? "hidden" : undefined}
      animate={withAnimation ? "visible" : undefined}
      sx={{ textAlign, mb: { xs: 4, md: 6 }, ...sx }}
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

      <MotionTypography
        variants={itemVariants}
        variant="h2"
        sx={{
          fontWeight: 800,
          mb: 1,
          letterSpacing: '0.5px',
          background: isDark
            ? 'linear-gradient(120deg, #a5b4fc 20%, #fbc2eb 80%)'
            : 'linear-gradient(120deg, #4f46e5 30%, #7c3aed 70%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: isDark ? '0 2px 15px rgba(165, 180, 252, 0.2)' : '0 2px 10px rgba(79, 70, 229, 0.1)',
          ...titleSx,
        }}
      >
        {title}
      </MotionTypography>

      {subtitle && (
        <MotionTypography
          variants={itemVariants}
          variant="h6"
          sx={{
            fontWeight: 400,
            color: isDark ? 'grey.400' : 'grey.600',
            mb: 2,
            letterSpacing: '0.2px',
            ...subtitleSx,
          }}
        >
          {subtitle}
        </MotionTypography>
      )}

      <MotionDivider
        variants={itemVariants}
        sx={{
          width: '80px',
          height: '3px',
          mx: textAlign === 'center' ? 'auto' : (textAlign === 'right' ? '0' : '0'),
          ml: textAlign === 'right' ? 'auto' : undefined,
          background: isDark
            ? 'linear-gradient(90deg, #a5b4fc, #fbc2eb)'
            : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
          borderRadius: '2px',
          border: 'none',
          boxShadow: isDark ? '0 0 10px rgba(165, 180, 252, 0.3)' : '0 0 8px rgba(79, 70, 229, 0.2)',
        }}
      />

      {actionLink && actionText && (
        <MotionTypography
          variants={itemVariants}
          variant="body1"
          sx={{
            fontWeight: 600,
            color: isDark ? 'grey.400' : 'grey.600',
            mt: 2,
            letterSpacing: '0.2px',
          }}
        >
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
        </MotionTypography>
      )}
    </MotionBox>
  );
};

export default EnhancedPageTitle;
