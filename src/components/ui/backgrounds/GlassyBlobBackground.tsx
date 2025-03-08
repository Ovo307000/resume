import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface ColorBlob {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

export interface GlassyBlobBackgroundProps {
  children?: React.ReactNode;
  intensity?: 'light' | 'medium' | 'strong';
  blurAmount?: number;
  colorSet?: 'default' | 'primary' | 'rainbow' | 'cool' | 'warm';
  containerSx?: any;
  blobCount?: number;
  animate?: boolean;
  minSize?: number;
  maxSize?: number;
  glassEffect?: boolean;
}

/**
 * 可复用的玻璃彩球背景组件
 * 提供各种自定义选项，可用于多种场景如页面背景、卡片、按钮等
 */
const GlassyBlobBackground: React.FC<GlassyBlobBackgroundProps> = ({
  children,
  intensity = 'medium',
  blurAmount = 60,
  colorSet = 'default',
  containerSx = {},
  blobCount = 4,
  animate = true,
  minSize = 100,
  maxSize = 300,
  glassEffect = true
}) => {
  const { theme } = useTheme();
  const [blobs, setBlobs] = useState<ColorBlob[]>([]);

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

    const generateBlobs = () => {
      const newBlobs: ColorBlob[] = [];

      for (let i = 0; i < blobCount; i++) {
        newBlobs.push({
          id: i,
          x: Math.random() * 100, // 随机位置 (0-100%)
          y: Math.random() * 100,
          size: Math.random() * (maxSize - minSize) + minSize,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 20 + 40 // 动画时长40-60秒，减少变化幅度
        });
      }

      setBlobs(newBlobs);
    };

    generateBlobs();

    // 动画开启时，每隔一段时间更新一个彩色块以保持视觉新鲜感
    let interval: NodeJS.Timeout | null = null;

    if (animate) {
      // 增加更新间隔时间，减少频繁变化
      interval = setInterval(() => {
        const colors = getColors();
        const updatedBlobs = [...blobs];
        const randomIndex = Math.floor(Math.random() * blobs.length);

        if (updatedBlobs[randomIndex]) {
          // 缓慢过渡到新位置，而不是直接替换
          updatedBlobs[randomIndex] = {
            ...updatedBlobs[randomIndex],
            x: Math.random() * 100,
            y: Math.random() * 100,
            color: colors[Math.floor(Math.random() * colors.length)],
            duration: Math.random() * 20 + 40
          };

          setBlobs(updatedBlobs);
        }
      }, 15000); // 增加到15秒，减少突兀变化
    }

    return () => {
      if (interval) clearInterval(interval);
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
          opacity: 0.9
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
                x: animate
                  ? [`${blob.x}%`, `${(blob.x + 10) % 100}%`, `${(blob.x + 20) % 100}%`, `${blob.x}%`]
                  : `${blob.x}%`,
                y: animate
                  ? [`${blob.y}%`, `${(blob.y + 8) % 100}%`, `${(blob.y + 16) % 100}%`, `${blob.y}%`]
                  : `${blob.y}%`
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 1.5 }
              }}
              transition={{
                duration: blob.duration,
                repeat: Infinity,
                repeatType: 'mirror', // 使用mirror而不是reverse，更加平滑
                ease: 'easeInOut',
                opacity: { duration: 2 }, // 淡入淡出效果
                scale: { duration: 2 }    // 缩放效果
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
