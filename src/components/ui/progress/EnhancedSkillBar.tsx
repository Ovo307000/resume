import React, { useEffect, useState, useCallback, memo } from 'react';
import { Box, Typography, alpha, useTheme as useMuiTheme, SxProps, Theme } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { useInView } from 'react-intersection-observer';

interface EnhancedSkillBarProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  height?: number;
  showPercentage?: boolean;
  animated?: boolean;
  glowEffect?: boolean;
  borderRadius?: number | string;
  customColor?: string;
  customSx?: SxProps<Theme>;
  delay?: number;
  duration?: number;
  variant?: 'gradient' | 'solid' | 'glass';
  url?: string;
  clickable?: boolean;
}

/**
 * 增强型技能进度条组件
 * 更加优雅的设计和流畅的动画效果
 * 支持多种风格和自定义选项
 */
const EnhancedSkillBar: React.FC<EnhancedSkillBarProps> = memo(({
  value,
  label,
  icon,
  height = 10,
  showPercentage = true,
  animated = true,
  glowEffect = true,
  borderRadius = 5,
  customColor,
  customSx = {},
  delay = 0.2,
  duration = 1.2,
  variant = 'gradient',
  url,
  clickable = false
}) => {
  const { theme: appTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const [currentValue, setCurrentValue] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "30px 0px 0px 0px"
  });

  // 使用animationFrame优化的值更新函数
  const animateToValue = useCallback((targetValue: number, startTime: number, maxDuration: number) => {
    // 使用更平滑的缓动函数
    const easing = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      // 加快动画速度
      const progress = Math.min(elapsed / (maxDuration * 500), 1);
      const easedProgress = easing(progress);

      setCurrentValue(Math.round(easedProgress * targetValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // 当组件挂载时立即设置一个初始值
  useEffect(() => {
    // 立即显示一部分值，提供更好的用户体验
    setCurrentValue(Math.round(value * 0.3));
  }, []);

  // 当组件进入视图时启动动画
  useEffect(() => {
    if (inView && animated) {
      controls.start('visible');

      // 减少延迟，加快动画开始
      const timer = setTimeout(() => {
        const startTime = performance.now();
        animateToValue(value, startTime, duration);
      }, Math.max(delay * 500, 50)); // 减少延迟，最低为50ms

      return () => clearTimeout(timer);
    } else if (!animated) {
      setCurrentValue(value);
    } else {
      // 如果不在视图中但需要动画，设置为完整值
      setCurrentValue(value);
    }
  }, [inView, animated, value, controls, delay, duration, animateToValue]);

  // 文本和进度条的动画变体
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: delay / 2,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // 获取颜色 - 使用useCallback优化
  const getColor = useCallback(() => {
    if (customColor) return customColor;
    return appTheme === 'dark' ? muiTheme.palette.primary.light : muiTheme.palette.primary.main;
  }, [customColor, appTheme, muiTheme.palette.primary]);

  // 根据变体和主题获取进度条样式 - 使用useCallback优化
  const getProgressBarStyles = useCallback(() => {
    const baseColor = getColor();

    switch (variant) {
      case 'solid':
        return {
          backgroundColor: baseColor,
          boxShadow: glowEffect ? `0 0 8px ${alpha(baseColor, 0.6)}` : 'none',
        };
      case 'glass':
        return {
          backgroundColor: alpha(baseColor, appTheme === 'dark' ? 0.6 : 0.7),
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: `1px solid ${alpha(baseColor, 0.2)}`,
          boxShadow: glowEffect ? `0 0 12px ${alpha(baseColor, 0.4)}` : 'none',
        };
      case 'gradient':
      default: {
        // 默认渐变样式，更有活力
        const gradientColors = appTheme === 'dark'
          ? `linear-gradient(90deg, ${alpha(baseColor, 0.7)}, ${baseColor})`
          : `linear-gradient(90deg, ${baseColor}, ${alpha(baseColor, 0.8)})`;

        return {
          background: gradientColors,
          boxShadow: glowEffect ? `0 0 10px ${alpha(baseColor, 0.5)}` : 'none',
        };
      }
    }
  }, [variant, getColor, appTheme, glowEffect]);

  // 获取轨道样式 - 使用useCallback优化
  const getTrackStyles = useCallback(() => {
    const baseColor = getColor();
    return {
      backgroundColor: appTheme === 'dark'
        ? alpha(baseColor, 0.15)
        : alpha(baseColor, 0.1),
      borderRadius,
    };
  }, [getColor, appTheme, borderRadius]);

  // 生成3D效果 - 使用useCallback优化
  const get3DEffect = useCallback(() => {
    return variant === 'glass' ? {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: `linear-gradient(to bottom, ${alpha('#fff', 0.1)}, transparent)`,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        pointerEvents: 'none'
      }
    } : {};
  }, [variant, borderRadius]);

  // 处理点击事件
  const handleClick = () => {
    if (clickable && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <Box
        sx={{
          mb: 2,
          cursor: clickable && url ? 'pointer' : 'default',
          transition: 'transform 0.2s ease',
          '&:hover': clickable && url ? {
            transform: 'translateX(5px)'
          } : {}
        }}
        onClick={handleClick}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon && (
              <Box
                sx={{
                  color: getColor(),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {icon}
              </Box>
            )}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: appTheme === 'dark' ? '#e0e0e0' : '#333333'
              }}
            >
              {label}
            </Typography>
          </Box>

          {showPercentage && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: getColor(),
                transition: 'color 0.3s ease'
              }}
            >
              {currentValue}%
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            height,
            ...getTrackStyles(),
            position: 'relative',
            overflow: 'hidden',
            ...get3DEffect(),
            ...customSx
          }}
        >
          <motion.div
            style={{
              height: '100%',
              width: `${currentValue}%`,
              borderRadius,
              position: 'absolute',
              left: 0,
              top: 0,
              ...getProgressBarStyles()
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut'
            }}
          />
        </Box>
      </Box>
    </motion.div>
  );
});

export default EnhancedSkillBar;
