import React from 'react';
import { Box } from '@mui/material';
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Box
            sx={{
              width: '40px',
              height: '40px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: theme === 'dark'
                ? '0 0 15px rgba(255, 255, 255, 0.1)'
                : '0 0 15px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(135deg, #4338CA, #6366F1)',
            }}
          >
            {/* 使用头像图片 */}
            <Box
              component="img"
              src="/profile_avatar.png"
              alt="Profile Avatar"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top'
              }}
            />

            {/* 闪光效果 */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                animation: 'shimmer 2s infinite',
                '@keyframes shimmer': {
                  '0%': { transform: 'translateX(-100%)' },
                  '100%': { transform: 'translateX(100%)' }
                }
              }}
            />
          </Box>
        </motion.div>

        {/* 版本指示器 - 小点 */}
        <Box
          sx={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #EF4444, #F87171)',
            marginLeft: '-5px',
            marginTop: '-25px',
            boxShadow: '0 0 5px rgba(239, 68, 68, 0.5)',
          }}
        />
      </Box>
    </Link>
  );
};

export default Logo;
