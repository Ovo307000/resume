import React from 'react';
import { Box, Grid, Paper, Container, Typography, Chip, Stack, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme as useMuiTheme } from '@mui/material/styles';
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
import TechTagGroup from '../../components/ui/common/TechTagGroup';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';
import AboutPageTitle from '../../components/ui/about/AboutPageTitle';

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
      level: 80,
      category: 'tool',
      icon: <FiPackage size={20} />,
      url: 'https://gradle.org/'
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
      name: 'Git',
      level: 85,
      category: 'tool',
      icon: <DiGitBranch size={20} />,
      url: 'https://git-scm.com/'
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
    {
      name: 'Linux',
      level: 75,
      category: 'tool',
      icon: <DiTerminal size={20} />,
      url: 'https://www.linux.org/'
    },
    {
      name: 'Socket.IO',
      level: 70,
      category: 'backend',
      icon: <FiWifi size={20} />,
      url: 'https://socket.io/'
    }
  ];

  // 教育经历
  const educations = [
    {
      school: '安徽财经大学',
      degree: '本科',
      major: '计算机科学与技术',
      period: '2022 - 2026',
      description: '专注于计算机科学基础理论学习和软件工程实践，参与多个校内项目和竞赛，获得优异成绩。'
    },
    {
      school: '安徽工商职业学院',
      degree: '大专',
      major: '软件技术',
      period: '2019 - 2022',
      description: '学习软件开发基础知识和实用技能，参与多个实训项目，获得国家奖学金和多项技能证书。'
    }
  ];

  // 项目经验
  const projects = [
    {
      name: 'Sky-Take-Out',
      role: '全栈开发',
      period: '2023年3月 - 2023年7月',
      description: '基于Spring Boot和Vue.js开发的餐饮外卖管理系统。实现了订单管理、菜品管理、员工管理等功能，通过Redis缓存和消息队列优化性能，支持高并发访问。',
      achievements: [
        '独立设计并实现了后端API和前端界面',
        '集成Redis实现数据缓存，提升系统响应速度',
        '使用RabbitMQ实现异步消息处理，提高系统吞吐量',
        '添加监控日志，实现系统性能实时监控'
      ],
      techs: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Vue.js', 'Element-UI', 'RabbitMQ'],
      image: '/images/projects/sky.jpg'
    },
    {
      name: 'Lease',
      role: '后端开发',
      period: '2022年10月 - 2023年1月',
      description: '针对短期租赁市场的服务平台，采用Spring Boot微服务架构，实现了用户管理、房源发布、预订管理、支付集成等功能，通过分布式设计支持高可用和水平扩展。',
      achievements: [
        '设计并实现RESTful API',
        '开发基于Spring Security的认证鉴权系统',
        '实现分布式事务处理，确保数据一致性',
        '集成第三方支付接口，实现安全支付'
      ],
      techs: ['Java', 'Spring Boot', 'Spring Cloud', 'MySQL', 'Redis', 'RabbitMQ', 'Docker'],
      image: '/images/projects/lease.jpg'
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

  // 技能分类
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const databaseSkills = skills.filter(skill => skill.category === 'database');
  const toolSkills = skills.filter(skill => skill.category === 'tool');

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { language } = useLanguage();

  // 根据技术名称判断分类
  const getTagCategory = (techName: string): string => {
    techName = techName.toLowerCase();

    // 后端语言和技术
    if (['java', 'spring', 'springboot', 'spring boot', 'jvm'].includes(techName)) {
      return 'backend';
    }

    if (['react', 'vue', 'angular'].includes(techName)) {
      return 'frontend';
    }

    if (['mysql', 'postgresql', 'mongodb', 'redis'].includes(techName)) {
      return 'database';
    }

    if (['docker', 'kubernetes', 'jenkins', 'linux', 'nginx'].includes(techName)) {
      return 'devops';
    }

    return 'other';
  };

  return (
    <Container maxWidth="lg">
      <Box component="main" sx={{ py: 4 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 页面标题 */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 6 }}>
              <AboutPageTitle withAnimation={false} />
            </Box>
          </motion.div>

          {/* 个人简介 */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                mb: 4,
                borderRadius: 3,
                bgcolor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: isDark ? 'white' : 'text.primary'
                }}
              >
                {t('about.introduction', '个人介绍')}
              </Typography>

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

              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  {traits.map((trait, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Chip
                        icon={trait.icon}
                        label={trait.name}
                        sx={{
                          width: '100%',
                          justifyContent: 'flex-start',
                          p: 0.5,
                          bgcolor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                          color: isDark ? '#a5b4fc' : '#4f46e5',
                          border: '1px solid',
                          borderColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)',
                          '& .MuiChip-icon': {
                            color: isDark ? '#818cf8' : '#6366f1',
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </motion.div>

          {/* 技能 */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                mb: 4,
                borderRadius: 3,
                bgcolor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: isDark ? 'white' : 'text.primary'
                }}
              >
                {t('about.skills', '技能与专长')}
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: isDark ? 'primary.light' : 'primary.main',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <FiServer style={{ marginRight: '8px' }} />
                  {t('about.backendSkills', '后端技术')}
                </Typography>

                <TechTagGroup
                  items={backendSkills}
                  maxItems={15}
                  enableExpand={true}
                  size="small"
                  techType="backend"
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: isDark ? 'primary.light' : 'primary.main',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <FiCode style={{ marginRight: '8px' }} />
                  {t('about.frontendSkills', '前端技术')}
                </Typography>

                <TechTagGroup
                  items={frontendSkills}
                  maxItems={15}
                  enableExpand={true}
                  size="small"
                  techType="frontend"
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: isDark ? 'primary.light' : 'primary.main',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <FiLayers style={{ marginRight: '8px' }} />
                  {t('about.databaseSkills', '数据库')}
                </Typography>

                <TechTagGroup
                  items={databaseSkills}
                  maxItems={15}
                  enableExpand={true}
                  size="small"
                  techType="database"
                />
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: isDark ? 'primary.light' : 'primary.main',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <FiTrendingUp style={{ marginRight: '8px' }} />
                  {t('about.toolSkills', '工具与平台')}
                </Typography>

                <TechTagGroup
                  items={toolSkills}
                  maxItems={15}
                  enableExpand={true}
                  size="small"
                  techType="tool"
                />
              </Box>
            </Paper>
          </motion.div>

          {/* 教育背景 */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                mb: 4,
                borderRadius: 3,
                bgcolor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: isDark ? 'white' : 'text.primary'
                }}
              >
                {t('about.education', '教育背景')}
              </Typography>

              <Grid container spacing={3}>
                {educations.map((education, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: 2,
                        bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)',
                        border: '1px solid',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: isDark
                            ? '0 10px 30px rgba(0, 0, 0, 0.15)'
                            : '0 10px 30px rgba(0, 0, 0, 0.07)',
                        }
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          color: isDark ? 'primary.light' : 'primary.main',
                          mb: 1
                        }}
                      >
                        {education.school}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isDark ? 'grey.400' : 'grey.700',
                          mb: 0.5
                        }}
                      >
                        {education.degree} · {education.major}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? 'grey.500' : 'grey.600',
                          mb: 2
                        }}
                      >
                        {education.period}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? 'grey.400' : 'grey.700',
                          lineHeight: 1.6
                        }}
                      >
                        {education.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>

          {/* 项目经验 */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                mb: 4,
                borderRadius: 3,
                bgcolor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: isDark ? 'white' : 'text.primary'
                }}
              >
                {t('about.projects', '项目经验')}
              </Typography>

              <Stack spacing={4}>
                {projects.map((project, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: { xs: 2, sm: 3 },
                      borderRadius: 2,
                      bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: isDark
                          ? '0 10px 30px rgba(0, 0, 0, 0.15)'
                          : '0 10px 30px rgba(0, 0, 0, 0.07)',
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
                            mb: 1
                          }}
                        >
                          {project.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: isDark ? 'grey.400' : 'grey.700',
                            mb: 0.5
                          }}
                        >
                          {project.role} | {project.period}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: isDark ? 'grey.400' : 'grey.700',
                            lineHeight: 1.6,
                            mb: 2
                          }}
                        >
                          {project.description}
                        </Typography>

                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: isDark ? 'grey.300' : 'grey.800'
                          }}
                        >
                          {t('about.achievements', '主要成果')}:
                        </Typography>

                        <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                          {project.achievements.map((achievement, i) => (
                            <Typography
                              component="li"
                              variant="body2"
                              key={i}
                              sx={{
                                color: isDark ? 'grey.400' : 'grey.700',
                                mb: 0.75
                              }}
                            >
                              {achievement}
                            </Typography>
                          ))}
                        </Box>

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

                        <Box>
                          <TechTagGroup
                            items={project.techs.map(tech => ({
                              name: tech,
                              category: getTagCategory(tech)
                            }))}
                            size="small"
                            enableExpand={false}
                          />
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
                          src={project.image}
                          alt={project.name}
                          sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: isDark
                              ? 'rgba(255, 255, 255, 0.1)'
                              : 'rgba(0, 0, 0, 0.05)',
                            boxShadow: isDark
                              ? '0 5px 15px rgba(0, 0, 0, 0.3)'
                              : '0 5px 15px rgba(0, 0, 0, 0.1)',
                            objectFit: 'cover'
                          }}
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            // 设置默认的占位图
                            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Project+Image';
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </motion.div>
        </motion.div>
      </Box>
    </Container>
  );
};

export default AboutPage;
