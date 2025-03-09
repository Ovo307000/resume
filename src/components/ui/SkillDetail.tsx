import React from 'react';
import { Box, Typography, alpha, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import TechTagGroup from './common/TechTagGroup';

interface SkillDetailProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  technologies?: Array<{
    name: string;
    icon?: React.ReactNode;
    url?: string;
  }>;
  delay?: number;
}

/**
 * 技能详述组件
 * 用于展示技能类别的详细描述和相关技术
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
          </Box>
        </motion.div>

        {/* 描述 */}
        <motion.div variants={childVariants}>
          <Typography
            variant="body2"
            sx={{
              mb: 3,
              lineHeight: 1.8,
              color: theme === 'dark'
                ? alpha(muiTheme.palette.common.white, 0.7)
                : alpha(muiTheme.palette.common.black, 0.7)
            }}
          >
            {description}
          </Typography>
        </motion.div>

        {/* 相关技术 */}
        {technologies.length > 0 && (
          <TechTagGroup
            title="相关技术"
            techItems={technologies}
            initiallyExpanded={false}
            showToggle={true}
            variant="small"
            collapsible={technologies.length > 6}
            maxVisibleItems={6}
            animate={true}
          />
        )}
      </Box>
    </motion.div>
  );
};

export default SkillDetail;
