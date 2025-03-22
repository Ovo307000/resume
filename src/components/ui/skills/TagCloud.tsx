import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../../../contexts/ThemeContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, TrackballControls } from '@react-three/drei';

// 定义标签接口
interface Tag {
  name: string;
  icon?: React.ReactNode;
  url?: string;
  value?: number;
  color?: string;
}

// TagCloud属性接口
interface TagCloudProps {
  tags: Tag[];
  radius?: number;
  maxSpeed?: number;
  initialSpeed?: number;
  direction?: number;
  keep?: boolean;
}

/**
 * 使用Three.js和react-three-fiber实现的3D标签云组件
 * 支持鼠标交互，自动旋转，以及点击标签
 */
const TagCloud: React.FC<TagCloudProps> = ({
  tags,
  radius = 300,
  maxSpeed = 7,
  initialSpeed = 1,
  direction = 135,
  keep = true
}) => {
  const muiTheme = useMuiTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isSmall = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 响应式调整
  const responsiveRadius = isSmall ? radius * 0.7 : isMedium ? radius * 0.8 : radius;

  // 根据标签数量限制显示数量，避免性能问题
  const limitedTags = tags.length > 80 ? tags.slice(0, 80) : tags;

  // 错误处理
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <Box sx={{
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        p: 3,
        textAlign: 'center'
      }}>
        <Typography color="error" variant="h6" gutterBottom>
          标签云加载失败
        </Typography>
        <Typography color="text.secondary">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: {
          xs: '300px',
          sm: '350px',
          md: '400px',
          lg: '450px'
        },
        position: 'relative',
        perspective: '1000px',
        overflow: 'hidden',
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
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 600], fov: 75 }}
        style={{ background: 'transparent' }}
        onError={(e) => setError(e.message)}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <TagCloudContent
          tags={limitedTags}
          radius={responsiveRadius}
          maxSpeed={maxSpeed}
          initialSpeed={initialSpeed}
          direction={direction}
          keep={keep}
          isDark={isDark}
        />
        <TrackballControls rotateSpeed={2.5} />
      </Canvas>
    </Box>
  );
};

/**
 * 标签云内容组件，处理3D相关的效果和交互
 */
const TagCloudContent: React.FC<{
  tags: Tag[];
  radius: number;
  maxSpeed: number;
  initialSpeed: number;
  direction: number;
  keep: boolean;
  isDark: boolean;
}> = ({ tags, radius, maxSpeed, initialSpeed, direction, keep, isDark }) => {
  const sphereRef = useRef<THREE.Group>(null);
  const [clicked, setClicked] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // 计算每个标签的3D位置
  const tagPositions = React.useMemo(() => {
    return tags.map((tag, i) => {
      // 使用黄金螺旋分布算法，确保标签均匀分布
      const phi = Math.acos(-1 + (2 * i) / tags.length);
      const theta = Math.sqrt(tags.length * Math.PI) * phi;

      // 根据标签的value属性调整距离
      const value = tag.value || 1;
      const size = 0.5 + (value / 15) * 0.5;
      const distance = radius;

      return {
        name: tag.name,
        position: [
          distance * Math.cos(theta) * Math.sin(phi),
          distance * Math.sin(theta) * Math.sin(phi),
          distance * Math.cos(phi)
        ],
        size,
        url: tag.url,
        color: tag.color || getTagColor(i, isDark)
      };
    });
  }, [tags, radius, isDark]);

  // 自动旋转球体
  useFrame((state) => {
    if (sphereRef.current) {
      const time = state.clock.getElapsedTime();
      sphereRef.current.rotation.x = Math.sin(time / 10) * 0.2;
      sphereRef.current.rotation.y = Math.sin(time / 15) * 0.2 + time * 0.05;
    }
  });

  // 处理点击事件
  const handleClick = (tag: string, url?: string) => {
    setClicked(tag);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    // 如果没有URL，可以触发其他交互
    setTimeout(() => setClicked(null), 600);
  };

  return (
    <group ref={sphereRef}>
      {tagPositions.map((tag, i) => (
        <Text
          key={`tag-${i}-${tag.name}`}
          position={tag.position as [number, number, number]}
          fontSize={tag.size * 10}
          color={tag.color}
          anchorX="center"
          anchorY="middle"
          // 给文本添加一点"深度"感，使其看起来更3D
          outlineWidth={0.02}
          outlineColor={isDark ? "#000000" : "#ffffff"}
          // 点击和悬停交互
          onClick={() => handleClick(tag.name, tag.url)}
          onPointerOver={() => setHovered(tag.name)}
          onPointerOut={() => setHovered(null)}
          // 为选中或悬停的标签添加动画效果
          scale={[
            clicked === tag.name ? 1.2 : hovered === tag.name ? 1.1 : 1,
            clicked === tag.name ? 1.2 : hovered === tag.name ? 1.1 : 1,
            clicked === tag.name ? 1.2 : hovered === tag.name ? 1.1 : 1,
          ]}
        >
          {tag.name}
        </Text>
      ))}
    </group>
  );
};

// 根据索引生成颜色
const getTagColor = (index: number, isDark: boolean): string => {
  const colors = isDark
    ? ['#ff7979', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8', '#00cec9', '#6c5ce7', '#fdcb6e']
    : ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e84393', '#00cec9', '#6c5ce7', '#fdcb6e'];

  return colors[index % colors.length];
};

export default TagCloud;
