import React, { useEffect } from 'react';
import { Box, Typography, useTheme as useMuiTheme, Grid } from '@mui/material';
import SkillItem from './SkillItem';
import { Skill } from '../../../types/skill';

interface CategoryData {
  title: string;
  skills: Skill[];
}

interface SkillBarGroupProps {
  skills: Skill[];
  showCategoryHeaders?: boolean;
  categoryTranslations?: Record<string, string>;
  maxSkillsPerCategory?: number;
  animated?: boolean;
  variant?: 'gradient' | 'solid' | 'glass';
  height?: number;
  glowEffect?: boolean;
  compact?: boolean;
  columnsPerRow?: number; // 一行显示多少列
  useGrid?: boolean; // 是否使用网格布局
}

/**
 * 技能条分组组件
 * 用于将技能按类别分组展示
 */
const SkillBarGroup: React.FC<SkillBarGroupProps> = ({
  skills,
  showCategoryHeaders = true,
  categoryTranslations = {},
  maxSkillsPerCategory,
  animated = true,
  variant = 'glass',
  height = 10,
  glowEffect = true,
  compact = false,
  columnsPerRow = 1, // 默认一行一个
  useGrid = false, // 默认不使用网格
}) => {
  const muiTheme = useMuiTheme();

  // 按类别分组技能
  const categorizeSkills = () => {
    const categories: Record<string, CategoryData> = {
      backend: { title: categoryTranslations.backend || '后端开发', skills: [] },
      frontend: { title: categoryTranslations.frontend || '前端开发', skills: [] },
      database: { title: categoryTranslations.database || '数据库', skills: [] },
      devops: { title: categoryTranslations.devops || 'DevOps & 运维', skills: [] },
      tool: { title: categoryTranslations.tool || '开发工具', skills: [] },
      language: { title: categoryTranslations.language || '编程语言', skills: [] },
      framework: { title: categoryTranslations.framework || '框架', skills: [] },
    };

    // 将技能分组
    skills.forEach(skill => {
      if (categories[skill.category]) {
        categories[skill.category].skills.push(skill);
      }
    });

    return categories;
  };

  const categories = categorizeSkills();

  // 渲染单个技能项
  const renderSkillItem = (skill: Skill, index: number) => (
    <SkillItem
      name={skill.name}
      value={skill.value || skill.level}
      icon={skill.icon}
      delay={index * 0.05}
      variant={variant}
      height={height}
      borderRadius={5}
      glowEffect={glowEffect}
      clickable={true}
      url={skill.url}
      showTitle={false}
      animated={animated}
      containerStyle={compact ? { padding: '8px' } : undefined}
    />
  );

  // 使用网格布局渲染技能组
  const renderGridSkills = (skillsToRender: Skill[]) => (
    <Grid container spacing={2}>
      {skillsToRender
        .slice(0, maxSkillsPerCategory || skillsToRender.length)
        .map((skill, index) => (
          <Grid item xs={12} sm={6} md={12 / columnsPerRow} key={skill.name}>
            <Box sx={{ mb: compact ? 1 : 2 }}>
              {renderSkillItem(skill, index)}
            </Box>
          </Grid>
        ))}
    </Grid>
  );

  // 普通布局渲染技能组
  const renderNormalSkills = (skillsToRender: Skill[]) => (
    <>
      {skillsToRender
        .slice(0, maxSkillsPerCategory || skillsToRender.length)
        .map((skill, index) => (
          <Box key={skill.name} sx={{ mb: compact ? 1 : 2 }}>
            {renderSkillItem(skill, index)}
          </Box>
        ))}
    </>
  );

  return (
    <>
      {Object.entries(categories).map(([key, category]) =>
        category.skills.length > 0 ? (
          <Box key={key} sx={{ mb: compact ? 2 : 4 }}>
            {showCategoryHeaders && (
              <Typography
                variant={compact ? "body2" : "subtitle1"}
                sx={{
                  mb: compact ? 1 : 2,
                  borderLeft: `4px solid ${muiTheme.palette.primary.main}`,
                  pl: 1.5,
                  fontWeight: 600,
                  fontSize: compact ? '0.9rem' : undefined
                }}
              >
                {category.title}
              </Typography>
            )}

            {useGrid
              ? renderGridSkills(category.skills)
              : renderNormalSkills(category.skills)
            }
          </Box>
        ) : null
      )}
    </>
  );
};

export default SkillBarGroup;
