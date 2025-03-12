import React, { useState, useEffect, useCallback } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton as MuiIconButton,
  Slide,
  useScrollTrigger,
  Backdrop,
  Fab,
  Zoom,
  Portal
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiMenu, FiX, FiChevronRight, FiArrowUp } from 'react-icons/fi';
import ThemeToggle from '../../ui/ThemeToggle';
import LanguageSelector from '../../ui/LanguageSelector';
import AnimatedLink from '../../ui/common/AnimatedLink';
import LogoAvatar from '../../ui/LogoAvatar';
import { useTranslation } from 'react-i18next';
import { alpha as muiAlpha } from '@mui/material/styles';
import IconButton from '../../ui/common/IconButton';
import MobileDrawer from './MobileDrawer';

interface NavRoute {
  path: string;
  label: string;
}

interface NavbarProps {
  routes: NavRoute[];
  isActive: (path: string) => boolean;
  isCompact?: boolean;
}

// 修改getUnifiedButtonStyle函数，确保内容居中
const getUnifiedButtonStyle = (isDark: boolean) => ({
  width: 40,
  height: 40,
  borderRadius: '12px',
  backgroundColor: isDark ? 'rgba(30, 30, 40, 0.7)' : 'rgba(245, 245, 250, 0.7)',
  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
  backdropFilter: 'blur(4px)',
  boxShadow: isDark
    ? '0 2px 8px rgba(0, 0, 0, 0.2)'
    : '0 2px 8px rgba(0, 0, 0, 0.05)',
  padding: 0,
  margin: '0 4px',
  transition: 'all 0.3s ease',
  display: 'flex',             // 确保内容居中显示
  alignItems: 'center',        // 垂直居中
  justifyContent: 'center',    // 水平居中
  '&:hover': {
    backgroundColor: isDark ? 'rgba(40, 40, 60, 0.85)' : 'rgba(255, 255, 255, 0.9)',
    transform: 'translateY(-2px)',
    boxShadow: isDark
      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.1)'
  }
});

// 优化背景遮罩的动画变体
const backdropVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1] // 使用与其他元素相同的缓动曲线
    }
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }
};

/**
 * 移动导航栏组件
 */
