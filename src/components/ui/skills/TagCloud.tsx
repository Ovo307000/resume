import React from 'react';
import { Box, Typography, Chip, alpha } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../../../contexts/ThemeContext';

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
 * 简化版标签云组件
 * 因为Three.js版本有兼容性问题，这里使用简单的平面布局
 */
const TagCloud: React.FC<TagCloudProps> = ({
  tags,
  radius = 300,
}) => {
  const muiTheme = useMuiTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 根据标签数量限制显示数量，避免性能问题
  const limitedTags = tags.length > 100 ? tags.slice(0, 100) : tags;

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: {
          xs: '300px',
          sm: '350px',
          md: '400px',
          lg: '450px'
        },
        position: 'relative',
        overflow: 'hidden',
        my: { xs: 2, sm: 3, md: 4 },
        bgcolor: 'transparent',
        borderRadius: '16px',
        padding: 3,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1.5,
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
          pointerEvents: 'none',
          zIndex: 0
        }
      }}
    >
      {limitedTags.map((tag, index) => {
        // 计算标签尺寸 - 基于value属性
        const size = tag.value ? Math.max(0.7, Math.min(1.5, tag.value / 5)) : 1;
        const scaledSize = {
          fontSize: `${0.85 + (size * 0.15)}rem`,
          fontWeight: tag.value && tag.value > 5 ? 600 : 500,
        };

        // 获取颜色
        const tagColor = tag.color || getCategoryColor(tag.category || getTagCategory(tag.name), isDark);

        return (
          <Chip
            key={`tag-${index}-${tag.name}`}
            label={tag.name}
            onClick={() => {
              if (tag.url) window.open(tag.url, '_blank', 'noopener,noreferrer');
            }}
            sx={{
              ...scaledSize,
              backgroundColor: alpha(tagColor, isDark ? 0.2 : 0.1),
              color: tagColor,
              borderRadius: '14px',
              borderColor: alpha(tagColor, 0.3),
              variant: 'outlined',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: alpha(tagColor, isDark ? 0.3 : 0.15),
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 8px ${alpha(tagColor, 0.2)}`,
              },
              zIndex: 1,
              position: 'relative',
            }}
          />
        );
      })}
    </Box>
  );
};

// 根据技术类别获取颜色
const getCategoryColor = (category: string, isDark: boolean): string => {
  const categoryColors: Record<string, string> = {
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
    devops: isDark ? '#8b5cf6' : '#7c3aed',    // 紫色
    cloud: isDark ? '#3b82f6' : '#2563eb',     // 蓝色
    aws: isDark ? '#f59e0b' : '#d97706',       // 橙色
    azure: isDark ? '#3b82f6' : '#2563eb',     // 蓝色
    docker: isDark ? '#06b6d4' : '#0891b2',    // 青色
    kubernetes: isDark ? '#06b6d4' : '#0891b2', // 青色
    // 语言
    go: isDark ? '#06b6d4' : '#0891b2',        // 青色
    rust: isDark ? '#f59e0b' : '#d97706',      // 橙色
    cpp: isDark ? '#8b5cf6' : '#7c3aed',       // 紫色
    csharp: isDark ? '#8b5cf6' : '#7c3aed',    // 紫色
    // 通用
    other: isDark ? '#9ca3af' : '#6b7280',     // 灰色
    // 默认颜色
    default: isDark ? '#9ca3af' : '#6b7280'    // 灰色
  };

  return categoryColors[category.toLowerCase()] ||
    categoryColors.default;
};

// 获取默认URL - 例如，搜索该技术
const getDefaultUrl = (name: string): string => {
  return `https://www.google.com/search?q=${encodeURIComponent(name)}+programming`;
};

// 尝试猜测标签的类别
const getTagCategory = (name: string): string => {
  const lowerName = name.toLowerCase();

  // 后端技术
  if (['java', 'spring', 'hibernate', 'struts', 'jpa', 'jee', 'tomcat', 'jetty', 'servlet'].includes(lowerName)) {
    return 'java';
  }

  if (['python', 'django', 'flask', 'fastapi', 'tornado', 'celery', 'scipy', 'numpy', 'pandas'].includes(lowerName)) {
    return 'python';
  }

  // 前端技术
  if (['javascript', 'js', 'node', 'nodejs', 'deno', 'npm', 'yarn', 'pnpm', 'babel', 'webpack', 'rollup', 'vite', 'parcel', 'gulp', 'grunt'].includes(lowerName)) {
    return 'javascript';
  }

  if (['typescript', 'ts', 'tsc'].includes(lowerName)) {
    return 'typescript';
  }

  if (['react', 'reactjs', 'react-native', 'redux', 'mobx', 'nextjs', 'next.js', 'cra', 'create-react-app'].includes(lowerName)) {
    return 'react';
  }

  if (['vue', 'vuejs', 'vue.js', 'vuex', 'pinia', 'nuxt', 'nuxt.js'].includes(lowerName)) {
    return 'vue';
  }

  // 数据库技术
  if (['sql', 'database', 'rdbms', 'orm'].includes(lowerName)) {
    return 'database';
  }

  if (['mysql', 'mariadb'].includes(lowerName)) {
    return 'mysql';
  }

  if (['postgres', 'postgresql'].includes(lowerName)) {
    return 'postgresql';
  }

  if (['redis', 'memcached', 'cache'].includes(lowerName)) {
    return 'redis';
  }

  if (['mongodb', 'nosql', 'document-db'].includes(lowerName)) {
    return 'mongodb';
  }

  // DevOps & Cloud
  if (['devops', 'ci', 'cd', 'ci/cd', 'continuous', 'jenkins', 'gitlab'].includes(lowerName)) {
    return 'devops';
  }

  if (['aws', 'amazon', 'ec2', 's3', 'lambda', 'cloudfront'].includes(lowerName)) {
    return 'aws';
  }

  if (['azure', 'microsoft azure'].includes(lowerName)) {
    return 'azure';
  }

  if (['cloud', 'gcp', 'google cloud'].includes(lowerName)) {
    return 'cloud';
  }

  if (['docker', 'containerization', 'container'].includes(lowerName)) {
    return 'docker';
  }

  if (['kubernetes', 'k8s', 'helm'].includes(lowerName)) {
    return 'kubernetes';
  }

  // 语言
  if (['go', 'golang'].includes(lowerName)) {
    return 'go';
  }

  if (['rust', 'rustlang', 'cargo'].includes(lowerName)) {
    return 'rust';
  }

  if (['cpp', 'c++', 'c plus plus'].includes(lowerName)) {
    return 'cpp';
  }

  if (['csharp', 'c#', '.net', 'dotnet', 'asp.net'].includes(lowerName)) {
    return 'csharp';
  }

  // 默认类别
  return 'other';
};

export default TagCloud;
