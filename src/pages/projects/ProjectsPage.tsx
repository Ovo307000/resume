import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Link as MuiLink
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';

interface Project {
  name: string;
  nameZh: string;
  url: string;
  description: string;
  descriptionZh: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  showAllTechnologies: boolean;
}

interface ProjectsPageProps {
  data: Project[];
}

/**
 * 项目展示页面组件
 */
const ProjectsPage: React.FC<ProjectsPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [projects, setProjects] = useState(data.map(project => ({ ...project, showAllTechnologies: false })));

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 页面标题 */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              textAlign="center"
              sx={{
                mb: 6,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #4338CA, #6366F1)',
                  borderRadius: '2px',
                }
              }}
            >
              {t('projects.title')}
            </Typography>
          </motion.div>

          {/* 项目展示网格 */}
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={6} key={project.name}>
                <motion.div
                  variants={itemVariants}
                  custom={index}
                >
                  <Card
                    elevation={4}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme === 'dark'
                          ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
                          : '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    {/* 项目图片 */}
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="240"
                        image={project.imageUrl}
                        alt={language === 'zh' ? project.nameZh : project.name}
                        sx={{
                          objectFit: 'cover',
                        }}
                      />
                      {/* 渐变遮罩 */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '50%',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                          display: 'flex',
                          alignItems: 'flex-end',
                          padding: 2
                        }}
                      >
                        <Typography variant="h5" component="h2" sx={{ color: 'white', fontWeight: 'bold' }}>
                          {language === 'zh' ? project.nameZh : project.name}
                        </Typography>
                      </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        {language === 'zh' ? project.descriptionZh : project.description}
                      </Typography>

                      {/* 技术标签 */}
                      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {project.technologies.slice(0, project.technologies.length > 5 && !project.showAllTechnologies ? 5 : project.technologies.length).map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            sx={{
                              bgcolor: theme === 'dark' ? 'rgba(67, 56, 202, 0.2)' : 'rgba(67, 56, 202, 0.1)',
                              color: theme === 'dark' ? 'primary.light' : 'primary.main',
                              fontWeight: 'medium'
                            }}
                          />
                        ))}
                        {project.technologies.length > 5 && !project.showAllTechnologies && (
                          <Chip
                            label={`+${project.technologies.length - 5}`}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontWeight: 'medium',
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: theme === 'dark' ? 'rgba(67, 56, 202, 0.1)' : 'rgba(67, 56, 202, 0.05)',
                              }
                            }}
                            onClick={() => {
                              // Copy projects array and modify the specific project to show all technologies
                              const updatedProjects = [...projects];
                              updatedProjects[index] = { ...project, showAllTechnologies: true };
                              // Update state
                              setProjects(updatedProjects);
                            }}
                          />
                        )}
                      </Box>
                    </CardContent>

                    <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}>
                      <IconButton
                        aria-label={t('projects.viewCode')}
                        color="primary"
                        component={MuiLink}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          bgcolor: theme === 'dark' ? 'rgba(67, 56, 202, 0.2)' : 'rgba(67, 56, 202, 0.1)',
                          '&:hover': {
                            bgcolor: theme === 'dark' ? 'rgba(67, 56, 202, 0.3)' : 'rgba(67, 56, 202, 0.2)',
                          },
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 2,
                          py: 1,
                          borderRadius: '8px'
                        }}
                      >
                        <FiGithub style={{ marginRight: '4px' }} />
                        <Typography variant="button" sx={{ display: { xs: 'none', sm: 'block' }, textTransform: 'none' }}>
                          {t('projects.viewCode')}
                        </Typography>
                      </IconButton>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProjectsPage;
