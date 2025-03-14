import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  DialogTitle
} from '@mui/material';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { TechnologyTag } from './TechnologyTag';

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
  const muiTheme = useMuiTheme();
  const { language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 新增：检测是否为移动设备
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleOpenDetail = () => {
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
            borderRadius: '16px',
            overflow: 'hidden',
            cursor: hasDetails ? 'pointer' : 'default',
            backgroundColor: theme === 'dark'
              ? 'rgba(30, 30, 40, 0.6)'
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)'}`,
            boxShadow: theme === 'dark'
              ? '0 4px 20px rgba(0, 0, 0, 0.4)'
              : '0 4px 20px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme === 'dark'
                ? '0 8px 30px rgba(0, 0, 0, 0.6)'
                : '0 8px 30px rgba(0, 0, 0, 0.15)',
              '& .project-image': {
                transform: 'scale(1.05)'
              }
            }
          }}
        >
          {/* 项目图片 */}
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={language === 'en' ? name : nameZh}
            className="project-image"
            sx={{
              transition: 'transform 0.3s ease-in-out',
              objectFit: 'cover'
            }}
          />

          {/* 项目内容 */}
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                fontSize: '1.25rem',
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
                minHeight: '3em',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {language === 'en' ? description : descriptionZh}
            </Typography>

            {/* 技术标签 */}
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: 2
            }}>
              {technologies.map((tech, i) => (
                <TechnologyTag key={i} name={tech} />
              ))}
            </Box>

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
                    onClick={(e) => handleLinkClick(e, githubUrl)}
                    size="small"
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
                )}
                {url && (
                  <IconButton
                    onClick={(e) => handleLinkClick(e, url)}
                    size="small"
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
                    <FiExternalLink />
                  </IconButton>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* 项目详情对话框 */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '20px',
            backgroundColor: theme === 'dark'
              ? 'rgba(30, 30, 40, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)'}`,
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
        <DialogContent sx={{ p: 3 }}>
          {/* 项目图片 */}
          <Box
            component="img"
            src={imageUrl}
            alt={language === 'en' ? name : nameZh}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              mb: 3
            }}
          />

          {/* 项目描述 */}
          <Typography variant="body1" paragraph>
            {getLongDescription()}
          </Typography>

          {/* 技术标签 */}
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mb: 3
          }}>
            {technologies.map((tech, i) => (
              <TechnologyTag key={i} name={tech} />
            ))}
          </Box>

          {/* 链接按钮 */}
          {(url || githubUrl) && (
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2
            }}>
              {githubUrl && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    onClick={(e) => handleLinkClick(e, githubUrl)}
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
              )}
              {url && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    onClick={(e) => handleLinkClick(e, url)}
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
                    <FiExternalLink />
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
