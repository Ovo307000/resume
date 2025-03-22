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
      // 首先强制禁用默认滚动条
      '*': {
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none', /* IE and Edge */
        '&::-webkit-scrollbar': {
          display: 'none' /* Hide default scrollbar for Chrome, Safari, and Opera */
        }
      },

      // 自定义全局滚动条 (WebKit 浏览器)
      '*::-webkit-scrollbar': {
        width: `${thickness}px`,
        height: `${thickness}px`,
        display: 'block !important', // 覆盖上面的none
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
      'html, body, div': {
        scrollbarWidth: 'thin', /* Firefox */
        scrollbarColor: `${alpha(primaryColor, 0.7)} ${trackBg}`, /* Firefox */
      }
    };
  };

  return <GlobalStyles styles={getScrollbarStyles()} />;
};

export default CustomScrollbar;
