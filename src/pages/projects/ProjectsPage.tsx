import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  Tabs,
  Tab,
  alpha,
  useTheme as useMuiTheme,
  useMediaQuery,
  Chip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiCode, FiLayers, FiBriefcase, FiServer, FiFilter } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import PageTitle from '../../components/ui/common/PageTitle';
import PageTransition from '../../components/ui/transitions/PageTransition';
import EnhancedProjectCard from '../../components/ui/projects/EnhancedProjectCard';
import projectsData from '../../data/projectsData';
import { useSwipeable } from 'react-swipeable';

/**
 * 项目展示页面组件 - 改进版
 * 展示个人项目作品，支持筛选、动画和移动端滑动
 */
const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  // 状态
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  // 滑动功能相关
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slidingDirection, setSlidingDirection] = useState<'left' | 'right' | null>(null);

  // 当筛选器变化时，更新项目列表
  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => project.category === filter));
    }
  }, [filter]);

  // 提取所有唯一的项目类别
  useEffect(() => {
    const categories = ['all', ...new Set(projectsData.map(project => project.category || 'other'))];
    setUniqueCategories(categories);
  }, []);

  // 标签切换时的处理函数
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilter(newValue);
  };

  // 自定义滑动处理函数
  const handleSwipeChangeIndex = (index: number) => {
    if (index >= 0 && index < uniqueCategories.length) {
      setFilter(uniqueCategories[index]);
      setCurrentSlideIndex(index);
    }
  };

  // 处理类别的滑动手势
  const categorySwipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const nextIndex = Math.min(uniqueCategories.indexOf(filter) + 1, uniqueCategories.length - 1);
      setSlidingDirection('left');
      handleSwipeChangeIndex(nextIndex);
    },
    onSwipedRight: () => {
      const prevIndex = Math.max(uniqueCategories.indexOf(filter) - 1, 0);
      setSlidingDirection('right');
      handleSwipeChangeIndex(prevIndex);
    },
    trackMouse: true,
    preventScrollOnSwipe: true
  });

  // 处理项目卡片的滑动手势
  const projectSwipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const nextIndex = Math.min(currentSlideIndex + 1, filteredProjects.length - 1);
      setSlidingDirection('left');
      setCurrentSlideIndex(nextIndex);
    },
    onSwipedRight: () => {
      const prevIndex = Math.max(currentSlideIndex - 1, 0);
      setSlidingDirection('right');
      setCurrentSlideIndex(prevIndex);
    },
    trackMouse: true,
    preventScrollOnSwipe: true
  });

  // 过滤器切换动画变体
  const filterChipVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  // 滑动动画变体
  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? -300 : 300,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    })
  };

  // 获取类别图标
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return <FiCode size={isMobile ? 16 : 20} />;
      case 'mobile':
        return <FiBriefcase size={isMobile ? 16 : 20} />;
      case 'other':
        return <FiServer size={isMobile ? 16 : 20} />;
      default:
        return <FiLayers size={isMobile ? 16 : 20} />;
    }
  };

  // 获取类别标签文本
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'all':
        return t('projects.filters.all', '全部');
      case 'web':
        return t('projects.filters.web', '网页');
      case 'mobile':
        return t('projects.filters.mobile', '移动');
      case 'other':
        return t('projects.filters.other', '其他');
      default:
        return category;
    }
  };

  // 自定义滑动视图组件
  const CustomSwipeableView: React.FC<{
    children: React.ReactNode[];
    index: number;
    style?: React.CSSProperties;
  }> = ({ children, index, style }) => {
    const currentChild = children[index];

    return (
      <Box
        {...categorySwipeHandlers}
        style={{
          overflow: 'hidden',
          ...style
        }}
      >
        <AnimatePresence initial={false} custom={slidingDirection}>
          <motion.div
            key={index}
            custom={slidingDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ width: '100%' }}
          >
            {currentChild}
          </motion.div>
        </AnimatePresence>
      </Box>
    );
  };

  // 项目卡片滑动视图组件
  const ProjectSwipeableView: React.FC<{
    projects: typeof filteredProjects;
  }> = ({ projects }) => {
    return (
      <Box {...projectSwipeHandlers} sx={{ width: '100%', overflow: 'hidden' }}>
        <AnimatePresence initial={false} custom={slidingDirection}>
          <motion.div
            key={currentSlideIndex}
            custom={slidingDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ width: '100%', padding: '0 8px' }}
          >
            <Box sx={{ px: 1, py: 2 }}>
              {projects.length > 0 && currentSlideIndex < projects.length && (
                <EnhancedProjectCard
                  name={projects[currentSlideIndex].name}
                  nameZh={projects[currentSlideIndex].nameZh || projects[currentSlideIndex].name}
                  description={projects[currentSlideIndex].description}
                  descriptionZh={projects[currentSlideIndex].descriptionZh || projects[currentSlideIndex].description}
                  longDescription={projects[currentSlideIndex].longDescription}
                  technologies={projects[currentSlideIndex].technologies || []}
                  imageUrl={projects[currentSlideIndex].imageUrl}
                  url={projects[currentSlideIndex].url}
                  githubUrl={projects[currentSlideIndex].githubUrl}
                  category={projects[currentSlideIndex].category}
                  index={currentSlideIndex}
                />
              )}
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* 滑动指示器 */}
        {projects.length > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            {projects.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => {
                  setSlidingDirection(idx > currentSlideIndex ? 'left' : 'right');
                  setCurrentSlideIndex(idx);
                }}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: idx === currentSlideIndex
                    ? muiTheme.palette.primary.main
                    : alpha(muiTheme.palette.primary.main, 0.3),
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <PageTransition mode="fade">
      <Box sx={{
        py: { xs: 4, sm: 6, md: 8 },
        minHeight: '100vh',
        position: 'relative'
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
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

          {/* 项目筛选 - 移动端和桌面端优化 */}
          <Box
            sx={{
              mb: { xs: 4, sm: 5, md: 6 },
              mt: { xs: 3, sm: 4 }
            }}
          >
            {/* 桌面端标签 */}
            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    borderRadius: '50px',
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
                    boxShadow: theme === 'dark'
                      ? '0 8px 20px rgba(0, 0, 0, 0.3)'
                      : '0 8px 20px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    padding: '0.5rem',
                    width: 'fit-content'
                  }}
                >
                  <Tabs
                    value={filter}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                      minHeight: '48px',
                      '& .MuiTab-root': {
                        borderRadius: '50px',
                        minHeight: '48px',
                        minWidth: { xs: '100px', sm: '120px' },
                        fontSize: '0.875rem',
                        px: 3,
                        py: 1.5,
                        transition: 'all 0.3s ease',
                        fontWeight: 500,
                        textTransform: 'none',
                        color: theme === 'dark' ? '#fff' : '#000',
                        '&.Mui-selected': {
                          background: alpha(muiTheme.palette.primary.main, 0.15),
                          color: muiTheme.palette.primary.main,
                          fontWeight: 600
                        },
                      },
                      '& .MuiTabs-indicator': {
                        display: 'none',
                      },
                      '& .MuiTabScrollButton-root': {
                        color: theme === 'dark' ? '#fff' : '#000',
                      }
                    }}
                  >
                    {uniqueCategories.map(category => (
                      <Tab
                        key={category}
                        icon={getCategoryIcon(category)}
                        label={getCategoryLabel(category)}
                        iconPosition="start"
                        value={category}
                      />
                    ))}
                  </Tabs>
                </Box>
              </Box>
            )}

            {/* 移动端滑动标签 */}
            {isMobile && (
              <Box>
                {/* 选中的标签显示 */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <Chip
                    icon={<FiFilter size={16} />}
                    label={`${t('projects.filterBy', '分类')} : ${getCategoryLabel(filter)}`}
                    color="primary"
                    variant="outlined"
                    sx={{
                      borderRadius: '50px',
                      height: '36px',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                      borderColor: alpha(muiTheme.palette.primary.main, 0.3),
                    }}
                  />
                </Box>

                {/* 滑动标签区域 */}
                <CustomSwipeableView
                  index={uniqueCategories.indexOf(filter)}
                  style={{ padding: '0 8px' }}
                >
                  {uniqueCategories.map(category => (
                    <Box
                      key={category}
                      sx={{
                        padding: 2,
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        backgroundColor: alpha(
                          theme === 'dark' ? '#000' : '#fff',
                          theme === 'dark' ? 0.3 : 0.5
                        ),
                        border: `1px solid ${alpha(
                          theme === 'dark' ? '#fff' : '#000',
                          0.05
                        )}`,
                        boxShadow: theme === 'dark'
                          ? '0 4px 12px rgba(0, 0, 0, 0.2)'
                          : '0 4px 12px rgba(0, 0, 0, 0.08)',
                        textAlign: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1
                        }}
                      >
                        {getCategoryIcon(category)}
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: filter === category
                              ? muiTheme.palette.primary.main
                              : theme === 'dark' ? '#fff' : '#000'
                          }}
                        >
                          {getCategoryLabel(category)}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 0.5,
                          color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
                        }}
                      >
                        {filter === category
                          ? t('projects.currentCategory', '当前分类')
                          : t('projects.swipeToView', '滑动切换')}
                      </Typography>
                    </Box>
                  ))}
                </CustomSwipeableView>
              </Box>
            )}
          </Box>

          {/* 活跃类别显示 - 桌面端 */}
          {!isMobile && filter !== 'all' && (
            <motion.div
              variants={filterChipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '2rem'
              }}
            >
              <Chip
                label={`${t('projects.activeFilter', '活跃筛选器')}: ${getCategoryLabel(filter)}`}
                color="primary"
                onDelete={() => setFilter('all')}
                sx={{
                  borderRadius: '50px',
                  height: '36px',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  backgroundColor: alpha(muiTheme.palette.primary.main, 0.15),
                  '& .MuiChip-deleteIcon': {
                    color: alpha(muiTheme.palette.primary.main, 0.7),
                    '&:hover': {
                      color: muiTheme.palette.primary.main
                    }
                  }
                }}
              />
            </motion.div>
          )}

          {/* 项目列表 - 移动端滑动视图 */}
          {isMobile ? (
            <ProjectSwipeableView projects={filteredProjects} />
          ) : (
            // 桌面端网格视图
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                  {filteredProjects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={`project-${project.name}-${index}`}>
                      <EnhancedProjectCard
                        name={project.name}
                        nameZh={project.nameZh || project.name}
                        description={project.description}
                        descriptionZh={project.descriptionZh || project.description}
                        longDescription={project.longDescription}
                        technologies={project.technologies || []}
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
          )}

          {/* 空状态提示 */}
          {filteredProjects.length === 0 && (
            <GlassyBlobBackground
              colorSet="cool"
              intensity="light"
              containerSx={{
                borderRadius: '16px',
                p: { xs: 4, sm: 5 },
                mt: { xs: 3, sm: 4 },
                mb: { xs: 4, sm: 5 },
                textAlign: 'center'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  {t('projects.emptyState.title', '暂无项目')}
                </Typography>
                <Typography variant="body1">
                  {t('projects.emptyState.message', '该分类下暂无项目，请尝试其他分类。')}
                </Typography>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ marginTop: '1.5rem' }}
                >
                  <Chip
                    label={t('projects.emptyState.showAll', '显示所有项目')}
                    color="primary"
                    onClick={() => setFilter('all')}
                    sx={{
                      fontWeight: 500,
                      py: 2.5,
                      px: 3,
                      borderRadius: '50px',
                      boxShadow: theme === 'dark'
                        ? '0 4px 12px rgba(0, 0, 0, 0.2)'
                        : '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </motion.div>
              </motion.div>
            </GlassyBlobBackground>
          )}
        </Container>
      </Box>
    </PageTransition>
  );
};

export default ProjectsPage;
