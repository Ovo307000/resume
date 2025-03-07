import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  IconButton,
  Link,
  useTheme as useMuiTheme,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  FiMail,
  FiPhone,
  FiGithub,
  FiMessageSquare,
  FiSend,
  FiCheckCircle
} from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import Confetti from '../../components/ui/animations/Confetti';
import AnimatedLink from '../../components/ui/animations/AnimatedLink';
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';

interface ContactPageProps {
  data: {
    name: string;
    email: string;
    phone: string;
    github: string;
    githubUsername: string;
    wechat: string;
  };
}

/**
 * 联系方式页面组件
 * 包含联系信息和发送邮件表单功能
 * 添加了彩带成功动画和更好的交互效果
 */
const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

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

  // 联系方式数据
  const contactMethods = [
    {
      icon: <FiMail size={24} />,
      title: t('contact.email'),
      value: data.email,
      link: `mailto:${data.email}`,
      color: '#EF4444' // 红色
    },
    {
      icon: <FiPhone size={24} />,
      title: t('contact.phone'),
      value: data.phone,
      link: `tel:${data.phone}`,
      color: '#10B981' // 绿色
    },
    {
      icon: <FiGithub size={24} />,
      title: t('contact.github'),
      value: data.githubUsername,
      link: data.github,
      color: '#6366F1' // 紫色
    },
    {
      icon: <FiMessageSquare size={24} />,
      title: t('contact.wechat'),
      value: data.wechat,
      link: undefined,
      color: '#22C55E' // 微信绿
    }
  ];

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 关闭提示信息
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  // 表单验证
  const validateForm = () => {
    if (!formData.name.trim()) {
      setSnackbar({
        open: true,
        message: '请输入您的姓名',
        severity: 'error'
      });
      return false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSnackbar({
        open: true,
        message: '请输入有效的邮箱地址',
        severity: 'error'
      });
      return false;
    }

    if (!formData.message.trim()) {
      setSnackbar({
        open: true,
        message: '请输入消息内容',
        severity: 'error'
      });
      return false;
    }

    return true;
  };

  // 表单提交处理函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 表单验证
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 创建要发送到mailto链接的邮件内容
      const mailtoSubject = encodeURIComponent(formData.subject || `来自${formData.name}的咨询`);
      const mailtoBody = encodeURIComponent(
        `姓名: ${formData.name}\n` +
        `邮箱: ${formData.email}\n\n` +
        `消息:\n${formData.message}`
      );

      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 使用mailto协议打开默认邮件客户端
      window.location.href = `mailto:solowzl@outlook.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      // 显示成功消息和彩带
      setShowConfetti(true);
      setSnackbar({
        open: true,
        message: '邮件客户端已打开，请完成邮件发送',
        severity: 'success'
      });

      // 重置表单
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('发送邮件时出错:', error);
      setSnackbar({
        open: true,
        message: '发送邮件时出错，请直接联系 solowzl@outlook.com',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 页面标题 */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              textAlign="center"
              sx={{
                mb: 6,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #4338CA, #6366F1)',
                  borderRadius: '2px',
                }
              }}
            >
              {t('contact.title')}
            </Typography>
          </motion.div>

          <Grid container spacing={4} justifyContent="center">
            {/* 联系方式卡片 */}
            <Grid item xs={12} md={5}>
              <motion.div variants={itemVariants}>
                <GlassyBlobBackground
                  colorSet="cool"
                  intensity="light"
                  blobCount={3}
                  containerSx={{
                    height: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: '16px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      bgcolor: 'transparent'
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {t('contact.getInTouch')}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                      非常感谢您的关注，如果您有任何问题或合作意向，请随时通过以下方式与我联系。
                    </Typography>

                    <Box sx={{ flex: 1 }}>
                      {contactMethods.map((method, index) => (
                        <motion.div
                          key={method.title}
                          variants={itemVariants}
                          custom={index}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 3,
                              p: 2,
                              borderRadius: '12px',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                bgcolor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                              }
                            }}
                          >
                            <Box
                              sx={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                color: method.color,
                                mr: 3,
                                flexShrink: 0
                              }}
                            >
                              {method.icon}
                            </Box>

                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                {method.title}
                              </Typography>
                              {method.link ? (
                                <AnimatedLink
                                  to={method.link}
                                  external={method.title === t('contact.github')}
                                  underlineColor={method.color}
                                >
                                  {method.value}
                                </AnimatedLink>
                              ) : (
                                <Typography variant="body1" fontWeight="medium">
                                  {method.value}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </Paper>
                </GlassyBlobBackground>
              </motion.div>
            </Grid>

            {/* 联系表单 */}
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <GlassyBlobBackground
                  colorSet="primary"
                  intensity="light"
                  blobCount={4}
                  containerSx={{
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: '16px',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      bgcolor: 'transparent'
                    }}
                  >
                    <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative', zIndex: 1 }}>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        发送消息
                      </Typography>

                      <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        您可以通过下面的表单直接向我发送消息，我会尽快回复您。邮件将发送至 solowzl@outlook.com
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="您的姓名"
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
                            label="您的邮箱"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                            type="email"
                            disabled={isSubmitting}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="主题"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            disabled={isSubmitting}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="消息内容"
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
                                boxShadow: '0 10px 15px -3px rgba(67, 56, 202, 0.2)'
                              }}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? '发送中...' : '发送消息'}
                            </Button>
                          </motion.div>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </GlassyBlobBackground>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* 成功提交时的彩带动画 */}
      <Confetti
        active={showConfetti}
        duration={4000}
        pieces={200}
        onComplete={() => setShowConfetti(false)}
      />

      {/* 提示信息 */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            alignItems: 'center',
            borderRadius: '10px',
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
          icon={snackbar.severity === 'success' ? <FiCheckCircle /> : undefined}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;
