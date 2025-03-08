import { alpha } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';

interface CustomScrollbarProps {
  primaryColor?: string;
  thickness?: number;
  borderRadius?: number;
  trackOpacity?: number;
  trackBorderRadius?: number;
}

/**
 * 自定义滚动条组件
 * 与毛玻璃和渐变主题相匹配的全局滚动条样式
 */
const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  primaryColor = '#6366F1',
  thickness = 8,
  borderRadius = 4,
  trackOpacity = 0.05,
  trackBorderRadius = 0
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 获取滚动条样式
  const getScrollbarStyles = () => {
    // 滚动条轨道背景颜色
    const trackBg = isDark
      ? alpha('#ffffff', trackOpacity)
      : alpha('#000000', trackOpacity);

    // 滚动条滑块渐变
    const thumbGradient = isDark
      ? `linear-gradient(to bottom, ${alpha(primaryColor, 0.8)}, ${alpha(primaryColor, 0.6)})`
      : `linear-gradient(to bottom, ${alpha(primaryColor, 0.7)}, ${alpha(primaryColor, 0.5)})`;

    // 滚动条滑块悬停时渐变
    const thumbHoverGradient = isDark
      ? `linear-gradient(to bottom, ${alpha(primaryColor, 0.9)}, ${alpha(primaryColor, 0.7)})`
      : `linear-gradient(to bottom, ${alpha(primaryColor, 0.8)}, ${alpha(primaryColor, 0.6)})`;

    // 滚动条边框
    const thumbBorder = isDark
      ? `1px solid ${alpha(primaryColor, 0.2)}`
      : `1px solid ${alpha(primaryColor, 0.3)}`;

    return {
      // 整体滚动条样式 (WebKit 浏览器)
      '*::-webkit-scrollbar': {
        width: `${thickness}px`,
        height: `${thickness}px`,
      },

      // 滚动条轨道 (WebKit 浏览器)
      '*::-webkit-scrollbar-track': {
        background: trackBg,
        borderRadius: `${trackBorderRadius}px`,
      },

      // 滚动条滑块 (WebKit 浏览器)
      '*::-webkit-scrollbar-thumb': {
        background: thumbGradient,
        borderRadius: `${borderRadius}px`,
        border: thumbBorder,
        boxShadow: isDark ? `0 0 3px ${alpha(primaryColor, 0.3)}` : 'none',
      },

      // 滚动条滑块悬停样式 (WebKit 浏览器)
      '*::-webkit-scrollbar-thumb:hover': {
        background: thumbHoverGradient,
      },

      // 滚动条角落 (WebKit 浏览器)
      '*::-webkit-scrollbar-corner': {
        background: 'transparent',
      },

      // Firefox 滚动条样式
      'html': {
        scrollbarColor: `${alpha(primaryColor, 0.7)} ${trackBg}`,
        scrollbarWidth: thickness <= 4 ? 'thin' : 'auto',
      }
    };
  };

  return <GlobalStyles styles={getScrollbarStyles()} />;
};

export default CustomScrollbar;
