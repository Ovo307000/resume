import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, Stack, Divider, alpha } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiGithub,
  FiMail,
  FiPhone,
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiBook,
  FiMessageCircle,
  FiCopy,
  FiExternalLink,
} from 'react-icons/fi';
import { SiWechat, SiReact, SiMui } from 'react-icons/si';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
// 导入全局复制通知Hook
import { useCopyNotification } from '../../contexts/CopyNotificationContext';
// 暂时注释掉未使用的组件
// import CopyableLink from '../ui/common/CopyableLink';
// import { useNotificationsContext } from '../ui/common/NotificationsProvider';

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
const Footer = ({ data = {} }: FooterProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  // 使用全局复制通知
  const { copyToClipboard } = useCopyNotification();
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
      value: data.email,
      copyIcon: <FiCopy size={14} />,
      needCopy: true
    },
    {
      name: t('footer.contactPhone'),
      icon: <FiPhone size={18} color="#34a853" />,
      value: data.phone,
      copyIcon: <FiCopy size={14} />,
      needCopy: true
    },
    {
      name: 'GitHub',
      icon: <FiGithub size={18} color={theme === 'dark' ? '#fff' : '#333'} />,
      url: data.github?.startsWith('http') ? data.github : githubUsername ? `https://github.com/${githubUsername}` : undefined,
      value: githubUsername || data.github,
      needCopy: false
    },
    {
      name: 'WeChat',
      icon: <SiWechat size={18} color="#07C160" />,
      value: data.wechat,
      copyIcon: <FiCopy size={14} />,
      needCopy: true
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
                {contactLinks.map((link) => (
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

                        {link.needCopy ? (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontSize: '0.9rem',
                              fontWeight: 500,
                              position: 'relative',
                              display: 'inline-block',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              p: '2px 0',
                              '&:hover': {
                                color: 'primary.main',
                              },
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '1.5px',
                                background: theme === 'dark'
                                  ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.6) 50%, rgba(99, 102, 241, 0.2) 100%)'
                                  : 'linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.4) 50%, rgba(99, 102, 241, 0.1) 100%)',
                                transform: 'scaleX(0)',
                                transformOrigin: 'right',
                                transition: 'transform 0.4s cubic-bezier(0.45, 0.05, 0.55, 0.95)',
                                boxShadow: theme === 'dark'
                                  ? '0 0 8px rgba(99, 102, 241, 0.3)'
                                  : '0 0 5px rgba(99, 102, 241, 0.2)',
                                borderRadius: '1px'
                              },
                              '&:hover::after': {
                                transform: 'scaleX(1)',
                                transformOrigin: 'left'
                              }
                            }}
                            onClick={() => {
                              // 使用全局复制通知
                              if (link.value) {
                                copyToClipboard(link.value, link.name);
                              }
                            }}
                          >
                            {link.value}
                            <Box
                              component="span"
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                ml: 0.5,
                                opacity: 0,
                                transform: 'translateX(-5px)',
                                transition: 'opacity 0.3s ease, transform 0.3s ease',
                                '.MuiTypography-root:hover &': {
                                  opacity: 0.7,
                                  transform: 'translateX(0)'
                                }
                              }}
                            >
                              {link.copyIcon}
                            </Box>
                          </Typography>
                        ) : (
                          <Typography
                            variant="body2"
                            component={Link}
                            to={link.url || '#'}
                            target={link.url?.startsWith('http') ? "_blank" : undefined}
                            rel={link.url?.startsWith('http') ? "noopener noreferrer" : undefined}
                            color="text.secondary"
                            sx={{
                              fontSize: '0.9rem',
                              fontWeight: 500,
                              textDecoration: 'none',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              display: 'inline-block',
                              p: '2px 0',
                              '&:hover': {
                                color: 'primary.main',
                              },
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '1.5px',
                                background: theme === 'dark'
                                  ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.6) 50%, rgba(99, 102, 241, 0.2) 100%)'
                                  : 'linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.4) 50%, rgba(99, 102, 241, 0.1) 100%)',
                                transform: 'scaleX(0)',
                                transformOrigin: 'right',
                                transition: 'transform 0.4s cubic-bezier(0.45, 0.05, 0.55, 0.95)',
                                boxShadow: theme === 'dark'
                                  ? '0 0 8px rgba(99, 102, 241, 0.3)'
                                  : '0 0 5px rgba(99, 102, 241, 0.2)',
                                borderRadius: '1px'
                              },
                              '&:hover::after': {
                                transform: 'scaleX(1)',
                                transformOrigin: 'left'
                              }
                            }}
                          >
                            {link.value}
                            <Box
                              component="span"
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                ml: 0.5,
                                opacity: 0,
                                transform: 'translateX(-5px)',
                                transition: 'opacity 0.3s ease, transform 0.3s ease',
                                '.MuiTypography-root:hover &': {
                                  opacity: 0.7,
                                  transform: 'translateX(0)'
                                }
                              }}
                            >
                              <FiExternalLink size={12} />
                            </Box>
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

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', sm: 'flex-start' },
              textAlign: { xs: 'center', sm: 'left' },
              pt: 1,
              mt: 2
            }}
          >
            {/* Copyright */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                mb: { xs: 2, sm: 0 },
                gap: { xs: 1, sm: 0.5 }
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.8rem' }}
              >
                © {currentYear} Portfolio. {t('footer.copyright')}
              </Typography>
            </Box>

            {/* Tech stack */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.8rem' }}
              >
                {t('footer.madeWith')}
              </Typography>
              <IconButton
                component="a"
                href="https://react.dev/"
                target="_blank"
                size="small"
                sx={{ color: '#61DAFB' }}
                aria-label="React"
              >
                <SiReact size={14} />
              </IconButton>
              <IconButton
                component="a"
                href="https://mui.com/"
                target="_blank"
                size="small"
                sx={{ color: '#007FFF' }}
                aria-label="Material UI"
              >
                <SiMui size={14} />
              </IconButton>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
