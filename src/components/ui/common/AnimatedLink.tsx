import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiExternalLink } from 'react-icons/fi';

interface AnimatedLinkProps {
  to: string;
  children: React.ReactNode;
  variant?: 'default' | 'button' | 'underline' | 'pill';
  color?: string;
  fontSize?: string | number;
  showExternalIcon?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  sx?: any;
  onClick?: () => void;
}

/**
 * 动画超链接组件
 * 提供优雅的动画效果，支持内部和外部链接
 */
const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  to,
  children,
  variant = 'default',
  color,
  fontSize,
  showExternalIcon = true,
  textAlign = 'left',
  sx = {},
  onClick
}) => {
  const { theme } = useTheme();
  const isExternal = to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:');

  // 确定链接颜色
  const linkColor = color || (theme === 'dark' ? '#a0a0ff' : '#5050ff');

  // 各种链接变体的样式
  const linkStyles = {
    default: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      color: linkColor,
      textDecoration: 'none',
      fontSize: fontSize || 'inherit',
      textAlign,
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '0%',
        height: '2px',
        bottom: '-2px',
        left: '0',
        backgroundColor: linkColor,
        transition: 'width 0.3s ease',
      },
      '&:hover::after': {
        width: '100%',
      },
      ...sx
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 16px',
      color: theme === 'dark' ? '#fff' : '#fff',
      backgroundColor: linkColor,
      borderRadius: '4px',
      textDecoration: 'none',
      fontSize: fontSize || 'inherit',
      transition: 'all 0.3s ease',
      textAlign,
      '&:hover': {
        backgroundColor: theme === 'dark'
          ? `${linkColor}dd`
          : `${linkColor}dd`,
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      },
      ...sx
    },
    underline: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      color: linkColor,
      textDecoration: 'none',
      fontSize: fontSize || 'inherit',
      textAlign,
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        transform: 'scaleX(0)',
        height: '2px',
        bottom: '-2px',
        left: '0',
        backgroundColor: linkColor,
        transformOrigin: 'bottom right',
        transition: 'transform 0.3s ease-out'
      },
      '&:hover::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left'
      },
      ...sx
    },
    pill: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px 16px',
      color: linkColor,
      backgroundColor: theme === 'dark' ? 'rgba(160, 160, 255, 0.1)' : 'rgba(80, 80, 255, 0.1)',
      border: `1px solid ${linkColor}33`,
      borderRadius: '50px',
      textDecoration: 'none',
      fontSize: fontSize || 'inherit',
      transition: 'all 0.3s ease',
      textAlign,
      '&:hover': {
        backgroundColor: theme === 'dark' ? 'rgba(160, 160, 255, 0.2)' : 'rgba(80, 80, 255, 0.2)',
        transform: 'translateY(-2px)',
        boxShadow: `0 4px 12px ${linkColor}33`
      },
      ...sx
    }
  };

  // 动画变体
  const linkVariants = {
    initial: {
      opacity: 0.9,
      y: 0
    },
    hover: {
      opacity: 1,
      y: variant === 'default' || variant === 'underline' ? -1 : -2,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    tap: {
      scale: 0.98,
      opacity: 0.8,
      transition: {
        duration: 0.1,
        ease: 'easeIn'
      }
    }
  };

  // 外部链接图标动画
  const iconVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      x: -4
    },
    hover: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  };

  // 内容渲染
  const content = (
    <motion.span
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={linkVariants}
      style={{ display: 'inline-flex', alignItems: 'center' }}
      onClick={onClick}
    >
      <Typography
        component="span"
        sx={{
          fontSize: 'inherit',
          display: 'inline-flex',
          alignItems: 'center'
        }}
      >
        {children}

        {isExternal && showExternalIcon && (
          <motion.span
            variants={iconVariants}
            style={{
              marginLeft: '4px',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <FiExternalLink size={14} />
          </motion.span>
        )}
      </Typography>
    </motion.span>
  );

  // 根据链接类型渲染不同的组件
  if (isExternal) {
    return (
      <Box
        component="a"
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        sx={linkStyles[variant]}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      component={RouterLink}
      to={to}
      sx={linkStyles[variant]}
    >
      {content}
    </Box>
  );
};

export default AnimatedLink;
