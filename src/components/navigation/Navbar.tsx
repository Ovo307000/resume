import React, { useState, useEffect } from 'react';
import { Box, useScrollTrigger } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DesktopNavbar from './desktop/DesktopNavbar';
import MobileNavbar from './mobile/MobileNavbar';
import { useNavRoutes, isRouteActive } from './common/routes';

/**
 * 导航栏组件
 * 根据滚动位置自动隐藏/显示，并在滚动一定距离后变为紧凑模式
 */
const Navbar: React.FC = () => {
  const location = useLocation();
  const routes = useNavRoutes();
  const [navbarHeight, setNavbarHeight] = useState(84);

  // 使用改进的滚动钩子，获取滚动状态
  const threshold = 100; // 滚动阈值

  // 滚动检测
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold
  });

  // 判断是否处于紧凑模式（滚动超过阈值）
  const isCompact = trigger;

  // 当滚动状态变化时，更新导航栏高度
  useEffect(() => {
    // 导航栏高度，默认84px，紧凑模式下为64px
    const height = isCompact ? 64 : 84;
    setNavbarHeight(height);
  }, [isCompact]);

  // 检查路由是否活跃
  const checkIsActive = (path: string): boolean => {
    return isRouteActive(location.pathname, path);
  };

  return (
    <>
      {/* 占位盒子，保证内容不被导航栏遮挡 */}
      <Box
        sx={{
          height: `${navbarHeight}px`,
          transition: 'height 0.3s ease'
        }}
      />

      <DesktopNavbar
        routes={routes}
        isActive={checkIsActive}
        isCompact={isCompact}
      />
      <MobileNavbar
        routes={routes}
        isActive={checkIsActive}
        isCompact={isCompact}
      />
    </>
  );
};

export default Navbar;
