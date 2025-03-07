import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../utils/theme';
import { useMediaQuery } from '@mui/material';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 将LanguageContext导出，解决导入错误
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 主题提供者组件
 * 管理应用的亮色/暗色模式，并提供切换功能
 * 增强了对系统主题的响应和主题同步功能
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 检测系统偏好的主题模式
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // 获取初始主题设置
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';

    // 首先尝试从本地存储获取用户设置的主题
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    // 如果没有存储的主题偏好，使用系统偏好
    return prefersDarkMode ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // 当系统主题变更时更新应用主题（如果没有用户明确设置）
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (!storedTheme) {
      setTheme(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode]);

  // 切换主题
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 当主题变化时，更新本地存储和文档类
  useEffect(() => {
    // 保存到本地存储
    localStorage.setItem('theme', theme);

    // 添加或移除 dark 类以支持 Tailwind 暗色模式
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // 更新元数据主题色
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#121212' : '#ffffff'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = theme === 'dark' ? '#121212' : '#ffffff';
      document.head.appendChild(meta);
    }
  }, [theme]);

  // 获取当前主题对应的 MUI 主题对象
  const muiTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// 自定义 hook 方便使用主题上下文
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
