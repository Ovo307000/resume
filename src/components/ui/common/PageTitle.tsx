import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { School, Work, Code, ContactMail } from '@mui/icons-material';

export interface PageTitleProps {
  title: string;
  subtitle: string;
  icon?: 'education' | 'work' | 'projects' | 'contact';
}

/**
 * 页面标题组件
 * 提供统一的页面标题样式，支持子标题和动画效果
 */
const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, icon }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 选择图标
  const renderIcon = () => {
    const iconProps = { fontSize: 'large', color: 'primary', sx: { mr: 1 } };

    switch (icon) {
      case 'education':
        return <School {...iconProps} />;
      case 'work':
        return <Work {...iconProps} />;
      case 'projects':
        return <Code {...iconProps} />;
      case 'contact':
        return <ContactMail {...iconProps} />;
      default:
        return null;
    }
  };

  // 动画变体
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: 5,
        mt: 2
      }}
    >
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1
          }}
        >
          {renderIcon()}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              background: isDark
                ? 'linear-gradient(90deg, #9c59ff 0%, #7d56f3 100%)'
                : 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent'
            }}
          >
            {title}
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography
          variant="h6"
          component="h2"
          color="text.secondary"
          sx={{
            fontWeight: 400,
            maxWidth: '650px',
            mx: 'auto',
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            lineHeight: 1.5
          }}
        >
          {subtitle}
        </Typography>
      </motion.div>
    </Box>
  );
};

export default PageTitle;
