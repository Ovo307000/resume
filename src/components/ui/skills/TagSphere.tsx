import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import { motion } from 'framer-motion';

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
  radius = 200,
  initialSpeed = 0.5,
  animated = true,
  enableSizing = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [, forceUpdate] = useState({});
  const frameRef = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const tagPositions = useRef<Array<{ x: number; y: number; z: number; scale: number; tag: Tag }>>([]);
  const [initialized, setInitialized] = useState(false); // 添加初始化状态追踪
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 计算标签位置 - 优化算法，更均匀分布
  const calculateTagPositions = () => {
    const positions: Array<{ x: number; y: number; z: number; scale: number; tag: Tag }> = [];

    // 使用斐波那契分布，在球体上更均匀分布点
    const total = tags.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    tags.forEach((tag, i) => {
      // 计算偏移角度
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / total);

      // 球坐标转笛卡尔坐标
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // 计算标签大小比例
      const value = tag.value || 1;
      const sizeScale = enableSizing ? (0.5 + (value / 10) * 0.9) : 1;

      positions.push({
        x,
        y,
        z,
        scale: sizeScale,
        tag
      });
    });

    // 预先排序，防止初始化时标签闪烁
    return positions.sort((a, b) => b.z - a.z);
  };

  // 自动旋转动画（无鼠标交互时）
  const autoRotate = useRef({
    active: true,
    speed: 0.003,
    angleX: 0,
    angleY: 0
  });

  // 处理动画帧 - 优化动画计算
  const animate = () => {
    if (!containerRef.current || !animated) return;

    let rotationX, rotationY;

    // 根据鼠标位置或自动旋转计算角度
    if (Math.abs(mousePosition.current.x) > 0.01 || Math.abs(mousePosition.current.y) > 0.01) {
      // 鼠标控制旋转，降低转速，增加流畅度
      rotationX = mousePosition.current.y * initialSpeed * 0.005;
      rotationY = mousePosition.current.x * initialSpeed * 0.005;
      // 减慢自动旋转
      autoRotate.current.active = false;
      // 为恢复自动旋转做准备
      setTimeout(() => {
        autoRotate.current.active = true;
      }, 2000);
    } else {
      // 自动旋转
      if (autoRotate.current.active) {
        autoRotate.current.angleX += autoRotate.current.speed / 2;
        autoRotate.current.angleY += autoRotate.current.speed;
      }
      rotationX = autoRotate.current.speed;
      rotationY = autoRotate.current.speed;
    }

    // 应用旋转矩阵到每个标签
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);

    // 更新每个标签的位置
    tagPositions.current.forEach(tagPosition => {
      // 应用旋转矩阵 - 分解为更小的转动以增加平滑度
      const { x, y, z } = tagPosition;

      // 绕Y轴旋转
      const newX = x * cosY - z * sinY;
      const newZ = z * cosY + x * sinY;

      // 绕X轴旋转
      const newY = y * cosX - newZ * sinX;
      const finalZ = newZ * cosX + y * sinX;

      tagPosition.x = newX;
      tagPosition.y = newY;
      tagPosition.z = finalZ;
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

    // 计算鼠标相对于中心的位置，范围为-1到1，增加系数提高灵敏度
    mousePosition.current = {
      x: ((e.clientX - containerRect.left - centerX) / centerX) * 1.5,
      y: ((e.clientY - containerRect.top - centerY) / centerY) * 1.5
    };
  };

  // 触摸移动处理 - 添加触摸支持
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length === 0) return;

    const touch = e.touches[0];
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    mousePosition.current = {
      x: ((touch.clientX - containerRect.left - centerX) / centerX) * 1.5,
      y: ((touch.clientY - containerRect.top - centerY) / centerY) * 1.5
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

  // 初始化
  useEffect(() => {
    if (tags.length > 0) {
      // 初始化标签位置
      tagPositions.current = calculateTagPositions();

      // 标记为已初始化
      setTimeout(() => {
        setInitialized(true);
      }, 100);

      // 如果开启动画，开始动画循环
      if (animated) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        forceUpdate({});
      }
    }

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [tags, radius, animated, enableSizing, initialSpeed]);

  // 透明度计算，基于z轴位置，使前面的标签更明显
  const calculateOpacity = (z: number) => {
    // 将z值映射到0.3-1.0的范围，让前面的标签更清晰
    return 0.3 + (z + radius) / (2 * radius) * 0.7;
  };

  // 获取z轴排序，使接近屏幕的标签显示在上层
  const sortedTagPositions = [...tagPositions.current];

  // 为每个标签生成颜色
  const getTagColor = (tag: Tag, index: number) => {
    if (tag.color) return tag.color;

    // 使用更明亮的颜色组合
    const colors = isDark
      ? ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#54a0ff', '#5f27cd', '#ff9ff3', '#00d2d3', '#f368e0']
      : ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#6c5ce7', '#fd79a8', '#00cec9', '#0984e3'];

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
          height: { xs: '350px', sm: '450px', md: '550px' }, // 增加高度
          position: 'relative',
          overflow: 'visible',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: '1200px',
          my: { xs: 3, sm: 5, md: 7 },
          userSelect: 'none',
          touchAction: 'none' // 防止触摸时页面滚动
        }}
      >
        {initialized && sortedTagPositions.map((position, index) => {
          const { x, y, z, scale, tag } = position;
          const isHovered = hoveredTag === tag.name;
          const opacity = calculateOpacity(z);
          const zIndex = Math.floor(z + radius);
          const size = 12 + (scale - 1) * 14; // 基础大小 + 比例因子
          const tagColor = getTagColor(tag, index);

          return (
            <motion.div
              key={`tag-${index}-${tag.name}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity,
                scale: isHovered ? scale * 1.2 : scale,
                x,
                y,
                zIndex
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: scale * 1.3,
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
                color: isHovered ? tagColor : (isDark ? '#ffffff' : '#000000'),
                background: isHovered ? (isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)') : 'transparent',
                padding: isHovered ? '8px 16px' : '6px 10px',
                borderRadius: '30px',
                fontSize: `${size}px`,
                fontWeight: isHovered ? 700 : 500,
                cursor: tag.url ? 'pointer' : 'default',
                userSelect: 'none',
                pointerEvents: 'auto',
                boxShadow: isHovered ? (isDark ? '0 0 20px rgba(255,255,255,0.3)' : '0 0 20px rgba(0,0,0,0.25)') : 'none',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                willChange: 'transform, opacity' // 优化性能
              }}
            >
              {tag.icon && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: `${size * 1.2}px`,
                  color: tagColor
                }}>
                  {tag.icon}
                </span>
              )}
              {tag.name}
            </motion.div>
          );
        })}
      </Box>
    </motion.div>
  );
};

export default TagSphere;
