import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiGithub, FiMail, FiPhone, FiCopy } from 'react-icons/fi';
import { SiWechat } from 'react-icons/si';
import GlassPanel from '../../components/ui/glass/GlassPanel';
import { FaJava, FaDocker } from 'react-icons/fa';
import { SiSpring, SiMysql } from 'react-icons/si';
import ProfileAvatar from '../../components/ui/ProfileAvatar';
import TypedText from '../../components/ui/common/TypedText';
import CustomTooltip from '../../components/ui/common/CustomTooltip';
import confetti from 'canvas-confetti';
// 导入全局复制通知Hook
import { useCopyNotification } from '../../contexts/CopyNotificationContext';
// 导入新的玻璃按钮组件
import GlassButton from '../../components/ui/common/GlassButton';

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

interface SocialLink {
  icon: React.ReactNode;
  url?: string;
  label: string;
  onClick?: () => void;
  needCopy?: boolean;
  copyIcon?: React.ReactNode;
  value?: string;
}

/**
 * 主页组件
 */
const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [roleIndex, setRoleIndex] = useState(0);
  // 使用全局复制通知
  const { copyToClipboard } = useCopyNotification();

  // 获取github用户名
  const githubUsername = data.githubUsername || (data.github && data.github.includes('github.com/')
    ? data.github.split('github.com/')[1]
    : data.github);

  // 角色列表
  const roles = [
    data.label,
    t('home.role_2', 'Java 开发工程师'),
    t('home.role_3', '全栈开发者')
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

  // 复制到剪贴板函数
  const handleCopyToClipboard = (text: string, label: string) => {
    if (!text) return;

    copyToClipboard(text, label).then(success => {
      if (success) {
        // 复制成功时触发微小彩带效果
        confetti({
          particleCount: 80,
          spread: 40,
          origin: { y: 0.6 },
          colors: ['#26c9fc', '#7b64ff', '#FFB6C1']
        });
      }
    });
  };

  // 社交媒体链接
  const socialLinks: SocialLink[] = [
    {
      icon: <FiGithub size={20} />,
      url: data.github && data.github.startsWith('http') ? data.github : `https://github.com/${githubUsername}`,
      label: 'GitHub',
      needCopy: false
    },
    {
      icon: <FiMail size={20} />,
      label: 'Email',
      needCopy: true,
      copyIcon: <FiCopy size={12} />,
      value: data.email,
      onClick: () => handleCopyToClipboard(data.email, 'Email')
    },
    {
      icon: <FiPhone size={20} />,
      label: 'Phone',
      needCopy: true,
      copyIcon: <FiCopy size={12} />,
      value: data.phone,
      onClick: () => handleCopyToClipboard(data.phone, 'Phone')
    }
  ];

  // 如果有微信，添加到社交链接中
  if (data.wechat) {
    const wechatId = data.wechat;
    socialLinks.push({
      icon: <SiWechat size={20} />,
      label: 'WeChat',
      needCopy: true,
      copyIcon: <FiCopy size={12} />,
      value: wechatId,
      onClick: () => handleCopyToClipboard(wechatId, 'WeChat')
    });
  }

  // 处理社交链接点击
  const handleSocialClick = (e: React.MouseEvent<HTMLElement>, link: SocialLink) => {
    if (link.needCopy && link.value) {
      e.preventDefault(); // 阻止默认行为
      copyToClipboard(link.value, link.label);
    } else if (link.onClick) {
      link.onClick();
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        pt: { xs: 2, sm: 4 },
        position: 'relative',
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                  {/* 了解更多按钮，使用GlassButton组件 */}
                  <GlassButton
                    to="/about"
                    variant="gradient"
                    size="medium"
                    icon={<FiArrowRight />}
                    iconPosition="end"
                    rounded={true}
                    hoverEffect={true}
                  >
                    {t('common.viewDetails', '了解更多')}
                  </GlassButton>

                  {/* 查看简历按钮，使用GlassButton组件 */}
                  <GlassButton
                    href="/files/Resume.pdf"
                    variant="default"
                    size="medium"
                    icon={<FiArrowRight />}
                    iconPosition="end"
                    rounded={true}
                    hoverEffect={true}
                    withConfetti={true}
                    confettiColors={['#6366F1', '#8B5CF6', '#EC4899', '#10B981']}
                    rgbBorder={true}
                  >
                    {t('common.viewPdf', '查看简历')}
                  </GlassButton>
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
                    <CustomTooltip
                      key={index}
                      title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {link.label}
                          {link.needCopy ? (
                            <Box component="span" sx={{ display: 'inline-flex', ml: 0.5, color: '#10B981' }}>
                              <FiCopy size={12} />
                            </Box>
                          ) : (
                            <Box component="span" sx={{ display: 'inline-flex', ml: 0.5, color: '#6366F1' }}>
                              <FiArrowRight size={12} />
                            </Box>
                          )}
                        </Box>
                      }
                      placement="top"
                    >
                      <motion.div
                        whileHover={{ y: -5, scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        style={{ display: 'inline-block' }}
                      >
                        <Box
                          component={link.needCopy ? "button" : "a"}
                          href={!link.needCopy ? link.url : undefined}
                          target={!link.needCopy && link.url?.startsWith('http') ? "_blank" : undefined}
                          rel={!link.needCopy && link.url?.startsWith('http') ? "noopener noreferrer" : undefined}
                          onClick={(e: React.MouseEvent<HTMLElement>) => handleSocialClick(e, link)}
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
                      </motion.div>
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
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  overflow: 'visible'
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    width: 200,
                    height: 200,
                    mx: 'auto',
                    borderRadius: '50%',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: 'transparent',
                    background: 'transparent',
                    backgroundClip: 'padding-box',
                    padding: '4px',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      zIndex: -1,
                      borderRadius: '50%',
                      background: 'linear-gradient(90deg, #6366F1, #3B82F6, #EC4899)',
                      backgroundSize: '200% 200%',
                      animation: 'rgbGlow 3s ease infinite',
                    },
                    '&:hover': {
                      boxShadow: `0 0 30px ${theme === 'dark'
                        ? 'rgba(123, 100, 255, 0.7)'
                        : 'rgba(123, 100, 255, 0.5)'}`,
                    }
                  }}
                >
                  <ProfileAvatar
                    imageSrc="/profile_avatar.png"
                    size="custom"
                    animate={true}
                    alt={data.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%'
                    }}
                  />
                </Card>
              </motion.div>
            </Box>

            {/* 桌面端显示的头像（xs隐藏，md可见） */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, width: '100%', textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  overflow: 'visible'
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    width: { md: 280, lg: 320 },
                    height: { md: 280, lg: 320 },
                    mx: 'auto',
                    borderRadius: '50%',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: 'transparent',
                    background: 'transparent',
                    backgroundClip: 'padding-box',
                    padding: '4px',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      zIndex: -1,
                      borderRadius: '50%',
                      background: 'linear-gradient(90deg, #6366F1, #3B82F6, #EC4899)',
                      backgroundSize: '200% 200%',
                      animation: 'rgbGlow 3s ease infinite',
                    },
                    '&:hover': {
                      boxShadow: `0 0 30px ${theme === 'dark'
                        ? 'rgba(123, 100, 255, 0.7)'
                        : 'rgba(123, 100, 255, 0.5)'}`,
                    }
                  }}
                >
                  <ProfileAvatar
                    imageSrc="/profile_avatar.png"
                    size="custom"
                    animate={true}
                    alt={data.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%'
                    }}
                  />
                </Card>
              </motion.div>
            </Box>
          </Grid>
        </Grid>

        {/* 统计数据 */}
        <Grid container spacing={3} sx={{ mb: 16 }}>
          {[
            {
              icon: <FaJava size={36} />,
              value: '3+',
              label: t('home.stats.experience', '年开发经验'),
              tooltip: '熟练掌握常用设计模式，拥有丰富的项目经验，致力于构建高性能、高可用的稳定系统',
              color: theme === 'dark' ? '#ff9d00' : '#ff6d00', // 橙色系
              gradient: theme === 'dark'
                ? 'linear-gradient(135deg, rgba(255, 157, 0, 0.15), rgba(255, 109, 0, 0.05))'
                : 'linear-gradient(135deg, rgba(255, 157, 0, 0.1), rgba(255, 109, 0, 0.02))'
            },
            {
              icon: <SiSpring size={36} />,
              value: '5+',
              label: t('home.stats.frameworks', '种技术栈'),
              tooltip: '精通Spring全家桶、MyBatis/Plus、React、Vue等框架，同时熟悉Redis、MySQL、MongoDB等数据库技术',
              color: theme === 'dark' ? '#4caf50' : '#2e7d32', // 绿色系
              gradient: theme === 'dark'
                ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(46, 125, 50, 0.05))'
                : 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(46, 125, 50, 0.02))'
            },
            {
              icon: <SiMysql size={36} />,
              value: '2',
              label: t('home.stats.projects', '个企业项目'),
              tooltip: '设计并实现Sky-Take-Out外卖系统与Lease公寓租赁平台等企业级项目，拥有完整的项目开发生命周期经验',
              color: theme === 'dark' ? '#2196f3' : '#1565c0', // 蓝色系
              gradient: theme === 'dark'
                ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.15), rgba(21, 101, 192, 0.05))'
                : 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(21, 101, 192, 0.02))'
            },
            {
              icon: <FaDocker size={36} />,
              value: '3+',
              label: t('home.stats.deployments', '种DevOps工具'),
              tooltip: '熟练使用Linux、Docker、Git等DevOps工具，掌握容器化部署与自动化流程，确保系统高效稳定运行',
              color: theme === 'dark' ? '#9c27b0' : '#6a1b9a', // 紫色系
              gradient: theme === 'dark'
                ? 'linear-gradient(135deg, rgba(156, 39, 176, 0.15), rgba(106, 27, 154, 0.05))'
                : 'linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(106, 27, 154, 0.02))'
            }
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <CustomTooltip title={stat.tooltip} placement="top">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <GlassPanel sx={{
                    p: { xs: 2, md: 3 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: stat.gradient,
                    border: `1px solid ${theme === 'dark'
                      ? `rgba(255, 255, 255, 0.08)`
                      : `rgba(0, 0, 0, 0.05)`}`,
                    '&:hover': {
                      boxShadow: `0 8px 25px ${stat.color}30`,
                      border: `1px solid ${stat.color}40`,
                      transform: 'translateY(-8px)'
                    },
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}>
                    <Box
                      sx={{
                        color: stat.color,
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: { xs: 60, md: 70 },
                        height: { xs: 60, md: 70 },
                        borderRadius: '50%',
                        background: theme === 'dark'
                          ? `rgba(255, 255, 255, 0.05)`
                          : `rgba(0, 0, 0, 0.03)`,
                        border: `1px solid ${stat.color}30`,
                        boxShadow: `0 4px 15px ${stat.color}20`,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {stat.icon}
                    </Box>

                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        backgroundImage: `linear-gradient(90deg, ${stat.color}, ${stat.color}aa)`,
                        backgroundClip: 'text',
                        color: 'transparent',
                        WebkitBackgroundClip: 'text',
                        mb: 1,
                        transition: 'all 0.3s ease',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {stat.value}
                    </Typography>

                    <Typography
                      sx={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                        fontWeight: 500,
                        fontSize: { xs: '0.95rem', md: '1rem' }
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </GlassPanel>
                </motion.div>
              </CustomTooltip>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;

