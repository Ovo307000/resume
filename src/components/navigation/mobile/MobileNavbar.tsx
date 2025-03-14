import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Fab,
  Zoom,
  useTheme as useMuiTheme
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiMenu, FiArrowUp } from 'react-icons/fi';
import { alpha } from '@mui/material/styles';
import EnhancedMobileNavMenu from './EnhancedMobileNavMenu';
import ThemeToggle from '../../ui/ThemeToggle';
import LanguageSelector from '../../ui/language/LanguageSelector';
import LogoAvatar from '../../ui/LogoAvatar';
import IconButton from '../../ui/common/IconButton';
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
  const { theme } = useTheme();
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
            ? 'rgba(18, 18, 30, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: isDark
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.05)',
          boxShadow: isDark
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: 'all 0.3s ease',
          display: { xs: 'block', sm: 'block', md: 'none' }
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
              <ThemeToggle />

              {/* 语言选择器 */}
              {showLanguageSelector && <LanguageSelector size="small" variant="icon" />}

              {/* 菜单按钮 - 使用统一的IconButton组件 */}
              <IconButton
                onClick={handleDrawerToggle}
                icon={<FiMenu size={20} />}
                size="small"
                tooltipText="菜单"
                ariaLabel="打开菜单"
              />
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
        <Fab
          size="small"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
            color: muiTheme.palette.primary.main,
            boxShadow: isDark
              ? '0 4px 12px rgba(0, 0, 0, 0.4)'
              : '0 4px 12px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              backgroundColor: alpha(muiTheme.palette.primary.main, 0.2),
            },
            zIndex: 100
          }}
        >
          <FiArrowUp />
        </Fab>
      </Zoom>
    </>
  );
};

export default MobileNavbar;
