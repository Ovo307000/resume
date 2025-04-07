import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 页面导航时自动滚动到顶部的组件
 * 使用React Router的useLocation钩子监听路由变化
 * 当路由变化时，自动将页面滚动到顶部
 */
const ScrollToTopOnNavigation = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

export default ScrollToTopOnNavigation;
