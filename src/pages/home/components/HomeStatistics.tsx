import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import GlassPanel from '../../../components/ui/glass/GlassPanel';
import { FiCode, FiCoffee, FiStar, FiUsers } from 'react-icons/fi';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  delay?: number;
  suffix?: string;
  prefix?: string;
}

/**
 * 主页统计项组件
 */
const StatItem: React.FC<StatItemProps> = ({ icon, value, label, delay = 0, suffix = '', prefix = '' }) => {
  const { theme } = useTheme();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // 简单的延迟显示效果
    const timeout = setTimeout(() => {
      setIsInView(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + delay }}
    >
      <GlassPanel sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme === 'dark'
            ? '0 10px 30px rgba(0, 0, 0, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.1)',
        },
        transition: 'all 0.3s ease'
      }}>
        <Box
          sx={{
            color: theme === 'dark' ? '#a0a0ff' : '#5050ff',
            mb: 2,
            fontSize: { xs: 36, md: 40 }
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            fontWeight: 700,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {prefix}
          <CountUp
            start={0}
            end={isInView ? value : 0}
            duration={2.5}
            separator=","
            delay={0.2}
          />
          {suffix}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            fontWeight: 500
          }}
        >
          {label}
        </Typography>
      </GlassPanel>
    </motion.div>
  );
};

/**
 * 主页统计数据组件
 */
const HomeStatistics: React.FC = () => {
  const { t } = useTranslation();

  // 硬编码的统计数据，实际项目中可以从API获取
  const stats = [
    {
      icon: <FiCode />,
      value: 50000,
      label: t('home.stats.code_lines'),
      suffix: '+'
    },
    {
      icon: <FiStar />,
      value: 42,
      label: t('home.stats.projects_completed')
    },
    {
      icon: <FiUsers />,
      value: 37,
      label: t('home.stats.happy_clients')
    },
    {
      icon: <FiCoffee />,
      value: 928,
      label: t('home.stats.coffee_cups'),
    }
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={6} md={3} key={index}>
          <StatItem
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            delay={index * 0.1}
            suffix={stat.suffix}
            prefix={stat.prefix}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeStatistics;
