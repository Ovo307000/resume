import React from 'react';
import { ListItem, ListItemButton, ListItemText, ListItemIcon, alpha, useTheme as useMuiTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface MobileNavLinkProps {
  path?: string;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  icon?: React.ReactNode;
  color?: string;
}

/**
 * 移动端导航链接组件
 * 支持图标和自定义颜色
 */
const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  path,
  label,
  onClick,
  isActive = false,
  icon,
  color = 'primary.main'
}) => {
  const muiTheme = useMuiTheme();
  const { theme } = useTheme();

  // 自定义按钮组件用于避免React Router的警告
  const CustomButton = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
    <Link to={path || ''} ref={ref} {...props} />
  ));

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={path ? CustomButton : 'button'}
        onClick={onClick}
        sx={{
          position: 'relative',
          py: 1.5,
          borderRadius: 1,
          color: isActive ? color : 'text.primary',
          fontWeight: isActive ? 'bold' : 'normal',
          bgcolor: isActive ? alpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.1 : 0.05) : 'transparent',
          '&:hover': {
            color: theme === 'dark' ? 'primary.light' : 'primary.main',
            bgcolor: alpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.08 : 0.03)
          },
          transition: 'all 0.2s ease',
          mb: 1,
          overflow: 'hidden'
        }}
      >
        {icon && (
          <ListItemIcon
            sx={{
              color: 'inherit',
              minWidth: 36
            }}
          >
            {icon}
          </ListItemIcon>
        )}

        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontWeight: isActive ? 'bold' : 'medium',
          }}
        />

        {/* 侧边激活指示器 */}
        {isActive && (
          <motion.div
            layoutId="mobile-nav-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              left: 0,
              top: 8,
              bottom: 8,
              width: 4,
              borderRadius: 2,
              backgroundColor: typeof color === 'string' ? color : muiTheme.palette.primary.main
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default MobileNavLink;
