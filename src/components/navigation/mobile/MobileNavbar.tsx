import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Zoom,
  useTheme as useMuiTheme,
  IconButton
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import {
  FiMenu,
  FiArrowUp,
  FiMoon,
  FiSun
} from 'react-icons/fi';
import EnhancedMobileNavMenu from './EnhancedMobileNavMenu';
import LogoAvatar from '../../ui/LogoAvatar';
import AnimatedIconButton from '../../ui/common/AnimatedIconButton';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../ui/language/LanguageSelector';
import {
  FiHome,
  FiUser,
  FiFolder,
  FiBookOpen,
  FiPhone,
  FiCode
} from 'react-icons/fi';

interface NavRoute {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

interface MobileNavbarProps {
  routes: NavRoute[];
  showLanguageSelector?: boolean;
  isActive?: (path: string) => boolean;
}

/**
 * 移动端导航栏组件
 * 简化导航栏，将导航项转移到可展开的侧边导航菜单
 * 使用统一风格样式，保持与桌面端一致的视觉体验
 */
const MobileNavbar: React.FC<MobileNavbarProps> = ({
  routes,
  showLanguageSelector,
  isActive: propIsActive
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  // 导航栏是否处于紧凑模式（滚动一定距离后）
  const isCompact = scrollPos > 100;

  // 处理抽屉开关
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // 监听路由变化关闭抽屉
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // 监听滚动位置
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 回到顶部功能
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 定义带图标的路由
  const routesWithIcons = routes.map(route => {
    let icon;
    switch (route.path) {
      case '/':
        icon = <FiHome size={20} />;
        break;
      case '/about':
        icon = <FiUser size={20} />;
        break;
      case '/projects':
        icon = <FiFolder size={20} />;
        break;
      case '/education':
        icon = <FiBookOpen size={20} />;
        break;
      case '/contact':
        icon = <FiPhone size={20} />;
        break;
      case '/experience':
      case '/skills':
        icon = <FiCode size={20} />;
        break;
      default:
        icon = null;
    }
    return {
      ...route,
      icon
    };
  });

  // 判断路由是否为当前活动路由
  const isActive = propIsActive || ((path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  });

  return (
    <>
      {/* 移动导航栏 - 固定在顶部，跟随滚动 */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: '100%',
          background: isDark
            ? 'rgba(18, 18, 30, 0.85)'
            : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: isDark
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.05)',
          boxShadow: isDark
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
          zIndex: muiTheme.zIndex.drawer + 1,
          transition: 'all 0.3s ease',
          display: { xs: 'block', sm: 'block', md: 'none' },
          top: 0,
          height: isCompact ? '60px' : '70px',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              py: isCompact ? 0.5 : 1.5,
              transition: 'padding 0.3s ease',
              justifyContent: 'space-between'
            }}
            disableGutters
          >
            {/* Logo区域 */}
            <LogoAvatar
              size={isCompact ? 'small' : 'medium'}
              animate={true}
            />

            {/* 右侧工具栏 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* 主题切换 */}
              <Box
                sx={{
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  background: isDark ? 'rgba(32, 32, 35, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                  boxShadow: isDark ? '0 4px 10px rgba(0, 0, 0, 0.25)' : '0 4px 10px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: isDark ? '0 6px 12px rgba(0, 0, 0, 0.3)' : '0 6px 12px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <AnimatedIconButton
                  icon={isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                  size="small"
                  variant="glass"
                  color="primary"
                  tooltipText={isDark ? t('common.lightMode') : t('common.darkMode')}
                  onClick={toggleTheme}
                  ariaLabel="切换主题"
                  sx={{ background: 'transparent', boxShadow: 'none', border: 'none' }}
                />
              </Box>

              {/* 语言选择器 */}
              {showLanguageSelector && (
                <Box
                  sx={{
                    borderRadius: '12px',
                    backdropFilter: 'blur(8px)',
                    background: isDark ? 'rgba(32, 32, 35, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                    boxShadow: isDark ? '0 4px 10px rgba(0, 0, 0, 0.25)' : '0 4px 10px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: isDark ? '0 6px 12px rgba(0, 0, 0, 0.3)' : '0 6px 12px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <LanguageSelector
                    size="small"
                    sx={{ background: 'transparent', boxShadow: 'none', border: 'none' }}
                  />
                </Box>
              )}

              {/* 菜单按钮 */}
              <Box
                sx={{
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  background: isDark ? 'rgba(32, 32, 35, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                  boxShadow: isDark ? '0 4px 10px rgba(0, 0, 0, 0.25)' : '0 4px 10px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: isDark ? '0 6px 12px rgba(0, 0, 0, 0.3)' : '0 6px 12px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <IconButton
                  aria-label={t('navigation.menuToggle', '菜单')}
                  onClick={handleDrawerToggle}
                  color="inherit"
                  sx={{
                    p: 1,
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none'
                  }}
                >
                  <FiMenu size={20} />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 使用增强版移动导航菜单 */}
      <EnhancedMobileNavMenu
        routes={routesWithIcons}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        showLanguageSelector={showLanguageSelector}
        isActive={isActive}
      />

      {/* 回到顶部按钮 */}
      <Zoom in={scrollPos > 300}>
        <Box sx={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          zIndex: 999
        }}>
          <AnimatedIconButton
            icon={<FiArrowUp size={20} />}
            onClick={scrollToTop}
            size="medium"
            variant="solid"
            color="primary"
            tooltipText={t('common.scrollToTop', '回到顶部')}
            ariaLabel="回到顶部"
          />
        </Box>
      </Zoom>
    </>
  );
};

export default MobileNavbar;
