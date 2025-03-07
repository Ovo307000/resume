import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

/**
 * 主题切换按钮组件
 * 允许用户在暗黑模式和明亮模式之间切换
 */
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tooltip
      title={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
      arrow
    >
      <IconButton
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
        sx={{
          color: theme === 'dark' ? 'white' : 'primary.main',
          transition: 'all 0.3s ease'
        }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {theme === 'dark' ? (
            <FiMoon size={20} />
          ) : (
            <FiSun size={20} />
          )}
        </motion.div>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
