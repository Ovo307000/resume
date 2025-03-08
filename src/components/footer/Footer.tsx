import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, Stack, Divider, alpha } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiGithub,
  FiMail,
  FiPhone,
  FiExternalLink,
  FiHeart,
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiBook,
  FiMessageCircle
} from 'react-icons/fi';
import { SiWechat, SiReact, SiMui } from 'react-icons/si';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import AnimatedLink from '../ui/common/AnimatedLink';

interface FooterProps {
  data?: {
    email?: string;
    phone?: string;
    github?: string;
    githubUsername?: string;
    wechat?: string;
  };
}

/**
 * 页脚组件
 * 提供现代化、具有一致风格的页脚设计
 */
const Footer: React.FC<FooterProps> = ({ data = {} }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // 获取github用户名
  const githubUsername = data.githubUsername || (data.github && data.github.includes('github.com/')
    ? data.github.split('github.com/')[1]
    : data.github);

  // 网站导航链接
  const navLinks = [
    { name: t('header.home'), path: '/', icon: <FiHome size={16} /> },
    { name: t('header.about'), path: '/about', icon: <FiUser size={16} /> },
    { name: t('header.skills'), path: '/skills', icon: <FiCode size={16} /> },
    { name: t('header.projects'), path: '/projects', icon: <FiBriefcase size={16} /> },
    { name: t('header.education'), path: '/education', icon: <FiBook size={16} /> },
    { name: t('header.contact'), path: '/contact', icon: <FiMessageCircle size={16} /> }
  ];

  // 社交媒体链接
  const contactLinks = [
    {
      name: t('footer.contactEmail'),
      icon: <FiMail size={18} color="#ea4335" />,
      url: data.email ? `mailto:${data.email}` : undefined,
      value: data.email
    },
    {
      name: t('footer.contactPhone'),
      icon: <FiPhone size={18} color="#34a853" />,
      url: data.phone ? `tel:${data.phone}` : undefined,
      value: data.phone
    },
    {
      name: 'GitHub',
      icon: <FiGithub size={18} color={theme === 'dark' ? '#fff' : '#333'} />,
      url: data.github?.startsWith('http') ? data.github : githubUsername ? `https://github.com/${githubUsername}` : undefined,
      value: githubUsername || data.github
    },
    {
      name: 'WeChat',
      icon: <SiWechat size={18} color="#07C160" />,
      value: data.wechat
    }
  ].filter(link => link.value);

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        position: 'relative',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: `1px solid ${alpha(theme === 'dark' ? '#fff' : '#000', 0.1)}`,
        background: theme === 'dark'
          ? 'linear-gradient(to top, rgba(26, 32, 53, 0.8), rgba(26, 32, 53, 0.6))'
          : 'linear-gradient(to top, rgba(248, 250, 252, 0.85), rgba(241, 245, 249, 0.8))',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '1px',
          background: `linear-gradient(90deg,
            transparent 0%,
            ${alpha('#6366F1', theme === 'dark' ? 0.5 : 0.3)} 50%,
            transparent 100%
          )`,
        }
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={6}>
            {/* Quick Links - 现在在左侧 */}
            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 2 }}
              >
                {t('footer.quickLinks')}
              </Typography>

              <Grid container spacing={2}>
                {navLinks.map((link) => (
                  <Grid item xs={6} key={link.path}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <MuiLink
                        component={Link}
                        to={link.path}
                        underline="none"
                        sx={{
                          color: 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          transition: 'color 0.2s',
                          '&:hover': {
                            color: 'primary.main',
                          }
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: theme === 'dark' ? alpha('#6366F1', 0.9) : '#6366F1'
                          }}
                        >
                          {link.icon}
                        </Box>
                        {link.name}
                      </MuiLink>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 2 }}
              >
                {t('footer.connect')}
              </Typography>

              <Grid container spacing={2}>
                {contactLinks.map((link, index) => (
                  <Grid item xs={12} sm={6} key={link.name}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                    >
                      <Box>{link.icon}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: '0.8rem', mb: 0.3 }}
                        >
                          {link.name}
                        </Typography>

                        {link.url ? (
                          link.url.startsWith('http') ? (
                            <AnimatedLink
                              to={link.url}
                              variant="underline"
                              fontSize="0.9rem"
                              showExternalIcon={true}
                            >
                              {link.value}
                            </AnimatedLink>
                          ) : (
                            <AnimatedLink
                              to={link.url}
                              variant="underline"
                              fontSize="0.9rem"
                            >
                              {link.value}
                            </AnimatedLink>
                          )
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ fontSize: '0.9rem' }}
                          >
                            {link.value}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, opacity: 0.2 }} />

          {/* Copyright and Made with */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'space-between' },
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
            >
              © {currentYear} Portfolio. {t('footer.copyright')}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary'
              }}
            >
              <Typography variant="body2">
                {t('footer.madeWith')}
              </Typography>
              <FiHeart
                size={14}
                style={{
                  color: '#ef4444',
                  animation: 'pulse 2s infinite'
                }}
              />
              <Typography variant="body2">
                {t('footer.using')}
              </Typography>
              <SiReact title="React" size={16} style={{ color: '#61dafb' }} />
              <SiMui title="Material UI" size={16} style={{ color: '#007FFF' }} />
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
