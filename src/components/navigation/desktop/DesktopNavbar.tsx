import React, { useRef, useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Container, useTheme as useMuiTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import Logo from '../../ui/logo/Logo';
import ThemeToggle from '../../ui/theme/ThemeToggle';
import LanguageSelector from '../../ui/language/LanguageSelector';
import DesktopNavLink from './DesktopNavLink';
import { NavbarProps } from '../common/types';
import { getAppBarStyles } from '../common/styles';
import { useScrollDetection } from '../common/utils';

/**
 * 桌面导航栏组件
 * 仅在中等及以上屏幕尺寸显示
 */
const DesktopNavbar: React.FC<NavbarProps> = ({ routes, isActive }) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const scrolled = useScrollDetection();

  // 导航链接容器和导航链接的引用
  const navLinksRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 指示条位置状态
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // 获取当前活跃的导航项
  const activeRoute = routes.find(route => isActive(route.path));
  const activeIndex = activeRoute ? routes.indexOf(activeRoute) : 0;

  // 更新指示条位置的函数
  useEffect(() => {
    const updateIndicator = () => {
      if (navItemsRef.current[activeIndex]) {
        const activeItem = navItemsRef.current[activeIndex];
        const navLinksElement = navLinksRef.current;

        if (activeItem && navLinksElement) {
          const activeRect = activeItem.getBoundingClientRect();
          const navRect = navLinksElement.getBoundingClientRect();

          // 计算指示条位置和宽度
          const left = activeRect.left - navRect.left;
          const width = activeRect.width;

          setIndicatorStyle({
            left,
            width,
            opacity: 1,
          });
        }
      }
    };

    // 初始化时和窗口大小改变时更新指示条位置
    updateIndicator();
    window.addEventListener('resize', updateIndicator);

    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeIndex]);

  return (
    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
            <Box sx={{ flexGrow: 0, mr: 3 }}>
              <Logo />
            </Box>

            {/* 导航链接 */}
            <Box
              ref={navLinksRef}
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {routes.map((route, index) => (
                <Box
                  key={route.path}
                  ref={(el: HTMLDivElement | null) => {
                    navItemsRef.current[index] = el;
                  }}
                >
                  <DesktopNavLink
                    route={route}
                    active={isActive(route.path)}
                  />
                </Box>
              ))}

              {/* 全局指示条 - 作为整体移动 */}
              <AnimatePresence>
                <motion.div
                  key="navbar-indicator"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: indicatorStyle.opacity,
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '6px',
                    height: '3px',
                    borderRadius: '4px',
                    backgroundColor: activeRoute?.color || muiTheme.palette.primary.main,
                    boxShadow: `0 0 8px ${activeRoute?.color || muiTheme.palette.primary.main}`,
                    pointerEvents: 'none', // 防止拦截鼠标事件
                  }}
                />
              </AnimatePresence>
            </Box>

            {/* 工具栏区域 */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeToggle />
              <Box sx={{ ml: 2 }}>
                <LanguageSelector />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default DesktopNavbar;
