import { alpha, Theme } from '@mui/material';

/**
 * 获取导航栏AppBar样式 - 玻璃药丸悬浮效果
 * 改进粘性跟随行为和过渡效果
 */
export const getAppBarStyles = (
  theme: 'light' | 'dark',
  muiTheme: Theme,
  state: {
    isSticky: boolean;
    isVisible: boolean;
    isCompact: boolean;
  }
) => {
  const { isSticky, isVisible, isCompact } = state;

  // 透明度动态计算
  const bgOpacity = isCompact ? (theme === 'dark' ? 0.9 : 0.95) : (theme === 'dark' ? 0.6 : 0.7);
  // 圆角动态计算
  const borderRadius = isCompact ? '0 0 24px 24px' : '30px';

  return {
    // 背景和模糊
    background: alpha(
      theme === 'dark' ? muiTheme.palette.background.paper : muiTheme.palette.background.default,
      bgOpacity
    ),
    backdropFilter: 'blur(20px)',
    borderRadius,

    // 定位和变换
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    margin: isCompact ? 0 : '16px auto',
    maxWidth: isCompact ? '100%' : 'calc(100% - 32px)',
    transform: isVisible
      ? 'translateY(0)'
      : 'translateY(-100%)',

    // 视觉效果
    boxShadow: isCompact
      ? theme === 'dark'
        ? '0 8px 20px rgba(0, 0, 0, 0.35)'
        : '0 8px 20px rgba(0, 0, 0, 0.12)'
      : theme === 'dark'
        ? '0 12px 24px rgba(0, 0, 0, 0.3)'
        : '0 12px 24px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${alpha(
      theme === 'dark'
        ? muiTheme.palette.common.white
        : muiTheme.palette.common.black,
      theme === 'dark' ? 0.05 : 0.03
    )}`,

    // 高亮边缘
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: `linear-gradient(90deg,
        transparent 0%,
        ${alpha(
          theme === 'dark'
            ? muiTheme.palette.common.white
            : muiTheme.palette.primary.main,
          theme === 'dark' ? 0.1 : 0.15
        )} 50%,
        transparent 100%
      )`,
      zIndex: 2,
      opacity: isCompact ? 1 : 0.5,
    },

    // 动画和性能
    transition: 'all 0.3s cubic-bezier(0.33, 1, 0.68, 1)',
    willChange: 'transform, backdrop-filter, background-color',
    zIndex: 1100,
  };
};

/**
 * 获取桌面导航链接样式
 */
export const getDesktopNavLinkStyles = (active: boolean) => ({
  mx: 0.5,
  py: 1.5,
  fontWeight: active ? 600 : 500,
  letterSpacing: '0.3px',
  fontSize: '0.95rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  borderRadius: '18px',
  minWidth: 0,
  '&:hover': {
    backgroundColor: 'transparent',
  },
  paddingBottom: '10px',
  marginBottom: '2px',
});

/**
 * 获取移动端导航链接样式
 */
export const getMobileNavLinkStyles = (active: boolean, theme: Theme, color: string) => ({
  borderRadius: 2,
  my: 0.5,
  '&.Mui-selected': {
    backgroundColor: alpha(color, 0.1),
    color: color,
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: '60%',
      backgroundColor: color,
      borderRadius: '4px',
      boxShadow: `0 0 8px ${color}`,
    }
  },
  '&:hover': {
    backgroundColor: alpha(color, 0.05),
  }
});
