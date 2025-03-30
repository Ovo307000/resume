import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  alpha,
  useTheme as useMuiTheme,
  Stack,
  IconButton,
  useMediaQuery,
  Chip
} from '@mui/material';
import { FiArrowUpRight, FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
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
interface NewProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list' | 'masonry';
  onSelect: () => void;
  index: number;
}

/**
 * 全新设计的项目卡片组件
 * 具有上下模糊渐变效果，响应式设计，多种视图模式
 */
const NewProjectCard: React.FC<NewProjectCardProps> = ({
  project,
  viewMode,
  onSelect,
  index
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 状态
  const [isHovered, setIsHovered] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  // 根据视图模式判断是否为列表视图
  const isList = viewMode === 'list';

  // 获取本地化名称和描述
  const localizedName = language === 'en' ? project.name : (project.nameZh || project.name);
  const localizedDescription = language === 'en' ? project.description : (project.descriptionZh || project.description);

  // 卡片动画变体
  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  // 链接按钮动画变体
  const linkButtonVariants = {
    initial: { scale: 0, opacity: 0 },
    hover: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        delay: 0.1
      }
    }
  };

  // 箭头动画变体
  const arrowVariants = {
    initial: { x: 0 },
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5
      }
    }
  };

  // 获取应显示的技术标签数量
  const getVisibleTechCount = () => {
    if (!project.technologies) return 0;
    if (showAllTags) return project.technologies.length; // 显示所有标签
    if (isList) return isMobile ? 3 : 5;
    if (isMobile) return 2;
    if (isTablet) return 3;
    return 4;
  };

  // 技术标签相关计算
  const visibleTechCount = getVisibleTechCount();
  const hasMoreTech = !showAllTags && project.technologies && project.technologies.length > visibleTechCount;
  const visibleTechnologies = project.technologies ? project.technologies.slice(0, visibleTechCount) : [];
  const hiddenTechCount = project.technologies ? project.technologies.length - visibleTechCount : 0;

  // 处理外部链接点击
  const handleLinkClick = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // 处理展开标签
  const handleExpandTags = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    setShowAllTags(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover="hover"
      variants={cardVariants}
      transition={{ delay: index * 0.05 }}
      onClick={onSelect}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        height: '100%',
        cursor: 'pointer',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: isList ? 'row' : 'column',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: isDark
            ? alpha(muiTheme.palette.background.paper, 0.4)
            : alpha(muiTheme.palette.background.paper, 0.7),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(isDark ? '#fff' : '#000', 0.1)}`,
          boxShadow: isDark
            ? `0 10px 20px -5px ${alpha('#000', 0.2)}`
            : `0 10px 20px -5px ${alpha('#000', 0.05)}`,
          transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
          position: 'relative',
          '&:hover': {
            boxShadow: isDark
              ? `0 0 20px 5px ${alpha(muiTheme.palette.primary.main, 0.3)}, 0 10px 20px -5px ${alpha('#000', 0.2)}`
              : `0 0 20px 5px ${alpha(muiTheme.palette.primary.main, 0.2)}, 0 10px 20px -5px ${alpha('#000', 0.05)}`,
          },
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            height: isList ? '100%' : '80px',
            zIndex: 2,
            pointerEvents: 'none',
            opacity: isHovered ? 0 : 1,
            transition: 'opacity 0.3s ease',
          },
          '&::before': {
            top: 0,
            background: isList
              ? 'none'
              : `linear-gradient(to bottom, ${isDark ? alpha('#121212', 0.8) : alpha('#fff', 0.9)} 0%, transparent 100%)`,
          },
          '&::after': {
            bottom: 0,
            background: isList
              ? 'none'
              : `linear-gradient(to top, ${isDark ? alpha('#121212', 0.8) : alpha('#fff', 0.9)} 0%, transparent 100%)`,
          },
        }}
      >
        {/* 图片区域 */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            height: isList ? { xs: '140px', sm: '160px', md: '180px' } : 200,
            width: isList ? { xs: 120, sm: 200, md: 250 } : '100%',
            flexShrink: 0,
            minWidth: isList ? { xs: 120, sm: 200, md: 250 } : 'auto',
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${project.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: isDark ? (isList ? 'brightness(1)' : 'brightness(0.85)') : 'none',
                transition: 'filter 0.3s ease-in-out',
              }}
            />
          </motion.div>

          {/* 项目类别标签 */}
          {project.category && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                zIndex: 3,
              }}
            >
              <Chip
                icon={<FiCode size={14} />}
                label={project.category.toUpperCase()}
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  height: 24,
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  backgroundColor: isDark
                    ? alpha(muiTheme.palette.grey[900], 0.7)
                    : alpha(muiTheme.palette.common.white, 0.8),
                  border: `1px solid ${alpha(isDark ? '#fff' : '#000', 0.1)}`,
                  color: isDark ? 'text.secondary' : 'text.primary',
                }}
              />
            </Box>
          )}

          {/* 快速访问按钮 - 悬停时显示 */}
          <AnimatePresence>
            {isHovered && project.githubUrl && (
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
                  gap: 8,
                }}
              >
                <motion.div variants={linkButtonVariants} initial="initial" animate="hover">
                  <IconButton
                    size="small"
                    onClick={(e) => handleLinkClick(e, project.githubUrl)}
                    sx={{
                      backgroundColor: isDark
                        ? alpha(muiTheme.palette.background.paper, 0.7)
                        : alpha(muiTheme.palette.background.paper, 0.9),
                      color: 'text.primary',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)',
                      border: `1px solid ${alpha(isDark ? '#fff' : '#000', 0.2)}`,
                      borderRadius: '8px',
                      transition: 'background-color 0.2s ease, border-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: isDark
                          ? alpha(muiTheme.palette.background.paper, 0.9)
                          : alpha(muiTheme.palette.background.paper, 1),
                        borderColor: alpha(isDark ? '#fff' : '#000', 0.4),
                      }
                    }}
                  >
                    <FiGithub size={16} />
                  </IconButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* 内容区域 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: isList ? { xs: 2, md: 3 } : 2.5,
            width: '100%',
            position: 'relative',
            zIndex: 1,
            height: isList ? 'auto' : '100%',
            ...(isList && {
              ml: 1,
            }),
          }}
        >
          <Box>
            {/* 项目名称 */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
                fontSize: isList ? { xs: '1.2rem', md: '1.4rem' } : '1.2rem',
                mb: isList ? 0.75 : 1,
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.3,
              }}
            >
              {localizedName}
            </Typography>

            {/* 项目描述 */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                mb: isList ? 1.5 : 2,
                display: '-webkit-box',
                WebkitLineClamp: isList ? 2 : 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: isList ? 'auto' : 'calc(0.9rem * 1.6 * 3)',
              }}
            >
              {localizedDescription}
            </Typography>
          </Box>

          {/* 技术标签和"查看详情"区域 */}
          <Box sx={{ paddingBottom: 0.5 /* Add some padding for scaled tags */ }}>
            {/* 技术标签 */}
            {project.technologies && project.technologies.length > 0 && (
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                sx={{
                  mb: isList ? 1.5 : 2,
                  gap: 1,
                  maxWidth: '100%',
                  // overflow: 'hidden' // Remove overflow hidden
                }}
              >
                {visibleTechnologies.map((tech, idx) => (
                  <TechnologyTag
                    key={idx}
                    tech={tech}
                    size="small"
                    index={idx}
                  />
                ))}

                {hasMoreTech && (
                  <TechnologyTag
                    key="expand-tags"
                    tech={`+${hiddenTechCount}`}
                    size="small"
                    onClick={handleExpandTags}
                  />
                )}
              </Stack>
            )}

            {/* 查看详情按钮 - 悬停时显示 */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    bottom: isList ? 16 : 20,
                    right: isList ? 16 : 20,
                    zIndex: 3,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={onSelect}
                    sx={{
                      backgroundColor: isDark
                        ? alpha(muiTheme.palette.background.paper, 0.7)
                        : alpha(muiTheme.palette.background.paper, 0.9),
                      color: muiTheme.palette.primary.main,
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)',
                      border: `1px solid ${alpha(muiTheme.palette.primary.main, 0.4)}`,
                      borderRadius: '8px',
                      transition: 'background-color 0.2s ease, border-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: isDark
                          ? alpha(muiTheme.palette.background.paper, 0.9)
                          : alpha(muiTheme.palette.background.paper, 1),
                        borderColor: alpha(muiTheme.palette.primary.main, 0.6),
                      }
                    }}
                  >
                    <FiArrowUpRight size={16} />
                  </IconButton>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default NewProjectCard;
