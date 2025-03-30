import React, { useState, useEffect, createContext, useContext } from 'react';
import { Box, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import Navbar from '../navigation/Navbar';
import Footer from '../footer/Footer';
import resumeData from '../../data/resumeData.json';
import GlassyBackground from '../ui/backgrounds/GlassyBackground';

interface LayoutProps {
  children: React.ReactNode;
}

// 创建滚动上下文，用于跟踪页面滚动状态
interface ScrollContextType {
  scrollY: number;
  isScrolled: boolean;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0,
  isScrolled: false
});

// 导出滚动上下文的Hook，供其他组件使用
export const useScroll = () => useContext(ScrollContext);

/**
 * 布局组件
 * 负责整合导航栏、页脚和主内容区域
 * 提供全局的滚动状态和安全区域处理
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始调用以设置初始值

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 安全区域的高度 - 根据设备和滚动状态调整
  const safeAreaTopHeight = isMobile
    ? (isScrolled ? 80 : 90)  // 移动端导航栏+边距高度
    : (isScrolled ? 80 : 100); // 桌面端导航栏+边距高度

  return (
    <ScrollContext.Provider value={{ scrollY, isScrolled }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        {/* 全局背景 - 不包裹内容，提高性能 */}
        <GlassyBackground
          fixed={true}
          wrapContent={false}
          zIndex={-5}
          blobs={{
            count: 12,
            minSize: 300,
            maxSize: 800,
            opacity: 0.18,
            colorScheme: 'mixed',
            colorTransition: true,
            speed: 'normal'
          }}
          overlay={{
            opacity: 0.02,
            gradient: true,
            pattern: 'noise'
          }}
          blurStrength={30}
        />

        {/* 导航栏 */}
        <Navbar />

        {/* 安全区域占位符 - 防止内容被导航栏遮挡 */}
        <Box
          sx={{
            height: `${safeAreaTopHeight}px`,
            transition: 'height 0.3s ease',
          }}
        />

        {/* 主内容区域 */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 2,
            transition: 'padding-top 0.3s ease'
          }}
        >
          {children}
        </Box>

        {/* 页脚 */}
        <Footer data={resumeData.basics} />
      </Box>
    </ScrollContext.Provider>
  );
};

export default Layout;
