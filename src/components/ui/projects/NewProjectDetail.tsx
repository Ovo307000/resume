import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Tooltip,
  alpha,
  useTheme as useMuiTheme,
  useMediaQuery,
  Paper,
  Stack,
  Chip
} from '@mui/material';
import {
  FiX,
  FiGithub,
  FiExternalLink,
  FiArrowLeft,
  FiMaximize2,
  FiMinimize2,
  FiDownload,
  FiTag,
  FiPaperclip
} from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../hooks/useLanguage';
import TechnologyTag from './TechnologyTag';

// 项目数据接口
interface Project {
  id: string;
  name: string;
  nameZh?: string;
  description: string;
  descriptionZh?: string;
  longDescription?: string | { en: string; zh: string };
  technologies?: string[];
  imageUrl: string;
  url?: string;
  githubUrl?: string;
  category?: string;
  index?: number;
}

// 组件属性接口
interface NewProjectDetailProps {
  project: Project;
  onClose: () => void;
}

/**
 * 全新设计的项目详情组件
 * 展示项目的详细信息，使用优雅的动画和布局
 */
const NewProjectDetail: React.FC<NewProjectDetailProps> = ({
  project,
  onClose
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';

  // 响应式断点
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 状态
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 获取本地化内容
  const localizedName = language === 'en' ? project.name : (project.nameZh || project.name);
  const localizedDescription = language === 'en' ? project.description : (project.descriptionZh || project.description);

  // 获取本地化长描述
  const getLocalizedLongDescription = () => {
    if (!project.longDescription) return '';

    if (typeof project.longDescription === 'string') {
      return project.longDescription;
    }

    if (typeof project.longDescription === 'object') {
      return language === 'en'
        ? project.longDescription.en
        : (project.longDescription.zh || project.longDescription.en);
    }

    return '';
  };

  // 处理 ESC 键关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // 处理图片加载完成
  useEffect(() => {
    const img = new Image();
    img.src = project.imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [project.imageUrl]);

  // 切换图片展开状态
  const toggleImageExpand = () => {
    setIsImageExpanded(!isImageExpanded);
  };

  // 处理外部链接点击
  const handleLinkClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // 处理图片下载
  const handleImageDownload = () => {
    const link = document.createElement('a');
    link.href = project.imageUrl;
    link.download = `${project.name}-project.${project.imageUrl.split('.').pop()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "tween",
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.3
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.3
      }
    }
  };

  // 类别标签映射
  const getCategoryLabel = (category: string = 'other') => {
    switch (category) {
      case 'web':
        return language === 'en' ? 'Web Application' : '网页应用';
      case 'mobile':
        return language === 'en' ? 'Mobile Application' : '移动应用';
      case 'other':
        return language === 'en' ? 'Other Project' : '其他项目';
      default:
        return category;
    }
  };

  const longDescription = getLocalizedLongDescription();

  // 最大宽度设置
  const maxWidth = isImageExpanded ? '1000px' : '900px';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        width: '100%',
        maxWidth,
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: isDark
            ? alpha(muiTheme.palette.background.paper, 0.4)
            : alpha(muiTheme.palette.background.paper, 0.7),
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `1px solid ${alpha(isDark ? '#fff' : '#000', 0.1)}`,
          boxShadow: isDark
            ? `0 20px 80px -10px ${alpha('#000', 0.5)}`
            : `0 20px 80px -10px ${alpha('#000', 0.2)}`,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        {/* 返回按钮 */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 10,
          }}
        >
          <motion.div
            variants={headerVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              onClick={onClose}
              aria-label="back"
              size="small"
              sx={{
                backgroundColor: isDark
                  ? alpha(muiTheme.palette.background.paper, 0.5)
                  : alpha(muiTheme.palette.background.paper, 0.8),
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: 'text.primary',
                border: `1px solid ${alpha(isDark ? '#fff' : '#000', 0.1)}`,
                '&:hover': {
                  backgroundColor: isDark
                    ? alpha(muiTheme.palette.background.paper, 0.7)
                    : alpha(muiTheme.palette.background.paper, 1),
                }
              }}
            >
              <FiArrowLeft size={18} />
            </IconButton>
          </motion.div>
        </Box>

        {/* 图片区域 */}
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              height: isImageExpanded ? '50vh' : '40vh',
              position: 'relative',
              overflow: 'hidden',
              transition: 'height 0.3s ease-in-out',
            }}
          >
            <Box
              component={motion.div}
              variants={childVariants}
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${project.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: isDark ? 'brightness(0.85)' : 'none',
                transition: 'filter 0.3s ease-in-out',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '150px',
                  background: `linear-gradient(to top, ${isDark ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)'} 0%, transparent 100%)`,
                  pointerEvents: 'none',
                }
              }}
            />
          </Box>

          {/* 图片控制按钮组 */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              zIndex: 2,
            }}
          >
            <Tooltip title={isImageExpanded ? (language === 'en' ? 'Collapse' : '收起') : (language === 'en' ? 'Expand' : '展开')}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton
                  onClick={toggleImageExpand}
                  size="small"
                  sx={{
                    backgroundColor: isDark
                      ? alpha(muiTheme.palette.background.paper, 0.5)
                      : alpha(muiTheme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: 'text.primary',
                    border: `1px solid ${alpha(isDark ? '#fff' : '#000', 0.1)}`,
                  }}
                >
                  {isImageExpanded ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
                </IconButton>
              </motion.div>
            </Tooltip>

            <Tooltip title={language === 'en' ? 'Download Image' : '下载图片'}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton
                  onClick={handleImageDownload}
                  size="small"
                  sx={{
                    backgroundColor: isDark
                      ? alpha(muiTheme.palette.background.paper, 0.5)
                      : alpha(muiTheme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: 'text.primary',
                    border: `1px solid ${alpha(isDark ? '#fff' : '#000', 0.1)}`,
                  }}
                >
                  <FiDownload size={18} />
                </IconButton>
              </motion.div>
            </Tooltip>
          </Stack>

          {/* 项目类别标签 */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              zIndex: 2,
            }}
          >
            <motion.div
              variants={childVariants}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 500, damping: 10 }}
            >
              <Chip
                icon={<FiTag size={14} />}
                label={getCategoryLabel(project.category)}
                sx={{
                  backgroundColor: isDark
                    ? alpha(muiTheme.palette.background.paper, 0.5)
                    : alpha(muiTheme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: 'text.primary',
                  border: `1px solid ${alpha(isDark ? '#fff' : '#000', 0.1)}`,
                  fontWeight: 500,
                  px: 1,
                }}
              />
            </motion.div>
          </Box>
        </Box>

        {/* 内容区域 */}
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <motion.div variants={childVariants}>
            {/* 标题和链接 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 0 },
                mb: 3,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                {localizedName}
              </Typography>

              {/* 只保留GitHub链接 */}
              {project.githubUrl && (
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 500, damping: 10 }}>
                  <Button
                    startIcon={<FiGithub />}
                    variant="outlined"
                    size="small"
                    onClick={() => handleLinkClick(project.githubUrl)}
                    sx={{
                      borderRadius: '8px',
                      textTransform: 'none',
                      px: 2,
                    }}
                  >
                    {language === 'en' ? 'GitHub' : '源代码'}
                  </Button>
                </motion.div>
              )}
            </Box>

            {/* 简短描述 */}
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: 'text.secondary',
                mb: 3,
              }}
            >
              {localizedDescription}
            </Typography>

            {/* 技术标签 */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.div variants={childVariants}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <FiPaperclip size={16} />
                  {language === 'en' ? 'Technologies' : '技术栈'}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ mb: 3, gap: 1 }}
                >
                  {project.technologies.map((tech, idx) => (
                    <TechnologyTag
                      key={idx}
                      tech={tech}
                      size="medium"
                      index={idx}
                    />
                  ))}
                </Stack>
              </motion.div>
            )}

            {/* 详细描述 */}
            {longDescription && (
              <motion.div variants={childVariants}>
                <Divider sx={{ my: 3 }} />

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {language === 'en' ? 'About this project' : '项目详情'}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {longDescription}
                </Typography>
              </motion.div>
            )}
          </motion.div>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default NewProjectDetail;
