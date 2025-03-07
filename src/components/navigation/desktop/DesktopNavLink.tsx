import React from 'react';
import { Box, Button, useTheme as useMuiTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { NavLinkProps } from '../common/types';
import { getDesktopNavLinkStyles } from '../common/styles';

/**
 * 桌面端导航链接组件
 * 简化版，不包含指示条（由父组件统一控制）
 */
const DesktopNavLink: React.FC<NavLinkProps> = ({ route, active }) => {
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const linkColor = route.color || muiTheme.palette.primary.main;

  // 处理点击跳转
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(route.path);
  };

  return (
    <Box sx={{ position: 'relative', flex: 1, textAlign: 'center' }}>
      <Button
        component={Link}
        to={route.path}
        onClick={handleClick}
        sx={{
          ...getDesktopNavLinkStyles(active),
          color: active ? linkColor : 'text.primary',
          '&:hover': {
            backgroundColor: 'transparent',
            color: linkColor,
          },
          width: '100%',
        }}
      >
        {route.label}
      </Button>
    </Box>
  );
};

export default DesktopNavLink;
