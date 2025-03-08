import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useAnimationFrame } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

// 定义粒子类型
interface AnimatedParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

/**
 * 动态渐变背景组件接口
 */
export interface AnimatedGradientBackgroundProps {
  children: React.ReactNode;
  particleCount?: number;
  colorScheme?: 'default' | 'purple' | 'blue' | 'green' | 'ocean' | 'sunset' | 'rainbow';
  intensity?: 'light' | 'medium' | 'strong';
  hasGrid?: boolean;
  hasNoise?: boolean;
  minHeight?: string;
  fullHeight?: boolean;
  overlayOpacity?: number;
}

/**
 * 动态渐变背景组件
 * 提供流体色块背景效果
 */
const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  children,
  particleCount = 25,
  colorScheme = 'default',
  intensity = 'medium',
  hasGrid = true,
  hasNoise = true,
  minHeight = 'calc(100vh - 64px)',
  fullHeight = false,
  overlayOpacity = 0.4
}) => {
  const { theme } = useTheme();
  const [particles, setParticles] = useState<AnimatedParticle[]>([]);
  const particlesRef = useRef<AnimatedParticle[]>([]);

  // 获取颜色集
  const getColorSet = () => {
    // 根据主题和强度决定颜色亮度和透明度
    const getAlpha = () => {
      if (intensity === 'light') return theme === 'dark' ? 0.3 : 0.15;
      if (intensity === 'medium') return theme === 'dark' ? 0.5 : 0.25;
      return theme === 'dark' ? 0.7 : 0.4;
    };

    const alpha = getAlpha();

    // 预定义的颜色集
    const colorSets = {
      default: theme === 'dark'
        ? ['#8A2BE2', '#FF0080', '#00DFD8', '#7928CA']
        : ['#6366F1', '#0070F3', '#00DFD8', '#6366F1'],
      purple: theme === 'dark'
        ? ['#8A2BE2', '#6A5ACD', '#9370DB', '#7B68EE']
        : ['#7E57C2', '#9575CD', '#B39DDB', '#673AB7'],
      blue: theme === 'dark'
        ? ['#0070F3', '#1E90FF', '#00BFFF', '#00008B']
        : ['#2196F3', '#64B5F6', '#90CAF9', '#1976D2'],
      green: theme === 'dark'
        ? ['#00DFD8', '#00C853', '#69F0AE', '#00796B']
        : ['#4CAF50', '#81C784', '#A5D6A7', '#388E3C'],
      ocean: theme === 'dark'
        ? ['#0070F3', '#00DFD8', '#00C853', '#00838F']
        : ['#039BE5', '#4DD0E1', '#80DEEA', '#00838F'],
      sunset: theme === 'dark'
        ? ['#FF0080', '#FF4081', '#FF9E80', '#FF8A65']
        : ['#FF5722', '#FF8A65', '#FFAB91', '#E64A19'],
      rainbow: theme === 'dark'
        ? ['#FF0080', '#8A2BE2', '#0070F3', '#00DFD8', '#00C853', '#FF9E80']
        : ['#F44336', '#9C27B0', '#2196F3', '#00BCD4', '#4CAF50', '#FF9800']
    };

    // 返回选择的颜色集并应用透明度
    return colorSets[colorScheme].map(color => `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`);
  };

  // 初始化粒子
  useEffect(() => {
    // 创建粒子
    const createParticles = () => {
      const colors = getColorSet();
      const newParticles: AnimatedParticle[] = [];

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.floor(Math.random() * 250) + 150,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.4 + 0.2,
          rotation: Math.random() * 360,
          velocityX: (Math.random() - 0.5) * 0.03,
          velocityY: (Math.random() - 0.5) * 0.03,
          rotationSpeed: (Math.random() - 0.5) * 0.3
        });
      }

      setParticles(newParticles);
      particlesRef.current = newParticles;
    };

    createParticles();
  }, [colorScheme, intensity, particleCount, theme]);

  // 使用帧动画优化粒子移动
  useAnimationFrame(() => {
    const updatedParticles = particlesRef.current.map(particle => {
      // 更新粒子位置
      let newX = particle.x + particle.velocityX;
      let newY = particle.y + particle.velocityY;

      // 边界检测，超出边界则从另一边再次进入
      if (newX > 100) newX = 0;
      if (newX < 0) newX = 100;
      if (newY > 100) newY = 0;
      if (newY < 0) newY = 100;

      // 更新旋转角度
      const newRotation = (particle.rotation + particle.rotationSpeed) % 360;

      return {
        ...particle,
        x: newX,
        y: newY,
        rotation: newRotation
      };
    });

    particlesRef.current = updatedParticles;
    setParticles(updatedParticles);
  });

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: fullHeight ? '100vh' : minHeight,
        width: '100%',
        overflow: 'hidden',
        backgroundImage: theme === 'dark'
          ? 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)'
          : 'radial-gradient(ellipse at bottom, #f5f7fa 0%, #eef1f5 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* 网格图案 */}
      {hasGrid && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: theme === 'dark'
              ? 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
              : 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            zIndex: 1,
            opacity: 0.4
          }}
        />
      )}

      {/* 噪声纹理 */}
      {hasNoise && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: theme === 'dark' ? 0.15 : 0.07,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            zIndex: 2
          }}
        />
      )}

      {/* 动态粒子 */}
      {particles.map(({ id, x, y, size, color, opacity, rotation }) => (
        <Box
          key={id}
          sx={{
            position: 'absolute',
            top: `${y}%`,
            left: `${x}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            filter: `blur(${size * 0.7}px)`,
            opacity,
            transform: `rotate(${rotation}deg)`,
            zIndex: 3,
            transition: 'opacity 2s ease, transform 2s ease, filter 2s ease'
          }}
        />
      ))}

      {/* 半透明叠加层，用于增强内容可读性 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme === 'dark'
            ? `rgba(13, 14, 19, ${overlayOpacity})`
            : `rgba(255, 255, 255, ${overlayOpacity})`,
          backdropFilter: `blur(${intensity === 'light' ? 2 : intensity === 'medium' ? 3 : 4}px)`,
          zIndex: 5
        }}
      />

      {/* 内容区域 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          height: '100%'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AnimatedGradientBackground;
