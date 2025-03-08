import React from 'react';
import { Box, Typography, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  gradient?: boolean;
  marginBottom?: number;
  titleVariant?: 'h2' | 'h3' | 'h4' | 'h5';
}

/**
 * 区域标题组件
 * 用于显示带有标题和可选副标题的区域头部
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  gradient = false,
  marginBottom = 4,
  titleVariant = 'h2'
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 获取渐变色样式
  const getGradientStyles = () => {
    if (!gradient) return {};

    return {
      background: 'linear-gradient(135deg, #4338CA, #6366F1, #818CF8)',
      backgroundSize: '300% 300%',
      animation: 'gradient 8s ease infinite',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: theme === 'dark'
        ? '0px 2px 8px rgba(99, 102, 241, 0.3)'
        : 'none',
      '@keyframes gradient': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' }
      }
    };
  };

  return (
    <Box
      sx={{
        textAlign: align,
        mb: marginBottom,
        width: '100%',
        position: 'relative'
      }}
    >
      <Typography
        variant={titleVariant}
        component="h2"
        fontWeight="bold"
        gutterBottom
        sx={{
          mb: subtitle ? 1 : 0,
          position: 'relative',
          display: 'inline-block',
          ...getGradientStyles(),
          '&::after': !gradient ? {
            content: '""',
            position: 'absolute',
            width: '60px',
            height: '4px',
            borderRadius: '2px',
            backgroundColor: muiTheme.palette.primary.main,
            bottom: '-8px',
            left: align === 'center' ? '50%' : 0,
            transform: align === 'center' ? 'translateX(-50%)' : 'none',
          } : {}
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            maxWidth: '700px',
            mx: align === 'center' ? 'auto' : 0,
            mt: 1
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;
