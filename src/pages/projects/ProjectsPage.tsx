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
  Divider,
  alpha,
  useTheme as useMuiTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiExternalLink, FiGithub, FiCode, FiLayers, FiBriefcase, FiFilter, FiServer } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';
import GlassPanel from '../../components/ui/glass/GlassPanel';
import PageTransition from '../../components/ui/transitions/PageTransition';
import CustomTooltip from '../../components/ui/common/CustomTooltip';
import AnimatedLink from '../../components/ui/common/AnimatedLink';
import ProjectButton from '../../components/ui/buttons/ProjectButton';
import AnimatedTagGroup from '../../components/ui/common/AnimatedTagGroup';

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
  const muiTheme = useMuiTheme();

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

  // 获取类别图标
  const getCategoryIcon = (index: number) => {
    const icons = [
      <FiLayers key="all" size={20} />, // 全部项目
      <FiCode key="web" size={20} />, // Web项目
      <FiBriefcase key="mobile" size={20} />, // 移动项目
      <FiServer key="other" size={20} /> // 其他项目
    ];
    return icons[index];
  };

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
            <Box
              sx={{
                width: { xs: '100%', sm: 'auto' },
                px: 1,
                py: 1,
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
                value={filter}
                onChange={(_, newValue) => setFilter(newValue)}
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
                  label={t('projects.filters.all', '全部')}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                  value="all"
                />
                <Tab
                  icon={getCategoryIcon(1)}
                  label={t('projects.filters.web', '网页')}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                  value="web"
                />
                <Tab
                  icon={getCategoryIcon(2)}
                  label={t('projects.filters.mobile', '移动')}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                  value="mobile"
                />
                <Tab
                  icon={getCategoryIcon(3)}
                  label={t('projects.filters.other', '其他')}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                  value="other"
                />
              </Tabs>
            </Box>
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

                          <AnimatedTagGroup
                            tags={project.technologies}
                            initialVisibleCount={4}
                            getTechColor={getTechColor}
                            chipProps={{
                              variant: 'outlined',
                              size: 'small',
                              borderRadius: '8px',
                              customSx: {
                                fontSize: '0.7rem',
                                height: { xs: '22px', md: '24px' },
                                '& .MuiChip-label': {
                                  px: 1
                                }
                              }
                            }}
                          />
                        </CardContent>

                        <Divider sx={{ opacity: 0.1 }} />

                        <CardActions sx={{ p: 2, justifyContent: 'space-between', gap: 1 }}>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <ProjectButton
                              href={project.url}
                              external
                              icon={<FiExternalLink size={14} />}
                              size="small"
                            >
                              {t('projects.viewProject')}
                            </ProjectButton>
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
                                    color: theme === 'dark' ? 'white' : 'text.primary',
                                    backgroundColor: alpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.1 : 0.05),
                                    '&:hover': {
                                      backgroundColor: alpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.2 : 0.1),
                                    }
                                  }}
                                >
                                  <FiGithub size={16} />
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
