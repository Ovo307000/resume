import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  alpha,
  useMediaQuery,
  useTheme as useMuiTheme,
  ButtonGroup,
  Stack,
  Tooltip,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FiMail,
  FiPhone,
  FiGithub,
  FiMessageSquare,
  FiCopy,
  FiExternalLink,
  FiArrowUpRight
} from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';

interface SocialLink {
  icon: React.ReactNode;
  name: string;
  link: string;
  color: string;
  customGradient?: string;
}

interface ContactPageButtonsProps {
  data: {
    name: string;
    email: string;
    phone: string;
    github: string;
    githubUsername: string;
    wechat: string;
    linkedin?: string;
    twitter?: string;
  };
  onCopy: (text: string, label: string) => void;
}

/**
 * 联系页面按钮组
 * 提供美观的社交媒体和联系方式按钮
 */
const ContactPageButtons: React.FC<ContactPageButtonsProps> = ({ data, onCopy }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 处理复制或打开链接
  const handleAction = (social: SocialLink) => {
    if (social.name === 'GitHub') {
      window.open(social.link, '_blank', 'noopener,noreferrer');
    } else {
      const textToCopy =
        social.name === t('contact.email', '邮箱')
          ? data.email
          : social.name === t('contact.phone', '电话')
          ? data.phone
          : social.name === t('contact.wechat', '微信')
          ? data.wechat
          : social.link;
      onCopy(textToCopy, `已复制${social.name}`);
    }
  };

  // 社交媒体数据
  const socialLinks: SocialLink[] = [
    {
      icon: <FiMail size={isMobile ? 22 : 24} />,
      name: t('contact.email', '邮箱'),
      link: `mailto:${data.email}`,
      color: '#EA4335',
      customGradient: 'linear-gradient(135deg, #FF5252, #FF7676)'
    },
    {
      icon: <FiPhone size={isMobile ? 22 : 24} />,
      name: t('contact.phone', '电话'),
      link: `tel:${data.phone}`,
      color: '#34A853',
      customGradient: 'linear-gradient(135deg, #00C853, #69F0AE)'
    },
    data.github && {
      icon: <FiGithub size={isMobile ? 22 : 24} />,
      name: 'GitHub',
      link: data.github,
      color: isDark ? '#ffffff' : '#24292e',
      customGradient: isDark
        ? 'linear-gradient(135deg, #2C3E50, #4CA1AF)'
        : 'linear-gradient(135deg, #24292e, #6e7681)'
    },
    data.wechat && {
      icon: <FiMessageSquare size={isMobile ? 22 : 24} />,
      name: t('contact.wechat', '微信'),
      link: `weixin://`,
      color: '#07C160',
      customGradient: 'linear-gradient(135deg, #07C160, #10D473)'
    }
  ].filter(Boolean) as SocialLink[];

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
      y: -8,
      boxShadow: `0 15px 30px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  // 图标动画变体
  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -5, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  // 箭头动画变体
  const arrowVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 },
    hover: {
      x: 5,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5
      }
    }
  };

  // 获取内容文本
  const getContentText = (social: SocialLink): string => {
    if (social.name === 'GitHub') {
      return data.githubUsername;
    } else if (social.name === t('contact.email', '邮箱')) {
      return data.email;
    } else if (social.name === t('contact.phone', '电话')) {
      return data.phone;
    } else if (social.name === t('contact.wechat', '微信')) {
      return data.wechat;
    }
    return social.link;
  };

  return (
    <Stack
      spacing={4}
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 社交媒体卡片网格 */}
      <Grid container spacing={2}>
        {socialLinks.map((social, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              style={{ height: '100%' }}
            >
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  bgcolor: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: social.customGradient || social.color,
                  }
                }}
                onClick={() => handleAction(social)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box
                      component={motion.div}
                      variants={iconVariants}
                      whileHover="hover"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1.5,
                        borderRadius: '50%',
                        bgcolor: alpha(social.color, 0.15),
                        color: social.color,
                      }}
                    >
                      {social.icon}
                    </Box>
                    <Tooltip title={social.name === 'GitHub' ? t('contact.visit', '访问') : t('contact.copy', '复制')}>
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: alpha(social.color, 0.1),
                          color: social.color,
                          '&:hover': {
                            bgcolor: alpha(social.color, 0.2),
                          }
                        }}
                      >
                        {social.name === 'GitHub' ? <FiExternalLink size={16} /> : <FiCopy size={16} />}
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {social.name}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        maxWidth: '80%'
                      }}
                    >
                      {getContentText(social)}
                    </Typography>
                    <Box
                      component={motion.div}
                      variants={arrowVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <FiArrowUpRight size={16} color={social.color} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* 复制操作卡片 */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: 600,
              mb: 2
            }}
          >
            {t('contact.quickActions', '快捷操作')}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  fullWidth
                  startIcon={<FiCopy />}
                  onClick={() => onCopy(data.email, t('contact.emailCopied', '邮箱已复制'))}
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    bgcolor: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.7)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(50, 61, 79, 0.5)' : 'rgba(245, 245, 245, 0.9)',
                    }
                  }}
                >
                  {t('contact.copyEmail', '复制邮箱')}
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  fullWidth
                  startIcon={<FiCopy />}
                  onClick={() => onCopy(data.phone, t('contact.phoneCopied', '电话已复制'))}
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    bgcolor: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.7)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(50, 61, 79, 0.5)' : 'rgba(245, 245, 245, 0.9)',
                    }
                  }}
                >
                  {t('contact.copyPhone', '复制电话')}
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  fullWidth
                  startIcon={<FiExternalLink />}
                  onClick={() => window.open(data.github, '_blank', 'noopener,noreferrer')}
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    bgcolor: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.7)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(50, 61, 79, 0.5)' : 'rgba(245, 245, 245, 0.9)',
                    }
                  }}
                >
                  {t('contact.visitGithub', '访问 GitHub')}
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Stack>
  );
};

export default ContactPageButtons;
