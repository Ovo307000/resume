import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { alpha } from '@mui/material/styles';
import EducationCardContent from './EducationCardContent';

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

interface SimpleTimelineProps {
  educations: Education[];
  expandedCards: string[];
  toggleCardExpansion: (id: string) => void;
  isMobile?: boolean;
}

/**
 * 简单时间线组件
 * 不依赖MUI Lab的Timeline组件，自行实现时间线效果
 */
const SimpleTimeline: React.FC<SimpleTimelineProps> = ({
  educations,
  expandedCards,
  toggleCardExpansion,
  isMobile = false
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  console.log("SimpleTimeline educations data:", educations); // 调试日志

  // 定义主色和次色
  const primaryColor = isDark ? '#7c4dff' : '#4c8cff';
  const secondaryColor = isDark ? '#fb8c00' : '#ff5722';

  // 卡片动画变体
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isMobile ? -20 : 0,
      y: !isMobile ? 20 : 0
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  // 如果没有教育数据，显示提示信息
  if (!educations || educations.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          暂无教育经历数据
        </Typography>
      </Container>
    );
  }

  // 移动端时间线
  if (isMobile) {
    return (
      <Box sx={{ position: 'relative', px: 2, py: 3 }}>
        {/* 垂直时间线 */}
        <Box
          sx={{
            position: 'absolute',
            left: '24px',
            top: 0,
            bottom: 0,
            width: '4px',
            borderRadius: '4px',
            background: `linear-gradient(180deg, ${primaryColor}, ${secondaryColor})`,
            boxShadow: `0 0 8px ${alpha(primaryColor, 0.4)}`,
            zIndex: 1
          }}
        />

        {/* 时间线项目 */}
        {educations.map((education, index) => (
          <Box
            key={`mobile-timeline-${index}`}
            sx={{
              display: 'flex',
              position: 'relative',
              mb: 4
            }}
          >
            {/* 时间点 */}
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              sx={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                bgcolor: primaryColor,
                boxShadow: `0 0 10px ${alpha(primaryColor, 0.6)}`,
                zIndex: 2,
                position: 'relative',
                left: '17px',
                flexShrink: 0,
                mt: 1
              }}
            />

            {/* 卡片内容 */}
            <Box
              component={motion.div}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              sx={{
                flex: 1,
                ml: 3,
                p: 2.5,
                borderRadius: '12px',
                bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                boxShadow: isDark
                  ? '0 8px 16px rgba(0, 0, 0, 0.15)'
                  : '0 8px 16px rgba(0, 0, 0, 0.08)',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)'}`
              }}
            >
              <EducationCardContent
                education={education}
                cardId={`mobile-${index}`}
                expandedCards={expandedCards}
                toggleCardExpansion={toggleCardExpansion}
                isTimelineView={true}
              />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  // 桌面端时间线（居中）
  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5, position: 'relative' }}>
      {/* 居中垂直时间线 */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 0,
          height: '100%',
          width: '4px',
          borderRadius: '4px',
          background: `linear-gradient(180deg, ${primaryColor}, ${secondaryColor})`,
          boxShadow: `0 0 8px ${alpha(primaryColor, 0.4)}`,
          transform: 'translateX(-50%)',
          zIndex: 1
        }}
      />

      {/* 时间线项目 */}
      {educations.map((education, index) => (
        <Box
          key={`desktop-timeline-${index}`}
          sx={{
            display: 'flex',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            justifyContent: 'center',
            position: 'relative',
            mb: 6
          }}
        >
          {/* 左侧空白或内容 */}
          <Box sx={{
            flex: 1,
            maxWidth: '400px',
            display: 'flex',
            justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
            pr: index % 2 === 0 ? 3 : 0,
            pl: index % 2 === 1 ? 3 : 0,
          }} />

          {/* 时间点 */}
          <Box
            component={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            sx={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              bgcolor: primaryColor,
              boxShadow: `0 0 12px ${alpha(primaryColor, 0.6)}`,
              zIndex: 2,
              alignSelf: 'flex-start',
              mt: 3,
              mx: 0,
              flexShrink: 0
            }}
          />

          {/* 右侧内容或空白 */}
          <Box
            component={motion.div}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            sx={{
              flex: 1,
              maxWidth: '400px',
              p: 3,
              borderRadius: '14px',
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              boxShadow: isDark
                ? '0 8px 16px rgba(0, 0, 0, 0.15)'
                : '0 8px 16px rgba(0, 0, 0, 0.08)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)'}`
            }}
          >
            <EducationCardContent
              education={education}
              cardId={`desktop-${index}`}
              expandedCards={expandedCards}
              toggleCardExpansion={toggleCardExpansion}
              isTimelineView={true}
            />
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default SimpleTimeline;
