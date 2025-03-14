import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Divider,
  alpha,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  FiMail,
  FiPhone,
  FiGithub,
  FiMessageSquare,
  FiSend,
  FiCopy,
  FiExternalLink,
  FiLinkedin,
  FiTwitter
} from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import Confetti from '../../components/ui/animations/Confetti';
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import CopyableLink from '../../components/ui/common/CopyableLink';
// 导入全局复制通知Hook
import { useCopyNotification } from '../../contexts/CopyNotificationContext';
import axios from 'axios';
import PageTitle from '../../components/ui/common/PageTitle';

interface SocialLink {
  icon: React.ReactNode;
  name: string;
  link: string;
  color: string;
}

interface ContactPageProps {
  data: {
    name: string;
    email: string;
    phone: string;
    github: string;
    githubUsername: string;
    wechat: string;
    // 可选的社交媒体链接
    linkedin?: string;
    twitter?: string;
  };
}

/**
 * 联系方式页面组件 - 重新设计版
 * 包含联系信息和发送邮件表单功能
 * 添加了3D卡片效果、更流畅的动画和现代化设计
 */
const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  // 使用全局复制通知
  const { copyToClipboard } = useCopyNotification();

  // 鼠标位置状态用于3D效果
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const contactCardRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // 处理卡片3D效果
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardRef: React.RefObject<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 计算鼠标距离中心的偏移量
    const offsetX = (x - centerX) / 25; // 数值越小，效果越明显
    const offsetY = (y - centerY) / 25;

    setMousePosition({ x: offsetX, y: -offsetY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const cardHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      boxShadow: theme === 'dark'
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
        : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  // 复制到剪贴板函数
  const handleCopyToClipboard = (text: string, label: string) => {
    if (!text) return;
    copyToClipboard(text, label);
  };

  // 表单输入变更处理函数
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 表单验证函数
  const validateForm = () => {
    if (!formData.name.trim()) {
      copyToClipboard('请输入您的姓名', '错误');
      return false;
    }

    if (!formData.email.trim()) {
      copyToClipboard('请输入您的邮箱', '错误');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      copyToClipboard('请输入有效的邮箱地址', '错误');
      return false;
    }

    if (!formData.subject.trim()) {
      copyToClipboard('请输入邮件主题', '错误');
      return false;
    }

    if (!formData.message.trim()) {
      copyToClipboard('请输入邮件内容', '错误');
      return false;
    }

    return true;
  };

  // 表单提交处理函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 调用后端API发送邮件
      const response = await axios.post('/api/send-email', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      if (response.data.success) {
        // 表单提交成功
        copyToClipboard('邮件发送成功！', '成功');
        // 显示彩带效果
        setShowConfetti(true);
        setFormSuccess(true);
        // 重置表单
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // 3秒后重置成功状态
        setTimeout(() => {
          setFormSuccess(false);
        }, 3000);
      } else {
        // 服务器返回了错误
        copyToClipboard(response.data.message || '发送邮件失败，请稍后再试', '错误');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      copyToClipboard('发送邮件失败，请稍后再试', '错误');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 联系方式数据
  const contactMethods = [
    {
      icon: <FiMail size={24} />,
      title: t('contact.email'),
      value: data.email,
      color: '#4285F4',
      needCopy: true,
      copyIcon: <FiCopy size={16} />
    },
    {
      icon: <FiPhone size={24} />,
      title: t('contact.phone'),
      value: data.phone,
      color: '#0F9D58',
      needCopy: true,
      copyIcon: <FiCopy size={16} />
    },
    {
      icon: <FiGithub size={24} />,
      title: t('contact.github'),
      value: data.githubUsername,
      link: data.github,
      color: theme === 'dark' ? '#fff' : '#333',
      needCopy: false
    },
    {
      icon: <FiMessageSquare size={24} />,
      title: t('contact.wechat'),
      value: data.wechat,
      color: '#22C55E',
      needCopy: true,
      copyIcon: <FiCopy size={16} />
    }
  ];

  // 社交媒体数据（可选）
  const socialLinks: SocialLink[] = [
    data.linkedin && {
      icon: <FiLinkedin size={22} />,
      name: 'LinkedIn',
      link: data.linkedin,
      color: '#0077B5'
    },
    data.twitter && {
      icon: <FiTwitter size={22} />,
      name: 'Twitter',
      link: data.twitter,
      color: '#1DA1F2'
    },
    {
      icon: <FiGithub size={22} />,
      name: 'GitHub',
      link: data.github,
      color: theme === 'dark' ? '#fff' : '#333'
    }
  ].filter(Boolean) as SocialLink[];

  return (
    <Box component="main" sx={{ flexGrow: 1, pt: { xs: 4, md: 6 }, pb: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <PageTitle
            title={t('contact.title')}
            subtitle={t('contact.subtitle', '与我取得联系，我期待与您交流')}
          />

          <Box sx={{ mb: 6 }} />

          <Grid container spacing={4}>
            {/* 联系信息卡片 */}
            <Grid item xs={12} md={5}>
              <motion.div
                variants={itemVariants}
                ref={contactCardRef}
                onMouseMove={(e) => handleMouseMove(e, contactCardRef)}
                onMouseLeave={handleMouseLeave}
                initial="rest"
                whileHover="hover"
                animate={{
                  rotateY: isMobile ? 0 : mousePosition.x,
                  rotateX: isMobile ? 0 : mousePosition.y,
                  transition: { type: 'spring', stiffness: 300, damping: 30 }
                }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              >
                <GlassyBlobBackground
                  colorSet="cool"
                  intensity="light"
                  blobCount={3}
                  containerSx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    transform: 'translateZ(0)', // 为3D效果添加的
                  }}
                >
                  <motion.div
                    variants={cardHoverVariants}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        height: '100%',
                        backgroundColor: 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            position: 'relative',
                            display: 'inline-block',
                            '&:after': {
                              content: '""',
                              position: 'absolute',
                              bottom: -5,
                              left: 0,
                              width: '40%',
                              height: 3,
                              backgroundColor: 'primary.main',
                              borderRadius: 2
                            }
                          }}
                        >
                          {t('contact.getInTouch', '联系方式')}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          paragraph
                          sx={{
                            maxWidth: '95%',
                            mt: 2,
                            mb: 1
                          }}
                        >
                          {t('contact.reachOut', '您可以通过以下方式联系我，我会尽快回复您的消息。')}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 4 }}>
                        {contactMethods.map((method, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                              x: 5,
                              transition: { type: 'spring', stiffness: 400 }
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2.5,
                                p: 2,
                                borderRadius: 2,
                                '&:hover': {
                                  bgcolor: theme === 'dark'
                                    ? 'rgba(255, 255, 255, 0.03)'
                                    : 'rgba(0, 0, 0, 0.02)',
                                  transform: 'translateZ(30px)' // 3D效果
                                },
                                transition: 'all 0.2s'
                              }}
                            >
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: alpha(method.color, theme === 'dark' ? 0.15 : 0.1),
                                  color: method.color,
                                  mr: 3,
                                  flexShrink: 0,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    bgcolor: alpha(method.color, theme === 'dark' ? 0.25 : 0.2),
                                    transform: 'scale(1.05)'
                                  }
                                }}
                              >
                                {method.icon}
                              </Box>

                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  color="text.secondary"
                                  sx={{ fontWeight: 500, mb: 0.5 }}
                                >
                                  {method.title}
                                </Typography>
                                {method.needCopy ? (
                                  <CopyableLink
                                    value={method.value || ''}
                                    label={method.title}
                                    copyIcon={method.copyIcon}
                                    linkColor={method.color}
                                    onCopy={handleCopyToClipboard}
                                  />
                                ) : (
                                  <CopyableLink
                                    value={method.value || ''}
                                    to={method.link || ''}
                                    isExternal={method.title === t('contact.github')}
                                    externalIcon={<FiExternalLink size={16} />}
                                    linkColor={method.color}
                                  />
                                )}
                              </Box>
                            </Box>
                          </motion.div>
                        ))}
                      </Box>

                      {/* 社交媒体链接 */}
                      {socialLinks.length > 0 && (
                        <>
                          <Divider sx={{ mb: 3, opacity: 0.6 }} />
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 600,
                                mb: 2,
                              }}
                            >
                              {t('contact.socialMedia', '社交媒体')}
                            </Typography>
                            <Box sx={{
                              display: 'flex',
                              gap: 2,
                              flexWrap: 'wrap'
                            }}>
                              {socialLinks.map((social: SocialLink, index) => (
                                <motion.a
                                  key={index}
                                  href={social.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    textDecoration: 'none',
                                    display: 'inline-block'
                                  }}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Box
                                    sx={{
                                      width: 42,
                                      height: 42,
                                      borderRadius: '50%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      bgcolor: alpha(social.color, theme === 'dark' ? 0.15 : 0.1),
                                      color: social.color,
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        bgcolor: alpha(social.color, theme === 'dark' ? 0.25 : 0.2),
                                      }
                                    }}
                                  >
                                    {social.icon}
                                  </Box>
                                </motion.a>
                              ))}
                            </Box>
                          </Box>
                        </>
                      )}
                    </Paper>
                  </motion.div>
                </GlassyBlobBackground>
              </motion.div>
            </Grid>

            {/* 联系表单 */}
            <Grid item xs={12} md={7}>
              <motion.div
                variants={itemVariants}
                ref={formCardRef}
                onMouseMove={(e) => handleMouseMove(e, formCardRef)}
                onMouseLeave={handleMouseLeave}
                initial="rest"
                whileHover="hover"
                animate={{
                  rotateY: isMobile ? 0 : mousePosition.x,
                  rotateX: isMobile ? 0 : mousePosition.y,
                  transition: { type: 'spring', stiffness: 300, damping: 30 }
                }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              >
                <GlassyBlobBackground
                  colorSet="primary"
                  intensity="light"
                  blobCount={4}
                  containerSx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    transform: 'translateZ(0)', // 为3D效果添加的
                  }}
                >
                  <motion.div variants={cardHoverVariants}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        height: '100%',
                        backgroundColor: 'transparent',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            position: 'relative',
                            display: 'inline-block',
                            '&:after': {
                              content: '""',
                              position: 'absolute',
                              bottom: -5,
                              left: 0,
                              width: '40%',
                              height: 3,
                              backgroundColor: 'primary.main',
                              borderRadius: 2
                            }
                          }}
                        >
                          {t('contact.sendMessage', '发送消息')}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          paragraph
                          sx={{
                            maxWidth: '95%',
                            mt: 2,
                            mb: 1
                          }}
                        >
                          {t('contact.fillForm', '填写下面的表单，我会尽快回复您的消息。')}
                        </Typography>
                      </Box>

                      {formSuccess ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            textAlign: 'center',
                            minHeight: '200px'
                          }}
                        >
                          <Box
                            sx={{
                              width: 70,
                              height: 70,
                              borderRadius: '50%',
                              bgcolor: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 3
                            }}
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                            >
                              <FiSend color="#22c55e" size={30} />
                            </motion.div>
                          </Box>
                          <Typography variant="h6" gutterBottom fontWeight={600}>
                            {t('contact.messageSent', '消息已发送！')}
                          </Typography>
                          <Typography color="text.secondary">
                            {t('contact.thankYou', '感谢您的留言，我会尽快回复。')}
                          </Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{ mt: 4, borderRadius: 2, px: 3 }}
                            onClick={() => setFormSuccess(false)}
                          >
                            {t('contact.sendAnother', '发送另一条消息')}
                          </Button>
                        </motion.div>
                      ) : (
                        <Box
                          component="form"
                          onSubmit={handleSubmit}
                          sx={{
                            mt: 1,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              transition: 'all 0.2s',
                              '&:hover': {
                                transform: 'translateY(-2px)'
                              },
                              '&.Mui-focused': {
                                transform: 'translateY(-2px)'
                              }
                            }
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label={t('contact.form.name')}
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                                variant="outlined"
                                disabled={isSubmitting}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label={t('contact.form.email')}
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                                variant="outlined"
                                disabled={isSubmitting}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label={t('contact.form.subject')}
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                                variant="outlined"
                                disabled={isSubmitting}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label={t('contact.form.message')}
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                                variant="outlined"
                                multiline
                                rows={4}
                                disabled={isSubmitting}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                              <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <FiSend />}
                                  sx={{
                                    borderRadius: '50px',
                                    px: 4,
                                    py: 1.5,
                                    boxShadow: theme === 'dark'
                                      ? '0 10px 15px -3px rgba(67, 56, 202, 0.3)'
                                      : '0 10px 15px -3px rgba(67, 56, 202, 0.2)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:before': {
                                      content: '""',
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      width: '100%',
                                      height: '100%',
                                      background: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)',
                                      backgroundSize: '200% 200%',
                                      animation: 'ripple 2s linear infinite',
                                      zIndex: 0
                                    },
                                    '@keyframes ripple': {
                                      '0%': {
                                        backgroundPosition: '0% 0%'
                                      },
                                      '100%': {
                                        backgroundPosition: '200% 200%'
                                      }
                                    }
                                  }}
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? t('contact.sending', '发送中...') : t('contact.sendButton', '发送消息')}
                                </Button>
                              </motion.div>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    </Paper>
                  </motion.div>
                </GlassyBlobBackground>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* 成功提交时的彩带动画 */}
      <Confetti
        active={showConfetti}
        duration={3000}
        pieces={200}
        onComplete={() => setShowConfetti(false)}
      />
    </Box>
  );
};

export default ContactPage;
