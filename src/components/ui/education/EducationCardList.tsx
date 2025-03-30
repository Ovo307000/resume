import React from 'react';
import { Grid, Box, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import EducationCard from './EducationCard';
import { useTheme } from '../../../contexts/ThemeContext';

// 本地化文本接口
interface LocalizedText {
  en: string;
  zh: string;
}

// 教育项接口
interface Education {
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
interface EducationCardListProps {
  educationItems: Education[];
  expandedCards: Record<number, boolean>;
  onToggleExpand: (index: number) => void;
}

/**
 * 教育卡片列表组件
 * 现代化网格布局，支持响应式设计和动画效果
 */
const EducationCardList: React.FC<EducationCardListProps> = ({
  educationItems,
  expandedCards,
  onToggleExpand
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 容器动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // 网格布局动画效果
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: `linear-gradient(180deg,
            ${isDark ? alpha('#6366f1', 0.1) : alpha('#4f46e5', 0.05)} 0%,
            transparent 100%)`,
          borderRadius: '16px 16px 0 0',
          zIndex: -1,
        }
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid
          container
          spacing={3}
          component={motion.div}
          variants={gridVariants}
          sx={{
            px: { xs: 1, sm: 2 },
            py: 3
          }}
        >
          {educationItems.map((education, index) => (
            <EducationCard
              key={index}
              education={education}
              isExpanded={expandedCards[index] || false}
              onToggleExpand={() => onToggleExpand(index)}
              index={index}
            />
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default EducationCardList;
