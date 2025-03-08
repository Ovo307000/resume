import React from 'react';
import { Box, Typography, Chip, Divider, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiAward, FiCode } from 'react-icons/fi';
import GlassPanel from './glass/GlassPanel';
import { useTheme } from '../../contexts/ThemeContext';

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  index?: number;
}

/**
 * 工作经历卡片组件
 * 基于毛玻璃面板设计的展示工作经验的卡片
 */
const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  period,
  description,
  achievements = [],
  technologies = [],
  index = 0
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 根据技术名称生成颜色
  const getTechColor = (tech: string, idx: number) => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
    // 基于技术名称的哈希值选择颜色
    const hash = tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <GlassPanel
      variant="elevated"
      intensity={index % 2 === 0 ? "light" : "medium"}
      hoverEffect={true}
      sx={{
        p: 2.5,
        borderRadius: '16px',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          background: `linear-gradient(to bottom, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
          borderTopLeftRadius: '16px',
          borderBottomLeftRadius: '16px'
        }
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        sx={{
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 1,
          fontWeight: 'medium',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' }
        }}
      >
        <FiBriefcase size={16} color={muiTheme.palette.text.secondary} />
        {company}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: 'text.secondary',
          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' },
          lineHeight: 1.5
        }}
      >
        {description}
      </Typography>

      {achievements && achievements.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
            }}
          >
            <FiAward size={14} />
            成就:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0, mb: 0 }}>
            {achievements.map((achievement, i) => (
              <Typography
                component="li"
                variant="body2"
                key={i}
                sx={{
                  mb: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
                }}
              >
                {achievement}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      {technologies && technologies.length > 0 && (
        <>
          <Divider sx={{ my: 1.5, opacity: 0.1 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
            {technologies.map((tech, i) => (
              <Chip
                key={i}
                label={tech}
                size="small"
                color={getTechColor(tech, i) as any}
                variant="outlined"
                sx={{
                  borderRadius: '8px',
                  height: { xs: '22px', md: '24px' },
                  '& .MuiChip-label': {
                    fontSize: { xs: '0.7rem', md: '0.75rem' },
                    px: 1
                  }
                }}
              />
            ))}
          </Box>
        </>
      )}
    </GlassPanel>
  );
};

export default ExperienceCard;
