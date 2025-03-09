import { ReactNode } from 'react';

/**
 * 技能数据接口
 * 用于在不同页面之间共享技能数据结构
 */
export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: ReactNode;
  url?: string;
  value?: number; // 兼容SkillsPage中使用的value属性
}
