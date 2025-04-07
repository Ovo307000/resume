import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  alpha,
  useTheme as useMuiTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiServer, FiDatabase, FiSettings, FiMonitor, FiCode, FiZap } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import SkillDetail from '../../components/ui/SkillDetail';
import TagSphere from '../../components/ui/skills/TagSphere';
import { Skill } from '../../types/skill';
import PageTransition from '../../components/ui/transitions/PageTransition';
import TechnologyTag from '../../components/ui/projects/TechnologyTag';
import EnhancedPageTitle from '../../components/ui/common/EnhancedPageTitle';

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
 * 技能页面组件 - 重构版
 * 移除进度条，聚焦专业领域和标签云
 */
const SkillsPage: React.FC<SkillsPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

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

  const generateSkills = useMemo(() => () => {
    const allSkills: Skill[] = [];
    const combinedSkills = [
        ...data.programmingLanguages.map(name => ({ name, category: 'language' })),
        ...data.frameworks.map(name => ({ name, category: 'framework' })),
        ...data.tools.map(name => ({ name, category: 'tool' }))
    ];

    const getSkillLevel = (skill: string) => {
      const skillLowerCase = skill.toLowerCase();
      if (skillLowerCase.includes('java') || skillLowerCase.includes('spring')) return 90;
      if (skillLowerCase.includes('mysql') || skillLowerCase.includes('sql')) return 85;
      if (skillLowerCase.includes('docker') || skillLowerCase.includes('redis')) return 80;
      if (skillLowerCase.includes('react') || skillLowerCase.includes('vue')) return 70;
      return Math.floor(Math.random() * 20) + 65;
    };

    combinedSkills.forEach(skillInfo => {
        allSkills.push({
            name: skillInfo.name,
            value: getSkillLevel(skillInfo.name),
            level: getSkillLevel(skillInfo.name),
            category: skillInfo.category,
        });
    });

    return allSkills;
  }, [data]);

  const renderTechPool = () => {
    const allSkills = generateSkills();

    if (!allSkills || allSkills.length === 0) {
       return (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: { xs: '300px', sm: '350px', md: '400px' },
          borderRadius: '16px',
          bgcolor: alpha(
            theme === 'dark'
              ? muiTheme.palette.background.paper
              : muiTheme.palette.background.paper,
            theme === 'dark' ? 0.1 : 0.05
          ),
          border: `1px solid ${alpha(
            theme === 'dark' ? '#ffffff' : '#000000',
            theme === 'dark' ? 0.05 : 0.03
          )}`,
          boxShadow: theme === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.2)'
            : '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}>
          <Typography variant="body1" color="text.secondary">
            {theme === 'dark' ? '✨' : '⚙️'} 暂无技能标签数据
          </Typography>
        </Box>
      );
    }

    const techTags = allSkills.map(skill => ({
      name: skill.name,
      value: skill.value
    }));

    return (
      <GlassyBlobBackground
        colorSet="cool"
        intensity="light"
        glassEffect={true}
        containerSx={{
          width: '100%',
          height: { xs: '350px', sm: '400px', md: '500px' },
          position: 'relative',
          margin: '0 auto',
          maxWidth: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          border: `1px solid ${
            theme === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.05)'
          }`,
          boxShadow: theme === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.2)'
            : '0 8px 32px rgba(0, 0, 0, 0.08)',
          p: 0
        }}
      >
        <TagSphere
          tags={techTags}
          initialSpeed={0.8}
          animated={true}
          enableSizing={true}
          colorScheme="rainbow"
        />
      </GlassyBlobBackground>
    );
  };

  const renderSkillDetails = () => {
    const skillDetails = [
      {
        title: "后端开发",
        description: "作为Java后端工程师，熟悉Java编程语言，熟悉面向对象编程思想（OOP），包括封装、继承、多态等特性，并能灵活运用到实际项目开发中。熟悉Spring框架的核心概念，包括IoC（控制反转）和AOP（面向切面编程），能够灵活运用其特性进行模块化设计和解耦。",
        icon: <FiServer size={24} />,
        technologies: ["Spring Boot", "Spring MVC", "Spring JPA", "Java"],
        delay: 0
      },
      {
        title: "数据库技术",
        description: "熟悉多种数据库系统，包括关系型数据库和NoSQL数据库。熟练使用MySQL和PostgreSQL进行数据建模、查询优化和性能调优。了解Redis缓存技术，能够实现高效的数据缓存策略。熟悉MongoDB等文档型数据库的使用场景和应用方法。",
        icon: <FiDatabase size={24} />,
        technologies: ["MySQL", "PostgreSQL", "Redis", "MongoDB"],
        delay: 0.1
      },
      {
        title: "DevOps & 运维",
        description: "熟悉Linux常用命令，能够进行服务器日常维护和故障排查，并能编写Shell脚本进行自动化部署和监控。熟悉Nginx和Tomcat的配置和优化。熟练使用Git进行版本控制，熟悉Gitflow工作流，能够高效地进行代码管理和团队协作。熟悉Docker的基本概念和常用命令。",
        icon: <FiSettings size={24} />,
        technologies: ["Docker", "Linux", "Git"],
        delay: 0.2
      },
      {
        title: "前端技术",
        description: "虽然主要专注于后端开发，但也具备基本的前端开发能力。了解HTML/CSS/JavaScript等前端基础技术，能够使用React.js和Vue.js等现代前端框架构建用户界面。熟悉TypeScript提供的类型安全特性，能够开发更健壮的前端应用。",
        icon: <FiMonitor size={24} />,
        technologies: ["React.js", "Vue.js", "TypeScript", "Tailwind CSS"],
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
              technologies={detail.technologies.map(tech => ({ name: tech }))}
              delay={detail.delay}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  // 提取数据库技术的标签
  const databaseTechnologies = useMemo(() => {
    const dbDetails = renderSkillDetails().props.children[1]?.props.children.props;
    return dbDetails?.technologies || [];
  }, []);

  return (
    <PageTransition>
      <Container maxWidth="lg" sx={{ my: 4, position: 'relative' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <EnhancedPageTitle
              title={t('skills.title', '技能栈')}
              subtitle={t('skills.subtitle', '我的技术与专长领域')}
              textAlign="center"
              withAnimation={true}
              icon={<FiZap size={36} />}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                mt: 6,
                fontWeight: 600,
                textAlign: 'left',
                background: theme === 'dark'
                  ? 'linear-gradient(90deg, #ffeb3b 0%, #ff9800 100%)'
                  : 'linear-gradient(90deg, #f57f17 0%, #ef6c00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 1.5
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  color: theme === 'dark' ? '#ffeb3b' : '#f57f17',
                  filter: theme === 'dark' ? 'drop-shadow(0 0 2px rgba(255, 235, 59, 0.5))' : 'none',
                  transform: 'scale(1.3)'
                }}
              >
                <FiCode size={26} />
              </Box>
              {t('skills.techCloudTitle', '技术标签云')}
            </Typography>
            {renderTechPool()}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                mt: 6,
                fontWeight: 600,
                textAlign: 'left',
                background: theme === 'dark'
                  ? 'linear-gradient(90deg, #9c7aff 0%, #6a98ff 100%)'
                  : 'linear-gradient(90deg, #5e35b1 0%, #1976d2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 1.5
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  color: theme === 'dark' ? '#9c7aff' : '#5e35b1',
                  filter: theme === 'dark' ? 'drop-shadow(0 0 2px rgba(156, 122, 255, 0.5))' : 'none',
                  transform: 'scale(1.3)'
                }}
              >
                <FiZap size={26} />
              </Box>
              {t('skills.overviewTitle', '技能概述')}
            </Typography>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <GlassyBlobBackground
                colorSet="cool"
                intensity="light"
                glassEffect={true}
                containerSx={{
                  borderRadius: '20px',
                  p: { xs: 3, md: 4 },
                  mb: 6,
                  border: `1px solid ${
                    theme === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.05)'
                  }`,
                  boxShadow: theme === 'dark'
                    ? '0 8px 32px rgba(0, 0, 0, 0.2)'
                    : '0 8px 32px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      maxWidth: '800px',
                      mx: 'auto',
                      lineHeight: 1.8,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                      textAlign: 'center',
                      fontWeight: 400,
                      letterSpacing: '0.3px',
                      textShadow: theme === 'dark' ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none',
                    }}
                  >
                    作为Java后端工程师，我擅长构建<Box component="span" sx={{ fontWeight: 600, color: theme === 'dark' ? '#b19fff' : '#4c6ef5' }}>高性能</Box>、<Box component="span" sx={{ fontWeight: 600, color: theme === 'dark' ? '#b19fff' : '#4c6ef5' }}>可扩展</Box>的系统。不断跟进行业最新技术，精通<Box component="span" sx={{ fontWeight: 600, color: theme === 'dark' ? '#ff9a76' : '#ff6b3d' }}>Spring生态</Box>和各种<Box component="span" sx={{ fontWeight: 600, color: theme === 'dark' ? '#64b5f6' : '#1976d2' }}>数据库技术</Box>，同时也对前端开发保持积极学习的态度。
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mt: 3,
                      gap: 2,
                      flexWrap: 'wrap'
                    }}
                  >
                    {databaseTechnologies.map((tech: { name: string }, index: number) => (
                      <TechnologyTag key={tech.name} tech={tech.name} index={index} size="medium" />
                    ))}
                  </Box>
                </Box>
              </GlassyBlobBackground>
            </motion.div>
            {renderSkillDetails()}
          </motion.div>
        </motion.div>
      </Container>
    </PageTransition>
  );
};

export default SkillsPage;
