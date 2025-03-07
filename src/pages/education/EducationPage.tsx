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
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import PageTitle from '../../components/ui/common/PageTitle';

interface Education {
  institution: string;
  area: string;
  startDate: string;
  endDate: string;
  isOngoing?: boolean;
  displayDate: {
    en: string;
    zh: string;
  };
  description?: {
    en: string;
    zh: string;
  };
  activities?: Array<{
    en: string;
    zh: string;
  }>;
  achievements?: Array<{
    en: string;
    zh: string;
  }>;
  skills?: Array<{
    en: string;
    zh: string;
  }>;
  currentFocus?: Array<{
    en: string;
    zh: string;
  }>;
  goals?: Array<{
    en: string;
    zh: string;
  }>;
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
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // 获取翻译文本
  const getLocalizedText = (item: { en: string; zh: string }) => {
    return language === 'zh' ? item.zh : item.en;
  };

  // 渲染详情列表项
  const renderListItems = (items: Array<{ en: string; zh: string }> | undefined, icon: React.ReactNode) => {
    if (!items || items.length === 0) return null;

    return (
      <List disablePadding>
        {items.map((item, idx) => (
          <ListItem key={idx} alignItems="flex-start" sx={{ px: 0, py: 0.5 }}>
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
        ))}
      </List>
    );
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 页面标题 */}
          <motion.div variants={itemVariants}>
            <PageTitle title={t('education.title')} />
          </motion.div>

          <GlassyBlobBackground
            colorSet="rainbow"
            intensity="light"
            containerSx={{
              borderRadius: '16px',
              p: 3,
              mb: 6
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                textAlign: 'center',
                fontWeight: 'medium',
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.8
              }}
            >
              我的教育经历展示了我在技术和计算机科学领域的学习轨迹。从专科的基础开始，到本科深入研究，每一段学习都为我的技术成长添砖加瓦。
            </Typography>
          </GlassyBlobBackground>

          {/* 教育经历时间线 */}
          <Timeline position="alternate">
            {data.map((education, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{
                    m: 'auto 0',
                    alignSelf: 'center',
                    flex: { xs: 0.2, md: 0.3 }
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontWeight: 'medium',
                      textAlign: { xs: 'left', md: 'right' }
                    }}
                  >
                    {language === 'zh' ? education.displayDate.zh : education.displayDate.en}
                  </Typography>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineConnector />

                  <TimelineDot
                    color="primary"
                    variant="outlined"
                    sx={{
                      my: 1,
                      borderWidth: 2,
                      p: 1
                    }}
                  >
                    <FiBook size={20} />
                  </TimelineDot>

                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent
                  sx={{
                    py: '12px',
                    px: 2
                  }}
                >
                  <GlassyBlobBackground
                    colorSet={index % 2 === 0 ? "primary" : "cool"}
                    intensity="light"
                    blobCount={3}
                    containerSx={{
                      p: 0,
                      borderRadius: '16px',
                      overflow: 'hidden'
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        bgcolor: 'transparent',
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        color="primary"
                        fontWeight="bold"
                      >
                        {education.institution}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        color="text.primary"
                      >
                        {education.area}
                      </Typography>

                      {education.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                          sx={{ mt: 1, lineHeight: 1.7 }}
                        >
                          {getLocalizedText(education.description)}
                        </Typography>
                      )}

                      {/* 标签展示 */}
                      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {education.isOngoing && (
                          <Chip
                            label={language === 'zh' ? "进行中" : "Ongoing"}
                            color="success"
                            size="small"
                            variant="outlined"
                          />
                        )}

                        {education.activities && education.activities.length > 0 && (
                          <Chip
                            icon={<FiActivity size={14} />}
                            label={language === 'zh' ? "活动经历" : "Activities"}
                            color="info"
                            size="small"
                            variant="outlined"
                          />
                        )}

                        {education.achievements && education.achievements.length > 0 && (
                          <Chip
                            icon={<FiAward size={14} />}
                            label={language === 'zh' ? "所获成就" : "Achievements"}
                            color="secondary"
                            size="small"
                            variant="outlined"
                          />
                        )}

                        {education.skills && education.skills.length > 0 && (
                          <Chip
                            icon={<FiCheckCircle size={14} />}
                            label={language === 'zh' ? "获得技能" : "Skills"}
                            color="primary"
                            size="small"
                            variant="outlined"
                          />
                        )}

                        {education.currentFocus && education.currentFocus.length > 0 && (
                          <Chip
                            icon={<FiTarget size={14} />}
                            label={language === 'zh' ? "当前关注" : "Current Focus"}
                            color="warning"
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>

                      {/* 展开/收起按钮 */}
                      {(education.activities || education.achievements || education.skills || education.currentFocus || education.goals) && (
                        <Box sx={{ mt: 2 }}>
                          <Button
                            size="small"
                            onClick={() => toggleExpand(index)}
                            endIcon={expandedItems[index] ? <FiChevronUp /> : <FiChevronDown />}
                            sx={{ textTransform: 'none' }}
                          >
                            {expandedItems[index]
                              ? (language === 'zh' ? '收起详情' : 'Hide Details')
                              : (language === 'zh' ? '查看详情' : 'View Details')}
                          </Button>
                        </Box>
                      )}

                      {/* 详细信息区域 */}
                      <Collapse in={expandedItems[index]} timeout="auto">
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          {/* 活动列表 */}
                          {education.activities && education.activities.length > 0 && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                {language === 'zh' ? '活动经历' : 'Activities'}
                              </Typography>
                              {renderListItems(education.activities, <FiActivity size={18} color="#3B82F6" />)}
                            </Grid>
                          )}

                          {/* 成就列表 */}
                          {education.achievements && education.achievements.length > 0 && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                {language === 'zh' ? '所获成就' : 'Achievements'}
                              </Typography>
                              {renderListItems(education.achievements, <FiAward size={18} color="#8B5CF6" />)}
                            </Grid>
                          )}

                          {/* 技能列表 */}
                          {education.skills && education.skills.length > 0 && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                {language === 'zh' ? '获得技能' : 'Skills'}
                              </Typography>
                              {renderListItems(education.skills, <FiCheckCircle size={18} color="#10B981" />)}
                            </Grid>
                          )}

                          {/* 当前关注列表 */}
                          {education.currentFocus && education.currentFocus.length > 0 && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                {language === 'zh' ? '当前关注' : 'Current Focus'}
                              </Typography>
                              {renderListItems(education.currentFocus, <FiTarget size={18} color="#F59E0B" />)}
                            </Grid>
                          )}

                          {/* 目标列表 */}
                          {education.goals && education.goals.length > 0 && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                {language === 'zh' ? '学习目标' : 'Goals'}
                              </Typography>
                              {renderListItems(education.goals, <FiTarget size={18} color="#EF4444" />)}
                            </Grid>
                          )}
                        </Grid>
                      </Collapse>
                    </Paper>
                  </GlassyBlobBackground>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.div>
      </Container>
    </Box>
  );
};

export default EducationPage;
