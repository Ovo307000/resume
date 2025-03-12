import React from 'react';
import { Box, Typography, Paper, Chip, List, ListItem, ListItemText, useTheme as useMuiTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiCalendar, FiAward, FiActivity, FiCode, FiTarget, FiBookOpen } from 'react-icons/fi';

interface LocalizedText {
  en: string;
  zh: string;
}

interface Education {
  institution: string;
  area: string;
  startDate: string;
  endDate: string;
  isOngoing?: boolean;
  displayDate: LocalizedText;
  description?: LocalizedText;
  activities?: LocalizedText[];
  achievements?: LocalizedText[];
  skills?: LocalizedText[];
  currentFocus?: LocalizedText[];
  goals?: LocalizedText[];
}

interface EducationTimelineItemProps {
  education: Education;
  index: number;
  isAlternate: boolean;
}

/**
 * 教育经历时间线项目组件
 * 展示学校、专业、日期等信息，支持交替布局
 */
const EducationTimelineItem: React.FC<EducationTimelineItemProps> = ({
  education,
  index,
  isAlternate
}) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';
  const isEven = index % 2 === 0;
  const language = i18n.language as keyof LocalizedText;
  const fallbackLanguage: keyof LocalizedText = 'en';

  // 获取本地化文本
  const getLocalizedText = (text?: LocalizedText): string => {
    if (!text) return '';
    return text[language] || text[fallbackLanguage] || '';
  };

  // 从LocalizedText数组中获取本地化文本数组
  const getLocalizedArray = (array?: LocalizedText[]): string[] => {
    if (!array) return [];
    return array.map(item => getLocalizedText(item));
  };

  // 动画变体
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      x: isAlternate ? (isEven ? -20 : 20) : 0
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  // 时间点变体
  const dotVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        delay: index * 0.1 + 0.2,
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  // 渲染列表项
  const renderListItems = (
    items: string[],
    icon: React.ReactNode,
    color: string
  ) => {
    if (items.length === 0) return null;

    return (
      <List disablePadding sx={{ mt: 2 }}>
        {items.map((item, idx) => (
          <ListItem
            key={idx}
            disablePadding
            alignItems="flex-start"
            sx={{ mb: 1, pl: 0 }}
          >
            <Box
              sx={{
                mr: 1.5,
                color,
                display: 'flex',
                alignItems: 'flex-start',
                pt: 0.5
              }}
            >
              {icon}
            </Box>
            <ListItemText
              primary={item}
              primaryTypographyProps={{
                variant: 'body2',
                color: 'text.primary',
                sx: { lineHeight: 1.5 }
              }}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  // 卡片样式
  const cardStyle = {
    p: { xs: 2, sm: 3 },
    borderRadius: 3,
    position: 'relative',
    background: isDark
      ? 'linear-gradient(145deg, rgba(30, 30, 40, 0.8), rgba(35, 35, 45, 0.8))'
      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 250, 0.9))',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
    boxShadow: isDark
      ? '0 4px 20px rgba(0, 0, 0, 0.2)'
      : '0 4px 20px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    '&::after': isAlternate && !isMobile ? {
      content: '""',
      position: 'absolute',
      top: '30px',
      width: '15px',
      height: '15px',
      background: isDark ? '#1E1E28' : '#FFFFFF',
      transform: 'rotate(45deg)',
      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
      borderTop: 'none',
      borderLeft: isEven ? 'none' : undefined,
      borderRight: isEven ? undefined : 'none',
      left: isEven ? 'auto' : '-8px',
      right: isEven ? '-8px' : 'auto',
      zIndex: 0
    } : {}
  };

  // 修正移动设备问题
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: isAlternate && !isMobile ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: isAlternate && !isMobile ? undefined : 'center',
        my: { xs: 4, sm: 5, md: 6 }
      }}
    >
      {/* 时间点 - 仅在交替布局且非移动设备时显示 */}
      {isAlternate && !isMobile && (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '30px',
            transform: 'translateX(-50%)',
            zIndex: 2
          }}
        >
          <motion.div
            variants={dotVariants}
            initial="initial"
            animate="animate"
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: isDark ? 'primary.main' : 'primary.main',
                border: `3px solid ${isDark ? '#1E1E28' : '#FFFFFF'}`,
                boxShadow: isDark
                  ? '0 0 0 3px rgba(99, 102, 241, 0.3)'
                  : '0 0 0 3px rgba(99, 102, 241, 0.2)'
              }}
            />
          </motion.div>
        </Box>
      )}

      {/* 移动设备时显示垂直时间轴 */}
      {!isAlternate || isMobile ? (
        <Box
          sx={{
            position: 'absolute',
            left: '20px',
            top: 0,
            bottom: 0,
            width: '2px',
            display: { xs: 'block', md: isAlternate ? 'none' : 'block' },
            backgroundColor: theme === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.06)',
            zIndex: 0
          }}
        />
      ) : null}

      {/* 内容卡片 */}
      <Box
        sx={{
          width: isAlternate && !isMobile ? '50%' : '100%',
          maxWidth: isAlternate && !isMobile ? undefined : { xs: '100%', sm: '95%', md: '85%' },
          pr: isAlternate && !isMobile && isEven ? { xs: 0, md: 4 } : 0,
          pl: isAlternate && !isMobile ?
            (!isEven ? { xs: 0, md: 4 } : 0) :
            { xs: 5, sm: 6, md: isAlternate ? 0 : 6 }, // 添加左侧padding给垂直时间轴
          ml: isAlternate && !isMobile && !isEven ? 'auto' : 0
        }}
      >
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          style={{
            position: 'relative'
          }}
        >
          {/* 垂直时间轴上的时间点 */}
          {(!isAlternate || isMobile) && (
            <Box
              sx={{
                position: 'absolute',
                left: '-43px',
                top: '30px',
                zIndex: 1,
                display: { xs: 'flex', md: isAlternate ? 'none' : 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#1E1E28' : '#FFFFFF',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                boxShadow: isDark
                  ? '0 4px 8px rgba(0, 0, 0, 0.2)'
                  : '0 4px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: isDark ? 'primary.main' : 'primary.main',
                  boxShadow: isDark
                    ? '0 0 0 2px rgba(99, 102, 241, 0.3)'
                    : '0 0 0 2px rgba(99, 102, 241, 0.2)'
                }}
              />
            </Box>
          )}

          <Paper elevation={0} sx={cardStyle}>
            {/* 学校和日期 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 600,
                  color: isDark ? 'primary.light' : 'primary.main',
                  mb: 0.5
                }}
              >
                {education.institution}
              </Typography>

              <Typography
                variant="h6"
                component="h4"
                sx={{
                  fontWeight: 500,
                  mb: 1.5
                }}
              >
                {education.area}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <FiCalendar size={16} style={{ marginRight: 8 }} />
                <Typography variant="body2" color="text.secondary">
                  {getLocalizedText(education.displayDate)}
                  {education.isOngoing && (
                    <Chip
                      label={t('education.current')}
                      size="small"
                      color="primary"
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                    />
                  )}
                </Typography>
              </Box>
            </Box>

            {/* 描述 */}
            {education.description && (
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  mb: 2,
                  lineHeight: 1.6,
                  opacity: 0.9
                }}
              >
                {getLocalizedText(education.description)}
              </Typography>
            )}

            {/* 活动 */}
            {renderListItems(
              getLocalizedArray(education.activities),
              <FiActivity size={16} />,
              isDark ? '#F59E0B' : '#D97706'
            )}

            {/* 成就 */}
            {renderListItems(
              getLocalizedArray(education.achievements),
              <FiAward size={16} />,
              isDark ? '#10B981' : '#059669'
            )}

            {/* 技能 */}
            {renderListItems(
              getLocalizedArray(education.skills),
              <FiCode size={16} />,
              isDark ? '#8B5CF6' : '#7C3AED'
            )}

            {/* 当前关注 */}
            {renderListItems(
              getLocalizedArray(education.currentFocus),
              <FiBookOpen size={16} />,
              isDark ? '#EC4899' : '#DB2777'
            )}

            {/* 目标 */}
            {renderListItems(
              getLocalizedArray(education.goals),
              <FiTarget size={16} />,
              isDark ? '#3B82F6' : '#2563EB'
            )}
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};

export default EducationTimelineItem;
