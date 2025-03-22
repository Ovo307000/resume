import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
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

interface EducationTimelineDesktopProps {
  educations?: Education[];
  expandedCards?: string[];
  toggleCardExpansion?: (id: string) => void;
}

/**
 * 桌面端教育时间线组件
 * 使用 MUI Timeline 组件展示教育经历，采用居中布局
 */
const EducationTimelineDesktop: React.FC<EducationTimelineDesktopProps> = ({
  educations = [],
  expandedCards = [],
  toggleCardExpansion = () => {}
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  console.log("Desktop timeline educations data:", educations); // 调试日志

  // 定义主色和次色
  const primaryColor = isDark ? '#7c4dff' : '#4c8cff';
  const secondaryColor = isDark ? '#fb8c00' : '#ff5722';

  // 卡片动画变体
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: (index: number) => index % 2 === 0 ? -20 : 20
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  // 时间点动画变体
  const dotVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 300
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

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Timeline position="alternate" sx={{ p: 0 }}>
        {educations.map((education, index) => (
          <TimelineItem
            key={`timeline-desktop-${index}`}
            sx={{
              minHeight: 'auto',
              mb: 4
            }}
          >
            {/* 左侧内容区域（偶数项） */}
            <TimelineOppositeContent
              sx={{
                m: 'auto 0',
                px: { md: 2, lg: 4 },
                maxWidth: { md: '350px', lg: '400px' }
              }}
              align={index % 2 === 0 ? 'right' : 'left'}
            >
              {index % 2 === 0 && (
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover={{
                    y: -5,
                    boxShadow: isDark
                      ? '0 12px 20px rgba(0, 0, 0, 0.2)'
                      : '0 12px 18px rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    sx={{
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
                </motion.div>
              )}
            </TimelineOppositeContent>

            {/* 中间时间线 */}
            <TimelineSeparator>
              <motion.div
                variants={dotVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <TimelineDot
                  sx={{
                    bgcolor: primaryColor,
                    boxShadow: `0 0 10px ${alpha(primaryColor, 0.5)}`,
                    my: 0.5,
                    width: 16,
                    height: 16,
                    border: 'none',
                    zIndex: 2
                  }}
                />
              </motion.div>

              {index < educations.length - 1 && (
                <TimelineConnector
                  sx={{
                    minHeight: '120px',
                    width: 3,
                    background: `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                    boxShadow: `0 0 6px ${alpha(primaryColor, 0.3)}`,
                    opacity: 0.9
                  }}
                />
              )}
            </TimelineSeparator>

            {/* 右侧内容区域（奇数项） */}
            <TimelineContent
              sx={{
                m: 'auto 0',
                px: { md: 2, lg: 4 },
                maxWidth: { md: '350px', lg: '400px' }
              }}
            >
              {index % 2 !== 0 && (
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover={{
                    y: -5,
                    boxShadow: isDark
                      ? '0 12px 20px rgba(0, 0, 0, 0.2)'
                      : '0 12px 18px rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    sx={{
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
                </motion.div>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
};

export default EducationTimelineDesktop;
