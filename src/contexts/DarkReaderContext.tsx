import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Box, Typography, Button, useMediaQuery, Stack, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from './ThemeContext';
import GlassPanel from '../components/ui/glass/GlassPanel';
import { FiAlertCircle, FiCheckCircle, FiX, FiMoon } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface DarkReaderContextType {
  isDarkReaderDetected: boolean;
  showWarning: boolean;
  hideWarning: () => void;
  neverShowAgain: () => void;
  switchToDarkMode: () => void;
}

const DarkReaderContext = createContext<DarkReaderContextType | null>(null);

interface DarkReaderProviderProps {
  children: ReactNode;
}

export const DarkReaderProvider: React.FC<DarkReaderProviderProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isWideScreen = useMediaQuery('(min-width:960px)');
  const [isDarkReaderDetected, setIsDarkReaderDetected] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  // 检测Dark Reader插件
  useEffect(() => {
    const checkDarkReader = () => {
      // 检查本地存储中是否有"neverShowDarkReaderWarning"标记
      const neverShow = localStorage.getItem('neverShowDarkReaderWarning') === 'true';
      if (neverShow) return;

      // 检测方法1: 查找特定CSS规则
      const hasDarkReaderStyle = document.querySelectorAll('style[id*="darkreader"]').length > 0;

      // 检测方法2: 查找特定元素属性
      const hasDarkReaderAttribute = document.documentElement.hasAttribute('data-darkreader-mode');

      // 检测方法3: 查找特定的全局变量或特性
      const hasDarkReaderScript = typeof window.__darkreader !== 'undefined' ||
                                 document.documentElement.classList.contains('darkreader');

      // 如果任何检测方法为true，则认为Dark Reader存在
      const isDarkReaderActive = hasDarkReaderStyle || hasDarkReaderAttribute || hasDarkReaderScript;

      setIsDarkReaderDetected(isDarkReaderActive);
      setShowWarning(isDarkReaderActive);
    };

    // 页面加载后延迟检测，确保Dark Reader有时间应用其样式
    const timer = setTimeout(checkDarkReader, 1500);

    return () => clearTimeout(timer);
  }, []);

  // 隐藏警告
  const hideWarning = () => {
    setShowWarning(false);
  };

  // 永不再显示
  const neverShowAgain = () => {
    localStorage.setItem('neverShowDarkReaderWarning', 'true');
    setShowWarning(false);
  };

  // 切换到暗色模式
  const switchToDarkMode = () => {
    // 如果当前不是暗色模式，则切换到暗色模式
    if (theme !== 'dark') {
      toggleTheme();
    }
    setShowWarning(false);
  };

  // 弹窗动画变体 - 响应式动画效果
  const getNotificationVariants = () => {
    return {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 30
        }
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 }
      }
    };
  };

  // 背景动画变体
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, delay: 0.1 }
    }
  };

  const notificationVariants = getNotificationVariants();

  return (
    <DarkReaderContext.Provider
      value={{
        isDarkReaderDetected,
        showWarning,
        hideWarning,
        neverShowAgain,
        switchToDarkMode
      }}
    >
      {children}

      <AnimatePresence>
        {showWarning && (
          <>
            {/* 移动端显示全屏遮罩和居中弹窗 */}
            {!isWideScreen && (
              <Box
                component={motion.div}
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 9999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme === 'dark'
                    ? 'rgba(0, 0, 0, 0.5)'
                    : 'rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(4px)'
                }}
                onClick={(e) => {
                  // 点击背景关闭弹窗
                  if (e.target === e.currentTarget) {
                    hideWarning();
                  }
                }}
              >
                <Box
                  component={motion.div}
                  variants={notificationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  layoutTransition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  sx={{
                    width: '90%',
                    maxWidth: 320,
                    maxHeight: '80vh',
                    overflow: 'hidden',
                    m: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DarkReaderNotificationContent />
                </Box>
              </Box>
            )}

            {/* 桌面端显示右下角固定弹窗，无遮罩 */}
            {isWideScreen && (
              <Box
                component={motion.div}
                variants={{
                  hidden: { opacity: 0, y: 50, x: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 25
                    }
                  },
                  exit: {
                    opacity: 0,
                    y: 50,
                    transition: { duration: 0.2 }
                  }
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                layoutTransition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                sx={{
                  position: 'fixed',
                  bottom: 32,
                  right: 32,
                  zIndex: 9999,
                  width: 380,
                  maxWidth: 'calc(100vw - 64px)',
                  maxHeight: 'calc(100vh - 64px)',
                  overflow: 'auto'
                }}
              >
                <DarkReaderNotificationContent />
              </Box>
            )}
          </>
        )}
      </AnimatePresence>
    </DarkReaderContext.Provider>
  );
};

// 抽取弹窗内容为独立组件，避免重复代码
const DarkReaderNotificationContent = () => {
  const { theme } = useTheme();
  const { hideWarning, neverShowAgain, switchToDarkMode } = useContext(DarkReaderContext)!;
  const isWideScreen = useMediaQuery('(min-width:960px)');
  const isDarkMode = theme === 'dark';

  // 根据当前主题状态选择合适的提示信息
  const getModeMessage = () => {
    if (isDarkMode) {
      return "看起来您正在使用Dark Reader插件，而本站已经是暗色模式了呢！同时使用可能会导致样式过暗或不协调喵~";
    } else {
      return "喵呜~！我发现您正在使用Dark Reader插件呢！这个插件可能会让页面样式变得有些不协调喵~";
    }
  };

  // 获取按钮文本
  const getSwitchButtonText = () => {
    return isDarkMode
      ? "已经是暗色模式啦"
      : "切换到暗色模式";
  };

  return (
    <GlassPanel
      component={motion.div}
      layout
      intensity="medium"
      variant="elevated"
      sx={{
        p: 0,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: theme === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        height: '100%'
      }}
    >
      {/* 顶部彩色边框 */}
      <Box
        component={motion.div}
        layout
        sx={{
          height: 4,
          width: '100%',
          background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899, #F59E0B)',
          mb: 0.5,
          flexShrink: 0
        }}
      />

      {/* 标题区域 */}
      <Box
        component={motion.div}
        layout
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 2.5 },
          pt: 2,
          pb: 1,
          flexShrink: 0
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexGrow: 1,
          overflow: 'hidden'
        }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6366F1',
              flexShrink: 0
            }}
          >
            <FiAlertCircle size={isWideScreen ? 22 : 20} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: theme === 'dark' ? '#e2e8f0' : '#334155',
            }}
          >
            喵~发现Dark Reader插件了呢！
          </Typography>
        </Box>
        <Box sx={{ flexShrink: 0, ml: 1 }}>
          <Button
            onClick={hideWarning}
            sx={{
              minWidth: 'auto',
              p: 0.5,
              color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
              '&:hover': {
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              },
            }}
          >
            <FiX size={18} />
          </Button>
        </Box>
      </Box>

      {/* 内容区域 - 可滚动 */}
      <Box
        component={motion.div}
        layout
        sx={{
          px: { xs: 2, md: 2.5 },
          pb: 1,
          overflowY: 'auto',
          flexGrow: 1,
          wordBreak: 'break-word',
          whiteSpace: 'normal',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          minHeight: 50,
          maxHeight: isWideScreen ? undefined : 'calc(80vh - 130px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme === 'dark' ? '#cbd5e1' : '#475569',
            lineHeight: 1.6,
            fontSize: { xs: '0.875rem', md: '0.9375rem' }
          }}
        >
          {getModeMessage()}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme === 'dark' ? '#cbd5e1' : '#475569',
            lineHeight: 1.6,
            fontSize: { xs: '0.875rem', md: '0.9375rem' }
          }}
        >
          网站已经内置了暗色模式功能呢！可以通过右上角的主题切换按钮来使用喵~
        </Typography>
        {!isDarkMode && (
          <Typography
            variant="body2"
            sx={{
              color: theme === 'dark' ? '#cbd5e1' : '#475569',
              lineHeight: 1.6,
              fontSize: { xs: '0.875rem', md: '0.9375rem' }
            }}
          >
            要不要尝试一下我们精心设计的暗色模式呢？保证好看哦！
          </Typography>
        )}
      </Box>

      {/* 按钮区域 - 保证始终可见 */}
      <Stack
        component={motion.div}
        layout
        direction={isWideScreen ? "row" : "column"}
        spacing={1}
        sx={{
          p: { xs: 2, md: 2.5 },
          pt: { xs: 1, md: 1.5 },
          flexShrink: 0,
          ...(isWideScreen && { justifyContent: 'flex-end' }),
          backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)',
          borderTop: '1px solid',
          borderColor: theme === 'dark' ? 'rgba(75, 85, 99, 0.1)' : 'rgba(226, 232, 240, 0.5)',
          position: 'relative',
          zIndex: 2,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {isWideScreen ? (
          // 桌面版横向排列按钮
          <>
            <Button
              onClick={hideWarning}
              variant="outlined"
              startIcon={<FiX size={16} />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                color: theme === 'dark' ? '#e2e8f0' : '#334155',
                px: 1.5,
                py: 0.5,
                minHeight: 36,
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                '&:hover': {
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)',
                }
              }}
            >
              知道啦
            </Button>
            <Button
              onClick={neverShowAgain}
              variant="outlined"
              startIcon={<FiCheckCircle size={16} />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                color: theme === 'dark' ? '#e2e8f0' : '#334155',
                px: 1.5,
                py: 0.5,
                minHeight: 36,
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                '&:hover': {
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)',
                }
              }}
            >
              不再提醒
            </Button>
            <Button
              onClick={switchToDarkMode}
              variant={isDarkMode ? "outlined" : "contained"}
              disabled={isDarkMode}
              startIcon={<FiMoon size={16} />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                px: 1.5,
                py: 0.5,
                minHeight: 36,
                fontSize: '0.875rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                ...(isDarkMode
                  ? {
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                      color: theme === 'dark' ? '#e2e8f0' : '#334155',
                    }
                  : {
                      background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #5D63F1, #7F51F6)',
                      }
                    }
                )
              }}
            >
              {getSwitchButtonText()}
            </Button>
          </>
        ) : (
          // 移动版垂直排列按钮 - 移除了条件渲染
          <>
            <Button
              onClick={switchToDarkMode}
              variant={isDarkMode ? "outlined" : "contained"}
              disabled={isDarkMode}
              fullWidth
              startIcon={<FiMoon size={16} />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                px: 1.5,
                py: 0.8,
                minHeight: 40,
                fontSize: '0.875rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                ...(isDarkMode
                  ? {
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                      color: theme === 'dark' ? '#e2e8f0' : '#334155',
                    }
                  : {
                      background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #5D63F1, #7F51F6)',
                      }
                    }
                )
              }}
            >
              {getSwitchButtonText()}
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                onClick={hideWarning}
                variant="outlined"
                fullWidth
                startIcon={<FiX size={16} />}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                  color: theme === 'dark' ? '#e2e8f0' : '#334155',
                  px: 1.5,
                  py: 0.5,
                  minHeight: 36,
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)',
                  }
                }}
              >
                知道啦
              </Button>
              <Button
                onClick={neverShowAgain}
                variant="outlined"
                fullWidth
                startIcon={<FiCheckCircle size={16} />}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                  color: theme === 'dark' ? '#e2e8f0' : '#334155',
                  px: 1.5,
                  py: 0.5,
                  minHeight: 36,
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)',
                  }
                }}
              >
                不再提醒
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </GlassPanel>
  );
};

// 定义window接口，添加__darkreader属性
declare global {
  interface Window {
    __darkreader?: {
      disable: () => void;
      enable: () => void;
      [key: string]: any;
    };
  }
}

// 自定义Hook，用于在组件中使用Dark Reader检测功能
export const useDarkReader = () => {
  const context = useContext(DarkReaderContext);
  if (!context) {
    throw new Error('useDarkReader must be used within a DarkReaderProvider');
  }
  return context;
};

export default DarkReaderProvider;
