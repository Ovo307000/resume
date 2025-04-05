// import React from 'react';
import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

/**
 * 全局样式组件
 * 定义全局使用的动画和样式
 */
const GlobalStyles = () => {
  return (
    <MuiGlobalStyles
      styles={{
        '@keyframes rgbGlow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      }}
    />
  );
};

export default GlobalStyles;
