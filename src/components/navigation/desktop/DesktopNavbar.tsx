import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Slide,
  useScrollTrigger
} from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import ThemeToggle from '../../ui/ThemeToggle';
import LanguageSelector from '../../ui/LanguageSelector';
import LogoAvatar from '../../ui/LogoAvatar';

interface NavRoute {
  path: string;
  label: string;
}

interface NavbarProps {
  routes: NavRoute[];
  isActive: (path: string) => boolean;
  isCompact?: boolean;
}

/**
 * 桌面导航栏组件
 */
const DesktopNavbar: React.FC<NavbarProps> = ({ routes, isActive, isCompact = false }) => {
  const { theme } = useTheme();

  // 检测滚动方向
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: theme === 'dark'
            ? 'rgba(18, 18, 30, 0.7)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: 0,
          borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
          boxShadow: theme === 'dark'
            ? '0 4px 30px rgba(0, 0, 0, 0.2)'
            : '0 4px 30px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease-in-out',
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              py: isCompact ? 0.5 : 1.5,
              transition: 'padding 0.3s ease'
            }}
            disableGutters
          >
            {/* Logo */}
            <LogoAvatar
              size={isCompact ? 'small' : 'medium'}
              animate={true}
            />

            {/* Navigation Links */}
            <Box sx={{ display: 'flex', mx: 'auto' }}>
              {routes.map((route) => (
                <motion.div
                  key={route.path}
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0 }}
                >
                  <Box
                    component={Link}
                    to={route.path}
                    sx={{
                      px: 2,
                      py: 1,
                      mx: 1,
                      color: isActive(route.path)
                        ? (theme === 'dark' ? '#a0a0ff' : '#5050ff')
                        : 'text.primary',
                      fontWeight: isActive(route.path) ? 600 : 400,
                      textDecoration: 'none',
                      position: 'relative',
                      '&::after': isActive(route.path) ? {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: '50%',
                        width: '20px',
                        height: '3px',
                        backgroundColor: theme === 'dark' ? '#a0a0ff' : '#5050ff',
                        borderRadius: '3px',
                        transform: 'translateX(-50%)'
                      } : {}
                    }}
                  >
                    {route.label}
                  </Box>
                </motion.div>
              ))}
            </Box>

            {/* Right Side Utils */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ThemeToggle />
              <LanguageSelector />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};

export default DesktopNavbar;
