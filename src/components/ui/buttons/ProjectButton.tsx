import React from 'react';
import { Button, ButtonProps, Box, alpha, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

interface ProjectButtonProps extends Omit<ButtonProps, 'component'> {
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  animate?: boolean;
  external?: boolean;
}

/**
 * 项目按钮组件
 * 统一项目链接按钮样式，添加动画效果
 */
const ProjectButton: React.FC<ProjectButtonProps> = ({
  to,
  href,
  icon,
  children,
  variant = 'contained',
  size = 'small',
  color = 'primary',
  animate = true,
  external = false,
  sx,
  ...props
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 按钮基础样式
  const buttonSx = {
    borderRadius: '10px',
    textTransform: 'none',
    fontWeight: 500,
    px: 2,
    py: variant === 'contained' ? 1 : 0.8,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: variant === 'contained' ? (theme === 'dark' ? '0 4px 15px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.1)') : 'none',
    '&::before': variant === 'contained' ? {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '30%',
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0))',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
    } : {},
    '&:hover': {
      boxShadow: variant === 'contained' ? (theme === 'dark' ? '0 6px 20px rgba(0,0,0,0.4)' : '0 6px 20px rgba(0,0,0,0.15)') : 'none',
      backgroundColor: variant === 'contained'
        ? alpha(muiTheme.palette[color].main, theme === 'dark' ? 0.85 : 0.9)
        : alpha(muiTheme.palette[color].main, theme === 'dark' ? 0.15 : 0.1),
      '& .button-icon': {
        transform: 'translateX(2px)',
      }
    },
    ...sx
  };

  // 按钮内容
  const buttonContent = (
    <>
      {children}
      {icon && (
        <Box
          component="span"
          className="button-icon"
          sx={{
            display: 'flex',
            ml: 0.5,
            transition: 'transform 0.2s ease',
          }}
        >
          {icon}
        </Box>
      )}
    </>
  );

  // 动画包装
  const AnimatedButton = ({ children }: { children: React.ReactNode }) => {
    if (!animate) return <>{children}</>;

    return (
      <motion.div
        whileHover={{ y: -3 }}
        whileTap={{ y: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.div>
    );
  };

  // 根据不同的链接类型渲染按钮
  if (to) {
    return (
      <AnimatedButton>
        <Button
          component={Link}
          to={to}
          variant={variant}
          size={size}
          color={color}
          sx={buttonSx}
          {...props}
        >
          {buttonContent}
        </Button>
      </AnimatedButton>
    );
  }

  if (href) {
    return (
      <AnimatedButton>
        <Button
          component="a"
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          variant={variant}
          size={size}
          color={color}
          sx={buttonSx}
          {...props}
        >
          {buttonContent}
        </Button>
      </AnimatedButton>
    );
  }

  return (
    <AnimatedButton>
      <Button
        variant={variant}
        size={size}
        color={color}
        sx={buttonSx}
        {...props}
      >
        {buttonContent}
      </Button>
    </AnimatedButton>
  );
};

export default ProjectButton;
