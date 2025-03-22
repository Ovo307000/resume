import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  Tabs,
  Tab,
  Container,
  Card,
  CardContent,
  Fade,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiGrid, FiList } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import EducationTimelineMobile from './EducationTimelineMobile';
import EducationTimelineDesktop from './EducationTimelineDesktop';
import EducationCardContent from './EducationCardContent';
import educationData from '../../../data/education.json';
import { ViewList as ViewListIcon, Timeline as TimelineIcon } from '@mui/icons-material';
import SimpleTimeline from './SimpleTimeline';

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

type ViewMode = 'card' | 'timeline';

const EducationPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between('sm', 'md'));
  const isMobileScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'zh';

  // 使用教育数据
  const [educations, setEducations] = useState<Education[]>([]);

  // 视图模式切换状态
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');

  // 展开卡片状态
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  // 数据加载
  useEffect(() => {
    try {
      // 尝试加载教育数据
      if (educationData && Array.isArray(educationData)) {
        console.log("Education data loaded successfully:", educationData);

        // 按照开始时间倒序排列教育经历（最新的排在前面）
        const sortedEducations = [...educationData].sort((a, b) => {
          // 如果是在读的，优先显示
          if (a.isOngoing && !b.isOngoing) return -1;
          if (!a.isOngoing && b.isOngoing) return 1;

          // 按开始时间倒序排列
          return b.startDate.localeCompare(a.startDate);
        });

        setEducations(sortedEducations);
      } else {
        console.error("Education data is not an array:", educationData);
        // 设置一些模拟数据，确保UI能正常显示
        setEducations([
          {
            institution: "示例大学",
            area: "计算机科学",
            startDate: "2020-09",
            endDate: "2024-06",
            displayDate: { zh: "2020年9月 - 2024年6月", en: "Sep 2020 - Jun 2024" },
            description: {
              zh: "这是一个示例教育经历，用于在数据加载失败时显示。",
              en: "This is a sample education experience shown when data loading fails."
            }
          }
        ]);
      }
    } catch (error) {
      console.error("Error loading education data:", error);
      // 设置一些模拟数据
      setEducations([
        {
          institution: "示例大学",
          area: "计算机科学",
          startDate: "2020-09",
          endDate: "2024-06",
          displayDate: { zh: "2020年9月 - 2024年6月", en: "Sep 2020 - Jun 2024" },
          description: {
            zh: "这是一个示例教育经历，用于在数据加载失败时显示。",
            en: "This is a sample education experience shown when data loading fails."
          }
        }
      ]);
    }
  }, []);

  // 处理视图模式切换
  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: string | null,
  ) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  // 切换卡片展开状态
  const toggleCardExpansion = (cardId: string) => {
    if (expandedCards.includes(cardId)) {
      setExpandedCards(expandedCards.filter(id => id !== cardId));
    } else {
      setExpandedCards([...expandedCards, cardId]);
    }
  };

  // 卡片视图动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20
      }
    }
  };

  return (
    <Box
      sx={{
        pt: { xs: 6, sm: 12 },
        pb: { xs: 6, sm: 8 },
        minHeight: 'calc(100vh - 64px)'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              background: isDark
                ? 'linear-gradient(90deg, #7c4dff 0%, #448aff 100%)'
                : 'linear-gradient(90deg, #5e35b1 0%, #1976d2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('education.title')}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            {t('education.subtitle')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                '&.Mui-selected': {
                  color: isDark ? '#7c4dff' : '#5e35b1',
                  bgcolor: isDark ? 'rgba(124, 77, 255, 0.08)' : 'rgba(94, 53, 177, 0.08)',
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(124, 77, 255, 0.12)' : 'rgba(94, 53, 177, 0.12)',
                  }
                },
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                }
              }
            }}
          >
            <ToggleButton value="card" aria-label="card view">
              <ViewListIcon sx={{ mr: 0.5 }} />
              {t('education.cardView')}
            </ToggleButton>
            <ToggleButton value="timeline" aria-label="timeline view">
              <TimelineIcon sx={{ mr: 0.5 }} />
              {t('education.timelineView')}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {viewMode === 'card' ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {educations.map((education, index) => (
              <Card
                key={`edu-card-${index}`}
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${
                    isDark
                      ? 'rgba(255, 255, 255, 0.06)'
                      : 'rgba(0, 0, 0, 0.03)'
                  }`,
                  boxShadow: isDark
                    ? '0 8px 20px rgba(0, 0, 0, 0.2)'
                    : '0 8px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: isDark
                      ? '0 15px 30px rgba(0, 0, 0, 0.3)'
                      : '0 15px 30px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <EducationCardContent
                    education={education}
                    cardId={`card-${index}`}
                    expandedCards={expandedCards}
                    toggleCardExpansion={toggleCardExpansion}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <SimpleTimeline
            educations={educations}
            expandedCards={expandedCards}
            toggleCardExpansion={toggleCardExpansion}
            isMobile={isMobileScreen}
          />
        )}
      </Container>
    </Box>
  );
};

export default EducationPage;