const MobileNavbar: React.FC<NavbarProps> = ({ routes, isActive, isCompact = false }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();

  // 新增：跟踪滚动位置，决定是否显示回到顶部按钮
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 检测滚动，用于决定是否隐藏导航栏和显示回到顶部按钮
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  // 新增：监听滚动，控制回到顶部按钮显示
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300); // 滚动超过300px显示按钮
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 新增：回到顶部函数
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // 处理抽屉打开关闭
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);

    // 如果是关闭抽屉，延迟一点再解锁滚动，以便动画能够完成
    if (drawerOpen) {
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 400); // 与动画持续时间相匹配
    } else {
      document.body.style.overflow = 'hidden';
    }
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

  // 修改锁定/解锁body滚动的逻辑，使用状态改变的回调
  useEffect(() => {
    // 只在打开时立即锁定，关闭时的解锁已经在handleDrawerToggle中处理
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // 组件卸载时确保解锁
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // 菜单容器动画变体
  const menuContainerVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        delayChildren: 0.2,
        staggerChildren: 0.08
      }
    }
  };

  // 链接内部图标动画变体
  const chevronVariants = {
    initial: { opacity: 0, x: -5 },
    hover: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  // 菜单项变体
  const menuItemVariants = {
    initial: {
      opacity: 0,
      x: 20
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.06,
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    })
  };

  // 链接hover变体
  const linkHoverVariants = {
    initial: {
      x: 0
    },
    hover: {
      x: 8,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  // 改进菜单图标的动画变体
  const menuIconVariants = {
    closed: {
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    open: {
      rotate: 180,
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
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
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          background: theme === 'dark'
            ? 'rgba(18, 18, 30, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
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
              transition: 'padding 0.3s ease',
              gap: 1
            }}
          >
            {/* Logo */}
            <LogoAvatar size="small" animate={false} />

            {/* 右侧按钮组 */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              ml: 'auto',
              gap: 1.5
            }}>
              {/* 主题切换按钮 */}
              <ThemeToggle size="small" />

              {/* 语言切换按钮 */}
              <LanguageSelector size="small" />

              {/* 菜单按钮 */}
              <IconButton
                icon={drawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                onClick={handleDrawerToggle}
                ariaLabel={drawerOpen ? "close drawer" : "open drawer"}
                size="small"
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 占位符 - 补偿固定定位导航栏的高度 */}
      <Box sx={{ height: { xs: 56, sm: 64 } }} />

      {/* 背景遮罩 - 使用Portal避免白屏 */}
      <Portal>
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1300,
                background: theme === 'dark'
                  ? 'rgba(0, 0, 0, 0.5)'
                  : 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
              onClick={handleDrawerToggle}
            />
          )}
        </AnimatePresence>
      </Portal>

      {/* 侧边菜单 - 使用Portal避免白屏 */}
      <Portal>
        <AnimatePresence mode="wait">
          {drawerOpen && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                maxWidth: '85%',
                zIndex: 1400,
                display: { xs: 'block', md: 'none' },
                '@media (min-width: 500px)': {
                  maxWidth: '380px'
                }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                variants={menuContainerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, rgba(25, 25, 35, 0.98), rgba(35, 35, 45, 0.98))'
                    : 'linear-gradient(135deg, rgba(250, 250, 255, 0.98), rgba(240, 240, 250, 0.98))',
                  boxShadow: theme === 'dark'
                    ? '0 0 20px rgba(0, 0, 0, 0.5)'
                    : '0 0 20px rgba(0, 0, 0, 0.1)',
                  borderLeft: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                  backdropFilter: 'blur(10px)',
                  overflow: 'hidden',
                  zIndex: 1400
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
                    <MuiIconButton
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
                    </MuiIconButton>
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
                    <motion.div
                      key={route.path}
                      custom={index}
                      variants={{
                        initial: menuItemVariants.initial,
                        visible: menuItemVariants.visible(index)
                      }}
                      whileHover={{
                        scale: 1.03,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial="initial"
                      animate="visible"
                    >
                      <AnimatedLink
                        to={route.path}
                        onClick={handleDrawerToggle}
                        active={isActive(route.path)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          py: 1.8,
                          px: 3,
                          my: 0.5,
                          fontSize: '1.1rem',
                          fontWeight: isActive(route.path) ? 600 : 400,
                          borderRadius: '12px',
                          color: isActive(route.path)
                            ? theme === 'dark' ? '#a0a0ff' : '#5050ff'
                            : theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
                          backgroundColor: isActive(route.path)
                            ? theme === 'dark' ? 'rgba(80, 80, 255, 0.15)' : 'rgba(80, 80, 255, 0.08)'
                            : 'transparent',
                          transition: 'all 0.2s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': isActive(route.path) ? {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '4px',
                            height: '60%',
                            borderRadius: '0 4px 4px 0',
                            backgroundColor: theme === 'dark' ? '#a0a0ff' : '#5050ff',
                          } : {},
                          '&:hover': {
                            backgroundColor: muiAlpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.2 : 0.1),
                            color: muiTheme.palette.primary.main,
                            boxShadow: theme === 'dark'
                              ? '0 4px 8px rgba(0, 0, 0, 0.2)'
                              : '0 4px 8px rgba(0, 0, 0, 0.05)'
                          }
                        }}
                      >
                        <motion.div variants={linkHoverVariants}>
                          {route.label}
                        </motion.div>
                        <motion.div variants={chevronVariants}>
                          <FiChevronRight size={16} />
                        </motion.div>
                      </AnimatedLink>
                    </motion.div>
                  ))}
                </Box>

                {/* 菜单底部 */}
                <motion.div
                  variants={menuFooterVariants}
                  style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'flex-end', // 改为靠右对齐
                    alignItems: 'center',
                    borderTop: theme === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.06)'
                      : '1px solid rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ThemeToggle />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LanguageSelector />
                    </motion.div>
                  </Box>
                </motion.div>
              </motion.div>
            </Box>
          )}
        </AnimatePresence>
      </Portal>

      {/* 新增：回到顶部按钮 - 使用motion组件增强动画效果 */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 1000
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 360,
                transition: { rotate: { duration: 0.5 } }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Fab
                color="primary"
                size="small"
                aria-label="scroll back to top"
                onClick={scrollToTop}
                sx={{
                  backgroundColor: theme === 'dark'
                    ? 'rgba(80, 80, 255, 0.9)'
                    : 'rgba(80, 80, 255, 0.8)',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: theme === 'dark'
                      ? 'rgba(100, 100, 255, 1)'
                      : 'rgba(70, 70, 240, 0.9)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                <FiArrowUp />
              </Fab>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
