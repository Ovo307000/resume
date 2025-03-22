import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// 创建与 Tailwind 配置一致的主题，强化暗色模式支持
export const getThemeOptions = (mode: PaletteMode): ThemeOptions => {
  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // 亮色模式 - 更新为新的配色方案
            primary: {
              light: '#6366F1',  // 更亮的蓝紫色
              main: '#4F46E5',   // 靛蓝色
              dark: '#4338CA',   // 深靛蓝色
              contrastText: '#ffffff',
            },
            secondary: {
              light: '#A78BFA', // 淡紫色
              main: '#8B5CF6',  // 紫色
              dark: '#7C3AED',  // 深紫色
              contrastText: '#ffffff',
            },
            error: {
              main: '#EF4444',   // 红色
            },
            info: {
              main: '#3B82F6',   // 蓝色
            },
            background: {
              default: '#ffffff',
              paper: '#ffffff',
            },
            text: {
              primary: '#1f2937',  // 深灰色
              secondary: '#4b5563', // 中灰色
            },
            divider: 'rgba(0, 0, 0, 0.12)',
          }
        : {
            // 暗色模式 - 优化暗色调色板
            primary: {
              light: '#818CF8', // 更亮的蓝紫色
              main: '#6366F1',  // 蓝紫色
              dark: '#4F46E5',  // 靛蓝色
              contrastText: '#ffffff',
            },
            secondary: {
              light: '#C4B5FD', // 更亮的紫色
              main: '#A78BFA',  // 紫色
              dark: '#8B5CF6',  // 深紫色
              contrastText: '#ffffff',
            },
            error: {
              main: '#F87171', // 更亮的红色
              dark: '#EF4444',
            },
            info: {
              main: '#60A5FA', // 更亮的蓝色
              dark: '#3B82F6',
            },
            background: {
              // 更新背景颜色为更深的黑色
              default: '#121212',  // 深黑色
              paper: '#1E1E1E',    // 稍亮的黑色
            },
            text: {
              // 更新文本颜色以提高暗色模式下的可读性
              primary: '#e5e7eb',  // 亮灰色
              secondary: '#9ca3af', // 中灰色
            },
            divider: 'rgba(255, 255, 255, 0.12)',
            action: {
              // 优化交互状态颜色
              active: '#6366F1',
              hover: 'rgba(99, 102, 241, 0.08)',
              selected: 'rgba(99, 102, 241, 0.16)',
              disabled: 'rgba(255, 255, 255, 0.3)',
              disabledBackground: 'rgba(255, 255, 255, 0.12)',
            },
          }),
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      // 调整暗色模式的文字颜色
      ...(mode === 'dark' && {
        h1: { color: '#e5e7eb' },
        h2: { color: '#e5e7eb' },
        h3: { color: '#e5e7eb' },
        h4: { color: '#e5e7eb' },
        h5: { color: '#e5e7eb' },
        h6: { color: '#e5e7eb' },
        subtitle1: { color: '#d1d5db' },
        subtitle2: { color: '#d1d5db' },
        body1: { color: '#9ca3af' },
        body2: { color: '#9ca3af' },
      }),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }),
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '0.75rem', // 增加圆角
            fontWeight: 500,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            ...(mode === 'dark' && {
              color: '#e5e7eb',
            }),
          },
          outlined: {
            ...(mode === 'dark' && {
              borderColor: 'rgba(255, 255, 255, 0.23)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.4)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              },
            }),
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
          contained: {
            boxShadow: mode === 'dark'
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'dark'
                ? '0 6px 12px -1px rgba(0, 0, 0, 0.3)'
                : '0 6px 12px -1px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '1rem', // 增加圆角
            boxShadow: mode === 'light'
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            ...(mode === 'dark' && {
              backgroundColor: '#1E1E1E',
            }),
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'light'
                ? '0 15px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)'
                : '0 15px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '0.75rem', // 统一圆角
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            ...(mode === 'dark' && {
              backgroundColor: '#1E1E1E',
            }),
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            backdropFilter: 'blur(10px)', // 添加模糊效果
            ...(mode === 'dark' && {
              backgroundColor: 'rgba(18, 18, 18, 0.8)',
            }),
            ...(mode === 'light' && {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }),
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '8px', // 更圆润的圆角
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            ...(mode === 'dark' && {
              color: '#e5e7eb',
            }),
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
            },
          },
          outlined: {
            ...(mode === 'dark' && {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            }),
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            ...(mode === 'dark' && {
              color: '#e5e7eb',
            }),
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: mode === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.04)',
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            transition: 'color 0.2s ease',
            ...(mode === 'dark' && {
              color: '#818CF8', // 更新为新的配色
              '&:hover': {
                color: '#A5B4FC',
              },
            }),
            ...(mode === 'light' && {
              color: '#4F46E5', // 更新为新的配色
              '&:hover': {
                color: '#6366F1',
              },
            }),
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: '1rem', // 增加圆角
            backdropFilter: 'blur(10px)', // 添加模糊效果
            ...(mode === 'dark' && {
              backgroundColor: 'rgba(30, 30, 30, 0.95)',
            }),
            ...(mode === 'light' && {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            }),
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            ...(mode === 'dark' && {
              borderColor: 'rgba(255, 255, 255, 0.12)',
            }),
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: '4px', // 圆角进度条
            ...(mode === 'dark' && {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }),
          },
        },
      },
      // 添加滚动条样式
      MuiCssBaseline: {
        styleOverrides: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            borderRadius: '6px',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '6px',
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
    },
  };
};

// 创建亮色和暗色主题
export const lightTheme = createTheme(getThemeOptions('light'));
export const darkTheme = createTheme(getThemeOptions('dark'));
