import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Snackbar, Box, Typography, Grow } from '@mui/material';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { useTheme } from './ThemeContext';

interface CopyNotificationContextType {
  showNotification: (text: string, label?: string) => void;
  copyToClipboard: (text: string, label?: string) => Promise<boolean>;
}

const CopyNotificationContext = createContext<CopyNotificationContextType | null>(null);

interface CopyNotificationProviderProps {
  children: ReactNode;
}

export const CopyNotificationProvider: React.FC<CopyNotificationProviderProps> = ({ children }) => {
  const { theme } = useTheme();
  const [notification, setNotification] = useState<{
    message: string;
    open: boolean;
  }>({
    message: '',
    open: false
  });

  // 显示通知
  const showNotification = (text: string, label?: string) => {
    const message = label ? `${label} ${text} 已复制到剪贴板` : `${text} 已复制到剪贴板`;
    setNotification({
      message,
      open: true
    });
  };

  // 复制到剪贴板并显示通知
  const copyToClipboard = async (text: string, label?: string): Promise<boolean> => {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);
      showNotification(text, label);
      return true;
    } catch (err) {
      console.error('复制失败:', err);
      setNotification({
        message: '复制失败，请手动复制',
        open: true
      });
      return false;
    }
  };

  // 关闭通知
  const handleClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // 监听全局复制事件
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      // 获取选中的文本
      const selectedText = window.getSelection()?.toString();
      if (selectedText && selectedText.trim().length > 0) {
        // 延迟一点显示通知，确保复制操作完成
        setTimeout(() => {
          showNotification(
            selectedText.length > 30 ? selectedText.substring(0, 30) + '...' : selectedText
          );
        }, 100);
      }
    };

    // 添加事件监听器
    document.addEventListener('copy', handleCopy);

    // 组件卸载时移除事件监听器
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return (
    <CopyNotificationContext.Provider value={{ showNotification, copyToClipboard }}>
      {children}

      {/* 精美的玻璃效果通知 */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ mb: 2, mr: 2 }}
      >
        <Grow in={notification.open} style={{ transformOrigin: 'center', timeout: 300 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: '16px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: theme === 'dark'
                ? '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(111, 93, 245, 0.2)'
                : '0 10px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(111, 93, 245, 0.1)',
              backgroundColor: theme === 'dark'
                ? 'rgba(17, 24, 39, 0.7)'
                : 'rgba(255, 255, 255, 0.7)',
              border: '1px solid',
              borderColor: theme === 'dark'
                ? 'rgba(75, 85, 99, 0.5)'
                : 'rgba(226, 232, 240, 0.8)',
              position: 'relative',
              overflow: 'hidden',
              maxWidth: '400px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              minWidth: '300px'
            }}
          >
            {/* 彩色边框 */}
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '4px',
                height: '100%',
                backgroundColor: '#6366F1',
                boxShadow: '0 0 10px #6366F1'
              }}
            />

            {/* 图标 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 42,
                height: 42,
                borderRadius: '50%',
                backgroundColor: 'rgba(111, 93, 245, 0.1)',
                color: '#6366F1',
                mr: 2,
                ml: 1,
                flexShrink: 0,
              }}
            >
              <FiCheck size={24} />
            </Box>

            {/* 文字内容 */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: theme === 'dark' ? '#e2e8f0' : '#334155',
                pr: 1,
                textShadow: theme === 'dark' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
              }}
            >
              {notification.message}
            </Typography>

            {/* 动态背景渐变 */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                opacity: 0.2,
                background: 'radial-gradient(circle at 20% 50%, #6366F140 0%, transparent 70%)'
              }}
            />
          </Box>
        </Grow>
      </Snackbar>
    </CopyNotificationContext.Provider>
  );
};

// 自定义Hook，用于在组件中使用复制通知功能
export const useCopyNotification = () => {
  const context = useContext(CopyNotificationContext);
  if (!context) {
    throw new Error('useCopyNotification must be used within a CopyNotificationProvider');
  }
  return context;
};

export default CopyNotificationProvider;
