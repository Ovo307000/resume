import React, { forwardRef } from 'react';
import { Snackbar, Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import {
  FiCheck,
  FiInfo,
  FiAlertCircle,
  FiAlertTriangle,
  FiBell
} from 'react-icons/fi';

export type NotificationSeverity = 'success' | 'error' | 'info' | 'warning' | 'default';

interface CopyNotificationProps {
  open: boolean;
  message: string;
  severity?: NotificationSeverity;
  autoHideDuration?: number;
  onClose: () => void;
  index?: number; // 用于叠加显示时的定位
  maxWidth?: number | string;
}

/**
 * 增强型通知组件
 * 支持多种通知类型、叠加显示和优雅的动画效果
 */
const CopyNotification = forwardRef<HTMLDivElement, CopyNotificationProps>(({
  open,
  message,
  severity = 'success',
  autoHideDuration = 3000,
  onClose,
  index = 0,
  maxWidth = 400
}, ref) => {
  const { theme } = useTheme();

  // 根据不同状态显示不同的图标和颜色
  const getIconContent = () => {
    switch (severity) {
      case 'success':
        return {
          icon: <FiCheck size={24} />,
          color: theme === 'dark' ? '#4ade80' : '#10b981',
          bgColor: theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'
        };
      case 'error':
        return {
          icon: <FiAlertCircle size={24} />,
          color: theme === 'dark' ? '#f87171' : '#ef4444',
          bgColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'
        };
      case 'warning':
        return {
          icon: <FiAlertTriangle size={24} />,
          color: theme === 'dark' ? '#fbbf24' : '#f59e0b',
          bgColor: theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)'
        };
      case 'info':
        return {
          icon: <FiInfo size={24} />,
          color: theme === 'dark' ? '#60a5fa' : '#3b82f6',
          bgColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'
        };
      default:
        return {
          icon: <FiBell size={24} />,
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
          bgColor: theme === 'dark' ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.1)'
        };
    }
  };

  const { icon, color, bgColor } = getIconContent();

  // 动画变体
  const variants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      filter: 'blur(8px)'
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 1.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      x: 100,
      filter: 'blur(4px)',
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96] // 自定义缓动函数，更加优雅
      }
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{
        mb: `${index * 10 + 16}px`, // 增加底部间距，用于叠加显示
        maxWidth: maxWidth,
        width: '100%',
        right: 16,
        left: 'auto'
      }}
    >
      <AnimatePresence>
        {open && (
          <Box
            component={motion.div}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              pr: 3,
              borderRadius: '16px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: `0 10px 25px rgba(0, 0, 0, ${theme === 'dark' ? 0.3 : 0.15})`,
              backgroundColor: theme === 'dark'
                ? 'rgba(17, 24, 39, 0.7)'
                : 'rgba(255, 255, 255, 0.7)',
              border: '1px solid',
              borderColor: theme === 'dark'
                ? 'rgba(75, 85, 99, 0.5)'
                : 'rgba(226, 232, 240, 0.8)',
              overflow: 'hidden',
              position: 'relative',
              width: '100%'
            }}
            onClick={onClose}
          >
            {/* 彩色横条 */}
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '4px',
                height: '100%',
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}`
              }}
            />

            {/* 图标背景 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 42,
                height: 42,
                borderRadius: '50%',
                backgroundColor: bgColor,
                color: color,
                mr: 2,
                ml: 1,
                flexShrink: 0
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, 0, -3, 0]
                }}
                transition={{
                  duration: 0.5,
                  repeat: 1,
                  repeatDelay: 0.5
                }}
              >
                {icon}
              </motion.div>
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
              {message}
            </Typography>

            {/* 动态背景模糊效果 */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                backgroundColor: 'transparent',
                opacity: 0.2
              }}
              animate={{
                background: [
                  `radial-gradient(circle at 20% 50%, ${color}40 0%, transparent 70%)`,
                  `radial-gradient(circle at 50% 20%, ${color}40 0%, transparent 70%)`,
                  `radial-gradient(circle at 80% 50%, ${color}40 0%, transparent 70%)`,
                  `radial-gradient(circle at 50% 80%, ${color}40 0%, transparent 70%)`,
                  `radial-gradient(circle at 20% 50%, ${color}40 0%, transparent 70%)`
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'mirror'
              }}
            />
          </Box>
        )}
      </AnimatePresence>
    </Snackbar>
  );
});

export default CopyNotification;
