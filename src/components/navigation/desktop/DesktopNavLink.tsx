import React, { forwardRef } from 'react';
import { Button, Box, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getDesktopNavLinkStyles } from '../common/styles';
import { NavRoute } from '../common/types';

interface DesktopNavLinkProps {
  route: NavRoute;
  active: boolean;
  index: number;
  activeIndex: number;
}

/**
 * 桌面导航链接组件
 * 显示单个导航项，带有动画效果，每个链接自带指示条
 */
const DesktopNavLink = forwardRef<HTMLElement, DesktopNavLinkProps>((props, ref) => {
  const { route, active, index, activeIndex } = props;
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(route.path);
  };

  // 指示条显示逻辑
  const isActive = active || index === activeIndex;
  const indicatorColor = route.color || muiTheme.palette.primary.main;

  return (
    <Box
      ref={ref as React.RefObject<HTMLDivElement>}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Button
        component="a"
        href={route.path}
        onClick={handleClick}
        sx={{
          ...getDesktopNavLinkStyles(active),
          color: active ? route.color || 'primary.main' : 'text.primary',
          position: 'relative',
          padding: '8px 16px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'transparent',
            color: route.color || 'primary.main',
          },
          fontWeight: active ? 600 : 500,
        }}
      >
        {/* 导航项内容 */}
        <motion.div
          initial={{ y: 0 }}
          whileHover={{ y: -2 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {route.icon && (
            <span style={{ marginRight: '6px', display: 'flex', alignItems: 'center' }}>
              {route.icon}
            </span>
          )}
          {route.label}
        </motion.div>
      </Button>

      {/* 每个导航链接自带的指示条，根据活跃状态显示或隐藏 */}
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
          bottom: '4px', // 位置更靠近文字底部
          height: '3px',
          backgroundColor: indicatorColor,
          borderRadius: '4px',
          boxShadow: `0 0 8px ${indicatorColor}`,
          alignSelf: 'center', // 确保水平居中
        }}
      />
    </Box>
  );
});

// 添加显示名以便调试
DesktopNavLink.displayName = 'DesktopNavLink';

export default DesktopNavLink;
