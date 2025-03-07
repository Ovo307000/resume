import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavLinkProps extends Omit<ButtonProps, 'href'> {
  to: string;
  label: string;
  exact?: boolean;
  hideIndicator?: boolean;
}

/**
 * 导航链接组件
 * 提供带有动画下划线效果的导航链接
 * 可通过hideIndicator属性控制是否显示下划线
 */
const NavLink: React.FC<NavLinkProps> = ({
  to,
  label,
  exact = false,
  hideIndicator = false,
  ...buttonProps
}) => {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <Button
      component={RouterNavLink}
      to={to}
      color="inherit"
      sx={{
        position: 'relative',
        mx: hideIndicator ? 0 : 1,
        py: 2,
        textTransform: 'none',
        fontWeight: isActive ? 'bold' : 'medium',
        color: isActive ? 'primary.main' : 'inherit',
        '&:hover': {
          backgroundColor: 'transparent',
          color: 'primary.main',
        }
      }}
      {...buttonProps}
    >
      {label}

      {/* 下划线动画 */}
      {isActive && !hideIndicator && (
        <motion.div
          layoutId="nav-underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: 'currentColor'
          }}
        />
      )}
    </Button>
  );
};

export default NavLink;
