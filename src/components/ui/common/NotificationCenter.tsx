import React from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import CopyNotification from './CopyNotification';
import { Notification } from '../../../hooks/useNotifications';

interface NotificationCenterProps {
  notifications: Notification[];
  onClose: (id: string) => void;
  maxWidth?: number | string;
}

/**
 * 通知中心组件
 * 用于集中管理和显示多个通知
 */
const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onClose,
  maxWidth = 400
}) => {
  // 创建通知容器
  const createNotificationContainer = () => {
    const containerId = 'global-notification-container';
    let container = document.getElementById(containerId);

    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.position = 'fixed';
      container.style.zIndex = '9999';
      container.style.bottom = '0';
      container.style.right = '0';
      container.style.width = `${maxWidth}px`;
      container.style.maxWidth = '100%';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);
    }

    return container;
  };

  // 如果没有通知，不渲染任何内容
  if (notifications.length === 0) {
    return null;
  }

  // 创建和获取容器
  const container = createNotificationContainer();

  // 通过Portal将通知渲染到容器中
  return createPortal(
    <Box sx={{
      position: 'relative',
      width: '100%',
      pointerEvents: 'none',
      '& > *': {
        pointerEvents: 'auto'
      }
    }}>
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <CopyNotification
            key={notification.id}
            open={true}
            message={notification.message}
            severity={notification.severity}
            autoHideDuration={notification.autoHideDuration}
            onClose={() => onClose(notification.id)}
            index={index}
            maxWidth={maxWidth}
          />
        ))}
      </AnimatePresence>
    </Box>,
    container
  );
};

export default NotificationCenter;
