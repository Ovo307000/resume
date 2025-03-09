import React, { useEffect } from 'react';
import { Box, Typography, alpha, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import EnhancedSkillBar from '../progress/EnhancedSkillBar';

interface SkillItemProps {
  name: string;
  value: number;
  icon?: React.ReactNode;
  url?: string;
  index?: number;
  animated?: boolean;
  delay?: number;
  variant?: 'gradient' | 'solid' | 'glass';
  height?: number;
  glowEffect?: boolean;
  borderRadius?: number | string;
  clickable?: boolean;
  showPercentage?: boolean;
  showTitle?: boolean;
  containerStyle?: React.CSSProperties;
}

/**
 * 可复用的技能条组件
 * 包含技能名称、图标和进度条
 * 用于在不同页面展示技能熟练度
 */
const SkillItem: React.FC<SkillItemProps> = ({
  name,
  value,
  icon,
  url,
  index = 0,
  animated = true,
  delay,
  variant = 'glass',
  height = 12,
  glowEffect = true,
  borderRadius = 10,
  clickable,
  showPercentage = true,
  showTitle = true,
  containerStyle
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const finalDelay = delay ?? (0.1 + index * 0.1);

  // 确保组件挂载后显示技能值
  useEffect(() => {
    // 这个空的useEffect确保组件正确渲染
  }, []);

  return (
    <Box
      sx={{
        mb: 3,
        background: alpha(
          theme === 'dark' ? muiTheme.palette.background.paper : muiTheme.palette.background.paper,
          theme === 'dark' ? 0.2 : 0.4
        ),
        backdropFilter: 'blur(10px)',
        borderRadius: borderRadius,
        p: 2,
        boxShadow: `0 4px 12px ${alpha(
          muiTheme.palette.common.black,
          theme === 'dark' ? 0.2 : 0.08
        )}`,
        border: `1px solid ${alpha(
          theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.black,
          0.06
        )}`,
        ...containerStyle
      }}
    >
      {showTitle && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          {icon && (
            <Box
              component="span"
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {icon}
            </Box>
          )}
          <Typography
            variant="body1"
            fontWeight="500"
          >
            {name}
          </Typography>
        </Box>
      )}

      <EnhancedSkillBar
        value={value}
        label={showTitle ? "" : name} // 如果上方不显示标题，则在进度条中显示
        animated={animated}
        glowEffect={glowEffect}
        variant={variant}
        delay={finalDelay}
        url={url}
        showPercentage={showPercentage}
        height={height}
        borderRadius={borderRadius}
        clickable={clickable}
        icon={!showTitle ? icon : undefined} // 如果不显示标题区域，则在进度条中显示图标
      />
    </Box>
  );
};

export default SkillItem;
