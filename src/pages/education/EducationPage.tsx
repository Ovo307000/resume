import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Chip,
  Grid,
  Tooltip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaceIcon from '@mui/icons-material/Place';
import CodeIcon from '@mui/icons-material/Code';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArticleIcon from '@mui/icons-material/Article';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FlagIcon from '@mui/icons-material/Flag';
import { useTranslation } from 'react-i18next';
import educationData from '../../data/educationData';
import { useSwipeable } from 'react-swipeable';
import EnhancedPageTitle from '../../components/ui/common/EnhancedPageTitle';
import TechnologyTag from '../../components/ui/projects/TechnologyTag';

// 本地化文本接口
export interface LocalizedText {
  en: string;
  zh: string;
}

// 教育项接口
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

// 组件属性接口
interface EducationPageProps {
  data?: any; // 接收传入的数据，使用any类型暂时绕过类型检查
}

/**
 * 全新设计：教育页面
 * 采用卡片布局、左右滑动导航和动态效果
 */
const EducationPage: React.FC<EducationPageProps> = ({ data }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 状态管理
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: 向左, 0: 初始, 1: 向右
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 处理教育项的导航
  const handlePrevious = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setDirection(-1);
    setCurrentIndex(prev =>
      prev === 0 ? educationItems.length - 1 : prev - 1
    );

    setTimeout(() => {
      setIsTransitioning(false);
      setDirection(0);
    }, 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setDirection(1);
    setCurrentIndex(prev =>
      prev === educationItems.length - 1 ? 0 : prev + 1
    );

    setTimeout(() => {
      setIsTransitioning(false);
      setDirection(0);
    }, 500);
  };

  // 设置滑动手势处理
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    trackMouse: false
  });

  // 本地化文本处理
  const getLocalizedText = (text: LocalizedText): string => {
    switch (i18n.language) {
      case 'zh':
        return text.zh;
      case 'en':
        return text.en;
      default:
        return text.zh;
    }
  };

  // 格式化日期显示
  const formatDate = (date: Date | null): string => {
    if (!date) return t('education.present', '至今');

    return `${date.getFullYear()}.${date.getMonth() + 1}`;
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

  // 获取当前展示的教育项
  const currentEducation = educationItems[currentIndex];

  // 渲染教育项头部
  const renderEducationHeader = () => {
    if (!currentEducation) return null;

    return (
      <Box sx={{
        textAlign: 'center',
        mb: 4,
        position: 'relative',
        p: 3,
        borderRadius: 4,
        background: isDark
          ? 'rgba(17, 25, 40, 0.55)'
          : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(16px)',
        border: '1px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)',
        boxShadow: isDark
          ? '0 0 20px rgba(79, 70, 229, 0.3), 0 0 40px rgba(79, 70, 229, 0.15)'
          : '0 0 20px rgba(79, 70, 229, 0.15), 0 0 40px rgba(79, 70, 229, 0.08)',
      }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: isDark
              ? 'linear-gradient(to right, #a5b4fc, #ffffff)'
              : 'linear-gradient(to right, #4f46e5, #1e293b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: isDark ? '0 0 15px rgba(165, 180, 252, 0.4)' : '0 0 15px rgba(79, 70, 229, 0.2)',
          }}
        >
          {getLocalizedText(currentEducation.institutionName)}
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 600, mb: 2 }}
        >
          {getLocalizedText(currentEducation.areaOfStudy)}
        </Typography>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
          mb: 3
        }}>
          <Chip
            icon={<SchoolIcon />}
            label={getLocalizedText(currentEducation.studyType)}
            sx={{ fontWeight: 500 }}
            color="primary"
            variant="outlined"
          />

          <Chip
            icon={<CalendarTodayIcon />}
            label={`${formatDate(currentEducation.startDate)} - ${formatDate(currentEducation.endDate)}`}
            sx={{ fontWeight: 500 }}
            variant="outlined"
          />

          <Chip
            icon={<PlaceIcon />}
            label={getLocalizedText(currentEducation.location)}
            sx={{ fontWeight: 500 }}
            variant="outlined"
          />

          {currentEducation.endDate === null && (
            <Chip
              label={t('education.current', '在读')}
              color="success"
              sx={{ fontWeight: 600 }}
            />
          )}
        </Box>

        <Typography
          variant="body1"
          sx={{
            fontSize: '1rem',
            color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          {getLocalizedText(currentEducation.description)}
        </Typography>
      </Box>
    );
  };

  // 渲染课程卡片
  const renderCoursesCard = () => {
    if (!currentEducation || !currentEducation.courses.length) return null;

    return (
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            height: '100%',
            overflow: 'hidden',
            background: isDark
              ? 'rgba(17, 25, 40, 0.5)'
              : 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(16px)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
            boxShadow: isDark
              ? '0 0 15px rgba(59, 130, 246, 0.3)'
              : '0 0 15px rgba(59, 130, 246, 0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: isDark
                ? '0 0 25px rgba(59, 130, 246, 0.4)'
                : '0 0 25px rgba(59, 130, 246, 0.2)',
            }
          }}
        >
          <Box sx={{
            p: 2,
            bgcolor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderBottom: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          }}>
            <ArticleIcon sx={{
              color: isDark ? '#93C5FD' : '#3B82F6',
              filter: isDark ? 'drop-shadow(0 0 5px rgba(147, 197, 253, 0.5))' : 'none',
            }} />
            <Typography variant="h6" fontWeight={600} sx={{ color: isDark ? '#93C5FD' : '#3B82F6' }}>
              {t('education.courses', '相关课程')}
              <Typography component="span" variant="caption" sx={{ ml: 1, color: isDark ? '#CBD5E1' : '#64748B' }}>
                {currentEducation.courses.length}
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ p: 2, maxHeight: '250px', overflowY: 'auto' }}>
            <List dense disablePadding>
              {currentEducation.courses.map((course, index) => (
                <ListItem key={index} sx={{ py: 0.75 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: isDark ? '#93C5FD' : '#3B82F6', fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={getLocalizedText(course)}
                    primaryTypographyProps={{
                      variant: 'body2',
                      sx: { color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)' }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Grid>
    );
  };

  // 渲染技能卡片
  const renderSkillsCard = () => {
    if (!currentEducation || !currentEducation.skills.length) return null;

    return (
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            height: '100%',
            overflow: 'hidden',
            background: isDark
              ? 'rgba(17, 25, 40, 0.5)'
              : 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(16px)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
            boxShadow: isDark
              ? '0 0 15px rgba(16, 185, 129, 0.3)'
              : '0 0 15px rgba(16, 185, 129, 0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: isDark
                ? '0 0 25px rgba(16, 185, 129, 0.4)'
                : '0 0 25px rgba(16, 185, 129, 0.2)',
            }
          }}
        >
          <Box sx={{
            p: 2,
            bgcolor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderBottom: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          }}>
            <CodeIcon sx={{
              color: isDark ? '#6EE7B7' : '#059669',
              filter: isDark ? 'drop-shadow(0 0 5px rgba(110, 231, 183, 0.5))' : 'none',
            }} />
            <Typography variant="h6" fontWeight={600} sx={{ color: isDark ? '#6EE7B7' : '#059669' }}>
              {t('education.skills', '掌握技能')}
              <Typography component="span" variant="caption" sx={{ ml: 1, color: isDark ? '#CBD5E1' : '#64748B' }}>
                {currentEducation.skills.length}
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {currentEducation.skills.map((skill, index) => (
                <TechnologyTag
                  key={index}
                  name={getLocalizedText(skill)}
                  size="small"
                  index={index}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </Grid>
    );
  };

  // 渲染成就卡片
  const renderAchievementsCard = () => {
    if (!currentEducation || !currentEducation.achievements.length) return null;

    return (
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            height: '100%',
            overflow: 'hidden',
            background: isDark
              ? 'rgba(17, 25, 40, 0.5)'
              : 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(16px)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
            boxShadow: isDark
              ? '0 0 15px rgba(245, 158, 11, 0.3)'
              : '0 0 15px rgba(245, 158, 11, 0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: isDark
                ? '0 0 25px rgba(245, 158, 11, 0.4)'
                : '0 0 25px rgba(245, 158, 11, 0.2)',
            }
          }}
        >
          <Box sx={{
            p: 2,
            bgcolor: isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderBottom: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          }}>
            <EmojiEventsIcon sx={{
              color: isDark ? '#FCD34D' : '#B45309',
              filter: isDark ? 'drop-shadow(0 0 5px rgba(252, 211, 77, 0.5))' : 'none',
            }} />
            <Typography variant="h6" fontWeight={600} sx={{ color: isDark ? '#FCD34D' : '#B45309' }}>
              {t('education.achievements', '成就与奖项')}
              <Typography component="span" variant="caption" sx={{ ml: 1, color: isDark ? '#CBD5E1' : '#64748B' }}>
                {currentEducation.achievements.length}
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ p: 2, maxHeight: '250px', overflowY: 'auto' }}>
            <List dense disablePadding>
              {currentEducation.achievements.map((achievement, index) => (
                <ListItem key={index} sx={{ py: 0.75 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <LightbulbIcon sx={{ color: isDark ? '#FCD34D' : '#B45309', fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={getLocalizedText(achievement)}
                    primaryTypographyProps={{
                      variant: 'body2',
                      sx: { color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)' }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Grid>
    );
  };

  // 渲染活动卡片
  const renderActivitiesCard = () => {
    if (!currentEducation || !currentEducation.activities.length) return null;

    return (
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            height: '100%',
            overflow: 'hidden',
            background: isDark
              ? 'rgba(17, 25, 40, 0.5)'
              : 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(16px)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
            boxShadow: isDark
              ? '0 0 15px rgba(236, 72, 153, 0.3)'
              : '0 0 15px rgba(236, 72, 153, 0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: isDark
                ? '0 0 25px rgba(236, 72, 153, 0.4)'
                : '0 0 25px rgba(236, 72, 153, 0.2)',
            }
          }}
        >
          <Box sx={{
            p: 2,
            bgcolor: isDark ? 'rgba(236, 72, 153, 0.2)' : 'rgba(236, 72, 153, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderBottom: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          }}>
            <PeopleIcon sx={{
              color: isDark ? '#F9A8D4' : '#BE185D',
              filter: isDark ? 'drop-shadow(0 0 5px rgba(249, 168, 212, 0.5))' : 'none',
            }} />
            <Typography variant="h6" fontWeight={600} sx={{ color: isDark ? '#F9A8D4' : '#BE185D' }}>
              {t('education.activities', '活动经历')}
              <Typography component="span" variant="caption" sx={{ ml: 1, color: isDark ? '#CBD5E1' : '#64748B' }}>
                {currentEducation.activities.length}
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ p: 2, maxHeight: '250px', overflowY: 'auto' }}>
            <List dense disablePadding>
              {currentEducation.activities.map((activity, index) => (
                <ListItem key={index} sx={{ py: 0.75 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <FlagIcon sx={{ color: isDark ? '#F9A8D4' : '#BE185D', fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={getLocalizedText(activity)}
                    primaryTypographyProps={{
                      variant: 'body2',
                      sx: { color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)' }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Grid>
    );
  };

  // 教育卡片导航控制
  const renderNavigation = () => {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        my: 2
      }}>
        <Tooltip title={t('education.previous', '上一个')}>
          <IconButton
            onClick={handlePrevious}
            disabled={isTransitioning}
            sx={{
              bgcolor: isDark ? 'rgba(17, 25, 40, 0.5)' : 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(8px)',
              color: isDark ? 'white' : 'primary.main',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
              boxShadow: isDark ? '0 0 10px rgba(79, 70, 229, 0.3)' : '0 0 10px rgba(79, 70, 229, 0.15)',
              '&:hover': {
                bgcolor: isDark ? 'rgba(17, 25, 40, 0.6)' : 'rgba(255, 255, 255, 0.5)',
                boxShadow: isDark ? '0 0 15px rgba(79, 70, 229, 0.4)' : '0 0 15px rgba(79, 70, 229, 0.2)',
              }
            }}
          >
            <ArrowBackIosNewIcon sx={{
              filter: isDark ? 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))' : 'none',
            }} />
          </IconButton>
        </Tooltip>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 10,
            bgcolor: isDark ? 'rgba(17, 25, 40, 0.5)' : 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
            boxShadow: isDark ? '0 0 5px rgba(79, 70, 229, 0.2)' : '0 0 5px rgba(79, 70, 229, 0.1)',
          }}
        >
          {currentIndex + 1} / {educationItems.length}
        </Typography>

        <Tooltip title={t('education.next', '下一个')}>
          <IconButton
            onClick={handleNext}
            disabled={isTransitioning}
            sx={{
              bgcolor: isDark ? 'rgba(17, 25, 40, 0.5)' : 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(8px)',
              color: isDark ? 'white' : 'primary.main',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
              boxShadow: isDark ? '0 0 10px rgba(79, 70, 229, 0.3)' : '0 0 10px rgba(79, 70, 229, 0.15)',
              '&:hover': {
                bgcolor: isDark ? 'rgba(17, 25, 40, 0.6)' : 'rgba(255, 255, 255, 0.5)',
                boxShadow: isDark ? '0 0 15px rgba(79, 70, 229, 0.4)' : '0 0 15px rgba(79, 70, 229, 0.2)',
              }
            }}
          >
            <ArrowForwardIosIcon sx={{
              filter: isDark ? 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))' : 'none',
            }} />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  // 主页面渲染
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        pt: 4,
        pb: 10,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Re-added EnhancedPageTitle component */}
        <EnhancedPageTitle
          title={t('education.title', '教育经历')}
          subtitle={t('education.subtitle', '我的学术背景以及学习经历')}
          textAlign="center"
          withAnimation={true}
        />

        {/* 主要内容区域 */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            {renderNavigation()}

            <div {...swipeHandlers}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{
                    opacity: 0,
                    x: direction === 1 ? 100 : direction === -1 ? -100 : 0
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: direction === 1 ? -100 : direction === -1 ? 100 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {renderEducationHeader()}

                  <Grid container spacing={3}>
                    {renderCoursesCard()}
                    {renderSkillsCard()}
                    {renderAchievementsCard()}
                    {renderActivitiesCard()}
                  </Grid>
                </motion.div>
              </AnimatePresence>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EducationPage;
