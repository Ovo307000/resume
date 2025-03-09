import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  Tabs,
  Tab,
  alpha,
  useTheme as useMuiTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiCode, FiLayers, FiBriefcase, FiServer } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import PageTitle from '../../components/ui/common/PageTitle';
import PageTransition from '../../components/ui/transitions/PageTransition';
import ProjectCard from '../../components/ui/projects/ProjectCard';
import projectsData from '../../data/projectsData';

/**
 * 项目展示页面组件
 * 展示个人项目作品
 */
const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const muiTheme = useMuiTheme();

  // 过滤项目
  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => project.category === filter));
    }
  }, [filter]);

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
            <PageTitle
              title={t('projects.title', 'My Projects')}
              subtitle={t('projects.subtitle', 'Showcase of my latest work')}
            />
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
                    <ProjectCard
                      name={project.name}
                      nameZh={project.nameZh}
                      description={project.description}
                      descriptionZh={project.descriptionZh}
                      longDescription={project.longDescription}
                      technologies={project.technologies}
                      imageUrl={project.imageUrl}
                      url={project.url}
                      githubUrl={project.githubUrl}
                      category={project.category}
                      index={index}
                    />
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>

          {/* 空状态提示 */}
          {filteredProjects.length === 0 && (
            <GlassyBlobBackground
              colorSet="cool"
              intensity="light"
              containerSx={{
                borderRadius: '16px',
                p: { xs: 3, md: 4 },
                mt: 4,
                mb: 6,
                textAlign: 'center'
              }}
            >
              <Typography variant="h6" gutterBottom>
                {t('projects.emptyState.title', '暂无项目')}
              </Typography>
              <Typography variant="body1">
                {t('projects.emptyState.message', '该分类下暂无项目，请尝试其他分类。')}
              </Typography>
            </GlassyBlobBackground>
          )}
        </Container>
      </Box>
    </PageTransition>
  );
};

export default ProjectsPage;
