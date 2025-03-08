import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';

interface GlassPanelProps extends BoxProps {
  intensity?: 'light' | 'medium' | 'heavy';
  variant?: 'default' | 'elevated' | 'sunken' | 'flat';
  hoverEffect?: boolean;
}

/**
 * 毛玻璃效果面板组件
 * 提供磨砂玻璃效果的容器，可用于卡片、面板等UI元素
 */
const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  intensity = 'medium',
  variant = 'default',
  hoverEffect = false,
  sx,
  ...rest
}) => {
  const { theme } = useTheme();

  // 根据深浅主题和强度定义背景色和模糊度
  const getBackgroundStyles = () => {
    // 背景颜色透明度
    const alphaMap = {
      light: theme === 'dark' ? 0.15 : 0.1,
      medium: theme === 'dark' ? 0.25 : 0.2,
      heavy: theme === 'dark' ? 0.35 : 0.3,
    };

    // 背景模糊度
    const blurMap = {
      light: '5px',
      medium: '10px',
      heavy: '15px',
    };

    // 边框不透明度
    const borderAlphaMap = {
      light: theme === 'dark' ? 0.05 : 0.04,
      medium: theme === 'dark' ? 0.08 : 0.06,
      heavy: theme === 'dark' ? 0.12 : 0.08,
    };

    return {
      backgroundColor: theme === 'dark'
        ? `rgba(18, 18, 30, ${alphaMap[intensity]})`
        : `rgba(255, 255, 255, ${alphaMap[intensity]})`,
      backdropFilter: `blur(${blurMap[intensity]})`,
      border: variant !== 'flat'
        ? `1px solid ${theme === 'dark'
            ? `rgba(255, 255, 255, ${borderAlphaMap[intensity]})`
            : `rgba(0, 0, 0, ${borderAlphaMap[intensity]})`}`
        : 'none',
    };
  };

  // 根据变体定义阴影和其他效果
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          boxShadow: theme === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        };
      case 'sunken':
        return {
          boxShadow: theme === 'dark'
            ? 'inset 0 2px 8px rgba(0, 0, 0, 0.3)'
            : 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
        };
      case 'flat':
        return {
          boxShadow: 'none',
        };
      default:
        return {
          boxShadow: theme === 'dark'
            ? '0 4px 16px rgba(0, 0, 0, 0.2)'
            : '0 4px 16px rgba(0, 0, 0, 0.05)',
        };
    }
  };

  // 悬停效果
  const getHoverStyles = () => {
    if (!hoverEffect) return {};

    return {
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme === 'dark'
          ? '0 12px 40px rgba(0, 0, 0, 0.4)'
          : '0 12px 40px rgba(0, 0, 0, 0.15)',
      }
    };
  };

  const backgroundStyles = getBackgroundStyles();
  const variantStyles = getVariantStyles();
  const hoverStyles = getHoverStyles();

  return (
    <Box
      sx={{
        borderRadius: '16px',
        ...backgroundStyles,
        ...variantStyles,
        ...hoverStyles,
        ...sx
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default GlassPanel;
