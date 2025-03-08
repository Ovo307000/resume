import React from 'react';
import { Box, alpha, SxProps, useTheme as useMuiTheme } from '@mui/material';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

export interface GlassPanelProps {
  children: React.ReactNode;
  blur?: number;
  opacity?: number;
  borderRadius?: number | string;
  borderWidth?: number;
  hasBorder?: boolean;
  hasShadow?: boolean;
  shadowIntensity?: 'light' | 'medium' | 'strong';
  hoverEffect?: boolean;
  motionProps?: MotionProps;
  sx?: SxProps;
  width?: string | number | Record<string, string | number>;
  height?: string | number | Record<string, string | number>;
  glow?: boolean;
  glowColor?: string;
  glowIntensity?: number;
}

/**
 * 毛玻璃面板组件
 * 用于创建现代化、优雅的毛玻璃效果容器
 */
const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  blur = 8,
  opacity = 0.7,
  borderRadius = 24,
  borderWidth = 1,
  hasBorder = true,
  hasShadow = true,
  shadowIntensity = 'medium',
  hoverEffect = false,
  motionProps,
  sx = {},
  width,
  height,
  glow = false,
  glowColor = '#6366F1',
  glowIntensity = 0.3
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';

  // 生成阴影样式
  const getShadowStyle = () => {
    if (!hasShadow) return {};

    const shadowOpacity = {
      light: isDark ? 0.2 : 0.06,
      medium: isDark ? 0.3 : 0.1,
      strong: isDark ? 0.4 : 0.15
    };

    return {
      boxShadow: `0 8px 32px ${alpha('#000', shadowOpacity[shadowIntensity])}`
    };
  };

  // 生成悬停效果
  const getHoverStyles = () => {
    if (!hoverEffect) return {};

    return {
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: `0 14px 40px ${alpha('#000', isDark ? 0.4 : 0.15)}`,
        borderColor: isDark
          ? alpha(muiTheme.palette.primary.main, 0.3)
          : alpha(muiTheme.palette.primary.main, 0.2),
      }
    };
  };

  // 生成辉光效果
  const getGlowStyle = () => {
    if (!glow) return {};

    return {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: -10,
        left: -10,
        right: -10,
        bottom: -10,
        zIndex: -1,
        background: glowColor,
        borderRadius: typeof borderRadius === 'number' ? borderRadius + 10 : borderRadius,
        opacity: glowIntensity,
        filter: 'blur(20px)',
      }
    };
  };

  // 基础面板样式
  const panelStyles = {
    position: 'relative',
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(
      isDark ? '#1A1A1A' : '#FFFFFF',
      opacity
    ),
    borderRadius,
    border: hasBorder ? `${borderWidth}px solid ${
      alpha(
        isDark ? '#FFFFFF' : '#000000',
        isDark ? 0.1 : 0.05
      )
    }` : 'none',
    padding: '24px',
    width,
    height,
    ...getShadowStyle(),
    ...getHoverStyles(),
    ...getGlowStyle(),
    ...sx
  };

  if (motionProps) {
    return (
      <motion.div
        {...motionProps}
        style={{
          ...panelStyles,
          ...(motionProps.style || {})
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Box sx={panelStyles}>
      {children}
    </Box>
  );
};

export default GlassPanel;
