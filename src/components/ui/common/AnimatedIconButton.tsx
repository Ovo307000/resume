import React from 'react';
import { motion } from 'framer-motion';
import { Box, IconButton as MuiIconButton, Tooltip, alpha, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';

interface AnimatedIconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  tooltipText?: string;
  ariaLabel?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'glass' | 'solid' | 'outlined';
  style?: 'circle' | 'rounded';
  color?: 'primary' | 'secondary' | 'default' | 'inherit';
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  active?: boolean;
  disabled?: boolean;
  className?: string;
  sx?: any;
}

/**
 * 统一设计的动画图标按钮组件
 * 提供流畅的过渡效果和多种样式选项
 */
const AnimatedIconButton: React.FC<AnimatedIconButtonProps> = ({
  icon,
  onClick,
  tooltipText,
  ariaLabel,
  size = 'medium',
  variant = 'default',
  style = 'circle',
  color = 'default',
  tooltipPlacement = 'bottom',
  active = false,
  disabled = false,
  className,
  sx,
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';

  // 尺寸映射
  const sizeMap = {
    small: {
      buttonSize: 40,
      iconSize: 20,
      padding: 1,
    },
    medium: {
      buttonSize: 44,
      iconSize: 20,
      padding: 1.2,
    },
    large: {
      buttonSize: 52,
      iconSize: 24,
      padding: 1.4,
    },
  };

  // 颜色映射
  const getColorStyles = (variant: string, colorType: string) => {
    const colors = {
      primary: {
        main: muiTheme.palette.primary.main,
        light: muiTheme.palette.primary.light,
        dark: muiTheme.palette.primary.dark,
      },
      secondary: {
        main: muiTheme.palette.secondary.main,
        light: muiTheme.palette.secondary.light,
        dark: muiTheme.palette.secondary.dark,
      },
      default: {
        main: isDark ? '#ffffff' : '#000000',
        light: isDark ? alpha('#ffffff', 0.8) : alpha('#000000', 0.8),
        dark: isDark ? alpha('#ffffff', 0.6) : alpha('#000000', 0.6),
      },
      inherit: {
        main: 'inherit',
        light: 'inherit',
        dark: 'inherit',
      },
    };

    const selectedColor = colors[colorType as keyof typeof colors];

    switch (variant) {
      case 'glass':
        return {
          background: alpha(selectedColor.main, isDark ? 0.15 : 0.08),
          color: selectedColor.main,
          hoverBg: alpha(selectedColor.main, isDark ? 0.25 : 0.12),
          hoverShadow: `0 4px 12px ${alpha(selectedColor.main, isDark ? 0.25 : 0.15)}`,
          activeBg: alpha(selectedColor.main, isDark ? 0.3 : 0.18),
          border: `1px solid ${alpha(selectedColor.main, isDark ? 0.15 : 0.1)}`,
        };
      case 'solid':
        return {
          background: selectedColor.main,
          color: muiTheme.palette.getContrastText(selectedColor.main),
          hoverBg: selectedColor.light,
          hoverShadow: `0 6px 16px ${alpha(selectedColor.main, 0.4)}`,
          activeBg: selectedColor.dark,
          border: 'none',
        };
      case 'outlined':
        return {
          background: 'transparent',
          color: selectedColor.main,
          hoverBg: alpha(selectedColor.main, 0.08),
          hoverShadow: `0 2px 8px ${alpha(selectedColor.main, 0.2)}`,
          activeBg: alpha(selectedColor.main, 0.12),
          border: `1px solid ${alpha(selectedColor.main, 0.5)}`,
        };
      default: // default variant
        return {
          background: isDark ? alpha('#ffffff', 0.08) : alpha('#000000', 0.05),
          color: isDark ? '#ffffff' : '#000000',
          hoverBg: isDark ? alpha('#ffffff', 0.12) : alpha('#000000', 0.08),
          hoverShadow: isDark ? '0 4px 12px rgba(0,0,0,0.25)' : '0 4px 12px rgba(0,0,0,0.1)',
          activeBg: isDark ? alpha('#ffffff', 0.15) : alpha('#000000', 0.1),
          border: isDark ? `1px solid ${alpha('#ffffff', 0.1)}` : `1px solid ${alpha('#000000', 0.05)}`,
        };
    }
  };

  const colorStyles = getColorStyles(variant, color);
  const selectedSize = sizeMap[size];
  const borderRadius = style === 'circle' ? '50%' : '12px';

  // 动画变体
  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
    },
    hover: {
      scale: 1.05,
      boxShadow: colorStyles.hoverShadow,
    },
    tap: {
      scale: 0.95,
    },
    disabled: {
      opacity: 0.5,
      scale: 1,
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
    },
  };

  // 图标动画
  const iconVariants = {
    idle: {
      scale: 1,
      rotate: 0
    },
    hover: {
      scale: 1.1,
      rotate: active ? [0, -10, 10, 0] : 0,
      transition: {
        rotate: active ? {
          repeat: 0,
          duration: 0.5
        } : {}
      }
    },
    tap: {
      scale: 0.9
    }
  };

  // 激活状态的额外样式
  const activeStyles = active ? {
    background: active ? alpha(colorStyles.hoverBg, 1.2) : colorStyles.background,
    transform: active ? 'translateY(-2px)' : 'none',
    boxShadow: active ? colorStyles.hoverShadow : 'none',
  } : {};

  const buttonContent = (
    <Box
      component={motion.div}
      initial="idle"
      whileHover={disabled ? "disabled" : "hover"}
      whileTap={disabled ? "disabled" : "tap"}
      variants={buttonVariants}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 15
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: selectedSize.buttonSize,
        height: selectedSize.buttonSize,
        borderRadius,
        background: colorStyles.background,
        color: colorStyles.color,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: selectedSize.padding,
        border: colorStyles.border,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        overflow: 'hidden',
        ...activeStyles,
        ...sx,
        '&::before': active ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at center, ${alpha(colorStyles.color, 0.1)}, transparent 70%)`,
          borderRadius: 'inherit',
          zIndex: 0,
        } : {},
      }}
    >
      <Box
        component={motion.div}
        variants={iconVariants}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 15
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          '& > *': {
            fontSize: selectedSize.iconSize,
          }
        }}
      >
        {icon}
      </Box>

      {/* 波纹效果 */}
      {active && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1.5 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'mirror' }}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            background: `radial-gradient(circle, transparent 40%, ${alpha(colorStyles.color, 0.1)} 70%, transparent 100%)`,
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );

  // 如果没有工具提示文本，直接返回按钮
  if (!tooltipText) {
    return (
      <Box
        component="button"
        onClick={onClick}
        aria-label={ariaLabel}
        disabled={disabled}
        className={className}
        sx={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          padding: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:disabled': {
            cursor: 'not-allowed',
          },
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        {buttonContent}
      </Box>
    );
  }

  // 带有工具提示的按钮
  return (
    <Tooltip
      title={tooltipText}
      placement={tooltipPlacement}
      arrow
      enterDelay={500}
      leaveDelay={200}
    >
      <Box
        component="button"
        onClick={onClick}
        aria-label={ariaLabel}
        disabled={disabled}
        className={className}
        sx={{
          border: 'none',
          background: 'transparent',
          cursor: disabled ? 'not-allowed' : 'pointer',
          padding: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:disabled': {
            cursor: 'not-allowed',
          },
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        {buttonContent}
      </Box>
    </Tooltip>
  );
};

export default AnimatedIconButton;
