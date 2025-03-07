import React from 'react';
import { Box, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

/**
 * 现代化Logo组件
 * 使用精美头像作为品牌标识
 */
const Logo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: [0, -5, 5, -5, 0],
          transition: {
            duration: 0.5,
            ease: "easeInOut"
          }
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Box
          sx={{
            width: { xs: '35px', sm: '40px', md: '45px' },
            height: { xs: '35px', sm: '40px', md: '45px' },
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: '50%',
            boxShadow: theme === 'dark'
              ? '0 0 15px rgba(255, 255, 255, 0.15)'
              : '0 0 15px rgba(0, 0, 0, 0.15)',
            border: '2px solid',
            borderColor: theme === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(99, 102, 241, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: theme === 'dark'
                ? '0 0 20px rgba(99, 102, 241, 0.4)'
                : '0 0 20px rgba(99, 102, 241, 0.3)',
              borderColor: 'primary.main',
            }
          }}
        >
          {/* 使用头像图片 */}
          <Avatar
            src="/profile_avatar.png"
            alt="Profile Avatar"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />

          {/* 闪光效果 */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              filter: 'blur(3px)',
              animation: 'shimmer 3s infinite',
              '@keyframes shimmer': {
                '0%': { transform: 'translateX(-100%) rotate(0deg)' },
                '100%': { transform: 'translateX(100%) rotate(0deg)' }
              }
            }}
          />
        </Box>
      </motion.div>
    </Link>
  );
};

export default Logo;
