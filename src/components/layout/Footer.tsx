import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Box, Container, Typography, IconButton, Grid, Divider, alpha, useTheme as useMuiTheme } from '@mui/material';
import { FiGithub, FiMail, FiPhone, FiCode, FiHeart } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import GlassyBlobBackground from '../ui/backgrounds/GlassyBlobBackground';

/**
 * 页脚组件
 * 展示网站版权信息和社交媒体链接
 * 采用玻璃拟态设计风格
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const muiTheme = useMuiTheme();
  const { theme } = useTheme();

  // 社交媒体链接
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FiGithub size={18} />,
      url: 'https://github.com/Ovo307000',
      ariaLabel: 'GitHub'
    },
    {
      name: 'Email',
      icon: <FiMail size={18} />,
      url: 'mailto:solowzl@outlook.com',
      ariaLabel: 'Email'
    },
    {
      name: 'Phone',
      icon: <FiPhone size={18} />,
      url: 'tel:19154085798',
      ariaLabel: 'Phone'
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 12,
        pt: 6,
        pb: 3,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <GlassyBlobBackground
        colorSet="cool"
        intensity="light"
        blobCount={4}
        animate={true}
        containerSx={{
          borderRadius: 0,
          pb: 2
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            {/* 左侧 - 名称和版权信息 */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: { xs: 3, md: 0 } }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      mb: 1,
                      fontWeight: 'bold',
                      background: 'linear-gradient(90deg, #ff4d4d, #4d79ff, #4dff91)',
                      backgroundSize: '600% 600%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'gradient 6s ease infinite'
                    }}
                  >
                    赵东安
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {t('footer.tagline')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    © {currentYear} | Java Backend Developer
                  </Typography>
                </motion.div>
              </Box>
            </Grid>

            {/* 右侧 - 社交媒体 */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {socialLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      sx={{
                        color: theme === 'dark' ? 'white' : 'text.primary',
                        backgroundColor: alpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.1 : 0.05),
                        borderRadius: '12px',
                        p: 1.5,
                        '&:hover': {
                          backgroundColor: alpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.2 : 0.1),
                          color: 'primary.main'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {link.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, opacity: 0.1 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}
            >
              <FiCode size={14} />
              {t('footer.madeWith')}
              <FiHeart size={14} style={{ color: muiTheme.palette.error.main }} />
              {t('footer.using')} React & Material UI
            </Typography>
          </Box>
        </Container>
      </GlassyBlobBackground>
    </Box>
  );
};

export default Footer;
