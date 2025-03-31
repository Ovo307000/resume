import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Box, Typography, useTheme as useMuiTheme, useMediaQuery, alpha } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { Text, OrbitControls, useDetectGPU, Stats } from '@react-three/drei';
import * as THREE from 'three';

// 定义标签接口
interface Tag {
  name: string;
  icon?: React.ReactNode;
  url?: string;
  value?: number;
  color?: string;
}

// TagSphere属性接口
interface TagSphereProps {
  tags: Tag[];
  radius?: number;
  initialSpeed?: number;
  animated?: boolean;
  enableSizing?: boolean;
  colorScheme?: 'rainbow' | 'blue' | 'purple' | 'green' | 'warmth' | 'mixed';
}

// 确保颜色有 # 前缀的工具函数
const ensureColorPrefix = (color: string) => {
  return color.startsWith('#') ? color : '#' + color;
};

// 单个标签组件 - 性能优化版
const TagText = ({ tag, position, scale, color, index }: {
  tag: Tag;
  position: [number, number, number];
  scale: number;
  color: string;
  index: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);

  // 更平滑、自然的个体动画
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const elapsedTime = clock.elapsedTime;
    // 微小的上下浮动
    ref.current.position.y = position[1] + Math.sin(elapsedTime * 0.5 + index * 0.8) * 0.1;
    // 微小的左右旋转
    ref.current.rotation.y = Math.sin(elapsedTime * 0.3 + index * 0.5) * 0.05;
  });

  // 处理点击事件
  const handleClick = () => {
    if (tag.url) {
      window.open(tag.url, '_blank', 'noopener,noreferrer');
    }
  };

  // 处理鼠标悬停事件
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'default';
  };

  // 计算最终颜色和轮廓
  const colorWithPrefix = ensureColorPrefix(color);
  const finalColor = isHovered
    ? new THREE.Color(colorWithPrefix).lerp(new THREE.Color("#ffffff"), 0.3).getHexString()
    : color;
  const finalOutlineColor = isHovered ? (isDark ? '#ffffff' : '#000000') : (isDark ? '#000000' : '#ffffff');
  const finalOutlineOpacity = isHovered ? 0.8 : 0.4;
  const finalOutlineWidth = isHovered ? 0.03 : 0.025;

  const textScale = isHovered ? scale * 1.15 : scale;

  // 确保显示时颜色前面有 #
  const displayColor = ensureColorPrefix(finalColor);

  return (
    <Text
      ref={ref}
      // 使用原始position，内部动画修改实际位置
      position={position}
      scale={[textScale, textScale, textScale]}
      color={displayColor} // 确保颜色有 # 前缀
      fontSize={0.8} // 可以适当调整基础字号
      maxWidth={2}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      font="/fonts/Inter-Medium.woff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={finalOutlineWidth}
      outlineColor={finalOutlineColor}
      outlineOpacity={finalOutlineOpacity}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {tag.name}
      <meshBasicMaterial color={displayColor} side={THREE.DoubleSide} toneMapped={false} />
    </Text>
  );
};

// 标签云容器 - 优化空间分布
const TagCloud = ({ tags, radius = 12, colorScheme, enableSizing }: {
  tags: Tag[];
  radius: number;
  colorScheme: string;
  enableSizing: boolean;
}) => {
  const ref = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 获取颜色方案
  const getColors = useMemo(() => {
    const colorSchemes: Record<string, string[]> = {
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
        '#2196f3',
        '#64b5f6',
        '#42a5f5',
        '#2196f3',
        '#1e88e5',
        '#1976d2'
      ],
      purple: [
        '#9c27b0',
        '#ba68c8',
        '#ab47bc',
        '#9c27b0',
        '#8e24aa',
        '#7b1fa2'
      ],
      green: [
        '#4caf50',
        '#81c784',
        '#66bb6a',
        '#4caf50',
        '#43a047',
        '#388e3c'
      ],
      warmth: [
        '#f44336',
        '#ef9a9a',
        '#e57373',
        '#ef5350',
        '#f44336',
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

    // 确保所有颜色都有 # 前缀
    return colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.mixed;
  }, [colorScheme]);

  // 生成标签位置 - 优化点: 使用斐波那契球面分布优化标签位置，减少重叠
  const tagItems = useMemo(() => {
    if (!tags || tags.length === 0) return [];

    const fibonacciSphere = (samples: number, radius: number) => {
      const points: [number, number, number][] = [];
      const offset = 2/samples;
      const increment = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < samples; i++) {
        const y = ((i * offset) - 1) + (offset / 2);
        const r = Math.sqrt(1 - y*y) * radius;
        const phi = ((i + 1) % samples) * increment;

        const x = Math.cos(phi) * r;
        const z = Math.sin(phi) * r;

        points.push([x, y * radius, z]);
      }

      return points;
    };

    // 生成标签点
    const points = fibonacciSphere(tags.length, radius);

    return tags.map((tag, i) => {
      // 设置标签大小
      const value = tag.value || 1;
      const scale = enableSizing ? 0.6 + (value / 10) * 0.4 : 0.8;

      // 为了避免重叠，向外稍微推动小标签
      let position = points[i];
      if (scale < 0.8) {
        // 小标签向外推到1.2倍半径位置
        const pushFactor = 1.2;
        position = [
          position[0] * pushFactor,
          position[1] * pushFactor,
          position[2] * pushFactor
        ] as [number, number, number];
      }

      // 设置标签颜色 - 确保颜色足够鲜明
      const baseColor = getColors[i % getColors.length];
      // 使用原始颜色，因为在使用时会通过 ensureColorPrefix 函数确保有 # 前缀
      const color = baseColor;

      return {
        tag,
        position,
        scale, // 移除条件判断，直接使用计算好的scale
        color,
        key: `tag-${i}-${tag.name}`,
        index: i
      };
    });
  }, [tags, radius, getColors, enableSizing, isDark]);

  // 整体旋转动画 - 降低旋转速度，减轻GPU压力
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.05;
  });

  return (
    <group ref={ref}>
      {tagItems.map((item) => (
        <TagText
          key={item.key}
          tag={item.tag}
          position={item.position}
          scale={item.scale}
          color={item.color}
          index={item.index}
        />
      ))}
    </group>
  );
};

