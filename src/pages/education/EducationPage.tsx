import React from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import PageTransition from '../../components/ui/transitions/PageTransition';
import EducationTimelineItem from '../../components/ui/education/EducationTimelineItem';
import PageTitle from '../../components/ui/common/PageTitle';

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
 * 教育经历页面组件 - 优化移动端显示
 * 展示学校经历、活动、成就和技能
 */
const EducationPage: React.FC<EducationPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 检测是否为移动设备
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  return (
    <PageTransition mode="fade">
      <Box sx={{
        py: { xs: 4, sm: 6, md: 8 },
        minHeight: '100vh',
        position: 'relative'
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          {/* 页面标题 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PageTitle
              title={t('education.title', '教育经历')}
              subtitle={t('education.subtitle', '我的学习旅程和获得的技能')}
              centered
            />
          </motion.div>

          {/* 教育经历时间线 - 使用新组件 */}
          <Box
            sx={{
              position: 'relative',
              mt: { xs: 4, md: 6 },
              '&::before': !isMobile ? {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: '2px',
                backgroundColor: theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.06)',
                transform: 'translateX(-50%)',
                zIndex: 1
              } : {}
            }}
          >
            {data.map((education, index) => (
              <Box
                key={index}
                sx={{
                  mb: { xs: 3, sm: 4 },
                  '&:last-child': {
                    mb: 0
                  }
                }}
              >
                <EducationTimelineItem
                  education={education}
                  index={index}
                  isAlternate={!isMobile}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default EducationPage;
