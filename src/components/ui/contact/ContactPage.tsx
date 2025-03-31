import React from 'react';
import {
  Box,
  Typography,
  Container,
  alpha,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  useTheme as useMuiTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { useCopyNotification } from '../../../contexts/CopyNotificationContext';
import {
  FiMail,
  FiPhone,
  FiGithub,
  FiMessageSquare,
  FiCopy,
  FiExternalLink,
  FiMapPin,
  FiFileText,
  FiLinkedin,
  FiClock,
  FiStar
} from 'react-icons/fi';

interface UserData {
  name: string;
  email: string;
  phone: string;
  github: string;
  githubUsername: string;
  wechat: string;
  linkedin?: string;
  location?: string;
  resume?: string;
}

interface ContactPageProps {
  userData: UserData;
}

/**
 * 联系方式页面
 * 展示个人联系方式和社交媒体链接
 */
const ContactPage: React.FC<ContactPageProps> = ({ userData }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  // 使用全局复制通知
  const { copyToClipboard } = useCopyNotification();

  // 处理社交媒体卡片点击
  const handleAction = (action: 'email' | 'phone' | 'github' | 'wechat' | 'linkedin' | 'location' | 'resume') => {
    switch (action) {
      case 'email':
        copyToClipboard(userData.email, t('contact.email', '邮箱'));
        break;
      case 'phone':
        copyToClipboard(userData.phone, t('contact.phone', '电话'));
        break;
      case 'github':
        window.open(userData.github, '_blank', 'noopener,noreferrer');
        break;
      case 'wechat':
        copyToClipboard(userData.wechat, t('contact.wechat', '微信'));
        break;
      case 'linkedin':
        if (userData.linkedin) window.open(userData.linkedin, '_blank', 'noopener,noreferrer');
        break;
      case 'location':
        if (userData.location) copyToClipboard(userData.location, t('contact.location', '地址'));
        break;
      case 'resume':
        if (userData.resume) window.open(userData.resume, '_blank', 'noopener,noreferrer');
        break;
    }
  };

  // 容器动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // 卡片动画变体
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.01,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15
      }
    }
  };

  // 标题动画变体
  const titleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    }
  };

  // 颜色条动画变体
  const colorBarVariants = {
    hidden: { backgroundPosition: '0% 50%' },
    visible: {
      backgroundPosition: '100% 50%',
      transition: {
        duration: 2,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'mirror'
      }
    }
  };

  // 社交媒体卡片数据
  const contactCards = [
    {
      id: 'email',
      icon: <FiMail size={isMobile ? 22 : 24} />,
      name: t('contact.email', '邮箱'),
      value: userData.email,
      color: '#EA4335',
      gradient: 'linear-gradient(135deg, #FF5252, #FF7676)',
      action: () => handleAction('email')
    },
    {
      id: 'phone',
      icon: <FiPhone size={isMobile ? 22 : 24} />,
      name: t('contact.phone', '电话'),
      value: userData.phone,
      color: '#34A853',
      gradient: 'linear-gradient(135deg, #00C853, #69F0AE)',
      action: () => handleAction('phone')
    },
    {
      id: 'github',
      icon: <FiGithub size={isMobile ? 22 : 24} />,
      name: 'GitHub',
      value: userData.githubUsername,
      color: isDark ? '#ffffff' : '#24292e',
      gradient: isDark
        ? 'linear-gradient(135deg, #2C3E50, #4CA1AF)'
        : 'linear-gradient(135deg, #24292e, #6e7681)',
      action: () => handleAction('github')
    },
    {
      id: 'wechat',
      icon: <FiMessageSquare size={isMobile ? 22 : 24} />,
      name: t('contact.wechat', '微信'),
      value: userData.wechat,
      color: '#07C160',
      gradient: 'linear-gradient(135deg, #07C160, #10D473)',
      action: () => handleAction('wechat')
    }
  ];

  // 额外的联系卡片
  const extraCards = [
    ...(userData.linkedin ? [{
      id: 'linkedin',
      icon: <FiLinkedin size={isMobile ? 22 : 24} />,
      name: 'LinkedIn',
      value: userData.linkedin?.split('/').pop() || 'LinkedIn',
      color: '#0A66C2',
      gradient: 'linear-gradient(135deg, #0077B5, #0A66C2)',
      action: () => handleAction('linkedin')
    }] : []),
    ...(userData.location ? [{
      id: 'location',
      icon: <FiMapPin size={isMobile ? 22 : 24} />,
      name: t('contact.location', '地址'),
      value: userData.location,
      color: '#FF9800',
      gradient: 'linear-gradient(135deg, #FF9800, #FFC107)',
      action: () => handleAction('location')
    }] : []),
    ...(userData.resume ? [{
      id: 'resume',
      icon: <FiFileText size={isMobile ? 22 : 24} />,
      name: t('contact.resume', '简历'),
      value: t('contact.viewResume', '查看简历'),
      color: '#9C27B0',
      gradient: 'linear-gradient(135deg, #9C27B0, #BA68C8)',
      action: () => handleAction('resume')
    }] : [])
  ];

  // 信息卡片数据
  const infoCards = [
    {
      id: 'response-time',
      icon: <FiClock size={24} />,
      title: t('contact.responseTime', '响应时间'),
      description: t('contact.responseTimeDetails', '工作日: 24小时内 | 周末: 48小时内'),
      color: '#60A5FA',
      darkColor: '#2563EB',
    },
    {
      id: 'preferred-contact',
      icon: <FiStar size={24} />,
      title: t('contact.preferredContact', '优先联系方式'),
      description: t('contact.preferredContactDetails', '电子邮件、微信（工作日 9:00-18:00）'),
      color: '#F472B6',
      darkColor: '#DB2777',
    }
  ];

  // 合并所有卡片
  const allCards = [...contactCards, ...extraCards];

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, md: 4 },
        background: isDark
          ? 'radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.15) 0%, rgba(30, 41, 59, 0.15) 25%, rgba(15, 23, 42, 0.15) 50%, rgba(15, 23, 42, 0.1) 100%)'
          : 'radial-gradient(circle at 50% 50%, rgba(219, 234, 254, 0.3) 0%, rgba(191, 219, 254, 0.3) 25%, rgba(147, 197, 253, 0.2) 50%, rgba(147, 197, 253, 0.1) 100%)',
      }}
    >
      <Container maxWidth="lg" sx={{ flex: 1 }}>
        {/* 页面标题卡片 */}
        <Box
          component={motion.div}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          sx={{
            mb: 4,
            mt: 1,
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            background: isDark
              ? 'linear-gradient(135deg, rgba(46, 51, 90, 0.7), rgba(28, 27, 51, 0.7))'
              : 'linear-gradient(135deg, rgba(236, 240, 253, 0.9), rgba(242, 245, 250, 0.9))',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: isDark
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.05)',
            boxShadow: isDark
              ? '0 12px 32px rgba(0, 0, 0, 0.25)'
              : '0 12px 32px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box
            component={motion.div}
            variants={colorBarVariants}
            initial="hidden"
            animate="visible"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: isDark
                ? 'linear-gradient(90deg, #6366F1, #3B82F6, #EC4899)'
                : 'linear-gradient(90deg, #6366F1, #3B82F6, #EC4899)',
              backgroundSize: '200% 200%',
              zIndex: 1
            }}
          />

          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: isDark ? '#ffffff' : '#1F2937',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            {t('contact.getInTouch', '保持联系')}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              mb: 3,
              maxWidth: '700px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.7
            }}
          >
            {t('contact.getInTouchDescription', '欢迎就任何项目咨询、合作或只是打个招呼与我联系。')}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.7
            }}
          >
            {t(
              'contact.infoText',
              '如果您对我的项目和技能感兴趣，或者有任何问题，请随时联系我。我会尽快回复您的信息。'
            )}
          </Typography>
        </Box>

        {/* 联系卡片容器 */}
        <Box
          component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
          sx={{ mb: 5 }}
        >
          <Grid container spacing={3}>
            {allCards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Card
                    elevation={0}
                    onClick={card.action}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      position: 'relative',
                      bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      outline: 'none',
                      '&:hover': {
                        outline: 'none',
                        boxShadow: `0 0 20px 5px ${alpha(card.color, isDark ? 0.3 : 0.2)}`,
                        borderColor: alpha(card.color, 0.4),
                      }
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: card.gradient,
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 1.5,
                            borderRadius: '50%',
                            bgcolor: alpha(card.color, 0.15),
                            color: card.color,
                            mr: 2
                          }}
                        >
                          {card.icon}
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={600} gutterBottom>
                            {card.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {card.value}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 1 }}>
                          <Tooltip title={card.id === 'github' || card.id === 'linkedin' || card.id === 'resume' ?
                            t('contact.visit', '访问') : t('contact.copy', '复制')}>
                            <IconButton
                              size="small"
                              sx={{
                                bgcolor: alpha(card.color, 0.1),
                                color: card.color,
                                '&:hover': {
                                  bgcolor: alpha(card.color, 0.2),
                                  transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s ease',
                                mb: 1
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                card.action();
                              }}
                            >
                              {card.id === 'github' || card.id === 'linkedin' || card.id === 'resume' ?
                                <FiExternalLink size={16} /> : <FiCopy size={16} />}
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
        </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 联系信息卡片 */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ mb: 5 }}
        >
          <Grid container spacing={3}>
            {infoCards.map((card) => (
              <Grid item xs={12} sm={6} key={card.id}>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      position: 'relative',
                      bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      '&:hover': {
                        outline: 'none',
                        boxShadow: `0 0 20px 5px ${alpha(isDark ? card.color : card.darkColor, isDark ? 0.3 : 0.2)}`,
                        borderColor: alpha(isDark ? card.color : card.darkColor, 0.4),
                      }
                    }}
                  >
                    <Box
                      component={motion.div}
                      variants={colorBarVariants}
                      initial="hidden"
                      animate="visible"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: isDark
                          ? `linear-gradient(90deg, ${card.color}, ${alpha(card.color, 0.6)}, ${card.color})`
                          : `linear-gradient(90deg, ${card.darkColor}, ${alpha(card.darkColor, 0.6)}, ${card.darkColor})`,
                        backgroundSize: '200% 200%',
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Box
                          sx={{
                            mr: 2,
                            color: isDark ? card.color : card.darkColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 1.5,
                            borderRadius: '50%',
                            background: alpha(isDark ? card.color : card.darkColor, 0.1)
                          }}
                        >
                          {card.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              color: isDark ? '#ffffff' : '#1F2937'
                            }}
                          >
                            {card.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
                            }}
                          >
                            {card.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Container>
  );
};

export default ContactPage;
