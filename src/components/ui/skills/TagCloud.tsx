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
  category?: string;
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

  // 为每个标签设置默认URL
  const tagsWithUrl = limitedTags.map(tag => ({
    ...tag,
    url: tag.url || getDefaultUrl(tag.name),
  }));

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
          tags={tagsWithUrl}
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
        color: tag.color || getCategoryColor(tag.category || getTagCategory(tag.name), isDark)
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

// 根据技术类别获取颜色
const getCategoryColor = (category: string, isDark: boolean): string => {
  const categoryColors = {
    // 后端技术
    backend: isDark ? '#f59e0b' : '#d97706', // 橙色
    java: isDark ? '#f59e0b' : '#d97706',    // 黄色(Java专用)
    python: isDark ? '#3b82f6' : '#2563eb',  // 蓝色
    // 前端技术
    frontend: isDark ? '#ec4899' : '#db2777', // 粉色
    javascript: isDark ? '#eab308' : '#ca8a04', // 黄色
    typescript: isDark ? '#3b82f6' : '#2563eb', // 蓝色
    react: isDark ? '#06b6d4' : '#0891b2',    // 青色
    vue: isDark ? '#22c55e' : '#16a34a',      // 绿色
    // 数据库
    database: isDark ? '#3b82f6' : '#2563eb',  // 蓝色
    sql: isDark ? '#3b82f6' : '#2563eb',       // 蓝色
    mysql: isDark ? '#3b82f6' : '#2563eb',     // 蓝色
    postgresql: isDark ? '#3b82f6' : '#2563eb', // 蓝色
    redis: isDark ? '#ef4444' : '#dc2626',     // 红色
    mongodb: isDark ? '#22c55e' : '#16a34a',   // 绿色
    // 工具和平台
    tools: isDark ? '#a855f7' : '#9333ea',     // 紫色
    devops: isDark ? '#64748b' : '#475569',    // 灰色
    // 框架
    frameworks: isDark ? '#ec4899' : '#db2777', // 粉色
    spring: isDark ? '#22c55e' : '#16a34a',    // 绿色
    // 其他
    other: isDark ? '#64748b' : '#475569'       // 灰色
  };

  return categoryColors[category.toLowerCase() as keyof typeof categoryColors] ||
         (isDark ? '#64748b' : '#475569'); // 默认灰色
};

// 根据标签名称推断类别
const getTagCategory = (tagName: string): string => {
  tagName = tagName.toLowerCase();

  // 后端语言和技术
  if (['java', 'spring', 'springboot', 'spring boot', 'spring mvc', 'spring cloud', 'jvm'].includes(tagName)) {
    return 'java';
  }

  if (['python', 'django', 'flask', 'numpy', 'pandas'].includes(tagName)) {
    return 'python';
  }

  if (['c#', '.net', 'asp.net', 'c++', 'c', 'golang', 'go', 'rust', 'php', 'laravel', 'node.js', 'nodejs', 'express', 'nestjs'].includes(tagName)) {
    return 'backend';
  }

  // 前端技术
  if (['javascript', 'js', 'jquery', 'ecmascript'].includes(tagName)) {
    return 'javascript';
  }

  if (['typescript', 'ts'].includes(tagName)) {
    return 'typescript';
  }

  if (['react', 'react.js', 'reactjs', 'react native', 'next.js', 'nextjs', 'redux'].includes(tagName)) {
    return 'react';
  }

  if (['vue', 'vue.js', 'vuejs', 'nuxt', 'nuxt.js'].includes(tagName)) {
    return 'vue';
  }

  if (['html', 'css', 'sass', 'scss', 'less', 'tailwind', 'tailwindcss', 'bootstrap', 'angular', 'svelte', 'webpack', 'vite', 'rollup'].includes(tagName)) {
    return 'frontend';
  }

  // 数据库
  if (['sql', 'database', 'db'].includes(tagName)) {
    return 'sql';
  }

  if (['mysql', 'mariadb'].includes(tagName)) {
    return 'mysql';
  }

  if (['postgresql', 'postgres'].includes(tagName)) {
    return 'postgresql';
  }

  if (['redis', 'cache'].includes(tagName)) {
    return 'redis';
  }

  if (['mongodb', 'nosql', 'dynamodb', 'firebase'].includes(tagName)) {
    return 'mongodb';
  }

  // 工具和平台
  if (['git', 'github', 'gitlab', 'svn', 'maven', 'gradle', 'npm', 'yarn', 'pnpm', 'webpack', 'babel', 'eslint', 'prettier'].includes(tagName)) {
    return 'tools';
  }

  if (['docker', 'kubernetes', 'k8s', 'jenkins', 'ci/cd', 'cicd', 'devops', 'aws', 'azure', 'gcp', 'linux', 'unix', 'nginx', 'apache'].includes(tagName)) {
    return 'devops';
  }

  // 框架类
  if (['spring', 'springboot', 'spring boot', 'spring mvc', 'spring cloud', 'hibernate', 'jpa'].includes(tagName)) {
    return 'spring';
  }

  // 默认分类
  return 'other';
};

