import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, Typography, alpha, useTheme as useMuiTheme } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { useInView } from 'react-intersection-observer';

interface RainbowProgressBarProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  height?: number;
  showPercentage?: boolean;
  animated?: boolean;
  glowEffect?: boolean;
  borderRadius?: number | string;
  labelColor?: string;
  percentageColor?: string;
  customSx?: any;
  delay?: number;
  duration?: number;
}

/**
 * 优雅渐变的动画进度条组件
 * 用于展示技能熟练度或完成度
 * 采用柔和的渐变色，避免过于高调的RGB效果
 */
const RainbowProgressBar: React.FC<RainbowProgressBarProps> = ({
  value,
  label,
  icon,
  height = 8,
  showPercentage = true,
  animated = true,
  glowEffect = false,
  borderRadius = 4,
  labelColor,
  percentageColor,
  customSx = {},
  delay = 0.2,
  duration = 1.5
}) => {
  const { theme: appTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const [currentValue, setCurrentValue] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  // 当组件进入视图时启动动画
  useEffect(() => {
    if (inView && animated) {
      controls.start('visible');

      const timer = setTimeout(() => {
        const animateValue = () => {
          let start = 0;
          const increment = value / (duration * 60); // 60fps的平滑动画

          const updateValue = () => {
            start += increment;
            if (start < value) {
              setCurrentValue(Math.min(start, value));
              requestAnimationFrame(updateValue);
            } else {
              setCurrentValue(value);
            }
          };

          requestAnimationFrame(updateValue);
        };

        animateValue();
      }, delay * 1000);

      return () => clearTimeout(timer);
    } else if (!animated) {
      setCurrentValue(value);
    }
  }, [inView, animated, value, controls, delay, duration]);

  // 文本和进度条的动画变体
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay / 2
      }
    }
  };

  // 获取标签和百分比的颜色
  const getLabelColor = () => {
    if (labelColor) return labelColor;
    return appTheme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.text.primary;
  };

  const getPercentageColor = () => {
    if (percentageColor) return percentageColor;
    return appTheme === 'dark' ? alpha(muiTheme.palette.primary.main, 0.9) : muiTheme.palette.primary.main;
  };

  // 根据主题获取进度条渐变色
  const getProgressGradient = () => {
    return appTheme === 'dark'
      ? 'linear-gradient(90deg, #3f51b5, #5c6bc0, #7986cb, #9fa8da, #3f51b5)'
      : 'linear-gradient(90deg, #4338CA, #5155F1, #6366F1, #818cf8, #4338CA)';
  };

  // 生成柔和渐变动画
  const gradientAnimation = `
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  // 进度条样式
  const progressBarSx = {
    height,
    borderRadius,
    bgcolor: appTheme === 'dark'
      ? alpha(muiTheme.palette.primary.main, 0.12)
      : alpha(muiTheme.palette.primary.main, 0.08),
    '& .MuiLinearProgress-bar': {
      background: getProgressGradient(),
      backgroundSize: '200% 200%',
      animation: 'gradientMove 3s ease infinite',
      borderRadius,
      boxShadow: glowEffect ? `0 0 6px ${alpha(muiTheme.palette.primary.main, 0.4)}` : 'none',
    },
    // 背景轨道
    '& .MuiLinearProgress-dashed': {
      animation: 'none',
    },
    // 背景色
    '& .MuiLinearProgress-bar1Determinate': {
      transition: 'none', // 禁用内部过渡以使用我们自己的动画
    },
    // 插入全局动画
    '&::before': {
      content: '""',
      display: 'none',
    },
    ...customSx
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <style>{gradientAnimation}</style>

      <Box sx={{ mb: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: getLabelColor(),
              fontWeight: 'medium'
            }}
          >
            {icon && (
              <Box component="span" sx={{ mr: 0.75, display: 'flex', alignItems: 'center' }}>
                {icon}
              </Box>
            )}
            {label}
          </Typography>

          {showPercentage && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'medium',
                color: getPercentageColor(),
              }}
            >
              {Math.round(currentValue)}%
            </Typography>
          )}
        </Box>

        <LinearProgress
          variant="determinate"
          value={currentValue}
          sx={progressBarSx}
        />
      </Box>
    </motion.div>
  );
};

export default RainbowProgressBar;
