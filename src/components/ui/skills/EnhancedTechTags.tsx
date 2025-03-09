import React from 'react';
import { Box, Typography, alpha, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import TechTagGroup, { TechItem } from '../common/TechTagGroup';

interface EnhancedTechTagsProps {
  title?: string;
  skills: Array<{
    name: string;
    value?: number;
    icon?: React.ReactNode;
    url?: string;
    category?: string;
  }>;
  category?: string;
  maxDisplayed?: number;
  enableSizing?: boolean;
  animate?: boolean;
  variant?: 'default' | 'small' | 'large';
  initiallyExpanded?: boolean;
}

/**
 * 增强的技术标签组组件
 * 从技能页面提取，保持一致的样式和行为
 */
const EnhancedTechTags: React.FC<EnhancedTechTagsProps> = ({
  title,
  skills,
  category,
  maxDisplayed = 8,
  enableSizing = true,
  animate = true,
  variant = 'default',
  initiallyExpanded = false
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 过滤技能（如果指定了类别）
  const filteredSkills = category
    ? skills.filter(skill => skill.category === category)
    : skills;

  // 将技能转换为TechItem格式
  const techItems: TechItem[] = filteredSkills.map(skill => ({
    name: skill.name,
    icon: skill.icon,
    url: skill.url,
    value: skill.value || 50 // 默认值
  }));

  return (
    <Box sx={{ mb: 3 }}>
      {title && (
        <Typography
          variant="subtitle1"
          sx={{
            mb: 1.5,
            color: theme === 'dark' ? muiTheme.palette.primary.light : muiTheme.palette.primary.dark,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      )}

      <TechTagGroup
        techItems={techItems}
        maxVisibleItems={maxDisplayed}
        collapsible={techItems.length > maxDisplayed}
        initiallyExpanded={initiallyExpanded}
        showToggle={true}
        animate={animate}
        variant={variant}
        enableSizing={enableSizing}
      />
    </Box>
  );
};

export default EnhancedTechTags;
