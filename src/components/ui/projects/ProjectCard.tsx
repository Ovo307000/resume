import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  alpha,
  useTheme as useMuiTheme,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiInfo, FiEye } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import ProjectDetail from './ProjectDetail';
import TechTagGroup from '../common/TechTagGroup';

interface ProjectCardProps {
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  url: string;
  githubUrl?: string;
  category?: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  nameZh,
  description,
  descriptionZh,
  longDescription,
  technologies,
  imageUrl,
  url,
  githubUrl,
  category,
  index
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [showDetail, setShowDetail] = useState(false);

  const getLocalizedName = () => {
    return language === 'zh' ? nameZh : name;
  };

  const getLocalizedDescription = () => {
    return language === 'zh' ? descriptionZh : description;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const handleOpenDetail = () => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: theme === 'dark'
              ? '0 8px 20px rgba(0,0,0,0.3)'
              : '0 8px 20px rgba(0,0,0,0.1)',
            background: theme === 'dark'
              ? alpha(muiTheme.palette.background.paper, 0.6)
              : alpha(muiTheme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(
              theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.black,
              0.05
            )}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: theme === 'dark'
                ? '0 12px 24px rgba(0,0,0,0.4)'
                : '0 12px 24px rgba(0,0,0,0.15)',
              borderColor: alpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.6 : 0.4),
              transform: 'scale(1.01)',
            }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
            onClick={handleOpenDetail}
          >
            <CardMedia
              component="img"
              height="180"
              image={imageUrl}
              alt={getLocalizedName()}
              sx={{
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
            {category && (
              <Chip
                label={t(`projects.filters.${category}`, category)}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  backgroundColor: theme === 'dark'
                    ? 'rgba(0, 0, 0, 0.6)'
                    : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: theme === 'dark' ? 'white' : 'text.primary',
                  textTransform: 'capitalize'
                }}
              />
            )}

            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'all 0.3s ease',
                '&:hover': {
                  opacity: 1
                }
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<FiEye />}
                sx={{
                  borderRadius: '30px',
                  textTransform: 'none',
                  fontWeight: 500,
                  backgroundColor: alpha(muiTheme.palette.primary.main, 0.9),
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}
              >
                View Details
              </Button>
            </Box>
          </Box>

          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              fontWeight="bold"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {getLocalizedName()}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: '2.5rem'
              }}
            >
              {getLocalizedDescription()}
            </Typography>

            <TechTagGroup
              techItems={technologies.map(tech => ({ name: tech }))}
              showToggle={false}
              animate={true}
              variant="small"
              collapsible={technologies.length > 3}
              maxVisibleItems={3}
              initiallyExpanded={false}
            />
          </CardContent>

          <CardActions sx={{
            p: 2,
            pt: 0,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            gap: { xs: 1, sm: 0 }
          }}>
            <Box sx={{
              display: 'flex',
              gap: 1.5,
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}>
              <Tooltip title={t('projects.viewDetail', 'View Details')}>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={handleOpenDetail}
                  startIcon={<FiInfo size={16} />}
                  sx={{
                    borderRadius: '20px',
                    textTransform: 'none',
                    minWidth: { xs: '40px', sm: '0' },
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.75, sm: 0.5 },
                    fontWeight: 500,
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      transition: 'transform 0.2s ease'
                    }
                  }}
                >
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    Details
                  </Box>
                </Button>
              </Tooltip>

              <Tooltip title={t('projects.viewProject', 'View Project')}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<FiExternalLink size={16} />}
                  sx={{
                    borderRadius: '20px',
                    textTransform: 'none',
                    minWidth: { xs: '40px', sm: '0' },
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.75, sm: 0.5 },
                    fontWeight: 500,
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      transition: 'transform 0.2s ease'
                    }
                  }}
                >
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    Visit
                  </Box>
                </Button>
              </Tooltip>
            </Box>

            {githubUrl && (
              <Box sx={{
                width: { xs: '100%', sm: 'auto' },
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-end' },
                mt: { xs: 1, sm: 0 }
              }}>
                <Tooltip title={t('projects.viewCode', 'View Source Code')}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    component="a"
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<FiGithub size={16} />}
                    sx={{
                      borderRadius: '20px',
                      textTransform: 'none',
                      minWidth: { xs: '40px', sm: '0' },
                      px: { xs: 1.5, sm: 2 },
                      py: { xs: 0.75, sm: 0.5 },
                      fontWeight: 500,
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        transition: 'transform 0.2s ease'
                      }
                    }}
                  >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                      Code
                    </Box>
                  </Button>
                </Tooltip>
              </Box>
            )}
          </CardActions>
        </Card>
      </motion.div>

      {showDetail && (
        <ProjectDetail
          name={name}
          nameZh={nameZh}
          description={description}
          descriptionZh={descriptionZh}
          longDescription={longDescription}
          technologies={technologies}
          imageUrl={imageUrl}
          url={url}
          githubUrl={githubUrl}
          onClose={handleCloseDetail}
        />
      )}
    </>
  );
};

export default ProjectCard;
