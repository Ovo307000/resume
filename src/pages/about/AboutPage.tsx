import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  Divider,
  useTheme as useMuiTheme
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
  FiCode,
  FiUser, FiBook, FiHeart, FiTarget,
  FiCoffee, FiGlobe, FiActivity, FiTrendingUp
} from 'react-icons/fi';
import GlassPanel from '../../components/ui/glass/GlassPanel';
import PageTransition from '../../components/ui/transitions/PageTransition';
import ExperienceCard from '../../components/ui/ExperienceCard';
import TraitCard from '../../components/ui/TraitCard';
import SkillCard from '../../components/ui/SkillCard';

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

  // 个人特质
  const traits = [
    { name: t('about.traits.problem_solving', '问题解决能力'), icon: <FiTarget /> },
    { name: t('about.traits.teamwork', '团队协作'), icon: <FiHeart /> },
    { name: t('about.traits.continuous_learning', '持续学习'), icon: <FiBook /> },
    { name: t('about.traits.code_quality', '代码质量'), icon: <FiCode /> },
    { name: t('about.traits.adaptability', '适应能力'), icon: <FiActivity /> },
    { name: t('about.traits.attention_to_detail', '注重细节'), icon: <FiTrendingUp /> },
    { name: t('about.traits.global_vision', '全球视野'), icon: <FiGlobe /> },
    { name: t('about.traits.passion', '热情'), icon: <FiCoffee /> }
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

  // 生成左侧的内容
  const renderLeftColumn = () => (
    <Box>
      {/* 个人特质 */}
      <Box ref={refs.traitsRef} sx={{ mb: 6 }}>
        <motion.div
          initial="hidden"
          animate={controls.traits}
          variants={traitsVariants}
        >
          <Divider textAlign="left" sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              {t('about.traitsTitle', '个人特质')}
            </Typography>
          </Divider>

          <Grid container spacing={2}>
            {traits.map((trait, index) => (
              <Grid item xs={12} key={index}>
                <motion.div variants={traitItemVariants}>
                  <TraitCard
                    name={trait.name}
                    icon={trait.icon}
                    index={index}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Box>
  );

  // 生成右侧的内容
  const renderRightColumn = () => (
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

      {/* 技能部分 */}
      <Box ref={refs.skillRef} sx={{ mb: 4 }}>
        <Divider textAlign="left" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="primary" fontWeight="bold">
            {t('skills.title', '技能')}
          </Typography>
        </Divider>

        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            name={skill.name}
            level={skill.level}
            icon={skill.icon}
            category={skill.category}
            delay={index * 0.1}
            index={index}
          />
        ))}
      </Box>
    </motion.div>
  );

  // 保留所有动画变体
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
              {renderLeftColumn()}
            </Grid>

            {/* 右侧简介和特质 */}
            <Grid item xs={12} md={8}>
              {renderRightColumn()}
            </Grid>
          </Grid>
      </Container>
    </Box>
    </PageTransition>
  );
};

export default AboutPage;
