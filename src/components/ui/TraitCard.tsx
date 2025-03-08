import React from 'react';
import { Box, Typography, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import GlassPanel from './glass/GlassPanel';
import { useTheme } from '../../contexts/ThemeContext';

interface TraitCardProps {
  name: string;
  icon: React.ReactNode;
  index?: number;
}

/**
 * 个人特质卡片组件
 * 展示个人特质和图标
 */
const TraitCard: React.FC<TraitCardProps> = ({
  name,
  icon,
  index = 0
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <GlassPanel
        variant="elevated"
        intensity={index % 2 === 0 ? "light" : "medium"}
        hoverEffect={false}
        sx={{
          p: 2.5,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          height: '100%',
          transition: 'all 0.3s ease',
          boxShadow: theme === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.2)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${muiTheme.palette.primary.light}, ${muiTheme.palette.primary.main})`,
            color: '#fff',
            boxShadow: theme === 'dark'
              ? '0 4px 12px rgba(255, 255, 255, 0.1)'
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="body1"
          fontWeight="medium"
          sx={{
            background: theme === 'dark'
              ? `linear-gradient(90deg, ${muiTheme.palette.primary.light} 0%, #ffffff 100%)`
              : `linear-gradient(90deg, ${muiTheme.palette.primary.dark} 0%, #000000 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {name}
        </Typography>
      </GlassPanel>
    </motion.div>
  );
};

export default TraitCard;
