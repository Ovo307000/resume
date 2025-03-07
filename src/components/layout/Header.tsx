import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  Box,
  Container,
  useTheme as useMuiTheme,
  alpha,
  useMediaQuery,
  Button
} from '@mui/material';
import { FiMenu, FiX, FiInfo, FiCode, FiBook, FiBriefcase, FiMail } from 'react-icons/fi';
import ThemeToggle from '../ui/theme/ThemeToggle';
import LanguageSelector from '../ui/language/LanguageSelector';
import { useTheme } from '../../contexts/ThemeContext';
import MobileNavLink from '../ui/navigation/MobileNavLink';
import Logo from '../ui/logo/Logo';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * 页面头部组件
 * 负责显示导航栏和提供页面导航功能
 * 增强了对暗色模式的支持
 * 采用玻璃药丸风格设计，PC端使用悬浮菜单，移动端使用展开菜单
 */
const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const muiTheme = useMuiTheme();
  const { theme } = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState('/');
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [activeHoverKey, setActiveHoverKey] = useState('');
  const navTabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const navLinks = [
    { key: '/', label: 'home', path: '/', icon: <FiInfo /> },
    { key: '/about', label: 'about', path: '/about', icon: <FiInfo /> },
    { key: '/skills', label: 'skills', path: '/skills', icon: <FiCode /> },
    { key: '/education', label: 'education', path: '/education', icon: <FiBook /> },
    { key: '/experience', label: 'experience', path: '/experience', icon: <FiBriefcase /> },
    { key: '/contact', label: 'contact', path: '/contact', icon: <FiMail /> },
  ];

  // 检测滚动位置并设置粘滞状态
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const path = location.pathname;
    setActiveNavItem(path);

    if (navTabsRef.current && indicatorRef.current) {
      // 在下一个渲染帧计算位置
      setTimeout(() => {
        const index = navLinks.findIndex(link => link.path === path);
        updateIndicatorPosition(index);
      }, 0);
    }
  }, [location.pathname]);

  // 当窗口尺寸变化时更新标签指示器位置
  useEffect(() => {
    if (navTabsRef.current && indicatorRef.current) {
      const index = navLinks.findIndex(link => link.path === activeNavItem);
      updateIndicatorPosition(index);
    }
  }, [activeNavItem, isMobile]);

  const getIsActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMouseEnter = (key: string) => {
    if (!isMobile) {
      setActiveHoverKey(key);
      const index = navLinks.findIndex(link => link.key === key);
      updateIndicatorPosition(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveHoverKey('');
      const index = navLinks.findIndex(link => link.path === activeNavItem);
      updateIndicatorPosition(index);
    }
  };

  const handleMenuEnter = () => {
    if (!isMobile) {
      setIsMenuHovered(true);
    }
  };

  const handleMenuLeave = () => {
    if (!isMobile) {
      setIsMenuHovered(false);
      setActiveHoverKey('');
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleCloseMobileMenu();
  };

  // 标签指示器位置更新
  useLayoutEffect(() => {
    if (navTabsRef.current && indicatorRef.current) {
      const index = navLinks.findIndex(link => link.path === activeNavItem);
      updateIndicatorPosition(index);

      // 监听窗口尺寸变化
      const handleResize = () => {
        setTimeout(() => {
          const activeIndex = navLinks.findIndex(link =>
            activeHoverKey ? link.key === activeHoverKey : link.path === activeNavItem
          );
          updateIndicatorPosition(activeIndex);
        }, 0);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [activeNavItem, activeHoverKey]);

  const updateIndicatorPosition = (idx: number) => {
    if (!navTabsRef.current || !indicatorRef.current) return;

    const navTabs = navTabsRef.current;
    const indicator = indicatorRef.current;

    if (idx === -1 || !navTabs.children[idx]) {
      // 隐藏指示器
      indicator.style.opacity = '0';
      return;
    }

    const activeTab = navTabs.children[idx] as HTMLElement;
    const tabRect = activeTab.getBoundingClientRect();
    const navRect = navTabs.getBoundingClientRect();

    // 计算相对于导航容器的位置
    const left = tabRect.left - navRect.left;

    // 获取当前活动选项卡的颜色
    const link = navLinks[idx];
    const color = getTabColor(link.key);

    // 使用动画更新指示器位置和颜色
    indicator.style.opacity = '1';
    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${tabRect.width}px`;
    indicator.style.background = `linear-gradient(90deg, ${color}, ${lightenColor(color, 30)})`;
  };

  // 获取标签颜色
  const getTabColor = (key: string) => {
    const colorMap: Record<string, string> = {
      '/': '#4338CA',        // 首页 - 紫色
      '/about': '#10B981',   // 关于 - 绿色
      '/skills': '#F59E0B',  // 技能 - 橙色
      '/education': '#8B5CF6', // 教育 - 紫罗兰
      '/experience': '#EF4444', // 经验 - 红色
      '/contact': '#06B6D4'  // 联系 - 青色
    };

    return colorMap[key] || '#4338CA';
  };

  // 辅助函数：让颜色变亮
  const lightenColor = (hex: string, percent: number) => {
    // 将十六进制颜色转换为RGB
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    // 增加RGB值
    const amount = Math.floor(255 * (percent / 100));
    const newR = Math.min(r + amount, 255);
    const newG = Math.min(g + amount, 255);
    const newB = Math.min(b + amount, 255);

    // 转换回十六进制
    const rHex = newR.toString(16).padStart(2, '0');
    const gHex = newG.toString(16).padStart(2, '0');
    const bHex = newB.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: alpha(
          theme === 'dark'
            ? muiTheme.palette.background.default
            : muiTheme.palette.background.paper,
          isSticky ? (theme === 'dark' ? 0.8 : 0.9) : 0
        ),
        backdropFilter: isSticky ? 'blur(10px)' : 'none',
        boxShadow: isSticky
          ? (theme === 'dark'
              ? '0 4px 20px rgba(0, 0, 0, 0.3)'
              : '0 4px 20px rgba(0, 0, 0, 0.1)')
          : 'none',
        transition: 'all 0.3s ease-in-out',
        zIndex: 1000,
        top: 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Logo />

          {/* PC端导航 */}
          {!isMobile && (
            <>
              <Box
                ref={navTabsRef}
                sx={{
                  display: 'flex',
                  position: 'relative',
                  mx: 2,
                  flex: 1,
                  justifyContent: 'center'
                }}
                onMouseEnter={handleMenuEnter}
                onMouseLeave={handleMenuLeave}
              >
                {navLinks.map((link) => (
                  <Button
                    key={link.key}
                    startIcon={link.icon}
                    onClick={() => handleNavigate(link.path)}
                    onMouseEnter={() => handleMouseEnter(link.key)}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                      color: getIsActive(link.path)
                        ? (theme === 'dark' ? 'primary.light' : 'primary.main')
                        : (theme === 'dark' ? 'text.primary' : 'text.secondary'),
                      mx: 0.5,
                      px: 2,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: getIsActive(link.path) ? 'bold' : 'medium',
                      fontSize: '0.95rem',
                      borderRadius: '10px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: alpha(muiTheme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    {t(`navigation.${link.label}`)}
                  </Button>
                ))}

                {/* 标签指示器 */}
                <Box
                  ref={indicatorRef}
                  sx={{
                    position: 'absolute',
                    bottom: '-2px',
                    height: '3px',
                    backgroundColor: 'primary.main',
                    borderRadius: '3px',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                    opacity: isMenuHovered || activeNavItem !== '/' ? 1 : 0,
                    zIndex: 1
                  }}
                />
              </Box>

              {/* 右侧操作区 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThemeToggle />
                <LanguageSelector />
              </Box>
            </>
          )}

          {/* 移动端菜单按钮 */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LanguageSelector />
              <ThemeToggle />
              <IconButton
                color={theme === 'dark' ? 'inherit' : 'primary'}
                onClick={() => setIsMobileMenuOpen(true)}
                sx={{ ml: 1 }}
              >
                <FiMenu />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* 移动导航抽屉 */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '320px',
            background: theme === 'dark'
              ? alpha(muiTheme.palette.background.default, 0.95)
              : alpha(muiTheme.palette.background.paper, 0.95),
            backdropFilter: 'blur(10px)',
            borderLeft: `1px solid ${alpha(
              theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.black,
              0.1
            )}`,
          }
        }}
      >
        <Box sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${alpha(
            theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.black,
            0.1
          )}`
        }}>
          <Logo />
          <IconButton
            onClick={handleCloseMobileMenu}
            color={theme === 'dark' ? 'inherit' : 'primary'}
          >
            <FiX />
          </IconButton>
        </Box>

        <List sx={{ p: 2 }}>
          {navLinks.map((link) => (
            <MobileNavLink
              key={link.key}
              path={link.path}
              label={t(`navigation.${link.label}`)}
              isActive={getIsActive(link.path)}
              onClick={() => handleNavigate(link.path)}
              icon={link.icon}
            />
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