// 获取技术默认官网URL
const getDefaultUrl = (tagName: string): string => {
  const urls: Record<string, string> = {
    // 编程语言
    'java': 'https://www.java.com/',
    'python': 'https://www.python.org/',
    'javascript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    'typescript': 'https://www.typescriptlang.org/',
    'c#': 'https://docs.microsoft.com/en-us/dotnet/csharp/',
    'c++': 'https://isocpp.org/',
    'c': 'https://en.cppreference.com/w/c',
    'go': 'https://golang.org/',
    'rust': 'https://www.rust-lang.org/',
    'php': 'https://www.php.net/',

    // 前端框架
    'react': 'https://reactjs.org/',
    'vue': 'https://vuejs.org/',
    'angular': 'https://angular.io/',
    'svelte': 'https://svelte.dev/',
    'jquery': 'https://jquery.com/',

    // 前端工具
    'html': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    'css': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    'sass': 'https://sass-lang.com/',
    'tailwind': 'https://tailwindcss.com/',
    'tailwindcss': 'https://tailwindcss.com/',
    'bootstrap': 'https://getbootstrap.com/',
    'webpack': 'https://webpack.js.org/',
    'vite': 'https://vitejs.dev/',

    // 后端框架
    'spring': 'https://spring.io/',
    'spring boot': 'https://spring.io/projects/spring-boot',
    'springboot': 'https://spring.io/projects/spring-boot',
    'django': 'https://www.djangoproject.com/',
    'flask': 'https://flask.palletsprojects.com/',
    'express': 'https://expressjs.com/',
    'nestjs': 'https://nestjs.com/',
    'laravel': 'https://laravel.com/',
    '.net': 'https://dotnet.microsoft.com/',

    // 数据库
    'mysql': 'https://www.mysql.com/',
    'postgresql': 'https://www.postgresql.org/',
    'mongodb': 'https://www.mongodb.com/',
    'redis': 'https://redis.io/',
    'sql': 'https://en.wikipedia.org/wiki/SQL',

    // 开发工具
    'git': 'https://git-scm.com/',
    'github': 'https://github.com/',
    'gitlab': 'https://about.gitlab.com/',
    'docker': 'https://www.docker.com/',
    'kubernetes': 'https://kubernetes.io/',
    'jenkins': 'https://www.jenkins.io/',
    'maven': 'https://maven.apache.org/',
    'gradle': 'https://gradle.org/',
    'npm': 'https://www.npmjs.com/',

    // 云服务
    'aws': 'https://aws.amazon.com/',
    'azure': 'https://azure.microsoft.com/',
    'gcp': 'https://cloud.google.com/'
  };

  const lowerTagName = tagName.toLowerCase();

  // 尝试直接匹配
  if (urls[lowerTagName]) {
    return urls[lowerTagName];
  }

  // 尝试部分匹配
  for (const [key, url] of Object.entries(urls)) {
    if (lowerTagName.includes(key) || key.includes(lowerTagName)) {
      return url;
    }
  }

  // 默认搜索链接
  return `https://www.google.com/search?q=${encodeURIComponent(tagName)}+programming+language+documentation`;
};

export default TagCloud;
