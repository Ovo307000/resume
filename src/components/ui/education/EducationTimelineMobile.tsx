import React from 'react';
import { Box, useMediaQuery, useTheme as useMuiTheme, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
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

interface EducationTimelineMobileProps {
  educations?: Education[];
  expandedCards?: string[];
  toggleCardExpansion?: (id: string) => void;
}

/**
 * 移动端教育时间线组件
 * 使用 MUI Timeline 组件展示教育经历
 */
const EducationTimelineMobile: React.FC<EducationTimelineMobileProps> = ({
  educations = [],
  expandedCards = [],
  toggleCardExpansion = () => {}
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  console.log("Mobile timeline educations data:", educations); // 调试日志

  // 定义主色和次色
  const primaryColor = isDark ? '#7c4dff' : '#4c8cff';
  const secondaryColor = isDark ? '#fb8c00' : '#ff5722';

  // 卡片动画变体
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -20
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
      <Box sx={{ textAlign: 'center', mt: 4, px: 2 }}>
        <Typography variant="body1" color="text.secondary">
          暂无教育经历数据
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        pb: 2,
        pl: { xs: 0, sm: 2 }
      }}
    >
      <Timeline position="right" sx={{ p: 0, m: 0 }}>
        {educations.map((education, index) => (
          <TimelineItem
            key={`timeline-mobile-${index}`}
            sx={{
              minHeight: 'auto',
              '&:before': {
                display: 'none'  // 隐藏左侧空间
              }
            }}
          >
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
                    width: 14,
                    height: 14,
                    border: 'none'
                  }}
                />
              </motion.div>

              {index < educations.length - 1 && (
                <TimelineConnector
                  sx={{
                    minHeight: '80px',
                    width: 3,
                    background: `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                    boxShadow: `0 0 6px ${alpha(primaryColor, 0.3)}`
                  }}
                />
              )}
            </TimelineSeparator>

            <TimelineContent
              sx={{
                p: 0,
                pl: 2,
                pb: 4,
                pr: { xs: 1, sm: 2 }
              }}
            >
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{
                  y: -3,
                  boxShadow: isDark
                    ? '0 12px 20px rgba(0, 0, 0, 0.2)'
                    : '0 12px 18px rgba(0, 0, 0, 0.1)'
                }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  sx={{
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
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default EducationTimelineMobile;
