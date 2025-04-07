import React, { useState, useEffect, useRef } from 'react';
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
  Chip,
  Modal,
  Card,
  CardMedia,
  CardActions
} from '@mui/material';
import {
  FiX,
  FiGithub,
  FiExternalLink,
  FiArrowLeft,
  FiMaximize2,
  FiDownload,
  FiTag,
  FiPaperclip,
  FiZoomIn,
  FiZoomOut,
  FiExternalLink as FiOpenInNew
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

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

  // 在详情页打开时禁用背景滚动
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // 处理 ESC 键关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isImageModalOpen) {
          setIsImageModalOpen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isImageModalOpen]);

  // 处理图片加载完成
  useEffect(() => {
    const img = new Image();
    img.src = project.imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [project.imageUrl]);

  // 打开图片模态框时重置缩放和位置
  useEffect(() => {
    if (isImageModalOpen) {
      setZoomLevel(1);
      setDragPosition({ x: 0, y: 0 });
    }
  }, [isImageModalOpen]);

  // 处理图片模态框打开/关闭
  const handleOpenImageModal = () => {
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
  };

  // 处理图片缩放
  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomLevel < 3) {
      setZoomLevel(prev => prev + 0.5);
    }
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomLevel > 1) {
      setZoomLevel(prev => prev - 0.5);
    }
  };

  // 处理在新窗口打开图片
  const handleOpenImageInNewTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.imageUrl, '_blank', 'noopener,noreferrer');
  };

  // 处理外部链接点击
  const handleLinkClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // 处理图片下载
  const handleImageDownload = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 图片查看模态框 */}
      <Modal
        open={isImageModalOpen}
        onClose={handleCloseImageModal}
        aria-labelledby="image-modal-title"
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 1, sm: 2 }
        }}
      >
        <Card
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={handleCloseImageModal}
          sx={{
            maxWidth: '95vw',
            maxHeight: '90vh',
            width: { xs: '95vw', sm: 'auto' },
            height: { xs: 'auto', sm: 'auto' },
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            bgcolor: isDark
              ? alpha(muiTheme.palette.background.paper, 0.4)
              : alpha(muiTheme.palette.background.paper, 0.7),
            boxShadow: isDark
              ? `0 20px 80px -10px ${alpha('#000', 0.7)}`
              : `0 20px 80px -10px ${alpha('#000', 0.3)}`,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'default'
          }}
        >
          <Box
            ref={imageContainerRef}
            onClick={(e) => e.stopPropagation()}
            sx={{
              overflow: 'hidden',
              position: 'relative',
              height: { xs: 'calc(80vh - 60px)', sm: 'auto' },
              maxHeight: '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* 图片操作提示 */}
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 0,
                right: 0,
                zIndex: 5,
                display: 'flex',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  bgcolor: isDark
                    ? alpha(muiTheme.palette.background.paper, 0.5)
                    : alpha(muiTheme.palette.background.paper, 0.7),
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                  color: 'text.secondary',
                  py: 0.5,
                  px: 2,
                  borderRadius: '100px',
                  fontSize: '0.7rem',
                  opacity: 0.8
                }}
              >
                {language === 'en'
                  ? 'Double-click to zoom • Drag to move when zoomed'
                  : '双击放大 • 放大后可拖动查看'}
              </Typography>
            </Box>

            <motion.div
              drag
              dragConstraints={imageContainerRef}
              dragElastic={0.1}
              whileTap={{ cursor: 'grabbing' }}
              dragMomentum={false}
              style={{
                scale: zoomLevel,
                x: dragPosition.x,
                y: dragPosition.y,
                cursor: zoomLevel > 1 ? 'grab' : 'default'
              }}
              onDrag={(e, info) => {
                if (zoomLevel > 1) {
                  setDragPosition({
                    x: info.offset.x + dragPosition.x,
                    y: info.offset.y + dragPosition.y
                  });
                }
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                // 双击时在原始大小和放大之间切换
                if (zoomLevel === 1) {
                  setZoomLevel(2);
                  // 计算双击点相对于容器的位置，以实现精确缩放
                  if (imageContainerRef.current) {
                    const rect = imageContainerRef.current.getBoundingClientRect();
                    const offsetX = e.clientX - rect.left - rect.width / 2;
                    const offsetY = e.clientY - rect.top - rect.height / 2;
                    setDragPosition({ x: -offsetX, y: -offsetY });
                  }
                } else {
                  setZoomLevel(1);
                  setDragPosition({ x: 0, y: 0 });
                }
              }}
            >
              <CardMedia
                component="img"
                image={project.imageUrl}
                alt={localizedName}
                sx={{
                  maxHeight: '80vh',
                  maxWidth: '95vw',
                  objectFit: 'contain',
                  pointerEvents: 'none'
                }}
              />
            </motion.div>
          </Box>

          {/* 图片操作按钮栏 */}
          <CardActions
            sx={{
              p: 1.5,
              justifyContent: 'space-between',
              bgcolor: isDark
                ? alpha(muiTheme.palette.background.paper, 0.6)
                : alpha(muiTheme.palette.background.paper, 0.9)
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={language === 'en' ? 'Zoom In' : '放大'}>
                <IconButton
                  size="small"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                >
                  <FiZoomIn size={16} />
                </IconButton>
              </Tooltip>
              <Tooltip title={language === 'en' ? 'Zoom Out' : '缩小'}>
                <IconButton
                  size="small"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                >
                  <FiZoomOut size={16} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={language === 'en' ? 'Download Image' : '下载图片'}>
                <IconButton size="small" onClick={handleImageDownload}>
                  <FiDownload size={16} />
                </IconButton>
              </Tooltip>
              <Tooltip title={language === 'en' ? 'Open in New Tab' : '在新标签页中打开'}>
                <IconButton size="small" onClick={handleOpenImageInNewTab}>
                  <FiOpenInNew size={16} />
                </IconButton>
              </Tooltip>
              <Tooltip title={language === 'en' ? 'Close' : '关闭'}>
                <IconButton size="small" onClick={handleCloseImageModal}>
                  <FiX size={16} />
                </IconButton>
              </Tooltip>
            </Box>
          </CardActions>
        </Card>
      </Modal>

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
          overflow: 'auto',
          position: 'relative'
        }}
      >
        {/* 返回按钮 - 修改为粘滞定位 */}
        <Box
          sx={{
            position: 'sticky',
            top: 16,
            left: 16,
            zIndex: 100,
            width: 'fit-content',
            ml: 2,
            mt: 2
          }}
        >
          <motion.div
            variants={headerVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Tooltip title={language === 'en' ? 'Back' : '返回'}>
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
            </Tooltip>
          </motion.div>
        </Box>

        {/* 图片区域 */}
        <Box sx={{ position: 'relative', mt: 3 }}>
          <Box
            sx={{
              height: '40vh',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
            }}
            onClick={handleOpenImageModal}
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
                transition: 'all 0.3s ease-in-out',
                position: 'relative',
                '&:hover': {
                  transform: 'scale(1.02)',
                  filter: isDark ? 'brightness(0.95)' : 'brightness(1.05)',
                },
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
            <Tooltip title={language === 'en' ? 'View Full Image' : '查看完整图片'}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton
                  onClick={handleOpenImageModal}
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
                  <FiMaximize2 size={18} />
                </IconButton>
              </motion.div>
            </Tooltip>

            <Tooltip title={language === 'en' ? 'Download Image' : '下载图片'}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageDownload();
                  }}
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

              {/* GitHub链接 */}
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
