import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, alpha, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import CustomChip from './CustomChip';

// 定义技术项接口
export interface TechItem {
  name: string;
  icon?: React.ReactNode;
  url?: string;
  value?: number;
  color?: string;
}

// 技术标签组属性接口
interface TechTagGroupProps {
  title?: string;
  items: TechItem[];
  maxItems?: number;
  showProficiency?: boolean;
  sortByProficiency?: boolean;
  titleAlign?: 'left' | 'center' | 'right';
  chipVariant?: 'outlined' | 'filled';
  size?: 'small' | 'medium';
  enableExpand?: boolean;
  className?: string;
  techType?: 'frontend' | 'backend' | 'database' | 'tool' | 'framework' | 'language' | 'other';
}

// 技术URL映射
const techUrlMap: Record<string, string> = {
  React: 'https://reactjs.org',
  Vue: 'https://vuejs.org',
  Angular: 'https://angular.io',
  JavaScript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  TypeScript: 'https://www.typescriptlang.org',
  Node: 'https://nodejs.org',
  Express: 'https://expressjs.com',
  MongoDB: 'https://www.mongodb.com',
  MySQL: 'https://www.mysql.com',
  PostgreSQL: 'https://www.postgresql.org',
  Redis: 'https://redis.io',
  Docker: 'https://www.docker.com',
  Kubernetes: 'https://kubernetes.io',
  AWS: 'https://aws.amazon.com',
  Azure: 'https://azure.microsoft.com',
  GCP: 'https://cloud.google.com',
  HTML: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  CSS: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  Sass: 'https://sass-lang.com',
  'Material-UI': 'https://mui.com',
  Tailwind: 'https://tailwindcss.com',
  Bootstrap: 'https://getbootstrap.com',
  GraphQL: 'https://graphql.org',
  REST: 'https://restfulapi.net',
  Git: 'https://git-scm.com',
  GitHub: 'https://github.com',
  GitLab: 'https://gitlab.com',
  Jest: 'https://jestjs.io',
  Cypress: 'https://www.cypress.io',
  Webpack: 'https://webpack.js.org',
  Vite: 'https://vitejs.dev',
  NextJS: 'https://nextjs.org',
  NestJS: 'https://nestjs.com',
  Spring: 'https://spring.io',
  Java: 'https://www.java.com',
  Python: 'https://www.python.org',
  Ruby: 'https://www.ruby-lang.org',
  'Ruby on Rails': 'https://rubyonrails.org',
  PHP: 'https://www.php.net',
  Laravel: 'https://laravel.com',
  Symfony: 'https://symfony.com',
  'C#': 'https://docs.microsoft.com/en-us/dotnet/csharp/',
  '.NET': 'https://dotnet.microsoft.com',
  Go: 'https://golang.org',
  Rust: 'https://www.rust-lang.org',
  Swift: 'https://swift.org',
  Kotlin: 'https://kotlinlang.org',
  Flutter: 'https://flutter.dev',
  ReactNative: 'https://reactnative.dev',
};

// 根据技术类型获取颜色
const getTechColor = (
  techType: string,
  isDark: boolean
): { bg: string; text: string; border: string } => {
  switch (techType.toLowerCase()) {
    case 'frontend':
      return {
        bg: isDark ? alpha('#3b82f6', 0.2) : alpha('#3b82f6', 0.1),
        text: isDark ? '#93c5fd' : '#1d4ed8',
        border: isDark ? alpha('#3b82f6', 0.3) : alpha('#3b82f6', 0.2),
      };
    case 'backend':
      return {
        bg: isDark ? alpha('#10b981', 0.2) : alpha('#10b981', 0.1),
        text: isDark ? '#6ee7b7' : '#047857',
        border: isDark ? alpha('#10b981', 0.3) : alpha('#10b981', 0.2),
      };
    case 'database':
      return {
        bg: isDark ? alpha('#f59e0b', 0.2) : alpha('#f59e0b', 0.1),
        text: isDark ? '#fcd34d' : '#b45309',
        border: isDark ? alpha('#f59e0b', 0.3) : alpha('#f59e0b', 0.2),
      };
    case 'tool':
      return {
        bg: isDark ? alpha('#8b5cf6', 0.2) : alpha('#8b5cf6', 0.1),
        text: isDark ? '#c4b5fd' : '#6d28d9',
        border: isDark ? alpha('#8b5cf6', 0.3) : alpha('#8b5cf6', 0.2),
      };
    case 'framework':
      return {
        bg: isDark ? alpha('#ec4899', 0.2) : alpha('#ec4899', 0.1),
        text: isDark ? '#f9a8d4' : '#be185d',
        border: isDark ? alpha('#ec4899', 0.3) : alpha('#ec4899', 0.2),
      };
    case 'language':
      return {
        bg: isDark ? alpha('#6366f1', 0.2) : alpha('#6366f1', 0.1),
        text: isDark ? '#a5b4fc' : '#4338ca',
        border: isDark ? alpha('#6366f1', 0.3) : alpha('#6366f1', 0.2),
      };
    default:
      return {
        bg: isDark ? alpha('#64748b', 0.2) : alpha('#64748b', 0.1),
        text: isDark ? '#cbd5e1' : '#334155',
        border: isDark ? alpha('#64748b', 0.3) : alpha('#64748b', 0.2),
      };
  }
};

