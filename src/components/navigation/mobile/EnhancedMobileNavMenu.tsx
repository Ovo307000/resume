import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  List,
  alpha,
  useTheme as useMuiTheme,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography
} from '@mui/material';
import { motion, AnimatePresence, useMotionValue, PanInfo } from 'framer-motion';
import { FiX, FiChevronRight, FiMove, FiArrowUp, FiArrowDown, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import LanguageSelector from '../../ui/language/LanguageSelector';
import ThemeToggle from '../../ui/ThemeToggle';
import { useTranslation } from 'react-i18next';
import { getNavTitles } from '../common/routes';
import IconButton from '../../ui/common/IconButton';

interface NavRoute {
  path: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

interface EnhancedMobileNavMenuProps {
  routes: NavRoute[];
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  showLanguageSelector?: boolean;
  isActive: (path: string) => boolean;
}

/**
 * 增强版移动端导航菜单组件
 * 添加动画效果、改进的悬停样式和明确的视觉层次结构
 * 添加拖拽功能，菜单可拖动调整位置，并显示拖拽位置预览
 */
const EnhancedMobileNavMenu: React.FC<EnhancedMobileNavMenuProps> = ({
  routes,
  mobileOpen,
  handleDrawerToggle,
  showLanguageSelector = true,
  isActive
}) => {
  const muiTheme = useMuiTheme();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  const navTitles = getNavTitles();

  // 拖拽位置状态
  const [menuPosition, setMenuPosition] = useState({
    top: 70,
    right: 10,
    left: undefined as number | undefined,
    alignRight: true
  });

  // 拖拽相关的状态
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const dragOriginRef = useRef({ x: 0, y: 0 });

  // 拖拽方向指示
  const [dragDirection, setDragDirection] = useState<string | null>(null);

  // 拖拽预览位置
  const [previewPosition, setPreviewPosition] = useState<{
    top: number;
    right?: number;
    left?: number;
    opacity: number;
  }>({ top: 0, right: 0, opacity: 0 });

  // 计算当前窗口边界
  const windowBounds = useRef({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // 获取窗口尺寸
  useEffect(() => {
    const updateDimensions = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const menuHeight = Math.min(windowHeight - 100, routes.length * 50 + 200);
      const initialTop = Math.max(70, windowHeight - menuHeight - 20);

      windowBounds.current = {
        width: windowWidth,
        height: windowHeight
      };

      // 根据当前位置更新菜单位置
      if (menuPosition.alignRight) {
        setMenuPosition(prev => ({
          ...prev,
          top: initialTop,
          right: 10,
          left: undefined
        }));
      } else {
        setMenuPosition(prev => ({
          ...prev,
          top: initialTop,
          right: undefined,
          left: prev.left || 10
        }));
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [routes.length, menuPosition.alignRight]);

  // 处理拖拽开始
  const handleDragStart = () => {
    setIsDragging(true);
    // 记录拖拽起始位置
    dragOriginRef.current = {
      x: menuPosition.alignRight
        ? windowBounds.current.width - (menuPosition.right || 10)
        : menuPosition.left || 10,
      y: menuPosition.top
    };

    // 初始化预览位置
    setPreviewPosition({
      top: menuPosition.top,
      right: menuPosition.alignRight ? (menuPosition.right || 10) : undefined,
      left: menuPosition.alignRight ? undefined : (menuPosition.left || 10),
      opacity: 0.7
    });
  };

  // 处理拖拽中
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // 计算新位置
    const newX = dragOriginRef.current.x + info.offset.x;
    const newY = dragOriginRef.current.y + info.offset.y;

    // 边界检查
    const menuWidth = 320; // 菜单最大宽度
    const menuHeight = 500; // 估计高度

    // 确保不超出屏幕边界
    const boundedX = Math.min(Math.max(newX, 10), windowBounds.current.width - 10);
    const boundedY = Math.min(Math.max(newY, 10), windowBounds.current.height - menuHeight);

    // 判断是在屏幕左侧还是右侧
    const isAlignRight = boundedX > windowBounds.current.width / 2;

    // 判断拖拽主要方向
    if (Math.abs(info.velocity.x) > Math.abs(info.velocity.y)) {
      // 水平拖拽为主
      setDragDirection(info.velocity.x > 0 ? 'right' : 'left');
    } else {
      // 垂直拖拽为主
      setDragDirection(info.velocity.y > 0 ? 'down' : 'up');
    }

    // 更新预览位置
    setPreviewPosition({
      top: boundedY,
      right: isAlignRight ? windowBounds.current.width - boundedX : undefined,
      left: isAlignRight ? undefined : boundedX,
      opacity: 0.7
    });
  };

  // 处理拖拽结束
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    setDragDirection(null);

    // 计算新位置
    const newX = dragOriginRef.current.x + info.offset.x;
    const newY = dragOriginRef.current.y + info.offset.y;

    // 边界检查
    const menuWidth = 320; // 菜单最大宽度
    const menuHeight = 500; // 估计高度

    // 确保不超出屏幕边界
    const boundedX = Math.min(Math.max(newX, 10), windowBounds.current.width - 10);
    const boundedY = Math.min(Math.max(newY, 10), windowBounds.current.height - menuHeight);

    // 判断是在屏幕左侧还是右侧
    const isAlignRight = boundedX > windowBounds.current.width / 2;

    // 更新位置
    if (isAlignRight) {
      setMenuPosition({
        top: boundedY,
        right: windowBounds.current.width - boundedX,
        left: undefined,
        alignRight: true
      });
    } else {
      setMenuPosition({
        top: boundedY,
        right: undefined,
        left: boundedX,
        alignRight: false
      });
    }

    // 隐藏预览
    setPreviewPosition(prev => ({ ...prev, opacity: 0 }));

    // 重置拖拽状态
    dragX.set(0);
    dragY.set(0);
  };

  // 动画变体
  const menuItemVariants = {
    hidden: {
      opacity: 0,
      x: 30,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }),
    exit: {
      opacity: 0,
      x: 30,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  // 工具按钮动画变体
  const toolbarItemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + (i * 0.1),
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    })
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  // 自定义卡片菜单样式
  const menuStyle = {
    maxWidth: '320px',
    width: '85%',
    background: isDark
      ? 'linear-gradient(135deg, rgba(18, 18, 30, 0.95), rgba(15, 15, 25, 0.98))'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 250, 0.98))',
    backdropFilter: 'blur(15px)',
    boxShadow: isDark
      ? '0 8px 25px rgba(0, 0, 0, 0.5)'
      : '0 8px 25px rgba(0, 0, 0, 0.15)',
    border: 'none',
    overflow: 'hidden',
    borderRadius: '16px',
    cursor: isDragging ? 'grabbing' : 'grab'
  };

  // 预览样式
  const previewStyle = {
    position: 'fixed' as 'fixed',
    top: previewPosition.top,
    right: previewPosition.right,
    left: previewPosition.left,
    width: '320px',
    height: '500px',
    background: isDark
      ? 'rgba(30, 30, 50, 0.3)'
      : 'rgba(200, 200, 255, 0.3)',
    borderRadius: '16px',
    pointerEvents: 'none',
    zIndex: 1100,
    boxShadow: isDark
      ? '0 0 20px rgba(100, 100, 255, 0.2)'
      : '0 0 20px rgba(100, 100, 255, 0.3)',
    border: '2px dashed',
    borderColor: isDark
      ? 'rgba(150, 150, 255, 0.4)'
      : 'rgba(100, 100, 255, 0.4)',
    opacity: previewPosition.opacity,
    transition: 'opacity 0.3s ease, top 0.1s ease, left 0.1s ease, right 0.1s ease'
  };

  // 拖拽方向指示器样式
  const getDirectionIcon = () => {
    switch(dragDirection) {
      case 'up': return <FiArrowUp size={24} />;
      case 'down': return <FiArrowDown size={24} />;
      case 'left': return <FiArrowLeft size={24} />;
      case 'right': return <FiArrowRight size={24} />;
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1200
          }}
          onClick={handleDrawerToggle}
        >
          {/* 位置预览组件 */}
          {isDragging && (
            <Box style={previewStyle}>
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: isDark ? 'rgba(200, 200, 255, 0.6)' : 'rgba(100, 100, 255, 0.6)'
              }}>
                <FiMove size={32} />
                {getDirectionIcon()}
              </Box>
            </Box>
          )}

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag
            dragMomentum={false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{
              position: 'fixed',
              top: menuPosition.top,
              right: menuPosition.right,
              left: menuPosition.left,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: `calc(100vh - ${menuPosition.top + 20}px)`,
              x: dragX,
              y: dragY,
              ...menuStyle
            }}
          >
            {/* 顶部区域：标题和关闭按钮 */}
            <Box
              sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                cursor: isDragging ? 'grabbing' : 'grab',
                '&:active': {
                  cursor: 'grabbing'
                }
              }}
              className="drag-handle"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FiMove size={16} style={{ opacity: isDragging ? 0.9 : 0.5 }} />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    color: isDark ? 'white' : 'text.primary'
                  }}
                >
                  {navTitles.menu} {isDragging && <span style={{fontSize: '0.8em', opacity: 0.7}}>拖拽中...</span>}
                </Typography>
              </Box>

              {/* 关闭按钮 - 使用统一的IconButton组件 */}
              <IconButton
                onClick={handleDrawerToggle}
                icon={<FiX size={20} />}
                size="small"
                tooltipText={t('common.close')}
                ariaLabel="关闭菜单"
              />
            </Box>

            <Divider sx={{
              mb: 2,
              opacity: 0.6,
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)'
            }} />

            {/* 导航链接 - 使用滚动容器 */}
            <Box sx={{ overflowY: 'auto', maxHeight: '65vh' }}>
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
                        onClick={handleDrawerToggle}
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
                            : isDark ? '#fff' : '#000',
                          '&:hover': {
                            backgroundColor: alpha(routeColor, isDark ? 0.1 : 0.05),
                            transform: 'translateX(5px)',
                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          pl: active ? 3 : 2,
                          '&::before': active ? {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '4px',
                            height: '60%',
                            backgroundColor: routeColor,
                            borderRadius: '0 4px 4px 0',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          } : {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '0px',
                            height: '60%',
                            backgroundColor: routeColor,
                            borderRadius: '0 4px 4px 0',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          }
                        }}
                      >
                        {route.icon && (
                          <ListItemIcon
                            sx={{
                              color: active ? routeColor : isDark ? '#fff' : '#000',
                              minWidth: '40px',
                              transition: 'color 0.3s ease'
                            }}
                          >
                            {route.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={route.label}
                          primaryTypographyProps={{
                            fontWeight: active ? 600 : 400,
                            fontSize: '1rem',
                            transition: 'font-weight 0.3s ease'
                          }}
                        />
                        <Box
                          component={motion.div}
                          animate={{
                            opacity: active ? 1 : 0.4,
                            x: active ? 0 : -5
                          }}
                          transition={{
                            duration: 0.3,
                            ease: 'easeInOut'
                          }}
                        >
                          <FiChevronRight
                            size={18}
                            style={{
                              color: active ? routeColor : isDark ? '#fff' : '#000'
                            }}
                          />
                        </Box>
                      </ListItem>
                    </motion.div>
                  );
                })}
              </List>
            </Box>

            <Divider sx={{
              mt: 2,
              mb: 2,
              opacity: 0.6,
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)'
            }} />

            {/* 底部工具栏 - 无需Settings标题 */}
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <motion.div
                custom={0}
                variants={toolbarItemVariants}
                initial="hidden"
                animate="visible"
              >
                <ThemeToggle />
              </motion.div>

              {showLanguageSelector && (
                <motion.div
                  custom={1}
                  variants={toolbarItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <LanguageSelector size="small" variant="icon" />
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
