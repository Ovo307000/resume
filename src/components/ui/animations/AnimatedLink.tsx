import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink, Box, SxProps } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface AnimatedLinkProps {
  to: string;
  children: React.ReactNode;
  external?: boolean;
  color?: string;
  sx?: SxProps;
  underlineColor?: string;
  underlineHeight?: number;
  underlineWidth?: string;
  hoverScale?: number;
  fontWeight?: number | string;
  onClick?: () => void;
}

/**
 * 带动画效果的链接组件
 * 支持内部路由和外部链接，提供自定义动画和样式选项
 */
const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  to,
  children,
  external = false,
  color,
  sx = {},
  underlineColor,
  underlineHeight = 2,
  underlineWidth = '100%',
  hoverScale = 1.05,
  fontWeight = 'normal',
  onClick
}) => {
  const { theme } = useTheme();

  // 链接动画变体
  const linkVariants = {
    initial: {
      scale: 1
    },
    hover: {
      scale: hoverScale,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  // 下划线动画变体
  const underlineVariants = {
    initial: {
      width: 0,
      left: '50%',
      x: '-50%'
    },
    hover: {
      width: underlineWidth,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  // 确定下划线颜色
  const lineColor = underlineColor || (theme === 'dark' ? '#6366F1' : '#4F46E5');

  // 渲染链接
  const renderLink = () => {
    const linkContent = (
      <motion.div
        variants={linkVariants}
        initial="initial"
        whileHover="hover"
        style={{ display: 'inline-block', position: 'relative' }}
      >
        <Box
          component="span"
          sx={{
            fontWeight,
            color: color || (theme === 'dark' ? 'primary.light' : 'primary.main'),
            position: 'relative',
            ...sx
          }}
        >
          {children}

          {/* 动画下划线 */}
          <motion.div
            variants={underlineVariants}
            style={{
              position: 'absolute',
              bottom: -4,
              left: '50%',
              height: underlineHeight,
              backgroundColor: lineColor,
              borderRadius: underlineHeight / 2,
              transformOrigin: 'center'
            }}
          />
        </Box>
      </motion.div>
    );

    if (external) {
      return (
        <MuiLink
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          onClick={onClick}
          sx={{ display: 'inline-block' }}
        >
          {linkContent}
        </MuiLink>
      );
    }

    return (
      <RouterLink to={to} style={{ textDecoration: 'none' }} onClick={onClick}>
        {linkContent}
      </RouterLink>
    );
  };

  return renderLink();
};

export default AnimatedLink;
