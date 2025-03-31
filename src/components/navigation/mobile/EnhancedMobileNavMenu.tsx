import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronRight, FiSun, FiMoon } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import LanguageSelector from '../../ui/language/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { getNavTitles } from '../common/routes';
import { NavRoute } from '../common/types';
import AnimatedIconButton from '../../ui/common/AnimatedIconButton';
import {
  getDividerStyle,
  getBackdropStyle,
  menuItemVariants,
  toolbarItemVariants,
  backdropVariants,
  shimmerKeyframes
} from '../common/NavStyles';
import { alpha } from '@mui/material/styles';

interface EnhancedMobileNavMenuProps {
  routes: NavRoute[];
  open: boolean;
  onClose: () => void;
  showLanguageSelector?: boolean;
  isActive: (path: string) => boolean;
}

/**
 * 增强版移动端导航菜单组件
 */
const EnhancedMobileNavMenu: React.FC<EnhancedMobileNavMenuProps> = ({
  routes,
  open,
  onClose,
  showLanguageSelector = true,
  isActive
}) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  const navTitles = getNavTitles();

  // 在菜单打开时锁定页面滚动
  React.useEffect(() => {
    if (open) {
      // 锁定滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 恢复滚动
      document.body.style.overflow = '';
    }
    // 在组件卸载时清理
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // 简化菜单关闭逻辑 - 只有明确点击关闭按钮或导航项才关闭
  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    // 简单关闭菜单，不再通过冒泡或其他方式触发
    onClose();
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          style={{
            ...getBackdropStyle(),
            touchAction: 'none', // 禁用触摸事件
            WebkitOverflowScrolling: 'auto', // 正确的值应该是 'auto' 或 'touch'，不是 'none'
          }}
          onClick={(e) => {
            e.stopPropagation();
            // 只有直接点击背景才关闭
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            onClick={(e) => {
              // 强制阻止事件冒泡，防止菜单立即关闭
              e.stopPropagation();
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 50,
              transition: {
                duration: 0.3,
                ease: [0.32, 0.72, 0, 1]
              }
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              delayChildren: 0.1,
              staggerChildren: 0.05
            }}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              transform: 'none',
              display: 'flex',
              flexDirection: 'column',
              width: '300px',
              maxHeight: '85vh',
              maxWidth: '85vw',
              background: isDark
                ? 'linear-gradient(135deg, rgba(18, 18, 30, 0.95), rgba(15, 15, 25, 0.98))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 250, 0.98))',
              backdropFilter: 'blur(15px)',
              boxShadow: isDark
                ? '0 8px 25px rgba(0, 0, 0, 0.5), 0 0 10px rgba(100, 100, 255, 0.3)'
                : '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 10px rgba(100, 100, 255, 0.2)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '16px',
              overflow: 'hidden',
              zIndex: 1300
            }}
          >
            {/* 顶部区域：标题和关闭按钮 */}
            <Box
              sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  color: isDark ? 'white' : 'text.primary'
                }}
              >
                {navTitles.menu}
              </Typography>

              {/* 关闭按钮 - 使用新的AnimatedIconButton */}
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
                  onClick={handleClose}
                  icon={<FiX size={20} color={isDark ? "#F87171" : "#EF4444"} />}
                  size="medium"
                  variant="glass"
                  tooltipText={t('common.close')}
                  ariaLabel="关闭菜单"
                  style="rounded"
                  sx={{ background: 'transparent', boxShadow: 'none', border: 'none' }}
                />
              </Box>
            </Box>

            <Divider sx={getDividerStyle(isDark ? 'dark' : 'light')} />

            {/* 导航链接 - 使用滚动容器 */}
            <Box sx={{
              overflowY: 'auto',
              maxHeight: '65vh',
              '&::-webkit-scrollbar': {
                width: '6px',
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: isDark
                  ? `linear-gradient(to bottom, ${alpha('#6366F1', 0.8)}, ${alpha('#8B5CF6', 0.6)})`
                  : `linear-gradient(to bottom, ${alpha('#6366F1', 0.7)}, ${alpha('#8B5CF6', 0.5)})`,
                borderRadius: '6px',
                border: isDark
                  ? `1px solid ${alpha('#6366F1', 0.2)}`
                  : `1px solid ${alpha('#6366F1', 0.3)}`,
                boxShadow: isDark ? `0 0 3px ${alpha('#6366F1', 0.3)}` : 'none',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: isDark
                  ? `linear-gradient(to bottom, ${alpha('#6366F1', 0.9)}, ${alpha('#8B5CF6', 0.7)})`
                  : `linear-gradient(to bottom, ${alpha('#6366F1', 0.8)}, ${alpha('#8B5CF6', 0.6)})`,
              },
              scrollbarWidth: 'thin',
              scrollbarColor: isDark
                ? `${alpha('#6366F1', 0.7)} transparent`
                : `${alpha('#6366F1', 0.6)} transparent`,
            }}>
              <List sx={{ px: 2, py: 1 }}>
                {routes.map((route, index) => {
                  const active = isActive(route.path);
                  const routeColor = route.color || (isDark ? '#a0a0ff' : '#5050ff');

                  return (
                    <motion.div
                      key={route.path}
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <ListItem
                        component={Link}
                        to={route.path}
                        onClick={(e) => {
                          // 阻止事件冒泡
                          e.stopPropagation();
                          // 添加短暂延迟再关闭菜单，确保路由跳转平滑
                          setTimeout(() => {
                            handleClose();
                          }, 100);
                        }}
                        sx={{
                          mb: 1.5,
                          py: 1.2,
                          borderRadius: '12px',
                          overflow: 'hidden',
                          position: 'relative',
                          backgroundColor: active
                            ? alpha(routeColor, isDark ? 0.15 : 0.1)
                            : 'transparent',
                          color: active
                            ? routeColor
                            : isDark ? '#E0E0E0' : '#333',
                          '&:hover': {
                            backgroundColor: alpha(routeColor, isDark ? 0.1 : 0.05),
                            color: routeColor,
                            transform: 'translateX(5px)',
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          pl: 2,
                          boxShadow: active
                            ? isDark
                              ? `0 0 10px ${alpha(routeColor, 0.3)}`
                              : `0 0 8px ${alpha(routeColor, 0.2)}`
                            : 'none',
                        }}
                      >
                        {/* 活跃指示器 - 修复位置问题 */}
                        {active && (
                          <Box
                            component={motion.div}
                            layoutId="nav-active-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 35
                            }}
                            sx={{
                              position: 'absolute',
                              left: 0,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: '4px',
                              height: '70%',
                              background: `linear-gradient(to bottom, ${routeColor}, ${
                                isDark ? alpha(routeColor, 0.7) : alpha(routeColor, 0.8)
                              })`,
                              borderRadius: '0 4px 4px 0',
                              boxShadow: `0 0 12px ${alpha(routeColor, 0.6)}`,
                              zIndex: 2,
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: '0 4px 4px 0',
                                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)',
                                backgroundSize: '200% 100%',
                                animation: `${shimmerKeyframes} 2s infinite linear`,
                              }
                            }}
                          />
                        )}

                        {route.icon && (
                          <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, color: 'inherit' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                              {route.icon}
                            </Box>
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={route.label}
                          primaryTypographyProps={{
                            fontWeight: active ? 600 : 500,
                            variant: 'body1'
                          }}
                        />
                        <FiChevronRight size={16} style={{ marginLeft: 'auto', opacity: 0.6 }} />

                        {/* 背景闪光效果 */}
                        {active && (
                          <Box
                            component={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              pointerEvents: 'none',
                              background: `radial-gradient(circle at left center, ${alpha(routeColor, 0.15)}, transparent 70%)`,
                              zIndex: 1
                            }}
                          />
                        )}
                      </ListItem>
                    </motion.div>
                  );
                })}
              </List>
            </Box>

            <Divider sx={getDividerStyle(isDark ? 'dark' : 'light')} />

            {/* 底部工具栏 - 使用新的AnimatedIconButton组件 */}
            <Box sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              backgroundColor: isDark ? 'rgba(15, 15, 25, 0.4)' : 'rgba(245, 245, 250, 0.4)'
            }}>
              <motion.div
                custom={0}
                variants={toolbarItemVariants}
                initial="hidden"
                animate="visible"
              >
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
                    },
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <AnimatedIconButton
                    onClick={toggleTheme}
                    icon={isDark ? <FiSun size={20} color="#FDB813" /> : <FiMoon size={20} color="#5C6BC0" />}
                    size="medium"
                    variant="glass"
                    color="primary"
                    tooltipText={t('common.themeToggle')}
                    ariaLabel={t('common.themeToggle')}
                    sx={{ background: 'transparent', boxShadow: 'none', border: 'none', minWidth: 'auto', p: 0 }}
                  />
                </Box>
              </motion.div>

              {showLanguageSelector && (
                <motion.div
                  custom={1}
                  variants={toolbarItemVariants}
                  initial="hidden"
                  animate="visible"
                >
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
                      },
                      width: '42px',
                      height: '42px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <LanguageSelector
                      size="small"
                      sx={{ background: 'transparent', boxShadow: 'none', border: 'none', minWidth: 'auto', p: 0 }}
                    />
                  </Box>
                </motion.div>
              )}
            </Box>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedMobileNavMenu;
