import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme as useMuiTheme,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';

// 基本信息属性接口
interface BasicsProps {
  data: {
    name: string;
    label: string;
    summary: string;
    profiles?: Array<{
      network?: string;
      username?: string;
      url?: string;
    }>;
  };
}

/**
 * 3D背景网格组件
 */
const GridBackground: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -10,
        overflow: 'hidden',
        opacity: 0.4,
      }}
    >
      <Box
        className="grid"
        sx={{
          position: 'absolute',
          width: '150%',
          height: '150%',
          transform: 'perspective(500px) rotateX(30deg) scale(2)',
          transformOrigin: 'center top',
          backgroundImage: `linear-gradient(
              ${theme === 'dark' ? '#ffffff10' : '#00000005'} 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              ${theme === 'dark' ? '#ffffff10' : '#00000005'} 1px,
              transparent 1px
            )`,
          backgroundSize: '30px 30px',
          zIndex: -5,
        }}
      />
    </Box>
  );
};

/**
 * 动画形状背景组件
 */
const AnimatedShapes: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 形状变体
  const shapeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 0.8,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 50
      }
    })
  };

  return (
    <>
      <motion.div
        custom={0}
        variants={shapeVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: '250px',
          height: '250px',
          borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
          background: `linear-gradient(135deg, ${alpha(muiTheme.palette.primary.main, 0.4)}, ${alpha(muiTheme.palette.secondary.main, 0.2)})`,
          filter: 'blur(7px)',
          zIndex: -1,
          animation: 'morph 8s linear infinite alternate',
        }}
      />
      <motion.div
        custom={1}
        variants={shapeVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '18% 82% 23% 77% / 46% 46% 54% 54%',
          background: `linear-gradient(135deg, ${alpha(muiTheme.palette.error.main, 0.3)}, ${alpha(muiTheme.palette.info.main, 0.2)})`,
          filter: 'blur(7px)',
          zIndex: -1,
          animation: 'morph 10s linear infinite alternate-reverse',
        }}
      />
      <motion.div
        custom={2}
        variants={shapeVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'absolute',
          top: '50%',
          left: '55%',
          width: '150px',
          height: '150px',
          borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
          background: `linear-gradient(135deg, ${alpha(muiTheme.palette.secondary.main, 0.3)}, ${alpha(muiTheme.palette.primary.main, 0.2)})`,
          filter: 'blur(7px)',
          zIndex: -1,
          animation: 'morph 12s linear infinite alternate',
        }}
      />

      {/* 形状变形动画 */}
      <style>
        {`
          @keyframes morph {
            0% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
            25% { border-radius: 58% 42% 30% 70% / 55% 55% 45% 45%; }
            50% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
            75% { border-radius: 70% 30% 50% 50% / 60% 30% 70% 30%; }
            100% { border-radius: 40% 60% 30% 70% / 50% 60% 40% 40%; }
          }
        `}
      </style>
    </>
  );
};

/**
 * 英雄部分/主页组件
 * 设计富有冲击力，现代感
 */
const Hero: React.FC<BasicsProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 主要内容动画
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 10, md: 0 },
      }}
    >
      {/* 3D网格背景 */}
      <GridBackground />

      {/* 流体形状背景 */}
      <AnimatedShapes />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 2,
            py: { xs: 5, md: 10 },
            gap: { xs: 6, md: 4 },
          }}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 左侧文本内容 */}
          <Box sx={{
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: { xs: '100%', md: '60%' }
          }}>
            {/* 欢迎文本 */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="overline"
                component="div"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  letterSpacing: 3,
                  mb: 2,
                  fontSize: { xs: '0.8rem', md: '1rem' },
                }}
              >
                {t('hero.greeting')}
              </Typography>
            </motion.div>

            {/* 名字 */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '5rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 2,
                  background: theme === 'dark'
                    ? 'linear-gradient(90deg, #fff 0%, #a5b4fc 100%)'
                    : 'linear-gradient(90deg, #1e293b 0%, #4338ca 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {data.name}
              </Typography>
            </motion.div>

            {/* 职位 */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 700,
                  color: theme === 'dark' ? 'primary.light' : 'primary.dark',
                  mb: 3,
                }}
              >
                {data.label}
              </Typography>
            </motion.div>

            {/* 简介 */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  mb: 4,
                  maxWidth: '800px',
                  mx: { xs: 'auto', md: 0 },
                  color: 'text.secondary',
                  lineHeight: 1.8,
                }}
              >
                {data.summary}
              </Typography>
            </motion.div>

            {/* 按钮组 */}
            <motion.div variants={itemVariants}>
              <Box sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Button
                  component={Link}
                  to="/contact"
                  variant="contained"
                  size="large"
                  endIcon={<FiArrowRight />}
                  sx={{
                    borderRadius: '50px',
                    px: 3,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: theme === 'dark'
                      ? '0 4px 14px 0 rgba(99, 102, 241, 0.4)'
                      : '0 4px 14px 0 rgba(67, 56, 202, 0.3)',
                  }}
                >
                  {t('hero.contactMe')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<FiGithub />}
                  component="a"
                  href={data.profiles?.[0]?.url || "https://github.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: '50px',
                    px: 3,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                    }
                  }}
                >
                  GitHub
                </Button>
              </Box>
            </motion.div>
          </Box>

          {/* 右侧头像卡片 */}
          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box
              sx={{
                width: { xs: '280px', md: '320px' },
                height: { xs: '280px', md: '320px' },
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: theme === 'dark'
                  ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
                  : '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05) inset',
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: theme === 'dark'
                    ? '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                    : '0 30px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.1) inset',
                }
              }}
            >
              {/* 头像 */}
              <Box
                component="img"
                src="/profile_avatar.png"
                alt="Profile Avatar"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />

              {/* 光晕效果 */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: theme === 'dark'
                    ? 'linear-gradient(45deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)'
                    : 'linear-gradient(45deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />

              {/* 闪光效果 */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: '-50%',
                  width: '200%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  animation: 'shimmer 3s infinite',
                  '@keyframes shimmer': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' }
                  },
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
