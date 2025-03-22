import React from 'react';
import { Box } from '@mui/material';
import EnhancedPageTitle from '../common/EnhancedPageTitle';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiBriefcase } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ProjectsPageTitleProps {
  withAnimation?: boolean;
}

/**
 * 项目页面专用标题组件
 * 使用复用的EnhancedPageTitle组件，并添加项目页面特定的样式和动画
 */
const ProjectsPageTitle: React.FC<ProjectsPageTitleProps> = ({
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

  // 项目图标的动画
  const projectIconVariants = {
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
            ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
            : 'linear-gradient(135deg, #6d28d9, #4f46e5)',
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
        variants={projectIconVariants}
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
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(99, 102, 241, 0.08))'
              : 'linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(79, 70, 229, 0.06))',
            boxShadow: isDark
              ? '0 4px 20px rgba(139, 92, 246, 0.15)'
              : '0 4px 20px rgba(109, 40, 217, 0.1)',
            backdropFilter: 'blur(10px)',
            border: isDark
              ? '1px solid rgba(139, 92, 246, 0.2)'
              : '1px solid rgba(109, 40, 217, 0.15)',
          }}
        >
          <FiBriefcase
            size={30}
            style={{
              color: isDark ? '#a78bfa' : '#7c3aed',
              strokeWidth: 2
            }}
          />
        </Box>
      </Box>

      <EnhancedPageTitle
        title={t('projects.title', '项目')}
        subtitle={t('projects.subtitle', '展示我近期的工作和合作项目')}
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
            ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
            : 'linear-gradient(135deg, #6d28d9, #4f46e5)',
          opacity: 0.15,
          filter: 'blur(8px)',
          zIndex: 0
        }}
      />
    </Box>
  );
};

export default ProjectsPageTitle;
