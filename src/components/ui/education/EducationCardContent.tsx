import React from 'react';
import { Box, Typography, Button, Collapse, Chip, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

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

interface EducationCardContentProps {
  education: Education;
  cardId: string;
  expandedCards: string[];
  toggleCardExpansion: (id: string) => void;
  isTimelineView?: boolean;
}

/**
 * 教育卡片内容组件
 * 用于展示教育信息的详细内容，包括展开/收起功能
 */
const EducationCardContent: React.FC<EducationCardContentProps> = ({
  education,
  cardId,
  expandedCards,
  toggleCardExpansion,
  isTimelineView = false
}) => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentLanguage = i18n.language;
  const isExpanded = expandedCards.includes(cardId);

  // 本地化文本获取函数
  const getLocalizedText = (text: LocalizedText | undefined) => {
    if (!text) return '';
    return currentLanguage === 'zh' ? text.zh : text.en;
  };

  // 本地化文本数组获取函数
  const getLocalizedArray = (array: LocalizedText[] | undefined) => {
    if (!array || array.length === 0) return [];
    return array.map(item => getLocalizedText(item));
  };

  return (
    <Box>
      {/* 学校名称 */}
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontWeight: 'bold',
          color: isDark ? '#bb86fc' : '#673ab7',
          pb: 0.5
        }}
      >
        {education.institution}
      </Typography>

      {/* 专业和时间 */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mb: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            color: isDark ? 'primary.light' : 'primary.dark'
          }}
        >
          {education.area}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
            fontStyle: 'italic',
            mt: 0.5
          }}
        >
          {getLocalizedText(education.displayDate)}
        </Typography>
      </Box>

      {/* 描述 */}
      {education.description && (
        <Typography variant="body2" sx={{ mt: 1, mb: 1.5, lineHeight: 1.6 }}>
          {getLocalizedText(education.description)}
        </Typography>
      )}

      {/* 展开/收起按钮 */}
      <Button
        onClick={() => toggleCardExpansion(cardId)}
        endIcon={isExpanded ? <ExpandLess /> : <ExpandMore />}
        sx={{
          textTransform: 'none',
          mt: 1,
          color: isDark ? '#bb86fc' : '#673ab7',
          '&:hover': {
            backgroundColor: isDark ? 'rgba(187, 134, 252, 0.08)' : 'rgba(103, 58, 183, 0.08)',
          },
          position: 'relative',
          zIndex: 10, // 确保按钮在最上层
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {isExpanded ? '收起' : '了解更多'}
      </Button>

      {/* 额外内容（可折叠） */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2 }}>
          {/* 活动 */}
          {education.activities && education.activities.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                活动
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                {getLocalizedArray(education.activities).map((activity, index) => (
                  <Typography key={index} component="li" variant="body2" sx={{ mb: 0.5 }}>
                    {activity}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}

          {/* 成就 */}
          {education.achievements && education.achievements.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                成就
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                {getLocalizedArray(education.achievements).map((achievement, index) => (
                  <Typography key={index} component="li" variant="body2" sx={{ mb: 0.5 }}>
                    {achievement}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}

          {/* 技能 */}
          {education.skills && education.skills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                技能
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {getLocalizedArray(education.skills).map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    sx={{
                      bgcolor: isDark ? 'rgba(187, 134, 252, 0.1)' : 'rgba(103, 58, 183, 0.1)',
                      color: isDark ? '#bb86fc' : '#673ab7',
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* 当前专注 */}
          {education.currentFocus && education.currentFocus.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                当前专注
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                {getLocalizedArray(education.currentFocus).map((focus, index) => (
                  <Typography key={index} component="li" variant="body2" sx={{ mb: 0.5 }}>
                    {focus}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}

          {/* 目标 */}
          {education.goals && education.goals.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                目标
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                {getLocalizedArray(education.goals).map((goal, index) => (
                  <Typography key={index} component="li" variant="body2" sx={{ mb: 0.5 }}>
                    {goal}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default EducationCardContent;
