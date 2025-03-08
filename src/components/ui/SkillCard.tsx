import React from 'react';
import { Box, Typography, alpha, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import GlassPanel from './glass/GlassPanel';
import { useTheme } from '../../contexts/ThemeContext';

interface SkillCardProps {
  name: string;
  level: number;
  icon?: React.ReactNode;
  category?: string;
  delay?: number;
  index?: number;
}

/**
 * 技能卡片组件
 * 展示技能名称、等级和进度条
 */
const SkillCard: React.FC<SkillCardProps> = ({
  name,
  level,
  icon,
  category,
  delay = 0,
  index = 0
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 定义进度条动画变体
  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${level}%`,
      transition: {
        duration: 1.2,
        delay: delay,
        ease: [0.165, 0.84, 0.44, 1]
      }
    }
  };

  return (
    <GlassPanel
      variant="elevated"
      intensity={index % 2 === 0 ? "light" : "medium"}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 技能类别标记 */}
      {category && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            py: 0.5,
            px: 1.5,
            backgroundColor: theme === 'dark'
              ? alpha(muiTheme.palette.primary.main, 0.2)
              : alpha(muiTheme.palette.primary.main, 0.1),
            borderBottomLeftRadius: '8px',
            fontSize: '0.7rem',
            color: theme === 'dark'
              ? muiTheme.palette.primary.light
              : muiTheme.palette.primary.main,
            fontWeight: 500
          }}
        >
          {category}
        </Box>
      )}

      {/* 技能名称和等级 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1
        }}
      >
        <Typography
          variant="body1"
          fontWeight="medium"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {icon && (
            <Box
              sx={{
                color: theme === 'dark'
                  ? muiTheme.palette.primary.light
                  : muiTheme.palette.primary.main
              }}
            >
              {icon}
            </Box>
          )}
          {name}
        </Typography>
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{
            color: theme === 'dark'
              ? muiTheme.palette.primary.light
              : muiTheme.palette.primary.main
          }}
        >
          {level}%
        </Typography>
      </Box>

      {/* 技能进度条背景 */}
      <Box
        sx={{
          height: 10,
          backgroundColor: theme === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.05)',
          borderRadius: 5,
          overflow: 'hidden',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            background: theme === 'dark'
              ? 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 100%)'
              : 'linear-gradient(90deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.03) 100%)',
            pointerEvents: 'none'
          }
        }}
      >
        {/* 技能进度条 */}
        <motion.div
          variants={progressVariants}
          initial="hidden"
          animate="visible"
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.primary.light} 100%)`,
            borderRadius: 5,
            boxShadow: theme === 'dark'
              ? '0 0 8px rgba(255, 255, 255, 0.3)'
              : '0 0 8px rgba(0, 0, 0, 0.1)'
          }}
        />
      </Box>
    </GlassPanel>
  );
};

export default SkillCard;
