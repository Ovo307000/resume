import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Avatar,
  Button,
  Divider,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExpandMore, ExpandLess, School } from '@mui/icons-material';
import { useTheme } from '../../../contexts/ThemeContext';
import EducationCardContent from './EducationCardContent';

// 本地化文本接口
interface LocalizedText {
  en: string;
  zh: string;
}

// 教育数据接口
interface Education {
  institutionName: LocalizedText;
  studyType: LocalizedText;
  areaOfStudy: LocalizedText;
  startDate: Date;
  endDate: Date | null;
  location: LocalizedText;
  description: LocalizedText;
  courses: LocalizedText[];
  activities: LocalizedText[];
  achievements: LocalizedText[];
  skills: LocalizedText[];
  currentFocus: LocalizedText[];
  goals: LocalizedText[];
  logoUrl: string;
}

// 组件属性接口
interface EducationCardProps {
  education: Education;
  isExpanded: boolean;
  onToggleExpand: () => void;
  index: number;
}

const EducationCard: React.FC<EducationCardProps> = ({
  education,
  isExpanded,
  onToggleExpand,
  index
}) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentLang = i18n.language;

  // 获取本地化文本
  const getLocalizedText = (text: LocalizedText): string => {
    return currentLang === 'zh' ? text.zh : text.en;
  };

  // 格式化显示日期
  const formatDisplayDate = (startDate: Date, endDate: Date | null): string => {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth() + 1;

    if (endDate === null) {
      return `${startYear}.${startMonth} - ${t('education.ongoing')}`;
    }

    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth() + 1;
    return `${startYear}.${startMonth} - ${endYear}.${endMonth}`;
  };

  // 卡片动画变体
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        component={motion.div}
        variants={cardVariants}
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: isDark ? 'rgba(20, 20, 30, 0.5)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: isDark
              ? '0 12px 40px rgba(0, 0, 0, 0.4)'
              : '0 12px 40px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {/* 头部 - 学校信息 */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={education.logoUrl}
              alt={getLocalizedText(education.institutionName)}
              sx={{
                width: 48,
                height: 48,
                mr: 2,
                bgcolor: isDark ? alpha('#fff', 0.1) : alpha('#000', 0.05),
                border: '1px solid',
                borderColor: isDark ? alpha('#fff', 0.1) : alpha('#000', 0.1)
              }}
            >
              {!education.logoUrl && <School />}
            </Avatar>

            <Box>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  lineHeight: 1.3,
                  mb: 0.5
                }}
              >
                {getLocalizedText(education.institutionName)}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.8rem' }}
              >
                {getLocalizedText(education.areaOfStudy)}
              </Typography>
            </Box>
          </Box>

          {/* 状态指示器 */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              label={getLocalizedText(education.studyType)}
              size="small"
              sx={{
                fontSize: '0.7rem',
                backgroundColor: isDark
                  ? alpha('#3f51b5', 0.15)
                  : alpha('#3f51b5', 0.1),
                color: isDark
                  ? '#90caf9'
                  : '#3f51b5',
                fontWeight: 500
              }}
            />

            {education.endDate === null && (
              <Chip
                label={t('education.ongoing')}
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  backgroundColor: isDark
                    ? alpha('#4caf50', 0.15)
                    : alpha('#4caf50', 0.1),
                  color: isDark
                    ? '#81c784'
                    : '#4caf50',
                  fontWeight: 500
                }}
              />
            )}
          </Box>

          {/* 日期显示 */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.8rem',
              mb: 1.5,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {formatDisplayDate(education.startDate, education.endDate)}
          </Typography>

          {/* 描述信息 */}
          {education.description && (
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: isDark ? 'grey.300' : 'grey.700',
                fontSize: '0.85rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {getLocalizedText(education.description)}
            </Typography>
          )}

          {/* 展开/收起按钮 */}
          <Button
            variant="text"
            size="small"
            endIcon={isExpanded ? <ExpandLess /> : <ExpandMore />}
            onClick={onToggleExpand}
            sx={{
              textTransform: 'none',
              color: isDark ? 'primary.light' : 'primary.main',
              fontWeight: 500,
              fontSize: '0.8rem',
              p: 0.5,
              minWidth: 'auto',
              alignSelf: 'flex-start',
              '&:hover': {
                backgroundColor: isDark
                  ? alpha('#3f51b5', 0.1)
                  : alpha('#3f51b5', 0.05),
              }
            }}
          >
            {isExpanded ? t('common.showLess') : t('common.showMore')}
          </Button>
        </Box>

        {/* 卡片内容详情 */}
        <Box sx={{ px: { xs: 2, sm: 3 }, pb: isExpanded ? { xs: 2, sm: 3 } : 0 }}>
          {isExpanded && <Divider sx={{ mb: 2 }} />}
          <EducationCardContent
            education={education}
            isExpanded={isExpanded}
          />
        </Box>
      </Paper>
    </Grid>
  );
};

export default EducationCard;
