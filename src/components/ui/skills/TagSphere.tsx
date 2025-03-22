import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Box, useTheme as useMuiTheme, useMediaQuery, Typography, alpha } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import debounce from 'lodash/debounce';

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
  glassEffect?: boolean;
}

/**
 * 增强版3D标签云组件
 * 使用CSS 3D变换和Framer Motion实现流畅的动画效果
 * 支持鼠标交互、触摸控制和自动旋转
 * 优化性能，支持大量标签
 */
const TagSphere: React.FC<TagSphereProps> = ({
  tags,
  radius = 150,
  initialSpeed = 0.5,
  animated = true,
  enableSizing = true,
  colorScheme = 'mixed',
  glassEffect = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTag, setHoveredTag] = useState<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const muiTheme = useMuiTheme();

  // 鼠标位置跟踪
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 平滑的鼠标跟随效果
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // 响应式调整
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));
  const isWideScreen = useMediaQuery(muiTheme.breakpoints.up('xl'));

  // 根据屏幕尺寸和标签数量调整半径
  const responsiveRadius = useMemo(() => {
    const tagCountFactor = Math.min(1.2, 1 + (tags?.length / 100 || 0));
    const baseRadius = radius * tagCountFactor;

    if (isMobile) return baseRadius * 0.6;
    if (isTablet) return baseRadius * 0.7;
    if (isWideScreen) return baseRadius * 1.1;
    return baseRadius * 0.8;
  }, [radius, tags, isMobile, isTablet, isWideScreen]);

  // 限制显示的标签数量，防止过度拥挤和性能问题
  const limitedTags = useMemo(() => {
    if (!tags || tags.length === 0) {
      console.warn("TagSphere: 标签数据为空");
      return [];
    }

    const maxTags = isMobile ? 16 : isTablet ? 24 : isWideScreen ? 40 : 32;
    if (tags.length > maxTags) {
      return [...tags]
        .sort((a, b) => ((b.value || 1) - (a.value || 1)))
        .slice(0, maxTags);
    }
    return tags;
  }, [tags, isMobile, isTablet, isWideScreen]);

  // 3D标签位置计算 - 使用useRef避免重新创建
  const tagsData = useRef<Array<{
    tag: Tag;
    position: { x: number; y: number; z: number; };
    color: string;
    scale: number;
    rotation: { x: number; y: number; z: number; };
  }>>([]);

  // 获取颜色方案
  const getColors = useCallback(() => {
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
        '#90caf9',
        '#64b5f6',
        '#42a5f5',
        '#2196f3',
        '#1e88e5',
        '#1976d2'
      ],
      purple: [
        '#ce93d8',
        '#ba68c8',
        '#ab47bc',
        '#9c27b0',
        '#8e24aa',
        '#7b1fa2'
      ],
      green: [
        '#a5d6a7',
        '#81c784',
        '#66bb6a',
        '#4caf50',
        '#43a047',
        '#388e3c'
      ],
      warmth: [
        '#ffcdd2',
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

    return colorSchemes[colorScheme];
  }, [colorScheme]);

  // 创建标签位置和属性
  const initializeTagsData = useCallback(() => {
    if (!limitedTags || limitedTags.length === 0) {
      console.warn("TagSphere: 无法初始化标签数据，标签列表为空");
      return;
    }

    console.log("TagSphere: 正在初始化标签数据, 数量:", limitedTags.length);

    const tagSizeFactor = Math.max(0.4, 1 - (limitedTags.length / 90));
    const colors = getColors();

    // 直接使用新的标签数据
    const newTagsData = limitedTags.map((tag, i) => {
      // 使用黄金螺旋分布算法，确保标签均匀分布
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const theta = 2 * Math.PI * (i / goldenRatio);
      const phi = Math.acos(1 - 2 * (i + 0.5) / limitedTags.length);

      // 添加少量随机偏移，使分布更自然
      const randomOffset = 0.05;
      const offsetX = (Math.random() * 2 - 1) * randomOffset * responsiveRadius;
      const offsetY = (Math.random() * 2 - 1) * randomOffset * responsiveRadius;
      const offsetZ = (Math.random() * 2 - 1) * randomOffset * responsiveRadius;

      const x = responsiveRadius * Math.sin(phi) * Math.cos(theta) + offsetX;
      const y = responsiveRadius * Math.sin(phi) * Math.sin(theta) + offsetY;
      const z = responsiveRadius * Math.cos(phi) + offsetZ;

      // 计算标签大小
      const value = tag.value || 1;
      // 调整比例，标签大小差异更平滑
      const scale = enableSizing
        ? (0.6 + (value / 20) * 0.4) * tagSizeFactor
        : tagSizeFactor;

      // 设置标签颜色
      const color = tag.color || colors[i % colors.length];

      // 添加随机旋转，使标签看起来更自然
      const rotation = {
        x: Math.random() * 0.05 - 0.025,
        y: Math.random() * 0.05 - 0.025,
        z: Math.random() * 0.05 - 0.025
      };

      return {
        tag,
        position: { x, y, z },
        color,
        scale,
        rotation
      };
    });

    // 更新标签数据引用
    tagsData.current = newTagsData;
    console.log("TagSphere: 标签数据初始化完成，标签数量:", newTagsData.length);

    // 标记初始化完成
    setIsInitialized(true);
  }, [limitedTags, responsiveRadius, enableSizing, getColors]);

  // 优先初始化标签数据
  useEffect(() => {
    console.log("TagSphere: 组件挂载，准备初始化标签数据");

    if (!tags) {
      console.warn("TagSphere: 标签数据未定义");
      return;
    }

    if (tags.length === 0) {
      console.warn("TagSphere: 标签数据为空数组");
      return;
    }

    console.log("TagSphere: 开始初始化标签数据, 标签数量:", tags.length);
    initializeTagsData();

  }, [tags, initializeTagsData]);

  // 自动旋转状态
  const rotationState = useRef({
    angleX: 0,
    angleY: 0,
    speed: 0.0015, // 降低默认速度
    lastTime: 0,
    mouseX: 0,
    mouseY: 0,
    isMouseActive: false
  });

  // 优化鼠标/触摸事件处理 - 使用debounce减少事件触发频率
  const handlePointerMove = useCallback(debounce((clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 更新鼠标位置
    mouseX.set((clientX - rect.left - centerX) / centerX);
    mouseY.set((clientY - rect.top - centerY) / centerY);

    rotationState.current.mouseX = mouseX.get();
    rotationState.current.mouseY = mouseY.get();
    rotationState.current.isMouseActive = true;

    // 鼠标移动时暂时增加速度
    rotationState.current.speed = 0.002;
  }, 16), [mouseX, mouseY]);  // 16ms ~= 60fps

  // 处理鼠标移动 - 使用useCallback
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handlePointerMove(e.clientX, e.clientY);
  }, [handlePointerMove]);

  // 处理触摸移动 - 使用useCallback
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault(); // 防止页面滚动
  }, [handlePointerMove]);

  // 鼠标/触摸离开时重置状态 - 使用useCallback
  const handlePointerLeave = useCallback(() => {
    rotationState.current.isMouseActive = false;
    rotationState.current.speed = 0.0015;
    setHoveredTag(null);
  }, []);

  // 处理点击事件 - 使用useCallback
  const handleClick = useCallback(() => {
    if (hoveredTag !== null && tagsData.current[hoveredTag]?.tag.url) {
      window.open(tagsData.current[hoveredTag].tag.url, '_blank', 'noopener,noreferrer');
    }
  }, [hoveredTag]);

  // 渲染CSS 3D标签云
  const renderCssSphere = useCallback(() => {
    // 确保tagsData已经初始化
    if (!isInitialized || !tagsData.current || tagsData.current.length === 0) {
      console.log("标签数据未初始化或为空");
      return (
        <Box sx={{
          height: { xs: 280, sm: 320, md: 380 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant="body1" color="text.secondary">
            {isDark ? '✨' : '⚙️'} 加载标签中...
          </Typography>
        </Box>
      );
    }

    console.log("渲染标签云，标签数量:", tagsData.current.length);

    return (
      <Box
        ref={containerRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={handlePointerLeave}
        onTouchEnd={handlePointerLeave}
        sx={{
          width: '100%',
          height: {
            xs: '280px',
            sm: '320px',
            md: '380px',
            lg: '420px'
          },
          position: 'relative',
          perspective: '1000px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          my: { xs: 2, sm: 3, md: 4 },
          bgcolor: 'transparent',
          borderRadius: '16px',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            padding: '1px',
            background: `linear-gradient(120deg, ${
              isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
            }, ${
              isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'
            })`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none'
          }
        }}
      >
        <Box
          id="tag-sphere-container"
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(0deg) rotateY(0deg)',
            transition: 'transform 0.1s linear',
            willChange: 'transform', // 提示浏览器做硬件加速
          }}
        >
          {tagsData.current.map((tagData, index) => {
            const { tag, position, color, scale, rotation } = tagData;
            const isHovered = hoveredTag === index;

            // 计算z轴位置对应的透明度
            const zNormalized = position.z / responsiveRadius;
            const opacity = 0.4 + Math.max(0, (zNormalized + 1) / 2) * 0.6;

            // 优化性能：跳过渲染完全不可见的标签（超出视野）
            if (position.z < -responsiveRadius * 0.75) {
              return null;
            }

            // 基础字体大小
            const baseFontSize = isMobile ? 11 : isTablet ? 12 : 14;
            const fontSize = baseFontSize * scale;

            // 玻璃效果样式
            const glassStyles = glassEffect ? {
              background: isDark
                ? alpha('#1A1A2A', 0.7)
                : alpha('#FFFFFF', 0.8),
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)', // Safari支持
              border: `1px solid ${
                isDark ? alpha('#ffffff', 0.1) : alpha('#000000', 0.05)
              }`,
              boxShadow: isHovered
                ? `0 4px 12px ${isDark ? alpha('#ffffff', 0.15) : alpha('#000000', 0.15)}`
                : `0 2px 8px ${isDark ? alpha('#000000', 0.25) : alpha('#000000', 0.1)}`
            } : {
              background: isDark ? 'rgba(26, 26, 45, 0.7)' : 'rgba(255, 255, 255, 0.7)',
              border: `1px solid ${
                isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
              }`,
              boxShadow: isHovered
                ? `0 0 8px ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`
                : 'none'
            };

            return (
              <Box
                key={`tag-${index}-${tag.name}`}
                component={motion.div}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity,
                  scale: isHovered ? scale * 1.1 : scale,
                }}
                whileHover={{
                  scale: scale * 1.2,
                  zIndex: 1000,
                }}
                onHoverStart={() => setHoveredTag(index)}
                onHoverEnd={() => setHoveredTag(null)}
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateX(${rotation.x * 360}deg) rotateY(${rotation.y * 360}deg) rotateZ(${rotation.z * 360}deg)`,
                  color,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: `${fontSize}px`,
                  lineHeight: 1.3,
                  fontWeight: isHovered ? 600 : 500,
                  cursor: tag.url ? 'pointer' : 'default',
                  userSelect: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  zIndex: Math.floor((position.z + responsiveRadius) * 10),
                  transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased', // 文字渲染优化
                  textRendering: 'optimizeLegibility',
                  textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
                  ...glassStyles,
                }}
              >
                {tag.icon && (
                  <Box
                    component="span"
                    sx={{
                      fontSize: `${fontSize * 1.1}px`,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {tag.icon}
                  </Box>
                )}
                {tag.name}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }, [
    isDark, responsiveRadius, handleClick, handleMouseMove,
    handleTouchMove, handlePointerLeave, hoveredTag,
    isMobile, isTablet, glassEffect, isInitialized
  ]);

  // 动画函数 - 使用requestAnimationFrame优化性能
  useEffect(() => {
    if (!isInitialized || !animated) return;

    // 减少动画帧率，提高性能
    let lastTimestamp = 0;
    const frameInterval = isMobile ? 40 : isTablet ? 30 : 20; // 降低帧率，提高性能

    const animateTagSphere = (timestamp: number) => {
      if (!containerRef.current) return;

      // 控制帧率
      if (timestamp - lastTimestamp < frameInterval) {
        animationRef.current = requestAnimationFrame(animateTagSphere);
        return;
      }

      lastTimestamp = timestamp;

      // 计算时间增量
      const deltaTime = rotationState.current.lastTime
        ? (timestamp - rotationState.current.lastTime) / 16.7
        : 1;
      rotationState.current.lastTime = timestamp;

      // 根据鼠标位置或自动计算角度
      let rotationX, rotationY;

      if (rotationState.current.isMouseActive) {
        // 鼠标控制旋转
        rotationX = smoothMouseY.get() * initialSpeed * 0.003 * deltaTime;
        rotationY = smoothMouseX.get() * initialSpeed * 0.003 * deltaTime;

        // 缓动衰减
        rotationState.current.mouseX *= 0.95;
        rotationState.current.mouseY *= 0.95;

        if (Math.abs(rotationState.current.mouseX) < 0.01 &&
            Math.abs(rotationState.current.mouseY) < 0.01) {
          rotationState.current.isMouseActive = false;
        }
      } else {
        // 自动旋转 - 降低速度
        rotationX = rotationState.current.speed * deltaTime * 0.2;
        rotationY = rotationState.current.speed * deltaTime * 0.4;
      }

      // 更新角度
      rotationState.current.angleX += rotationX;
      rotationState.current.angleY += rotationY;

      // 应用旋转矩阵到标签位置
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      // 更新每个标签的位置
      tagsData.current.forEach(tagData => {
        const { x, y, z } = tagData.position;

        // 绕Y轴旋转
        const newX = x * cosY - z * sinY;
        const newZ = z * cosY + x * sinY;

        // 绕X轴旋转
        const newY = y * cosX - newZ * sinX;
        const finalZ = newZ * cosX + y * sinX;

        // 更新位置
        tagData.position.x = newX;
        tagData.position.y = newY;
        tagData.position.z = finalZ;
      });

      // 排序标签，确保Z轴正确渲染顺序
      tagsData.current.sort((a, b) => b.position.z - a.position.z);

      // 更新DOM元素的变换 - 使用CSS变换而不是直接操作DOM属性，提高性能
      const container = document.getElementById('tag-sphere-container');
      if (container) {
        container.style.transform = `rotateX(${rotationState.current.angleX}rad) rotateY(${rotationState.current.angleY}rad)`;
      }

      // 继续下一帧动画
      animationRef.current = requestAnimationFrame(animateTagSphere);
    };

    // 开始动画
    animationRef.current = requestAnimationFrame(animateTagSphere);

    // 清理函数
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInitialized, animated, initialSpeed, smoothMouseX, smoothMouseY, isMobile, isTablet]);

  // 使用useMemo优化渲染
  const sphereContent = useMemo(() => renderCssSphere(), [renderCssSphere]);

  // 如果尚未初始化，显示加载状态
  if (!isInitialized) {
    return (
      <Box sx={{
        height: { xs: 280, sm: 320, md: 380 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="body1" color="text.secondary">
          {isDark ? '✨' : '⚙️'} 加载标签云中...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {sphereContent}
    </Box>
  );
};

// 使用React.memo包装组件，避免不必要的重新渲染
export default React.memo(TagSphere);
