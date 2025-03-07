import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Box, Button, Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

interface HomePageProps {
  data: {
    name: string;
    label: string;
    summary: string;
  };
}

/**
 * 主页组件
 * 提供现代化、具有冲击感的首页设计
 */
const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const { t } = useTranslation();

  // 粒子动画变体
  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 0.8,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        repeatDelay: Math.random() * 2
      }
    })
  };

  // 创建随机粒子
  const particles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 15 + 5;
    return (
      <motion.div
        key={i}
        custom={i}
        variants={particleVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: i % 3 === 0
            ? 'linear-gradient(135deg, #EF4444, #F87171)'
            : i % 3 === 1
              ? 'linear-gradient(135deg, #3B82F6, #60A5FA)'
              : 'linear-gradient(135deg, #10B981, #34D399)',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          filter: 'blur(1px)',
          opacity: 0.8,
          zIndex: 0
        }}
      />
    );
  });

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 8, md: 0 }
      }}
    >
      {/* 背景粒子 */}
      {particles}

      {/* 主要内容 */}
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight="medium"
                  sx={{ mb: 2 }}
                >
                  {t('hero.greeting')}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  fontWeight="bold"
                  sx={{
                    mb: 2,
                    background: 'linear-gradient(135deg, #4338CA, #6366F1)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {data.name}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="medium"
                  sx={{ mb: 3 }}
                >
                  {data.label}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: '90%' }}
                >
                  {data.summary}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{ display: 'flex', gap: '16px' }}
              >
                <Button
                  component={Link}
                  to="/about"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<FiArrowRight />}
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    boxShadow: '0 10px 20px rgba(67, 56, 202, 0.3)'
                  }}
                >
                  {t('header.about')}
                </Button>

                <Button
                  component={Link}
                  to="/projects"
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  {t('header.projects')}
                </Button>
              </motion.div>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(135deg, #4338CA, #6366F1)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '160px',
                    textShadow: '0 5px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  赵
                </Typography>

                {/* 装饰性图形 */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '30%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderTopLeftRadius: '100px',
                    borderTopRightRadius: '100px',
                  }}
                />

                {/* 代码符号装饰 */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    color: 'rgba(255, 255, 255, 0.3)',
                    fontFamily: 'monospace',
                    fontSize: '24px'
                  }}
                >
                  {'</>'}
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    color: 'rgba(255, 255, 255, 0.3)',
                    fontFamily: 'monospace',
                    fontSize: '24px'
                  }}
                >
                  {'{}'}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* 底部装饰 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '-100px', md: '0' },
            left: 0,
            width: '100%',
            height: '100px',
            background: 'linear-gradient(to top, rgba(255,255,255,0.1), transparent)',
            zIndex: -1
          }}
        />
      </Container>
    </Box>
  );
};

export default HomePage;
