import React, { ReactNode } from 'react';
import { Box, alpha, Paper, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

// 颜色集合类型
export type ColorSet = 'default' | 'primary' | 'secondary' | 'rainbow' | 'cool' | 'warm';

interface ModernCardProps {
  children: ReactNode;
  colorSet?: ColorSet;
  borderRadius?: string | number;
  elevation?: number;
  hoverEffect?: boolean;
  motionProps?: any;
  className?: string;
  sx?: any;
}

/**
 * 现代卡片组件
 * 提供具有动画效果和不同颜色的卡片
 */
const ModernCard: React.FC<ModernCardProps> = ({
  children,
  colorSet = 'default',
  borderRadius = '16px',
  elevation = 0,
  hoverEffect = true,
  motionProps = {},
  className,
  sx = {}
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 根据颜色集合和主题获取背景样式
  const getBackgroundStyles = () => {
    const isDark = theme === 'dark';

    // 基础背景颜色
    const baseBg = isDark
      ? alpha(muiTheme.palette.background.paper, 0.8)
      : muiTheme.palette.background.paper;

    // 各种颜色模式的样式
    const colorStyles = {
      default: {
        background: baseBg,
        border: `1px solid ${alpha(muiTheme.palette.divider, 0.1)}`,
        boxShadow: isDark
          ? `0 8px 32px ${alpha('#000', 0.2)}`
          : `0 8px 32px ${alpha('#718096', 0.1)}`
      },
      primary: {
        background: `linear-gradient(145deg, ${baseBg}, ${baseBg})`,
        borderTop: `1px solid ${alpha(muiTheme.palette.primary.main, 0.2)}`,
        borderLeft: `1px solid ${alpha(muiTheme.palette.primary.main, 0.1)}`,
        borderRight: `1px solid ${alpha(muiTheme.palette.primary.main, 0.05)}`,
        borderBottom: `1px solid ${alpha(muiTheme.palette.primary.main, 0.05)}`,
        boxShadow: isDark
          ? `0 8px 32px ${alpha(muiTheme.palette.primary.main, 0.2)}`
          : `0 8px 32px ${alpha(muiTheme.palette.primary.main, 0.1)}`
      },
      secondary: {
        background: `linear-gradient(145deg, ${baseBg}, ${baseBg})`,
        borderTop: `1px solid ${alpha(muiTheme.palette.secondary.main, 0.2)}`,
        borderLeft: `1px solid ${alpha(muiTheme.palette.secondary.main, 0.1)}`,
        borderRight: `1px solid ${alpha(muiTheme.palette.secondary.main, 0.05)}`,
        borderBottom: `1px solid ${alpha(muiTheme.palette.secondary.main, 0.05)}`,
        boxShadow: isDark
          ? `0 8px 32px ${alpha(muiTheme.palette.secondary.main, 0.2)}`
          : `0 8px 32px ${alpha(muiTheme.palette.secondary.main, 0.1)}`
      },
      rainbow: {
        background: baseBg,
        boxShadow: `0 8px 32px ${alpha('#000', 0.15)}`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius,
          padding: '2px',
          background: 'linear-gradient(45deg, #f56565, #ed64a6, #f687b3, #b794f4, #9f7aea, #667eea, #4c51bf, #4299e1, #38b2ac, #48bb78)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
          '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          'mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          zIndex: 0,
        }
      },
      cool: {
        background: `linear-gradient(145deg, ${baseBg}, ${baseBg})`,
        borderTop: `1px solid ${alpha('#3182ce', 0.2)}`,
        borderLeft: `1px solid ${alpha('#3182ce', 0.1)}`,
        borderRight: `1px solid ${alpha('#3182ce', 0.05)}`,
        borderBottom: `1px solid ${alpha('#3182ce', 0.05)}`,
        boxShadow: isDark
          ? `0 8px 32px ${alpha('#3182ce', 0.2)}`
          : `0 8px 32px ${alpha('#3182ce', 0.1)}`
      },
      warm: {
        background: `linear-gradient(145deg, ${baseBg}, ${baseBg})`,
        borderTop: `1px solid ${alpha('#ed8936', 0.2)}`,
        borderLeft: `1px solid ${alpha('#ed8936', 0.1)}`,
        borderRight: `1px solid ${alpha('#ed8936', 0.05)}`,
        borderBottom: `1px solid ${alpha('#ed8936', 0.05)}`,
        boxShadow: isDark
          ? `0 8px 32px ${alpha('#ed8936', 0.2)}`
          : `0 8px 32px ${alpha('#ed8936', 0.1)}`
      }
    };

    return colorStyles[colorSet];
  };

  // 获取悬停效果样式
  const getHoverStyles = () => {
    if (!hoverEffect) return {};

    return {
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme === 'dark'
          ? `0 20px 40px ${alpha('#000', 0.3)}`
          : `0 20px 40px ${alpha('#718096', 0.15)}`
      }
    };
  };

  // 合并所有样式
  const cardStyles = {
    position: 'relative',
    borderRadius,
    height: '100%',
    overflow: 'hidden',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '24px',
    transition: 'all 0.3s ease',
    ...getBackgroundStyles(),
    ...getHoverStyles(),
    ...sx
  };

  return (
    <motion.div {...motionProps} className={className}>
      <Paper
        elevation={elevation}
        sx={cardStyles}
      >
        {children}
      </Paper>
    </motion.div>
  );
};

export default ModernCard;
