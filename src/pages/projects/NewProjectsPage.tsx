import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  useTheme as useMuiTheme,
  alpha,
  useMediaQuery,
  IconButton,
  Tooltip,
  Grid,
  Chip,
  Stack,
  Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';
import projectsData from '../../data/projectsData';
import {
  FiFilter,
  FiGrid,
  FiList,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import NewProjectCard from '../../components/ui/projects/NewProjectCard';
import NewProjectDetail from '../../components/ui/projects/NewProjectDetail';
import PageTransition from '../../components/ui/transitions/PageTransition';

// 定义分类标签的类型
type CategoryType = 'all' | 'web' | 'mobile' | 'other';

// 定义视图模式类型
type ViewMode = 'grid' | 'list' | 'masonry';

/**
 * 全新设计的项目展示页面
 * 具有高级感和优雅的设计风格，使用响应式布局
 */
const NewProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';

  // 响应式断点
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(muiTheme.breakpoints.up('lg'));

  // 状态管理
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(!isMobile);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  // 构建唯一的项目ID
  const projectsWithId = useMemo(() => {
    return projectsData.map((project, index) => ({
      ...project,
      id: `project-${index}`,
    }));
  }, []);

  // 根据分类筛选项目
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projectsWithId;
    }
    return projectsWithId.filter(project => project.category === selectedCategory);
  }, [projectsWithId, selectedCategory]);

  // 获取当前选中的项目
  const selectedProject = useMemo(() => {
    return projectsWithId.find(project => project.id === selectedProjectId);
  }, [projectsWithId, selectedProjectId]);

  // 处理项目选择 - 不再滚动到顶部
  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  // 处理关闭详情
  const handleCloseDetail = () => {
    setSelectedProjectId(null);
  };

  // 处理分类切换
  const handleCategoryChange = (category: CategoryType) => {
    setSelectedCategory(category);
    setSelectedProjectId(null);
  };

  // 处理视图模式切换
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  // 切换筛选器展开状态
  const toggleFilterExpanded = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  // 获取分类文本
  const getCategoryLabel = (category: CategoryType) => {
    switch (category) {
      case 'all':
        return language === 'en' ? 'All Projects' : '全部';
      case 'web':
        return language === 'en' ? 'Web Apps' : '网页应用';
      case 'mobile':
        return language === 'en' ? 'Mobile Apps' : '移动应用';
      case 'other':
        return language === 'en' ? 'Other Projects' : '其他项目';
      default:
        return '';
    }
  };

  // 简化动画变体，减少卡顿
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.3
      }
    }
  };

  return (
    <PageTransition>
      <Box
        sx={{
          minHeight: '100vh',
          padding: { xs: 2, sm: 3, md: 4 },
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* 简化后的标题区域 */}
        <Container maxWidth="xl" sx={{ mb: 4 }}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: { xs: 1, md: 2 } }}>
            <Typography
              variant="h1"
              component={motion.h1}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 800,
                background: isDark
                  ? 'linear-gradient(90deg, #fff 0%, #bbb 100%)'
                  : 'linear-gradient(90deg, #111 0%, #555 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              {language === 'en' ? 'Projects' : '项目'}
            </Typography>
            <Typography
              variant="subtitle1"
              component={motion.p}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: 'text.secondary',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              {language === 'en'
                ? 'A showcase of my recent work and collaborative projects'
                : '展示我近期的工作和合作项目'}
            </Typography>
          </Box>

          {/* 优化后的控制面板 */}
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            elevation={0}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
              mb: 3,
              background: isDark
                ? alpha(muiTheme.palette.background.paper, 0.2)
                : alpha(muiTheme.palette.background.paper, 0.7),
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '16px',
              p: { xs: 2, sm: 3 },
              border: `1px solid ${alpha(isDark ? '#fff' : '#000', 0.1)}`,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: { xs: '100%', sm: 'auto' },
                justifyContent: 'space-between'
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <FiFilter size={20} />
              </Stack>
              {isMobile && (
                <IconButton onClick={toggleFilterExpanded} size="small">
                  {isFilterExpanded ? <FiChevronUp /> : <FiChevronDown />}
                </IconButton>
              )}
            </Box>

            {/* 改进的筛选和视图模式控制 */}
            <AnimatePresence>
              {isFilterExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    overflow: 'hidden',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      width: '100%',
                      gap: 2,
                      pt: { xs: 2, sm: 0 }
                    }}
                  >
                    {/* 分类标签 */}
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      sx={{
                        flex: '1 1 auto',
                        gap: 1,
                        py: 0.5,
                        px: 0.2
                      }}
                    >
                      {(['all', 'web', 'mobile', 'other'] as CategoryType[]).map((category) => (
                        <Chip
                          key={category}
                          label={getCategoryLabel(category)}
                          onClick={() => handleCategoryChange(category)}
                          color={selectedCategory === category ? 'primary' : 'default'}
                          variant={selectedCategory === category ? 'filled' : 'outlined'}
                          component={motion.div}
                          whileHover={{ scale: 1.08, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          sx={{
                            fontWeight: 500,
                            px: 1,
                            borderRadius: '8px',
                            height: '32px',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </Stack>

                    {/* 视图模式切换 */}
                    <Stack direction="row" spacing={1}>
                      <Tooltip title={language === 'en' ? 'Grid View' : '网格视图'}>
                        <IconButton
                          onClick={() => handleViewModeChange('grid')}
                          color={viewMode === 'grid' ? 'primary' : 'default'}
                          size="small"
                          sx={{
                            border: viewMode === 'grid'
                              ? `1px solid ${muiTheme.palette.primary.main}`
                              : `1px solid ${alpha(isDark ? '#fff' : '#000', 0.1)}`,
                            borderRadius: '8px',
                          }}
                        >
                          <FiGrid />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={language === 'en' ? 'List View' : '列表视图'}>
                        <IconButton
                          onClick={() => handleViewModeChange('list')}
                          color={viewMode === 'list' ? 'primary' : 'default'}
                          size="small"
                          sx={{
                            border: viewMode === 'list'
                              ? `1px solid ${muiTheme.palette.primary.main}`
                              : `1px solid ${alpha(isDark ? '#fff' : '#000', 0.1)}`,
                            borderRadius: '8px',
                          }}
                        >
                          <FiList />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Paper>
        </Container>

        {/* 项目内容区 */}
        <Container maxWidth="xl">
          {/* 项目列表 */}
          <motion.div
            key="project-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '300px',
                  gap: 2,
                }}
              >
                <FiRefreshCw size={40} />
                <Typography variant="h6">
                  {language === 'en' ? 'No projects found' : '未找到项目'}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  {language === 'en'
                    ? 'Try changing your filter criteria'
                    : '尝试更改筛选条件'}
                </Typography>
              </Box>
            ) : (
              <LayoutGroup>
                <Grid
                  container
                  spacing={viewMode === 'list' ? 2 : 3}
                  columns={12}
                >
                  {filteredProjects.map((project, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={viewMode === 'list' ? 12 : 6}
                      md={viewMode === 'list' ? 12 : 4}
                      lg={viewMode === 'list' ? 12 : 3}
                      key={project.id}
                      sx={{
                        height: viewMode === 'list' ? 'auto' : '100%',
                        width: '100%',
                      }}
                    >
                      <motion.div
                        layout
                        variants={cardVariants}
                        transition={{ delay: index * 0.03, type: 'spring', stiffness: 400, damping: 30 }}
                        style={{
                          height: viewMode === 'list' ? 'auto' : '100%',
                          width: '100%'
                        }}
                      >
                        <NewProjectCard
                          project={project}
                          viewMode={viewMode}
                          onSelect={() => handleProjectSelect(project.id)}
                          index={index}
                        />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </LayoutGroup>
            )}
          </motion.div>
        </Container>

        {/* 项目详情覆盖层 */}
        <AnimatePresence>
          {selectedProjectId && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCloseDetail}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000,
                backdropFilter: 'blur(10px)',
                backgroundColor: isDark
                  ? 'rgba(0, 0, 0, 0.7)'
                  : 'rgba(255, 255, 255, 0.7)',
                overflow: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: {xs: 2, sm: 4}
              }}
            >
              <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                  width: '100%',
                  maxWidth: isImageExpanded ? '1000px' : '900px',
                  maxHeight: '90vh'
                }}
              >
                <NewProjectDetail
                  project={selectedProject}
                  onClose={handleCloseDetail}
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </PageTransition>
  );
};

export default NewProjectsPage;
