import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  useTheme as useMuiTheme,
  useMediaQuery
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  FiUser, FiBook, FiHeart, FiTarget,
  FiCoffee, FiGlobe, FiActivity, FiTrendingUp,
  FiFeather, FiZap, FiServer, FiPackage, FiImage
} from 'react-icons/fi';
import {
  DiJava, DiPython, DiMysql, DiRedis,
  DiDocker, DiGit, DiReact, DiMongodb,
  DiPostgresql
} from 'react-icons/di';
import {
  SiSpring, SiVuedotjs,
  SiLinux, SiSharp, SiC, SiTailwindcss,
  SiGradle, SiTypescript
} from 'react-icons/si';
import PageTransition from '../../components/ui/transitions/PageTransition';
import ExperienceCard from '../../components/ui/ExperienceCard';
import TraitCard from '../../components/ui/TraitCard';
import MobileAboutCard from '../../components/ui/MobileAboutCard';
import SkillBarGroup from '../../components/ui/skills/SkillBarGroup';
import { Skill } from '../../types/skill';

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
      name: 'C#',
      level: 70,
      category: 'backend',
      icon: <SiSharp size={20} />,
      url: 'https://dotnet.microsoft.com/languages/csharp'
    },
    {
      name: 'C',
      level: 65,
      category: 'backend',
      icon: <SiC size={20} />,
      url: 'https://en.cppreference.com/w/c'
    },
    {
      name: 'TypeScript',
      level: 70,
      category: 'frontend',
      icon: <SiTypescript size={20} />,
      url: 'https://www.typescriptlang.org/'
    },
    // 前端技术
    {
      name: 'React.js',
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
      name: 'TailWind CSS',
      level: 75,
      category: 'frontend',
      icon: <SiTailwindcss size={20} />,
      url: 'https://tailwindcss.com/'
    },
    // 框架
    {
      name: 'Spring',
      level: 88,
      category: 'backend',
      icon: <SiSpring size={20} />,
      url: 'https://spring.io/'
    },
    {
      name: 'Spring MVC',
      level: 85,
      category: 'backend',
      icon: <SiSpring size={20} />,
      url: 'https://docs.spring.io/spring-framework/docs/current/reference/html/web/webmvc.html'
    },
    {
      name: 'Spring Boot',
      level: 85,
      category: 'backend',
      icon: <SiSpring size={20} />,
      url: 'https://spring.io/projects/spring-boot'
    },
    {
      name: 'Spring JPA',
      level: 80,
      category: 'backend',
      icon: <SiSpring size={20} />,
      url: 'https://spring.io/projects/spring-data-jpa'
    },
    {
      name: 'REST API',
      level: 85,
      category: 'backend',
      icon: <FiServer size={20} />,
      url: 'https://restfulapi.net/'
    },
    // 构建工具
    {
      name: 'Maven',
      level: 85,
      category: 'tool',
      icon: <FiPackage size={20} />,
      url: 'https://maven.apache.org/'
    },
    {
      name: 'Gradle',
      level: 78,
      category: 'tool',
      icon: <SiGradle size={20} />,
      url: 'https://gradle.org/'
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
      name: 'PostgreSQL',
      level: 85,
      category: 'database',
      icon: <DiPostgresql size={20} />,
      url: 'https://www.postgresql.org/'
    },
    {
      name: 'MongoDB',
      level: 70,
      category: 'database',
      icon: <DiMongodb size={20} />,
      url: 'https://www.mongodb.com/'
    },
    {
      name: 'Redis',
      level: 80,
      category: 'database',
      icon: <DiRedis size={20} />,
      url: 'https://redis.io/'
    },
    // DevOps & 工具
    {
      name: 'Docker',
      level: 80,
      category: 'devops',
      icon: <DiDocker size={20} />,
      url: 'https://www.docker.com/'
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
      level: 85,
      category: 'tool',
      icon: <DiGit size={20} />,
      url: 'https://git-scm.com/'
    },
    {
      name: 'Stable Diffusion',
      level: 70,
      category: 'tool',
      icon: <FiImage size={20} />,
      url: 'https://stability.ai/'
    }
  ];

  // 教育经历
  const educations = [
    {
      title: "计算机科学与技术",
      company: "安徽财经大学",
      period: "2024年3月 - 至今",
      description: "本科专业学习，主要研究方向包括软件工程、数据库系统、计算机网络和分布式系统等。",
      achievements: [],
      technologies: []
    },
    {
      title: "软件技术",
      company: "安徽工贸学院",
      period: "2020年10月 - 2023年6月",
      description: "接受专业的软件开发训练，掌握了Java编程、Web开发和数据库应用等核心技能。",
      achievements: [],
      technologies: []
    }
  ];

  // 项目经历（从简历中提取）
  const projects = [
    {
      title: "Sky-Take-Out",
      company: "个人项目",
      period: "2023",
      description: "苍穹外卖是专门为餐饮企业定制的软件产品，包括系统管理后台和小程序端应用两部分。系统管理后台主要提供给餐饮企业内部员工使用，可以对餐厅的分类、菜品、套餐、订单、员工等进行管理维护。小程序端主要提供给消费者使用，可以在线浏览菜品、添加购物车、下单、支付等。",
      achievements: [
        "实现了移动端的菜品浏览、购物车、下单、支付等功能",
        "开发了后台管理系统的菜品、订单、员工管理等功能",
        "使用WebSocket实现来单语音播报功能",
        "集成阿里云OSS进行图片存储"
      ],
      technologies: ["Spring Boot", "SpringMVC", "Redis", "MySQL", "Docker", "Nginx", "WebSocket", "阿里云OSS", "Git", "Maven"]
    },
    {
      title: "Lease",
      company: "个人项目",
      period: "2022",
      description: "尚庭公寓是一个公寓租赁平台项目，包含移动端和后台管理系统。移动端面向广大用户，提供找房、看房预约、租约管理等功能，后台管理系统面向管理员，提供公寓（房源）管理、租赁管理、用户管理等功能。",
      achievements: [
        "实现了公寓和房间信息的管理功能",
        "开发了用户账户管理功能",
        "构建了看房预约和租约管理流程",
        "使用SpringBoot和MyBatis-Plus提高开发效率"
      ],
      technologies: ["Spring Boot", "SpringMVC", "MyBatis/Plus", "Redis", "MySQL", "MinIO", "Docker", "Git", "Maven"]
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
    skill: useInView(refs.skillRef, { once: true, amount: 0.1 }),
    timeline: useInView(refs.timelineRef, { once: true, amount: 0.1 }),
    traits: useInView(refs.traitsRef, { once: true, amount: 0.1 }),
    contact: useInView(refs.contactRef, { once: true, amount: 0.1 })
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

  // 添加技能动画变体
  const skillVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
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

  // 恢复PC端完整的技能分类展示
  const renderFullSkillBars = () => {
    return (
      <SkillBarGroup
        skills={skills}
        showCategoryHeaders={true}
        categoryTranslations={{
          backend: t('skills.categories.backend', '后端开发'),
          frontend: t('skills.categories.frontend', '前端开发'),
          database: t('skills.categories.database', '数据库'),
          devops: t('skills.categories.devops', 'DevOps & 运维'),
          tool: t('skills.categories.tools', '开发工具')
        }}
        animated={true} // 始终启用动画
        variant="glass"
        height={10}
        glowEffect={true}
      />
    );
  };

  // 生成个人特质网格
  const renderTraitsGrid = () => (
    <Grid container spacing={2}>
      {traits.map((trait, index) => (
        <Grid item xs={12} sm={6} key={index}>
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
  );

  // 生成左侧的内容
  const renderLeftColumn = () => (
    <Box>
      {/* 使用MobileAboutCard组件替换原有Divider和TraitCard组合 */}
      <motion.div variants={mobileCardItemVariants}>
        <MobileAboutCard
          title={t('about.aboutMe', '关于我')}
          icon={<FiUser size={22} />}
          delay={0}
          isPc={true}
          variant="elevated" // 使用凸起效果
        >
          <Typography variant="body2" paragraph>
            {data.summary}
          </Typography>
          <Typography variant="body2">
            {t('about.philosophyText', '我坚信编写干净、可维护的代码并创造直观的用户体验。我不断学习新技术和方法来提升我的技能并提供更好的解决方案。')}
          </Typography>
        </MobileAboutCard>
      </motion.div>

      {/* 技能卡片 - PC端显示完整分类 */}
      <motion.div
        variants={mobileCardItemVariants}
        style={{ marginTop: '16px' }}
      >
        <MobileAboutCard
          title={t('about.skillsTitle', '技能')}
          icon={<FiZap size={22} />}
          delay={0.1}
          isPc={true}
          variant="default" // 使用默认样式
        >
          <Box ref={refs.skillRef}>
            <motion.div
              initial="hidden"
              animate={controls.skillBar}
              variants={skillVariants}
            >
              {/* 技能条技能展示 */}
              <Box sx={{ mb: 3 }}>
                {renderFullSkillBars()}
              </Box>
            </motion.div>
          </Box>
        </MobileAboutCard>
      </motion.div>
    </Box>
  );

  // 生成右侧的内容
  const renderRightColumn = () => (
    <Box>
      {/* 个人特质 - 改用MobileAboutCard并使用网格布局展示 */}
      <motion.div variants={mobileCardItemVariants}>
        <MobileAboutCard
          title={t('about.traitsTitle', '个人特质')}
          icon={<FiTarget size={22} />}
          delay={0.2}
          isPc={true}
          variant="elevated" // 使用凸起效果
        >
          <Box ref={refs.traitsRef}>
            <motion.div
              initial="hidden"
              animate={controls.traits}
              variants={traitsVariants}
            >
              {renderTraitsGrid()}
            </motion.div>
          </Box>
        </MobileAboutCard>
      </motion.div>

      {/* 教育经历卡片 */}
      <motion.div
        variants={mobileCardItemVariants}
        style={{ marginTop: '16px' }}
      >
        <MobileAboutCard
          title={t('about.educationTitle', '教育经历')}
          icon={<FiBook size={22} />}
          delay={0.3}
          isPc={true}
          noBorder={false}
        >
          <Box ref={refs.timelineRef}>
            <motion.div
              initial="hidden"
              animate={controls.timeline}
              variants={timelineVariants}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {educations.map((education, index) => (
                  <motion.div key={index} variants={timelineItemVariants}>
                    <ExperienceCard
                      title={education.title}
                      company={education.company}
                      period={education.period}
                      description={education.description}
                      achievements={education.achievements}
                      technologies={education.technologies}
                      isMobile={false} // PC端保留卡片原样式
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </MobileAboutCard>
      </motion.div>

      {/* 项目经历卡片 */}
      <motion.div
        variants={mobileCardItemVariants}
        style={{ marginTop: '16px' }}
      >
        <MobileAboutCard
          title={t('about.projectsTitle', '项目经历')}
          icon={<FiServer size={22} />}
          delay={0.4}
          isPc={true}
          noBorder={true} // 移除边框，让时间线更突出
        >
          <Box>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={timelineVariants}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {projects.map((project, index) => (
                  <motion.div key={index} variants={timelineItemVariants}>
                    <ExperienceCard
                      title={project.title}
                      company={project.company}
                      period={project.period}
                      description={project.description}
                      achievements={project.achievements}
                      technologies={project.technologies}
                      isMobile={false} // PC端保留卡片原样式
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </MobileAboutCard>
      </motion.div>
    </Box>
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

  // 移动端简略显示重要技能
  const renderMobileSkillBars = () => {
    // 只展示熟练度75以上的技能
    const mainSkills = skills.filter(skill => skill.level >= 75);

    return (
      <SkillBarGroup
        skills={mainSkills}
        showCategoryHeaders={false}
        animated={true} // 始终启用动画
        variant="glass"
        height={10}
        glowEffect={true}
        compact={true}
        useGrid={true} // 移动端也使用网格布局
        columnsPerRow={1} // 但一行只显示一个
      />
    );
  };

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
          variant="elevated" // 使用凸起效果
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
      <motion.div variants={mobileCardItemVariants}>
        <MobileAboutCard
          title={t('about.skillsTitle', '技能')}
          icon={<FiZap size={22} />}
          delay={0.1}
          variant="default" // 使用默认效果
        >
          <Box ref={refs.skillRef}>
            <motion.div
              initial="hidden"
              animate={controls.skillBar}
              variants={skillVariants}
            >
              {renderMobileSkillBars()}
            </motion.div>
          </Box>
        </MobileAboutCard>
      </motion.div>

      {/* 个人特质卡片 */}
      <motion.div variants={mobileCardItemVariants}>
        <MobileAboutCard
          title={t('about.traitsTitle', '个人特质')}
          icon={<FiTarget size={22} />}
          delay={0.2}
          variant="subtle" // 使用轻微效果
        >
          <Box ref={refs.traitsRef}>
            <motion.div
              initial="hidden"
              animate={controls.traits}
              variants={traitsVariants}
            >
              {/* 移动端特质栏使用更紧凑的布局 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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

      {/* 教育经历卡片 */}
      <motion.div variants={mobileCardItemVariants}>
        <MobileAboutCard
          title={t('about.educationTitle', '教育经历')}
          icon={<FiBook size={22} />}
          delay={0.3}
          noBorder={true} // 移除左侧边框
        >
          <Box ref={refs.timelineRef}>
            <motion.div
              initial="hidden"
              animate={controls.timeline}
              variants={timelineVariants}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {educations.map((education, index) => (
                  <motion.div key={index} variants={timelineItemVariants}>
                    <ExperienceCard
                      title={education.title}
                      company={education.company}
                      period={education.period}
                      description={education.description}
                      achievements={education.achievements}
                      technologies={education.technologies}
                      isMobile={true}
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </MobileAboutCard>
      </motion.div>

      {/* 项目经历卡片 */}
      <motion.div variants={mobileCardItemVariants}>
        <MobileAboutCard
          title={t('about.projectsTitle', '项目经历')}
          icon={<FiServer size={22} />}
          delay={0.4}
          noBorder={true} // 移除左侧边框
        >
          <Box>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={timelineVariants}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {projects.map((project, index) => (
                  <motion.div key={index} variants={timelineItemVariants}>
                    <ExperienceCard
                      title={project.title}
                      company={project.company}
                      period={project.period}
                      description={project.description}
                      achievements={project.achievements}
                      technologies={project.technologies}
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
            // 桌面端布局 - 使用优化的栅格布局
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}> {/* 增加左侧列宽度 */}
                {renderLeftColumn()}
              </Grid>
              <Grid item xs={12} md={7}> {/* 相应减少右侧列宽度 */}
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
