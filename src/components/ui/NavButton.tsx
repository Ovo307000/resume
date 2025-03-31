import React from 'react';
import { Button, IconButton, Box, Tooltip, alpha } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface NavButtonProps {
  label?: string;
  icon?: React.ReactNode;
  to?: string;
  onClick?: () => void;
  isActive?: boolean;
  variant?: 'text' | 'outlined' | 'contained' | 'link' | 'icon';
  size?: 'small' | 'medium' | 'large';
  sx?: any;
  color?: string;
  colorMode?: 'primary' | 'secondary' | 'accent' | 'gradient';
  tooltipText?: string;
}

/**
 * 导航按钮组件
 * 支持多种样式变体和大小，适用于导航栏链接
 * 新增: 支持直接传入 color 定义颜色
 */
const NavButton: React.FC<NavButtonProps> = ({
  label,
  icon,
  to,
  onClick,
  isActive = false,
  variant = 'text',
  size = 'medium',
  sx = {},
  color,
  colorMode = 'primary',
  tooltipText,
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 处理点击事件
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
      return;
    }

    if (to) {
      e.preventDefault();
      navigate(to);
    }
  };

  // 优先使用传入的 color，否则根据 colorMode 决定
  const finalColor = color || (() => {
    switch (colorMode) {
      case 'primary':
        return isDark ? '#7c4dff' : '#4c8cff';
      case 'secondary':
        return isDark ? '#fb8c00' : '#ff5722';
      case 'accent':
        return isDark ? '#00e5ff' : '#00b8d4';
      case 'gradient': // 渐变色在CSS中处理，这里提供一个基础色
        return isDark ? '#7c4dff' : '#4c8cff';
      default:
        return isDark ? '#7c4dff' : '#4c8cff';
    }
  })();

  // 生成渐变背景 (如果需要，可以基于 finalColor 动态生成)
  const getGradientBackground = () => {
    if (colorMode === 'gradient') {
      return isDark
        ? `linear-gradient(135deg, ${alpha(finalColor, 0.3)} 0%, ${alpha('#448aff', 0.3)} 100%)` // 示例：使用 finalColor
        : `linear-gradient(135deg, ${alpha(finalColor, 0.2)} 0%, ${alpha('#7c4dff', 0.2)} 100%)`; // 示例：使用 finalColor
    }
    return 'transparent';
  };

  // 获取图标按钮样式
  if (variant === 'icon') {
    const button = (
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <IconButton
          onClick={handleClick}
          sx={{
            color: isActive ? finalColor : isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
            bgcolor: isActive
              ? alpha(finalColor, isDark ? 0.15 : 0.1)
              : 'transparent',
            p: size === 'small' ? 0.8 : size === 'large' ? 1.2 : 1,
            '&:hover': {
              bgcolor: alpha(finalColor, isDark ? 0.25 : 0.18),
              color: finalColor, // 悬停时也显示主题色
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isActive ? `0 0 10px ${alpha(finalColor, 0.4)}` : 'none',
            ...sx
          }}
        >
          {/* 让图标始终显示 */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>{icon}</Box>
        </IconButton>
      </motion.div>
    );

    return tooltipText ? (
      <Tooltip title={tooltipText} arrow>
        {button}
      </Tooltip>
    ) : button;
  }

  // 文本按钮样式变体
  const buttonContent = (
    <motion.div
      whileHover={{ y: -2 }}
      initial={{ y: 0 }}
      style={{ display: 'flex', alignItems: 'center', gap: '4px' }} // 添加 gap
    >
      {/* 将图标移到这里显示 */}
      {icon && <Box sx={{ display: 'flex', alignItems: 'center', fontSize: size === 'small' ? '1rem' : '1.15rem' }}>{icon}</Box>}
      {label}
    </motion.div>
  );

  // 链接按钮 - 用于导航
  if (variant === 'link') {
    return (
      <Box sx={{ position: 'relative', ...sx }}>
        <Button
          component={to ? Link : 'button'}
          to={to}
          onClick={handleClick}
          size={size}
          sx={{
            color: isActive ? finalColor : isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
            textTransform: 'none',
            fontWeight: isActive ? 600 : 500,
            px: 2,
            py: size === 'small' ? 0.8 : 1.2,
            minWidth: 'auto',
            position: 'relative',
            overflow: 'visible',
            '&:hover': {
              backgroundColor: 'transparent',
              color: finalColor, // 悬停时使用 finalColor
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {buttonContent}
        </Button>

        {/* 底部指示器 */}
        <motion.div
          initial={false}
          animate={{
            width: isActive ? '70%' : '0%',
            opacity: isActive ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
          style={{
            position: 'absolute',
            bottom: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '3px',
            backgroundColor: finalColor, // 使用 finalColor
            borderRadius: '4px',
            boxShadow: `0 0 8px ${finalColor}`, // 使用 finalColor
          }}
        />
      </Box>
    );
  }

  // 默认按钮样式 (也更新颜色逻辑)
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <Button
        component={to ? Link : 'button'}
        to={to}
        onClick={handleClick}
        variant={variant}
        size={size}
        sx={{
          textTransform: 'none',
          fontWeight: isActive ? 600 : 500,
          color: variant === 'contained'
            ? '#fff' // Contained 按钮文字通常是白色
            : isActive ? finalColor : isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
          bgcolor: variant === 'contained'
            ? finalColor // Contained 背景色使用 finalColor
            : isActive ? alpha(finalColor, isDark ? 0.15 : 0.1) : 'transparent',
          backgroundImage: getGradientBackground(), // 背景渐变
          borderColor: variant === 'outlined' ? finalColor : 'transparent',
          '&:hover': {
            color: variant === 'contained' ? '#fff' : finalColor, // 悬停文字颜色
            bgcolor: variant === 'contained'
              ? alpha(finalColor, 0.9)
              : alpha(finalColor, isDark ? 0.2 : 0.15),
            backgroundImage: getGradientBackground(), // 悬停背景渐变
            borderColor: variant === 'outlined' ? finalColor : 'transparent',
            boxShadow: variant === 'contained'
              ? `0 6px 15px ${alpha(finalColor, 0.5)}`
              : `0 3px 8px ${alpha(finalColor, 0.3)}`,
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isActive || variant === 'contained'
            ? `0 4px 10px ${alpha(finalColor, 0.4)}`
            : 'none',
          ...sx
        }}
      >
        {buttonContent}
      </Button>
    </motion.div>
  );
};

export default NavButton;
