import React, { createContext, useContext, ReactNode } from 'react';
import useNotifications, { Notification } from '../../../hooks/useNotifications';
import NotificationCenter from './NotificationCenter';

interface NotificationsContextProps {
  notifications: Notification[];
  addNotification: (message: string, severity?: string, duration?: number) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  notify: (message: string, duration?: number) => string;
}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

interface NotificationsProviderProps {
  children: ReactNode;
  maxNotifications?: number;
  defaultDuration?: number;
  maxWidth?: number | string;
}

/**
 * 通知提供者组件
 * 提供全局通知功能，可以在应用的任何地方使用
 */
export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
  maxNotifications = 5,
  defaultDuration = 3000,
  maxWidth = 400
}) => {
  const {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    success,
    error,
    info,
    warning,
    notify
  } = useNotifications({
    maxNotifications,
    defaultDuration
  });

  const value = {
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

  return (
    <NotificationsContext.Provider value={value}>
      {children}
      <NotificationCenter
        notifications={notifications}
        onClose={removeNotification}
        maxWidth={maxWidth}
      />
    </NotificationsContext.Provider>
  );
};

/**
 * 使用通知的钩子
 * 用于在组件中获取通知功能
 */
export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error('useNotificationsContext must be used within a NotificationsProvider');
  }

  return context;
};

export default NotificationsProvider;
