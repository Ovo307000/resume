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
  CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  FiMail,
  FiPhone,
  FiGithub,
  FiMessageSquare,
  FiSend,
  FiCopy,
  FiExternalLink
} from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import Confetti from '../../components/ui/animations/Confetti';
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import CopyableLink from '../../components/ui/common/CopyableLink';
// 导入全局复制通知Hook
import { useCopyNotification } from '../../contexts/CopyNotificationContext';
import axios from 'axios';

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
  // 使用全局复制通知
  const { copyToClipboard } = useCopyNotification();

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
        // 重置表单
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
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

  return (
    <Box component="main" sx={{ flexGrow: 1, pt: { xs: 6, md: 10 }, pb: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 4,
              textAlign: 'center',
              fontWeight: 700
            }}
          >
            {t('contact.title')}
          </Typography>

          <Grid container spacing={4}>
            {/* 联系信息卡片 */}
            <Grid item xs={12} md={5}>
              <motion.div variants={itemVariants}>
                <GlassyBlobBackground
                  colorSet="cool"
                  intensity="light"
                  blobCount={3}
                  containerSx={{
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      height: '100%',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        mb: 2
                      }}
                    >
                      {t('contact.getInTouch', '联系方式')}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                      sx={{
                        mb: 3,
                        maxWidth: '90%'
                      }}
                    >
                      {t('contact.reachOut', '您可以通过以下方式联系我，我会尽快回复您的消息。')}
                    </Typography>

                    <Box sx={{ mt: 3 }}>
                      {contactMethods.map((method, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          whileHover={{ x: 5, transition: { type: 'spring', stiffness: 400 } }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 3,
                              p: 2,
                              borderRadius: 2,
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
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      height: '100%',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        mb: 2
                      }}
                    >
                      {t('contact.sendMessage', '发送消息')}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                      sx={{
                        mb: 3,
                        maxWidth: '90%'
                      }}
                    >
                      {t('contact.fillForm', '填写下面的表单，我会尽快回复您的消息。')}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
        duration={3000}
        pieces={200}
        onComplete={() => setShowConfetti(false)}
      />
    </Box>
  );
};

export default ContactPage;
