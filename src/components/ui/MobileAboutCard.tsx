import React from 'react';
import { Box, Typography, Divider, useTheme as useMuiTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import GlassPanel from './glass/GlassPanel';
import { FiUser, FiCode, FiTarget, FiHeart } from 'react-icons/fi';

interface MobileAboutCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

/**
 * 移动端关于我卡片组件
 * 优化移动端显示效果
 */
const MobileAboutCard: React.FC<MobileAboutCardProps> = ({
  title,
  icon,
  children,
  delay = 0
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
    >
      <GlassPanel
        variant="elevated"
        intensity="light"
        sx={{
          p: 2.5,
          borderRadius: '16px',
          mb: 3,
          boxShadow: theme === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: `linear-gradient(to bottom, ${muiTheme.palette.primary.main}, ${alpha(muiTheme.palette.primary.main, 0.4)})`
          }}
        />

        <Typography
          variant="h6"
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 600
          }}
        >
          <Box
            sx={{
              color: muiTheme.palette.primary.main,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {icon}
          </Box>
          {title}
        </Typography>

        <Divider sx={{ mb: 2, opacity: 0.1 }} />

        <Box>{children}</Box>
      </GlassPanel>
    </motion.div>
  );
};

export default MobileAboutCard;
