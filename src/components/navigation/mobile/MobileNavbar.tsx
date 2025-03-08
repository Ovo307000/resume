import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Slide,
  useScrollTrigger,
  Backdrop
} from '@mui/material';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiMenu, FiX, FiChevronRight } from 'react-icons/fi';
import ThemeToggle from '../../ui/ThemeToggle';
import LanguageSelector from '../../ui/LanguageSelector';
import AnimatedLink from '../../ui/common/AnimatedLink';
import LogoAvatar from '../../ui/LogoAvatar';
import { useTranslation } from 'react-i18next';

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
 * 移动导航栏组件
 */
const MobileNavbar: React.FC<NavbarProps> = ({ routes, isActive, isCompact = false }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme } = useTheme();
  const { t } = useTranslation();

  // 检测滚动方向
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  // 处理抽屉打开关闭
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // 监听窗口变化，当切换到桌面模式时自动关闭抽屉
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && drawerOpen) {
        setDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawerOpen]);

  // 监听路由变化，自动关闭抽屉
  useEffect(() => {
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  }, [location.pathname]);

  // 锁定/解锁body滚动
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // 菜单容器动画
  const menuContainerVariants = {
    hidden: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  // 菜单项动画
  const menuItemVariants = {
    hidden: {
      x: 20,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30
      }
    }
  };

  // 菜单头部动画
  const menuHeaderVariants = {
    hidden: {
      y: -20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: 0.1
      }
    }
  };

  // 菜单底部动画
  const menuFooterVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: 0.2
      }
    }
  };

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            background: theme === 'dark'
              ? 'rgba(18, 18, 30, 0.85)'
              : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
            boxShadow: theme === 'dark'
              ? '0 4px 30px rgba(0, 0, 0, 0.2)'
              : '0 4px 30px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease-in-out',
            display: { xs: 'block', md: 'none' },
            zIndex: 1201
          }}
        >
          <Container maxWidth="lg" disableGutters>
            <Toolbar
              sx={{
                py: isCompact ? 0.5 : 1,
                px: 2,
                transition: 'padding 0.3s ease'
              }}
            >
              {/* Logo */}
              <LogoAvatar size="small" animate={false} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                <ThemeToggle size="small" />
                <LanguageSelector />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconButton
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{
                      ml: 1,
                      width: 40,
                      height: 40,
                      borderRadius: '12px',
                      backgroundColor: theme === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.05)',
                      '&:hover': {
                        backgroundColor: theme === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    <FiMenu size={24} />
                  </IconButton>
                </motion.div>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      {/* 背景黑色遮罩 */}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: 1300,
          backdropFilter: 'blur(4px)'
        }}
        open={drawerOpen}
        onClick={handleDrawerToggle}
      />

      {/* 侧边菜单 */}
      <AnimatePresence>
        {drawerOpen && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '360px',
              zIndex: 1400,
              display: { xs: 'block', md: 'none' }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuContainerVariants}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: theme === 'dark'
                  ? 'rgba(22, 22, 35, 0.98)'
                  : 'rgba(255, 255, 255, 0.98)',
                backgroundImage: theme === 'dark'
                  ? 'radial-gradient(at 100% 0%, rgba(120, 40, 200, 0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(0, 223, 216, 0.15) 0px, transparent 50%)'
                  : 'radial-gradient(at 100% 0%, rgba(0, 112, 243, 0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(0, 223, 216, 0.1) 0px, transparent 50%)',
                boxShadow: theme === 'dark'
                  ? '-5px 0 30px rgba(0, 0, 0, 0.5)'
                  : '-5px 0 30px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* 菜单头部 */}
              <motion.div
                variants={menuHeaderVariants}
                style={{
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: theme === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.06)'
                    : '1px solid rgba(0, 0, 0, 0.06)'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {t('header.menu')}
                </Typography>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    onClick={handleDrawerToggle}
                    aria-label="close menu"
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '12px',
                      backgroundColor: theme === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.05)',
                      '&:hover': {
                        backgroundColor: theme === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    <FiX size={24} />
                  </IconButton>
                </motion.div>
              </motion.div>

              {/* 菜单项 */}
              <Box
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                {routes.map((route, index) => (
                  <motion.div key={route.path} variants={menuItemVariants}>
                    <Box
                      component={Link}
                      to={route.path}
                      onClick={handleDrawerToggle}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        mb: 1,
                        borderRadius: '16px',
                        textDecoration: 'none',
                        color: 'text.primary',
                        fontWeight: isActive(route.path) ? 600 : 400,
                        backgroundColor: isActive(route.path)
                          ? theme === 'dark'
                            ? 'rgba(160, 160, 255, 0.1)'
                            : 'rgba(80, 80, 255, 0.05)'
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: theme === 'dark'
                            ? 'rgba(255, 255, 255, 0.07)'
                            : 'rgba(0, 0, 0, 0.04)',
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 'inherit' }}>
                        {route.label}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isActive(route.path) && (
                          <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: theme === 'dark' ? '#a0a0ff' : '#5050ff',
                            mr: 1
                          }} />
                        )}
                        <FiChevronRight
                          size={18}
                          opacity={isActive(route.path) ? 1 : 0.5}
                          color={isActive(route.path) ? (theme === 'dark' ? '#a0a0ff' : '#5050ff') : undefined}
                        />
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              {/* 菜单底部 */}
              <motion.div
                variants={menuFooterVariants}
                style={{
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: theme === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.06)'
                    : '1px solid rgba(0, 0, 0, 0.06)'
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '0.8rem',
                    fontWeight: 500
                  }}
                >
                  {t('common.themeAndLang')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ThemeToggle />
                  <LanguageSelector />
                </Box>
              </motion.div>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
