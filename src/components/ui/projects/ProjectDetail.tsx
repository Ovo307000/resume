import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  alpha,
  useTheme as useMuiTheme,
  Link,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  CircularProgress
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiMaximize, FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import TechTagGroup from '../common/TechTagGroup';

interface ProjectDetailProps {
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  url: string;
  githubUrl?: string;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  name,
  nameZh,
  description,
  descriptionZh,
  longDescription,
  technologies,
  imageUrl,
  url,
  githubUrl,
  onClose
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (imagePreview) {
          closeImagePreview();
        } else {
        onClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden';

    // 预加载图片
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, imagePreview, imageUrl]);

  const getLocalizedName = () => {
    return language === 'zh' ? nameZh : name;
  };

  const getLocalizedDescription = () => {
    return language === 'zh' ? descriptionZh : description;
  };

  // 更流畅的背景动画
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }
    }
  };

  // 更优雅的内容动画
  const contentVariants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      y: 10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        damping: 25,
        stiffness: 400,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 5,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  // 优化图片动画
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 1.05,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  // 文字内容的交错动画
  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      y: 5,
      transition: { duration: 0.2 }
    }
  };

  // 图片预览动画
  const previewVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const openImagePreview = () => {
    setImagePreview(true);
  };

  const closeImagePreview = () => {
    setImagePreview(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            overflow: 'hidden'
          }}
          onClick={onClose}
        >
          <motion.div
            key="content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              width: '100%',
              maxWidth: '900px',
              maxHeight: '90vh',
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              sx={{
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: theme === 'dark'
                  ? alpha(muiTheme.palette.background.paper, 0.85)
                  : alpha(muiTheme.palette.background.paper, 0.95),
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${alpha(
                  theme === 'dark'
                    ? muiTheme.palette.common.white
                    : muiTheme.palette.common.black,
                  0.1
                )}`,
                boxShadow: theme === 'dark'
                  ? '0 25px 50px rgba(0, 0, 0, 0.5)'
                  : '0 25px 50px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* 控制按钮 */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 10,
                  display: 'flex',
                  gap: 1
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.3, duration: 0.2 }
                }}
              >
                <IconButton
                  onClick={openImagePreview}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: alpha(muiTheme.palette.common.white, 0.2),
                    backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)',
                    color: theme === 'dark' ? 'white' : 'black',
                    '&:hover': {
                      backgroundColor: alpha(muiTheme.palette.common.white, 0.3),
                        transform: 'scale(1.1)',
                        transition: 'all 0.2s ease'
                    }
                  }}
                >
                    <FiZoomIn size={18} />
                </IconButton>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.4, duration: 0.2 }
                  }}
                >
                <IconButton
                  onClick={onClose}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: alpha(muiTheme.palette.common.white, 0.2),
                    backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)',
                    color: theme === 'dark' ? 'white' : 'black',
                    '&:hover': {
                      backgroundColor: alpha(muiTheme.palette.common.white, 0.3),
                        transform: 'scale(1.1)',
                        transition: 'all 0.2s ease'
                    }
                  }}
                >
                  <FiX size={18} />
                </IconButton>
                </motion.div>
              </Box>

              {/* 图片部分 */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: {xs: '200px', sm: '350px', md: '400px'},
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={openImagePreview}
              >
                {/* 加载指示器 */}
                {!imageLoaded && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: alpha(
                        muiTheme.palette.background.paper,
                        theme === 'dark' ? 0.4 : 0.2
                      )
                    }}
                  >
                    <CircularProgress color="primary" />
                  </Box>
                )}

                <motion.div
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    width: '100%',
                    height: '100%',
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease'
                  }}
                >
                  <Box
                    component="img"
                    src={imageUrl}
                    alt={getLocalizedName()}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: theme === 'dark' ? 'brightness(0.85)' : 'brightness(1)',
                      transition: 'transform 0.6s ease, filter 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        filter: 'brightness(1.1)'
                      }
                    }}
                    onLoad={() => setImageLoaded(true)}
                  />
                </motion.div>

                {/* 图片渐变覆盖 */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: `linear-gradient(180deg,
                      transparent 40%,
                      ${alpha(muiTheme.palette.background.paper, theme === 'dark' ? 0.4 : 0.3)} 70%,
                      ${alpha(muiTheme.palette.background.paper, theme === 'dark' ? 0.95 : 0.9)} 100%)`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: {xs: 3, sm: 4}
                  }}
                >
                  <motion.div variants={textVariants}>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                      color: 'white',
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                      fontSize: {xs: '1.8rem', sm: '2.4rem'}
                    }}
                  >
                    {getLocalizedName()}
                  </Typography>
                  </motion.div>
                </Box>
              </Box>

              {/* 内容部分 */}
              <Box sx={{ p: {xs: 3, sm: 4}, pt: 3 }}>
                <motion.div variants={textVariants} custom={1}>
                <Typography
                  variant="h6"
                  color="primary.main"
                  gutterBottom
                  fontWeight="500"
                >
                  {getLocalizedDescription()}
                </Typography>
                </motion.div>

                <motion.div variants={textVariants} custom={2}>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    mb: 4,
                    lineHeight: 1.8,
                    color: theme === 'dark'
                      ? alpha(muiTheme.palette.common.white, 0.85)
                      : alpha(muiTheme.palette.common.black, 0.75)
                  }}
                >
                  {longDescription}
                </Typography>
                </motion.div>

                <motion.div variants={textVariants} custom={3}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '&:after': {
                        content: '""',
                        display: 'block',
                        height: '2px',
                        flexGrow: 1,
                        backgroundColor: alpha(muiTheme.palette.primary.main, 0.2),
                        ml: 2
                      }
                    }}
                  >
                    {t('projects.technologies', 'Technologies')}
                  </Typography>
                </Box>

                <TechTagGroup
                  techItems={technologies.map(tech => ({ name: tech }))}
                  showToggle={true}
                  animate={true}
                  variant="default"
                  collapsible={technologies.length > 8}
                  maxVisibleItems={8}
                  initiallyExpanded={true}
                />
                </motion.div>

                <motion.div variants={textVariants} custom={4}>
                <Box sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  borderTop: `1px solid ${alpha(
                    theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.black,
                    0.1
                  )}`,
                  pt: 3,
                  mt: 2
                }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<FiExternalLink />}
                    component={Link}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderRadius: '50px',
                      px: 3,
                      py: 1,
                      fontWeight: 500,
                      textTransform: 'none',
                      boxShadow: theme === 'dark'
                        ? '0 4px 12px rgba(30, 136, 229, 0.5)'
                        : '0 4px 12px rgba(30, 136, 229, 0.3)',
                      '&:hover': {
                        boxShadow: theme === 'dark'
                          ? '0 6px 16px rgba(30, 136, 229, 0.6)'
                          : '0 6px 16px rgba(30, 136, 229, 0.4)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {t('projects.visitProject', 'Visit Project')}
                  </Button>

                  {githubUrl && (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      startIcon={<FiGithub />}
                      component={Link}
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderRadius: '50px',
                        px: 3,
                        py: 1,
                        fontWeight: 500,
                        textTransform: 'none',
                        borderWidth: 1.5,
                        '&:hover': {
                          borderWidth: 1.5,
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t('projects.viewCode', 'View Source')}
                    </Button>
                  )}
                </Box>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* 优化图片预览功能 */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            key="image-preview"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={previewVariants}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
            onClick={closeImagePreview}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                zIndex: 10
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.2, duration: 0.2 }
              }}
            >
              <IconButton
                onClick={closeImagePreview}
                sx={{
                  backgroundColor: alpha(muiTheme.palette.common.black, 0.5),
                  color: 'white',
                  '&:hover': {
                    backgroundColor: alpha(muiTheme.palette.common.black, 0.7),
                      transform: 'scale(1.1)',
                      transition: 'all 0.2s ease'
                  }
                }}
              >
                <FiX size={24} />
              </IconButton>
              </motion.div>
            </Box>

            {/* 图片预览 */}
            <motion.img
              src={imageUrl}
              alt={getLocalizedName()}
              style={{
                maxWidth: '90%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.1, duration: 0.4 }
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.2 }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
