import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// 创建与 Tailwind 配置一致的主题，强化暗色模式支持
export const getThemeOptions = (mode: PaletteMode): ThemeOptions => {
  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // 亮色模式
            primary: {
              light: '#4F46E5',  // 对应 Tailwind 的 primary.light
              main: '#4338CA',   // 对应 Tailwind 的 primary.DEFAULT
              dark: '#3730A3',   // 对应 Tailwind 的 primary.dark
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#10B981',   // 对应 Tailwind 的 accent.green
            },
            error: {
              main: '#EF4444',   // 对应 Tailwind 的 accent.red
            },
            info: {
              main: '#3B82F6',   // 对应 Tailwind 的 accent.blue
            },
            background: {
              default: '#ffffff',
              paper: '#ffffff',
            },
            text: {
              primary: '#1f2937',  // 对应 Tailwind 的 gray-800
              secondary: '#4b5563', // 对应 Tailwind 的 gray-600
            },
            divider: 'rgba(0, 0, 0, 0.12)',
          }
        : {
            // 暗色模式 - 优化暗色调色板
            primary: {
              light: '#818CF8', // 更亮的紫色
              main: '#6366F1',
              dark: '#4F46E5',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#34D399', // 更亮的绿色
              dark: '#10B981',
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
              default: '#121212',  // 对应 Tailwind 的 dark.bg
              paper: '#1E1E1E',    // 对应 Tailwind 的 dark.card
            },
            text: {
              // 更新文本颜色以提高暗色模式下的可读性
              primary: '#e5e7eb',  // 对应 Tailwind 的 gray-200
              secondary: '#9ca3af', // 对应 Tailwind 的 gray-400
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
            borderRadius: '0.5rem',
            fontWeight: 500,
            ...(mode === 'dark' && {
              color: '#e5e7eb',
            }),
          },
          outlined: {
            ...(mode === 'dark' && {
              borderColor: 'rgba(255, 255, 255, 0.23)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.4)',
              },
            }),
          },
          contained: {
            boxShadow: mode === 'dark' ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '0.75rem',
            boxShadow: mode === 'light'
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
            ...(mode === 'dark' && {
              backgroundColor: '#1E1E1E',
            }),
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
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
            ...(mode === 'dark' && {
              backgroundColor: 'rgba(18, 18, 18, 0.8)',
            }),
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            ...(mode === 'dark' && {
              color: '#e5e7eb',
            }),
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
            ...(mode === 'dark' && {
              color: '#e5e7eb',
            }),
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            ...(mode === 'dark' && {
              color: '#60A5FA',
              '&:hover': {
                color: '#93C5FD',
              },
            }),
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            ...(mode === 'dark' && {
              backgroundColor: '#1E1E1E',
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
            ...(mode === 'dark' && {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }),
          },
        },
      },
    },
  };
};

// 创建亮色和暗色主题
export const lightTheme = createTheme(getThemeOptions('light'));
export const darkTheme = createTheme(getThemeOptions('dark'));
