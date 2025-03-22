import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  useMediaQuery,
  useTheme as useMuiTheme,
  Typography,
  alpha,
  Button
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import PageTransition from '../../components/ui/transitions/PageTransition';
import EducationTimelineDesktop from '../../components/ui/education/EducationTimelineDesktop';
import EducationTimelineMobile from '../../components/ui/education/EducationTimelineMobile';
import EducationPageTitle from '../../components/ui/education/EducationPageTitle';

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

// 动画变体定义
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

/**
 * 教育页面组件
 * 显示教育经历和课程学习
 */
const EducationPage: React.FC<EducationPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [viewMode, setViewMode] = useState<'timeline' | 'cards'>('timeline');

  // 添加折叠卡片状态管理
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  // 切换卡片展开/收起状态的函数
  const toggleCardExpansion = (cardId: string) => {
    if (expandedCards.includes(cardId)) {
      setExpandedCards(expandedCards.filter(id => id !== cardId));
    } else {
      setExpandedCards([...expandedCards, cardId]);
    }
  };

  // 获取主色调和背景
  const primaryColor = isDark ? '#7c4dff' : '#4c8cff';
  const secondaryColor = isDark ? '#fb8c00' : '#ff5722';
  const bgGradient = isDark
    ? 'radial-gradient(circle at 80% 50%, rgba(124, 77, 255, 0.08) 0%, rgba(0, 0, 0, 0) 50%)'
    : 'radial-gradient(circle at 80% 50%, rgba(76, 140, 255, 0.08) 0%, rgba(255, 255, 255, 0) 50%)';

  return (
    <PageTransition>
      <Box sx={{
        position: 'relative',
        minHeight: '100vh',
        py: { xs: 4, md: 5 },
        background: bgGradient,
      }}>
        {/* 装饰元素 - 背景图形 */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5, duration: 1 }}
          sx={{
            position: 'absolute',
            top: '15%',
            left: '-5%',
            width: '25rem',
            height: '25rem',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(primaryColor, 0.1)} 0%, ${alpha(primaryColor, 0)} 70%)`,
            filter: 'blur(40px)',
            zIndex: 0
          }}
        />

        {/* 装饰元素 - 圆点图案 */}
        <Box
          component={motion.div}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: { xs: '10rem', md: '20rem' },
            height: { xs: '10rem', md: '20rem' },
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(secondaryColor, 0.1)} 0%, ${alpha(secondaryColor, 0)} 70%)`,
            filter: 'blur(30px)',
            zIndex: 0
          }}
        />

        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 页面标题 - 使用专用标题组件 */}
            <motion.div variants={itemVariants}>
              <EducationPageTitle withAnimation={false} />
            </motion.div>

            {/* 视图切换按钮 */}
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
                <Button
                  variant={viewMode === 'timeline' ? 'contained' : 'outlined'}
                  onClick={() => setViewMode('timeline')}
                  sx={{
                    mr: 1,
                    borderRadius: '50px',
                    px: 3
                  }}
                  color={theme === 'dark' ? 'secondary' : 'primary'}
                >
                  {t('education.timelineView', '时间轴视图')}
                </Button>
                <Button
                  variant={viewMode === 'cards' ? 'contained' : 'outlined'}
                  onClick={() => setViewMode('cards')}
                  sx={{
                    ml: 1,
                    borderRadius: '50px',
                    px: 3
                  }}
                  color={theme === 'dark' ? 'secondary' : 'primary'}
                >
                  {t('education.cardsView', '卡片视图')}
                </Button>
              </Box>
            </motion.div>

            {/* 教育经历内容 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === 'timeline' ? (
                  // 时间线视图
                  isMobile ? (
                    <EducationTimelineMobile
                      educations={data}
                      expandedCards={expandedCards}
                      toggleCardExpansion={toggleCardExpansion}
                    />
                  ) : (
                    <EducationTimelineDesktop
                      educations={data}
                      expandedCards={expandedCards}
                      toggleCardExpansion={toggleCardExpansion}
                    />
                  )
                ) : (
                  // 卡片视图 - 以后实现
                  <Typography variant="body1" color="text.secondary" align="center">
                    卡片视图正在开发中...
                  </Typography>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default EducationPage;
