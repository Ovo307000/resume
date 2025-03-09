import React, { useState } from 'react';
import { Box, Typography, IconButton, alpha, useTheme as useMuiTheme } from '@mui/material';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import CustomChip from './CustomChip';
import { AnimatePresence, motion } from 'framer-motion';

export interface TechItem {
  name: string;
  icon?: React.ReactNode;
  url?: string;
  value?: number; // 技能熟练度，用于调整标签大小
  color?: string; // 标签的颜色
}

interface TechTagGroupProps {
  title?: string;
  description?: string;
  techItems: TechItem[];
  initiallyExpanded?: boolean;
  showToggle?: boolean;
  variant?: 'default' | 'small' | 'large';
  maxVisibleItems?: number; // 收起状态下最多显示的项目数
  collapsible?: boolean; // 是否可折叠
  animate?: boolean; // 是否启用动画
  enableSizing?: boolean; // 是否根据value值调整大小
}

/**
 * 技术标签组组件 - 简化版本，直接展示技能标签
 */
const TechTagGroup: React.FC<TechTagGroupProps> = ({
  title,
  description,
  techItems,
  initiallyExpanded = false,
  showToggle = true,
  variant = 'default',
  maxVisibleItems = 8,
  collapsible = true,
  animate = true,
  enableSizing = false
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const [expanded, setExpanded] = useState(initiallyExpanded);

  // 判断是否需要折叠
  const needsCollapsing = collapsible && techItems.length > maxVisibleItems;

  // 按照value值(如果有)排序显示
  const sortedTechItems = [...techItems].sort((a, b) => {
    if (a.value !== undefined && b.value !== undefined) {
      return b.value - a.value;
    }
    return 0;
  });

  // 折叠状态下显示的项目
  const visibleItems = expanded || !needsCollapsing ? sortedTechItems : sortedTechItems.slice(0, maxVisibleItems);

  // 计算隐藏的项目数量
  const hiddenItemsCount = needsCollapsing ? sortedTechItems.length - maxVisibleItems : 0;

  // 切换展开/折叠状态
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // 获取技术对应的颜色
  const getColorForTechnology = (techName: string): string => {
    // 技术名称到颜色的映射
    const techColors: Record<string, string> = {
      // 编程语言
      'Java': '#b07219',
      'JavaScript': '#f1e05a',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'C': '#555555',
      'C++': '#f34b7d',
      'C#': '#178600',
      'Go': '#00ADD8',
      'Rust': '#dea584',

      // 框架
      'React': '#61dafb',
      'React.js': '#61dafb',
      'Vue': '#4FC08D',
      'Vue.js': '#4FC08D',
      'Angular': '#DD0031',
      'Spring': '#6DB33F',
      'Spring Boot': '#6DB33F',
      'Spring MVC': '#6DB33F',
      'Spring JPA': '#6DB33F',
      'TailWind CSS': '#38B2AC',
      'TailwindCSS': '#38B2AC',
      'Tailwind': '#38B2AC',
      'Bootstrap': '#7952B3',

      // 数据库
      'MySQL': '#4479A1',
      'PostgreSQL': '#336791',
      'MongoDB': '#4DB33D',
      'Redis': '#DC382D',
      'SQLite': '#0f80cc',
      'Oracle': '#F80000',

      // 工具与技术
      'Docker': '#2496ED',
      'Kubernetes': '#326CE5',
      'Git': '#F05032',
      'Linux': '#FCC624',
      'Gradle': '#02303A',
      'Maven': '#C71A36',
      'Jenkins': '#D33833',
      'GraphQL': '#E535AB',
      'REST API': '#0096c7',
      'Socket.IO': '#010101',
      'WebSocket': '#4353af',
      'JWT': '#000000',
      'JavaFX': '#5382a1'
    };

    // 尝试匹配技术名称（不区分大小写）
    const key = Object.keys(techColors).find(
      k => k.toLowerCase() === techName.toLowerCase()
    );

    return key ? techColors[key] : muiTheme.palette.primary.main;
  };

  // 获取技术对应的URL
  const getUrlForTechnology = (techName: string, providedUrl?: string): string | undefined => {
    // 如果提供了URL,优先使用提供的URL
    if (providedUrl) return providedUrl;

    // 技术名称到官方网站URL的映射
    const techUrls: Record<string, string> = {
      // 编程语言
      'Java': 'https://www.java.com/',
      'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      'TypeScript': 'https://www.typescriptlang.org/',
      'Python': 'https://www.python.org/',
      'C': 'https://en.cppreference.com/w/c',
      'C++': 'https://isocpp.org/',
      'C#': 'https://dotnet.microsoft.com/languages/csharp',
      'Go': 'https://golang.org/',
      'Rust': 'https://www.rust-lang.org/',

      // 数据库
      'MySQL': 'https://www.mysql.com/',
      'PostgreSQL': 'https://www.postgresql.org/',
      'MongoDB': 'https://www.mongodb.com/',
      'Redis': 'https://redis.io/',

      // 框架和库
      'React': 'https://reactjs.org/',
      'React.js': 'https://reactjs.org/',
      'Vue': 'https://vuejs.org/',
      'Vue.js': 'https://vuejs.org/',
      'Spring': 'https://spring.io/',
      'Spring Boot': 'https://spring.io/projects/spring-boot',
      'Socket.IO': 'https://socket.io/'
    };

    // 尝试匹配技术名称（不区分大小写）
    const key = Object.keys(techUrls).find(
      k => k.toLowerCase() === techName.toLowerCase()
    );

    return key ? techUrls[key] : undefined;
  };

  // 标签容器变体
  const containerVariants = {
    expanded: {
      height: 'auto',
      transition: {
        staggerChildren: 0.03,
        duration: 0.4
      }
    },
    collapsed: {
      height: 'auto',
      transition: {
        duration: 0.4
      }
    }
  };

  // 标签项变体
  const itemVariants = {
    expanded: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.03
      }
    }),
    collapsed: {
      opacity: 0,
      y: 10,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      {/* 标题部分 */}
      {title && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{
              fontWeight: 600,
              opacity: 0.8
            }}
          >
            {title}
          </Typography>

          {needsCollapsing && showToggle && (
            <IconButton
              size="small"
              onClick={toggleExpanded}
              sx={{
                ml: 1,
                p: 0.5,
                color: 'inherit',
                transform: 'translateY(-1px)'
              }}
            >
              {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </IconButton>
          )}
        </Box>
      )}

      {/* 描述文本 */}
      {description && (
        <Typography
          variant="body2"
          sx={{
            mb: 1.5,
            color: theme === 'dark'
              ? alpha(muiTheme.palette.common.white, 0.7)
              : alpha(muiTheme.palette.common.black, 0.7)
          }}
        >
          {description}
        </Typography>
      )}

      {/* 技能标签组 */}
      <motion.div
        variants={containerVariants}
        initial={false}
        animate={expanded ? 'expanded' : 'collapsed'}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            mb: 1.5
          }}
        >
          <AnimatePresence>
            {visibleItems.map((item, index) => {
              // 根据技能熟练度调整标签大小
              const tagSize = enableSizing && item.value
                ? 0.8 + (item.value / 100 * 0.5)
                : 1;

              // 获取变体大小
              const chipSize = variant === 'small' ? 'small' : 'medium';

              return (
                <motion.div
                  key={item.name}
                  custom={index}
                  variants={animate ? itemVariants : undefined}
                  initial={animate ? "collapsed" : undefined}
                  animate={animate ? "expanded" : undefined}
                  exit={animate ? "collapsed" : undefined}
                  style={{
                    transform: enableSizing ? `scale(${tagSize})` : undefined,
                    transformOrigin: 'center',
                    margin: 0,
                    display: 'inline-block'
                  }}
                >
                  <CustomChip
                    label={item.name}
                    icon={item.icon}
                    url={item.url || getUrlForTechnology(item.name)}
                    animate={false}
                    color={item.color || getColorForTechnology(item.name)}
                    size={chipSize}
                    variant="filled"
                    borderRadius={variant === 'small' ? '12px' : '16px'}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* 显示更多按钮 */}
          {!expanded && hiddenItemsCount > 0 && !showToggle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <CustomChip
                label={`+${hiddenItemsCount} 更多`}
                onClick={toggleExpanded}
                size={variant === 'small' ? 'small' : 'medium'}
                color="primary"
                variant="outlined"
                animate={false}
              />
            </motion.div>
          )}
        </Box>
      </motion.div>
    </>
  );
};

export default TechTagGroup;
