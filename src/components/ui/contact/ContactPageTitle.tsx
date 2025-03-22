import React from 'react';
import { Box } from '@mui/material';
import EnhancedPageTitle from '../common/EnhancedPageTitle';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ContactPageTitleProps {
  withAnimation?: boolean;
}

/**
 * 联系页面专用标题组件
 * 使用复用的EnhancedPageTitle组件，并添加联系页面特定的样式和动画
 */
const ContactPageTitle: React.FC<ContactPageTitleProps> = ({
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

  // 邮件图标的动画
  const mailIconVariants = {
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
            ? 'linear-gradient(135deg, #10b981, #34d399)'
            : 'linear-gradient(135deg, #059669, #10b981)',
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
        variants={mailIconVariants}
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
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(52, 211, 153, 0.08))'
              : 'linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(16, 185, 129, 0.06))',
            boxShadow: isDark
              ? '0 4px 20px rgba(16, 185, 129, 0.15)'
              : '0 4px 20px rgba(5, 150, 105, 0.1)',
            backdropFilter: 'blur(10px)',
            border: isDark
              ? '1px solid rgba(16, 185, 129, 0.2)'
              : '1px solid rgba(5, 150, 105, 0.15)',
          }}
        >
          <FiMail
            size={30}
            style={{
              color: isDark ? '#34d399' : '#059669',
              strokeWidth: 2
            }}
          />
        </Box>
      </Box>

      <EnhancedPageTitle
        title={t('contact.title', '联系我')}
        subtitle={t('contact.subtitle', '有合作或咨询，请与我联系')}
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
            ? 'linear-gradient(135deg, #10b981, #34d399)'
            : 'linear-gradient(135deg, #059669, #10b981)',
          opacity: 0.15,
          filter: 'blur(8px)',
          zIndex: 0
        }}
      />
    </Box>
  );
};

export default ContactPageTitle;
