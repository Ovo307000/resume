import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DesktopNavbar from './desktop/DesktopNavbar';
import MobileNavbar from './mobile/MobileNavbar';
import { useNavRoutes, isRouteActive } from './common/routes';
import { useScrollDetection } from './common/utils';

/**
 * 导航栏主组件
 * 负责整合桌面端和移动端导航
 */
const Navbar: React.FC = () => {
  const location = useLocation();
  const routes = useNavRoutes();
  const scrolled = useScrollDetection();
  const [navbarHeight, setNavbarHeight] = useState(scrolled ? 64 : 120);

  // 监听滚动状态变化并更新导航栏高度
  useEffect(() => {
    setNavbarHeight(scrolled ? 64 : 120);
  }, [scrolled]);

  // 判断当前路由是否激活
  const checkIsActive = (path: string): boolean => {
    return isRouteActive(location.pathname, path);
  };

  return (
    <>
      {/* 桌面端导航栏 */}
      <DesktopNavbar
        routes={routes}
        isActive={checkIsActive}
      />

      {/* 移动端导航栏 */}
      <MobileNavbar
        routes={routes}
        isActive={checkIsActive}
      />

      {/* 占位符，避免内容被导航栏覆盖 */}
      <Box sx={{
        height: navbarHeight,
        transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }} />
    </>
  );
};

export default Navbar;
