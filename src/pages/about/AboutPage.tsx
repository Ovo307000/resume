import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  Divider,
  useTheme as useMuiTheme,
  useMediaQuery
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  FiUser, FiBook, FiHeart, FiTarget,
  FiCoffee, FiGlobe, FiActivity, FiTrendingUp,
  FiFeather, FiZap
} from 'react-icons/fi';
import {
  DiJava, DiPython, DiMysql, DiRedis,
  DiDocker, DiGit, DiReact, DiMongodb,
  DiNodejs
} from 'react-icons/di';
import {
  SiSpring, SiKubernetes, SiJavascript,
  SiTypescript, SiVuedotjs, SiFlutter,
  SiGraphql, SiGo, SiNginx, SiLinux
} from 'react-icons/si';
import GlassPanel from '../../components/ui/glass/GlassPanel';
import PageTransition from '../../components/ui/transitions/PageTransition';
import ExperienceCard from '../../components/ui/ExperienceCard';
import TraitCard from '../../components/ui/TraitCard';
import MobileAboutCard from '../../components/ui/MobileAboutCard';
import EnhancedSkillBar from '../../components/ui/progress/EnhancedSkillBar';

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
  url?: string;
}

/**
 * 关于我页面组件
 */
const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 个人特质
  const traits = [
    { name: t('about.traits.problem_solving', '问题解决能力'), icon: <FiTarget /> },
    { name: t('about.traits.teamwork', '团队协作'), icon: <FiHeart /> },
    { name: t('about.traits.continuous_learning', '持续学习'), icon: <FiBook /> },
    { name: t('about.traits.code_quality', '代码质量'), icon: <FiZap /> },
    { name: t('about.traits.adaptability', '适应能力'), icon: <FiActivity /> },
    { name: t('about.traits.attention_to_detail', '注重细节'), icon: <FiTrendingUp /> },
    { name: t('about.traits.global_vision', '全球视野'), icon: <FiGlobe /> },
    { name: t('about.traits.passion', '热情'), icon: <FiCoffee /> },
    { name: t('about.traits.creativity', '创造力'), icon: <FiFeather /> }
  ];

  // 技能数据 - 使用真实技术图标，添加官网链接
  const skills: Skill[] = [
    // 后端技术
    {
      name: 'Java',
      level: 92,
      category: 'backend',
      icon: <DiJava size={20} />,
      url: 'https://www.java.com/'
    },
    {
      name: 'Python',
      level: 75,
      category: 'backend',
      icon: <DiPython size={20} />,
      url: 'https://www.python.org/'
    },
    {
      name: 'Node.js',
      level: 78,
      category: 'backend',
      icon: <DiNodejs size={20} />,
      url: 'https://nodejs.org/'
    },
    {
      name: 'Go',
      level: 65,
      category: 'backend',
      icon: <SiGo size={20} />,
      url: 'https://golang.org/'
    },
    {
      name: 'Spring Boot',
      level: 88,
      category: 'backend',
      icon: <SiSpring size={20} />,
      url: 'https://spring.io/projects/spring-boot'
    },

    // 前端技术
    {
      name: 'JavaScript',
      level: 85,
      category: 'frontend',
      icon: <SiJavascript size={20} />,
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
    },
    {
      name: 'TypeScript',
      level: 80,
      category: 'frontend',
      icon: <SiTypescript size={20} />,
      url: 'https://www.typescriptlang.org/'
    },
    {
      name: 'React',
      level: 82,
      category: 'frontend',
      icon: <DiReact size={20} />,
      url: 'https://reactjs.org/'
    },
    {
      name: 'Vue.js',
      level: 78,
      category: 'frontend',
      icon: <SiVuedotjs size={20} />,
      url: 'https://vuejs.org/'
    },
    {
      name: 'Flutter',
      level: 60,
      category: 'mobile',
      icon: <SiFlutter size={20} />,
      url: 'https://flutter.dev/'
    },

    // 数据库
    {
      name: 'MySQL',
      level: 85,
      category: 'database',
      icon: <DiMysql size={20} />,
      url: 'https://www.mysql.com/'
    },
    {
      name: 'Redis',
      level: 78,
      category: 'database',
      icon: <DiRedis size={20} />,
      url: 'https://redis.io/'
    },
    {
      name: 'MongoDB',
      level: 70,
      category: 'database',
      icon: <DiMongodb size={20} />,
      url: 'https://www.mongodb.com/'
    },

    // DevOps & 工具
    {
      name: 'Docker',
      level: 82,
      category: 'devops',
      icon: <DiDocker size={20} />,
      url: 'https://www.docker.com/'
    },
    {
      name: 'Kubernetes',
      level: 68,
      category: 'devops',
      icon: <SiKubernetes size={20} />,
      url: 'https://kubernetes.io/'
    },
    {
      name: 'Nginx',
      level: 75,
      category: 'devops',
      icon: <SiNginx size={20} />,
      url: 'https://nginx.org/'
    },
    {
      name: 'Linux',
      level: 80,
      category: 'devops',
      icon: <SiLinux size={20} />,
      url: 'https://www.linux.org/'
    },
    {
      name: 'Git',
      level: 90,
      category: 'tool',
      icon: <DiGit size={20} />,
      url: 'https://git-scm.com/'
    },
    {
      name: 'GraphQL',
      level: 72,
      category: 'api',
      icon: <SiGraphql size={20} />,
      url: 'https://graphql.org/'
    }
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

  // 时间线项目动画
  const timelineItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
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

  // 修改技能渲染部分，增加分类标题，并启用点击跳转功能
  const renderSkillBars = () => {
    // 按类别分组技能
    const categories = {
      backend: { title: '后端技术', skills: [] as Skill[] },
      frontend: { title: '前端技术', skills: [] as Skill[] },
      database: { title: '数据库', skills: [] as Skill[] },
      devops: { title: 'DevOps & 运维', skills: [] as Skill[] },
      tool: { title: '开发工具', skills: [] as Skill[] },
      api: { title: 'API & 协议', skills: [] as Skill[] },
      mobile: { title: '移动开发', skills: [] as Skill[] }
    };

    // 将技能分组
    skills.forEach(skill => {
      if (categories[skill.category as keyof typeof categories]) {
        categories[skill.category as keyof typeof categories].skills.push(skill);
      }
    });

    return (
      <Box>
        {Object.entries(categories).map(([key, category]) =>
          category.skills.length > 0 && (
            <Box key={key} sx={{ mb: 4 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 2,
                  borderLeft: `4px solid ${muiTheme.palette.primary.main}`,
                  pl: 1.5,
                  fontWeight: 600
                }}
              >
                {category.title}
              </Typography>

              {category.skills.map((skill, index) => (
                <EnhancedSkillBar
                  key={skill.name}
                  label={skill.name}
                  value={skill.level}
                  icon={skill.icon}
                  delay={index * 0.05}
                  variant="glass"
                  height={12}
                  borderRadius={6}
                  glowEffect={true}
                  clickable={true}
                  url={skill.url}
                />
              ))}
            </Box>
          )
        )}
      </Box>
    );
  };

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

        {renderSkillBars()}
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

  // 为动画增加变体
  const mobileCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const mobileCardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  // 修改移动端技能视图，也添加分类
  const renderMobileSkillBars = () => {
    // 仅显示主要技能
    const mainSkills = skills.filter(skill => skill.level >= 75);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {mainSkills.map((skill, index) => (
          <EnhancedSkillBar
            key={skill.name}
            label={skill.name}
            value={skill.level}
            icon={skill.icon}
            delay={index * 0.05}
            variant="glass"
            height={10}
            borderRadius={5}
            glowEffect={true}
            clickable={true}
            url={skill.url}
          />
        ))}
      </Box>
    );
  };

  // 修改移动端技能卡片内容
  const renderMobileSkillCard = () => (
    <motion.div variants={mobileCardItemVariants}>
      <MobileAboutCard
        title={t('about.skillsTitle', '技能')}
        icon={<FiZap size={22} />}
        delay={0.1}
      >
        <Box ref={refs.skillRef}>
          <motion.div
            initial="hidden"
            animate={controls.skillBar}
            variants={timelineVariants}
          >
            {renderMobileSkillBars()}
          </motion.div>
        </Box>
      </MobileAboutCard>
    </motion.div>
  );

  // 替换之前的技能卡片渲染
  const mobileContent = () => (
    <motion.div
      variants={mobileCardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 介绍卡片 */}
      <motion.div variants={mobileCardItemVariants}>
        <MobileAboutCard
          title={t('about.aboutMe', '关于我')}
          icon={<FiUser size={22} />}
          delay={0}
        >
          <Typography variant="body2" paragraph>
            {data.summary}
          </Typography>
          <Typography variant="body2">
            {t('about.philosophyText', '我坚信编写干净、可维护的代码并创造直观的用户体验。我不断学习新技术和方法来提升我的技能并提供更好的解决方案。')}
          </Typography>
        </MobileAboutCard>
      </motion.div>

      {/* 技能卡片 */}
      {renderMobileSkillCard()}

      {/* 个人特质卡片 */}
      <motion.div variants={mobileCardItemVariants}>
        <MobileAboutCard
          title={t('about.traitsTitle', '个人特质')}
          icon={<FiTarget size={22} />}
          delay={0.2}
        >
          <Box ref={refs.traitsRef}>
            <motion.div
              initial="hidden"
              animate={controls.traits}
              variants={traitsVariants}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {traits.map((trait, index) => (
                  <motion.div variants={traitItemVariants} key={index}>
                    <TraitCard
                      name={trait.name}
                      icon={trait.icon}
                      index={index}
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </MobileAboutCard>
      </motion.div>

      {/* 工作经验卡片 */}
      <motion.div variants={mobileCardItemVariants}>
        <MobileAboutCard
          title={t('about.experienceTitle', '工作经验')}
          icon={<FiHeart size={22} />}
          delay={0.3}
        >
          <Box ref={refs.timelineRef}>
            <motion.div
              initial="hidden"
              animate={controls.timeline}
              variants={timelineVariants}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {experiences.map((experience, index) => (
                  <motion.div key={index} variants={timelineItemVariants}>
                    <ExperienceCard
                      title={experience.title}
                      company={experience.company}
                      period={experience.period}
                      description={experience.description}
                      achievements={experience.achievements}
                      technologies={experience.technologies}
                      isMobile={true}
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </MobileAboutCard>
      </motion.div>
    </motion.div>
  );

  return (
    <PageTransition mode="slide">
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          {/* 页面标题 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              component="h1"
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
              component="div"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                mb: 8,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              {t('about.subtitle', '了解我的技能、经验和工作理念')}
            </Typography>
          </motion.div>

          {isMobile ? (
            // 移动端布局 - 使用专门的移动端卡片组件
            mobileContent()
          ) : (
            // 桌面端布局 - 使用原有的栅格布局
            <Grid container spacing={6}>
              <Grid item xs={12} md={4}>
                {renderLeftColumn()}
              </Grid>
              <Grid item xs={12} md={8}>
                {renderRightColumn()}
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </PageTransition>
  );
};

export default AboutPage;
