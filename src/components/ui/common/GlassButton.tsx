import React from 'react';
import { Box, ButtonBase, SxProps, Theme } from '@mui/material';
import { motion, MotionProps } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import confetti from 'canvas-confetti';

export interface GlassButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: 'default' | 'outlined' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  rounded?: boolean;
  hoverEffect?: boolean;
  withConfetti?: boolean;
  confettiColors?: string[];
  sx?: SxProps<Theme>;
  motionProps?: MotionProps;
  download?: string;
  className?: string;
  rgbBorder?: boolean;
  rgbGradient?: boolean;
}

/**
 * 玻璃按钮组件
 * 提供统一的玻璃风格按钮，支持多种样式和效果
 */
const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  to,
  href,
  onClick,
  variant = 'default',
  size = 'medium',
  icon,
  iconPosition = 'end',
  rounded = true,
  hoverEffect = true,
  withConfetti = false,
  confettiColors = ['#6366F1', '#8B5CF6', '#EC4899', '#10B981'],
  sx = {},
  motionProps = {},
  download,
  className,
  rgbBorder = false,
  rgbGradient = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 根据尺寸获取内边距和字体大小
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          px: 2.5,
          py: 0.8,
          fontSize: '0.875rem',
          borderRadius: rounded ? '30px' : '8px',
        };
      case 'large':
        return {
          px: 4,
          py: 1.5,
          fontSize: '1.125rem',
          borderRadius: rounded ? '50px' : '12px',
        };
      default:
        return {
          px: 3.5,
          py: 1.2,
          fontSize: '1rem',
          borderRadius: rounded ? '50px' : '10px',
        };
    }
  };

  // 获取变体样式
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${isDark
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(0, 0, 0, 0.1)'}`,
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
        };
      case 'gradient':
        return {
          background: isDark
            ? 'linear-gradient(90deg, #7928CA 0%, #FF0080 100%)'
            : 'linear-gradient(90deg, #0070F3 0%, #00DFD8 100%)',
          color: '#fff',
          border: 'none',
        };
      default:
        return {
          backdropFilter: 'blur(10px)',
          backgroundColor: theme === 'dark'
            ? 'rgba(30, 30, 60, 0.25)'
            : 'rgba(255, 255, 255, 0.65)',
          boxShadow: theme === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${theme === 'dark'
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.05)'}`,
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
        };
    }
  };

  // 处理点击事件，包括五彩纸屑效果
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (withConfetti) {
      setTimeout(() => confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: confettiColors
      }), 300);
    }

    if (onClick) {
      onClick(e);
    }
  };

  // 创建按钮基础样式
  const buttonStyles = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    textDecoration: 'none',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...(hoverEffect && {
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: theme === 'dark'
          ? '0 8px 25px rgba(123, 100, 255, 0.3)'
          : '0 8px 25px rgba(123, 100, 255, 0.2)',
        backgroundColor: variant === 'default' ? (theme === 'dark'
          ? 'rgba(40, 40, 80, 0.35)'
          : 'rgba(255, 255, 255, 0.8)') : undefined,
      }
    }),
    ...sx
  } as const;

  // RGB渐变边框效果
  const rgbBorderStyles = rgbBorder ? {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899, #10B981)',
      backgroundSize: '300% 100%',
      animation: 'gradient 6s linear infinite',
    },
    '@keyframes gradient': {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
  } : {};

  // 图标样式
  const getIconStyles = () => ({
    display: 'inline-flex',
    margin: iconPosition === 'start' ? '0 8px 0 0' : '0 0 0 8px',
    transition: 'transform 0.3s ease',
    ...(hoverEffect && {
      '.glass-button:hover &': {
        transform: iconPosition === 'start'
          ? 'translateX(-3px)'
          : 'translateX(3px)',
      }
    })
  });

  // 创建按钮内容
  const buttonContent = (
    <>
      {icon && iconPosition === 'start' && (
        <Box component="span" className="button-icon" sx={getIconStyles()}>
          {icon}
        </Box>
      )}
      {children}
      {icon && iconPosition === 'end' && (
        <Box component="span" className="button-icon" sx={getIconStyles()}>
          {icon}
        </Box>
      )}
    </>
  );

  // 根据链接类型渲染不同的组件
  const renderButton = () => {
    let props = {
      className: `glass-button ${className || ''}`,
      sx: { ...buttonStyles, ...rgbBorderStyles },
      onClick: handleClick,
    };

    if (to) {
      // React Router Link
      return (
        <ButtonBase
          component={Link}
          to={to}
          {...props}
        >
          {buttonContent}
        </ButtonBase>
      );
    } else if (href) {
      // 外部链接
      return (
        <ButtonBase
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          download={download}
          {...props}
        >
          {buttonContent}
        </ButtonBase>
      );
    } else {
      // 普通按钮
      return (
        <ButtonBase {...props}>
          {buttonContent}
        </ButtonBase>
      );
    }
  };

  // 使用动画包装
  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.02 } : undefined}
      whileTap={hoverEffect ? { scale: 0.98 } : undefined}
      {...motionProps}
    >
      {renderButton()}
    </motion.div>
  );
};

export default GlassButton;
