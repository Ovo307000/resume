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
import EnhancedTechTags from '../../components/ui/skills/EnhancedTechTags';
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
      level: 78,
      category: 'frontend',
      icon: <SiTypescript size={20} />,
      url: 'https://www.typescriptlang.org/'
    },
    {
      name: 'Spring',
      level: 88,
      category: 'backend',
      icon: <SiSpring size={20} />,
      url: 'https://spring.io/'
    },
    {
      name: 'Spring Boot',
      level: 88,
      category: 'backend',
      icon: <SiSpring size={20} />,
      url: 'https://spring.io/projects/spring-boot'
    },
    {
      name: 'Spring MVC',
      level: 85,
      category: 'backend',
      icon: <SiSpring size={20} />,
      url: 'https://docs.spring.io/spring-framework/reference/web/webmvc.html'
    },
    {
      name: 'Spring JPA',
      level: 82,
      category: 'backend',
      icon: <SiSpring size={20} />,
      url: 'https://spring.io/projects/spring-data-jpa'
    },
    {
      name: 'RESTAPI',
      level: 85,
      category: 'backend',
      icon: <FiServer size={20} />,
      url: 'https://restfulapi.net/'
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
      level: 78,
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
      level: 90,
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
          isPc={true} // PC端使用
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
          isPc={true} // PC端使用
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

              {/* 添加技能标签组 */}
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ mb: 2, fontWeight: 600, opacity: 0.8 }}
                >
                  {t('about.technicalSkills', '技术技能')}
                </Typography>

                <EnhancedTechTags
                  title={t('about.frontendTech', '前端技术')}
                  skills={skills}
                  category="frontend"
                  maxDisplayed={4}
                  enableSizing={true}
                  animate={true}
                  variant="small"
                />

                <EnhancedTechTags
                  title={t('about.backendTech', '后端技术')}
                  skills={skills}
                  category="backend"
                  maxDisplayed={4}
                  enableSizing={true}
                  animate={true}
                  variant="small"
                />

                <EnhancedTechTags
                  title={t('about.toolsAndOthers', '工具和其他')}
                  skills={skills.filter(skill =>
                    skill.category === "tool" || skill.category === "database" || skill.category === "devops"
                  )}
                  maxDisplayed={4}
                  enableSizing={true}
                  animate={true}
                  variant="small"
                />
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
          isPc={true} // PC端使用
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

      {/* 工作经验卡片 - 使用与移动端相同的组件 */}
      <motion.div
        variants={mobileCardItemVariants}
        style={{ marginTop: '16px' }}
      >
        <MobileAboutCard
          title={t('about.experienceTitle', '工作经验')}
          icon={<FiHeart size={22} />}
          delay={0.3}
          isPc={true} // PC端使用
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
            variants={skillVariants}
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
