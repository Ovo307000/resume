import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface LogoAvatarProps {
  size?: 'small' | 'medium' | 'large';
  imageSrc?: string;
  alt?: string;
  animate?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * Logo头像组件
 * 在导航栏显示logo头像，支持动画效果
 */
const LogoAvatar: React.FC<LogoAvatarProps> = ({
  size = 'medium',
  imageSrc = '/profile_avatar.png',
  alt = 'Logo',
  animate = true,
  sx = {},
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 计算头像尺寸
  const getSizeValue = () => {
    switch (size) {
      case 'small':
        return { width: 32, height: 32 };
      case 'large':
        return { width: 40, height: 40 };
      default:
        return { width: 36, height: 36 };
    }
  };

  // 动画变体
  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 200
      }
    },
    hover: animate ? {
      scale: 1.05,
      transition: { duration: 0.3 }
    } : {},
    tap: animate ? {
      scale: 0.95,
      transition: { duration: 0.2 }
    } : {}
  };

  // Logo头像内容
  const logoContent = (
    <Link
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        ...(typeof sx === 'object' ? sx : {})
      }}
    >
      <Box
        sx={{
          position: 'relative',
          ...getSizeValue(),
          borderRadius: '50%',
          padding: '2px',
          overflow: 'hidden',
          "&::before": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            background: 'linear-gradient(90deg, #6366F1, #3B82F6, #EC4899)',
            backgroundSize: '200% 200%',
            animation: 'rgbGlow 3s ease infinite',
            zIndex: -1,
            opacity: 0.7,
          },
          "&:hover::before": {
            opacity: 1,
          }
        }}
      >
        <img
          src={imageSrc}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            background: isDark ? '#121212' : '#ffffff',
            transition: 'all 0.3s ease'
          }}
        />
      </Box>
    </Link>
  );

  // 如果不需要动画，直接返回Logo内容
  if (!animate) {
    return logoContent;
  }

  // 带有动画效果的Logo
  return (
    <motion.div
      initial="hidden"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      variants={logoVariants}
    >
      {logoContent}
    </motion.div>
  );
};

export default LogoAvatar;
