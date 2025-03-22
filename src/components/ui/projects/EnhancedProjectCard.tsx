import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  alpha,
  useTheme as useMuiTheme,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogTitle,
  Chip,
  Button,
  Zoom,
  Modal,
  Backdrop,
  Badge
} from '@mui/material';
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiZoomIn,
  FiDownload,
  FiMaximize2,
  FiMinimize2,
  FiArrowLeft,
  FiArrowRight,
  FiTag
} from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { TechnologyTag } from './TechnologyTag';
import { useSwipeable } from 'react-swipeable';
import AnimatedIconButton from '../common/AnimatedIconButton';

interface LocalizedText {
  en: string;
  zh: string;
}

interface ProjectCardProps {
  name: string;
  nameZh?: string;
  description: string;
  descriptionZh?: string;
  longDescription?: LocalizedText | string;
  technologies?: string[];
  imageUrl: string;
  url?: string;
  githubUrl?: string;
  category?: string;
  index?: number;
  slideDirection?: 'left' | 'right' | null;
}

/**
 * 增强版项目卡片组件
 * 包含动画、交互和图片预览功能
 */
const EnhancedProjectCard: React.FC<ProjectCardProps> = ({
  name,
  nameZh = name,
  description,
  descriptionZh = description,
  longDescription,
  technologies = [],
  imageUrl,
  url = '',
  githubUrl,
  category = '',
  index = 0,
  slideDirection = null
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const { language } = useLanguage();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 状态
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 处理卡片点击
  const handleCardClick = () => {
    if (longDescription) {
      setIsDialogOpen(true);
    }
  };

  // 处理外部链接点击
  const handleLinkClick = (e: React.MouseEvent, link?: string) => {
    e.stopPropagation(); // 阻止事件冒泡
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  // 处理图片预览
  const handleImagePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImagePreviewOpen(true);
  };

  // 处理图片下载
  const handleImageDownload = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 创建一个链接并模拟点击下载
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${name}-project.${imageUrl.split('.').pop()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 处理图片放大/缩小
  const toggleImageSize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImageEnlarged(!isImageEnlarged);
  };

  // 处理长描述文本
  const getLongDescription = () => {
    if (!longDescription) return '';

    if (typeof longDescription === 'string') {
      return longDescription;
    }

    if (typeof longDescription === 'object') {
      const currentLanguage = language as keyof LocalizedText;
      const fallbackLanguage: keyof LocalizedText = 'en';

      return longDescription[currentLanguage] ||
             longDescription[fallbackLanguage] ||
             '';
    }

    return '';
  };

  // 检查是否有详情可查看
  const hasDetails = !!longDescription;

  // 设置移动端滑动处理
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      // 在这里可以实现移动到下一个项目的逻辑
      console.log('向左滑动，下一个项目');
    },
    onSwipedRight: () => {
      // 在这里可以实现移动到上一个项目的逻辑
      console.log('向右滑动，上一个项目');
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  // 动画变体
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateY: slideDirection === 'left' ? -15 : slideDirection === 'right' ? 15 : 0,
      x: slideDirection === 'left' ? 50 : slideDirection === 'right' ? -50 : 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: index * 0.05,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: 30,
      rotateY: slideDirection === 'left' ? 15 : slideDirection === 'right' ? -15 : 0,
      x: slideDirection === 'left' ? -100 : slideDirection === 'right' ? 100 : 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.4
      }
    },
    hover: {
      y: -8,
      boxShadow: theme === 'dark'
        ? '0 18px 35px rgba(0, 0, 0, 0.6)'
        : '0 18px 35px rgba(0, 0, 0, 0.15)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  // 炫光效果动画
  const shineVariants = {
    initial: {
      background: `linear-gradient(90deg, transparent, transparent)`,
    },
    hover: {
      background: `linear-gradient(90deg,
        transparent 0%,
        ${alpha(muiTheme.palette.primary.main, 0.1)} 30%,
        ${alpha(muiTheme.palette.primary.main, 0.2)} 50%,
        ${alpha(muiTheme.palette.primary.main, 0.1)} 70%,
        transparent 100%)`,
      backgroundSize: '200% 100%',
      backgroundPosition: ['200% 0%', '-100% 0%'],
      transition: {
        backgroundPosition: {
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse'
        }
      }
    }
  };

  // 图片悬停动画
  const imageHoverVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 3, ease: 'easeOut' }
    }
  };

  // 标签动画变体
  const tagVariants = {
    initial: { opacity: 0, y: 10, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
        delay: 0.3 + i * 0.05
      }
    }),
    hover: { y: -3, scale: 1.05 }
  };

  return (
    <>
      {/* 项目卡片 */}
      <motion.div
        key={`${name}-${index}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover="hover"
        whileTap={hasDetails ? "tap" : undefined}
        variants={cardVariants}
        style={{
          height: '100%',
          position: 'relative',
          perspective: '1000px'
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...(isMobile ? swipeHandlers : {})}
      >
        <Card
          onClick={hasDetails ? handleCardClick : undefined}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            overflow: 'visible',
            cursor: hasDetails ? 'pointer' : 'default',
            backgroundColor: theme === 'dark'
              ? 'rgba(30, 30, 40, 0.7)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${theme === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)'}`,
            boxShadow: theme === 'dark'
              ? '0 8px 24px rgba(0, 0, 0, 0.4)'
              : '0 8px 24px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* 类别标签 */}
          {category && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                zIndex: 10
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
              >
                <Chip
                  icon={<FiTag size={14} />}
                  label={category}
                  size="small"
                  sx={{
                    backgroundColor: theme === 'dark'
                      ? 'rgba(80, 80, 120, 0.8)'
                      : 'rgba(240, 240, 255, 0.8)',
                    color: theme === 'dark' ? '#fff' : '#000',
                    backdropFilter: 'blur(8px)',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    border: `1px solid ${theme === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)'}`,
                    boxShadow: theme === 'dark'
                      ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </motion.div>
            </Box>
          )}

          {/* 炫光效果 - 悬停时激活 */}
          <motion.div
            variants={shineVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* 图片区域 - 增强交互体验 */}
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              height: 0,
              paddingTop: '56.25%', // 16:9 宽高比
              backgroundColor: theme === 'dark' ? '#1a1a2e' : '#f8f9fa'
            }}
          >
            <Badge
              badgeContent={
                <Box
                  component={motion.div}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: hasDetails ? 1 : 0,
                    opacity: hasDetails ? 1 : 0
                  }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: theme === 'dark'
                      ? 'rgba(80, 80, 255, 0.9)'
                      : 'rgba(70, 70, 220, 0.9)',
                    color: '#fff',
                    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
                    border: '2px solid #fff'
                  }}
                >
                  <FiZoomIn size={16} />
                </Box>
              }
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 2,
                '& .MuiBadge-badge': {
                  top: 16,
                  right: 16,
                  padding: 0,
                  minWidth: 'auto',
                  height: 'auto',
                  background: 'transparent'
                }
              }}
            >
              <motion.div
                variants={imageHoverVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <CardMedia
                  component="img"
                  image={imageUrl || '/assets/images/placeholder-project.jpg'}
                  alt={language === 'zh' ? nameZh : name}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: theme === 'dark' ? 'brightness(0.9)' : 'none',
                    transition: 'all 0.5s ease-out',
                    backgroundColor: theme === 'dark' ? 'rgba(20, 20, 35, 0.8)' : 'rgba(245, 245, 250, 0.8)'
                  }}
                  loading="lazy"
                  onError={(e) => {
                    console.warn('项目图片加载失败，使用备用图片', imageUrl);
                    const target = e.target as HTMLImageElement;
                    // 使用更多备用路径尝试
                    target.src = '/assets/images/placeholder-project.jpg';
                    // 如果第一个失败，尝试另一个路径
                    target.onerror = () => {
                      target.src = '/placeholder-project.jpg';
                      // 如果再次失败，尝试简单的内置图片
                      target.onerror = () => {
                        target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" text-anchor="middle" alignment-baseline="middle" fill="%23999"%3E图片未找到%3C/text%3E%3C/svg%3E';
                        target.onerror = null;
                      };
                    };
                  }}
                />
              </motion.div>
            </Badge>

            {/* 图片操作按钮 */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                p: 1,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                backdropFilter: 'blur(4px)',
                zIndex: 10
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatedIconButton
                icon={<FiZoomIn size={18} />}
                onClick={handleImagePreview}
                tooltipText="预览图片"
                size="small"
                variant="glass"
                color="primary"
              />
            </Box>
          </Box>

          {/* 内容区域 */}
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              p: 3,
              pt: 2.5
            }}
          >
            {/* 项目标题 */}
            <Typography
              variant="h6"
              component={motion.h3}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
              sx={{
                fontWeight: 600,
                mb: 1,
                color: theme === 'dark' ? '#fff' : '#000',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                lineHeight: 1.3,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {language === 'zh' ? nameZh : name}
            </Typography>

            {/* 项目描述 */}
            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.6,
                flex: '1 0 auto'
              }}
            >
              {language === 'zh' ? descriptionZh : description}
            </Typography>

            {/* 技术标签 */}
            {technologies.length > 0 && (
              <Box
                sx={{
                  mt: 'auto',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  padding: '4px 0',
                  minHeight: '36px',
                  alignItems: 'center'
                }}
              >
                {technologies.slice(0, 4).map((tech, i) => (
                  <motion.div
                    key={tech}
                    custom={i}
                    variants={tagVariants}
                    initial="initial"
                    animate="visible"
                    whileHover="hover"
                  >
                    <TechnologyTag
                      tech={tech}
                      size="small"
                      darkMode={theme === 'dark'}
                    />
                  </motion.div>
                ))}
                {technologies.length > 4 && (
                  <motion.div
                    custom={4}
                    variants={tagVariants}
                    initial="initial"
                    animate="visible"
                    whileHover="hover"
                  >
                    <Chip
                      label={`+${technologies.length - 4}`}
                      size="small"
                      sx={{
                        backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                        color: theme === 'dark' ? '#fff' : muiTheme.palette.primary.main,
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        height: '24px'
                      }}
                    />
                  </motion.div>
                )}
              </Box>
            )}

            {/* 操作按钮 */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
                pt: 2,
                pb: 0.5,
                borderTop: `1px solid ${theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.05)'}`,
                overflow: 'visible'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 左侧按钮组 */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {githubUrl && (
                  <AnimatedIconButton
                    icon={<FiGithub size={18} />}
                    onClick={(e) => handleLinkClick(e, githubUrl)}
                    tooltipText="查看代码"
                    ariaLabel="查看 GitHub 代码"
                    size="small"
                    variant="glass"
                  />
                )}
                {url && (
                  <AnimatedIconButton
                    icon={<FiExternalLink size={18} />}
                    onClick={(e) => handleLinkClick(e, url)}
                    tooltipText="访问网站"
                    ariaLabel="访问项目网站"
                    size="small"
                    variant="glass"
                  />
                )}
              </Box>

              {/* 右侧详情按钮 */}
              {hasDetails && (
                <Button
                  component={motion.button}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  variant="text"
                  color="primary"
                  size="small"
                  onClick={handleCardClick}
                  sx={{
                    fontWeight: 500,
                    textTransform: 'none',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    backgroundColor: alpha(muiTheme.palette.primary.main, 0.08),
                    '&:hover': {
                      backgroundColor: alpha(muiTheme.palette.primary.main, 0.15)
                    }
                  }}
                >
                  {language === 'zh' ? '查看详情' : 'View Details'}
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* 项目详情对话框 */}
      <AnimatePresence>
        {isDialogOpen && (
          <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            maxWidth="md"
            fullWidth
            sx={{
              '& .MuiDialog-paper': {
                borderRadius: '20px',
                backgroundColor: theme === 'dark'
                  ? 'rgba(24, 24, 32, 0.95)'
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.05)'}`,
                overflow: 'hidden',
                boxShadow: theme === 'dark'
                  ? '0 24px 80px rgba(0, 0, 0, 0.8)'
                  : '0 24px 80px rgba(0, 0, 0, 0.15)'
              }
            }}
            TransitionComponent={Zoom}
            PaperComponent={({ children, ...props }) => (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dialogVariants}
              >
                <Box {...props}>
                  {children}
                </Box>
              </motion.div>
            )}
          >
            <DialogTitle sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 3,
              pb: 2
            }}>
              <Box>
                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                  {language === 'en' ? name : nameZh}
                </Typography>
                {category && (
                  <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                    <FiTag size={14} style={{ marginRight: 8 }} />
                    <Typography variant="body2" color="text.secondary">
                      {category}
                    </Typography>
                  </Box>
                )}
              </Box>
              <IconButton
                onClick={() => setIsDialogOpen(false)}
                sx={{
                  color: theme === 'dark' ? '#fff' : '#000',
                  '&:hover': {
                    backgroundColor: alpha(
                      theme === 'dark' ? '#fff' : '#000',
                      0.1
                    )
                  }
                }}
              >
                <FiX />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              {/* 项目图片 */}
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={imageUrl}
                  alt={language === 'en' ? name : nameZh}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '400px',
                    objectFit: 'cover'
                  }}
                />

                {/* 图片操作按钮 */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    display: 'flex',
                    gap: 1.5
                  }}
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="contained"
                      startIcon={<FiZoomIn />}
                      onClick={handleImagePreview}
                      sx={{
                        borderRadius: 8,
                        backgroundColor: alpha(theme === 'dark' ? '#000' : '#fff', 0.8),
                        color: theme === 'dark' ? '#fff' : '#000',
                        boxShadow: theme === 'dark'
                          ? '0 4px 12px rgba(0, 0, 0, 0.4)'
                          : '0 4px 12px rgba(0, 0, 0, 0.15)',
                        '&:hover': {
                          backgroundColor: alpha(theme === 'dark' ? '#000' : '#fff', 0.9),
                        }
                      }}
                    >
                      预览
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="contained"
                      startIcon={<FiDownload />}
                      onClick={handleImageDownload}
                      sx={{
                        borderRadius: 8,
                        backgroundColor: alpha(muiTheme.palette.primary.main, 0.9),
                        boxShadow: theme === 'dark'
                          ? '0 4px 12px rgba(0, 0, 0, 0.4)'
                          : '0 4px 12px rgba(0, 0, 0, 0.15)',
                        '&:hover': {
                          backgroundColor: muiTheme.palette.primary.main,
                        }
                      }}
                    >
                      下载
                    </Button>
                  </motion.div>
                </Box>
              </Box>

              <Box sx={{ p: 3 }}>
                {/* 项目描述 */}
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    lineHeight: 1.8,
                    letterSpacing: '0.015em',
                    textAlign: 'justify'
                  }}
                >
                  {getLongDescription()}
                </Typography>

                {/* 技术标签 */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    mt: 4,
                    borderBottom: `2px solid ${alpha(muiTheme.palette.primary.main, 0.5)}`,
                    pb: 1,
                    display: 'inline-block'
                  }}
                >
                  技术栈
                </Typography>
                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  mb: 4
                }}>
                  {technologies.map((tech, i) => (
                    <TechnologyTag key={i} name={tech} size="medium" />
                  ))}
                </Box>

                {/* 链接按钮组 */}
                {githubUrl && (
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                    mt: 2
                  }}>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FiGithub />}
                        onClick={(e) => handleLinkClick(e, githubUrl)}
                        sx={{
                          borderRadius: '50px',
                          px: 3,
                          py: 1.2,
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          boxShadow: theme === 'dark'
                            ? '0 8px 16px rgba(0, 0, 0, 0.4)'
                            : '0 8px 16px rgba(0, 0, 0, 0.1)',
                          textTransform: 'none'
                        }}
                      >
                        GitHub 仓库
                      </Button>
                    </motion.div>
                  </Box>
                )}
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* 图片预览模态框 */}
      <Modal
        open={isImagePreviewOpen}
        onClose={() => {
          setIsImagePreviewOpen(false);
          setIsImageEnlarged(false);
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: 'blur(5px)',
              backgroundColor: alpha('#000', 0.9)
            }
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
            p: 0,
            borderRadius: '4px',
            overflow: 'hidden',
            maxWidth: isImageEnlarged ? '95vw' : '80vw',
            maxHeight: isImageEnlarged ? '95vh' : '80vh',
            width: 'auto',
            height: 'auto',
            transition: 'all 0.3s ease'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <Box sx={{ position: 'relative' }}>
              <img
                src={imageUrl}
                alt={language === 'en' ? name : nameZh}
                style={{
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: isImageEnlarged ? '95vh' : '80vh',
                  margin: '0 auto',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
              />

              {/* 图片操作按钮 */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  display: 'flex',
                  gap: 1
                }}
              >
                <IconButton
                  onClick={toggleImageSize}
                  sx={{
                    backgroundColor: alpha('#000', 0.6),
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: alpha('#000', 0.8)
                    }
                  }}
                >
                  {isImageEnlarged ? <FiMinimize2 /> : <FiMaximize2 />}
                </IconButton>

                <IconButton
                  onClick={() => {
                    setIsImagePreviewOpen(false);
                    setIsImageEnlarged(false);
                  }}
                  sx={{
                    backgroundColor: alpha('#000', 0.6),
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: alpha('#000', 0.8)
                    }
                  }}
                >
                  <FiX />
                </IconButton>
              </Box>

              {/* 图片导航按钮（如果需要多图预览）*/}
              {false && (
                <>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: alpha('#000', 0.6),
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: alpha('#000', 0.8)
                      }
                    }}
                  >
                    <FiArrowLeft />
                  </IconButton>

                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: alpha('#000', 0.6),
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: alpha('#000', 0.8)
                      }
                    }}
                  >
                    <FiArrowRight />
                  </IconButton>
                </>
              )}
            </Box>
          </motion.div>
        </Box>
      </Modal>
    </>
  );
};

export default EnhancedProjectCard;
