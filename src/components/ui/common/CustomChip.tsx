import React from 'react';
import { Chip, ChipProps, alpha, SxProps, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

export interface CustomChipProps extends Omit<ChipProps, 'onClick'> {
  label: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | string;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium';
  url?: string;
  tooltip?: string;
  animate?: boolean;
  borderRadius?: number | string;
  customBgColor?: string;
  customTextColor?: string;
  customSx?: SxProps;
  interactive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * 统一的标签组件
 * 支持各种自定义样式、动画效果和链接功能
 */
const CustomChip: React.FC<CustomChipProps> = ({
  label,
  icon,
  color = 'primary',
  variant = 'filled',
  size = 'small',
  url,
  tooltip,
  animate = true,
  borderRadius = '16px',
  customBgColor,
  customTextColor,
  customSx = {},
  interactive = true,
  onClick,
  ...props
}) => {
  const { theme: appTheme } = useTheme();

  // 处理点击事件
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // 确定背景色和文字色
  const getBgColor = () => {
    if (customBgColor) return customBgColor;

    // 预定义颜色的透明度处理
    const isCustomColor = !['primary', 'secondary', 'success', 'error', 'info', 'warning'].includes(color);

    if (variant === 'outlined') {
      return 'transparent';
    } else if (isCustomColor) {
      return appTheme === 'dark' ? alpha(color, 0.2) : alpha(color, 0.1);
    }

    return undefined; // 使用MUI默认颜色
  };

  const getTextColor = () => {
    if (customTextColor) return customTextColor;

    const isCustomColor = !['primary', 'secondary', 'success', 'error', 'info', 'warning'].includes(color);

    if (isCustomColor) {
      return color;
    }

    return undefined; // 使用MUI默认颜色
  };

  // 构建chip组件
  const chipComponent = (
    <motion.div
      whileHover={animate && interactive ? { scale: 1.05, y: -2 } : {}}
      whileTap={animate && interactive ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Chip
        label={label}
        icon={icon}
        color={['primary', 'secondary', 'success', 'error', 'info', 'warning'].includes(color) ? (color as ChipProps['color']) : undefined}
        variant={variant as ChipProps['variant']}
        size={size}
        onClick={handleClick}
        sx={{
          borderRadius,
          bgcolor: getBgColor(),
          color: getTextColor(),
          borderColor: variant === 'outlined' ? getTextColor() : undefined,
          fontWeight: 'medium',
          cursor: (url || onClick) ? 'pointer' : 'default',
          '&:hover': {
            bgcolor: (url || onClick) && variant !== 'outlined' ?
              (appTheme === 'dark' ? alpha(color, 0.3) : alpha(color, 0.2)) :
              getBgColor(),
            boxShadow: (url || onClick) ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
          },
          '& .MuiChip-icon': {
            color: 'inherit',
          },
          ...customSx
        }}
        {...props}
      />
    </motion.div>
  );

  // 如有提示文本则包装在Tooltip中
  if (tooltip) {
    return (
      <Tooltip title={tooltip} arrow placement="top">
        {chipComponent}
      </Tooltip>
    );
  }

  return chipComponent;
};

export default CustomChip;
