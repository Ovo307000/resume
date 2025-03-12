import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import GlassyBlobBackground from '../backgrounds/GlassyBlobBackground';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  height?: number | string;
}

/**
 * 统一的页面标头组件
 * 为所有页面(除主页外)提供一致的标头样式和初始化动画
 * 支持背景图片、标题和副标题
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  imageUrl,
  height = 300
}) => {
  const { theme } = useTheme();

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const underlineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height,
        overflow: 'hidden',
        mb: 8,
      }}
    >
      {/* 背景层 */}
      <GlassyBlobBackground
        intensity="light"
        colorSet="primary"
        blobCount={5}
        animate={true}
        containerSx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      />

      {/* 背景图片层 */}
      {imageUrl && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
            opacity: 0.15,
          }}
        />
      )}

      {/* 内容层 */}
      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {subtitle && (
            <motion.div variants={textVariants}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                  mb: 1,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                {subtitle}
              </Typography>
            </motion.div>
          )}

          <motion.div variants={textVariants}>
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              textAlign="center"
              sx={{
                color: theme === 'dark' ? 'white' : 'inherit',
                position: 'relative',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
              }}
            >
              {title}
            </Typography>
          </motion.div>

          <motion.div
            variants={underlineVariants}
            style={{
              height: '4px',
              background: 'linear-gradient(90deg, #4338CA, #6366F1)',
              borderRadius: '2px',
              width: '100%',
              maxWidth: '100px',
              opacity: theme === 'dark' ? 0.8 : 1
            }}
          />
        </motion.div>
      </Container>
    </Box>
  );
};

export default PageHeader;
