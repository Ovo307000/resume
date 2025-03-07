import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import BackToTopButton from '../ui/navigation/BackToTopButton';
import Navbar from '../navigation/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

interface ColorBlob {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const [blobs, setBlobs] = useState<ColorBlob[]>([]);

  // 生成随机彩色块
  useEffect(() => {
    const colors = [
      'rgba(99, 102, 241, 0.15)', // 紫色
      'rgba(79, 70, 229, 0.15)',  // 深蓝
      'rgba(16, 185, 129, 0.15)', // 绿色
      'rgba(239, 68, 68, 0.15)',  // 红色
      'rgba(245, 158, 11, 0.15)', // 橙色
      'rgba(6, 182, 212, 0.15)',  // 青色
    ];

    const generateBlobs = () => {
      const newBlobs: ColorBlob[] = [];
      const numBlobs = 6;

      for (let i = 0; i < numBlobs; i++) {
        newBlobs.push({
          id: i,
          x: Math.random() * 100, // 随机位置 (0-100%)
          y: Math.random() * 100,
          size: Math.random() * 300 + 200, // 大小在200-500px之间
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 60 + 60 // 动画时长60-120秒
        });
      }

      setBlobs(newBlobs);
    };

    generateBlobs();

    // 每隔一段时间重新生成彩色块，保持动画新鲜感
    const interval = setInterval(() => {
      const updatedBlobs = [...blobs];
      const randomIndex = Math.floor(Math.random() * blobs.length);

      updatedBlobs[randomIndex] = {
        ...updatedBlobs[randomIndex],
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 60 + 60
      };

      setBlobs(updatedBlobs);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 动态背景 */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -2,
        bgcolor: theme === 'dark' ? '#101418' : '#f9fafb'
      }}>
        {blobs.map((blob) => (
          <motion.div
            key={blob.id}
            initial={{ x: `${blob.x}%`, y: `${blob.y}%` }}
            animate={{
              x: [`${blob.x}%`, `${(blob.x + 30) % 100}%`, `${(blob.x + 50) % 100}%`, `${blob.x}%`],
              y: [`${blob.y}%`, `${(blob.y + 20) % 100}%`, `${(blob.y + 40) % 100}%`, `${blob.y}%`]
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              width: blob.size,
              height: blob.size,
              borderRadius: '50%',
              background: blob.color,
              filter: 'blur(60px)',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </Box>

      {/* 内容玻璃层 */}
      <Box sx={{
        position: 'relative',
        zIndex: 0,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(100px)',
        backgroundColor: 'transparent'
      }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>

      {/* 回到顶部按钮 */}
      <BackToTopButton
        threshold={300}
        position={{ bottom: 30, right: 30 }}
        size="medium"
      />
    </Box>
  );
};

export default Layout;
