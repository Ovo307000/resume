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
import GlassyBlobBackground from '../../components/ui/backgrounds/GlassyBlobBackground';
import PageTitle from '../../components/ui/common/PageTitle';

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
 * 展示个人项目作品
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

  // 确保项目数据存在
  if (!data || data.length === 0) {
    console.warn('No project data available');
  }

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
            <PageTitle title={t('projects.title')} />
          </motion.div>

          {/* 页面简介 */}
          <motion.div variants={itemVariants}>
            <GlassyBlobBackground
              colorSet="rainbow"
              intensity="light"
              containerSx={{
                borderRadius: '16px',
                p: 3,
                mb: 6
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  textAlign: 'center',
                  fontWeight: 'medium',
                  color: 'text.secondary',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.8
                }}
              >
                这里展示了我参与开发的项目，涵盖了后端开发的各个方面，从数据库设计到API开发，从业务逻辑到性能优化。
              </Typography>
            </GlassyBlobBackground>
          </motion.div>

          {/* 项目展示网格 */}
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={6} key={project.name}>
                <motion.div
                  variants={itemVariants}
                  custom={index}
                >
                  <GlassyBlobBackground
                    colorSet={index % 2 === 0 ? "primary" : "cool"}
                    intensity="light"
                    containerSx={{
                      borderRadius: '16px',
                      p: 0,
                      overflow: 'hidden',
                      height: '100%',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      }
                    }}
                  >
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<FiGithub />}
                          sx={{
                            textTransform: 'none',
                            borderRadius: '8px',
                            px: 2
                          }}
                        >
                          {t('projects.viewCode')}
                        </Button>
                      </CardActions>
                    </Box>
                  </GlassyBlobBackground>
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
