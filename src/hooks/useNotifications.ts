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
 * 通知管理钩子
 * 用于管理多个通知的显示、叠加和自动关闭
 */
const useNotifications = (options?: UseNotificationsOptions) => {
  const {
    maxNotifications = 5,
    defaultDuration = 3000
  } = options || {};

  const [notifications, setNotifications] = useState<Notification[]>([]);

  /**
   * 添加新通知
   */
  const addNotification = useCallback((
    message: string,
    severity: NotificationSeverity = 'default',
    autoHideDuration = defaultDuration
  ) => {
    const newNotification: Notification = {
      id: uuidv4(),
      message,
      severity,
      autoHideDuration
    };

    setNotifications(prev => {
      // 如果通知数量已达上限，移除最老的通知
      const updatedNotifications = prev.length >= maxNotifications
        ? [...prev.slice(1), newNotification]
        : [...prev, newNotification];

      return updatedNotifications;
    });

    return newNotification.id;
  }, [maxNotifications, defaultDuration]);

  /**
   * 移除特定通知
   */
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  /**
   * 清除所有通知
   */
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * 快捷方法：成功通知
   */
  const success = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'success', duration);
  }, [addNotification]);

  /**
   * 快捷方法：错误通知
   */
  const error = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'error', duration);
  }, [addNotification]);

  /**
   * 快捷方法：信息通知
   */
  const info = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'info', duration);
  }, [addNotification]);

  /**
   * 快捷方法：警告通知
   */
  const warning = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'warning', duration);
  }, [addNotification]);

  /**
   * 快捷方法：默认通知
   */
  const notify = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'default', duration);
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    success,
    error,
    info,
    warning,
    notify
  };
};

export default useNotifications;
