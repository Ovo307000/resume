import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
  Typography,
  Paper,
  Tab,
  Tabs,
  ButtonGroup,
  Button,
  Chip
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import TimelineIcon from '@mui/icons-material/Timeline';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import educationData from '../../data/educationData';
import GradientBackground from '../../components/ui/background/GradientBackground';
import EducationTimelineMobile from '../../components/ui/education/EducationTimelineMobile';
import EducationTimelineDesktop from '../../components/ui/education/EducationTimelineDesktop';
import EducationCardList from '../../components/ui/education/EducationCardList';
import EducationPageTitle from '../../components/ui/education/EducationPageTitle';

// 定义视图模式类型
type ViewMode = 'timeline' | 'cards';

// 定义教育项类型
export interface LocalizedText {
  en: string;
  zh: string;
}

export interface Education {
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

/**
 * 教育经历页面
 * 重构版本: 现代化设计，支持多种视图模式
 */
const EducationPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 状态管理
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<number>(0);

  // 本地化文本处理
  const getLocalizedText = (text: LocalizedText): string => {
    return i18n.language === 'zh' ? text.zh : text.en;
  };

  // 处理视图模式变更
  const handleViewModeChange = (_event: React.MouseEvent<HTMLElement>, newMode: ViewMode | null) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // 切换卡片展开状态
  const handleToggleCardExpand = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // 处理标签页切换
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12
      }
    }
  };

  // 初始化教育项数据
  const educationItems: Education[] = educationData.map(item => ({
    institutionName: item.institutionName,
    studyType: item.studyType,
    areaOfStudy: item.areaOfStudy,
    startDate: item.startDate,
    endDate: item.endDate,
    location: item.location,
    description: item.description,
    courses: item.courses,
    activities: item.activities,
    achievements: item.achievements,
    skills: item.skills,
    currentFocus: item.currentFocus,
    goals: item.goals,
    logoUrl: item.logoUrl
  }));

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        pb: 10,
        overflow: 'hidden'
      }}
    >
      {/* 背景效果 */}
      <GradientBackground />

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 页面标题区域 */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 5, mt: 4 }}>
              <EducationPageTitle />
            </Box>
          </motion.div>

          {/* 视图切换按钮 */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 4,
                position: 'relative',
                zIndex: 5
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  p: 0.5
                }}
              >
                <ButtonGroup
                  variant="contained"
                  disableElevation
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    '& .MuiButton-root': {
                      bgcolor: 'transparent',
                      color: isDark ? 'grey.300' : 'grey.700',
                      borderColor: 'transparent',
                      '&:hover': {
                        bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      },
                      '&.Mui-selected': {
                        bgcolor: isDark ? 'primary.dark' : 'primary.light',
                        color: isDark ? 'common.white' : 'common.white',
                      }
                    }
                  }}
                >
                  <Button
                    onClick={() => setViewMode('timeline')}
                    sx={{
                      bgcolor: viewMode === 'timeline' ?
                        (isDark ? 'primary.dark' : 'primary.main') :
                        'transparent',
                      color: viewMode === 'timeline' ?
                        '#fff' :
                        (isDark ? 'grey.300' : 'grey.700'),
                      px: 3,
                      py: 1,
                      borderRadius: '8px !important',
                      ml: '2px !important',
                    }}
                    startIcon={<TimelineIcon />}
                  >
                    {!isMobile && t('education.timelineView', '时间轴视图')}
                  </Button>
                  <Button
                    onClick={() => setViewMode('cards')}
                    sx={{
                      bgcolor: viewMode === 'cards' ?
                        (isDark ? 'primary.dark' : 'primary.main') :
                        'transparent',
                      color: viewMode === 'cards' ?
                        '#fff' :
                        (isDark ? 'grey.300' : 'grey.700'),
                      px: 3,
                      py: 1,
                      borderRadius: '8px !important',
                      mr: '2px !important',
                    }}
                    startIcon={<AppsIcon />}
                  >
                    {!isMobile && t('education.cardView', '卡片视图')}
                  </Button>
                </ButtonGroup>
              </Paper>
            </Box>
          </motion.div>

          {/* 内容区域 - 动画切换不同视图 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  mb: 4,
                }}
              >
                {viewMode === 'timeline' ? (
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 4,
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      pb: 4
                    }}
                  >
                    {isMobile ? (
                      <EducationTimelineMobile educationItems={educationItems} />
                    ) : (
                      <EducationTimelineDesktop educationItems={educationItems} />
                    )}
                  </Paper>
                ) : (
                  <EducationCardList
                    educationItems={educationItems}
                    expandedCards={expandedCards}
                    onToggleExpand={handleToggleCardExpand}
                  />
                )}
              </Box>
            </motion.div>
          </AnimatePresence>

          {/* 底部信息区域 */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  color: isDark ? 'primary.light' : 'primary.dark',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <SchoolIcon sx={{ mr: 1 }} />
                {t('education.continuingEducation', '持续学习')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {t('education.continuingEducationText', '教育不仅仅是学校中的学习，更是一种终身的追求。我不断通过自学、在线课程、技术研讨会和实践项目来扩展我的知识和技能。')}
              </Typography>
              <Box sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                mt: 2
              }}>
                {['Coursera', 'Udemy', 'LeetCode', 'GitHub', 'Stack Overflow'].map((platform, index) => (
                  <Chip
                    key={index}
                    label={platform}
                    size="small"
                    sx={{
                      bgcolor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                      color: isDark ? '#a5b4fc' : '#4f46e5',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)',
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default EducationPage;
