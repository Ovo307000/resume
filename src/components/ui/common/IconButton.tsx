import React from 'react';
import { Box, IconButton as MuiIconButton, alpha, SxProps, Theme } from '@mui/material';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import CustomTooltip from './CustomTooltip';

export interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  tooltipText?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  active?: boolean;
  motionProps?: MotionProps;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * 统一的图标按钮组件
 * 用于主题切换、语言选择和展开按钮等
 * 提供一致的样式和动画效果
 */
const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  tooltipText,
  size = 'medium',
  color,
  active = false,
  motionProps,
  sx = {},
  disabled = false,
  ariaLabel,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 根据size属性计算尺寸
  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          button: { width: 36, height: 36, borderRadius: '10px' },
          iconSize: 18
        };
      case 'large':
        return {
          button: { width: 48, height: 48, borderRadius: '14px' },
          iconSize: 24
        };
      default:
        return {
          button: { width: 42, height: 42, borderRadius: '12px' },
          iconSize: 22
        };
    }
  };

  const sizes = getSize();

  // 获取按钮样式
  const getButtonStyle = () => {
    // 获取尺寸
    const sizes = getSize();

    // 基础样式
    const baseStyle = {
      backgroundColor: isDark
        ? alpha('#FFFFFF', 0.05)
        : alpha('#000000', 0.03),
      border: isDark
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.05)',
      boxShadow: isDark
        ? '0 4px 12px rgba(0, 0, 0, 0.4)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: sizes.button.borderRadius,
    };

    // 悬停效果
    const hoverStyle = {
      '&:hover': {
        backgroundColor: isDark
          ? alpha('#FFFFFF', 0.1)
          : alpha('#000000', 0.05),
        boxShadow: isDark
          ? '0 6px 16px rgba(0, 0, 0, 0.5)'
          : '0 4px 12px rgba(0, 0, 0, 0.15)',
      }
    };

    // 禁用效果
    const disabledStyle = disabled
      ? {
          opacity: 0.5,
          cursor: 'not-allowed',
          '&:hover': {
            transform: 'none',
            boxShadow: baseStyle.boxShadow,
            backgroundColor: baseStyle.backgroundColor
          }
        }
      : {};

    return {
      ...sizes.button,
      ...baseStyle,
      ...hoverStyle,
      ...disabledStyle,
      transition: 'all 0.3s ease',
      color: color || (active ? '#6366F1' : (isDark ? '#FFFFFF' : '#333333')),
      ...(typeof sx === 'object' ? sx : {})
    };
  };

  // 动画变体
  const buttonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    tap: { scale: 0.9, transition: { duration: 0.1 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  // 渲染按钮
  const renderButton = () => (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      variants={buttonVariants}
      {...motionProps}
    >
      <MuiIconButton
        onClick={disabled ? undefined : onClick}
        aria-label={ariaLabel || tooltipText}
        disabled={disabled}
        sx={getButtonStyle()}
      >
        {icon}
      </MuiIconButton>
    </motion.div>
  );

  // 如果有提示文字，则添加提示框
  if (tooltipText) {
    return (
      <CustomTooltip title={tooltipText} arrow placement="bottom">
        <Box>
          {renderButton()}
        </Box>
      </CustomTooltip>
    );
  }

  return renderButton();
};

export default IconButton;
