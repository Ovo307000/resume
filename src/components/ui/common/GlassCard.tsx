import React from 'react';
import { Box, Paper, SxProps, Theme, alpha } from '@mui/material';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import GlassyBlobBackground from '../backgrounds/GlassyBlobBackground';

export interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'simple';
  colorSet?: 'default' | 'primary' | 'rainbow' | 'cool' | 'warm';
  intensity?: 'light' | 'medium' | 'strong';
  hoverEffect?: boolean;
  animate?: boolean;
  motionProps?: MotionProps;
  sx?: SxProps<Theme>;
  backgroundProps?: {
    blobCount?: number;
    minSize?: number;
    maxSize?: number;
    blurAmount?: number;
  };
  noBackground?: boolean;
}

/**
 * 统一的玻璃卡片组件
 * 为全站提供统一的玻璃卡片样式，可通过属性配置细节样式
 */
const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  colorSet = 'default',
  intensity = 'light',
  hoverEffect = false,
  animate = true,
  motionProps,
  sx = {},
  backgroundProps = {},
  noBackground = false
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 根据variant生成卡片的样式
  const getCardStyle = () => {
    const baseStyle = {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '16px',
      p: 3,
      height: '100%',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)', // 兼容Safari
      backgroundColor: 'transparent',
      transition: 'all 0.3s ease',
    };

    const variantStyles = {
      default: {
        boxShadow: isDark
          ? '0 10px 30px rgba(0, 0, 0, 0.2)'
          : '0 10px 30px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${isDark ? alpha('#fff', 0.1) : alpha('#000', 0.05)}`
      },
      elevated: {
        boxShadow: isDark
          ? '0 20px 40px rgba(0, 0, 0, 0.3)'
          : '0 20px 40px rgba(0, 0, 0, 0.15)',
        border: `1px solid ${isDark ? alpha('#fff', 0.12) : alpha('#000', 0.07)}`
      },
      outlined: {
        boxShadow: 'none',
        border: `2px solid ${isDark ? alpha('#fff', 0.15) : alpha('#000', 0.08)}`
      },
      simple: {
        boxShadow: 'none',
        border: 'none',
        p: 0,
      }
    };

    // 悬停效果
    const hoverStyles = hoverEffect ? {
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: isDark
          ? '0 25px 50px rgba(0, 0, 0, 0.4)'
          : '0 25px 50px rgba(0, 0, 0, 0.2)',
        border: `1px solid ${isDark ? alpha('#fff', 0.2) : alpha('#6366F1', 0.2)}`
      }
    } : {};

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...hoverStyles,
    };
  };

  // 动画变体
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5
      }
    }
  };

  // 背景默认配置
  const defaultBackgroundProps = {
    blobCount: 4,
    minSize: 150,
    maxSize: 350,
    blurAmount: 60,
  };

  // 合并背景配置
  const finalBackgroundProps = {
    ...defaultBackgroundProps,
    ...backgroundProps,
  };

  // 渲染内容
  const renderContent = () => (
    <Paper elevation={0} sx={{ ...getCardStyle(), ...sx }}>
      {!noBackground && (
        <GlassyBlobBackground
          intensity={intensity}
          colorSet={colorSet}
          blobCount={finalBackgroundProps.blobCount}
          animate={animate}
          minSize={finalBackgroundProps.minSize}
          maxSize={finalBackgroundProps.maxSize}
          blurAmount={finalBackgroundProps.blurAmount}
          containerSx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />
      )}
      <Box sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </Box>
    </Paper>
  );

  // 根据是否有动画属性决定渲染方式
  if (motionProps) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        {...motionProps}
      >
        {renderContent()}
      </motion.div>
    );
  }

  return renderContent();
};

export default GlassCard;
