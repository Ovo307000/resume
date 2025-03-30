import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';

interface ContactPageTitleProps {
  withAnimation?: boolean;
}

/**
 * 联系页面标题组件 - 简化版
 * 更加简洁、优雅、精致的设计
 */
const ContactPageTitle: React.FC<ContactPageTitleProps> = ({ withAnimation = true }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 标题动画变体
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  // 装饰线条动画变体
  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: '80px',
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  // 副标题动画变体
  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.5
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: 'center',
          position: 'relative',
          mb: 6
        }}
      >
        <Box
          component={withAnimation ? motion.div : 'div'}
          variants={withAnimation ? titleVariants : undefined}
          initial={withAnimation ? "hidden" : undefined}
          animate={withAnimation ? "visible" : undefined}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              backgroundImage: isDark
                ? 'linear-gradient(90deg, #f0f0f0, #c0c0c0)'
                : 'linear-gradient(90deg, #2c3e50, #4a5568)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            {t('contact.title', '联系我')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Box
            component={withAnimation ? motion.div : 'div'}
            variants={withAnimation ? lineVariants : undefined}
            initial={withAnimation ? "hidden" : undefined}
            animate={withAnimation ? "visible" : undefined}
            sx={{
              height: '3px',
              borderRadius: '2px',
              background: isDark
                ? 'linear-gradient(90deg, #64748b, #94a3b8)'
                : 'linear-gradient(90deg, #475569, #94a3b8)',
            }}
          />
        </Box>

        <Box
          component={withAnimation ? motion.div : 'div'}
          variants={withAnimation ? subtitleVariants : undefined}
          initial={withAnimation ? "hidden" : undefined}
          animate={withAnimation ? "visible" : undefined}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: isDark ? 'grey.400' : 'text.secondary',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            {t(
              'contact.subtitle',
              '如果您有任何问题或者需要了解更多信息，欢迎随时联系我'
            )}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactPageTitle;
