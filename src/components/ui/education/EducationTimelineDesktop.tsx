import React, { useState } from 'react';
import { Box, Paper, Typography, Divider, Chip, Avatar, alpha, useMediaQuery } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaBook, FaAward, FaBriefcase, FaTrophy, FaStar } from 'react-icons/fa';
import { useTheme } from '../../../contexts/ThemeContext';

// 本地化文本接口
interface LocalizedText {
  en: string;
  zh: string;
}

// 教育项接口
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
interface EducationTimelineDesktopProps {
  educationItems: Education[];
}

/**
 * 桌面端教育时间轴组件
 * 现代化设计，双向布局，增强动画效果
 */
const EducationTimelineDesktop: React.FC<EducationTimelineDesktopProps> = ({ educationItems }) => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const muiTheme = useMuiTheme();
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 时间轴选中项状态
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 获取本地化文本
  const getLocalizedText = (text: LocalizedText): string => {
    return i18n.language === 'zh' ? text.zh : text.en;
  };

  // 格式化日期显示
  const formatDisplayDate = (date: Date | null, isOngoing: boolean = false): string => {
    if (!date) return '';

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (isOngoing) {
      return `${year}.${month} - 至今`;
    }

    return `${year}.${month}`;
  };

  // 检查是否为当前学习中
  const isCurrentlyStudying = (endDate: Date | null): boolean => {
    return endDate === null;
  };

  // 容器动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // 时间轴项动画变体
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // 时间线动画变体
  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: '100%',
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        py: 6,
        px: { xs: 2, sm: 4 },
        overflow: 'hidden'
      }}
    >
      {/* 中央时间线 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '4px',
          height: '100%',
          bgcolor: 'transparent',
          zIndex: 0,
          transform: 'translateX(-50%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(to bottom,
              ${isDark ? alpha('#6366f1', 0.2) : alpha('#6366f1', 0.1)},
              ${isDark ? alpha('#ec4899', 0.2) : alpha('#ec4899', 0.1)},
              ${isDark ? alpha('#10b981', 0.2) : alpha('#10b981', 0.1)}
            )`,
            borderRadius: '4px',
          }
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(to bottom,
              ${isDark ? '#6366f1' : '#4f46e5'},
              ${isDark ? '#ec4899' : '#db2777'},
              ${isDark ? '#10b981' : '#059669'}
            )`,
            borderRadius: '4px',
          }}
        />
      </Box>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {educationItems.map((education, index) => {
          const isRight = index % 2 === 0;
          const isOngoing = isCurrentlyStudying(education.endDate);

          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: isRight ? 'row' : 'row-reverse',
                position: 'relative',
                mb: 8,
                mt: index === 0 ? 4 : 0,
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              {/* 中心时间标记 */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: isOngoing ?
                      (isDark ? '#3b82f6' : '#2563eb') :
                      (isDark ? '#6366f1' : '#4f46e5'),
                    boxShadow: `0 0 0 4px ${isDark ? '#1e293b' : '#f8fafc'}, 0 8px 16px ${alpha('#000', 0.1)}`,
                    color: '#fff',
                    mb: 1,
                    transition: 'all 0.3s ease',
                    fontSize: 24,
                    '&:hover': {
                      boxShadow: `0 0 0 4px ${isDark ? '#1e293b' : '#f8fafc'}, 0 12px 24px ${alpha('#000', 0.15)}`,
                    }
                  }}
                >
                  <FaGraduationCap />
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    p: 1,
                    px: 1.5,
                    bgcolor: isOngoing ?
                      (isDark ? alpha('#3b82f6', 0.2) : alpha('#2563eb', 0.1)) :
                      (isDark ? alpha('#6366f1', 0.2) : alpha('#4f46e5', 0.1)),
                    color: isOngoing ?
                      (isDark ? '#93c5fd' : '#2563eb') :
                      (isDark ? '#a5b4fc' : '#4f46e5'),
                    borderRadius: 4,
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isOngoing ? (
                    formatDisplayDate(education.startDate, true)
                  ) : (
                    <>
                      {formatDisplayDate(education.startDate)} - {formatDisplayDate(education.endDate)}
                    </>
                  )}
                </Typography>
              </Box>

              {/* 内容卡片 */}
              <Box
                sx={{
                  width: isTablet ? '80%' : '40%',
                  pr: isRight ? { xs: 4, md: 6 } : 0,
                  pl: !isRight ? { xs: 4, md: 6 } : 0,
                }}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2, sm: 3 },
                      borderRadius: 3,
                      bgcolor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease',
                      boxShadow: hoveredIndex === index ?
                        (isDark ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)') :
                        'none',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': isOngoing ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 6,
                        height: '100%',
                        bgcolor: isDark ? '#3b82f6' : '#2563eb',
                        borderTopLeftRadius: 12,
                        borderBottomLeftRadius: 12
                      } : {}
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={education.logoUrl}
                        alt={getLocalizedText(education.institutionName)}
                        sx={{
                          width: 48,
                          height: 48,
                          mr: 2,
                          bgcolor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                          border: '1px solid',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <FaGraduationCap />
                      </Avatar>

                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: isDark ? 'white' : 'text.primary',
                            mb: 0.5,
                            fontSize: { xs: '1rem', md: '1.1rem' }
                          }}
                        >
                          {getLocalizedText(education.institutionName)}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {getLocalizedText(education.studyType)} · {getLocalizedText(education.areaOfStudy)}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? 'grey.300' : 'text.secondary',
                          mb: 2,
                          lineHeight: 1.6
                        }}
                      >
                        {getLocalizedText(education.description)}
                      </Typography>

                      {education.achievements.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              color: isDark ? '#a5b4fc' : '#4f46e5',
                              mb: 1,
                              fontWeight: 600
                            }}
                          >
                            <FaTrophy style={{ marginRight: 8 }} />
                            成就
                          </Typography>

                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {education.achievements.slice(0, 2).map((achievement, i) => (
                              <Chip
                                key={i}
                                label={getLocalizedText(achievement)}
                                size="small"
                                sx={{
                                  bgcolor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                                  color: isDark ? '#a5b4fc' : '#4f46e5',
                                  border: '1px solid',
                                  borderColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)',
                                }}
                              />
                            ))}
                            {education.achievements.length > 2 && (
                              <Chip
                                label={`+${education.achievements.length - 2}`}
                                size="small"
                                sx={{
                                  bgcolor: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(241, 245, 249, 0.8)',
                                  color: isDark ? 'grey.400' : 'grey.600',
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      )}

                      {education.skills.length > 0 && (
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              color: isDark ? '#a5b4fc' : '#4f46e5',
                              mb: 1,
                              fontWeight: 600
                            }}
                          >
                            <FaStar style={{ marginRight: 8 }} />
                            技能
                          </Typography>

                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {education.skills.slice(0, 4).map((skill, i) => (
                              <Chip
                                key={i}
                                label={getLocalizedText(skill)}
                                size="small"
                                sx={{
                                  bgcolor: isDark ? 'rgba(236, 72, 153, 0.1)' : 'rgba(219, 39, 119, 0.1)',
                                  color: isDark ? '#f9a8d4' : '#db2777',
                                  border: '1px solid',
                                  borderColor: isDark ? 'rgba(236, 72, 153, 0.2)' : 'rgba(219, 39, 119, 0.2)',
                                }}
                              />
                            ))}
                            {education.skills.length > 4 && (
                              <Chip
                                label={`+${education.skills.length - 4}`}
                                size="small"
                                sx={{
                                  bgcolor: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(241, 245, 249, 0.8)',
                                  color: isDark ? 'grey.400' : 'grey.600',
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </motion.div>
              </Box>
            </Box>
          );
        })}
      </motion.div>
    </Box>
  );
};

export default EducationTimelineDesktop;
