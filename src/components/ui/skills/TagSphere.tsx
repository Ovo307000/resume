import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Box, useTheme as useMuiTheme, useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import { motion, useAnimation } from 'framer-motion';

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
}

/**
 * 3D标签云组件
 * 将标签以3D球形布局展示，支持动画和交互
 */
const TagSphere: React.FC<TagSphereProps> = ({
  tags,
  radius = 150,
  initialSpeed = 0.5,
  animated = true,
  enableSizing = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [, forceUpdate] = useState({});
  const frameRef = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const tagPositions = useRef<Array<{ x: number; y: number; z: number; scale: number; tag: Tag; opacity: number }>>([]);
  const [initialized, setInitialized] = useState(false);
  const [renderFallback, setRenderFallback] = useState(false);
  const prevPositions = useRef<Map<string, { x: number; y: number; z: number; opacity: number }>>(new Map());
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const muiTheme = useMuiTheme();

  // 响应式调整
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between('sm', 'md'));
  const isWideScreen = useMediaQuery(muiTheme.breakpoints.up('xl'));

  // 根据屏幕尺寸和标签数量调整半径
  const responsiveRadius = useMemo(() => {
    const tagCountFactor = Math.min(1.4, 1 + (tags.length / 60));
    const baseRadius = radius * tagCountFactor;

    if (isMobile) return baseRadius * 0.5;
    if (isTablet) return baseRadius * 0.65;
    if (isWideScreen) return baseRadius * 1.2;
    return baseRadius;
  }, [radius, tags.length, isMobile, isTablet, isWideScreen]);

  // 使用Animation控制
  const controls = useAnimation();

  // 限制显示的标签数量，防止过度拥挤
  const limitedTags = useMemo(() => {
    // 设置随机种子，保证每次刷新页面显示的标签相同
    const maxTags = isMobile ? 30 : isTablet ? 40 : 50;

    if (tags.length > maxTags) {
      // 使用稳定排序，而不是随机排序，避免每次渲染标签不同
      return [...tags]
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .slice(0, maxTags);
    }
    return tags;
  }, [tags, isMobile, isTablet]);

  // 计算标签位置 - 优化算法，更均匀分布
  const calculateTagPositions = () => {
    const positions: Array<{ x: number; y: number; z: number; scale: number; tag: Tag; opacity: number }> = [];
    const total = limitedTags.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    const tagSizeFactor = Math.max(0.3, 0.9 - (total / 80));

    const positions3D: Array<{x: number, y: number, z: number}> = [];
    const minDistance = responsiveRadius * 0.2;

    limitedTags.forEach((tag, i) => {
      let attempts = 0;
      let positionFound = false;
      let x = 0, y = 0, z = 0;

      while (!positionFound && attempts < 5) {
        const offset = attempts * 0.05;
        const theta = 2 * Math.PI * (i / goldenRatio + offset);
        const phi = Math.acos(1 - 2 * ((i + 0.5 + attempts * 0.1) % total) / total);

        const randomOffset = 0.12;
        const offsetX = (Math.random() * 2 - 1) * randomOffset * responsiveRadius;
        const offsetY = (Math.random() * 2 - 1) * randomOffset * responsiveRadius;
        const offsetZ = (Math.random() * 2 - 1) * randomOffset * responsiveRadius;

        x = responsiveRadius * Math.sin(phi) * Math.cos(theta) + offsetX;
        y = responsiveRadius * Math.sin(phi) * Math.sin(theta) + offsetY;
        z = responsiveRadius * Math.cos(phi) + offsetZ;

        if (positions3D.length > 0) {
          positionFound = !positions3D.some(pos => {
            const distance = Math.sqrt(
              Math.pow(pos.x - x, 2) +
              Math.pow(pos.y - y, 2) +
              Math.pow(pos.z - z, 2)
            );
            return distance < minDistance;
          });
        } else {
          positionFound = true;
        }

        attempts++;
      }

      positions3D.push({x, y, z});

      const value = tag.value || 1;
      const sizeScale = enableSizing
        ? (0.3 + (value / 15) * 0.4) * tagSizeFactor
        : tagSizeFactor * 0.8;

      // 计算初始透明度
      const opacity = calculateOpacity(z);

      positions.push({
        x,
        y,
        z,
        scale: sizeScale,
        tag,
        opacity
      });
    });

    // 预先排序，按照Z轴的位置
    return positions.sort((a, b) => b.z - a.z);
  };

  // 重置初始位置并添加周期性变化
  const resetPositions = () => {
    // 清除先前的动画
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    // 重置旋转状态
    autoRotate.current = {
      active: true,
      speed: 0.0015,
      angleX: 0,
      angleY: 0,
      direction: 1,     // 正向旋转
      cycleCount: 0,    // 计数器，用于定期改变方向
      targetSpeed: 0.0015, // 目标速度，用于平滑过渡
      lastTime: 0
    };

    // 清除上一次的位置缓存
    prevPositions.current.clear();

    // 重新计算标签位置
    tagPositions.current = calculateTagPositions();

    // 缓存初始位置
    tagPositions.current.forEach(pos => {
      prevPositions.current.set(pos.tag.name, {
        x: pos.x,
        y: pos.y,
        z: pos.z,
        opacity: pos.opacity
      });
    });

    // 强制渲染
    forceUpdate({});
  };

  // 自动旋转动画，添加周期性和方向变化
  const autoRotate = useRef({
    active: true,
    speed: 0.0015,
    angleX: 0,
    angleY: 0,
    direction: 1,     // 1表示正向旋转，-1表示反向旋转
    cycleCount: 0,    // 计数器，用于定期改变方向
    targetSpeed: 0.0015, // 目标速度，用于平滑过渡
    lastTime: 0
  });

  // 使用requestAnimationFrame进行动画优化
  const animate = (timestamp: number) => {
    if (!containerRef.current || !animated) return;

    // 计算每帧增量，确保跨设备平滑一致
    const deltaTime = autoRotate.current.lastTime ? timestamp - autoRotate.current.lastTime : 16.7;
    autoRotate.current.lastTime = timestamp;
    const normalizedDelta = deltaTime / 16.7;

    // 周期性变化方向和速度 (大约每30秒)
    autoRotate.current.cycleCount += normalizedDelta;
    if (autoRotate.current.cycleCount > 1800) { // 约30秒 (60fps * 30s)
      autoRotate.current.cycleCount = 0;
      // 改变旋转方向
      autoRotate.current.direction *= -1;
      // 随机化目标速度在一个合理范围内
      autoRotate.current.targetSpeed = 0.001 + Math.random() * 0.001; // 0.001-0.002之间
    }

    // 平滑过渡到目标速度
    autoRotate.current.speed += (autoRotate.current.targetSpeed - autoRotate.current.speed) * 0.01;

    let rotationX, rotationY;

    // 根据鼠标位置或自动旋转计算角度
    if (Math.abs(mousePosition.current.x) > 0.01 || Math.abs(mousePosition.current.y) > 0.01) {
      // 鼠标控制旋转，增加平滑度
      rotationX = mousePosition.current.y * initialSpeed * 0.005 * normalizedDelta;
      rotationY = mousePosition.current.x * initialSpeed * 0.005 * normalizedDelta;

      // 添加缓动复原效果
      mousePosition.current.x *= 0.95;
      mousePosition.current.y *= 0.95;

      // 暂停自动旋转
      autoRotate.current.active = false;
      // 恢复自动旋转
      if (Math.abs(mousePosition.current.x) < 0.01 && Math.abs(mousePosition.current.y) < 0.01) {
        autoRotate.current.active = true;
      }
    } else {
      // 自动旋转 - 使用时间增量保证帧率独立且考虑方向
      if (autoRotate.current.active) {
        autoRotate.current.angleX += autoRotate.current.speed * normalizedDelta / 2 * autoRotate.current.direction;
        autoRotate.current.angleY += autoRotate.current.speed * normalizedDelta * autoRotate.current.direction;
      }
      rotationX = autoRotate.current.speed * normalizedDelta / 2 * autoRotate.current.direction;
      rotationY = autoRotate.current.speed * normalizedDelta * autoRotate.current.direction;
    }

    // 应用旋转矩阵到每个标签
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);

    // 保存当前位置用于插值
    tagPositions.current.forEach(pos => {
      prevPositions.current.set(pos.tag.name, {
        x: pos.x,
        y: pos.y,
        z: pos.z,
        opacity: pos.opacity
      });
    });

    // 更新每个标签的位置
    tagPositions.current.forEach(tagPosition => {
      const { x, y, z } = tagPosition;

      // 绕Y轴旋转
      const newX = x * cosY - z * sinY;
      const newZ = z * cosY + x * sinY;

      // 绕X轴旋转
      const newY = y * cosX - newZ * sinX;
      const finalZ = newZ * cosX + y * sinX;

      // 使用插值平滑过渡 - 减少突变
      tagPosition.x = newX;
      tagPosition.y = newY;
      tagPosition.z = finalZ;

      // 更新透明度，基于z轴位置，加入平滑过渡
      tagPosition.opacity = calculateOpacity(finalZ);
    });

    // 重新排序标签，确保Z轴正确
    tagPositions.current.sort((a, b) => b.z - a.z);

    // 强制重新渲染
    forceUpdate({});

    // 继续下一帧动画
    frameRef.current = requestAnimationFrame(animate);
  };

  // 鼠标移动事件处理 - 增加灵敏度
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    // 计算鼠标相对于中心的位置，根据屏幕大小调整灵敏度
    const sensitivityFactor = isMobile ? 1 : 1.5;
    mousePosition.current = {
      x: ((e.clientX - containerRect.left - centerX) / centerX) * sensitivityFactor,
      y: ((e.clientY - containerRect.top - centerY) / centerY) * sensitivityFactor
    };
  };

  // 触摸移动处理
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length === 0) return;

    const touch = e.touches[0];
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    // 触摸设备灵敏度调整
    mousePosition.current = {
      x: ((touch.clientX - containerRect.left - centerX) / centerX) * 2,
      y: ((touch.clientY - containerRect.top - centerY) / centerY) * 2
    };

    // 阻止触摸时页面滚动
    e.preventDefault();
  };

  // 处理标签点击
  const handleTagClick = (tag: Tag) => {
    if (tag.url) {
      window.open(tag.url, '_blank', 'noopener,noreferrer');
    }
  };

  // 初始化和错误处理
  useEffect(() => {
    if (limitedTags.length > 0) {
      try {
        // 重置位置和动画
        resetPositions();

        // 标记为已初始化
        setTimeout(() => {
          setInitialized(true);
          controls.start('visible');
        }, 100);

        // 如果开启动画，开始动画循环
        if (animated) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          forceUpdate({});
        }

        // 添加错误检测 - 如果5秒后还没有标签可见，显示回退视图
        const fallbackTimer = setTimeout(() => {
          if (document.querySelectorAll('.tag-sphere-item').length === 0) {
            console.warn('TagSphere: No visible tags detected, showing fallback view');
            setRenderFallback(true);
          }
        }, 5000);

        return () => {
          if (frameRef.current !== null) {
            cancelAnimationFrame(frameRef.current);
          }
          clearTimeout(fallbackTimer);
        };
      } catch (error) {
        console.error('TagSphere initialization error:', error);
        setRenderFallback(true);
      }
    }
  }, [limitedTags, responsiveRadius, animated, enableSizing, initialSpeed, isMobile, isTablet]);

  // 透明度计算，基于z轴位置，进一步调整透明度范围
  const calculateOpacity = (z: number) => {
    // 将z轴位置映射到透明度范围，使用二次曲线使过渡更加平滑
    const minOpacity = 0.2;
    const maxOpacity = 0.85;

    // 计算相对位置 (-1 到 1 的范围)
    const relativePos = z / responsiveRadius;

    // 使用平滑曲线映射 - 二次函数可以让过渡更加平滑
    const normalizedPos = (relativePos + 1) / 2; // 0 到 1 的范围
    const smoothedPos = normalizedPos * normalizedPos; // 二次平滑化

    return minOpacity + smoothedPos * (maxOpacity - minOpacity);
  };

  // 为每个标签生成颜色
  const getTagColor = (tag: Tag, index: number) => {
    if (tag.color) return tag.color;

    const colors = isDark
      ? ['#ff7979', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8', '#00cec9', '#6c5ce7', '#fdcb6e']
      : ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e84393', '#00cec9', '#6c5ce7', '#fdcb6e'];

    return colors[index % colors.length];
  };

  // 添加入场动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  // 标签动画变体
  const tagVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // 回退视图 - 当3D渲染失败时显示
  const renderFallbackView = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          p: 4
        }}
      >
        {limitedTags.map((tag, index) => {
          const tagColor = getTagColor(tag, index);
          const value = tag.value || 1;
          const size = 0.7 + (value / 15) * 0.3;

          return (
            <Box
              key={`fallback-tag-${index}`}
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                padding: '4px 10px',
                bgcolor: isDark ? 'rgba(20, 20, 35, 0.5)' : 'rgba(240, 240, 250, 0.5)',
                color: tagColor,
                borderRadius: '16px',
                fontWeight: 500,
                fontSize: `${11 * size}px`,
                cursor: tag.url ? 'pointer' : 'default',
                backdropFilter: 'blur(5px)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                boxShadow: `0 2px 8px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`
              }}
              onClick={() => tag.url && window.open(tag.url, '_blank', 'noopener,noreferrer')}
            >
              {tag.icon && (
                <span style={{ fontSize: `${12 * size}px` }}>
                  {tag.icon}
                </span>
              )}
              {tag.name}
            </Box>
          );
        })}
      </Box>
    );
  };

  // 如果使用回退视图，则显示2D标签云
  if (renderFallback) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {renderFallbackView()}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      style={{ width: '100%' }}
    >
      <Box
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={() => setHoveredTag(null)}
        onTouchEnd={() => setHoveredTag(null)}
        sx={{
          width: '100%',
          height: {
            xs: '300px',
            sm: '400px',
            md: '500px',
            lg: '550px',
            xl: '600px'
          },
          position: 'relative',
          overflow: 'visible',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: '1200px',
          my: { xs: 3, sm: 5, md: 6 },
          userSelect: 'none',
          touchAction: 'none',
          bgcolor: isDark ? 'rgba(18, 18, 30, 0.1)' : 'rgba(240, 240, 250, 0.1)',
          borderRadius: '16px'
        }}
      >
        {!initialized && (
          <Typography variant="body1" color="text.secondary">
            加载标签云中...
          </Typography>
        )}

        {initialized && tagPositions.current.map((position, index) => {
          const { x, y, z, scale, tag, opacity } = position;
          const isHovered = hoveredTag === tag.name;
          const zIndex = Math.floor(z + responsiveRadius);

          const baseFontSize = isMobile ? 7 : isTablet ? 8 : 9;
          const maxSizeIncrease = 6;
          const size = baseFontSize + Math.min(maxSizeIncrease, (scale - 0.3) * 10);
          const tagColor = getTagColor(tag, index);

          return (
            <motion.div
              key={`tag-${index}-${tag.name}`}
              className="tag-sphere-item"
              variants={tagVariants}
              custom={index}
              initial="hidden"
              animate={{
                opacity,
                scale: isHovered ? scale * 1.1 : scale,
                x,
                y,
                zIndex
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
              whileHover={{
                scale: scale * 1.15,
                zIndex: 1000,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredTag(tag.name)}
              onHoverEnd={() => setHoveredTag(null)}
              onClick={() => handleTagClick(tag)}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%)`,
                color: tagColor,
                background: isHovered
                  ? (isDark ? 'rgba(20, 20, 35, 0.7)' : 'rgba(255, 255, 255, 0.85)')
                  : (isDark ? 'rgba(20, 20, 35, 0.3)' : 'rgba(255, 255, 255, 0.5)'),
                padding: isHovered ? '4px 10px' : '3px 8px',
                borderRadius: '14px',
                fontSize: `${size}px`,
                fontWeight: isHovered ? 600 : 500,
                cursor: tag.url ? 'pointer' : 'default',
                userSelect: 'none',
                pointerEvents: 'auto',
                boxShadow: isHovered
                  ? `0 0 10px ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`
                  : `0 1px 6px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // 增加过渡时间
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
                willChange: 'transform, opacity',
                backdropFilter: 'blur(5px)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}`,
              }}
            >
              {tag.icon && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: `${size * 1.1}px`,
                  color: tagColor
                }}>
                  {tag.icon}
                </span>
              )}
              {tag.name}
            </motion.div>
          );
        })}

        {isDark && tagPositions.current.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              fontSize: '10px',
              color: 'text.secondary',
              opacity: 0.7
            }}
          >
            标签数量: {tagPositions.current.length}
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default TagSphere;