/**
 * 基于Three.js的3D技能标签云组件 - 性能优化版
 * 使用React Three Fiber提供流畅的3D渲染和交互
 */
const TagSphere: React.FC<TagSphereProps> = ({
  tags,
  initialSpeed = 0.5,
  animated = true,
  enableSizing = true,
  colorScheme = 'mixed',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const muiTheme = useMuiTheme();
  const [showFallback, setShowFallback] = useState(false);

  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));
  const isWideScreen = useMediaQuery(muiTheme.breakpoints.up('xl'));

  const gpu = useDetectGPU();

  useEffect(() => {
    if (gpu && gpu.tier < 1) {
      setShowFallback(true);
    }
  }, [gpu]);

  const limitedTags = useMemo(() => {
    if (!tags || tags.length === 0) {
      return [];
    }
    const maxTags = isMobile ? 20 : isTablet ? 30 : isWideScreen ? 50 : 40;

    if (tags.length > maxTags) {
      return [...tags]
        .sort((a, b) => ((b.value || 1) - (a.value || 1)))
        .slice(0, maxTags);
    }
    return tags;
  }, [tags, isMobile, isTablet, isWideScreen]);

  const responsiveRadius = useMemo(() => {
    const baseRadius = isMobile ? 8 : isTablet ? 10 : isWideScreen ? 14 : 12;
    return baseRadius;
  }, [isMobile, isTablet, isWideScreen]);

  // Fallback 2D rendering (keep as is)
  if (showFallback) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%', // 让 fallback 充满容器
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          gap: 2,
          padding: 3 // 内边距
        }}
      >
        {limitedTags.map((tag, index) => {
          // 确保颜色有 # 前缀
          const tagColor = tag.color ? ensureColorPrefix(tag.color) : (isDark ? '#7c4dff' : '#4c8cff');

          return (
            <Box
              key={`2d-tag-${index}`}
              sx={{
                padding: '6px 12px',
                borderRadius: '50px',
                backgroundColor: alpha(tagColor, isDark ? 0.2 : 0.1),
                color: tagColor,
                fontWeight: 'bold',
                fontSize: tag.value ? `${0.8 + (tag.value / 10) * 0.4}rem` : '1rem',
                boxShadow: `0 4px 8px ${alpha('#000000', 0.1)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 6px 12px ${alpha('#000000', 0.2)}`,
                }
              }}
            >
              {tag.name}
            </Box>
          );
        })}
      </Box>
    );
  }

  // 移除GlassyBlobBackground，直接返回Canvas或"无数据"Box
  return (
    <>
      {tags && tags.length > 0 ? (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 25], fov: 45 }}
          gl={{ antialias: true }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} // Canvas fills the container
        >
          <ambientLight intensity={isDark ? 0.6 : 0.8} />
          <pointLight position={[15, 15, 15]} intensity={isDark ? 0.3 : 0.4} />

          <Suspense fallback={null}>
            <TagCloud
              tags={limitedTags}
              radius={responsiveRadius}
              colorScheme={colorScheme}
              enableSizing={enableSizing}
            />
          </Suspense>

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            rotateSpeed={0.5}
            autoRotate={animated}
            autoRotateSpeed={initialSpeed}
            enableDamping={true}
            minDistance={15}
            maxDistance={40}
          />

          {process.env.NODE_ENV === 'development' && <Stats />}
        </Canvas>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: 'text.secondary' // Ensure text is visible
          }}
        >
          <Typography variant="h6">
            暂无技能标签数据
          </Typography>
        </Box>
      )}
    </>
  );
};

export default TagSphere;
