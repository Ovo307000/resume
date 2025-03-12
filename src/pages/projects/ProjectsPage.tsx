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

  // 优化动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // 更快的交错
        delayChildren: 0.1,
        when: "beforeChildren" // 先显示容器，再显示子元素
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1, // 反向交错退出，更自然
        when: "afterChildren" // 先隐藏子元素，再隐藏容器
      }
    }
  };

  // 卡片动画变体
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
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

  // 标签切换时的动画
  const handleTabChange = (_, newValue) => {
    setFilter(newValue);
  };

  return (
    <PageTransition mode="fade">
      <Box sx={{
        py: { xs: 4, sm: 6, md: 8 },  // 响应式垂直padding
        minHeight: '100vh' // 确保页面至少占满整个视口高度
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}> {/* 在不同设备上优化容器内边距 */}
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

          {/* 项目筛选 - 移动端优化 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: { xs: 4, sm: 5, md: 6 }, // 响应式margin
              px: { xs: 0, sm: 2 } // 小屏幕减少内边距
            }}
          >
            <Box
              sx={{
                width: '100%', // 在所有设备上都使用100%宽度
                maxWidth: { xs: '100%', sm: '600px' }, // 在小屏幕上限制最大宽度
                px: { xs: 0.5, sm: 1 }, // 减小小屏幕上的内边距
                py: { xs: 0.5, sm: 1 },
                borderRadius: { xs: '16px', sm: '50px' }, // 在小屏幕上减小圆角
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                backgroundColor: alpha(
                  theme === 'dark' ? muiTheme.palette.background.paper : muiTheme.palette.background.paper,
                  theme === 'dark' ? 0.2 : 0.3
                ),
                border: `1px solid ${alpha(
                  theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.black,
                  0.05
                )}`,
                transition: 'all 0.3s ease',
                boxShadow: theme === 'dark'
                  ? '0 8px 20px rgba(0, 0, 0, 0.2)'
                  : '0 8px 20px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden' // 确保内容不溢出
              }}
            >
              <Tabs
                value={filter}
                onChange={handleTabChange}
                variant="scrollable" // 在移动端使用可滚动选项卡
                scrollButtons="auto" // 自动显示滚动按钮
                allowScrollButtonsMobile // 允许在移动设备上显示滚动按钮
                indicatorColor="primary"
                textColor="primary"
                sx={{
                  '& .MuiTab-root': {
                    borderRadius: { xs: '8px', sm: '50px' }, // 在小屏幕上减小圆角
                    minHeight: { xs: '40px', sm: '48px' }, // 在小屏幕上减小高度
                    minWidth: { xs: '80px', sm: '120px' }, // 调整最小宽度
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }, // 调整字体大小
                    px: { xs: 1, sm: 2 }, // 在小屏幕上减小内边距
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      background: alpha(muiTheme.palette.primary.main, 0.1),
                      color: theme === 'dark' ? muiTheme.palette.primary.light : muiTheme.palette.primary.main,
                    },
                  },
                  '& .MuiTabs-indicator': {
                    display: 'none', // 隐藏默认指示器，使用自定义背景代替
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: { xs: '1rem', sm: '1.25rem' } // 调整图标大小
                  }
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

          {/* 项目列表 - 优化网格布局 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}> {/* 响应式间距 */}
                {filteredProjects.map((project, index) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={`project-${project.name}-${index}`}> {/* 调整列数：手机单列，平板/小桌面双列，大桌面三列 */}
                    <motion.div variants={cardVariants}>
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
                    </motion.div>
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
                p: { xs: 2, sm: 3, md: 4 }, // 响应式padding
                mt: { xs: 2, sm: 3, md: 4 }, // 修复这里的未定义变量 'a'
                mb: { xs: 4, sm: 5, md: 6 },
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
