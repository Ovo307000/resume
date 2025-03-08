import React, { useState } from 'react';
import { Box, Button, alpha, useTheme as useMuiTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import CustomChip from './CustomChip';

interface AnimatedTagGroupProps {
  tags: string[];
  initialVisibleCount?: number;
  maxHeight?: number | string;
  getTechColor?: (tech: string, index: number) => string | undefined;
  chipProps?: React.ComponentProps<typeof CustomChip>;
}

/**
 * 带动画效果的技术标签组
 * 支持展开和收起动画
 */
const AnimatedTagGroup: React.FC<AnimatedTagGroupProps> = ({
  tags,
  initialVisibleCount = 4,
  maxHeight = 200,
  getTechColor,
  chipProps = {}
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const [expanded, setExpanded] = useState(false);

  // 切换展开/收起状态
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // 显示的标签
  const visibleTags = expanded ? tags : tags.slice(0, initialVisibleCount);

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        staggerChildren: 0.05,
        height: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        height: {
          duration: 0.3,
          ease: "easeIn"
        }
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 1 }}>
        <AnimatePresence>
          {visibleTags.map((tag, index) => (
            <motion.div
              key={tag}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <CustomChip
                label={tag}
                size="small"
                color={getTechColor ? getTechColor(tag, index) : 'primary'}
                variant="filled"
                animate={true}
                {...chipProps}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {tags.length > initialVisibleCount && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            size="small"
            onClick={toggleExpanded}
            endIcon={expanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
            sx={{
              textTransform: 'none',
              fontSize: '0.75rem',
              mt: 1,
              color: theme === 'dark' ? muiTheme.palette.primary.light : muiTheme.palette.primary.main,
              '&:hover': {
                backgroundColor: alpha(muiTheme.palette.primary.main, theme === 'dark' ? 0.15 : 0.08),
              }
            }}
          >
            {expanded
              ? t('common.showLess', '显示更少')
              : t('common.showMore', '显示更多') + ` (${tags.length - initialVisibleCount})`
            }
          </Button>
        </motion.div>
      )}
    </Box>
  );
};

export default AnimatedTagGroup;
