import React, { useEffect, useState, useRef } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface ColorBlob {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number; // 添加延迟属性，使色块出现更加错开
  path: { x: string; y: string }[]; // 定义色块运动路径
}

export interface GlassyBlobBackgroundProps {
  children?: React.ReactNode;
  intensity?: 'light' | 'medium' | 'strong';
  blurAmount?: number;
  colorSet?: 'default' | 'primary' | 'rainbow' | 'cool' | 'warm';
  containerSx?: SxProps<Theme>;
  blobCount?: number;
  animate?: boolean;
  minSize?: number;
  maxSize?: number;
  glassEffect?: boolean;
}

/**
 * 可复用的玻璃彩球背景组件
 * 提供各种自定义选项，可用于多种场景如页面背景、卡片、按钮等
 * 优化版本：更流畅的动画和更好的屏幕覆盖
 */
const GlassyBlobBackground: React.FC<GlassyBlobBackgroundProps> = ({
  children,
  intensity = 'medium',
  blurAmount = 60,
  colorSet = 'default',
  containerSx = {},
  blobCount = 6, // 增加默认色块数量
  animate = true,
  minSize = 180, // 增大最小尺寸
  maxSize = 450, // 增大最大尺寸
  glassEffect = true
}) => {
  const { theme } = useTheme();
  const [blobs, setBlobs] = useState<ColorBlob[]>([]);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRenderRef = useRef(true);

  // 根据颜色集获取颜色
  const getColors = () => {
    // 调整透明度根据强度
    const alpha = intensity === 'light' ? 0.07 : intensity === 'medium' ? 0.15 : 0.25;

    const colorSets = {
      default: [
        `rgba(99, 102, 241, ${alpha})`, // 紫色
        `rgba(79, 70, 229, ${alpha})`,  // 深蓝
        `rgba(16, 185, 129, ${alpha})`, // 绿色
        `rgba(239, 68, 68, ${alpha})`,  // 红色
        `rgba(245, 158, 11, ${alpha})`, // 橙色
      ],
      primary: [
        `rgba(79, 70, 229, ${alpha})`,   // 主色深蓝
        `rgba(99, 102, 241, ${alpha})`,  // 主色紫
        `rgba(129, 140, 248, ${alpha})`, // 主色浅紫
        `rgba(165, 180, 252, ${alpha})`, // 主色更浅紫
      ],
      rainbow: [
        `rgba(239, 68, 68, ${alpha})`,   // 红
        `rgba(245, 158, 11, ${alpha})`,  // 橙
        `rgba(250, 204, 21, ${alpha})`,  // 黄
        `rgba(16, 185, 129, ${alpha})`,  // 绿
        `rgba(6, 182, 212, ${alpha})`,   // 青
        `rgba(99, 102, 241, ${alpha})`,  // 蓝
        `rgba(139, 92, 246, ${alpha})`,  // 紫
      ],
      cool: [
        `rgba(6, 182, 212, ${alpha})`,    // 青
        `rgba(59, 130, 246, ${alpha})`,   // 蓝
        `rgba(99, 102, 241, ${alpha})`,   // 蓝紫
        `rgba(139, 92, 246, ${alpha})`,   // 紫
      ],
      warm: [
        `rgba(239, 68, 68, ${alpha})`,    // 红
        `rgba(245, 158, 11, ${alpha})`,   // 橙
        `rgba(250, 204, 21, ${alpha})`,   // 黄
        `rgba(217, 119, 6, ${alpha})`,    // 深橙
      ]
    };

    return colorSets[colorSet];
  };

  // 生成随机彩色块
  useEffect(() => {
    const colors = getColors();

    // 定义一个创建更复杂运动路径的函数
    const createComplexPath = () => {
      // 生成5-7个点的路径
      const pointCount = Math.floor(Math.random() * 3) + 5;
      const path = [];

      for (let i = 0; i < pointCount; i++) {
        // 生成在屏幕更大范围内的随机点，确保能够覆盖整个容器
        const x = `${(Math.random() * 120) - 10}%`; // -10% 到 110%
        const y = `${(Math.random() * 120) - 10}%`; // -10% 到 110%
        path.push({ x, y });
      }

      // 确保路径是闭合的，最后一个点回到第一个点附近
      const firstPoint = path[0];
      const lastX = parseInt(firstPoint.x) + (Math.random() * 20 - 10);
      const lastY = parseInt(firstPoint.y) + (Math.random() * 20 - 10);
      path.push({ x: `${lastX}%`, y: `${lastY}%` });

      return path;
    };

    const generateBlobs = () => {
      const newBlobs: ColorBlob[] = [];

      for (let i = 0; i < blobCount; i++) {
        // 创建初始位置在屏幕外围的彩色块，让它们"飘"进来
        const startX = Math.random() > 0.5 ? -10 : 110; // 从左边或右边
        const startY = Math.random() * 100;

        // 生成平滑的运动路径
        const path = createComplexPath();

        // 延迟是为了让色块错开出现，创造更自然的效果
        const delay = isFirstRenderRef.current ? i * 0.4 : 0;

        newBlobs.push({
          id: i,
          x: startX,
          y: startY,
          size: Math.random() * (maxSize - minSize) + minSize,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 30 + 70, // 70-100秒，更长的动画周期
          delay,
          path: path
        });
      }

      setBlobs(newBlobs);
      isFirstRenderRef.current = false;
    };

    generateBlobs();

    // 动画开启时，每隔一段时间更新一个彩色块以保持视觉新鲜感
    if (animate) {
      updateTimeoutRef.current = setInterval(() => {
        const colors = getColors();
        const updatedBlobs = [...blobs];

        if (updatedBlobs.length === 0) return;

        // 随机选择一个色块来更新
        const randomIndex = Math.floor(Math.random() * blobs.length);

        // 创建一个新的色块，准备从屏幕外"飘"进来
        const startX = Math.random() > 0.5 ? -10 : 110; // 从左边或右边
        const startY = Math.random() * 100;

        // 更新现有色块的内容，但保持同一个ID
        const existingBlob = updatedBlobs[randomIndex];

        // 新的色块
        const newBlob = {
          id: existingBlob.id,
          x: startX,
          y: startY,
          size: Math.random() * (maxSize - minSize) + minSize,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 30 + 70,
          delay: 0,
          path: createComplexPath()
        };

        // 将旧色块替换为新色块，保持数组长度不变
        updatedBlobs[randomIndex] = newBlob;

        setBlobs(updatedBlobs);
      }, 18000); // 每18秒更新一个色块
    }

    return () => {
      if (updateTimeoutRef.current) {
        clearInterval(updateTimeoutRef.current);
      }
    };
  }, [blobCount, colorSet, intensity, minSize, maxSize, animate]);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: glassEffect ? 'blur(5px)' : 'none',
        borderRadius: '12px',
        ...containerSx
      }}
    >
      {/* 彩色背景球 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.9,
          overflow: 'visible' // 允许色块溢出容器，创造更好的边缘过渡
        }}
      >
        <AnimatePresence>
          {blobs.map((blob) => (
            <motion.div
              key={blob.id}
              initial={{
                x: `${blob.x}%`,
                y: `${blob.y}%`,
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: animate ? blob.path.map(p => p.x) : `${blob.x}%`,
                y: animate ? blob.path.map(p => p.y) : `${blob.y}%`
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 3.5 } // 增加退出动画时长，更加平滑
              }}
              transition={{
                duration: blob.duration,
                delay: blob.delay,
                repeat: Infinity,
                repeatType: 'loop', // 使用loop确保色块沿着整个路径移动
                ease: 'easeInOut',
                opacity: { duration: 3 }, // 更长的淡入淡出效果
                scale: { duration: 3 }    // 更长的缩放效果
              }}
              style={{
                position: 'absolute',
                width: blob.size,
                height: blob.size,
                borderRadius: '50%',
                background: blob.color,
                filter: `blur(${blurAmount}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </AnimatePresence>
      </Box>

      {/* 内容层 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          width: '100%'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default GlassyBlobBackground;
