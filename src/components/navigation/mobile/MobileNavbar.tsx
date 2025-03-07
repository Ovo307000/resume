import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Container, IconButton, useTheme as useMuiTheme } from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import Logo from '../../ui/logo/Logo';
import ThemeToggle from '../../ui/theme/ThemeToggle';
import MobileNavMenu from './MobileNavMenu';
import { NavbarProps } from '../common/types';
import { getAppBarStyles } from '../common/styles';
import { useScrollDetection } from '../common/utils';
import { alpha } from '@mui/material/styles';

/**
 * 移动端导航栏组件
 * 仅在小屏幕显示
 */
const MobileNavbar: React.FC<NavbarProps> = ({ routes, isActive }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const scrolled = useScrollDetection();

  // 获取当前活跃的导航项
  const activeRoute = routes.find(route => isActive(route.path));

  // 处理侧边菜单开关
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          ...getAppBarStyles(theme, muiTheme, scrolled),
          top: scrolled ? 0 : 20,
          left: scrolled ? 0 : 20,
          right: scrolled ? 0 : 20,
          width: scrolled ? '100%' : 'auto',
          zIndex: 1100,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              py: 1.5,
              px: 3,
              transition: 'all 0.3s ease',
              position: 'relative',
            }}
          >
            {/* Logo */}
            <Box sx={{ flexGrow: 1 }}>
              <Logo />
            </Box>

            {/* 工具栏区域 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ThemeToggle />

              {/* 移动端菜单按钮 */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton
                  aria-label="Open navigation menu"
                  onClick={handleDrawerToggle}
                  size="large"
                  edge="end"
                  sx={{
                    color: 'text.primary',
                    border: theme === 'dark'
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(muiTheme.palette.primary.main, 0.05),
                      borderColor: 'primary.main',
                    }
                  }}
                >
                  <FiMenu />
                </IconButton>
              </motion.div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 移动端侧边菜单 */}
      <MobileNavMenu
        routes={routes}
        isActive={isActive}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Box>
  );
};

export default MobileNavbar;
