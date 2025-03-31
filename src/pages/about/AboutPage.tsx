import React from 'react';
import { Box, Grid, Container, Typography, Stack, SxProps, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FiActivity,
  FiBook,
  FiCode,
  FiCoffee,
  FiFeather,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiPackage,
  FiServer,
  FiTarget,
  FiTrendingUp,
  FiWifi,
  FiZap
} from 'react-icons/fi';
import {
  DiGitBranch,
  DiJava,
  DiMysql,
  DiNodejs,
  DiPython,
  DiReact,
  DiTerminal
} from 'react-icons/di';
import {
  SiC,
  SiGraphql,
  SiJavascript,
  SiJquery,
  SiPostgresql,
  SiRedis,
  SiSharp,
  SiSpring,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs
} from 'react-icons/si';
import { Skill } from '../../types/skill';
import { useTheme } from '../../contexts/ThemeContext';
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import TechnologyTag from '../../components/ui/projects/TechnologyTag';
import EnhancedPageTitle from '../../components/ui/common/EnhancedPageTitle';

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
 * 关于我页面组件 - 全新设计
 */
const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  const { t } = useTranslation();

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
    {
      name: 'GraphQL',
      level: 70,
      category: 'backend',
      icon: <SiGraphql size={20} />,
      url: 'https://graphql.org/'
    },
    {
      name: 'Node.js',
      level: 75,
      category: 'backend',
      icon: <DiNodejs size={20} />,
      url: 'https://nodejs.org/'
    },
    {
      name: 'Socket.IO',
      level: 70,
      category: 'backend',
      icon: <FiWifi size={20} />,
      url: 'https://socket.io/'
    },
    // 前端技术
    {
      name: 'TypeScript',
      level: 70,
      category: 'frontend',
      icon: <SiTypescript size={20} />,
      url: 'https://www.typescriptlang.org/'
    },
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
    {
      name: 'JavaScript',
      level: 85,
      category: 'frontend',
      icon: <SiJavascript size={20} />,
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
    },
    {
      name: 'jQuery',
      level: 80,
      category: 'frontend',
      icon: <SiJquery size={20} />,
      url: 'https://jquery.com/'
    },
    // 数据库
    {
      name: 'MySQL',
      level: 90,
      category: 'database',
      icon: <DiMysql size={20} />,
      url: 'https://www.mysql.com/'
    },
    {
      name: 'PostgreSQL',
      level: 85,
      category: 'database',
      icon: <SiPostgresql size={20} />,
      url: 'https://www.postgresql.org/'
    },
    {
      name: 'Redis',
      level: 80,
      category: 'database',
      icon: <SiRedis size={20} />,
      url: 'https://redis.io/'
    },
    // 工具
    {
      name: 'Maven',
      level: 85,
      category: 'tool',
      icon: <FiPackage size={20} />,
      url: 'https://maven.apache.org/'
    },
    {
      name: 'Gradle',
      level: 80,
      category: 'tool',
      icon: <FiPackage size={20} />,
      url: 'https://gradle.org/'
    },
    {
      name: 'Git',
      level: 85,
      category: 'tool',
      icon: <DiGitBranch size={20} />,
      url: 'https://git-scm.com/'
    },
    {
      name: 'Linux',
      level: 75,
      category: 'tool',
      icon: <DiTerminal size={20} />,
      url: 'https://www.linux.org/'
    }
  ];

  // 容器动画
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // 子项目动画
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10
      }
    }
  };

  // 根据简历数据更新技能数据
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const databaseSkills = skills.filter(skill => skill.category === 'database');
  const toolSkills = skills.filter(skill => skill.category === 'tool');

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 创建一个统一的玻璃容器组件
  interface GlassyContainerProps {
    children: React.ReactNode;
    colorSet?: 'default' | 'primary' | 'rainbow' | 'cool' | 'warm';
    title?: string;
    titleIcon?: React.ReactNode;
    sx?: SxProps<Theme>;
  }

  const GlassyContainer: React.FC<GlassyContainerProps> = ({ children, colorSet = 'cool', title, titleIcon, sx = {} }) => (
    <GlassyBlobBackground
      colorSet={colorSet}
      intensity="light"
      glassEffect={true}
      containerSx={{
        p: { xs: 3, sm: 4 },
        mb: 4,
        borderRadius: '20px',
        position: 'relative',
        border: `1px solid ${
          theme === 'dark'
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.05)'
        }`,
        boxShadow: theme === 'dark'
          ? '0 8px 32px rgba(0, 0, 0, 0.2)'
          : '0 8px 32px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        ...sx
      }}
    >
      {title && (
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: 700,
            color: isDark ? 'white' : 'text.primary',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {titleIcon && <Box sx={{
            display: 'flex',
            color: isDark ? 'primary.light' : 'primary.main',
            filter: isDark ? 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))' : 'none'
          }}>
            {titleIcon}
          </Box>}
          {title}
        </Typography>
      )}
      {children}
    </GlassyBlobBackground>
  );

  // 渲染技术标签组
  const renderTechTags = (techItems: Skill[] | { name: string, category: string }[], type: string) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {techItems.map((item, index) => (
        <TechnologyTag key={`${type}-${index}-${item.name}`} name={item.name} />
      ))}
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box component="main" sx={{ py: 4 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 使用新的 EnhancedPageTitle 组件 */}
          <motion.div variants={itemVariants}>
            <EnhancedPageTitle
              title={t('about.title', '关于我')}
              subtitle={t('about.subtitle', '我的旅程和驱动力')}
              textAlign="center"
              withAnimation={true}
            />
          </motion.div>

          {/* 个人简介 */}
          <motion.div variants={itemVariants}>
            <GlassyContainer
              title={t('about.title.intro', '关于我')}
              titleIcon={<FiFeather size={24} />}
              colorSet="warm"
            >
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: isDark ? 'grey.300' : 'grey.800',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line'
                }}
              >
                {data.summary}
              </Typography>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                sx={{ mt: 4 }}
              >
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: isDark ? 'primary.light' : 'primary.main',
                    textShadow: isDark ? '0 0 8px rgba(239, 68, 68, 0.4)' : 'none',
                  }}
                >
                  {t('about.traits.title', '个人特质')}
                </Typography>
                <Grid container spacing={2}>
                  {traits.map((trait, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          p: 2,
                          height: '100%',
                          borderRadius: '12px',
                          bgcolor: isDark ? 'rgba(17, 25, 40, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                          boxShadow: 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: isDark
                              ? '0 0 18px rgba(245, 158, 11, 0.5)'
                              : '0 0 18px rgba(245, 158, 11, 0.3)',
                            borderColor: isDark ? 'rgba(245, 158, 11, 0.4)' : 'rgba(245, 158, 11, 0.2)'
                          }
                        }}
                      >
                        <Box sx={{
                           display:'flex',
                           color: isDark ? '#fde047' : '#d97706',
                           fontSize: '1.5rem'
                           }}>
                          {trait.icon}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: isDark ? 'grey.200' : 'grey.800'
                             }}>
                          {trait.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </GlassyContainer>
          </motion.div>

          {/* 技能 */}
          <motion.div variants={itemVariants}>
            <GlassyContainer
              title={t('about.title.skills', '技术栈')}
              titleIcon={<FiZap size={24} />}
              colorSet="cool"
            >
              {/* 后端技术 */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                sx={{ mb: 4 }}
              >
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: isDark ? 'primary.light' : 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <FiServer /> {t('about.skills.backend', '后端技术')}
                </Typography>
                {renderTechTags(backendSkills, 'backend')}
              </Box>

              {/* 前端技术 */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                sx={{ mb: 4 }}
              >
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: isDark ? 'primary.light' : 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <FiCode /> {t('about.skills.frontend', '前端技术')}
                </Typography>
                {renderTechTags(frontendSkills, 'frontend')}
              </Box>

              {/* 数据库 */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                sx={{ mb: 4 }}
              >
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: isDark ? 'primary.light' : 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <FiLayers /> {t('about.skills.database', '数据库')}
                </Typography>
                {renderTechTags(databaseSkills, 'database')}
              </Box>

              {/* 工具与平台 */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: isDark ? 'primary.light' : 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <FiTrendingUp /> {t('about.skills.tools', '工具平台')}
                </Typography>
                {renderTechTags(toolSkills, 'tool')}
              </Box>
            </GlassyContainer>
          </motion.div>

          {/* 教育背景 */}
          <motion.div variants={itemVariants}>
            <GlassyContainer
              title={t('about.title.education', '教育经历')}
              titleIcon={<FiBook size={24} />}
              colorSet="primary"
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 2,
                      bgcolor: isDark ? 'rgba(17, 25, 40, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                      boxShadow: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: isDark
                          ? '0 0 25px rgba(99, 102, 241, 0.5)'
                          : '0 0 25px rgba(79, 70, 229, 0.3)',
                        borderColor: isDark ? 'rgba(99, 102, 241, 0.5)' : 'rgba(79, 70, 229, 0.3)'
                      }
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: isDark ? 'primary.light' : 'primary.main',
                        mb: 1,
                      }}
                    >
                      安徽工贸学院
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? 'grey.400' : 'grey.700',
                        mb: 0.5
                      }}
                    >
                      大专 · 软件技术
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: isDark ? 'grey.500' : 'grey.600',
                        mb: 2
                      }}
                    >
                      2020年10月 - 2023年6月
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: isDark ? 'grey.400' : 'grey.700',
                        lineHeight: 1.6,
                        mb: 2
                      }}
                    >
                      专注于软件技术专业学习，掌握编程基础知识与实践技能，对软件开发流程有系统认识。
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: isDark ? 'grey.300' : 'grey.800'
                      }}
                    >
                      {t('about.achievements', '主要经历')}:
                    </Typography>

                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body2" sx={{ color: isDark ? 'grey.400' : 'grey.700', mb: 0.75 }}>
                        参与校园技术社团活动，探索Web开发基础
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ color: isDark ? 'grey.400' : 'grey.700', mb: 0.75 }}>
                        完成多个课程项目，应用Java和数据库技术解决模拟问题
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ color: isDark ? 'grey.400' : 'grey.700', mb: 0.75 }}>
                        关注业界动态，学习主流开发框架与工具
                      </Typography>
                    </Box>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: isDark ? 'grey.300' : 'grey.800'
                      }}
                    >
                      {t('about.skills', '技能')}:
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <TechnologyTag name="Java" size="small" />
                      <TechnologyTag name="MySQL" size="small" />
                      <TechnologyTag name="Spring Boot" size="small" />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 2,
                      bgcolor: isDark ? 'rgba(17, 25, 40, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                      boxShadow: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: isDark
                          ? '0 0 25px rgba(99, 102, 241, 0.5)'
                          : '0 0 25px rgba(79, 70, 229, 0.3)',
                        borderColor: isDark ? 'rgba(99, 102, 241, 0.5)' : 'rgba(79, 70, 229, 0.3)'
                      }
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: isDark ? 'primary.light' : 'primary.main',
                        mb: 1,
                      }}
                    >
                      安徽财经大学
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? 'grey.400' : 'grey.700',
                        mb: 0.5
                      }}
                    >
                      本科 · 计算机科学与技术
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: isDark ? 'grey.500' : 'grey.600',
                        mb: 2
                      }}
                    >
                      2024年3月 - 至今
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: isDark ? 'grey.400' : 'grey.700',
                        lineHeight: 1.6,
                        mb: 2
                      }}
                    >
                      通过专升本考试进入本科学习，深入探索计算机科学与技术领域，拓展知识广度的同时增强专业深度。
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: isDark ? 'grey.300' : 'grey.800'
                      }}
                    >
                      {t('about.current_focus', '学习重点')}:
                    </Typography>

                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body2" sx={{ color: isDark ? 'grey.400' : 'grey.700', mb: 0.75 }}>
                        深入学习计算机网络与操作系统原理
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ color: isDark ? 'grey.400' : 'grey.700', mb: 0.75 }}>
                        研究算法设计与数据结构优化
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ color: isDark ? 'grey.400' : 'grey.700', mb: 0.75 }}>
                        关注云计算与分布式系统发展趋势
                      </Typography>
                    </Box>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: isDark ? 'grey.300' : 'grey.800'
                      }}
                    >
                      {t('about.achievements', '主要活动')}:
                    </Typography>

                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body2" sx={{ color: isDark ? 'grey.400' : 'grey.700', mb: 0.75 }}>
                        参与技术学习小组，交流编程技巧与心得
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ color: isDark ? 'grey.400' : 'grey.700', mb: 0.75 }}>
                        完成基于Python的数据处理与分析课程项目
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ color: isDark ? 'grey.400' : 'grey.700', mb: 0.75 }}>
                        利用Linux环境进行开发与实验
                      </Typography>
                    </Box>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: isDark ? 'grey.300' : 'grey.800'
                      }}
                    >
                      {t('about.skills', '技能')}:
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <TechnologyTag name="C" size="small" />
                      <TechnologyTag name="Python" size="small" />
                      <TechnologyTag name="Linux" size="small" />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </GlassyContainer>
          </motion.div>

          {/* 项目经验 */}
          <motion.div variants={itemVariants}>
            <GlassyContainer
              title={t('about.title.projects', '项目展示')}
              titleIcon={<FiActivity size={24} />}
              colorSet="cool"
            >
              <Stack spacing={4}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    bgcolor: isDark ? 'rgba(17, 25, 40, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: isDark
                        ? '0 0 25px rgba(16, 185, 129, 0.5)'
                        : '0 0 25px rgba(16, 185, 129, 0.3)',
                       borderColor: isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.3)'
                    }
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          color: isDark ? 'primary.light' : 'primary.main',
                          mb: 1,
                        }}
                      >
                        苍穹外卖（Sky-Take-Out）
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isDark ? 'grey.400' : 'grey.700',
                          mb: 0.5
                        }}
                      >
                        全栈开发
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? 'grey.400' : 'grey.700',
                          lineHeight: 1.6,
                          mb: 2
                        }}
                      >
                        专为餐饮企业（餐厅、饭店）定制的一款软件产品，包括系统管理后台和小程序端应用两部分。其中系统管理后台主要提供给餐饮企业内部员工使用，可以对餐厅的分类、菜品、套餐、订单、员工等进行管理维护，对餐厅的各类数据进行统计，同时也可进行来单语音播报功能。小程序端主要提供给消费者使用，可以在线浏览菜品、添加购物车、下单、支付、催单等。
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: isDark ? 'grey.300' : 'grey.800'
                        }}
                      >
                        {t('about.technologies', '技术栈')}:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        <TechnologyTag name="Spring Boot" />
                        <TechnologyTag name="SpringMVC" />
                        <TechnologyTag name="Redis" />
                        <TechnologyTag name="MySQL" />
                        <TechnologyTag name="Docker" />
                        <TechnologyTag name="Nginx" />
                        <TechnologyTag name="WebSocket" />
                      </Box>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box
                        component="img"
                        src="https://img.php.cn/upload/image/550/982/756/1684488126246446.png"
                        alt="Sky-Take-Out"
                        sx={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: isDark
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.05)',
                          boxShadow: 'none',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: isDark
                              ? '0 8px 25px rgba(0, 0, 0, 0.4)'
                              : '0 8px 25px rgba(0, 0, 0, 0.15)',
                          }
                        }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = 'https://picsum.photos/seed/image-error/300/200';
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    bgcolor: isDark ? 'rgba(17, 25, 40, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: isDark
                        ? '0 0 25px rgba(16, 185, 129, 0.5)'
                        : '0 0 25px rgba(16, 185, 129, 0.3)',
                       borderColor: isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.3)'
                    }
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          color: isDark ? 'primary.light' : 'primary.main',
                          mb: 1,
                        }}
                      >
                        尚庭公寓（Lease）
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isDark ? 'grey.400' : 'grey.700',
                          mb: 0.5
                        }}
                      >
                        后端开发
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? 'grey.400' : 'grey.700',
                          lineHeight: 1.6,
                          mb: 2
                        }}
                      >
                        尚庭公寓是一个公寓租赁平台项目，包含移动端和后台管理系统，其中移动端面向广大用户，提供找房、看房预约、租约管理等功能，后台管理系统面向管理员，提供公寓（房源）管理、租赁管理、用户管理等功能。
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: isDark ? 'grey.300' : 'grey.800'
                        }}
                      >
                        {t('about.technologies', '技术栈')}:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <TechnologyTag name="Spring Boot" />
                        <TechnologyTag name="SpringMVC" />
                        <TechnologyTag name="MyBatis/Plus" />
                        <TechnologyTag name="Redis" />
                        <TechnologyTag name="MySQL" />
                        <TechnologyTag name="MinIO" />
                        <TechnologyTag name="Nginx" />
                        <TechnologyTag name="WebSocket" />
                        <TechnologyTag name="Docker" />
                      </Box>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box
                        component="img"
                        src="https://st.360buyimg.com/img/jfs/t19900/341/1848316057/14821/82c04044/5b3c3bbbN26c90e9a.jpg"
                        alt="Lease"
                        sx={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: isDark
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.05)',
                          boxShadow: 'none',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: isDark
                              ? '0 8px 25px rgba(0, 0, 0, 0.4)'
                              : '0 8px 25px rgba(0, 0, 0, 0.15)',
                          }
                        }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = 'https://picsum.photos/seed/image-error/300/200';
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </GlassyContainer>
          </motion.div>
        </motion.div>
      </Box>
    </Container>
  );
};

export default AboutPage;
