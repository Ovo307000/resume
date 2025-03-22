import React from 'react';
import { Box } from '@mui/material';
import EnhancedPageTitle from '../common/EnhancedPageTitle';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiBook } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface EducationPageTitleProps {
  withAnimation?: boolean;
}

/**
 * 教育页面专用标题组件
 * 使用复用的EnhancedPageTitle组件，并添加教育页面特定的样式和动画
 */
const EducationPageTitle: React.FC<EducationPageTitleProps> = ({
  withAnimation = true
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 装饰元素的动画
  const decorationVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  // 书本图标的动画
  const bookIconVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  return (
    <Box sx={{
      position: 'relative',
      mb: 5,
    }}>
      {/* 顶部装饰元素 - 左侧 */}
      <Box
        component={motion.div}
        initial={withAnimation ? "hidden" : "visible"}
        animate="visible"
        variants={decorationVariants}
        sx={{
          position: 'absolute',
          top: -15,
          left: '15%',
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          transform: 'rotate(-15deg)',
          background: isDark
            ? 'linear-gradient(135deg, #7c4dff, #b388ff)'
            : 'linear-gradient(135deg, #673ab7, #9c27b0)',
          opacity: 0.15,
          filter: 'blur(8px)',
          zIndex: 0
        }}
      />

      {/* 顶部图标 */}
      <Box
        component={motion.div}
        initial={withAnimation ? "hidden" : "visible"}
        animate="visible"
        variants={bookIconVariants}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 1.5,
          position: 'relative',
          zIndex: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: isDark
              ? 'linear-gradient(135deg, rgba(124, 77, 255, 0.12), rgba(123, 31, 162, 0.08))'
              : 'linear-gradient(135deg, rgba(103, 58, 183, 0.1), rgba(156, 39, 176, 0.06))',
            boxShadow: isDark
              ? '0 4px 20px rgba(124, 77, 255, 0.15)'
              : '0 4px 20px rgba(103, 58, 183, 0.1)',
            backdropFilter: 'blur(10px)',
            border: isDark
              ? '1px solid rgba(124, 77, 255, 0.2)'
              : '1px solid rgba(103, 58, 183, 0.15)',
          }}
        >
          <FiBook
            size={30}
            style={{
              color: isDark ? '#bb86fc' : '#673ab7',
              strokeWidth: 2
            }}
          />
        </Box>
      </Box>

      <EnhancedPageTitle
        title={t('education.title', '教育经历')}
        subtitle={t('education.subtitle', '我的学术背景和持续学习')}
        textAlign="center"
        withAnimation={withAnimation}
      />

      {/* 右侧装饰元素 */}
      <Box
        component={motion.div}
        initial={withAnimation ? "hidden" : "visible"}
        animate="visible"
        variants={decorationVariants}
        sx={{
          position: 'absolute',
          bottom: 20,
          right: '15%',
          width: '35px',
          height: '35px',
          borderRadius: '8px',
          transform: 'rotate(15deg)',
          background: isDark
            ? 'linear-gradient(135deg, #7c4dff, #b388ff)'
            : 'linear-gradient(135deg, #673ab7, #9c27b0)',
          opacity: 0.15,
          filter: 'blur(8px)',
          zIndex: 0
        }}
      />
    </Box>
  );
};

export default EducationPageTitle;
