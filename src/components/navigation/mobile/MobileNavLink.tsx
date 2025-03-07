import React from 'react';
import { ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { NavLinkProps } from '../common/types';
import { getMobileNavLinkStyles } from '../common/styles';

/**
 * 移动端导航链接组件
 */
const MobileNavLink: React.FC<NavLinkProps> = ({ route, active, onClick }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const linkColor = route.color || theme.palette.primary.main;

  // 处理点击跳转
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(route.path);
    onClick?.(); // 关闭菜单
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={route.path}
        onClick={handleClick}
        selected={active}
        sx={getMobileNavLinkStyles(active, theme, linkColor)}
      >
        <ListItemText
          primary={route.label}
          primaryTypographyProps={{
            fontWeight: active ? 600 : 400,
            sx: {
              color: active ? linkColor : 'text.primary'
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default MobileNavLink;
