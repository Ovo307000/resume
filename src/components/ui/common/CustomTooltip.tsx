import React from 'react';
import { Tooltip, TooltipProps, styled } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';

// 自定义Tooltip样式
const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(20, 20, 30, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
    color: theme.palette.mode === 'dark'
      ? '#fff'
      : theme.palette.text.primary,
    backdropFilter: 'blur(8px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 12px rgba(0, 0, 0, 0.4)'
      : '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.05)',
    padding: '8px 12px',
    fontSize: '0.8rem',
    fontWeight: 500,
    borderRadius: '10px',
    maxWidth: 300,
    wordWrap: 'break-word',
    transition: 'all 0.2s ease',
  },
  [`& .MuiTooltip-arrow`]: {
    color: theme.palette.mode === 'dark'
      ? 'rgba(20, 20, 30, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
    '&::before': {
      border: theme.palette.mode === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.05)',
      boxShadow: theme.palette.mode === 'dark'
        ? '2px 2px 6px rgba(0, 0, 0, 0.4)'
        : '2px 2px 6px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(8px)',
    }
  }
}));

interface CustomTooltipProps extends Omit<TooltipProps, 'children'> {
  children: React.ReactElement;
}

/**
 * 自定义美化的Tooltip组件
 * 提供更美观的悬浮提示，支持模糊背景和动画效果
 */
const CustomTooltip: React.FC<CustomTooltipProps> = (props) => {
  const { theme } = useTheme();
  const { children, title, placement = 'bottom', arrow = true, ...rest } = props;

  return (
    <StyledTooltip
      title={title}
      placement={placement}
      arrow={arrow}
      enterDelay={500}
      leaveDelay={200}
      TransitionProps={{
        timeout: 300
      }}
      {...rest}
    >
      {children}
    </StyledTooltip>
  );
};

export default CustomTooltip;
