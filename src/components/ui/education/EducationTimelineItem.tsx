import React, { useState } from 'react';
import { Box, Typography, Paper, Chip, List, ListItem, ListItemText, useTheme as useMuiTheme, useMediaQuery, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiCalendar, FiAward, FiActivity, FiCode, FiTarget, FiBookOpen, FiChevronDown, FiChevronUp } from 'react-icons/fi';

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

interface EducationTimelineItemProps {
  education: Education;
  index: number;
  isAlternate: boolean;
}

/**
 * 现代化教育经历时间线项目组件
 * 展示学校、专业、日期等信息，支持交替布局
 * 添加卡片展开/收起功能和流畅过渡动画
 */
const EducationTimelineItem: React.FC<EducationTimelineItemProps> = ({
  education,
  index,
  isAlternate
}) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';
  const isEven = index % 2 === 0;
  const language = i18n.language as keyof LocalizedText;
  const fallbackLanguage: keyof LocalizedText = 'en';

  // 添加展开/折叠状态
  const [isExpanded, setIsExpanded] = useState(false);

  // 修正移动设备问题 - 移到顶部来确保在所有使用之前定义
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 获取本地化文本
  const getLocalizedText = (text?: LocalizedText): string => {
    if (!text) return '';
    return text[language] || text[fallbackLanguage] || '';
  };

  // 从LocalizedText数组中获取本地化文本数组
  const getLocalizedArray = (array?: LocalizedText[]): string[] => {
    if (!array) return [];
    return array.map(item => getLocalizedText(item));
  };

  // 动画变体
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      x: isAlternate ? (isEven ? -20 : 20) : 0
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  // 时间点变体
  const dotVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        delay: index * 0.1 + 0.2,
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  // 内容动画变体
  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };

  // 渲染列表项
  const renderListItems = (
    items: string[],
    icon: React.ReactNode,
    color: string
  ) => {
    if (items.length === 0) return null;

    return (
      <List disablePadding sx={{ mt: 2 }}>
        {items.map((item, idx) => (
          <ListItem
            key={idx}
            disablePadding
            alignItems="flex-start"
            sx={{ mb: 1, pl: 0 }}
          >
            <Box
              sx={{
                mr: 1.5,
                color,
                display: 'flex',
                alignItems: 'flex-start',
                pt: 0.5
              }}
            >
              {icon}
            </Box>
            <ListItemText
              primary={item}
              primaryTypographyProps={{
                variant: 'body2',
                color: 'text.primary',
                sx: { lineHeight: 1.5 }
              }}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  // 卡片样式
  const cardStyle = {
    p: { xs: 2.5, sm: 3 },
    borderRadius: 3,
    position: 'relative',
    background: isDark
      ? 'linear-gradient(145deg, rgba(30, 30, 40, 0.8), rgba(35, 35, 45, 0.8))'
      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 250, 0.9))',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
    boxShadow: isDark
      ? '0 4px 20px rgba(0, 0, 0, 0.2)'
      : '0 4px 20px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: isDark
        ? '0 6px 25px rgba(0, 0, 0, 0.3)'
        : '0 6px 25px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)'
    },
    '&::after': isAlternate && !isMobile ? {
      content: '""',
      position: 'absolute',
      top: '30px',
      width: '15px',
      height: '15px',
      background: isDark ? '#1E1E28' : '#FFFFFF',
      transform: 'rotate(45deg)',
      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
      borderTop: 'none',
      borderLeft: isEven ? 'none' : undefined,
      borderRight: isEven ? undefined : 'none',
      left: isEven ? 'auto' : '-8px',
      right: isEven ? '-8px' : 'auto',
      zIndex: 0
    } : {}
  };

  // 计算是否有详细内容可以展开
  const hasExpandableContent = (
    (education.activities && education.activities.length > 0) ||
    (education.achievements && education.achievements.length > 0) ||
    (education.skills && education.skills.length > 0) ||
    (education.currentFocus && education.currentFocus.length > 0) ||
    (education.goals && education.goals.length > 0)
  );

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: isAlternate && !isMobile ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: isAlternate && !isMobile ? undefined : 'center',
        my: { xs: 4, sm: 5, md: 6 }
      }}
    >
      {/* 桌面端时间点部分 */}
      {isAlternate && !isMobile && (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '30px',
            transform: 'translateX(-50%)',
            zIndex: 3,
          }}
        >
          <motion.div
            variants={dotVariants}
            initial="initial"
            animate="animate"
          >
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: isDark ? 'primary.main' : 'primary.main',
                border: `3px solid ${isDark ? '#1E1E28' : '#FFFFFF'}`,
                boxShadow: isDark
                  ? '0 0 0 4px rgba(99, 102, 241, 0.4)'
                  : '0 0 0 4px rgba(99, 102, 241, 0.3)'
              }}
            />
          </motion.div>
        </Box>
      )}

      {/* 移动设备时显示垂直时间轴 */}
      {!isAlternate || isMobile ? (
        <Box
          sx={{
            position: 'absolute',
            left: 24, // 精确定位，确保与时间点和主时间线完美对齐
            top: 0,
            bottom: '-20px', // 延长一点，确保连接是完整的
            width: 4, // 加粗与主时间线保持一致
            display: { xs: 'block', md: isAlternate ? 'none' : 'block' },
            backgroundColor: isDark
              ? 'rgba(124, 77, 255, 0.2)' // 使用淡紫色，更协调
              : 'rgba(76, 140, 255, 0.15)', // 使用淡蓝色，更协调
            zIndex: 0
          }}
        />
      ) : null}

      {/* 移动端时间点部分 */}
      {(!isAlternate || isMobile) && (
        <Box
          sx={{
            position: 'absolute',
            left: 24,
            top: '30px',
            transform: 'translateX(-50%)',
            zIndex: 3,
          }}
        >
          <motion.div
            variants={dotVariants}
            initial="initial"
            animate="animate"
          >
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: isDark ? 'primary.main' : 'primary.main',
                border: `3px solid ${isDark ? '#1E1E28' : '#FFFFFF'}`,
                boxShadow: isDark
                  ? '0 0 0 4px rgba(99, 102, 241, 0.4)'
                  : '0 0 0 4px rgba(99, 102, 241, 0.3)'
              }}
            />
          </motion.div>
        </Box>
      )}

      {/* 内容卡片 */}
      <Box
        sx={{
          width: isAlternate && !isMobile ? { md: '47%', lg: '44%', xl: '40%' } : '100%',
          ml: (!isAlternate || isMobile) ? { xs: 6, sm: 7 } : (isEven || isMobile) ? 0 : 'auto',
          pl: (!isAlternate || isMobile) ? 0 : (!isEven && !isMobile) ? { md: 4, lg: 6 } : 0,
          pr: (!isAlternate || isMobile) ? 0 : (isEven && !isMobile) ? { md: 4, lg: 6 } : 0,
        }}
      >
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          style={{
            position: 'relative'
          }}
        >
          <Paper
            elevation={0}
            sx={cardStyle}
            component={motion.div}
            whileHover={hasExpandableContent ? { y: -3 } : undefined}
          >
            {/* 学校和日期 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 600,
                  color: isDark ? 'primary.light' : 'primary.main',
                  mb: 0.5,
                  lineHeight: 1.3
                }}
              >
                {education.institution}
              </Typography>

              <Typography
                variant="h6"
                component="h4"
                sx={{
                  fontWeight: 500,
                  mb: 1.5,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}
              >
                {education.area}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <FiCalendar size={16} style={{ marginRight: 8, opacity: 0.8 }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {getLocalizedText(education.displayDate)}
                  </Typography>
                  {education.isOngoing && (
                    <Chip
                      label={t('education.current')}
                      size="small"
                      color="primary"
                      sx={{
                        ml: 1,
                        height: 20,
                        fontSize: '0.7rem',
                        bgcolor: isDark ? '#6366F1' : '#4F46E5'
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>

            {/* 描述 */}
            {education.description && (
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  mb: 2,
                  lineHeight: 1.7,
                  opacity: 0.9,
                  fontSize: '0.95rem'
                }}
              >
                {getLocalizedText(education.description)}
              </Typography>
            )}

            {/* 可展开的内容部分 */}
            {hasExpandableContent && (
              <>
                <Box
                  onClick={() => setIsExpanded(!isExpanded)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 2,
                    mb: isExpanded ? 1 : 0,
                    py: 0.8,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    bgcolor: isDark ? alpha('#ffffff', 0.05) : alpha('#000000', 0.03),
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: isDark ? alpha('#ffffff', 0.08) : alpha('#000000', 0.05),
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ mr: 1, fontWeight: 500 }}>
                    {isExpanded ? t('education.showLess') : t('education.showMore')}
                  </Typography>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                  </motion.div>
                </Box>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Box
                        sx={{
                          mt: 2,
                          pt: 2,
                          borderTop: `1px solid ${isDark ? alpha('#ffffff', 0.05) : alpha('#000000', 0.05)}`
                        }}
                      >
                        {/* 活动 */}
                        {renderListItems(
                          getLocalizedArray(education.activities),
                          <FiActivity size={16} />,
                          isDark ? '#F59E0B' : '#D97706'
                        )}

                        {/* 成就 */}
                        {renderListItems(
                          getLocalizedArray(education.achievements),
                          <FiAward size={16} />,
                          isDark ? '#10B981' : '#059669'
                        )}

                        {/* 技能 */}
                        {renderListItems(
                          getLocalizedArray(education.skills),
                          <FiCode size={16} />,
                          isDark ? '#8B5CF6' : '#7C3AED'
                        )}

                        {/* 当前关注 */}
                        {renderListItems(
                          getLocalizedArray(education.currentFocus),
                          <FiBookOpen size={16} />,
                          isDark ? '#EC4899' : '#DB2777'
                        )}

                        {/* 目标 */}
                        {renderListItems(
                          getLocalizedArray(education.goals),
                          <FiTarget size={16} />,
                          isDark ? '#3B82F6' : '#2563EB'
                        )}
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {/* 如果没有可展开内容，正常显示所有信息 */}
            {!hasExpandableContent && (
              <>
            {/* 活动 */}
            {renderListItems(
              getLocalizedArray(education.activities),
              <FiActivity size={16} />,
              isDark ? '#F59E0B' : '#D97706'
            )}

            {/* 成就 */}
            {renderListItems(
              getLocalizedArray(education.achievements),
              <FiAward size={16} />,
              isDark ? '#10B981' : '#059669'
            )}

            {/* 技能 */}
            {renderListItems(
              getLocalizedArray(education.skills),
              <FiCode size={16} />,
              isDark ? '#8B5CF6' : '#7C3AED'
            )}

            {/* 当前关注 */}
            {renderListItems(
              getLocalizedArray(education.currentFocus),
              <FiBookOpen size={16} />,
              isDark ? '#EC4899' : '#DB2777'
            )}

            {/* 目标 */}
            {renderListItems(
              getLocalizedArray(education.goals),
              <FiTarget size={16} />,
              isDark ? '#3B82F6' : '#2563EB'
                )}
              </>
            )}
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};

export default EducationTimelineItem;
