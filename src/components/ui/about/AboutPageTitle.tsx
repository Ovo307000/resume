import React from 'react';
import { Box } from '@mui/material';
import EnhancedPageTitle from '../common/EnhancedPageTitle';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface AboutPageTitleProps {
  withAnimation?: boolean;
}

/**
 * 关于页面专用标题组件
 * 使用复用的EnhancedPageTitle组件，并添加关于页面特定的样式和动画
 */
const AboutPageTitle: React.FC<AboutPageTitleProps> = ({
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

  // 用户图标的动画
  const userIconVariants = {
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
            ? 'linear-gradient(135deg, #ec4899, #f472b6)'
            : 'linear-gradient(135deg, #db2777, #ec4899)',
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
        variants={userIconVariants}
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
              ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(244, 114, 182, 0.08))'
              : 'linear-gradient(135deg, rgba(219, 39, 119, 0.1), rgba(236, 72, 153, 0.06))',
            boxShadow: isDark
              ? '0 4px 20px rgba(236, 72, 153, 0.15)'
              : '0 4px 20px rgba(219, 39, 119, 0.1)',
            backdropFilter: 'blur(10px)',
            border: isDark
              ? '1px solid rgba(236, 72, 153, 0.2)'
              : '1px solid rgba(219, 39, 119, 0.15)',
          }}
        >
          <FiUser
            size={30}
            style={{
              color: isDark ? '#f472b6' : '#db2777',
              strokeWidth: 2
            }}
          />
        </Box>
      </Box>

      <EnhancedPageTitle
        title={t('about.title', '关于我')}
        subtitle={t('about.subtitle', '了解我的背景、技能和热情')}
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
            ? 'linear-gradient(135deg, #ec4899, #f472b6)'
            : 'linear-gradient(135deg, #db2777, #ec4899)',
          opacity: 0.15,
          filter: 'blur(8px)',
          zIndex: 0
        }}
      />
    </Box>
  );
};

export default AboutPageTitle;
