import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NotificationSeverity } from '../components/ui/common/CopyNotification';

export interface Notification {
  id: string;
  message: string;
  severity: NotificationSeverity;
  autoHideDuration?: number;
}

interface UseNotificationsOptions {
  maxNotifications?: number;
  defaultDuration?: number;
}

/**
 * 复制到剪贴板自定义Hook
 * 提供复制功能和复制状态管理
 */
const useCopyToClipboard = (options?: UseNotificationsOptions) => {
  const {
    defaultDuration = 3000
  } = options || {};

  const [state, setState] = useState({
    copied: false,
    text: '',
    error: false
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as NotificationSeverity
  });

  /**
   * 复制文本到剪贴板
   * @param text 要复制的文本
   * @param label 用于显示在提示消息中的标签
   */
  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      if (!text) {
        throw new Error('无效的复制内容');
      }

      // 防止导航事件
      // 使用 navigator.clipboard API 代替其他方法
      await navigator.clipboard.writeText(text);

      setState({
        copied: true,
        text,
        error: false
      });

      setSnackbar({
        open: true,
        message: `${label} ${text} 已复制到剪贴板`,
        severity: 'success'
      });

      return true;
    } catch (error) {
      console.error('复制失败:', error);

      setState({
        copied: false,
        text: '',
        error: true
      });

      setSnackbar({
        open: true,
        message: '复制失败，请手动复制',
        severity: 'error'
      });

      return false;
    }
  }, []);

  /**
   * 关闭提示
   */
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  return {
    state,
    copyToClipboard,
    snackbar,
    handleCloseSnackbar
  };
};

export default useCopyToClipboard;
