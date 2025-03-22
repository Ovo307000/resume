import React from 'react';
import { useScrollTrigger, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DesktopNavbar from './desktop/DesktopNavbar';
import MobileNavbar from './mobile/MobileNavbar';
import { useNavRoutes, isRouteActive } from './common/routes';

/**
 * 导航栏组件
 * 根据滚动位置自动调整紧凑模式，使用sticky定位确保始终置顶
 * 根据屏幕尺寸自动切换桌面版或移动版导航栏
 * 移动版导航栏使用侧边抽屉展示导航项，提高空间利用率
 */
const Navbar: React.FC = () => {
  const location = useLocation();
  const routes = useNavRoutes();
  const muiTheme = useMuiTheme();

  // 使用媒体查询判断是否为移动设备
  // 这里确保在中等尺寸屏幕以下显示移动导航栏
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // 使用改进的滚动钩子，获取滚动状态
  const threshold = 100; // 滚动阈值

  // 滚动检测
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold
  });

  // 判断是否处于紧凑模式（滚动超过阈值）
  const isCompact = trigger;

  // 检查路由是否活跃
  const checkIsActive = (path: string): boolean => {
    const isActive = isRouteActive(location.pathname, path);
    return isActive;
  };

  return (
    <>
      {/* 直接渲染导航栏，不需要占位盒子，sticky定位会自动处理 */}
      {isMobile ? (
        <MobileNavbar
          routes={routes}
          showLanguageSelector={true}
          isActive={checkIsActive}
        />
      ) : (
        <DesktopNavbar
          routes={routes}
          isActive={checkIsActive}
          isCompact={isCompact}
        />
      )}
    </>
  );
};

export default Navbar;
