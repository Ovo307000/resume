import { alpha, Theme } from '@mui/material';

/**
 * 获取导航栏AppBar样式 - 玻璃悬浮效果
 */
export const getAppBarStyles = (theme: 'light' | 'dark', muiTheme: Theme, scrolled: boolean) => ({
  backgroundColor: scrolled
    ? theme === 'dark'
      ? alpha(muiTheme.palette.background.paper, 0.75)
      : alpha(muiTheme.palette.background.default, 0.75)
    : theme === 'dark'
      ? alpha(muiTheme.palette.background.paper, 0.6)
      : alpha(muiTheme.palette.background.default, 0.6),
  backdropFilter: 'blur(12px)',
  borderRadius: scrolled ? '0 0 24px 24px' : '24px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: scrolled
    ? theme === 'dark'
      ? '0 4px 20px rgba(0, 0, 0, 0.3)'
      : '0 4px 20px rgba(0, 0, 0, 0.1)'
    : theme === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.15)',
  border: `1px solid ${alpha(
    theme === 'dark'
      ? muiTheme.palette.common.white
      : muiTheme.palette.common.black,
    theme === 'dark' ? 0.08 : 0.05
  )}`,
  transform: scrolled ? 'translateY(0)' : 'translateY(15px)',
  maxWidth: scrolled ? '100%' : 'calc(100% - 40px)',
  mx: 'auto',
  padding: scrolled ? '0' : '4px',
  overflow: 'hidden',
});

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
  borderRadius: '12px',
  minWidth: 0,
});

/**
 * 获取移动端导航链接样式
 */
export const getMobileNavLinkStyles = (color: any) => {
  const validColor = typeof color === 'string' ? color : '#000000';
  return {
    borderRadius: 2,
    my: 0.5,
    '&.Mui-selected': {
      backgroundColor: alpha(validColor, 0.1),
      color: validColor,
      '&::after': {
        content: '""',
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '4px',
        height: '60%',
        backgroundColor: validColor,
        borderRadius: '4px',
        boxShadow: `0 0 8px ${validColor}`,
      }
    },
    '&:hover': {
      backgroundColor: alpha(validColor, 0.05),
    }
  };
};
