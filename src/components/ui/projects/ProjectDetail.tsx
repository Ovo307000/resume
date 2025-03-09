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
  DialogContent
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiMaximize, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const getLocalizedName = () => {
    return language === 'zh' ? nameZh : name;
  };

  const getLocalizedDescription = () => {
    return language === 'zh' ? descriptionZh : description;
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeInOut' }
    },
    exit: {
      opacity: 0,
      transition: { delay: 0.2, duration: 0.4, ease: 'easeInOut' }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 25,
        stiffness: 300,
        mass: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 10,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] // Material UI recommended easing
      }
    }
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.1,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.05),
        duration: 0.4,
        ease: 'easeOut'
      }
    }),
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 }
    }
  };

  const previewVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
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
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
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
                border: `1px solid ${alpha(
                  theme === 'dark'
                    ? muiTheme.palette.common.white
                    : muiTheme.palette.common.black,
                  0.1
                )}`,
                boxShadow: theme === 'dark'
                  ? '0 20px 50px rgba(0, 0, 0, 0.5)'
                  : '0 20px 50px rgba(0, 0, 0, 0.2)'
              }}
            >
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
                <IconButton
                  onClick={openImagePreview}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: alpha(muiTheme.palette.common.white, 0.2),
                    backdropFilter: 'blur(4px)',
                    color: theme === 'dark' ? 'white' : 'black',
                    '&:hover': {
                      backgroundColor: alpha(muiTheme.palette.common.white, 0.3),
                    }
                  }}
                >
                  <FiMaximize size={18} />
                </IconButton>
                <IconButton
                  onClick={onClose}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: alpha(muiTheme.palette.common.white, 0.2),
                    backdropFilter: 'blur(4px)',
                    color: theme === 'dark' ? 'white' : 'black',
                    '&:hover': {
                      backgroundColor: alpha(muiTheme.palette.common.white, 0.3),
                    }
                  }}
                >
                  <FiX size={18} />
                </IconButton>
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: {xs: '200px', sm: '300px'},
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={openImagePreview}
              >
                <motion.div
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    width: '100%',
                    height: '100%'
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
                      filter: theme === 'dark' ? 'brightness(0.8)' : 'brightness(1)',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.03)'
                      }
                    }}
                  />
                </motion.div>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: `linear-gradient(to bottom, transparent 50%, ${
                      theme === 'dark'
                        ? alpha(muiTheme.palette.background.paper, 0.95)
                        : alpha(muiTheme.palette.background.paper, 0.9)
                    } 100%)`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: {xs: 3, sm: 4}
                  }}
                >
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
                </Box>
              </Box>

              <Box sx={{ p: {xs: 3, sm: 4}, pt: 3 }}>
                <Typography
                  variant="h6"
                  color="primary.main"
                  gutterBottom
                  fontWeight="500"
                >
                  {getLocalizedDescription()}
                </Typography>

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
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </AnimatePresence>

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
              backgroundColor: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(8px)'
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
              <IconButton
                onClick={closeImagePreview}
                sx={{
                  backgroundColor: alpha(muiTheme.palette.common.black, 0.5),
                  color: 'white',
                  '&:hover': {
                    backgroundColor: alpha(muiTheme.palette.common.black, 0.7),
                  }
                }}
              >
                <FiX size={24} />
              </IconButton>
            </Box>
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.1, duration: 0.4 }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
