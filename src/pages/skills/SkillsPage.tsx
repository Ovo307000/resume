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
import { FiCode, FiSettings, FiServer, FiLayers } from 'react-icons/fi';
import { DiJava, DiJavascript1, DiPython, DiMysql, DiPostgresql, DiMongodb, DiReact, DiDocker, DiGit, DiRedis } from 'react-icons/di';
import { SiTypescript, SiSpring, SiVuedotjs, SiTailwindcss, SiGradle, SiLinux, SiC, SiCplusplus, SiGo, SiRust } from 'react-icons/si';
import { useTheme } from '../../contexts/ThemeContext';
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import RainbowProgressBar from '../../components/ui/progress/RainbowProgressBar';
import CustomChip from '../../components/ui/common/CustomChip';
import PageTitle from '../../components/ui/common/PageTitle';
import GlassPanel from '../../components/ui/glass/GlassPanel';
import PageTransition from '../../components/ui/transitions/PageTransition';
import SkillCard from '../../components/ui/SkillCard';

interface Skill {
  name: string;
  value: number;
  icon?: React.ReactNode;
  category: string;
  url?: string;
}

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

  // 使用新的SkillCard组件渲染技能列表
  const renderSkills = (skills: Skill[]) => {
    return (
      <Grid container spacing={2}>
        {skills.map((skill, index) => (
          <Grid item xs={12} sm={6} key={skill.name}>
            <SkillCard
              name={skill.name}
              level={skill.value}
              icon={skill.icon}
              category={skill.category}
              delay={index * 0.1} // 添加交错动画
              index={index}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 页面标题 */}
          <motion.div variants={itemVariants}>
            <PageTitle title={t('skills.title')} />
          </motion.div>

          {/* 技能概述 */}
          <motion.div variants={itemVariants}>
            <GlassyBlobBackground
              colorSet="rainbow"
              intensity="light"
              containerSx={{
                borderRadius: '16px',
                p: 3,
                mb: 6
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  textAlign: 'center',
                  fontWeight: 'medium',
                  color: 'text.secondary',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.8
                }}
              >
                作为Java后端工程师，我擅长构建高性能、可扩展的系统。不断跟进行业最新技术，精通Spring生态和各种数据库技术，同时也对前端开发保持积极学习的态度。
              </Typography>
            </GlassyBlobBackground>
          </motion.div>

          {/* 技能标签切换器 */}
          <motion.div variants={itemVariants}>
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
                  label={t('skills.overview', 'Overview')}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                />
                <Tab
                  icon={getCategoryIcon(1)}
                  label={t('skills.programmingLanguages')}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                />
                <Tab
                  icon={getCategoryIcon(2)}
                  label={t('skills.devFrameworks')}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                />
                <Tab
                  icon={getCategoryIcon(3)}
                  label={t('skills.devTools')}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
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
              <Box sx={{ mt: 4 }}>
                {activeTab === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {renderSkills(getActiveSkills())}
                  </motion.div>
                )}
                {activeTab === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {renderSkills(getActiveSkills())}
                  </motion.div>
                )}
                {activeTab === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {renderSkills(getActiveSkills())}
                  </motion.div>
                )}
                {activeTab === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {renderSkills(getActiveSkills())}
                  </motion.div>
                )}
              </Box>
            </GlassyBlobBackground>
          </motion.div>

          {/* 技能标签云 */}
          <motion.div variants={itemVariants}>
            <GlassyBlobBackground
              colorSet="cool"
              intensity="light"
              containerSx={{
                borderRadius: '16px',
                p: { xs: 3, md: 4 },
                mb: 6
              }}
            >
              <Typography variant="h5" fontWeight="bold" textAlign="center" sx={{ mb: 3 }}>
                技能标签
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
                {generateSkills().map((skill) => (
                  <CustomChip
                    key={skill.name}
                    label={skill.name}
                    icon={skill.icon}
                    size="medium"
                    color={getSkillColor(skill.name)}
                    url={skill.url}
                    variant="filled"
                    tooltip={`${skill.name} ${skill.value}%`}
                    animate={true}
                    customSx={{
                      px: 1.5,
                      fontWeight: 'medium'
                    }}
                  />
                ))}
              </Box>
            </GlassyBlobBackground>
          </motion.div>

          {/* 技能详述 */}
          <motion.div variants={itemVariants}>
            <GlassyBlobBackground
              colorSet="warm"
              intensity="light"
              containerSx={{
                borderRadius: '16px',
                p: { xs: 3, md: 4 }
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                专长与技能详述
              </Typography>

              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                  Java 与 Spring 生态系统
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                  {data.overview.java}
                </Typography>

                <Typography variant="subtitle1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                  开发与运维工具
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  {data.overview.others}
                </Typography>
              </Box>
            </GlassyBlobBackground>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

// 获取技能的颜色
const getSkillColor = (name: string): string => {
  const colorMap: Record<string, string> = {
    'JAVA': '#b07219',
    'Java': '#b07219',
    'Spring': '#6db33f',
    'Spring Boot': '#6db33f',
    'Spring MVC': '#6db33f',
    'Spring JPA': '#6db33f',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'React.js': '#61dafb',
    'React': '#61dafb',
    'Vue.js': '#42b883',
    'TailWind CSS': '#38b2ac',
    'MySql': '#4479a1',
    'MySQL': '#4479a1',
    'PostgreSql': '#336791',
    'MongoDB': '#4db33d',
    'Redis': '#dc382d',
    'Git': '#f34f29',
    'Linux': '#333333',
    'Docker': '#2496ed',
    'Maven': '#c71a36',
    'Gradle': '#02303a',
    'RESTAPI': '#039be5',
    'Stable Diffusion': '#7f52ff'
  };

  return colorMap[name] || '#6366f1'; // 默认使用紫色
};

export default SkillsPage;
