import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../navigation/Navbar';
import Footer from '../footer/Footer';
import resumeData from '../../data/resumeData.json';
import GlassyBackground from '../ui/backgrounds/GlassyBackground';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * 布局组件
 * 负责整合导航栏、页脚和主内容区域
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
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

      {/* 主内容区域 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 2,
          pt: { xs: '70px', md: 0 },
          transition: 'padding-top 0.3s ease'
        }}
      >
        {children}
      </Box>

      {/* 页脚 */}
      <Footer data={resumeData.basics} />
    </Box>
  );
};

export default Layout;
