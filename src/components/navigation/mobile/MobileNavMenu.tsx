import React from 'react';
import { Box, Drawer, Divider, List, IconButton, alpha, useTheme as useMuiTheme } from '@mui/material';
import { FiX } from 'react-icons/fi';
import Logo from '../../ui/logo/Logo';
import LanguageSelector from '../../ui/language/LanguageSelector';
import MobileNavLink from './MobileNavLink';
import { MobileNavProps } from '../common/types';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 移动端导航菜单组件
 * 实现侧边抽屉式导航菜单
 */
const MobileNavMenu: React.FC<MobileNavProps> = ({
  routes,
  isActive,
  mobileOpen,
  handleDrawerToggle
}) => {
  const muiTheme = useMuiTheme();
  const { theme } = useTheme();

  return (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      PaperProps={{
        sx: {
          width: '75%',
          maxWidth: '320px',
          borderTopLeftRadius: '16px',
          borderBottomLeftRadius: '16px',
          px: 2,
          background: theme === 'dark'
            ? alpha(muiTheme.palette.background.paper, 0.85)
            : alpha(muiTheme.palette.background.default, 0.85),
          backdropFilter: 'blur(10px)',
        },
      }}
      ModalProps={{
        keepMounted: true, // 保持DOM中以提高性能
      }}
    >
      <Box sx={{ py: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo />
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            borderRadius: '12px',
            backgroundColor: alpha(muiTheme.palette.primary.main, 0.05),
            '&:hover': {
              backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
            },
          }}
        >
          <FiX />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List sx={{ py: 1 }}>
        {routes.map((route) => (
          <MobileNavLink
            key={route.path}
            route={route}
            active={isActive(route.path)}
            onClick={handleDrawerToggle}
          />
        ))}
      </List>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <LanguageSelector />
      </Box>
    </Drawer>
  );
};

export default MobileNavMenu;
