import React from 'react';
import { Box, List, ListItem, Paper, Typography, Avatar, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Education } from '../../../pages/education/EducationPage';

export interface EducationTimelineMobileProps {
  educationItems: Education[];
}

const EducationTimelineMobile: React.FC<EducationTimelineMobileProps> = ({ educationItems }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentLang = i18n.language;

  // 获取当前语言下的文本
  const getLocalizedText = (text: { en: string; zh: string }): string => {
    return currentLang === 'zh' ? text.zh : text.en;
  };

  // 格式化日期显示
  const formatDisplayDate = (startDate: Date, endDate: Date | null): string => {
    const startYear = startDate.getFullYear();

    if (endDate === null) {
      return `${startYear} - ${t('education.ongoing')}`;
    }

    const endYear = endDate.getFullYear();
    return `${startYear} - ${endYear}`;
  };

  // 创建动画变体
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {educationItems && educationItems.length > 0 ? (
        <List
          component={motion.ul}
          variants={listVariants}
          initial="hidden"
          animate="visible"
          sx={{
            width: '100%',
            p: 0,
            listStyle: 'none'
          }}
        >
          {educationItems.map((education, index) => (
            <ListItem
              component={motion.li}
              variants={itemVariants}
              key={index}
              sx={{
                display: 'block',
                p: 0,
                mb: 3,
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#fff',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={education.logoUrl}
                    alt={getLocalizedText(education.institutionName)}
                    sx={{
                      width: 45,
                      height: 45,
                      mr: 2,
                      bgcolor: isDark ? 'primary.dark' : 'primary.light',
                      border: `2px solid ${isDark ? '#1e293b' : '#fff'}`
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: isDark ? '#fff' : '#1e293b'
                      }}
                    >
                      {getLocalizedText(education.institutionName)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 0.5
                      }}
                    >
                      {getLocalizedText(education.studyType)}: {getLocalizedText(education.areaOfStudy)}
                      {education.endDate === null && (
                        <Chip
                          label={t('education.ongoing')}
                          size="small"
                          color="primary"
                          sx={{
                            height: 20,
                            fontSize: '0.7rem',
                            ml: 1
                          }}
                        />
                      )}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 1.5 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 0.5,
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{formatDisplayDate(education.startDate, education.endDate)}</span>
                    <span>{getLocalizedText(education.location)}</span>
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                    mb: 1.5
                  }}
                >
                  {getLocalizedText(education.description)}
                </Typography>

                {education.skills.length > 0 && (
                  <Box sx={{ mb: 1.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'
                      }}
                    >
                      {t('education.skills')}:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {education.skills.map((skill, i) => (
                        <Chip
                          key={i}
                          label={getLocalizedText(skill)}
                          size="small"
                          sx={{
                            backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                            color: isDark ? '#a5b4fc' : '#4f46e5',
                            fontSize: '0.75rem',
                            height: '24px'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Paper>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}
        >
          {t('education.noData')}
        </Typography>
      )}
    </Box>
  );
};

export default EducationTimelineMobile;
