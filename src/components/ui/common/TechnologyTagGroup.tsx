import React, { useState } from 'react';
import { Box, Typography, alpha, useTheme as useMuiTheme, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import TechTag from './TechTag';
import { useTranslation } from 'react-i18next';

interface TechnologyItem {
  name: string;
  icon?: React.ReactNode;
  url?: string;
}

interface TechnologyTagGroupProps {
  technologies: (string | TechnologyItem)[];
  title?: string;
  animate?: boolean;
  showTitle?: boolean;
  variant?: 'default' | 'small' | 'large';
  maxDisplay?: number;
  gapSize?: number;
  containerSx?: React.CSSProperties | Record<string, unknown>;
  initialVisibleCount?: number;
  collapsible?: boolean;
  maxHeight?: number | string;
}

/**
 * 技术标签组组件
 * 用于在技能页面、项目页面等地方展示技术标签
 * 支持展开/收起功能，标签点击跳转，悬停效果等
 */
const TechnologyTagGroup: React.FC<TechnologyTagGroupProps> = ({
  technologies = [],
  title,
  animate = true,
  showTitle = true,
  variant = 'small',
  maxDisplay = 0, // 0表示显示所有技术
  gapSize = 1,
  containerSx = {},
  initialVisibleCount = 4,
  collapsible = false,
  maxHeight = 'none'
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  // 限制显示数量 - 如果不可收起展开，则使用maxDisplay，否则使用initialVisibleCount
  const displayTechnologies =
    collapsible
      ? (expanded ? technologies : technologies.slice(0, initialVisibleCount))
      : (maxDisplay > 0 && technologies.length > maxDisplay
        ? technologies.slice(0, maxDisplay)
        : technologies);

  // 是否有更多标签
  const hasMoreTags =
    collapsible
      ? technologies.length > initialVisibleCount
      : (maxDisplay > 0 && technologies.length > maxDisplay);

  // 切换展开状态
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // 动画变体
  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // 标签动画变体
  const tagVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + (i * 0.05),
        duration: 0.4,
        ease: 'easeOut'
      }
    }),
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const renderTag = (tech: string | TechnologyItem, index: number) => {
    // 处理字符串技术标签
    if (typeof tech === 'string') {
      return (
        <TechTag
          key={tech}
          label={tech}
          variant={variant}
          animate={false}
          index={index}
        />
      );
    }

    // 处理对象技术标签
    return (
      <TechTag
        key={tech.name}
        label={tech.name}
        icon={tech.icon}
        url={tech.url}
        variant={variant}
        animate={false}
        index={index}
      />
    );
  };

  const TagContainer = animate ? motion.div : Box;
  const containerProps = animate ? { variants: childVariants } : {};

  return (
    <TagContainer {...containerProps} style={{ marginTop: 'auto' }}>
      {showTitle && title && (
        <Typography
          variant="subtitle2"
          fontWeight="500"
          sx={{ mb: 1.5, opacity: 0.8 }}
        >
          {title || t('skills.relatedTechnologies', '相关技术')}:
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: gapSize,
          maxHeight: collapsible ? (expanded ? 'none' : maxHeight) : 'none',
          overflow: collapsible ? (expanded ? 'visible' : 'hidden') : 'visible',
          transition: 'all 0.3s ease',
          mb: hasMoreTags && collapsible ? 1 : 0,
          ...containerSx
        }}
      >
        <AnimatePresence mode="wait">
          {displayTechnologies.map((tech, index) => (
            <motion.div
              key={typeof tech === 'string' ? tech : tech.name}
              custom={index}
              variants={animate ? tagVariants : undefined}
              initial={animate ? "hidden" : undefined}
              animate={animate ? "visible" : undefined}
              exit={animate ? "exit" : undefined}
              style={{ display: 'inline-block', margin: '0.25rem' }}
            >
              {renderTag(tech, index)}
            </motion.div>
          ))}

          {/* 显示更多标签提示 - 仅在非折叠模式下显示 */}
          {!collapsible && maxDisplay > 0 && technologies.length > maxDisplay && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: variant === 'small' ? '24px' : '28px',
                px: 1,
                borderRadius: '12px',
                fontSize: variant === 'small' ? '0.7rem' : '0.8rem',
                fontWeight: 500,
                backgroundColor: theme === 'dark'
                  ? alpha(muiTheme.palette.grey[700], 0.5)
                  : alpha(muiTheme.palette.grey[300], 0.7),
                color: theme === 'dark'
                  ? alpha(muiTheme.palette.common.white, 0.7)
                  : alpha(muiTheme.palette.common.black, 0.7)
              }}
            >
              +{technologies.length - maxDisplay}
            </Box>
          )}
        </AnimatePresence>
      </Box>

      {/* 展开/收起按钮 - 仅在可折叠模式下显示 */}
      {collapsible && hasMoreTags && (
        <Button
          onClick={toggleExpanded}
          size="small"
          startIcon={expanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          sx={{
            fontSize: '0.7rem',
            color: theme === 'dark' ? muiTheme.palette.primary.light : muiTheme.palette.primary.main,
            backgroundColor: theme === 'dark'
              ? alpha(muiTheme.palette.primary.main, 0.1)
              : alpha(muiTheme.palette.primary.main, 0.05),
            borderRadius: '20px',
            p: '4px 10px',
            mt: 1,
            '&:hover': {
              backgroundColor: theme === 'dark'
                ? alpha(muiTheme.palette.primary.main, 0.2)
                : alpha(muiTheme.palette.primary.main, 0.1),
            }
          }}
        >
          {expanded ? t('common.showLess', 'Show Less') : t('common.showMore', 'Show More')}
        </Button>
      )}
    </TagContainer>
  );
};

export default TechnologyTagGroup;
