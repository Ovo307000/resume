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
 * 导航栏固定在顶部，呈现玻璃胶囊效果
 * 使用统一的导航样式，保持与移动端一致的视觉效果
 */
const DesktopNavbar: React.FC<NavbarProps> = ({ routes, isActive, isCompact = false }) => {
  const { theme, toggleTheme } = useTheme();

  // 监听滚动位置，用于平滑过渡效果
  const scrollY = useMotionValue(0);
  const scrollProgress = useTransform(scrollY, [0, 100], [0, 1]);
  const opacity = useTransform(scrollProgress, [0, 1], [0.6, 0.8]);
  const boxShadowOpacity = useTransform(scrollProgress, [0, 1], [0.08, 0.25]);
  const borderOpacity = useTransform(scrollProgress, [0, 1], [0.05, 0.12]);
  const translateY = useTransform(scrollProgress, [0, 1], [20, 0]);

  // 弹性动画效果
  const springBoxShadow = useSpring(boxShadowOpacity, { damping: 15, stiffness: 100 });
  const springOpacity = useSpring(opacity, { damping: 15, stiffness: 100 });
  const springTranslateY = useSpring(translateY, { damping: 20, stiffness: 120 });

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
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: { xs: 'none', md: 'block' },
        zIndex: 1100,
        px: 2,
        pt: 2,
        pointerEvents: 'none'
      }}
    >
      <AppBar
        position="relative"
        elevation={0}
        sx={{
          background: theme === 'dark'
            ? `rgba(18, 18, 30, ${springOpacity.get()})`
            : `rgba(255, 255, 255, ${springOpacity.get()})`,
          backdropFilter: 'blur(15px)',
          borderRadius: '50px',
          border: `1px solid ${theme === 'dark'
            ? `rgba(255, 255, 255, ${borderOpacity.get()})`
            : `rgba(0, 0, 0, ${borderOpacity.get()})`}`,
          boxShadow: theme === 'dark'
            ? `0 8px 32px rgba(0, 0, 0, ${springBoxShadow.get()})`
            : `0 8px 32px rgba(0, 0, 0, ${springBoxShadow.get()})`,
          transition: 'all 0.3s ease',
          maxWidth: 'lg',
          mx: 'auto',
          transform: `translateY(${springTranslateY.get()}px)`,
          pointerEvents: 'auto',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth={false} disableGutters>
          <Toolbar
            sx={{
              py: isCompact ? 0.8 : 1.2,
              px: 2,
              transition: 'padding 0.3s ease',
              minHeight: isCompact ? '56px' : '64px'
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
    </Box>
  );
};

export default DesktopNavbar;
