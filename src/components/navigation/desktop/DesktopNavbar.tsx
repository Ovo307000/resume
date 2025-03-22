import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar
} from '@mui/material';
import { useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import LogoAvatar from '../../ui/LogoAvatar';
import NavButton from '../../ui/NavButton';
import { FiSun, FiMoon } from 'react-icons/fi';
import LanguageSelector from '../../ui/language/LanguageSelector';

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
 * 使用统一的导航样式，保持与移动端一致的视觉效果
 */
const DesktopNavbar: React.FC<NavbarProps> = ({ routes, isActive, isCompact = false }) => {
  const { theme, toggleTheme } = useTheme();

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
        zIndex: 1100, // 确保始终在最顶层
        top: 0
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
              <NavButton
                key={route.path}
                to={route.path}
                label={route.label}
                variant="link"
                size={isCompact ? "small" : "medium"}
                isActive={isActive(route.path)}
                sx={{ mx: 0.7 }}
                colorMode="gradient"
              />
            ))}
          </Box>

          {/* Right Side Utils - 与移动端统一尺寸 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NavButton
              icon={theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
              variant="icon"
              size="small"
              tooltipText={theme === 'dark' ? "切换到亮色模式" : "切换到暗色模式"}
              onClick={toggleTheme}
              colorMode="accent"
            />
            <LanguageSelector size="small" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DesktopNavbar;
