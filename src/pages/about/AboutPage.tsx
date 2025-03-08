import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  Chip,
  Divider,
  useTheme as useMuiTheme,
  Snackbar,
  Alert
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import {
  FiBriefcase, FiAward, FiCode,
  FiUser, FiBook, FiHeart, FiTarget,
  FiMail, FiGithub, FiPhone
} from 'react-icons/fi';
import { SiWechat } from 'react-icons/si';
import GlassPanel from '../../components/ui/glass/GlassPanel';
import ProfileAvatar from '../../components/ui/ProfileAvatar';
import AnimatedLink from '../../components/ui/common/AnimatedLink';
import PageTransition from '../../components/ui/transitions/PageTransition';

interface AboutPageProps {
  data: {
    name: string;
    label: string;
    summary: string;
    email: string;
    phone: string;
    github: string;
    githubUsername?: string;
    wechat: string;
  };
}

interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: React.ReactNode;
}

/**
 * 关于我页面组件
 */
const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // GitHub用户名
  const githubUsername = data.githubUsername || (data.github && data.github.includes('github.com/')
    ? data.github.split('github.com/')[1]
    : data.github);

  // 个人特质
  const traits = [
    { name: t('about.traits.problem_solving', '问题解决能力'), icon: <FiTarget /> },
    { name: t('about.traits.teamwork', '团队协作'), icon: <FiHeart /> },
    { name: t('about.traits.continuous_learning', '持续学习'), icon: <FiBook /> },
    { name: t('about.traits.code_quality', '代码质量'), icon: <FiCode /> }
  ];

  // 技能数据
  const skills: Skill[] = [
    { name: 'Java', level: 90, category: 'language', icon: <FiCode /> },
    { name: 'Spring', level: 85, category: 'framework', icon: <FiCode /> },
    { name: 'MySQL', level: 80, category: 'database', icon: <FiCode /> },
    { name: 'Redis', level: 75, category: 'database', icon: <FiCode /> },
    { name: 'Docker', level: 70, category: 'devops', icon: <FiCode /> },
    { name: 'Git', level: 85, category: 'tool', icon: <FiCode /> }
  ];

  // 工作经验
  const experiences = [
    {
      title: "Java 后端开发工程师",
      company: "某科技公司",
      period: "2022年4月 - 至今",
      description: "负责公司核心服务的后端开发和维护，使用Spring Boot框架开发RESTful API，参与微服务架构设计，优化系统性能，提高服务可用性。",
      achievements: [
        "重构遗留代码，提高系统性能30%",
        "构建自动化测试流程，减少80%的回归测试时间",
        "设计并实现了分布式缓存解决方案"
      ],
      technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"]
    },
    {
      title: "Java 开发实习生",
      company: "某网络科技有限公司",
      period: "2021年7月 - 2022年3月",
      description: "参与公司电商平台后端开发，负责订单模块API开发和优化，协助资深开发人员进行系统设计和代码审查。",
      achievements: [
        "独立开发订单管理模块，获得导师好评",
        "参与性能优化，帮助系统支持双倍并发量",
        "编写详细的技术文档，降低新人学习成本"
      ],
      technologies: ["Java", "Spring MVC", "MyBatis", "MySQL"]
    }
  ];

  // 复制文本到剪贴板
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setSnackbar({ open: true, message });
      })
      .catch(err => {
        console.error('复制失败:', err);
        setSnackbar({ open: true, message: '复制失败，请手动复制' });
      });
  };

  // 关闭提示
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // 联系方式
  const contactInfo = [
    { icon: <FiMail size={22} />, label: t('about.email'), value: data.email, link: `mailto:${data.email}`, onClick: () => copyToClipboard(data.email, `邮箱 ${data.email} 已复制到剪贴板`) },
    { icon: <FiPhone size={22} />, label: t('about.phone'), value: data.phone, link: `tel:${data.phone}`, onClick: () => copyToClipboard(data.phone, `电话 ${data.phone} 已复制到剪贴板`) },
    { icon: <FiGithub size={22} />, label: t('about.github'), value: githubUsername, link: data.github, onClick: () => copyToClipboard(githubUsername, `GitHub用户名 ${githubUsername} 已复制到剪贴板`) },
    {
      icon: <SiWechat size={22} />,
      label: t('about.wechat'),
      value: data.wechat,
      link: '#',
      onClick: () => copyToClipboard(data.wechat, `微信号 ${data.wechat} 已复制到剪贴板`)
    }
  ];

  // 动画控制
  const controls = {
    skillBar: useAnimation(),
    timeline: useAnimation(),
    traits: useAnimation(),
    contact: useAnimation()
  };

  // 引用元素来检测是否在视图中
  const refs = {
    skillRef: useRef(null),
    timelineRef: useRef(null),
    traitsRef: useRef(null),
    contactRef: useRef(null)
  };

  // 检测元素是否在视图中
  const isInView = {
    skill: useInView(refs.skillRef, { once: true, amount: 0.3 }),
    timeline: useInView(refs.timelineRef, { once: true, amount: 0.1 }),
    traits: useInView(refs.traitsRef, { once: true, amount: 0.3 }),
    contact: useInView(refs.contactRef, { once: true, amount: 0.3 })
  };

  // 根据元素是否在视图中控制动画
  useEffect(() => {
    if (isInView.skill) {
      controls.skillBar.start('visible');
    }
    if (isInView.timeline) {
      controls.timeline.start('visible');
    }
    if (isInView.traits) {
      controls.traits.start('visible');
    }
    if (isInView.contact) {
      controls.contact.start('visible');
    }
  }, [isInView.skill, isInView.timeline, isInView.traits, isInView.contact]);

  // 技能条动画
  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (custom: number) => ({
      width: `${custom}%`,
      transition: {
        duration: 1.5,
        ease: [0.165, 0.84, 0.44, 1],
        delay: 0.3
      }
    })
  };

  // 时间线动画
  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  // 特质动画
  const traitsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const traitItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10
      }
    }
  };

  // 联系信息动画
  const contactVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <PageTransition mode="fade">
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          {/* 页面标题 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                mb: 2
              }}
            >
              {t('about.title', '关于我')}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                fontWeight: 'medium',
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                mb: 6
              }}
            >
              {t('about.subtitle', '我的旅程和驱动力')}
            </Typography>
          </motion.div>

          {/* 个人简介和头像 */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {/* 左侧头像 */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ProfileAvatar
                    size="xlarge"
                    imageSrc="/profile_avatar.png"
                    alt={t('home.avatar_alt', '个人头像')}
                    animate={true}
                    showBorder={true}
                    sx={{ mb: 3 }}
                  />

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      textAlign: 'center'
                    }}
                  >
                    {data.name}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{
                      fontWeight: 'medium',
                      mb: 3,
                      textAlign: 'center'
                    }}
                  >
                    {data.label}
                  </Typography>

                  {/* 联系信息 */}
                  <Box ref={refs.contactRef} sx={{ width: '100%' }}>
                    <motion.div
                      initial="hidden"
                      animate={controls.contact}
                      variants={contactVariants}
                    >
                      <Divider textAlign="left" sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="primary" fontWeight="bold">
                          {t('about.contact', '联系方式')}
                        </Typography>
                      </Divider>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2
                        }}
                      >
                        {contactInfo.map((item, index) => (
                          <motion.div
                            key={index}
                            variants={contactItemVariants}
                          >
                            <AnimatedLink
                              to={item.link}
                              variant="button"
                              onClick={item.onClick}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                padding: '8px 12px',
                                borderRadius: '8px',
                                backgroundColor: theme === 'dark'
                                  ? 'rgba(255, 255, 255, 0.05)'
                                  : 'rgba(0, 0, 0, 0.03)',
                                color: 'text.primary',
                                textDecoration: 'none'
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 36,
                                  height: 36,
                                  borderRadius: '10px',
                                  backgroundColor: theme === 'dark'
                                    ? 'rgba(255, 255, 255, 0.1)'
                                    : 'rgba(0, 0, 0, 0.05)',
                                  color: 'primary.main'
                                }}
                              >
                                {item.icon}
                              </Box>
                              <Box>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ display: 'block' }}
                                >
                                  {item.label}
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                  {item.value}
                                </Typography>
                              </Box>
                            </AnimatedLink>
                          </motion.div>
                        ))}
                      </Box>
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* 右侧简介和特质 */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <GlassPanel
                  variant="elevated"
                  intensity="light"
                  sx={{ p: 3, borderRadius: '16px', mb: 4 }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <FiUser size={22} color={muiTheme.palette.primary.main} />
                    {t('about.introduction', '我的自我介绍')}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      lineHeight: 1.8
                    }}
                  >
                    {data.summary}
                  </Typography>

                  <Typography variant="body1" paragraph>
                    {t('about.philosophyText', '我坚信编写干净、可维护的代码并创造直观的用户体验。我不断学习新技术和方法来提升我的技能并提供更好的解决方案。')}
                  </Typography>
                </GlassPanel>

                {/* 个人特质 */}
                <Box ref={refs.traitsRef} sx={{ mb: 4 }}>
                  <motion.div
                    initial="hidden"
                    animate={controls.traits}
                    variants={traitsVariants}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <FiHeart size={22} color={muiTheme.palette.primary.main} />
                      {t('about.traits', '个人特质')}
                    </Typography>

                    <Grid container spacing={2}>
                      {traits.map((trait, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <motion.div variants={traitItemVariants}>
                            <GlassPanel
                              variant="elevated"
                              intensity="medium"
                              hoverEffect={true}
                              sx={{
                                p: 2,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 40,
                                  height: 40,
                                  borderRadius: '10px',
                                  backgroundColor: theme === 'dark'
                                    ? 'rgba(255, 255, 255, 0.1)'
                                    : 'rgba(0, 0, 0, 0.04)',
                                  color: 'primary.main'
                                }}
                              >
                                {trait.icon}
                              </Box>
                              <Typography variant="body1" fontWeight="medium">
                                {trait.name}
                              </Typography>
                            </GlassPanel>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </motion.div>
                </Box>

                {/* 技能展示 */}
                <Box ref={refs.skillRef} sx={{ mb: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <FiCode size={22} color={muiTheme.palette.primary.main} />
                    {t('skills.title', '技能')}
                  </Typography>

                  <Grid container spacing={2}>
                    {skills.map((skill, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ mb: 1.5 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mb: 0.5
                            }}
                          >
                            <Typography variant="body2" fontWeight="medium">
                              {skill.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {skill.level}%
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              height: 10,
                              backgroundColor: theme === 'dark'
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(0, 0, 0, 0.05)',
                              borderRadius: 5,
                              overflow: 'hidden'
                            }}
                          >
                            <motion.div
                              custom={skill.level}
                              variants={skillBarVariants}
                              initial="hidden"
                              animate={controls.skillBar}
                              style={{
                                height: '100%',
                                backgroundColor: muiTheme.palette.primary.main,
                                borderRadius: 5
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          {/* 工作经验时间线 */}
          <Box ref={refs.timelineRef} sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                mb: 4,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {t('about.experience', '职业经历')}
            </Typography>

            <motion.div
              initial="hidden"
              animate={controls.timeline}
              variants={timelineVariants}
            >
              <Timeline position="alternate">
                {experiences.map((exp, index) => (
                  <motion.div key={index} variants={timelineItemVariants}>
                    <TimelineItem>
                      <TimelineOppositeContent color="text.secondary">
                        <Typography variant="body2" fontWeight="medium">
                          {exp.period}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color={index % 2 === 0 ? "primary" : "secondary"}>
                          <FiBriefcase />
                        </TimelineDot>
                        {index < experiences.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <GlassPanel
                          variant="elevated"
                          intensity={index % 2 === 0 ? "light" : "medium"}
                          hoverEffect={true}
                          sx={{
                            p: 3,
                            borderRadius: '16px',
                            mb: 2,
                            width: '100%'
                          }}
                        >
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            {exp.title}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ mb: 1, fontWeight: 'medium' }}
                          >
                            {exp.company}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {exp.description}
                          </Typography>
                          <Box sx={{ mb: 2 }}>
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
                            >
                              <FiAward size={16} />
                              {t('about.achievements', '成就')}:
                            </Typography>
                            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                              {exp.achievements.map((achievement, i) => (
                                <Typography
                                  component="li"
                                  variant="body2"
                                  key={i}
                                  sx={{ mb: 0.5 }}
                                >
                                  {achievement}
                                </Typography>
                              ))}
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {exp.technologies.map((tech, i) => (
                              <Chip
                                key={i}
                                label={tech}
                                size="small"
                                color={i % 2 === 0 ? "primary" : "secondary"}
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </GlassPanel>
                      </TimelineContent>
                    </TimelineItem>
                  </motion.div>
                ))}
              </Timeline>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* 微信号复制成功提示 */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageTransition>
  );
};

export default AboutPage;
