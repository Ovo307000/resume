import React, { useEffect, useState, useRef } from 'react';
import { Box, useTheme as useMuiTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

// 形状类型定义
type ShapeType = 'circle' | 'square' | 'triangle' | 'hexagon' | 'star';

interface ColorBlob {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  duration: number;
  delay: number;
  shape: ShapeType;
  opacity: number;
  colorTransition: boolean; // 是否会变色
  colorDuration?: number;   // 变色周期
}

export interface GlassyBackgroundProps {
  children?: React.ReactNode;
  blurStrength?: number;
  blobs?: {
    count?: number;
    minSize?: number;
    maxSize?: number;
    opacity?: number;
    colorScheme?: 'rainbow' | 'blue' | 'purple' | 'green' | 'warmth' | 'mixed';
    colorTransition?: boolean; // 是否开启色块颜色变化
    speed?: 'slow' | 'normal' | 'fast'; // 动画速度
  };
  overlay?: {
    opacity?: number;
    gradient?: boolean;
    pattern?: 'none' | 'dots' | 'grid' | 'noise';
  };
  glassPanelProps?: {
    blur?: number;
    saturation?: number;
    opacity?: number;
    border?: boolean;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number | string;
    boxShadow?: boolean;
  };
  fixed?: boolean;
  wrapContent?: boolean; // 是否包裹内容元素
  zIndex?: number;
}

/**
 * 高级毛玻璃背景组件
 * 背景中有多个动态形状，颜色不断变化
 * 前面覆盖毛玻璃效果的面板
 */
const GlassyBackground: React.FC<GlassyBackgroundProps> = ({
  children,
  blurStrength = 25,
  blobs = {
    count: 10,
    minSize: 250,
    maxSize: 700,
    opacity: 0.25,
    colorScheme: 'purple',
    colorTransition: true,
    speed: 'normal'
  },
  overlay = {
    opacity: 0.02,
    gradient: true,
    pattern: 'noise'
  },
  glassPanelProps = {
    blur: 10,
    saturation: 1.1,
    opacity: 0.8,
    border: true,
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderRadius: 24,
    boxShadow: true
  },
  fixed = false,
  wrapContent = false,
  zIndex = -1
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const [colorBlobs, setColorBlobs] = useState<ColorBlob[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isDark = theme === 'dark';

  // 根据速度设置持续时间
  const getDuration = (speedOption: 'slow' | 'normal' | 'fast') => {
    const durationMap = {
      slow: { min: 100, max: 180 },
      normal: { min: 60, max: 100 },
      fast: { min: 30, max: 60 }
    };
    const { min, max } = durationMap[speedOption];
    return Math.random() * (max - min) + min;
  };

  // 获取颜色方案
  const getColors = () => {
    const colorSchemes = {
      rainbow: [
        '#f44336', // 红
        '#ff9800', // 橙
        '#ffc107', // 黄
        '#4caf50', // 绿
        '#2196f3', // 蓝
        '#3f51b5', // 靛
        '#9c27b0'  // 紫
      ],
      blue: [
        '#e3f2fd',
        '#bbdefb',
        '#90caf9',
        '#64b5f6',
        '#42a5f5',
        '#2196f3',
        '#1e88e5',
        '#1976d2'
      ],
      purple: [
        '#f3e5f5',
        '#e1bee7',
        '#ce93d8',
        '#ba68c8',
        '#ab47bc',
        '#9c27b0',
        '#8e24aa',
        '#7b1fa2'
      ],
      green: [
        '#e8f5e9',
        '#c8e6c9',
        '#a5d6a7',
        '#81c784',
        '#66bb6a',
        '#4caf50',
        '#43a047',
        '#388e3c'
      ],
      warmth: [
        '#ffebee',
        '#ffcdd2',
        '#ef9a9a',
        '#e57373',
        '#ef5350',
        '#f44336',
        '#e53935',
        '#ff9800'
      ],
      mixed: [
        '#f44336', // 红
        '#ff9800', // 橙
        '#4caf50', // 绿
        '#2196f3', // 蓝
        '#9c27b0', // 紫
        '#f06292', // 粉
        '#00bcd4', // 青
        '#ffeb3b'  // 黄
      ]
    };

    // 如果是深色模式，减少浅色
    if (isDark && blobs.colorScheme !== 'mixed' && blobs.colorScheme !== 'rainbow') {
      return colorSchemes[blobs.colorScheme || 'purple'].slice(2);
    }

    return colorSchemes[blobs.colorScheme || 'purple'];
  };

  // 生成随机形状路径
  const getShapePath = (shape: ShapeType, size: number): string => {
    const halfSize = size / 2;

    switch(shape) {
      case 'circle':
        return `M${halfSize},0 A${halfSize},${halfSize} 0 1,1 ${halfSize},${size} A${halfSize},${halfSize} 0 1,1 ${halfSize},0 Z`;

      case 'square':
        return `M0,0 L${size},0 L${size},${size} L0,${size} Z`;

      case 'triangle':
        return `M${halfSize},0 L${size},${size} L0,${size} Z`;

      case 'hexagon': {
        const points = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * 60) * Math.PI / 180;
          const x = halfSize + halfSize * Math.cos(angle);
          const y = halfSize + halfSize * Math.sin(angle);
          points.push(`${x},${y}`);
        }
        return `M${points.join(' L')} Z`;
      }

      case 'star': {
        const outerRadius = halfSize;
        const innerRadius = halfSize / 2;
        const points = [];

        for (let i = 0; i < 10; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * 36) * Math.PI / 180;
          const x = halfSize + radius * Math.sin(angle);
          const y = halfSize - radius * Math.cos(angle);
          points.push(`${x},${y}`);
        }

        return `M${points.join(' L')} Z`;
      }

      default:
        return `M${halfSize},0 A${halfSize},${halfSize} 0 1,1 ${halfSize},${size} A${halfSize},${halfSize} 0 1,1 ${halfSize},0 Z`;
    }
  };

  // 获取随机位置，确保色块完全覆盖屏幕
  const getPositions = (count: number) => {
    // 定义屏幕区域的分割网格
    const numRows = Math.ceil(Math.sqrt(count));
    const numCols = Math.ceil(count / numRows);

    // 计算每个格子的宽度和高度（百分比）
    const cellWidth = 100 / numCols;
    const cellHeight = 100 / numRows;

    const positions = [];

    // 确保每个格子至少有一个色块
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (positions.length < count) {
          // 在格子内随机位置，稍有重叠
          const margin = 20; // 允许溢出的边距
          const x = (col * cellWidth) + (Math.random() * (cellWidth + margin)) - margin / 2;
          const y = (row * cellHeight) + (Math.random() * (cellHeight + margin)) - margin / 2;

          positions.push({ x, y });
        }
      }
    }

    // 洗牌算法打乱位置
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    return positions;
  };

  // 初始化色块
  useEffect(() => {
    const colors = getColors();
    const shapes: ShapeType[] = ['circle', 'square', 'triangle', 'hexagon', 'star'];
    const count = blobs.count || 10;
    const minSize = blobs.minSize || 250;
    const maxSize = blobs.maxSize || 700;
    const positions = getPositions(count);
    const speed = blobs.speed || 'normal';
    const colorTransition = blobs.colorTransition !== undefined ? blobs.colorTransition : true;

    const newBlobs: ColorBlob[] = Array.from({ length: count }).map((_, index) => {
      const size = Math.random() * (maxSize - minSize) + minSize;
      const shouldTransition = colorTransition && Math.random() > 0.3; // 70%的色块会变色

      return {
        id: index,
        x: positions[index].x,
        y: positions[index].y,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        duration: getDuration(speed),
        delay: Math.random() * 10,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: Math.random() * 0.1 + (blobs.opacity || 0.2),
        colorTransition: shouldTransition,
        colorDuration: shouldTransition ? Math.random() * 20 + 10 : undefined
      };
    });

    setColorBlobs(newBlobs);

    // 每隔一段时间更新一个色块
    const interval = setInterval(() => {
      setColorBlobs(prev => {
        const updatedBlobs = [...prev];
        const randomIndex = Math.floor(Math.random() * prev.length);
        const oldBlob = prev[randomIndex];
        const positions = getPositions(1)[0];

        updatedBlobs[randomIndex] = {
          ...oldBlob,
          x: positions.x,
          y: positions.y,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          duration: getDuration(speed),
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          opacity: Math.random() * 0.1 + (blobs.opacity || 0.2)
        };

        return updatedBlobs;
      });
    }, 15000);

    // 帧动画处理，使色块位置和颜色平滑变化
    const animate = () => {
      // 这里可以添加额外的动画逻辑，比如轻微位置调整，让色块在长期不变的情况下仍有微动效
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearInterval(interval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [blobs.count, blobs.minSize, blobs.maxSize, blobs.colorScheme, blobs.speed, blobs.opacity, blobs.colorTransition, theme]);

  // 获取背景基础样式
  const getBaseBackground = () => {
    return isDark
      ? 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)'
      : 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)';
  };

  // 获取纹理样式
  const getPatternStyle = () => {
    switch(overlay.pattern) {
      case 'dots':
        return {
          backgroundImage: `radial-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        };
      case 'grid':
        return {
          backgroundImage: `
            linear-gradient(to right, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        };
      case 'noise':
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
          opacity: isDark ? 0.06 : 0.03
        };
      default:
        return {};
    }
  };

  // 创建背景层
  const backgroundElement = (
    <Box
      sx={{
        position: fixed ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: getBaseBackground(),
        zIndex,
        '&::before': overlay.gradient ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isDark
            ? 'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.15), transparent 35%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15), transparent 30%)'
            : 'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.08), transparent 35%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.08), transparent 30%)',
          opacity: 0.7,
          zIndex: 0
        } : {}
      }}
    >
      {/* 色块 */}
      {colorBlobs.map((blob) => (
        <motion.svg
          key={blob.id}
          width={blob.size}
          height={blob.size}
          viewBox={`0 0 ${blob.size} ${blob.size}`}
          initial={{
            x: `${blob.x}%`,
            y: `${blob.y}%`,
            rotate: blob.rotation,
            opacity: 0
          }}
          animate={{
            x: [`${blob.x}%`, `${(blob.x + 30) % 100}%`, `${(blob.x + 10) % 100}%`],
            y: [`${blob.y}%`, `${(blob.y + 20) % 100}%`, `${(blob.y - 10) % 100}%`],
            rotate: [blob.rotation, blob.rotation + 180, blob.rotation + 360],
            opacity: [0, blob.opacity, blob.opacity]
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            filter: `blur(${blurStrength}px)`,
            zIndex: 1
          }}
        >
          <motion.path
            d={getShapePath(blob.shape, blob.size)}
            fill={blob.color}
            animate={blob.colorTransition ? {
              fill: [
                blob.color,
                getColors()[Math.floor(Math.random() * getColors().length)],
                getColors()[Math.floor(Math.random() * getColors().length)],
                blob.color
              ]
            } : undefined}
            transition={blob.colorTransition ? {
              duration: blob.colorDuration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            } : undefined}
          />
        </motion.svg>
      ))}

      {/* 纹理叠加层 */}
      {overlay.pattern !== 'none' && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: overlay.opacity || 0.02,
            zIndex: 2,
            ...getPatternStyle()
          }}
        />
      )}
    </Box>
  );

  // 如果不包裹内容，只返回背景层和内容
  if (!wrapContent) {
    return (
      <>
        {backgroundElement}
        {children}
      </>
    );
  }

  // 包裹内容
  return (
    <>
      {backgroundElement}
      <Box
        sx={{
          position: 'relative',
          zIndex: zIndex + 3,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default GlassyBackground;
