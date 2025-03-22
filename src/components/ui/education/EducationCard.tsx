import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
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

interface EducationCardProps {
  education: Education;
  cardId: string;
  expandedCards: string[];
  toggleCardExpansion: (id: string) => void;
}

const EducationCard: React.FC<EducationCardProps> = ({
  education,
  cardId,
  expandedCards,
  toggleCardExpansion
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 卡片动画变体
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <Card
      component={motion.div}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      elevation={0}
      sx={{
        borderRadius: '12px',
        overflow: 'visible',
        bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        boxShadow: isDark
          ? '0 8px 16px rgba(0, 0, 0, 0.15)'
          : '0 8px 16px rgba(0, 0, 0, 0.08)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)'}`
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <EducationCardContent
          education={education}
          cardId={cardId}
          expandedCards={expandedCards}
          toggleCardExpansion={toggleCardExpansion}
        />
      </CardContent>
    </Card>
  );
};

export default EducationCard;
