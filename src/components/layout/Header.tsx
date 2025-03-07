import React, { useState, useEffect, useRef } from 'react';
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
  const navRef = useRef<HTMLDivElement>(null);
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

  // 当路径变化时更新activeNavItem
  useEffect(() => {
    const path = location.pathname;
    setActiveNavItem(path);

    // 在路径变化时更新指示器位置
    if (navRef.current && indicatorRef.current) {
      setTimeout(() => {
        updateIndicatorPosition();
      }, 50);
    }
  }, [location.pathname]);

  // 监听窗口尺寸变化，更新指示器位置
  useEffect(() => {
    const handleResize = () => {
      if (navRef.current && indicatorRef.current) {
        updateIndicatorPosition();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeNavItem, isMenuHovered, activeHoverKey]);

  const getIsActive = (path: string) => {
    return location.pathname === path;
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMouseEnter = (key: string) => {
    if (!isMobile) {
      setActiveHoverKey(key);
      updateIndicatorPosition();
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveHoverKey('');
      updateIndicatorPosition();
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
      updateIndicatorPosition();
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleCloseMobileMenu();
  };

  // 更新导航指示器位置
  const updateIndicatorPosition = () => {
    if (!navRef.current || !indicatorRef.current) return;

    const navElement = navRef.current;
    const indicator = indicatorRef.current;

    // 找到当前活动的导航项
    const activeKey = activeHoverKey || activeNavItem;
    const activeIndex = navLinks.findIndex(link =>
      activeHoverKey ? link.key === activeKey : link.path === activeKey);

    if (activeIndex === -1 || !navElement.children[activeIndex]) {
      // 隐藏指示器
      indicator.style.opacity = '0';
      return;
    }

    const activeElement = navElement.children[activeIndex] as HTMLElement;
    const activeRect = activeElement.getBoundingClientRect();
    const navRect = navElement.getBoundingClientRect();

    // 获取当前导航项的颜色
    const link = navLinks[activeIndex];
    const color = getTabColor(link.key);

    // 计算指示器位置和宽度
    const left = activeRect.left - navRect.left;
    const width = activeRect.width;

    // 应用指示器样式为底部线条
    indicator.style.opacity = '1';
    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${width}px`;
    indicator.style.backgroundColor = color;
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

  // 药丸形状的玻璃效果
  const pillGlassStyle = {
    borderRadius: isSticky ? '16px' : '30px',
    maxWidth: isSticky ? 'calc(100% - 40px)' : 'calc(100% - 80px)',
    margin: '0 auto',
    bgcolor: alpha(
      theme === 'dark' ? muiTheme.palette.background.paper : muiTheme.palette.background.default,
      isSticky ? 0.85 : 0.75
    ),
    backdropFilter: 'blur(10px)',
    boxShadow: isSticky
      ? theme === 'dark'
        ? '0 4px 20px rgba(0, 0, 0, 0.5)'
        : '0 4px 20px rgba(0, 0, 0, 0.1)'
      : 'none',
    transition: 'all 0.3s ease',
    border: `1px solid ${alpha(
      theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.black,
      0.05
    )}`,
    transform: isSticky ? 'translateY(10px)' : 'translateY(20px)',
    position: 'relative'
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          transition: 'all 0.3s ease',
          backdropFilter: 'none',
          py: isSticky ? 0.5 : 1,
          borderBottom: 'none',
          zIndex: 1100,
          top: 0,
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Box sx={pillGlassStyle}>
            <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 0.5, position: 'relative' }}>
              {/* Logo */}
              <Box sx={{ flexGrow: 0 }}>
                <Logo />
              </Box>

              {/* PC端导航 - 药丸样式 */}
              {!isMobile && (
                <>
                  <Box
                    ref={navRef}
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      position: 'relative',
                      height: '48px'
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
                          px: 2,
                          height: '100%',
                          textTransform: 'none',
                          fontWeight: getIsActive(link.path) ? 'bold' : 'medium',
                          fontSize: '0.95rem',
                          transition: 'all 0.2s ease',
                          position: 'relative',
                          zIndex: 2
                        }}
                      >
                        {t(`navigation.${link.label}`)}
                      </Button>
                    ))}

                    {/* 导航指示器 - 底部线条 */}
                    <Box
                      ref={indicatorRef}
                      sx={{
                        position: 'absolute',
                        bottom: '0',
                        height: '3px',
                        backgroundColor: 'primary.main',
                        borderRadius: '3px',
                        opacity: 0,
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                        pointerEvents: 'none',
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
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
          </Box>
        </Container>
      </AppBar>

      {/* 占位空间，防止内容被固定导航栏遮挡 - 根据导航栏粘滞状态动态调整 */}
      <Box sx={{ height: { xs: 60, md: isSticky ? 72 : 88 }, mb: 3 }} />

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
    </>
  );
};

export default Header;
