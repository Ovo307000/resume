import React from 'react';
import { Box, Grid, Typography, Chip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import GlassPanel from '../../../components/ui/glass/GlassPanel';
import AnimatedLink from '../../../components/ui/common/AnimatedLink';

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  backgroundColor?: string;
}

/**
 * 项目卡片组件
 */
const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  backgroundColor
}) => {
  const { theme } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <GlassPanel sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease',
        boxShadow: theme === 'dark'
          ? '0 10px 30px rgba(0, 0, 0, 0.2)'
          : '0 10px 30px rgba(0, 0, 0, 0.08)'
      }}>
        {/* 项目图片 */}
        <Box
          sx={{
            height: 200,
            width: '100%',
            backgroundColor: backgroundColor || (theme === 'dark' ? '#1E1E30' : '#f5f5f5'),
            overflow: 'hidden',
            position: 'relative',
            '&:hover img': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
          />
        </Box>

        {/* 项目内容 */}
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
            {title}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
            {description}
          </Typography>

          {/* 技术标签 */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: theme === 'dark' ? 'rgba(160, 160, 255, 0.1)' : 'rgba(80, 80, 255, 0.05)',
                  color: theme === 'dark' ? '#a0a0ff' : '#5050ff',
                  borderRadius: '8px',
                  fontWeight: 500
                }}
              />
            ))}
          </Box>

          {/* 项目链接 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {githubUrl && (
              <Button
                startIcon={<FiGithub />}
                variant="text"
                component="a"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: '8px',
                  fontWeight: 500,
                  textTransform: 'none',
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    color: 'text.primary'
                  }
                }}
              >
                GitHub
              </Button>
            )}

            {liveUrl && (
              <Button
                startIcon={<FiExternalLink />}
                variant="text"
                component="a"
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: '8px',
                  fontWeight: 500,
                  textTransform: 'none',
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    color: 'text.primary'
                  }
                }}
              >
                Live Demo
              </Button>
            )}
          </Box>
        </Box>
      </GlassPanel>
    </motion.div>
  );
};

/**
 * 最近项目展示组件
 */
const RecentProjects: React.FC = () => {
  const { t } = useTranslation();

  // 硬编码的项目数据，实际项目中可以从API获取
  const projects: ProjectProps[] = [
    {
      title: 'Portfolio Website',
      description: t('projects.portfolio.description'),
      image: '/images/projects/portfolio.jpg',
      technologies: ['React', 'TypeScript', 'Material UI', 'Framer Motion'],
      githubUrl: 'https://github.com/username/portfolio',
      liveUrl: 'https://portfolio.example.com',
      backgroundColor: '#2A2A4A'
    },
    {
      title: 'E-commerce Platform',
      description: t('projects.ecommerce.description'),
      image: '/images/projects/ecommerce.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Redux'],
      githubUrl: 'https://github.com/username/ecommerce',
      liveUrl: 'https://shop.example.com',
      backgroundColor: '#2D4A65'
    },
    {
      title: 'Task Management App',
      description: t('projects.taskapp.description'),
      image: '/images/projects/taskapp.jpg',
      technologies: ['Vue.js', 'Firebase', 'Vuetify'],
      githubUrl: 'https://github.com/username/taskapp',
      backgroundColor: '#3A3456'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4
        }}
      >
        <AnimatedLink to="/projects" variant="button">
          {t('home.view_all_projects')}
          <FiArrowRight style={{ marginLeft: 8 }} />
        </AnimatedLink>
      </Box>
    </>
  );
};

export default RecentProjects;
