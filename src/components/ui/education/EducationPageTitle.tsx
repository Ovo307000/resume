import React from 'react';
import { Box, Typography, Grid, useMediaQuery, Paper, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaBook, FaLaptopCode, FaLightbulb, FaUniversity } from 'react-icons/fa';

/**
 * 教育页面标题组件
 * 现代化设计，丰富的动画和视觉效果
 */
const EducationPageTitle: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  // 容器动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // 文本动画变体
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  // 图标动画变体
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    }
  };

  // 装饰元素配置
  const decorElements = [
    { icon: <FaGraduationCap />, color: '#6366f1', delay: 0.1 },
    { icon: <FaBook />, color: '#ec4899', delay: 0.2 },
    { icon: <FaLaptopCode />, color: '#10b981', delay: 0.3 },
    { icon: <FaLightbulb />, color: '#f59e0b', delay: 0.4 },
    { icon: <FaUniversity />, color: '#3b82f6', delay: 0.5 }
  ];

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        mb: { xs: 4, md: 6 }
      }}
    >
      {/* 主标题区域 */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <motion.div
              variants={iconVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Box
                sx={{
                  width: { xs: 60, md: 80 },
                  height: { xs: 60, md: 80 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: 30, md: 40 },
                  color: 'white',
                  background: `linear-gradient(135deg, ${isDark ? '#6366f1' : '#4f46e5'} 0%, ${isDark ? '#3b82f6' : '#2563eb'} 100%)`,
                  boxShadow: `0 10px 20px ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
                  border: '4px solid',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                }}
              >
                <FaGraduationCap />
              </Box>
            </motion.div>

            <motion.div variants={titleVariants}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  background: isDark
                    ? 'linear-gradient(to right, #6366f1, #3b82f6)'
                    : 'linear-gradient(to right, #4f46e5, #2563eb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: isDark
                    ? '0 2px 10px rgba(99, 102, 241, 0.3)'
                    : '0 2px 10px rgba(79, 70, 229, 0.2)',
                  letterSpacing: '-0.5px',
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                {t('education.title', '教育经历')}
              </Typography>
            </motion.div>
          </Box>
        </Grid>
      </Grid>

      {/* 副标题区域 */}
      <motion.div variants={titleVariants}>
        <Paper
          elevation={0}
          sx={{
            maxWidth: { xs: '90%', md: '70%' },
            mx: 'auto',
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(to right,
                ${isDark ? '#6366f1' : '#4f46e5'},
                ${isDark ? '#3b82f6' : '#2563eb'},
                ${isDark ? '#ec4899' : '#db2777'})`,
            }
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              color: isDark ? 'grey.300' : 'grey.700',
              lineHeight: 1.6,
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}
          >
            {t('education.subtitle', '我的学术背景和持续学习')}
          </Typography>
        </Paper>
      </motion.div>

      {/* 装饰元素 */}
      {!isMobile && (
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-around',
            zIndex: -1,
          }}
        >
          {decorElements.map((elem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 0.5,
                y: 0,
                transition: {
                  delay: elem.delay,
                  duration: 0.5
                }
              }}
              style={{
                color: elem.color,
                fontSize: 20 + Math.random() * 10,
                opacity: isDark ? 0.3 : 0.2,
                transform: `rotate(${-10 + Math.random() * 20}deg)`,
              }}
            >
              {elem.icon}
            </motion.div>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EducationPageTitle;
