import React, { useState, useMemo } from 'react';
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
import { FiServer, FiDatabase, FiSettings, FiMonitor } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import SkillDetail from '../../components/ui/SkillDetail';
import TagSphere from '../../components/ui/skills/TagSphere';
import { Skill } from '../../types/skill';
import { useLanguage } from '../../hooks/useLanguage';
import PageTransition from '../../components/ui/transitions/PageTransition';
import SkillsPageTitle from '../../components/ui/skills/SkillsPageTitle';
import TechnologyTag from '../../components/ui/projects/TechnologyTag';

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
  const { language } = useLanguage();

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
          borderRadius: 4,
        }}
      >
        <TagSphere
          tags={techTags}
          radius={200}
          initialSpeed={0.8}
          animated={true}
          enableSizing={true}
          colorScheme="gradient"
          tagStyle={{
            fontWeight: 500,
            textShadow: theme === 'dark' ? '0 1px 2px rgba(0,0,0,0.5)' : 'none'
          }}
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

  return (
    <PageTransition>
      <Container maxWidth="lg" sx={{ my: 4, position: 'relative' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <SkillsPageTitle withAnimation={false} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 600,
                textAlign: { xs: 'center', md: 'left' },
                background: theme === 'dark'
                  ? 'linear-gradient(90deg, #9c7aff 0%, #6a98ff 100%)'
                  : 'linear-gradient(90deg, #5e35b1 0%, #1976d2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px'
              }}
            >
              技能概述
            </Typography>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <GlassyBlobBackground
                colorSet="warm"
                intensity="light"
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
                    ? '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 8px rgba(120, 70, 255, 0.15) inset'
                    : '0 10px 30px rgba(0, 0, 0, 0.07), 0 0 8px rgba(80, 130, 255, 0.08) inset',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: theme === 'dark'
                      ? 'radial-gradient(circle, rgba(130, 80, 255, 0.15) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(90, 120, 255, 0.1) 0%, transparent 70%)',
                    opacity: 0.7,
                    zIndex: 0
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '-30px',
                    right: '-30px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: theme === 'dark'
                      ? 'radial-gradient(circle, rgba(255, 100, 100, 0.1) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(255, 120, 80, 0.08) 0%, transparent 70%)',
                    opacity: 0.6,
                    zIndex: 0
                  }}
                />
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
                    {['Java', 'Spring Boot', 'MySQL', 'Redis', 'Docker'].map((tech, index) => (
                      <TechnologyTag key={tech} tech={tech} index={index} size="medium" />
                    ))}
                  </Box>
                </Box>
              </GlassyBlobBackground>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              sx={{ mb: 3, fontWeight: 600, textAlign: { xs: 'center', md: 'left' } }}
            >
              专业领域
            </Typography>
            <Box sx={{ mb: 6 }}>
              {renderSkillDetails()}
            </Box>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              sx={{ mb: 3, fontWeight: 600, textAlign: { xs: 'center', md: 'left' } }}
            >
              技能标签云
            </Typography>
            {renderTechPool()}
          </motion.div>
        </motion.div>
      </Container>
    </PageTransition>
  );
};

export default SkillsPage;
