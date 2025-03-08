import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Collapse,
  Grid
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { FiBook, FiBriefcase, FiAward, FiTarget, FiActivity, FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../contexts/ThemeContext';
import GlassPanel from '../../components/ui/glass/GlassPanel';
import PageTransition from '../../components/ui/transitions/PageTransition';

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

interface EducationPageProps {
  data: Education[];
}

/**
 * 教育经历页面组件
 * 展示学校经历、活动、成就和技能
 */
const EducationPage: React.FC<EducationPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // 获取翻译文本
  const getLocalizedText = (item: LocalizedText) => {
    return language === 'zh' ? item.zh : item.en;
  };

  // 渲染详情列表项
  const renderListItems = (items: LocalizedText[] | undefined, icon: React.ReactNode, delay = 0) => {
    if (!items || items.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 + delay }}
      >
        <List disablePadding>
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (idx * 0.05) + delay }}
            >
              <ListItem alignItems="flex-start" sx={{ px: 0, py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={getLocalizedText(item)}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'text.secondary'
                  }}
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </motion.div>
    );
  };

  // 教育卡片组件
  const EducationCard = ({ education, index }: { education: Education, index: number }) => {
    const isExpanded = !!expandedItems[index];
    const hasDetails = education.activities || education.achievements || education.skills || education.currentFocus || education.goals;

    return (
      <GlassPanel
        variant="elevated"
        intensity={index % 2 === 0 ? "light" : "medium"}
        hoverEffect={true}
        sx={{
          p: 0,
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: 'transparent',
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" component="h3" fontWeight="bold">
              {education.institution}
            </Typography>
            <Typography variant="subtitle1" color="primary.main" gutterBottom>
              {education.area}
            </Typography>

            {education.description && (
              <Typography variant="body2" paragraph>
                {getLocalizedText(education.description)}
              </Typography>
            )}

            {education.isOngoing && (
              <Chip
                label={t('education.ongoing', '进行中')}
                size="small"
                color="primary"
                sx={{ mt: 1, mb: 2 }}
              />
            )}
          </Box>

          {hasDetails && (
            <>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => toggleExpand(index)}
                  endIcon={
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <FiChevronDown />
                    </motion.div>
                  }
                  sx={{
                    mb: 1,
                    textTransform: 'none',
                    fontWeight: 'medium',
                    borderRadius: '8px',
                    px: 2,
                    py: 0.5,
                    '&:hover': {
                      backgroundColor: theme === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.05)'
                    }
                  }}
                >
                  {isExpanded ? t('common.showLess', '收起') : t('common.showMore', '查看更多')}
                </Button>
              </motion.div>

              <Collapse
                in={isExpanded}
                timeout={{
                  enter: 500,
                  exit: 300
                }}
                sx={{
                  '& .MuiCollapse-wrapperInner': {
                    mt: 2
                  }
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={3}>
                      {education.activities && (
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FiActivity />
                              {t('education.activities', '相关活动')}
                            </Box>
                          </Typography>
                          {renderListItems(education.activities, <FiCheckCircle color="#6366F1" size={16} />, 0.1)}
                        </Grid>
                      )}

                      {education.achievements && (
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FiAward />
                              {t('education.achievements', '成就')}
                            </Box>
                          </Typography>
                          {renderListItems(education.achievements, <FiAward color="#10B981" size={16} />, 0.2)}
                        </Grid>
                      )}

                      {education.skills && (
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FiBook />
                              {t('education.skills', '获得技能')}
                            </Box>
                          </Typography>
                          {renderListItems(education.skills, <FiCheckCircle color="#8B5CF6" size={16} />, 0.3)}
                        </Grid>
                      )}

                      {education.currentFocus && (
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FiBriefcase />
                              {t('education.currentFocus', '当前专注')}
                            </Box>
                          </Typography>
                          {renderListItems(education.currentFocus, <FiActivity color="#F59E0B" size={16} />, 0.4)}
                        </Grid>
                      )}

                      {education.goals && (
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FiTarget />
                              {t('education.goals', '学习目标')}
                            </Box>
                          </Typography>
                          {renderListItems(education.goals, <FiTarget color="#EC4899" size={16} />, 0.5)}
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </motion.div>
              </Collapse>
            </>
          )}
        </Paper>
      </GlassPanel>
    );
  };

  return (
    <PageTransition mode="fade">
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          {/* 页面标题 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                mb: 3
              }}
            >
              {t('education.title')}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              sx={{
                textAlign: 'center',
                fontWeight: 'medium',
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                mb: 8,
                lineHeight: 1.8
              }}
            >
              {t('education.subtitle')}
            </Typography>
          </motion.div>

          {/* 教育经历时间线 */}
          <Timeline
            position="alternate"
            sx={{
              [`& .MuiTimelineItem-root`]: {
                minHeight: '120px',
              },
              [`& .MuiTimelineOppositeContent-root`]: {
                padding: 2,
                marginTop: 0,
                maxWidth: { xs: '180px', md: '220px' },
                width: { xs: '180px', md: '220px' },
              },
              [`& .MuiTimelineContent-root`]: {
                padding: '8px 16px',
              },
              [`& .MuiTimelineDot-root`]: {
                margin: '12px 0',
              }
            }}
          >
            {data.map((education, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{
                    m: 'auto 0',
                    alignSelf: 'flex-start',
                    pt: 2,
                    pr: { xs: 2, md: index % 2 === 0 ? 2 : 0 },
                    pl: { xs: 2, md: index % 2 === 0 ? 0 : 2 },
                    textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' }
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontWeight: 'medium',
                    }}
                  >
                    {getLocalizedText(education.displayDate)}
                  </Typography>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5, type: 'spring' }}
                  >
                    <TimelineDot
                      sx={{
                        bgcolor: index % 2 === 0 ? 'primary.main' : 'secondary.main',
                        boxShadow: 3
                      }}
                    >
                      <FiBook size={20} />
                    </TimelineDot>
                  </motion.div>
                  {index < data.length - 1 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
                      style={{ width: '100%' }}
                    >
                      <TimelineConnector />
                    </motion.div>
                  )}
                </TimelineSeparator>

                <TimelineContent
                  sx={{
                    py: 2,
                    px: { xs: 2, md: 3 }
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <EducationCard education={education} index={index} />
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default EducationPage;
