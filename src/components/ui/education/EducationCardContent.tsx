import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Collapse,
  Paper,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Grid,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { FiBookOpen, FiActivity, FiAward, FiCode, FiTarget, FiHeart } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { BiCalendar } from 'react-icons/bi';
import { Education } from '../../../types/education';
import { useTheme } from '../../../contexts/ThemeContext';

interface EducationCardContentProps {
  education: Education;
  isExpanded: boolean;
  isTimelineView?: boolean;
}

const EducationCardContent: React.FC<EducationCardContentProps> = ({
  education,
  isExpanded,
  isTimelineView = false
}) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const contentRef = useRef<HTMLDivElement>(null);

  // 如果没有展开，则不渲染内容
  if (!isExpanded) {
    return null;
  }

  const formatDisplayDate = (education: Education) => {
    const { startDate, endDate } = education;
    const start = new Date(startDate).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
    });

    const isOngoing = !endDate || new Date(endDate) > new Date();

    if (isOngoing) {
      return `${start} - ${t('education.present', '至今')}`;
    }

    const end = new Date(endDate).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
    });

    return `${start} - ${end}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const chipContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const chipVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 10,
      },
    },
  };

  // 获取展开样式
  const getExpandedSx = () => {
    if (isTimelineView) {
      return {
        mt: 2,
        width: '100%',
        borderRadius: 3,
        overflow: 'visible',
        background: 'transparent',
        boxShadow: 'none',
      };
    }
    return {
      mt: 2,
      borderRadius: 3,
      overflow: 'hidden',
      bgcolor: isDark ? 'rgba(20, 20, 30, 0.5)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      boxShadow: isDark ? '0 8px 30px rgba(0, 0, 0, 0.2)' : '0 8px 30px rgba(0, 0, 0, 0.1)',
      border: '1px solid',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
      position: 'relative',
    };
  };

  return (
    <Box
      component={motion.div}
      variants={itemVariants}
      ref={contentRef}
      sx={{ width: '100%' }}
    >
      <Paper sx={getExpandedSx()} elevation={0}>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {/* 日期 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1.5,
              color: isDark ? 'grey.400' : 'grey.600',
            }}
          >
            <BiCalendar style={{ marginRight: '8px' }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {formatDisplayDate(education)}
            </Typography>
          </Box>

          {/* 描述 */}
          {education.description && (
            <Typography
              variant="body1"
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              sx={{
                mb: 2,
                color: isDark ? 'grey.300' : 'grey.800',
                whiteSpace: 'pre-line',
              }}
            >
              {i18n.language === 'zh'
                ? education.description.zh
                : education.description.en}
            </Typography>
          )}

          {/* 技能块 */}
          {education.skills && education.skills.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
              >
                <FiCode style={{ marginRight: '8px' }} />
                {t('education.skillsLearned', '学习的技能')}
              </Typography>
              <Box
                component={motion.div}
                variants={chipContainerVariants}
                initial="hidden"
                animate="visible"
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
              >
                {education.skills.map((skill, index) => (
                  <motion.div key={index} variants={chipVariants}>
                    <Chip
                      label={i18n.language === 'zh' ? skill.zh : skill.en}
                      size="small"
                      sx={{
                        bgcolor: isDark
                          ? alpha('#3f51b5', 0.2)
                          : alpha('#3f51b5', 0.1),
                        color: isDark ? '#90caf9' : '#3f51b5',
                        fontWeight: 500,
                        backdropFilter: 'blur(4px)',
                        '&:hover': {
                          bgcolor: isDark
                            ? alpha('#3f51b5', 0.3)
                            : alpha('#3f51b5', 0.2),
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 课程部分 */}
            {education.courses && education.courses.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  component={motion.div}
                  variants={itemVariants}
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <FiBookOpen style={{ marginRight: '8px' }} />
                  {t('education.keyCourses', '主要课程')}
                </Typography>
                <List dense sx={{ bgcolor: 'transparent', pt: 0 }}>
                  {education.courses.map((course, index) => (
                    <ListItem
                      component={motion.div}
                      variants={itemVariants}
                      key={index}
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: isDark
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.03)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: isDark ? '#90caf9' : '#1976d2',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          i18n.language === 'zh' ? course.zh : course.en
                        }
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: isDark ? 'grey.300' : 'grey.800',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* 活动部分 */}
            {education.activities && education.activities.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  component={motion.div}
                  variants={itemVariants}
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <FiActivity style={{ marginRight: '8px' }} />
                  {t('education.activities', '活动与经历')}
                </Typography>
                <Grid container spacing={1}>
                  {education.activities.map((activity, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper
                        component={motion.div}
                        variants={itemVariants}
                        elevation={0}
                        sx={{
                          p: 1.5,
                          bgcolor: isDark
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.02)',
                          border: '1px solid',
                          borderColor: isDark
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.05)',
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: isDark ? 'grey.300' : 'grey.800',
                          }}
                        >
                          {i18n.language === 'zh' ? activity.zh : activity.en}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* 成就部分 */}
            {education.achievements && education.achievements.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  component={motion.div}
                  variants={itemVariants}
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <FiAward style={{ marginRight: '8px' }} />
                  {t('education.achievements', '成就与奖项')}
                </Typography>
                <Grid container spacing={1}>
                  {education.achievements.map((achievement, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper
                        component={motion.div}
                        variants={itemVariants}
                        elevation={0}
                        sx={{
                          p: 1.5,
                          bgcolor: isDark
                            ? 'rgba(255, 215, 0, 0.05)'
                            : 'rgba(255, 215, 0, 0.05)',
                          border: '1px solid',
                          borderColor: isDark
                            ? 'rgba(255, 215, 0, 0.2)'
                            : 'rgba(255, 215, 0, 0.2)',
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: isDark
                              ? 'rgba(255, 215, 0, 0.9)'
                              : 'rgba(184, 134, 11, 1)',
                            fontWeight: 500,
                          }}
                        >
                          {i18n.language === 'zh'
                            ? achievement.zh
                            : achievement.en}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* 当前专注 */}
            {education.currentFocus && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  component={motion.div}
                  variants={itemVariants}
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <FiHeart style={{ marginRight: '8px' }} />
                  {t('education.currentFocus', '当前专注')}
                </Typography>
                <Paper
                  component={motion.div}
                  variants={itemVariants}
                  elevation={0}
                  sx={{
                    p: 1.5,
                    bgcolor: isDark
                      ? 'rgba(233, 30, 99, 0.05)'
                      : 'rgba(233, 30, 99, 0.03)',
                    border: '1px solid',
                    borderColor: isDark
                      ? 'rgba(233, 30, 99, 0.2)'
                      : 'rgba(233, 30, 99, 0.1)',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDark ? 'rgba(240, 98, 146, 1)' : '#d81b60',
                    }}
                  >
                    {i18n.language === 'zh'
                      ? education.currentFocus.zh
                      : education.currentFocus.en}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* 目标 */}
            {education.goals && education.goals.length > 0 && (
              <Box>
                <Typography
                  variant="subtitle2"
                  component={motion.div}
                  variants={itemVariants}
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <FiTarget style={{ marginRight: '8px' }} />
                  {t('education.goals', '学习目标')}
                </Typography>
                <List dense sx={{ bgcolor: 'transparent', pt: 0 }}>
                  {education.goals.map((goal, index) => (
                    <ListItem
                      component={motion.div}
                      variants={itemVariants}
                      key={index}
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: isDark
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.03)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: isDark ? '#81c784' : '#2e7d32',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={i18n.language === 'zh' ? goal.zh : goal.en}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: isDark ? 'grey.300' : 'grey.800',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </motion.div>
        </Box>
      </Paper>
    </Box>
  );
};

export default EducationCardContent;
