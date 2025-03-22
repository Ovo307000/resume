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
  colorMode?: 'primary' | 'secondary' | 'accent' | 'gradient';
  tooltipText?: string;
}

/**
 * 导航按钮组件
 * 支持多种样式变体和大小，适用于导航栏链接
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

  // 根据colorMode获取颜色
  const getColor = () => {
    switch (colorMode) {
      case 'primary':
        return isDark ? '#7c4dff' : '#4c8cff';
      case 'secondary':
        return isDark ? '#fb8c00' : '#ff5722';
      case 'accent':
        return isDark ? '#00e5ff' : '#00b8d4';
      case 'gradient':
        return isDark ? '#7c4dff' : '#4c8cff'; // 渐变色在CSS中处理
      default:
        return isDark ? '#7c4dff' : '#4c8cff';
    }
  };

  // 生成渐变背景
  const getGradientBackground = () => {
    if (colorMode === 'gradient') {
      return isDark
        ? 'linear-gradient(135deg, rgba(124, 77, 255, 0.2) 0%, rgba(68, 138, 255, 0.2) 100%)'
        : 'linear-gradient(135deg, rgba(76, 140, 255, 0.1) 0%, rgba(124, 77, 255, 0.1) 100%)';
    }
    return 'transparent';
  };

  // 获取图标按钮样式
  if (variant === 'icon') {
    const button = (
      <IconButton
        onClick={handleClick}
        sx={{
          color: isActive ? getColor() : isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          bgcolor: isActive
            ? alpha(getColor(), isDark ? 0.15 : 0.1)
            : 'transparent',
          p: size === 'small' ? 0.8 : size === 'large' ? 1.2 : 1,
          '&:hover': {
            bgcolor: alpha(getColor(), isDark ? 0.2 : 0.15),
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...sx
        }}
      >
        {icon}
      </IconButton>
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
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {icon && <Box sx={{ mr: 0.5, display: 'flex', alignItems: 'center' }}>{icon}</Box>}
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
            color: isActive ? getColor() : isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
            textTransform: 'none',
            fontWeight: isActive ? 600 : 500,
            px: 2,
            py: size === 'small' ? 0.8 : 1.2,
            minWidth: 'auto',
            position: 'relative',
            overflow: 'visible',
            '&:hover': {
              backgroundColor: 'transparent',
              color: getColor(),
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
            backgroundColor: getColor(),
            borderRadius: '4px',
            boxShadow: `0 0 8px ${getColor()}`,
          }}
        />
      </Box>
    );
  }

  // 默认按钮样式
  return (
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
          ? '#fff'
          : isActive ? getColor() : isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
        bgcolor: variant === 'contained'
          ? getColor()
          : isActive ? alpha(getColor(), isDark ? 0.15 : 0.1) : 'transparent',
        backgroundImage: getGradientBackground(),
        borderColor: variant === 'outlined' ? getColor() : 'transparent',
        '&:hover': {
          bgcolor: variant === 'contained'
            ? alpha(getColor(), 0.9)
            : alpha(getColor(), isDark ? 0.2 : 0.15),
          backgroundImage: getGradientBackground(),
          borderColor: variant === 'outlined' ? getColor() : 'transparent',
          transform: 'translateY(-2px)',
          boxShadow: variant === 'contained'
            ? `0 4px 12px ${alpha(getColor(), 0.4)}`
            : 'none',
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...sx
      }}
    >
      {buttonContent}
    </Button>
  );
};

export default NavButton;
