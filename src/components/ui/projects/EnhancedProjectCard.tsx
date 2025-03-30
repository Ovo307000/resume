import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  alpha,
  useTheme as useMuiTheme,
  CardMedia,
  CardContent,
  IconButton,
  useMediaQuery,
  Dialog,
  Chip,
  Button,
  Modal,
  Backdrop,
  Badge,
  Stack
} from '@mui/material';
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiZoomIn,
  FiDownload,
  FiMaximize2,
  FiMinimize2,
  FiTag,
  FiInfo
} from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { TechnologyTag } from './TechnologyTag';
import AnimatedIconButton from '../common/AnimatedIconButton';
import ProjectDetail from './ProjectDetail';

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
 * 增强版项目卡片组件 (重构版)
 * 具有上下模糊渐变、高级感交互和图片预览功能
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
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const { language } = useLanguage();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  // 状态
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isDark = theme === 'dark';

  // 处理卡片点击（现在是打开详情）
  const handleCardClick = () => {
    if (longDescription) {
      setIsDetailOpen(true);
    }
  };

  // 处理外部链接点击
  const handleLinkClick = (e: React.MouseEvent, link?: string) => {
    e.stopPropagation();
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

  // 获取本地化长描述（传递给 ProjectDetail）
  const getLongDescription = () => {
    if (!longDescription) return '';
    if (typeof longDescription === 'string') return longDescription;
    if (typeof longDescription === 'object') {
      const currentLanguage = language as keyof LocalizedText;
      const fallbackLanguage: keyof LocalizedText = 'en';
      return longDescription[currentLanguage] || longDescription[fallbackLanguage] || '';
    }
    return '';
  };

  const hasDetails = !!longDescription;

  // 动画变体
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.08,
      }
    },
    hover: {
      y: -5,
      scale: 1.03,
      boxShadow: isDark
        ? `0px 10px 30px -5px ${alpha(muiTheme.palette.primary.main, 0.4)}`
        : `0px 10px 30px -5px ${alpha(muiTheme.palette.primary.light, 0.5)}`,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    },
    tap: {
      scale: 0.99,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 15 }
    }
  };

  // 图片预览模态框样式
  const imagePreviewModalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const imagePreviewBackdropStyle = {
    backgroundColor: alpha(muiTheme.palette.common.black, 0.85),
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  };

  const imagePreviewContentStyle = {
    outline: 'none',
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'hidden', // 防止图片溢出
    borderRadius: '12px',
    boxShadow: muiTheme.shadows[20],
  };

  return (
    <>
      <motion.div
        layout
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ height: '100%', cursor: hasDetails ? 'pointer' : 'default' }}
        onClick={hasDetails ? handleCardClick : undefined}
      >
        <Box
          sx={{
            height: '100%',
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: isDark
              ? alpha(muiTheme.palette.grey[900], 0.6)
              : alpha(muiTheme.palette.common.white, 0.7),
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1px solid ${alpha(isDark ? muiTheme.palette.common.white : muiTheme.palette.common.black, 0.1)}`,
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              height: '80px',
              zIndex: 2,
              pointerEvents: 'none',
              transition: 'opacity 0.3s ease',
              opacity: isHovered ? 0 : 1,
            },
            '&::before': {
              top: 0,
              background: `linear-gradient(to bottom, ${isDark ? alpha(muiTheme.palette.grey[900], 0.8) : alpha(muiTheme.palette.common.white, 0.9)} 0%, transparent 100%)`,
            },
            '&::after': {
              bottom: 0,
              background: `linear-gradient(to top, ${isDark ? alpha(muiTheme.palette.grey[900], 0.8) : alpha(muiTheme.palette.common.white, 0.9)} 0%, transparent 100%)`,
            },
          }}
        >
          <Box sx={{ position: 'relative', height: isMobile ? 160 : 220, overflow: 'hidden' }}>
            <motion.div
               style={{ height: '100%' }}
               whileHover={{ scale: 1.08 }}
               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <CardMedia
                component="img"
                image={imageUrl}
                alt={language === 'en' ? name : nameZh}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                }}
              />
            </motion.div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 3,
                    display: 'flex',
                    gap: '8px',
                  }}
                >
                  <AnimatedIconButton
                    title="Preview Image"
                    onClick={handleImagePreview}
                    size="small"
                    sx={{ backgroundColor: alpha(muiTheme.palette.common.black, 0.5), color: 'white', '&:hover': {backgroundColor: alpha(muiTheme.palette.common.black, 0.7)} }}
                  >
                    <FiZoomIn size={16} />
                  </AnimatedIconButton>
                </motion.div>
              )}
            </AnimatePresence>

            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: '12px',
                zIndex: 3,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                background: isHovered ? 'transparent' : `linear-gradient(to top, ${isDark ? alpha(muiTheme.palette.grey[900], 0.7) : alpha(muiTheme.palette.common.white, 0.8)} 10%, transparent 90%)`,
                transition: 'background 0.3s ease',
              }}
            >
              {technologies.slice(0, isMobile ? 2 : 3).map((tech) => (
                <TechnologyTag key={tech} tag={tech} size="small" />
              ))}
              {technologies.length > (isMobile ? 2 : 3) && (
                 <Chip
                  label={`+${technologies.length - (isMobile ? 2 : 3)}`}
                size="small"
                  icon={<FiTag size={12} style={{ marginRight: 4 }}/>}
                  sx={{
                    fontSize: '0.7rem',
                    height: 24,
                    bgcolor: alpha(isDark ? muiTheme.palette.common.white : muiTheme.palette.common.black, 0.1),
                    color: 'text.secondary',
                    border: `1px solid ${alpha(isDark ? muiTheme.palette.common.white : muiTheme.palette.common.black, 0.15)}`,
                    backdropFilter: 'blur(3px)',
                  }}
                />
              )}
            </Box>
          </Box>

          <CardContent sx={{ p: 2.5, pt: 2, zIndex: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: '1.2rem',
                mb: 1,
                color: 'text.primary',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {language === 'en' ? name : nameZh}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.88rem',
                lineHeight: 1.6,
                mb: 2.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: 'calc(1.6 * 0.88rem * 2)',
              }}
            >
              {language === 'en' ? description : descriptionZh}
            </Typography>

            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                {githubUrl && (
                  <AnimatedIconButton
                  title="GitHub Repository"
                    onClick={(e) => handleLinkClick(e, githubUrl)}
                    size="small"
                >
                  <FiGithub size={18} />
                </AnimatedIconButton>
                )}
                {url && (
                  <AnimatedIconButton
                  title="Live Demo / Website"
                    onClick={(e) => handleLinkClick(e, url)}
                    size="small"
                >
                  <FiExternalLink size={18} />
                </AnimatedIconButton>
                )}
              {hasDetails && (
                 <AnimatedIconButton
                  title="View Details"
                  onClick={handleCardClick}
                  size="small"
                  sx={{ ml: 'auto' }}
                >
                  <FiInfo size={18} />
                </AnimatedIconButton>
              )}
            </Stack>
          </CardContent>
        </Box>
      </motion.div>

      <AnimatePresence>
        {isDetailOpen && (
          <ProjectDetail
            name={name}
            nameZh={nameZh}
            description={description}
            descriptionZh={descriptionZh}
            longDescription={getLongDescription()}
            technologies={technologies}
            imageUrl={imageUrl}
            url={url}
            githubUrl={githubUrl}
            onClose={() => setIsDetailOpen(false)}
          />
        )}
      </AnimatePresence>

      <Modal
        open={isImagePreviewOpen}
        onClose={() => setIsImagePreviewOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
          sx: imagePreviewBackdropStyle,
        }}
        sx={imagePreviewModalStyle}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          style={imagePreviewContentStyle}
          onClick={(e) => e.stopPropagation()}
        >
              <img
                src={imageUrl}
            alt={`${language === 'en' ? name : nameZh} preview`}
                style={{
                  display: 'block',
              maxWidth: isImageEnlarged ? 'none' : '100%',
              maxHeight: '90vh',
              width: isImageEnlarged ? 'auto' : '100%',
              height: isImageEnlarged ? 'auto' : 'auto',
              objectFit: 'contain',
              cursor: 'zoom-out',
            }}
            onClick={toggleImageSize}
          />
          <IconButton
            onClick={() => setIsImagePreviewOpen(false)}
                sx={{
                  position: 'absolute',
              top: 8,
              right: 8,
              color: 'common.white',
              backgroundColor: alpha(muiTheme.palette.common.black, 0.4),
                    '&:hover': {
                backgroundColor: alpha(muiTheme.palette.common.black, 0.6),
              }
            }}
            size="small"
                >
                  <FiX />
                </IconButton>
                  <IconButton
            onClick={handleImageDownload}
                    sx={{
                      position: 'absolute',
              bottom: 8,
              right: 8,
              color: 'common.white',
              backgroundColor: alpha(muiTheme.palette.common.black, 0.4),
                      '&:hover': {
                backgroundColor: alpha(muiTheme.palette.common.black, 0.6),
              }
            }}
            size="small"
          >
            <FiDownload />
                  </IconButton>
          </motion.div>
      </Modal>
    </>
  );
};

export default EnhancedProjectCard;
