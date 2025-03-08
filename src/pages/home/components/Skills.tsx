import React from 'react';
import { Box, Grid, Typography, LinearProgress, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import {
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaPython,
  FaJava,
  FaDocker,
  FaAws,
  FaDatabase
} from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiRedux,
  SiTailwindcss,
  SiMui
} from 'react-icons/si';

interface SkillProps {
  name: string;
  level: number;
  icon: React.ReactNode;
  color?: string;
}

/**
 * 技能条组件
 */
const SkillBar: React.FC<SkillProps> = ({ name, level, icon, color }) => {
  const { theme } = useTheme();
  const defaultColor = theme === 'dark' ? '#a0a0ff' : '#5050ff';
  const skillColor = color || defaultColor;

  // 根据level (0-100)确定熟练度文本
  const getProficiencyText = (level: number) => {
    if (level >= 90) return '专家';
    if (level >= 80) return '高级';
    if (level >= 65) return '中级';
    if (level >= 40) return '基础';
    return '入门';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              mr: 1.5,
              color: skillColor,
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.5rem'
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              flexGrow: 1
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            {getProficiencyText(level)}
          </Typography>
        </Box>

        <Tooltip title={`${level}%`} placement="top" arrow>
          <Box sx={{ position: 'relative', height: 8, width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={level}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.07)',
                '.MuiLinearProgress-bar': {
                  backgroundColor: skillColor,
                  borderRadius: 4
                }
              }}
            />
          </Box>
        </Tooltip>
      </Box>
    </motion.div>
  );
};

/**
 * 技能分类组件
 */
const SkillCategory: React.FC<{ title: string; skills: SkillProps[] }> = ({ title, skills }) => {
  const { theme } = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        component="h3"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: theme === 'dark' ? '#a0a0ff' : '#5050ff',
          borderBottom: theme === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.07)',
          pb: 1
        }}
      >
        {title}
      </Typography>

      <Grid container spacing={3}>
        {skills.map((skill, index) => (
          <Grid item xs={12} md={6} key={index}>
            <SkillBar {...skill} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

/**
 * 技能展示组件
 */
const Skills: React.FC = () => {
  const { t } = useTranslation();

  // 前端技能
  const frontendSkills: SkillProps[] = [
    { name: 'React', level: 95, icon: <FaReact />, color: '#61DAFB' },
    { name: 'TypeScript', level: 90, icon: <SiTypescript />, color: '#3178C6' },
    { name: 'JavaScript', level: 95, icon: <SiJavascript />, color: '#F7DF1E' },
    { name: 'Vue.js', level: 80, icon: <FaVuejs />, color: '#4FC08D' },
    { name: 'Redux', level: 85, icon: <SiRedux />, color: '#764ABC' },
    { name: 'Material UI', level: 90, icon: <SiMui />, color: '#0081CB' },
    { name: 'Tailwind CSS', level: 85, icon: <SiTailwindcss />, color: '#06B6D4' },
  ];

  // 后端技能
  const backendSkills: SkillProps[] = [
    { name: 'Node.js', level: 85, icon: <FaNodeJs />, color: '#339933' },
    { name: 'Python', level: 75, icon: <FaPython />, color: '#3776AB' },
    { name: 'Java', level: 70, icon: <FaJava />, color: '#007396' },
    { name: 'GraphQL', level: 80, icon: <SiGraphql />, color: '#E10098' },
    { name: 'RESTful API', level: 90, icon: <FaNodeJs />, color: '#FF6C37' },
  ];

  // 数据库技能
  const databaseSkills: SkillProps[] = [
    { name: 'MongoDB', level: 85, icon: <SiMongodb />, color: '#47A248' },
    { name: 'PostgreSQL', level: 80, icon: <SiPostgresql />, color: '#336791' },
    { name: 'MySQL', level: 75, icon: <FaDatabase />, color: '#4479A1' },
  ];

  // DevOps技能
  const devopsSkills: SkillProps[] = [
    { name: 'Docker', level: 70, icon: <FaDocker />, color: '#2496ED' },
    { name: 'AWS', level: 65, icon: <FaAws />, color: '#FF9900' },
    { name: 'CI/CD', level: 75, icon: <FaDocker />, color: '#FC6D26' },
  ];

  return (
    <Box>
      <SkillCategory title={t('skills.categories.frontend')} skills={frontendSkills} />
      <SkillCategory title={t('skills.categories.backend')} skills={backendSkills} />
      <SkillCategory title={t('skills.categories.database')} skills={databaseSkills} />
      <SkillCategory title={t('skills.categories.devops')} skills={devopsSkills} />
    </Box>
  );
};

export default Skills;
