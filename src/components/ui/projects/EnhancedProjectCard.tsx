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
  index = 0
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: index * 0.1
      }
    },
    hover: {
      y: -8,
      boxShadow: theme === 'dark'
        ? '0 12px 30px rgba(0, 0, 0, 0.6)'
        : '0 12px 30px rgba(0, 0, 0, 0.15)',
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

  return (
    <>
      {/* 项目卡片 */}
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap={hasDetails ? "tap" : undefined}
        variants={cardVariants}
        style={{ height: '100%' }}
        {...(isMobile ? swipeHandlers : {})}
      >
        <Card
          onClick={hasDetails ? handleCardClick : undefined}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            overflow: 'hidden',
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
            position: 'relative'
          }}
        >
          {/* 项目分类标签 */}
          {category && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                zIndex: 2
              }}
            >
              <Badge
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    borderRadius: '10px',
                    padding: '4px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    backgroundColor: alpha(muiTheme.palette.primary.main, 0.9),
                    boxShadow: theme === 'dark'
                      ? '0 2px 8px rgba(0, 0, 0, 0.4)'
                      : '0 2px 8px rgba(0, 0, 0, 0.15)',
                  }
                }}
                badgeContent={category}
              >
                <Box sx={{ width: 8, height: 8 }} />
              </Badge>
            </Box>
          )}

          {/* 项目图片 */}
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="200"
              image={imageUrl}
              alt={language === 'en' ? name : nameZh}
              className="project-image"
              sx={{
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                objectFit: 'cover',
                filter: theme === 'dark' ? 'brightness(0.9)' : 'none',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />

            {/* 图片操作按钮 */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                display: 'flex',
                gap: 1
              }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  size="small"
                  onClick={handleImagePreview}
                  sx={{
                    backgroundColor: alpha(theme === 'dark' ? '#000' : '#fff', 0.8),
                    color: theme === 'dark' ? '#fff' : '#000',
                    boxShadow: theme === 'dark'
                      ? '0 2px 8px rgba(0, 0, 0, 0.4)'
                      : '0 2px 8px rgba(0, 0, 0, 0.15)',
                    '&:hover': {
                      backgroundColor: alpha(theme === 'dark' ? '#000' : '#fff', 0.9),
                    }
                  }}
                >
                  <FiZoomIn size={16} />
                </IconButton>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  size="small"
                  onClick={handleImageDownload}
                  sx={{
                    backgroundColor: alpha(theme === 'dark' ? '#000' : '#fff', 0.8),
                    color: theme === 'dark' ? '#fff' : '#000',
                    boxShadow: theme === 'dark'
                      ? '0 2px 8px rgba(0, 0, 0, 0.4)'
                      : '0 2px 8px rgba(0, 0, 0, 0.15)',
                    '&:hover': {
                      backgroundColor: alpha(theme === 'dark' ? '#000' : '#fff', 0.9),
                    }
                  }}
                >
                  <FiDownload size={16} />
                </IconButton>
              </motion.div>
            </Box>
          </Box>

          {/* 项目内容 */}
          <CardContent sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                fontSize: '1.25rem',
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {language === 'en' ? name : nameZh}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                minHeight: '3em',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.5
              }}
            >
              {language === 'en' ? description : descriptionZh}
            </Typography>

            {/* 技术标签 */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 2,
                mt: 'auto'
              }}
            >
              {technologies.slice(0, isMobile ? 2 : isTablet ? 3 : 4).map((tech, i) => (
                <TechnologyTag key={i} name={tech} />
              ))}

              {technologies.length > (isMobile ? 2 : isTablet ? 3 : 4) && (
                <Chip
                  label={`+${technologies.length - (isMobile ? 2 : isTablet ? 3 : 4)}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 24,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    borderColor: alpha(muiTheme.palette.primary.main, 0.3),
                    color: muiTheme.palette.primary.main
                  }}
                />
              )}
            </Box>

            {/* 链接按钮 */}
            {githubUrl && (
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1
              }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    onClick={(e) => handleLinkClick(e, githubUrl)}
                    size="small"
                    aria-label="GitHub Repository"
                    sx={{
                      color: theme === 'dark' ? '#fff' : '#000',
                      backgroundColor: alpha(
                        theme === 'dark' ? '#fff' : '#000',
                        0.05
                      ),
                      '&:hover': {
                        backgroundColor: alpha(
                          theme === 'dark' ? '#fff' : '#000',
                          0.1
                        )
                      }
                    }}
                  >
                    <FiGithub />
                  </IconButton>
                </motion.div>
              </Box>
            )}
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
