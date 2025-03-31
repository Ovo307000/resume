import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, alpha, useTheme as useMuiTheme, SxProps, Theme } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import { keyframes } from '@emotion/react';

/**
 * 通用导航组件样式
 * 提供可复用的导航栏样式和组件，统一不同场景下的视觉效果
 */

// 添加闪烁动画
export const shimmerKeyframes = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// 基础卡片样式 - 适用于各种导航组件的容器
export const getBaseCardStyle = (theme: 'light' | 'dark', isDragging = false): React.CSSProperties => ({
  maxWidth: '320px',
  width: '85%',
  background: theme === 'dark'
    ? 'linear-gradient(135deg, rgba(18, 18, 30, 0.95), rgba(15, 15, 25, 0.98))'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 250, 0.98))',
  backdropFilter: 'blur(15px)',
  boxShadow: theme === 'dark'
    ? '0 8px 25px rgba(0, 0, 0, 0.5)'
    : '0 8px 25px rgba(0, 0, 0, 0.15)',
  border: theme === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.1)'
    : '1px solid rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  borderRadius: '16px',
  cursor: isDragging ? 'grabbing' : 'grab',
  transition: 'all 0.3s ease'
});

// 导航栏分隔线样式
export const getDividerStyle = (theme: 'light' | 'dark'): React.CSSProperties => ({
  my: 2,
  opacity: 0.6,
  background: theme === 'dark'
    ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
    : 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)'
});

// 拖拽预览组件样式
export const getDragPreviewStyle = (
  theme: 'light' | 'dark',
  position: { top: number; right?: number; left?: number; opacity: number }
): React.CSSProperties => ({
  position: 'fixed',
  top: position.top,
  right: position.right,
  left: position.left,
  width: '320px',
  height: '500px',
  background: theme === 'dark'
    ? 'rgba(30, 30, 50, 0.3)'
    : 'rgba(200, 200, 255, 0.3)',
  borderRadius: '16px',
  pointerEvents: 'none',
  zIndex: 1100,
  boxShadow: theme === 'dark'
    ? '0 0 20px rgba(100, 100, 255, 0.2)'
    : '0 0 20px rgba(100, 100, 255, 0.3)',
  border: '2px dashed',
  borderColor: theme === 'dark'
    ? 'rgba(150, 150, 255, 0.4)'
    : 'rgba(100, 100, 255, 0.4)',
  opacity: position.opacity,
  transition: 'opacity 0.3s ease, top 0.1s ease, left 0.1s ease, right 0.1s ease'
});

// 导航链接项样式 - 统一的移动端导航链接样式
export const getNavLinkItemStyle = (
  theme: 'light' | 'dark',
  active: boolean,
  color: string
): React.CSSProperties => ({
  mb: 1.5,
  py: 1.2,
  borderRadius: '12px',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: active
    ? alpha(color, theme === 'dark' ? 0.15 : 0.1)
    : 'transparent',
  color: active
    ? color
    : theme === 'dark' ? '#fff' : '#000',
  '&:hover': {
    backgroundColor: alpha(color, theme === 'dark' ? 0.1 : 0.05),
    transform: 'translateX(5px)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  pl: active ? 3 : 2,
  '&::before': active ? {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '60%',
    backgroundColor: color,
    borderRadius: '0 4px 4px 0',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  } : {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '0px',
    height: '60%',
    backgroundColor: color,
    borderRadius: '0 4px 4px 0',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }
});

// 通用背景样式 - 用于导航栏和模态框的半透明背景
export const getBackdropStyle = (): React.CSSProperties => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  zIndex: 1200
});

// 动画变体 - 菜单项进入、退出动画
export const menuItemVariants = {
  hidden: {
    opacity: 0,
    x: 30,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }),
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
};

// 工具按钮动画变体
export const toolbarItemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3 + (i * 0.1),
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  })
};

// 背景遮罩动画变体
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

// 拖拽预览组件 - 可复用的视觉反馈组件
interface DragPreviewProps {
  theme: 'light' | 'dark';
  position: {
    top: number;
    right?: number;
    left?: number;
    opacity: number;
  };
  directionIcon: React.ReactNode;
}

export const DragPreview: React.FC<DragPreviewProps> = ({ theme, position, directionIcon }) => {
  const isDark = theme === 'dark';

  return (
    <div style={getDragPreviewStyle(theme, position)}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: isDark ? 'rgba(200, 200, 255, 0.6)' : 'rgba(100, 100, 255, 0.6)'
      }}>
        {directionIcon}
      </Box>
    </div>
  );
};
