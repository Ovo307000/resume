import React from 'react';
import { Box, Typography, Chip, Divider, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiAward, FiCode } from 'react-icons/fi';
import GlassPanel from './glass/GlassPanel';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { alpha } from '@mui/material/styles';
import TechTag from './common/TechTag';

export interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  isMobile?: boolean;
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
  isMobile = false
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const { t } = useTranslation();

  // 根据技术名称生成颜色
  const getTechColor = (tech: string, idx: number) => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
    // 基于技术名称的哈希值选择颜色
    const hash = tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <Box
      sx={{
        position: 'relative',
        pb: isMobile ? 0 : 2
      }}
    >
      <GlassPanel
        variant="elevated"
        intensity={isMobile ? "light" : "medium"}
        sx={{
          p: isMobile ? 2 : 3,
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* 左侧装饰条 */}
        {!isMobile && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              background: `linear-gradient(to bottom, ${muiTheme.palette.primary.main}, ${alpha(muiTheme.palette.primary.main, 0.3)})`
            }}
          />
        )}

        {/* 标题 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            mb: 2
          }}
        >
          <Typography
            variant={isMobile ? "body1" : "h6"}
            component="h3"
            sx={{
              fontWeight: 600,
              mb: isMobile ? 0.5 : 0
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              backgroundColor: theme === 'dark'
                ? alpha(muiTheme.palette.primary.main, 0.1)
                : alpha(muiTheme.palette.primary.main, 0.05),
              px: 2,
              py: 0.5,
              borderRadius: '50px',
              fontSize: isMobile ? '0.75rem' : '0.8125rem'
            }}
          >
            {period}
          </Typography>
        </Box>

        {/* 公司 */}
        <Typography
          variant={isMobile ? "body2" : "subtitle1"}
          color="text.secondary"
          sx={{ mb: 2, fontWeight: 500 }}
        >
          {company}
        </Typography>

        {/* 描述 */}
        <Typography
          variant="body2"
          paragraph
          sx={{
            mb: 2,
            lineHeight: 1.7,
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'
          }}
        >
          {description}
        </Typography>

        {/* 成就 */}
        {achievements.length > 0 && (
          <Box sx={{ mb: achievements.length > 0 ? 2 : 0 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <FiAward size={14} color={muiTheme.palette.primary.main} />
              {t('about.achievements', '成就')}
            </Typography>
            <Box component="ul" sx={{ pl: 2, mb: 0, mt: 1 }}>
              {achievements.map((achievement, index) => (
                <Box
                  component="li"
                  key={index}
                  sx={{
                    mb: 0.75,
                    fontSize: isMobile ? '0.8125rem' : '0.875rem',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'
                  }}
                >
                  {achievement}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* 技术栈 */}
        {technologies.length > 0 && (
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <FiCode size={14} color={muiTheme.palette.primary.main} />
              {t('about.technologies', '技术栈')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
              {technologies.map((tech, index) => (
                <TechTag
                  key={index}
                  label={tech}
                  variant="small"
                  animate={false}
                  index={index}
                />
              ))}
            </Box>
          </Box>
        )}
      </GlassPanel>
    </Box>
  );
};

export default ExperienceCard;
