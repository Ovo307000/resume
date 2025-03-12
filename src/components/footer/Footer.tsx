import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider as MuiDivider,
  alpha
} from '@mui/material';
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
import CopyableLink from '../ui/common/CopyableLink';
// 暂时注释掉未使用的组件
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

// 联系方式链接类型
interface ContactLink {
  name: string;
  icon: React.ReactNode;
  value?: string;
  url?: string;
  needCopy: boolean;
  copyIcon?: React.ReactNode;
  color?: string;
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
  const contactLinks: ContactLink[] = [
    {
      name: t('footer.contactEmail'),
      icon: <FiMail size={18} color="#ea4335" />,
      value: data.email,
      copyIcon: <FiCopy size={14} />,
      needCopy: true,
      color: '#ea4335'
    },
    {
      name: t('footer.contactPhone'),
      icon: <FiPhone size={18} color="#34a853" />,
      value: data.phone,
      copyIcon: <FiCopy size={14} />,
      needCopy: true,
      color: '#34a853'
    },
    {
      name: 'GitHub',
      icon: <FiGithub size={18} color={theme === 'dark' ? '#fff' : '#333'} />,
      url: data.github?.startsWith('http') ? data.github : githubUsername ? `https://github.com/${githubUsername}` : undefined,
      value: githubUsername || data.github,
      needCopy: false,
      color: theme === 'dark' ? '#fff' : '#333'
    },
    {
      name: 'WeChat',
      icon: <SiWechat size={18} color="#07C160" />,
      value: data.wechat,
      copyIcon: <FiCopy size={14} />,
      needCopy: true,
      color: '#07C160'
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

  // 联系方式链接悬停动画
  const contactLinkHoverVariants = {
    hover: {
      x: 5,
      transition: { type: 'spring', stiffness: 400 }
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
                    <motion.div
                      variants={contactLinkHoverVariants}
                      whileHover="hover"
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 1.5,
                          borderRadius: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                            color: link.color || (theme === 'dark' ? '#6366F1' : '#4F46E5'),
                            mr: 2,
                            flexShrink: 0
                          }}
                        >
                          {link.icon}
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: '0.8rem', mb: 0.3 }}
                          >
                            {link.name}
                          </Typography>

                          {link.needCopy ? (
                            <CopyableLink
                              value={link.value || ''}
                              label={link.name}
                              copyIcon={link.copyIcon || <FiCopy size={14} />}
                              linkColor={link.color || (theme === 'dark' ? '#6366F1' : '#4F46E5')}
                              onCopy={(text, label) => copyToClipboard(text, label)}
                            />
                          ) : (
                            <CopyableLink
                              value={link.value || ''}
                              to={link.url || '#'}
                              isExternal={link.url?.startsWith('http')}
                              externalIcon={<FiExternalLink size={14} />}
                              linkColor={link.color || (theme === 'dark' ? '#6366F1' : '#4F46E5')}
                            />
                          )}
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <MuiDivider sx={{ my: 3, opacity: 0.2 }} />

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
