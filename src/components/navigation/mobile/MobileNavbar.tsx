import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Zoom,
  useTheme as useMuiTheme,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { NavRoute } from '../common/types';
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
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface MobileNavbarProps {
  routes: NavRoute[];
  showLanguageSelector?: boolean;
  isActive?: (path: string) => boolean;
}

/**
 * 移动端导航栏组件
 * 添加粘性跟随和平滑过渡动画
 * 导航栏固定在顶部，呈现玻璃胶囊效果
 * 抽屉式侧边菜单提供主要导航功能
 * 添加自定义进度条，隐藏系统默认进度条
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
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 导航栏是否处于紧凑模式（滚动一定距离后）
  const isCompact = scrollPos > 50;

  // 动画相关的值
  const scrollY = useMotionValue(0);
  const scrollProgress = useTransform(scrollY, [0, 50], [0, 1]);
  const opacity = useTransform(scrollProgress, [0, 1], [0.6, 0.85]);
  const boxShadowOpacity = useTransform(scrollProgress, [0, 1], [0.05, 0.2]);
  const borderOpacity = useTransform(scrollProgress, [0, 1], [0.05, 0.12]);

  // 计算滚动进度
  const docHeight = useMotionValue(0);
  const windowHeight = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  // 计算文档高度和窗口高度
  useEffect(() => {
    const updateDocHeight = () => {
      docHeight.set(document.documentElement.scrollHeight - window.innerHeight);
      windowHeight.set(window.innerHeight);
    };

    updateDocHeight();
    window.addEventListener('resize', updateDocHeight);
    return () => window.removeEventListener('resize', updateDocHeight);
  }, [docHeight, windowHeight]);

  // 弹性动画效果
  const springBoxShadow = useSpring(boxShadowOpacity, { damping: 15, stiffness: 100 });
  const springOpacity = useSpring(opacity, { damping: 15, stiffness: 100 });
  const springScrollProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // 处理抽屉开关
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // 监听路由变化关闭抽屉
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // 处理滚动事件
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingDown = currentScrollPos > lastScrollTop;

      // 如果向下滚动并且菜单已打开，则自动关闭菜单
      if (scrollingDown && mobileOpen) {
        setMobileOpen(false);
      }

      // 更新最后一次滚动位置
      lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos;
      setScrollPos(currentScrollPos);
      scrollY.set(currentScrollPos);

      // 计算滚动进度百分比
      if (docHeight.get() > 0) {
        scrollYProgress.set(currentScrollPos / docHeight.get());
      }
    };

    handleScroll(); // 初始化
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY, scrollYProgress, docHeight, mobileOpen]);

  // 回到顶部功能
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 判断路由是否为当前活动路由
  const isActive = propIsActive || ((path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  });

  return (
    <>
      {/* 自定义滚动进度条 */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          transformOrigin: '0%',
          scaleX: springScrollProgress,
          zIndex: 1200,
          background: `linear-gradient(to right,
            ${isDark ? '#4338CA' : '#4338CA'},
            ${isDark ? '#10B981' : '#10B981'},
            ${isDark ? '#F59E0B' : '#F59E0B'},
            ${isDark ? '#8B5CF6' : '#8B5CF6'},
            ${isDark ? '#EC4899' : '#EC4899'},
            ${isDark ? '#06B6D4' : '#06B6D4'}
          )`,
          boxShadow: isDark
            ? '0 0 8px rgba(79, 70, 229, 0.5)'
            : '0 0 8px rgba(79, 70, 229, 0.3)',
        }}
      />

      {/* 移动导航栏 - 悬浮在顶部 */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          px: { xs: 1.5, sm: 2 },
          pt: { xs: 1.5, sm: 2 },
          zIndex: muiTheme.zIndex.drawer + 1,
          pointerEvents: 'none',
          display: { xs: 'block', sm: 'block', md: 'none' },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <AppBar
            position="static"
            elevation={0}
            component="div"
            sx={{
              background: isDark
                ? `rgba(18, 18, 30, ${springOpacity.get()})`
                : `rgba(255, 255, 255, ${springOpacity.get()})`,
              backdropFilter: 'blur(15px)',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid',
              borderColor: isDark
                ? `rgba(255, 255, 255, ${borderOpacity.get()})`
                : `rgba(0, 0, 0, ${borderOpacity.get()})`,
              boxShadow: isDark
                ? `0 8px 32px rgba(0, 0, 0, ${springBoxShadow.get()})`
                : `0 8px 32px rgba(0, 0, 0, ${springBoxShadow.get()})`,
              transition: 'all 0.3s ease',
              height: 'auto',
              pointerEvents: 'auto',
            }}
          >
            <Toolbar
              sx={{
                py: isCompact ? 0.5 : 1,
                px: 1.5,
                transition: 'padding 0.3s ease',
                justifyContent: 'space-between',
                minHeight: isCompact ? '56px' : '64px',
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
                      color: isDark ? '#fff' : '#000',
                    }}
                  >
                    <FiMenu size={20} />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </motion.div>
      </Box>

      {/* 回到顶部按钮 */}
      <Zoom in={scrollPos > 300}>
        <Box
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 99,
            borderRadius: '50%',
            backdropFilter: 'blur(8px)',
            background: isDark ? 'rgba(32, 32, 35, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
            boxShadow: isDark ? '0 4px 10px rgba(0, 0, 0, 0.25)' : '0 4px 10px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: isDark ? '0 6px 12px rgba(0, 0, 0, 0.3)' : '0 6px 12px rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <FiArrowUp size={20} color={isDark ? '#fff' : '#000'} />
        </Box>
      </Zoom>

      {/* 移动菜单抽屉 */}
      <EnhancedMobileNavMenu
        routes={routes}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        isActive={isActive}
      />
    </>
  );
};

export default MobileNavbar;
