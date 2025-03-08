import React from 'react';
import { Box, IconButton, Tooltip, SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

interface SocialLinkProps {
  url: string;
  icon: React.ReactNode;
  label: string;
}

interface SocialLinksProps {
  sx?: SxProps<Theme>;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ sx }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const socialLinks: SocialLinkProps[] = [
    {
      icon: <FiGithub size={20} />,
      url: 'https://github.com/username',
      label: t('common.social.github')
    },
    {
      icon: <FiLinkedin size={20} />,
      url: 'https://linkedin.com/in/username',
      label: t('common.social.linkedin')
    },
    {
      icon: <FiTwitter size={20} />,
      url: 'https://twitter.com/username',
      label: t('common.social.twitter')
    },
    {
      icon: <FiMail size={20} />,
      url: 'mailto:email@example.com',
      label: t('common.social.email')
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        display: 'flex',
        gap: 1.5,
        ...sx
      }}
    >
      {socialLinks.map((link, index) => (
        <Tooltip key={index} title={link.label} placement="top" arrow>
          <Box
            component={motion.div}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              component="a"
              href={link.url}
              target={link.url.startsWith('http') ? "_blank" : undefined}
              rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
              sx={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                backgroundColor: theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.05)',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: theme === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                  color: theme === 'dark' ? '#a0a0ff' : '#5050ff'
                },
                transition: 'all 0.2s ease'
              }}
            >
              {link.icon}
            </IconButton>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default SocialLinks;
