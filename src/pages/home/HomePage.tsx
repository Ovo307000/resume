import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiGithub, FiMail, FiPhone, FiDownload } from 'react-icons/fi';
import { SiWechat } from 'react-icons/si';
import GlassPanel from '../../components/ui/glass/GlassPanel';
import { FaJava, FaDocker } from 'react-icons/fa';
import { SiSpring, SiMysql } from 'react-icons/si';
import ProfileAvatar from '../../components/ui/ProfileAvatar';
import TypedText from '../../components/ui/common/TypedText';
import CustomTooltip from '../../components/ui/common/CustomTooltip';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

interface HomePageProps {
  data: {
    name: string;
    label: string;
    summary: string;
    email: string;
    phone: string;
    github: string;
    githubUsername?: string;
    wechat?: string;
  };
}

// 社交媒体链接接口
interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
  onClick?: () => void;
}

/**
 * 主页组件
 */
const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [roleIndex, setRoleIndex] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // 获取github用户名
  const githubUsername = data.githubUsername || (data.github && data.github.includes('github.com/')
    ? data.github.split('github.com/')[1]
    : data.github);

  // 角色列表
  const roles = [
    data.label,
    t('home.role_2', 'Java 工程师'),
    t('home.role_3', '后端开发者')
  ];

  // 每3秒切换一次角色
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  // 名字部分渐变色
  const nameGradient = theme === 'dark'
    ? 'linear-gradient(90deg, #f0f0f0 0%, #a0a0ff 100%)'
    : 'linear-gradient(90deg, #303030 0%, #5050ff 100%)';

  // 动画变体
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const roleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // 社交媒体链接
  const socialLinks: SocialLink[] = [
    { icon: <FiGithub size={20} />, url: data.github && data.github.startsWith('http') ? data.github : `https://github.com/${githubUsername}`, label: 'GitHub' },
    {
      icon: <FiMail size={20} />,
      url: `mailto:${data.email}`,
      label: 'Email',
      onClick: () => {
        navigator.clipboard.writeText(data.email)
          .then(() => {
            setSnackbar({ open: true, message: `邮箱 ${data.email} 已复制到剪贴板` });
          })
          .catch(err => {
            console.error('复制失败:', err);
            setSnackbar({ open: true, message: '复制失败，请手动复制' });
          });
      }
    },
    {
      icon: <FiPhone size={20} />,
      url: `tel:${data.phone}`,
      label: 'Phone',
      onClick: () => {
        navigator.clipboard.writeText(data.phone)
          .then(() => {
            setSnackbar({ open: true, message: `电话 ${data.phone} 已复制到剪贴板` });
          })
          .catch(err => {
            console.error('复制失败:', err);
            setSnackbar({ open: true, message: '复制失败，请手动复制' });
          });
      }
    }
  ];

  // 如果有微信，添加到社交链接中
  if (data.wechat) {
    const wechatId = data.wechat; // 将可能的undefined值转换为确定的string
    socialLinks.push({
      icon: <SiWechat size={20} />,
      url: '#',
      label: wechatId,
      onClick: () => {
        navigator.clipboard.writeText(wechatId)
          .then(() => {
            setSnackbar({ open: true, message: `微信号 ${wechatId} 已复制到剪贴板` });
          })
          .catch(err => {
            console.error('复制失败:', err);
            setSnackbar({ open: true, message: '复制失败，请手动复制' });
          });
      }
    });
  }

  // 添加彩带动画函数
  const runConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // 关闭提示
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        pt: { xs: 4, md: 8 },
        pb: { xs: 6, md: 10 },
        overflow: 'hidden'
      }}
    >
      {/* 顶部英雄区域 */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: { xs: 8, md: 12 } }}
        >
          {/* 左侧内容：介绍文本和社交链接 */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={contentVariants}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 1,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {t('hero.greeting', '👋 你好，我是')}{' '}
                  <Box
                    component="span"
                    sx={{
                      background: nameGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {data.name}
                  </Box>
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ height: '2.5rem', mb: 3 }}>
                  <motion.div
                    key={roleIndex}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={roleVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        fontWeight: 500
                      }}
                    >
                      {roles[roleIndex]}
                    </Typography>
                  </motion.div>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    maxWidth: 580,
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    lineHeight: 1.6
                  }}
                >
                  <TypedText
                    strings={[data.summary]}
                    typeSpeed={20}
                    startDelay={800}
                    loop={false}
                    showCursor={false}
                  />
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
                  <Link to="/about" style={{ textDecoration: 'none' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 3,
                        py: 1.2,
                        borderRadius: '50px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        color: '#fff',
                        background: theme === 'dark'
                          ? 'linear-gradient(90deg, #7928CA 0%, #FF0080 100%)'
                          : 'linear-gradient(90deg, #0070F3 0%, #00DFD8 100%)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 7px 14px rgba(0,0,0,0.12)'
                        }
                      }}
                    >
                      {t('common.viewDetails', '查看详细')}
                      <FiArrowRight style={{ marginLeft: 8 }} />
                    </Box>
                  </Link>

                  <Box
                    component="a"
                    href="/Resume.pdf"
                    download="赵东安-Java后端开发工程师-简历.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setTimeout(() => runConfetti(), 300);
                    }}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 3,
                      py: 1.2,
                      borderRadius: '50px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      color: theme === 'dark' ? '#fff' : '#fff',
                      background: theme === 'dark'
                        ? 'linear-gradient(135deg, #333 0%, #666 100%)'
                        : 'linear-gradient(135deg, #444 0%, #777 100%)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
                        borderRadius: '50px',
                      },
                      '&:hover': {
                        backgroundColor: theme === 'dark' ? '#555' : '#666',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 7px 14px rgba(0,0,0,0.2)',
                        '& .download-icon': {
                          transform: 'translateY(2px)'
                        }
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {t('common.downloadPdf', '下载简历')}
                    <Box
                      component="span"
                      className="download-icon"
                      sx={{
                        display: 'inline-flex',
                        marginLeft: 1,
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <FiDownload size={18} />
                    </Box>
                  </Box>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    mb: { xs: 3, md: 0 }
                  }}
                >
                  {socialLinks.map((link, index) => (
                    <CustomTooltip key={index} title={link.label} placement="top">
                      <Box
                        component={link.onClick ? "button" : "a"}
                        href={link.onClick ? undefined : link.url}
                        target={link.url && link.url.startsWith('http') ? "_blank" : undefined}
                        rel={link.url && link.url.startsWith('http') ? "noopener noreferrer" : undefined}
                        onClick={link.onClick}
                        sx={{
                          width: 42,
                          height: 42,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '12px',
                          fontSize: 22,
                          backgroundColor: theme === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.03)',
                          color: theme === 'dark' ? '#e0e0ff' : '#3030ff',
                          transition: 'all 0.3s ease',
                          border: 'none',
                          cursor: 'pointer',
                          outline: 'none',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            backgroundColor: theme === 'dark'
                              ? 'rgba(255, 255, 255, 0.1)'
                              : 'rgba(0, 0, 0, 0.1)',
                            color: theme === 'dark' ? '#a0a0ff' : '#5050ff',
                            boxShadow: theme === 'dark'
                              ? '0 5px 15px rgba(255, 255, 255, 0.1)'
                              : '0 5px 15px rgba(0, 0, 0, 0.1)'
                          }
                        }}
                      >
                        {link.icon}
                      </Box>
                    </CustomTooltip>
                  ))}
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          {/* 右侧内容：头像 */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* 移动端显示的头像（xs可见，md隐藏） */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, width: '100%', textAlign: 'center' }}>
              <ProfileAvatar
                imageSrc="/profile_avatar.png"
                size="large"
                animate={true}
                alt={data.name}
              />
            </Box>

            {/* 桌面端显示的头像（xs隐藏，md可见） */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, width: '100%', textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ProfileAvatar
                  imageSrc="/profile_avatar.png"
                  size="xlarge"
                  animate={true}
                  alt={data.name}
                  sx={{ mx: 'auto' }}
                />
              </motion.div>
            </Box>
          </Grid>
        </Grid>

        {/* 统计数据 */}
        <Grid container spacing={3} sx={{ mb: 16 }}>
          {[
            {
              icon: <FaJava size={36} />,
              value: '5',
              label: t('home.stats.experience', '年Java经验'),
              tooltip: '5年企业级Java开发经验，精通Spring Boot框架'
            },
            {
              icon: <SiSpring size={36} />,
              value: '20+',
              label: t('home.stats.projects', '个项目经验'),
              tooltip: '参与或主导过20多个大中型项目的设计与开发'
            },
            {
              icon: <SiMysql size={36} />,
              value: '10+',
              label: t('home.stats.databases', '个数据库项目'),
              tooltip: '精通MySQL、Redis等多种数据库的设计优化和性能调优'
            },
            {
              icon: <FaDocker size={36} />,
              value: '3+',
              label: t('home.stats.deployments', '年容器部署经验'),
              tooltip: '3年以上Docker容器化部署经验，熟悉CI/CD流程'
            }
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <CustomTooltip title={stat.tooltip} placement="top">
                <div>
                  <GlassPanel sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme === 'dark'
                        ? '0 10px 30px rgba(0, 0, 0, 0.3)'
                        : '0 10px 30px rgba(0, 0, 0, 0.1)',
                    },
                    transition: 'all 0.3s ease'
                  }}>
                    <Box
                      sx={{
                        color: theme === 'dark' ? '#a0a0ff' : '#5050ff',
                        mb: 2
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        fontWeight: 700,
                        mb: 1
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        fontWeight: 500
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </GlassPanel>
                </div>
              </CustomTooltip>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 添加复制成功的Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiAlert-root': {
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
            backdropFilter: 'blur(8px)',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(0, 0, 0, 0.05)',
            backgroundColor: theme === 'dark' ? 'rgba(50, 50, 70, 0.9)' : 'rgba(255, 255, 255, 0.9)'
          }
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: '100%',
            '& .MuiAlert-icon': {
              color: theme === 'dark' ? '#a0ff9c' : '#00a152'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;

