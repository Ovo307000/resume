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
  Chip,
  Button,
  IconButton,
  Tooltip,
  Stack
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiCode, FiLayers, FiBriefcase, FiServer, FiFilter, FiArrowLeft, FiArrowRight, FiGrid, FiList } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import PageTransition from '../../components/ui/transitions/PageTransition';
import EnhancedProjectCard from '../../components/ui/projects/EnhancedProjectCard';
import EnhancedPageTitle from '../../components/ui/common/EnhancedPageTitle';
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
    initial: { opacity: 0, y: -20, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  // 滑动动画变体
  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? 300 : -300,
      opacity: 0,
      rotateY: direction === 'left' ? -15 : 15,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? -300 : 300,
      opacity: 0,
      rotateY: direction === 'left' ? 15 : -15,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  // 获取类别图标
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return <FiCode size={isMobile ? 18 : 22} />;
      case 'mobile':
        return <FiBriefcase size={isMobile ? 18 : 22} />;
      case 'other':
        return <FiServer size={isMobile ? 18 : 22} />;
      default:
        return <FiLayers size={isMobile ? 18 : 22} />;
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
    // 动画进度参考值
    const [dragProgress, setDragProgress] = useState(0);

    // 处理拖动进度更新
    const handleDrag = (info: any) => {
      const xOffset = info.offset.x;
      const progress = Math.min(Math.max(xOffset / 150, -1), 1); // 归一化为 -1 到 1 之间
      setDragProgress(progress);
    };

    return (
      <Box
        {...projectSwipeHandlers}
        sx={{
          width: '100%',
          overflow: 'hidden',
          perspective: '1200px' // 添加透视效果增强3D感
        }}
      >
        <AnimatePresence initial={false} custom={slidingDirection}>
          <motion.div
            key={currentSlideIndex}
            custom={slidingDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x" // 允许水平拖动
            dragConstraints={{ left: 0, right: 0 }} // 限制拖动范围
            dragElastic={0.7} // 拖动弹性
            onDrag={handleDrag} // 拖动时更新进度
            onDragEnd={(e, info) => {
              if (info.offset.x < -100 && currentSlideIndex < projects.length - 1) {
                // 向左拖动超过阈值，显示下一个项目
                setSlidingDirection('left');
                setCurrentSlideIndex(currentSlideIndex + 1);
              } else if (info.offset.x > 100 && currentSlideIndex > 0) {
                // 向右拖动超过阈值，显示上一个项目
                setSlidingDirection('right');
                setCurrentSlideIndex(currentSlideIndex - 1);
              }
            }}
            style={{
              width: '100%',
              padding: '0 8px',
              transformStyle: 'preserve-3d',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
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
                  slideDirection={slidingDirection}
                />
              )}
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* 滑动指示器 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3,
            mb: 1
          }}
        >
            {projects.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => {
                const direction = idx > currentSlideIndex ? 'left' : 'right';
                setSlidingDirection(direction);
                  setCurrentSlideIndex(idx);
                }}
                sx={{
                width: idx === currentSlideIndex ? 24 : 8,
                  height: 8,
                borderRadius: 4,
                mx: 0.5,
                  backgroundColor: idx === currentSlideIndex
                    ? muiTheme.palette.primary.main
                    : alpha(muiTheme.palette.primary.main, 0.3),
                transition: 'all 0.3s ease',
                  cursor: 'pointer',
                '&:hover': {
                  backgroundColor: alpha(muiTheme.palette.primary.main, idx === currentSlideIndex ? 1 : 0.6)
                }
                }}
              />
            ))}
          </Box>

        {/* 翻页提示 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: 2,
            mb: 2
          }}
        >
          <Button
            variant="outlined"
            disabled={currentSlideIndex === 0}
            color="primary"
            size="small"
            startIcon={<FiArrowLeft />}
            onClick={() => {
              if (currentSlideIndex > 0) {
                setSlidingDirection('right');
                setCurrentSlideIndex(currentSlideIndex - 1);
              }
            }}
            sx={{
              minWidth: 'auto',
              borderRadius: 2,
              opacity: currentSlideIndex === 0 ? 0.5 : 1
            }}
          >
            上一个
          </Button>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {currentSlideIndex + 1} / {projects.length}
          </Typography>

          <Button
            variant="outlined"
            disabled={currentSlideIndex === projects.length - 1}
            color="primary"
            size="small"
            endIcon={<FiArrowRight />}
            onClick={() => {
              if (currentSlideIndex < projects.length - 1) {
                setSlidingDirection('left');
                setCurrentSlideIndex(currentSlideIndex + 1);
              }
            }}
            sx={{
              minWidth: 'auto',
              borderRadius: 2,
              opacity: currentSlideIndex === projects.length - 1 ? 0.5 : 1
            }}
          >
            下一个
          </Button>
        </Box>
      </Box>
    );
  };

  // 处理视图模式切换
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  return (
    <PageTransition>
      <Box sx={{ minHeight: '100vh', py: 5 }}>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          {/* 页面标题 */}
          <motion.div
            variants={containerVariants || {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants || {
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <EnhancedPageTitle
                title={t('projects.title', '项目展示')}
                subtitle={t('projects.subtitle', '我参与开发的应用与项目作品')}
                textAlign="center"
                withAnimation={true}
              />
            </motion.div>
          </motion.div>

          {/* 项目筛选 - 移动端和桌面端优化 */}
          <Box
            sx={{
              mb: { xs: 4, sm: 5, md: 6 },
              mt: { xs: 3, sm: 4 }
            }}
          >
            {/* 全新设计的分类筛选器 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.2
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  position: 'relative',
                }}
              >
                {/* 磨砂玻璃背景效果容器 */}
                <Box
                  sx={{
                    width: { xs: '95%', sm: '90%', md: '80%' },
                    maxWidth: '900px',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    backgroundColor: alpha(
                      theme === 'dark' ? muiTheme.palette.background.paper : muiTheme.palette.background.paper,
                      theme === 'dark' ? 0.15 : 0.2
                    ),
                    borderRadius: { xs: '20px', sm: '25px', md: '30px' },
                    border: `1px solid ${alpha(
                      theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.black,
                      theme === 'dark' ? 0.08 : 0.05
                    )}`,
                    boxShadow: theme === 'dark'
                      ? '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 10px rgba(99, 102, 241, 0.1) inset'
                      : '0 10px 40px rgba(0, 0, 0, 0.1), 0 0 10px rgba(99, 102, 241, 0.05) inset',
                    overflow: 'hidden',
                    padding: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                    position: 'relative',
                    // 增强的炫光效果
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-20px',
                      left: '-20px',
                      right: '-20px',
                      bottom: '-20px',
                      background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2), transparent 70%)',
                      opacity: 0.6,
                      zIndex: -1,
                      pointerEvents: 'none',
                      animation: 'pulse 10s infinite alternate ease-in-out'
                    },
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'scale(0.98) translate(-3px, 3px)',
                        opacity: 0.4
                      },
                      '50%': {
                        transform: 'scale(1.03) translate(3px, -2px)',
                        opacity: 0.6
                      },
                      '100%': {
                        transform: 'scale(0.98) translate(-3px, 3px)',
                        opacity: 0.4
                      }
                    }
                  }}
                >
                  {/* 筛选标题和视图模式切换按钮 */}
                  <Box sx={{
                    mb: { xs: 2, sm: 3 },
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2
                  }}>
                    <Box sx={{ flex: 1 }}></Box>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                          background: theme === 'dark'
                            ? 'linear-gradient(90deg, #a0a0ff 0%, #c0c0ff 100%)'
                            : 'linear-gradient(90deg, #4040ff 0%, #5060ff 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {t('projects.filterHeading', '浏览项目分类')}
                      </Typography>
                    </motion.div>

                    {/* 视图模式切换按钮 */}
                    <Stack direction="row" spacing={1} sx={{ flex: 1, justifyContent: 'flex-end' }}>
                      <Tooltip title={language === 'zh' ? '网格视图' : 'Grid View'}>
                        <IconButton
                          onClick={() => handleViewModeChange('grid')}
                          color={viewMode === 'grid' ? 'primary' : 'default'}
                          size="small"
                          sx={{
                            border: viewMode === 'grid'
                              ? `1px solid ${muiTheme.palette.primary.main}`
                              : `1px solid ${alpha(theme === 'dark' ? '#fff' : '#000', 0.1)}`,
                            borderRadius: '8px',
                          }}
                        >
                          <FiGrid />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={language === 'zh' ? '列表视图' : 'List View'}>
                        <IconButton
                          onClick={() => handleViewModeChange('list')}
                          color={viewMode === 'list' ? 'primary' : 'default'}
                          size="small"
                          sx={{
                            border: viewMode === 'list'
                              ? `1px solid ${muiTheme.palette.primary.main}`
                              : `1px solid ${alpha(theme === 'dark' ? '#fff' : '#000', 0.1)}`,
                            borderRadius: '8px',
                          }}
                        >
                          <FiList />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>

                  {/* 分类按钮组 */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: { xs: 1.5, sm: 2, md: 2.5 },
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    {uniqueCategories.map((category, index) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.2 + index * 0.1,
                          duration: 0.4,
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                        whileHover="hover"
                        whileTap="tap"
                        variants={filterChipVariants}
                      >
                        <Box
                          onClick={() => handleTabChange({} as React.SyntheticEvent, category)}
                          sx={{
                            position: 'relative',
                            padding: { xs: '0.8rem 1.2rem', sm: '0.9rem 1.4rem', md: '1rem 1.6rem' },
                            borderRadius: { xs: '15px', sm: '18px' },
                            cursor: 'pointer',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 1, sm: 1.5 },
                            backgroundColor: filter === category
                              ? alpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.25 : 0.15)
                              : alpha(
                                  theme === 'dark' ? muiTheme.palette.background.paper : muiTheme.palette.background.paper,
                                  theme === 'dark' ? 0.25 : 0.08
                                ),
                            boxShadow: filter === category
                              ? `0 8px 25px ${alpha(muiTheme.palette.primary.main, 0.25)}, 0 0 0 1px ${alpha(muiTheme.palette.primary.main, 0.2)}`
                              : `0 5px 15px ${alpha(theme === 'dark' ? '#000' : '#000', 0.05)}`,
                            border: `1px solid ${
                              filter === category
                                ? alpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.4 : 0.25)
                                : 'transparent'
                            }`,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: filter === category ? 'translateY(-2px)' : 'none',
                            '&:hover': {
                              backgroundColor: filter === category
                                ? alpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.3 : 0.2)
                                : alpha(
                                    theme === 'dark' ? muiTheme.palette.background.paper : muiTheme.palette.background.paper,
                                    theme === 'dark' ? 0.3 : 0.12
                                  ),
                              transform: 'translateY(-2px)',
                              boxShadow: filter === category
                                ? `0 10px 30px ${alpha(muiTheme.palette.primary.main, 0.3)}, 0 0 0 1px ${alpha(muiTheme.palette.primary.main, 0.25)}`
                                : `0 7px 20px ${alpha(theme === 'dark' ? '#000' : '#000', 0.08)}`
                            },
                            '&:active': {
                              transform: 'translateY(0px)'
                            },
                            // 添加底部的发光效果
                            '&::after': filter === category ? {
                              content: '""',
                              position: 'absolute',
                              bottom: '-10px',
                              left: '10%',
                              width: '80%',
                              height: '15px',
                              background: `radial-gradient(ellipse at center, ${alpha(muiTheme.palette.primary.main, 0.3)} 0%, transparent 70%)`,
                              opacity: 0.6,
                              filter: 'blur(5px)',
                              zIndex: -1
                            } : {}
                          }}
                        >
                          {/* 分类图标 */}
                          <motion.div
                            animate={{
                              rotate: filter === category ? [0, -8, 8, -4, 4, 0] : 0,
                              scale: filter === category ? [1, 1.15, 1] : 1
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: filter === category ? Infinity : 0,
                              repeatDelay: 5
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: filter === category
                                ? theme === 'dark' ? muiTheme.palette.primary.light : muiTheme.palette.primary.main
                                : theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'
                            }}
                          >
                            {getCategoryIcon(category)}
                          </motion.div>

                          {/* 分类名称 */}
                          <Typography
                            sx={{
                              fontWeight: filter === category ? 600 : 500,
                              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                              color: filter === category
                                ? theme === 'dark' ? muiTheme.palette.primary.light : muiTheme.palette.primary.main
                                : theme === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)',
                              letterSpacing: filter === category ? '0.3px' : 'normal',
                              transition: 'all 0.3s ease',
                              textShadow: filter === category
                                ? theme === 'dark' ? '0 0 8px rgba(160,160,255,0.3)' : 'none'
                                : 'none'
                            }}
                          >
                            {getCategoryLabel(category)}
                          </Typography>

                          {/* 选中指示器 */}
                          {filter === category && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                              style={{
                                position: 'absolute',
                                bottom: 6,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                backgroundColor: theme === 'dark' ? muiTheme.palette.primary.light : muiTheme.palette.primary.main
                              }}
                            />
                          )}
                        </Box>
                      </motion.div>
                    ))}
                  </Box>

                  {/* 装饰元素 */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      pointerEvents: 'none',
                      overflow: 'hidden',
                      borderRadius: 'inherit',
                      zIndex: 1
                    }}
                  >
                    {/* 顶部光效 */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '-100px',
                        left: '-100px',
                        width: '200px',
                        height: '200px',
                        background: `radial-gradient(circle, ${alpha(muiTheme.palette.primary.main, 0.2)} 0%, transparent 70%)`,
                        opacity: 0.6
                      }}
                    />

                    {/* 底部光效 */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '-100px',
                        right: '-100px',
                        width: '200px',
                        height: '200px',
                        background: `radial-gradient(circle, ${alpha(
                          theme === 'dark' ? '#a0a0ff' : muiTheme.palette.primary.main,
                          0.15
                        )} 0%, transparent 70%)`,
                        opacity: 0.6
                      }}
                    />
                  </Box>
                </Box>

                {/* 活动指示文本 */}
                {filter !== 'all' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 0.75,
                        borderRadius: '50px',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        backgroundColor: alpha(
                          theme === 'dark' ? muiTheme.palette.background.paper : muiTheme.palette.background.paper,
                          theme === 'dark' ? 0.2 : 0.15
                        ),
                        boxShadow: `0 2px 10px ${alpha(theme === 'dark' ? '#000' : '#000', 0.1)}`,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: muiTheme.palette.primary.main,
                          animation: 'pulse-dot 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite',
                          '@keyframes pulse-dot': {
                            '0%': { transform: 'scale(0.8)', opacity: 0.8 },
                            '50%': { transform: 'scale(1.2)', opacity: 1 },
                            '100%': { transform: 'scale(0.8)', opacity: 0.8 }
                          }
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'
                        }}
                      >
                        {t('projects.filteringBy', '当前筛选')}:&nbsp;
                        <Typography
                          component="span"
                          sx={{
                            fontWeight: 600,
                            color: theme === 'dark' ? muiTheme.palette.primary.light : muiTheme.palette.primary.main
                          }}
                        >
                          {getCategoryLabel(filter)}
                        </Typography>
                        &nbsp;
                      <Typography
                          component="span"
                        sx={{
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                            cursor: 'pointer',
                            '&:hover': {
                              color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                              textDecoration: 'underline'
                            }
                          }}
                          onClick={() => setFilter('all')}
                        >
                          ({t('projects.clearFilter', '清除')})
                        </Typography>
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </Box>
            </motion.div>
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
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} columns={12}>
                  {filteredProjects.map((project, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={viewMode === 'list' ? 12 : 6}
                      md={viewMode === 'list' ? 12 : 6}
                      lg={viewMode === 'list' ? 12 : 4}
                      key={`project-${project.name}-${index}`}
                    >
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
                        slideDirection={slidingDirection}
                        viewMode={viewMode}
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

