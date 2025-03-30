import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  alpha,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../hooks/useLanguage';

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

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  nameZh = name,
  description,
  descriptionZh = description,
  longDescription,
  technologies = [],
  imageUrl,
  url = '',
  githubUrl,
  // category,
  index = 0
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isDark = theme === 'dark';

  const handleOpenDetail = () => {
    if (longDescription) {
      setIsDialogOpen(true);
    }
  };

  // 处理外部链接点击
  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement>, link?: string) => {
    e.stopPropagation(); // 阻止事件冒泡
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  // 处理长描述文本，增强容错处理
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

  // 检查是否应该启用点击以显示详情
  const hasDetails = !!longDescription;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        style={{ height: '100%' }}
      >
        <Card
          onClick={hasDetails ? handleOpenDetail : undefined}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
            cursor: hasDetails ? 'pointer' : 'default',
            backgroundColor: isDark
              ? 'rgba(30, 41, 59, 0.6)'
              : 'rgba(255, 255, 255, 0.8)',
            border: `1px solid ${isDark
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.05)'}`,
            boxShadow: isDark
              ? '0 4px 12px rgba(0, 0, 0, 0.3)'
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: isDark
                ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                : '0 8px 24px rgba(0, 0, 0, 0.12)',
              '& .project-image': {
                transform: 'scale(1.05)'
              }
            }
          }}
        >
          {/* 项目图片 */}
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height={180}
              image={imageUrl}
              alt={language === 'en' ? name : nameZh}
              className="project-image"
              sx={{
                transition: 'transform 0.3s ease-in-out',
                objectFit: 'cover'
              }}
            />

            {/* 技术标签覆盖在图片上 */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '30px 12px 8px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                alignItems: 'center'
              }}
            >
              {technologies.slice(0, 3).map((tech, i) => (
                <Chip
                  key={i}
                  label={tech}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.65rem',
                    backgroundColor: alpha('#fff', 0.2),
                    color: '#fff',
                    backdropFilter: 'blur(4px)',
                    cursor: hasDetails ? 'pointer' : 'default',
                    '&:hover': {
                      backgroundColor: alpha('#fff', 0.25),
                    }
                  }}
                />
              ))}
              {technologies.length > 3 && (
                <Chip
                  label={`+${technologies.length - 3}`}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.65rem',
                    backgroundColor: alpha('#fff', 0.15),
                    color: '#fff',
                    backdropFilter: 'blur(4px)',
                    cursor: hasDetails ? 'pointer' : 'default'
                  }}
                />
              )}
            </Box>
          </Box>

          {/* 项目内容 */}
          <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                fontSize: '1.1rem',
                mb: 1
              }}
            >
              {language === 'en' ? name : nameZh}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                fontSize: '0.85rem',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.5
              }}
            >
              {language === 'en' ? description : descriptionZh}
            </Typography>

            {/* 链接按钮 */}
            {(url || githubUrl) && (
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1,
                mt: 'auto'
              }}>
                {githubUrl && (
                  <IconButton
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleLinkClick(e, githubUrl)}
                    size="small"
                    sx={{
                      color: isDark ? alpha('#fff', 0.8) : alpha('#000', 0.7),
                      '&:hover': {
                        bgcolor: isDark ? alpha('#fff', 0.1) : alpha('#000', 0.05),
                      }
                    }}
                  >
                    <FiGithub size={18} />
                  </IconButton>
                )}
                {url && (
                  <IconButton
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleLinkClick(e, url)}
                    size="small"
                    sx={{
                      color: isDark ? alpha('#fff', 0.8) : alpha('#000', 0.7),
                      '&:hover': {
                        bgcolor: isDark ? alpha('#fff', 0.1) : alpha('#000', 0.05),
                      }
                    }}
                  >
                    <FiExternalLink size={18} />
                  </IconButton>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* 项目详情对话框 - 简化样式 */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            backgroundColor: isDark
              ? 'rgba(15, 23, 42, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3
        }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {language === 'en' ? name : nameZh}
          </Typography>
          <IconButton
            onClick={() => setIsDialogOpen(false)}
            sx={{
              color: isDark ? '#fff' : '#000',
              '&:hover': {
                backgroundColor: alpha(
                  isDark ? '#fff' : '#000',
                  0.1
                )
              }
            }}
          >
            <FiX />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ p: 3 }}>
          {/* 项目图片 */}
          <Box
            component="img"
            src={imageUrl}
            alt={language === 'en' ? name : nameZh}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 1,
              mb: 3
            }}
          />

          {/* 技术标签 */}
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ mb: 2 }}
          >
            {technologies.map((tech, i) => (
              <Chip
                key={i}
                label={tech}
                size="small"
                sx={{
                  margin: '0 4px 4px 0',
                  bgcolor: isDark
                    ? alpha('#fff', 0.1)
                    : alpha('#000', 0.05),
                  color: isDark
                    ? alpha('#fff', 0.9)
                    : alpha('#000', 0.8)
                }}
              />
            ))}
          </Stack>

          {/* 项目描述 */}
          <Typography
            variant="body1"
            paragraph
            sx={{
              lineHeight: 1.7,
              fontSize: '0.95rem'
            }}
          >
            {getLongDescription()}
          </Typography>

          {/* 链接按钮 */}
          {(url || githubUrl) && (
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              mt: 2
            }}>
              {githubUrl && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleLinkClick(e, githubUrl)}
                    sx={{
                      color: isDark ? '#fff' : '#000',
                      p: 1.5
                    }}
                  >
                    <FiGithub size={20} />
                  </IconButton>
                </motion.div>
              )}
              {url && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleLinkClick(e, url)}
                    sx={{
                      color: isDark ? '#fff' : '#000',
                      p: 1.5
                    }}
                  >
                    <FiExternalLink size={20} />
                  </IconButton>
                </motion.div>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
