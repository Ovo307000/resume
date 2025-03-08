/**
 * 定义导航组件所需的类型
 */

/**
 * 导航路由项接口
 */
export interface NavRoute {
  path: string;  // 路由路径
  label: string; // 显示的标签文本
  icon?: React.ReactNode; // 可选的图标
  color?: string;     // 导航项的颜色
}

/**
 * 导航链接属性接口
 */
export interface NavLinkProps {
  route: NavRoute;
  active: boolean;
  onClick?: () => void;
  index?: number;       // 添加索引属性
  activeIndex?: number; // 添加活跃索引属性
}

/**
 * 导航栏属性接口
 */
export interface NavbarProps {
  routes: NavRoute[];
  isActive: (path: string) => boolean;
}

/**
 * 移动导航栏属性接口
 */
export interface MobileNavProps extends NavbarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  showLanguageSelector?: boolean;
}
