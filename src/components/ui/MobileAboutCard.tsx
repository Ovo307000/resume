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
  isPc?: boolean;
  noBorder?: boolean;
  variant?: 'default' | 'elevated' | 'subtle';
}

/**
 * 通用卡片组件，既适用于移动端也适用于PC端
 * 优化显示效果和动画表现
 */
const MobileAboutCard: React.FC<MobileAboutCardProps> = ({
  title,
  icon,
  children,
  delay = 0,
  isPc = false,
  noBorder = false,
  variant = 'default'
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  const getVariantStyles = () => {
    switch(variant) {
      case 'elevated':
        return {
          boxShadow: theme === 'dark'
            ? '0 10px 40px rgba(0, 0, 0, 0.4)'
            : '0 10px 40px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-4px)'
        };
      case 'subtle':
        return {
          boxShadow: 'none',
          background: alpha(
            theme === 'dark' ? muiTheme.palette.background.paper : muiTheme.palette.background.paper,
            theme === 'dark' ? 0.15 : 0.3
          )
        };
      default:
        return {
          boxShadow: theme === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.08)'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: isPc ? Math.min(delay, 0.1) : delay,
        type: 'spring',
        stiffness: 120,
        damping: 16
      }}
    >
      <GlassPanel
        variant="elevated"
        intensity="light"
        sx={{
          p: isPc ? 3 : 2.5,
          borderRadius: '16px',
          mb: 3,
          ...getVariantStyles(),
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {!noBorder && (
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
        )}

        <Typography
          variant={isPc ? "h6" : "subtitle1"}
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
