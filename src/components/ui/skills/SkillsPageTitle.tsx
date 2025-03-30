import React from 'react';
import { Box, Typography, alpha, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SkillsPageTitleProps {
  withAnimation?: boolean;
}

/**
 * 技能页面标题组件
 * 展示带有动画效果的技能页面标题
 */
const SkillsPageTitle: React.FC<SkillsPageTitleProps> = ({ withAnimation = true }) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const titleComponent = (
    <>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          textAlign: { xs: 'center', md: 'left' },
          background: isDark
            ? 'linear-gradient(90deg, #9c7aff 0%, #6a98ff 100%)'
            : 'linear-gradient(90deg, #5e35b1 0%, #1976d2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
          letterSpacing: '0.5px'
        }}
      >
        {t('skills.pageTitle', '专业技能')}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          color: isDark ? alpha('#fff', 0.7) : alpha('#000', 0.7),
          maxWidth: '700px',
          mb: 3
        }}
      >
        {t('skills.pageSubtitle', '我的专业技术能力和熟练度概览，包括编程语言、框架和工具等')}
      </Typography>
    </>
  );

  if (!withAnimation) {
    return (
      <Box sx={{ mb: 4 }}>
        {titleComponent}
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          {titleComponent}
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default SkillsPageTitle;
