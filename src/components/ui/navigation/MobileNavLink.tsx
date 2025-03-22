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
  const isDark = theme === 'dark';

  // 解析颜色字符串，支持主题色或自定义颜色
  const getColor = () => {
    if (color === 'primary.main') {
      return isDark ? '#7c4dff' : '#4c8cff';
    }
    return color;
  };

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
          py: 1.8,
          px: 2,
          my: 0.5,
          borderRadius: 2,
          color: isActive ? getColor() : isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
          fontWeight: isActive ? 600 : 500,
          bgcolor: isActive
            ? alpha(getColor(), isDark ? 0.15 : 0.08)
            : 'transparent',
          '&:hover': {
            color: getColor(),
            bgcolor: alpha(getColor(), isDark ? 0.1 : 0.05),
            transform: 'translateX(5px)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderLeft: isActive
            ? `4px solid ${getColor()}`
            : '4px solid transparent',
        }}
      >
        {icon && (
          <ListItemIcon
            sx={{
              color: 'inherit',
              minWidth: 36,
              mr: 1,
              transition: 'transform 0.2s ease',
              transform: isActive ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            {icon}
          </ListItemIcon>
        )}

        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontWeight: isActive ? 600 : 500,
            fontSize: '0.95rem',
            letterSpacing: '0.2px'
          }}
        />

        {/* 活动指示器 - 渐变光效 */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              height: '100%',
              borderRadius: 'inherit',
              background: isDark
                ? `linear-gradient(to right, ${alpha(getColor(), 0)} 0%, ${alpha(getColor(), 0.07)} 100%)`
                : `linear-gradient(to right, ${alpha(getColor(), 0)} 0%, ${alpha(getColor(), 0.04)} 100%)`,
              zIndex: -1,
              pointerEvents: 'none'
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default MobileNavLink;
