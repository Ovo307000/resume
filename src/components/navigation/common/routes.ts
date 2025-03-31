import { useTranslation } from 'react-i18next';
import { NavRoute } from './types';
import { FiHome, FiUser, FiTool, FiBriefcase, FiBookOpen, FiMail } from 'react-icons/fi'; // 导入图标

/**
 * 获取导航路由配置的Hook
 * 使用i18n来支持多语言导航标签
 */
export const useNavRoutes = (): NavRoute[] => {
  const { t } = useTranslation();

  return [
    { path: '/', label: t('header.home'), color: '#4338CA', icon: <FiHome /> },         // 首页 - 靛蓝色 + 图标
    { path: '/about', label: t('header.about'), color: '#10B981', icon: <FiUser /> },   // 关于 - 翡翠绿 + 图标
    { path: '/skills', label: t('header.skills'), color: '#F59E0B', icon: <FiTool /> }, // 技能 - 琥珀黄 + 图标
    { path: '/projects', label: t('header.projects'), color: '#8B5CF6', icon: <FiBriefcase /> }, // 项目 - 紫罗兰 + 图标
    { path: '/education', label: t('header.education'), color: '#EC4899', icon: <FiBookOpen /> }, // 教育 - 粉红色 + 图标
    { path: '/contact', label: t('header.contact'), color: '#06B6D4', icon: <FiMail /> }, // 联系 - 蓝绿色 + 图标
  ];
};

/**
 * 判断路由是否激活的工具函数
 * @param currentPath 当前路径
 * @param routePath 路由路径
 * @returns 是否激活
 */
export const isRouteActive = (currentPath: string, routePath: string): boolean => {
  // 首页特殊处理
  if (routePath === '/' && currentPath === '/') {
    return true;
  }
  // 其他页面
  return routePath !== '/' && currentPath.startsWith(routePath);
};

/**
 * 获取i18n导航标题
 * 包含菜单和设置等标题
 */
export const getNavTitles = () => {
  const { t } = useTranslation();

  return {
    menu: t('header.menu', 'Menu'),  // 导航菜单标题
    settings: t('header.settings', 'Settings'),  // 设置区域标题
  };
};
