import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Box, Button, Container, Grid, Avatar } from '@mui/material';
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
  const particles = Array.from({ length: 50 }).map((_, i) => {
    const size = Math.random() * 20 + 5;
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
          background: i % 4 === 0
            ? 'linear-gradient(135deg, #EF4444, #F87171)'
            : i % 4 === 1
              ? 'linear-gradient(135deg, #3B82F6, #60A5FA)'
              : i % 4 === 2
                ? 'linear-gradient(135deg, #10B981, #34D399)'
                : 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          filter: 'blur(1px)',
          opacity: 0.7,
          zIndex: 0
        }}
      />
    );
  });

  // 创建动态光效
  const glowEffects = [
    { color: 'rgba(66, 153, 225, 0.6)', top: '10%', left: '10%', size: '40%' },
    { color: 'rgba(159, 122, 234, 0.6)', bottom: '10%', right: '15%', size: '35%' },
    { color: 'rgba(236, 72, 153, 0.5)', top: '50%', right: '5%', size: '25%' },
    { color: 'rgba(99, 102, 241, 0.5)', bottom: '30%', left: '20%', size: '30%' },
    { color: 'rgba(59, 130, 246, 0.4)', top: '25%', right: '30%', size: '35%' }
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 8, md: 0 },
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)'
            : 'linear-gradient(180deg, #f8fafc 0%, #e0e7ff 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: (theme) =>
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.3), transparent 35%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3), transparent 30%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 60%)'
              : 'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.15), transparent 35%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15), transparent 30%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 60%)',
          opacity: 1,
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: (theme) =>
            theme.palette.mode === 'dark'
              ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%234f46e5\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
              : 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%234f46e5\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          opacity: 0.5,
          zIndex: 0,
        }
      }}
    >
      {/* 背景炫光效果 */}
      {glowEffects.map((glow, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: glow.size,
            height: glow.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${glow.color} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(40px)',
            opacity: 0.7,
            top: glow.top,
            left: glow.left,
            right: glow.right,
            bottom: glow.bottom,
            zIndex: 0,
            animation: `pulse${index} 8s infinite alternate`,
            [`@keyframes pulse${index}`]: {
              '0%': {
                opacity: 0.5,
                transform: 'scale(1)',
              },
              '100%': {
                opacity: 0.7,
                transform: 'scale(1.1)',
              },
            },
          }}
        />
      ))}

      {/* 背景粒子 */}
      {particles}

      {/* 主要内容 */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
                    boxShadow: '0 10px 20px rgba(67, 56, 202, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4), rgba(255,255,255,0) 70%)',
                      animation: 'shine 3s infinite linear',
                    },
                    '@keyframes shine': {
                      '0%': {
                        transform: 'translateX(-100%)',
                      },
                      '100%': {
                        transform: 'translateX(100%)',
                      },
                    },
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
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '150%',
                    height: '150%',
                    background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 8px)',
                    animation: 'slide 20s linear infinite',
                  },
                  '@keyframes slide': {
                    '0%': {
                      transform: 'translateX(-50%) translateY(-50%) rotate(0deg)',
                    },
                    '100%': {
                      transform: 'translateX(-50%) translateY(-50%) rotate(360deg)',
                    },
                  },
                }}
              >
                {/* 个人头像 */}
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    padding: '5px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  }}
                >
                  <Avatar
                    sx={{
                      width: '100%',
                      height: '100%',
                      border: '4px solid rgba(255,255,255,0.3)',
                    }}
                    alt={data.name}
                    src="/profile_avatar.png"
                  >
                    {/* 如果没有头像，显示姓名首字母 */}
                    {data.name.charAt(0)}
                  </Avatar>
                </Box>

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

