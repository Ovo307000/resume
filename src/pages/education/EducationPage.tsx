import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import PageTransition from '../../components/ui/transitions/PageTransition';
import PageTitle from '../../components/ui/common/PageTitle';
import EducationTimelineDesktop from '../../components/ui/education/EducationTimelineDesktop';
import EducationTimelineMobile from '../../components/ui/education/EducationTimelineMobile';

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
 * 教育经历页面组件 - 使用专门的桌面和移动端组件
 * 展示学校经历、活动、成就和技能
 */
const EducationPage: React.FC<EducationPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 检测是否为移动设备 - 使用md断点以获得更好的体验
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

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
            />
          </motion.div>

          {/* 根据屏幕尺寸渲染相应的时间线组件 */}
          {isMobile ? (
            <EducationTimelineMobile educationList={data} />
          ) : (
            <EducationTimelineDesktop educationList={data} />
          )}
        </Container>
      </Box>
    </PageTransition>
  );
};

export default EducationPage;
