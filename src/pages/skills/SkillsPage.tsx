import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  alpha,
  useTheme as useMuiTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiCode, FiSettings, FiServer, FiLayers, FiDatabase, FiMonitor } from 'react-icons/fi';
import { DiJava, DiJavascript1, DiPython, DiMysql, DiPostgresql, DiMongodb, DiReact, DiDocker, DiGit, DiRedis } from 'react-icons/di';
import { SiTypescript, SiSpring, SiVuedotjs, SiTailwindcss, SiGradle, SiLinux, SiC, SiCplusplus, SiGo, SiRust, SiSharp } from 'react-icons/si';
import { useTheme } from '../../contexts/ThemeContext';
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import PageTitle from '../../components/ui/common/PageTitle';
import SkillDetail from '../../components/ui/SkillDetail';
import TechTagGroup, { TechItem } from '../../components/ui/common/TechTagGroup';
import SkillBarGroup from '../../components/ui/skills/SkillBarGroup';
import { Skill } from '../../types/skill';

interface SkillsPageProps {
  data: {
    programmingLanguages: string[];
    frameworks: string[];
    tools: string[];
    overview: {
      java: string;
      others: string;
    };
  };
}

/**
 * 技能页面组件
 * 展示编程语言、框架和工具等技能
 */
const SkillsPage: React.FC<SkillsPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const [activeTab, setActiveTab] = useState(0);

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

  // 处理标签切换
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // 获取技能图标
  const getSkillIcon = (name: string) => {
    const iconSize = 24;
    const iconMap: Record<string, React.ReactNode> = {
      'JAVA': <DiJava size={iconSize} />,
      'Java': <DiJava size={iconSize} />,
      'JavaScript': <DiJavascript1 size={iconSize} />,
      'TypeScript': <SiTypescript size={iconSize} />,
      'Python': <DiPython size={iconSize} />,
      'C': <SiC size={iconSize} />,
      'C++': <SiCplusplus size={iconSize} />,
      'C#': <SiSharp size={iconSize} />,
      'Go': <SiGo size={iconSize} />,
      'Rust': <SiRust size={iconSize} />,
      'Spring': <SiSpring size={iconSize} />,
      'Spring Boot': <SiSpring size={iconSize} />,
      'Spring MVC': <SiSpring size={iconSize} />,
      'Spring JPA': <SiSpring size={iconSize} />,
      'React.js': <DiReact size={iconSize} />,
      'React': <DiReact size={iconSize} />,
      'Vue.js': <SiVuedotjs size={iconSize} />,
      'TailWind CSS': <SiTailwindcss size={iconSize} />,
      'MySql': <DiMysql size={iconSize} />,
      'MySQL': <DiMysql size={iconSize} />,
      'PostgreSql': <DiPostgresql size={iconSize} />,
      'MongoDB': <DiMongodb size={iconSize} />,
      'Redis': <DiRedis size={iconSize} />,
      'Git': <DiGit size={iconSize} />,
      'Linux': <SiLinux size={iconSize} />,
      'Docker': <DiDocker size={iconSize} />,
      'Maven': <FiServer size={iconSize} />,
      'Gradle': <SiGradle size={iconSize} />,
      'RESTAPI': <FiServer size={iconSize} />,
      'Stable Diffusion': <FiSettings size={iconSize} />
    };

    return iconMap[name] || <FiCode size={iconSize} />;
  };

  // 获取技能URL
  const getSkillUrl = (name: string) => {
    const urlMap: Record<string, string> = {
      'JAVA': 'https://www.java.com/',
      'Java': 'https://www.java.com/',
      'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      'TypeScript': 'https://www.typescriptlang.org/',
      'Spring': 'https://spring.io/',
      'Spring Boot': 'https://spring.io/projects/spring-boot',
      'Spring MVC': 'https://docs.spring.io/spring-framework/docs/current/reference/html/web.html',
      'Spring JPA': 'https://spring.io/projects/spring-data-jpa',
      'React.js': 'https://reactjs.org/',
      'React': 'https://reactjs.org/',
      'Vue.js': 'https://vuejs.org/',
      'TailWind CSS': 'https://tailwindcss.com/',
      'MySql': 'https://www.mysql.com/',
      'MySQL': 'https://www.mysql.com/',
      'PostgreSql': 'https://www.postgresql.org/',
      'MongoDB': 'https://www.mongodb.com/',
      'Redis': 'https://redis.io/',
      'Git': 'https://git-scm.com/',
      'Linux': 'https://www.linux.org/',
      'Docker': 'https://www.docker.com/',
      'Maven': 'https://maven.apache.org/',
      'Gradle': 'https://gradle.org/',
      'RESTAPI': 'https://restfulapi.net/',
      'Stable Diffusion': 'https://stability.ai/'
    };

    return urlMap[name] || undefined;
  };

  // 获取技能水平（模拟数据）
  const getSkillLevel = (skill: string) => {
    // 根据技能关键词返回模拟的技能熟练度
    const skillLowerCase = skill.toLowerCase();

    if (skillLowerCase.includes('java') || skillLowerCase.includes('spring')) {
      return 90;
    } else if (skillLowerCase.includes('mysql') || skillLowerCase.includes('sql')) {
      return 85;
    } else if (skillLowerCase.includes('docker') || skillLowerCase.includes('redis')) {
      return 80;
    } else if (skillLowerCase.includes('react') || skillLowerCase.includes('vue')) {
      return 70;
    } else {
      // 随机生成65-85的熟练度
      return Math.floor(Math.random() * 20) + 65;
    }
  };

  // 按类别生成技能
  const generateSkills = () => {
    const allSkills: Skill[] = [];

    // 编程语言
    data.programmingLanguages.forEach(lang => {
      allSkills.push({
        name: lang,
        value: getSkillLevel(lang),
        level: getSkillLevel(lang),
        icon: getSkillIcon(lang),
        category: 'language',
        url: getSkillUrl(lang)
      });
    });

    // 框架
    data.frameworks.forEach(framework => {
      allSkills.push({
        name: framework,
        value: getSkillLevel(framework),
        level: getSkillLevel(framework),
        icon: getSkillIcon(framework),
        category: 'framework',
        url: getSkillUrl(framework)
      });
    });

    // 工具
    data.tools.forEach(tool => {
      allSkills.push({
        name: tool,
        value: getSkillLevel(tool),
        level: getSkillLevel(tool),
        icon: getSkillIcon(tool),
        category: 'tool',
        url: getSkillUrl(tool)
      });
    });

    return allSkills;
  };

  const skills = generateSkills();

  // 按类别过滤技能
  const filterSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  // 获取当前显示的技能
  const getActiveSkills = () => {
    if (activeTab === 0) {
      // Overview选项卡展示所有技能
      return skills;
    } else {
      // 其他选项卡按类别过滤
      const categories = ['language', 'framework', 'tool'];
      return filterSkillsByCategory(categories[activeTab - 1]);
    }
  };

  // 获取类别图标
  const getCategoryIcon = (index: number) => {
    const icons = [
      <FiServer key="overview" size={20} />, // Overview图标
      <FiCode key="code" size={20} />,
      <FiLayers key="layers" size={20} />,
      <FiSettings key="settings" size={20} />
    ];
    return icons[index];
  };

  // 渲染技能进度条
  const renderSkills = () => {
    const activeSkills = getActiveSkills();
    return (
      <Box sx={{ mt: 2 }}>
        <SkillBarGroup
          skills={activeSkills}
          showCategoryHeaders={activeTab === 0} // 只在Overview标签显示分类标题
          categoryTranslations={{
            language: t('skills.categories.language', '编程语言'),
            framework: t('skills.categories.framework', '框架'),
            tool: t('skills.categories.tools', '工具'),
            database: t('skills.categories.database', '数据库'),
            devops: t('skills.categories.devops', 'DevOps')
          }}
          animated={true}
          variant="gradient" // 技能页面使用渐变样式区分
          height={12}
          glowEffect={true}
          useGrid={true} // 使用网格布局
          columnsPerRow={2} // 一行显示2个技能条
        />
      </Box>
    );
  };

  // 渲染技术池
  const renderTechPool = () => {
    // 获取所有技能并按熟练度排序
    const allSkills = generateSkills();

    // 将Skills转换为TechItem格式
    const techItems: TechItem[] = allSkills.map(skill => ({
      name: skill.name,
      icon: skill.icon,
      url: skill.url,
      value: skill.value
    }));

    return (
      <TechTagGroup
        techItems={techItems}
        initiallyExpanded={false}
        maxVisibleItems={20}
        animate={true}
        enableSizing={true}
        collapsible={true}
        showToggle={true}
      />
    );
  };

  // 添加技能详述部分
  const renderSkillDetails = () => {
    const skillDetails = [
      {
        title: "后端开发",
        description: "作为Java后端工程师，熟悉Java编程语言，熟悉面向对象编程思想（OOP），包括封装、继承、多态等特性，并能灵活运用到实际项目开发中。熟悉Spring框架的核心概念，包括IoC（控制反转）和AOP（面向切面编程），能够灵活运用其特性进行模块化设计和解耦。",
        icon: <FiServer size={24} />,
        technologies: [
          { name: "Spring Boot", icon: <SiSpring size={16} />, url: "https://spring.io/projects/spring-boot" },
          { name: "Spring MVC", icon: <SiSpring size={16} />, url: "https://docs.spring.io/spring-framework/docs/current/reference/html/web/webmvc.html" },
          { name: "Spring JPA", icon: <SiSpring size={16} />, url: "https://spring.io/projects/spring-data-jpa" },
          { name: "Java", icon: <DiJava size={16} />, url: "https://www.java.com/" }
        ],
        delay: 0
      },
      {
        title: "数据库技术",
        description: "熟悉多种数据库系统，包括关系型数据库和NoSQL数据库。熟练使用MySQL和PostgreSQL进行数据建模、查询优化和性能调优。了解Redis缓存技术，能够实现高效的数据缓存策略。熟悉MongoDB等文档型数据库的使用场景和应用方法。",
        icon: <FiDatabase size={24} />,
        technologies: [
          { name: "MySQL", icon: <DiMysql size={16} />, url: "https://www.mysql.com/" },
          { name: "PostgreSQL", icon: <DiPostgresql size={16} />, url: "https://www.postgresql.org/" },
          { name: "Redis", icon: <DiRedis size={16} />, url: "https://redis.io/" },
          { name: "MongoDB", icon: <DiMongodb size={16} />, url: "https://www.mongodb.com/" }
        ],
        delay: 0.1
      },
      {
        title: "DevOps & 运维",
        description: "熟悉Linux常用命令，能够进行服务器日常维护和故障排查，并能编写Shell脚本进行自动化部署和监控。熟悉Nginx和Tomcat的配置和优化。熟练使用Git进行版本控制，熟悉Gitflow工作流，能够高效地进行代码管理和团队协作。熟悉Docker的基本概念和常用命令。",
        icon: <FiSettings size={24} />,
        technologies: [
          { name: "Docker", icon: <DiDocker size={16} />, url: "https://www.docker.com/" },
          { name: "Linux", icon: <SiLinux size={16} />, url: "https://www.linux.org/" },
          { name: "Git", icon: <DiGit size={16} />, url: "https://git-scm.com/" }
        ],
        delay: 0.2
      },
      {
        title: "前端技术",
        description: "虽然主要专注于后端开发，但也具备基本的前端开发能力。了解HTML/CSS/JavaScript等前端基础技术，能够使用React.js和Vue.js等现代前端框架构建用户界面。熟悉TypeScript提供的类型安全特性，能够开发更健壮的前端应用。",
        icon: <FiMonitor size={24} />,
        technologies: [
          { name: "React.js", icon: <DiReact size={16} />, url: "https://reactjs.org/" },
          { name: "Vue.js", icon: <SiVuedotjs size={16} />, url: "https://vuejs.org/" },
          { name: "TypeScript", icon: <SiTypescript size={16} />, url: "https://www.typescriptlang.org/" },
          { name: "TailWind CSS", icon: <SiTailwindcss size={16} />, url: "https://tailwindcss.com/" }
        ],
        delay: 0.3
      }
    ];

    return (
      <Grid container spacing={3}>
        {skillDetails.map((detail, index) => (
          <Grid item xs={12} md={6} key={index}>
            <SkillDetail
              title={detail.title}
              description={detail.description}
              icon={detail.icon}
              technologies={detail.technologies}
              delay={detail.delay}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 8, pb: 10 }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* 页面标题 */}
        <motion.div variants={itemVariants}>
          <PageTitle
            subtitle={t('Professional Skills')}
            title={t('My Technical Expertise')}
          />
        </motion.div>

        {/* 技能概述 */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            技能概述
          </Typography>
          <GlassyBlobBackground
            colorSet="warm"
            intensity="light"
            containerSx={{
              borderRadius: '16px',
              p: { xs: 3, md: 4 },
              mb: 6
            }}
          >
            <Typography
              variant="body1"
              sx={{
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.8
              }}
            >
              作为Java后端工程师，我擅长构建高性能、可扩展的系统。不断跟进行业最新技术，精通Spring生态和各种数据库技术，同时也对前端开发保持积极学习的态度。
            </Typography>
          </GlassyBlobBackground>
        </motion.div>

        {/* 技能详述部分 */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            专业领域
          </Typography>

          <Box sx={{ mb: 6 }}>
            {renderSkillDetails()}
          </Box>
        </motion.div>

        {/* 技能标签云 */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            技能标签云
          </Typography>
          <GlassyBlobBackground
            colorSet="cool"
            intensity="light"
            containerSx={{
              borderRadius: '16px',
              p: { xs: 3, md: 4 },
              mb: 6
            }}
          >
            {renderTechPool()}
          </GlassyBlobBackground>
        </motion.div>

        {/* 技能标签切换器 */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            技能图谱
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 1,
              mb: 4,
              borderRadius: '50px',
              backdropFilter: 'blur(10px)',
              backgroundColor: alpha(
                theme === 'dark' ? muiTheme.palette.background.paper : muiTheme.palette.background.paper,
                theme === 'dark' ? 0.2 : 0.3
              ),
              border: `1px solid ${alpha(
                theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.black,
                0.05
              )}`,
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              sx={{
                '& .MuiTab-root': {
                  borderRadius: '50px',
                  minHeight: '48px',
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    background: alpha(muiTheme.palette.primary.main, 0.1),
                    color: theme === 'dark' ? muiTheme.palette.primary.light : muiTheme.palette.primary.main,
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none', // 隐藏默认指示器，使用自定义背景代替
                },
              }}
            >
              <Tab
                icon={getCategoryIcon(0)}
                label={t('skills.overview')}
                iconPosition="start"
                sx={{ textTransform: 'none', fontSize: '0.9rem' }}
              />
              <Tab
                icon={getCategoryIcon(1)}
                label={t('skills.programmingLanguages')}
                iconPosition="start"
                sx={{ textTransform: 'none', fontSize: '0.9rem' }}
              />
              <Tab
                icon={getCategoryIcon(2)}
                label={t('skills.devFrameworks')}
                iconPosition="start"
                sx={{ textTransform: 'none', fontSize: '0.9rem' }}
              />
              <Tab
                icon={getCategoryIcon(3)}
                label={t('skills.devTools')}
                iconPosition="start"
                sx={{ textTransform: 'none', fontSize: '0.9rem' }}
              />
            </Tabs>
          </Paper>
        </motion.div>

        {/* 技能列表 */}
        <motion.div variants={itemVariants}>
          <GlassyBlobBackground
            colorSet="primary"
            intensity="light"
            containerSx={{
              borderRadius: '16px',
              p: { xs: 2, md: 4 },
              mb: 6
            }}
          >
            <Box sx={{ mt: 2, mb: 2 }}>
              {activeTab === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderSkills()}
                </motion.div>
              )}
              {activeTab === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderSkills()}
                </motion.div>
              )}
              {activeTab === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderSkills()}
                </motion.div>
              )}
              {activeTab === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderSkills()}
                </motion.div>
              )}
            </Box>
          </GlassyBlobBackground>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default SkillsPage;
