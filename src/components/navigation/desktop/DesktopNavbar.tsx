import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar
} from '@mui/material';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import ThemeToggle from '../../ui/ThemeToggle';
import LanguageSelector from '../../ui/language/LanguageSelector';
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
 * 添加粘性跟随和平滑过渡动画
 * 导航栏始终固定在顶部，滚动时切换为紧凑模式
 */
const DesktopNavbar: React.FC<NavbarProps> = ({ routes, isActive, isCompact = false }) => {
  const { theme } = useTheme();

  // 监听滚动位置，用于平滑过渡效果
  const scrollY = useMotionValue(0);
  const scrollProgress = useTransform(scrollY, [0, 100], [0, 1]);
  const opacity = useTransform(scrollProgress, [0, 1], [0.7, 0.95]);
  const boxShadowOpacity = useTransform(scrollProgress, [0, 1], [0.05, 0.2]);
  const borderOpacity = useTransform(scrollProgress, [0, 1], [0.05, 0.1]);

  // 弹性动画效果
  const springBoxShadow = useSpring(boxShadowOpacity, { damping: 15, stiffness: 100 });
  const springOpacity = useSpring(opacity, { damping: 15, stiffness: 100 });

  // 更新滚动位置
  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    handleScroll(); // 初始化
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: theme === 'dark'
          ? `rgba(18, 18, 30, ${springOpacity.get()})`
          : `rgba(255, 255, 255, ${springOpacity.get()})`,
        backdropFilter: 'blur(10px)',
        borderRadius: 0,
        borderBottom: `1px solid ${theme === 'dark'
          ? `rgba(255, 255, 255, ${borderOpacity.get()})`
          : `rgba(0, 0, 0, ${borderOpacity.get()})`}`,
        boxShadow: theme === 'dark'
          ? `0 4px 20px rgba(0, 0, 0, ${springBoxShadow.get()})`
          : `0 4px 20px rgba(0, 0, 0, ${springBoxShadow.get()})`,
        transition: 'background 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        display: { xs: 'none', md: 'block' }, // 确保md及以上宽度显示桌面导航栏
        width: '100%', // 确保导航栏占满宽度
        zIndex: 1100 // 确保始终在最顶层
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
                  }}
                >
                  {route.label}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -4,
                      left: '50%',
                      width: isActive(route.path) ? '20px' : '0px',
                      height: '3px',
                      backgroundColor: theme === 'dark' ? '#a0a0ff' : '#5050ff',
                      borderRadius: '3px',
                      transform: 'translateX(-50%)',
                      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* Right Side Utils */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThemeToggle />
            <LanguageSelector size="small" variant="icon" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DesktopNavbar;
