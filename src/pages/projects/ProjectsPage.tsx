import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Link as MuiLink,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiExternalLink, FiGithub, FiCode, FiLayers, FiBriefcase, FiFilter } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';
import GlassPanel from '../../components/ui/glass/GlassPanel';
import PageTransition from '../../components/ui/transitions/PageTransition';
import CustomTooltip from '../../components/ui/common/CustomTooltip';
import AnimatedLink from '../../components/ui/common/AnimatedLink';

interface Project {
  name: string;
  nameZh: string;
  url: string;
  description: string;
  descriptionZh: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  category?: string;
  githubUrl?: string;
  showAllTechnologies?: boolean;
}

interface ProjectsPageProps {
  data: Project[];
}

/**
 * 项目展示页面组件
 * 展示个人项目作品
 */
const ProjectsPage: React.FC<ProjectsPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [projects, setProjects] = useState(data.map(project => ({ ...project, showAllTechnologies: false })));
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // 过滤项目
  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter, projects]);

  // 展开/收起技术栈
  const toggleTechnologies = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects[index].showAllTechnologies = !updatedProjects[index].showAllTechnologies;
    setProjects(updatedProjects);
  };

  // 获取本地化的项目名称
  const getLocalizedName = (project: Project) => {
    return language === 'zh' ? project.nameZh : project.name;
  };

  // 获取本地化的项目描述
  const getLocalizedDescription = (project: Project) => {
    return language === 'zh' ? project.descriptionZh : project.description;
  };

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  };

  // 项目类别
  const categories = [
    { value: 'all', label: t('projects.filters.all', '全部'), icon: <FiLayers size={18} /> },
    { value: 'web', label: t('projects.filters.web', '网页'), icon: <FiCode size={18} /> },
    { value: 'mobile', label: t('projects.filters.mobile', '移动'), icon: <FiBriefcase size={18} /> },
    { value: 'other', label: t('projects.filters.other', '其他'), icon: <FiFilter size={18} /> }
  ];

  // 根据技术栈生成颜色
  const getTechColor = (tech: string, index: number) => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
    // 基于技术名称的哈希值选择颜色
    const hash = tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <PageTransition mode="fade">
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
              gutterBottom
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                mb: 3
              }}
            >
              {t('projects.title')}
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
              {t('projects.subtitle')}
            </Typography>
          </motion.div>

          {/* 项目筛选 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 6
            }}
          >
            <Tabs
              value={filter}
              onChange={(_, newValue) => setFilter(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                mb: 4,
                '& .MuiTab-root': {
                  minWidth: 100,
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: '50px',
                  mx: 0.5,
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: theme === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)',
                    color: 'primary.main'
                  }
                },
                '& .Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 600
                },
                '& .MuiTabs-indicator': {
                  display: 'none'
                }
              }}
            >
              {categories.map((category) => (
                <Tab
                  key={category.value}
                  value={category.value}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {category.icon}
                      {category.label}
                    </Box>
                  }
                  sx={{
                    backgroundColor: filter === category.value
                      ? theme === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.05)'
                      : 'transparent'
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* 项目列表 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              exit={{ opacity: 0 }}
            >
              <Grid container spacing={4}>
                {filteredProjects.map((project, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <motion.div variants={itemVariants}>
                      <GlassPanel
                        variant="elevated"
                        intensity="medium"
                        hoverEffect
                        sx={{
                          height: '100%',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: '16px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: theme === 'dark'
                              ? '0 10px 30px rgba(255, 255, 255, 0.1)'
                              : '0 10px 30px rgba(0, 0, 0, 0.1)'
                          }
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={project.imageUrl}
                            alt={getLocalizedName(project)}
                            sx={{
                              objectFit: 'cover',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.05)'
                              }
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              display: 'flex',
                              gap: 1
                            }}
                          >
                            {project.category && (
                              <Chip
                                size="small"
                                label={t(`projects.filters.${project.category}`, project.category)}
                                sx={{
                                  backgroundColor: theme === 'dark'
                                    ? 'rgba(0, 0, 0, 0.6)'
                                    : 'rgba(255, 255, 255, 0.8)',
                                  backdropFilter: 'blur(8px)',
                                  borderRadius: '50px',
                                  fontSize: '0.7rem',
                                  fontWeight: 600,
                                  color: theme === 'dark' ? 'white' : 'text.primary'
                                }}
                              />
                            )}
                          </Box>
                        </Box>

                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                            {getLocalizedName(project)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
                            {getLocalizedDescription(project)}
                          </Typography>

                          <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
                          >
                            <FiCode size={14} />
                            {t('projects.technologies')}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                            {(project.showAllTechnologies
                              ? project.technologies
                              : project.technologies.slice(0, 4)
                            ).map((tech, idx) => (
                              <Chip
                                key={idx}
                                label={tech}
                                size="small"
                                color={getTechColor(tech, idx) as any}
                                variant="outlined"
                                sx={{ borderRadius: '8px', fontSize: '0.7rem' }}
                              />
                            ))}
                            {project.technologies.length > 4 && !project.showAllTechnologies && (
                              <Chip
                                label={`+${project.technologies.length - 4}`}
                                size="small"
                                variant="outlined"
                                onClick={() => toggleTechnologies(index)}
                                sx={{ borderRadius: '8px', fontSize: '0.7rem', cursor: 'pointer' }}
                              />
                            )}
                          </Box>
                        </CardContent>

                        <Divider sx={{ opacity: 0.1 }} />

                        <CardActions sx={{ p: 2, justifyContent: 'space-between', gap: 1 }}>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <AnimatedLink to={project.url} variant="button">
                              <Button
                                size="small"
                                variant="contained"
                                endIcon={<FiExternalLink size={14} />}
                                sx={{ textTransform: 'none', fontWeight: 500, borderRadius: '8px' }}
                              >
                                {t('projects.viewProject')}
                              </Button>
                            </AnimatedLink>
                          </Box>
                          <Box>
                            {project.githubUrl && (
                              <CustomTooltip title={t('projects.viewCode')} placement="top">
                                <IconButton
                                  size="small"
                                  component="a"
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={t('projects.viewCode')}
                                  sx={{
                                    color: theme === 'dark' ? 'text.primary' : 'text.secondary',
                                    '&:hover': {
                                      color: 'primary.main',
                                      backgroundColor: theme === 'dark'
                                        ? 'rgba(255, 255, 255, 0.1)'
                                        : 'rgba(0, 0, 0, 0.05)'
                                    }
                                  }}
                                >
                                  <FiGithub size={20} />
                                </IconButton>
                              </CustomTooltip>
                            )}
                          </Box>
                        </CardActions>
                      </GlassPanel>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default ProjectsPage;
