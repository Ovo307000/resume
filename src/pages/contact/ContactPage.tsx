import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  CircularProgress,
  alpha,
  useMediaQuery,
  useTheme as useMuiTheme,
  Tabs,
  Tab,
  Divider
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
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUser,
  FiInfo
} from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import Confetti from '../../components/ui/animations/Confetti';
import { useCopyNotification } from '../../contexts/CopyNotificationContext';
import PageTransition from '../../components/ui/transitions/PageTransition';
import ContactPageTitle from '../../components/ui/contact/ContactPageTitle';

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
    linkedin?: string;
    twitter?: string;
  };
}

/**
 * 全新设计的联系我页面
 * 特点：
 * - 分区域展示不同联系途径
 * - 流畅的动画和过渡
 * - 响应式设计适应各种设备
 */
const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { copyToClipboard } = useCopyNotification();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // 处理tab切换
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
      // 模拟API调用成功
      await new Promise(resolve => setTimeout(resolve, 1000));

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
    } catch (error) {
      console.error('Error sending email:', error);
      copyToClipboard('发送邮件失败，请稍后再试', '错误');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 社交媒体数据
  const socialLinks: SocialLink[] = [
    {
      icon: <FiMail size={20} />,
      name: t('contact.email', '邮箱'),
      link: `mailto:${data.email}`,
      color: '#EA4335'
    },
    {
      icon: <FiPhone size={20} />,
      name: t('contact.phone', '电话'),
      link: `tel:${data.phone}`,
      color: '#34A853'
    },
    data.github && {
      icon: <FiGithub size={20} />,
      name: 'GitHub',
      link: data.github,
      color: isDark ? '#fff' : '#333'
    },
    data.wechat && {
      icon: <FiMessageSquare size={20} />,
      name: t('contact.wechat', '微信'),
      link: `weixin://`,
      color: '#07C160'
    }
  ].filter(Boolean) as SocialLink[];

  // 页面主要内容区域
  const renderContactInfo = () => {
    return (
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 3,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '40px',
                height: '3px',
                borderRadius: '2px',
                bgcolor: 'primary.main'
              }
            }}
          >
            {t('contact.connectWithMe', '联系方式')}
          </Typography>

          <Grid container spacing={2}>
            {socialLinks.map((social, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
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
                      handleCopyToClipboard(textToCopy, `已复制${social.name}`);
                    }
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      bgcolor: alpha(social.color, isDark ? 0.12 : 0.08),
                      border: '1px solid',
                      borderColor: alpha(social.color, isDark ? 0.2 : 0.1),
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 10px 25px ${alpha(social.color, isDark ? 0.2 : 0.12)}`,
                        bgcolor: alpha(social.color, isDark ? 0.15 : 0.1)
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: alpha(social.color, isDark ? 0.2 : 0.15),
                          color: social.color,
                          mr: 2
                        }}
                      >
                        {social.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            mb: 0.5,
                            color: isDark ? alpha('#fff', 0.9) : alpha('#000', 0.9)
                          }}
                        >
                          {social.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isDark ? alpha('#fff', 0.7) : alpha('#000', 0.7),
                            fontFamily: 'monospace',
                            maxWidth: '200px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {social.name === 'GitHub'
                            ? data.githubUsername
                            : social.name === t('contact.email', '邮箱')
                            ? data.email
                            : social.name === t('contact.phone', '电话')
                            ? data.phone
                            : social.name === t('contact.wechat', '微信')
                            ? data.wechat
                            : social.link}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      component={motion.div}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(social.color, isDark ? 0.15 : 0.1),
                        color: social.color,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: alpha(social.color, isDark ? 0.25 : 0.15)
                        }
                      }}
                    >
                      {social.name === 'GitHub' ? <FiExternalLink size={20} /> : <FiCopy size={20} />}
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 可用性信息 */}
        <Box sx={{ mt: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: isDark ? alpha('#1a1a2e', 0.3) : alpha('#f5f5f9', 0.7),
              border: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              boxShadow: isDark
                ? '0 4px 20px rgba(0, 0, 0, 0.2)'
                : '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600}>
              {t('contact.availability.title', '我的可用性')}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2.5} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      mr: 2,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)',
                      color: '#22c55e'
                    }}
                  >
                    <FiClock size={20} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {t('contact.availability.response', '响应时间')}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('contact.availability.responseTime', '24小时内')}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      mr: 2,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)',
                      color: '#6366F1'
                    }}
                  >
                    <FiCalendar size={20} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {t('contact.availability.schedule', '工作时间')}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('contact.availability.workHours', '周一至周五 9:00-18:00')}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      mr: 2,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: isDark ? 'rgba(244, 63, 94, 0.2)' : 'rgba(244, 63, 94, 0.1)',
                      color: '#F43F5E'
                    }}
                  >
                    <FiMapPin size={20} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {t('contact.availability.location', '所在地区')}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('contact.availability.locationValue', '北京, 中国')}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    );
  };

  // 联系表单
  const renderContactForm = () => {
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ height: '100%' }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: isDark ? alpha('#6366F1', 0.06) : alpha('#6366F1', 0.03),
            border: '1px solid',
            borderColor: isDark ? alpha('#6366F1', 0.15) : alpha('#6366F1', 0.08),
            boxShadow: isDark
              ? '0 8px 32px rgba(0, 0, 0, 0.2)'
              : '0 8px 32px rgba(0, 0, 0, 0.05)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at center, ${alpha('#6366F1', 0.15)}, transparent 70%)`,
              opacity: 0.6,
              transition: 'opacity 0.3s ease',
              zIndex: 0
            }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.15)',
                    color: '#6366F1',
                    mr: 2
                  }}
                >
                  <FiMessageSquare size={24} />
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {t('contact.sendMessage', '发送消息')}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ mb: 4 }}
              >
                {t('contact.fillForm', '填写下面的表单，我会尽快回复您的消息。')}
              </Typography>
            </motion.div>

            {formSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  textAlign: 'center',
                  flex: 1
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1
                    }}
                  >
                    <FiSend color="#22c55e" size={36} />
                  </motion.div>
                </Box>
                <Typography variant="h5" gutterBottom fontWeight={700}>
                  {t('contact.messageSent', '消息已发送！')}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  {t('contact.thankYou', '感谢您的留言，我会尽快回复。')}
                </Typography>
              </motion.div>
            ) : (
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('contact.form.name', '姓名')}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                      disabled={isSubmitting}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1, color: 'text.secondary' }}>
                            <FiUser size={18} />
                          </Box>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('contact.form.email', '邮箱')}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                      disabled={isSubmitting}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1, color: 'text.secondary' }}>
                            <FiMail size={18} />
                          </Box>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={t('contact.form.subject', '主题')}
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                      disabled={isSubmitting}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1, color: 'text.secondary' }}>
                            <FiInfo size={18} />
                          </Box>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={t('contact.form.message', '消息内容')}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                      multiline
                      rows={5}
                      disabled={isSubmitting}
                      sx={{ flexGrow: 1 }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 'auto', pt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isSubmitting}
                      endIcon={isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <FiSend />
                      )}
                      sx={{
                        borderRadius: 12,
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        boxShadow: isDark
                          ? '0 6px 15px rgba(99, 102, 241, 0.3)'
                          : '0 6px 15px rgba(99, 102, 241, 0.2)',
                        background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
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
                    >
                      {isSubmitting ? t('contact.sending', '发送中...') : t('contact.send', '发送消息')}
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    );
  };

  return (
    <PageTransition mode="fade">
      <Box
        sx={{
          minHeight: '100vh',
          pt: { xs: 4, md: 6 },
          pb: { xs: 6, md: 8 }
        }}
      >
        <Container maxWidth="lg">
          {/* 页面标题 - 使用专用标题组件 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ContactPageTitle withAnimation={true} />
          </motion.div>

          {isMobile ? (
            <Box>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  centered
                  sx={{
                    mb: 4,
                    borderRadius: 12,
                    overflow: 'hidden',
                    bgcolor: isDark ? alpha('#ffffff', 0.05) : alpha('#000000', 0.03),
                    '.MuiTabs-flexContainer': {
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                      borderRadius: 12,
                    },
                    '.MuiTabs-indicator': {
                      height: 0
                    },
                    '.MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      '&.Mui-selected': {
                        bgcolor: isDark ? alpha('#ffffff', 0.08) : alpha('#000000', 0.06),
                        color: isDark ? 'primary.light' : 'primary.main',
                      }
                    }
                  }}
                >
                  <Tab
                    label={t('contact.tabs.info', '联系方式')}
                    icon={<FiInfo size={16} />}
                    iconPosition="start"
                  />
                  <Tab
                    label={t('contact.tabs.message', '发送消息')}
                    icon={<FiMessageSquare size={16} />}
                    iconPosition="start"
                  />
                </Tabs>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {activeTab === 0 ? renderContactInfo() : renderContactForm()}
                </motion.div>
              </AnimatePresence>
            </Box>
          ) : (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {renderContactInfo()}
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {renderContactForm()}
                </motion.div>
              </Grid>
            </Grid>
          )}
        </Container>

        {/* 成功提交时的彩带动画 */}
        {showConfetti && <Confetti />}
      </Box>
    </PageTransition>
  );
};

export default ContactPage;