/**
 * 技术标签组组件
 * 展示一组技术标签，支持排序、过滤和展开/收起
 */
const TechTagGroup: React.FC<TechTagGroupProps> = ({
  title,
  items,
  maxItems = 12,
  showProficiency = false,
  sortByProficiency = true,
  titleAlign = 'left',
  chipVariant = 'filled',
  size = 'small',
  enableExpand = true,
  className,
  techType = 'other',
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(false);

  // 确保items是数组
  const safeItems = Array.isArray(items) ? items : [];

  // 根据熟练度排序项目
  const sortedItems = useMemo(() => {
    return [...safeItems].sort((a, b) => {
      if (sortByProficiency) {
        const valueA = a.value || 0;
        const valueB = b.value || 0;
        return valueB - valueA;
      }
      return 0;
    });
  }, [safeItems, sortByProficiency]);

  // 获取要显示的项目
  const displayItems = enableExpand && !expanded ? sortedItems.slice(0, maxItems) : sortedItems;
  const hiddenItemsCount = enableExpand ? sortedItems.length - maxItems : 0;

  // 处理展开/收起
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  // 获取技术URL
  const getTechUrl = (name: string, url?: string): string | undefined => {
    if (url) return url;
    return techUrlMap[name] || undefined;
  };

  // 计算芯片大小
  const getChipSize = () => {
    return isMobile ? "small" : size;
  };

  // 计算芯片间距
  const getChipGap = () => {
    return isMobile ? 0.5 : 0.8;
  };

  // 计算标签圆角
  const getChipBorderRadius = () => {
    return isMobile ? 12 : 16;
  };

  // 计算最大宽度
  const getMaxWidth = () => {
    if (isMobile) {
      if (showProficiency) {
        return 110;
      }
      return 100;
    }
    return undefined;
  };

  const techColors = getTechColor(techType, isDark);

  // 容器动画
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // 标签动画
  const childVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <Box className={className} sx={{ width: '100%', mb: 2 }}>
      {title && (
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: 600,
            textAlign: titleAlign,
            color: isDark ? 'grey.300' : 'grey.800',
            mb: 1.5,
          }}
        >
          {title}
        </Typography>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: `${getChipGap()}rem`,
          maxWidth: '100%',
        }}
      >
        {displayItems.map((item, index) => {
          const techUrl = getTechUrl(item.name, item.url);
          const techValue = item.value || 0;

          // 根据熟练度调整大小
          const getScaleByProficiency = (value: number) => {
            if (!showProficiency) return 1;
            const minScale = isMobile ? 0.85 : 0.85;
            const maxScale = isMobile ? 1.15 : 1.2;
            return minScale + (value / 100) * (maxScale - minScale);
          };

          const scale = getScaleByProficiency(techValue);

          return (
            <motion.div
              key={`${item.name}-${index}`}
              variants={childVariants}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                margin: `${isMobile ? '2px' : '3px'}`,
                maxWidth: getMaxWidth(),
              }}
            >
              <CustomChip
                label={item.name}
                icon={item.icon}
                variant={chipVariant}
                size={getChipSize()}
                url={techUrl}
                tooltip={
                  showProficiency
                    ? `${techValue}% ${t('skills.proficiency', '熟练度')}`
                    : undefined
                }
                sx={{
                  fontWeight: 500,
                  position: 'relative',
                  backgroundColor: techColors.bg,
                  color: techColors.text,
                  borderColor: techColors.border,
                  borderRadius: getChipBorderRadius(),
                  boxSizing: 'border-box',
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: isDark
                      ? alpha(item.color || '#64748b', 0.3)
                      : alpha(item.color || '#64748b', 0.15),
                    transform: 'translateY(-2px)',
                    boxShadow: isDark
                      ? `0 3px 10px ${alpha(item.color || '#64748b', 0.3)}`
                      : `0 3px 10px ${alpha(item.color || '#64748b', 0.2)}`,
                  },
                }}
              />
            </motion.div>
          );
        })}

        {/* 显示更多按钮 */}
        {enableExpand && hiddenItemsCount > 0 && !expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              size="small"
              variant="text"
              onClick={handleToggleExpand}
              endIcon={<FiChevronDown />}
              sx={{
                color: isDark ? 'grey.400' : 'grey.600',
                fontWeight: 500,
                textTransform: 'none',
                fontSize: isMobile ? '0.7rem' : '0.75rem',
                '&:hover': {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              {t('common.showMore', '显示更多')} ({hiddenItemsCount})
            </Button>
          </motion.div>
        )}

        {/* 收起按钮 */}
        {enableExpand && expanded && sortedItems.length > maxItems && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              size="small"
              variant="text"
              onClick={handleToggleExpand}
              endIcon={<FiChevronDown style={{ transform: 'rotate(180deg)' }} />}
              sx={{
                color: isDark ? 'grey.400' : 'grey.600',
                fontWeight: 500,
                textTransform: 'none',
                fontSize: isMobile ? '0.7rem' : '0.75rem',
                '&:hover': {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              {t('common.showLess', '收起')}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </Box>
  );
};

export default TechTagGroup;
