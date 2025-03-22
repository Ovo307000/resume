import React from 'react';
import { Chip, ChipProps, alpha, SxProps, Tooltip, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

// 定义ChipProps的color类型
type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

export interface CustomChipProps extends Omit<ChipProps, 'onClick' | 'color' | 'icon'> {
  label: string;
  icon?: React.ReactNode;
  color?: ChipColor | string;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium';
  url?: string;
  tooltip?: string;
  animate?: boolean;
  customBgColor?: string;
  customTextColor?: string;
  customSx?: SxProps<Theme>;
  interactive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  borderRadius?: string;
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
  customBgColor,
  customTextColor,
  customSx = {},
  interactive = true,
  onClick,
  // 从props中提取borderRadius，防止它被传递给DOM元素
  borderRadius,
  ...props
}) => {
  // 使用解构但不使用变量，避免未使用警告
  const { theme: _ } = useTheme();

  // 处理点击事件
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // 检查是否是标准的MUI颜色
  const isStandardColor = (color: string): boolean => {
    return ['default', 'primary', 'secondary', 'success', 'error', 'info', 'warning'].includes(color);
  };

  // 根据variant计算默认样式
  const getDefaultSx = (): SxProps<Theme> => {
    const isCustomColor = !isStandardColor(color);

    if (variant === 'filled') {
      return {
        backgroundColor: customBgColor || (isCustomColor ? alpha(color, 0.1) : undefined),
        color: customTextColor || (isCustomColor ? color : undefined),
        border: isCustomColor ? `1px solid ${alpha(color, 0.2)}` : undefined,
        '&:hover': interactive ? {
          backgroundColor: isCustomColor ?
            (customBgColor ? alpha(color, 0.15) : alpha(color, 0.2)) :
            undefined,
          boxShadow: isCustomColor ? `0 2px 8px ${alpha(color, 0.2)}` : undefined
        } : {},
        overflow: 'hidden', // 确保文本不溢出
        maxWidth: '100%', // 限制最大宽度
        '& .MuiChip-label': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          padding: '0 8px' // 确保有足够的水平内边距
        },
        // 将borderRadius应用到样式而不是作为DOM属性
        borderRadius: borderRadius,
      };
    } else {
      return {
        backgroundColor: 'transparent',
        color: customTextColor || (isCustomColor ? color : undefined),
        border: isCustomColor ? `1px solid ${alpha(color, 0.5)}` : undefined,
        '&:hover': interactive ? {
          backgroundColor: isCustomColor ? alpha(color, 0.1) : undefined,
          boxShadow: isCustomColor ? `0 2px 8px ${alpha(color, 0.15)}` : undefined
        } : {},
        overflow: 'hidden',
        maxWidth: '100%',
        '& .MuiChip-label': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          padding: '0 8px'
        },
        // 将borderRadius应用到样式而不是作为DOM属性
        borderRadius: borderRadius,
      };
    }
  };

  // 合并默认样式和自定义样式
  const combinedSx = {
    ...getDefaultSx(),
    cursor: interactive || onClick ? 'pointer' : 'default',
    transition: 'all 0.3s ease',
    height: size === 'small' ? '24px' : '32px',
    fontSize: size === 'small' ? '0.75rem' : '0.85rem',
    fontWeight: 500,
    lineHeight: 1.2, // 确保文本垂直居中
    ...customSx,
  };

  // 动画效果
  const chipVariants = {
    initial: { opacity: 0, scale: 0.8, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    hover: { y: -4, scale: 1.05 }
  };

  // 使用动画取决于animate参数
  const motionProps = animate ? {
    initial: "initial",
    animate: "animate",
    whileHover: interactive ? "hover" : undefined,
    variants: chipVariants,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  } : {};

  // 构建chip组件
  const chipComponent = (
    <motion.div
      {...motionProps}
      onClick={handleClick}
      style={{ display: 'inline-block' }} // 确保动画容器正确显示
    >
      <Chip
        label={label}
        icon={icon as React.ReactElement | undefined}
        color={isStandardColor(color) ? (color as ChipProps['color']) : undefined}
        variant={variant as ChipProps['variant']}
        size={size}
        sx={combinedSx}
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
