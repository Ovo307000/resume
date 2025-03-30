import React from 'react';
import { Box, Typography, alpha, useTheme as useMuiTheme, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import TechnologyTag from './projects/TechnologyTag';

interface SkillDetailProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  technologies?: Array<{ name: string }>;
  delay?: number;
}

/**
 * 技能详述组件 - 更新版
 * 使用重构后的 TechnologyTag 组件展示技术
 */
const SkillDetail: React.FC<SkillDetailProps> = ({
  title,
  description,
  icon,
  technologies = [],
  delay = 0
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          borderRadius: '24px',
          background: theme === 'dark'
            ? alpha(muiTheme.palette.background.paper, 0.25)
            : alpha(muiTheme.palette.background.paper, 0.6),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(
            theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.black,
            0.06
          )}`,
          boxShadow: theme === 'dark'
            ? `0 4px 20px ${alpha(muiTheme.palette.common.black, 0.25)}`
            : `0 4px 20px ${alpha(muiTheme.palette.common.black, 0.1)}`
        }}
      >
        {/* 标题 */}
        <motion.div variants={childVariants}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              height: '40px'
            }}
          >
            {icon && (
              <Box
                sx={{
                  mr: 1.5,
                  color: theme === 'dark'
                    ? muiTheme.palette.primary.light
                    : muiTheme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {icon}
              </Box>
            )}
            <Typography variant="h6" fontWeight="bold" noWrap>
              {title}
            </Typography>
          </Box>
        </motion.div>

        {/* 描述 */}
        <motion.div variants={childVariants} style={{ flexGrow: 1 }}>
          <Typography
            variant="body2"
            sx={{
              mb: 3,
              lineHeight: 1.8,
              height: { xs: 'auto', md: '150px' },
              overflow: 'auto',
              color: theme === 'dark'
                ? alpha(muiTheme.palette.common.white, 0.7)
                : alpha(muiTheme.palette.common.black, 0.7),
              '&::-webkit-scrollbar': {
                width: '6px',
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme === 'dark'
                  ? alpha(muiTheme.palette.primary.main, 0.5)
                  : alpha(muiTheme.palette.primary.main, 0.3),
                borderRadius: '6px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: theme === 'dark'
                  ? alpha(muiTheme.palette.primary.main, 0.7)
                  : alpha(muiTheme.palette.primary.main, 0.5)
              }
            }}
          >
            {description}
          </Typography>
        </motion.div>

        {/* 相关技术 - 使用 TechnologyTag */}
        <Box sx={{ mt: 'auto' }}>
          {technologies.length > 0 && (
            <motion.div variants={childVariants}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                相关技术
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.5 }}>
                {technologies.map((tech, index) => (
                  <TechnologyTag
                    key={`${title}-${tech.name}-${index}`}
                    tech={tech.name}
                    size="small"
                    index={index}
                  />
                ))}
              </Stack>
            </motion.div>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default SkillDetail;
