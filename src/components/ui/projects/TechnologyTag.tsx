import { useTheme as useMuiTheme } from '@mui/material';
import CustomChip from '../common/CustomChip';
import { useTheme } from '../../../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface TechnologyTagProps {
  name?: string;
  tech?: string; // 添加 tech 属性作为替代
  size?: 'small' | 'medium';
  index?: number; // 添加索引属性，用于设置动画延迟
  darkMode?: boolean; // 添加暗黑模式属性
}

// 使用函数声明而不是箭头函数，有时这可以解决导出问题
export function TechnologyTag({ name, tech, size = 'small', index = 0, darkMode }: TechnologyTagProps) {
  const { theme: contextTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const theme = darkMode !== undefined ? (darkMode ? 'dark' : 'light') : contextTheme;

  // 使用 name 或 tech 属性，优先使用 name
  const technologyName = name || tech || '';

  // 获取技术对应的颜色 (借用 TechTagGroup 中的逻辑)
  const getColorForTechnology = (techName: string): string => {
    if (!techName) return muiTheme.palette.primary.main; // 如果技术名称为空，返回默认颜色

    // 技术名称到颜色的映射
    const techColors: Record<string, string> = {
      // 编程语言
      'Java': '#b07219',
      'JavaScript': '#f1e05a',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'C': '#555555',
      'C++': '#f34b7d',
      'C#': '#178600',
      'Go': '#00ADD8',
      'Rust': '#dea584',

      // 框架
      'React': '#61dafb',
      'React.js': '#61dafb',
      'Vue': '#4FC08D',
      'Vue.js': '#4FC08D',
      'Angular': '#DD0031',
      'Spring': '#6DB33F',
      'Spring Boot': '#6DB33F',
      'Spring MVC': '#6DB33F',
      'Spring JPA': '#6DB33F',
      'TailWind CSS': '#38B2AC',
      'TailwindCSS': '#38B2AC',
      'Tailwind': '#38B2AC',
      'Bootstrap': '#7952B3',

      // 数据库
      'MySQL': '#4479A1',
      'PostgreSQL': '#336791',
      'MongoDB': '#4DB33D',
      'Redis': '#DC382D',
      'SQLite': '#0f80cc',
      'Oracle': '#F80000',

      // 工具与技术
      'Docker': '#2496ED',
      'Kubernetes': '#326CE5',
      'Git': '#F05032',
      'Linux': '#FCC624',
      'Gradle': '#02303A',
      'Maven': '#C71A36',
      'Jenkins': '#D33833',
      'GraphQL': '#E535AB',
      'REST API': '#0096c7',
      'Socket.IO': '#010101',
      'WebSocket': '#4353af',
      'JWT': '#000000',
      'JavaFX': '#5382a1'
    };

    // 尝试匹配技术名称（不区分大小写）
    // 增加空值检查防止 toLowerCase 被调用在 undefined 上
    const key = Object.keys(techColors).find(
      k => k.toLowerCase() === techName.toLowerCase()
    );

    return key ? techColors[key] : muiTheme.palette.primary.main;
  };

  // 获取技术对应的URL
  const getUrlForTechnology = (techName: string): string | undefined => {
    if (!techName) return undefined; // 如果技术名称为空，返回 undefined

    // 技术名称到官方网站URL的映射
    const techUrls: Record<string, string> = {
      // 编程语言
      'Java': 'https://www.java.com/',
      'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      'TypeScript': 'https://www.typescriptlang.org/',
      'Python': 'https://www.python.org/',
      'C': 'https://en.cppreference.com/w/c',
      'C++': 'https://isocpp.org/',
      'C#': 'https://dotnet.microsoft.com/languages/csharp',
      'Go': 'https://golang.org/',
      'Rust': 'https://www.rust-lang.org/',

      // 数据库
      'MySQL': 'https://www.mysql.com/',
      'PostgreSQL': 'https://www.postgresql.org/',
      'MongoDB': 'https://www.mongodb.com/',
      'Redis': 'https://redis.io/',

      // 框架和库
      'React': 'https://reactjs.org/',
      'React.js': 'https://reactjs.org/',
      'Vue': 'https://vuejs.org/',
      'Vue.js': 'https://vuejs.org/',
      'Spring': 'https://spring.io/',
      'Spring Boot': 'https://spring.io/projects/spring-boot',
      'Socket.IO': 'https://socket.io/'
    };

    // 尝试匹配技术名称（不区分大小写）
    // 增加空值检查防止 toLowerCase 被调用在 undefined 上
    const key = Object.keys(techUrls).find(
      k => k.toLowerCase() === techName.toLowerCase()
    );

    return key ? techUrls[key] : undefined;
  };

  const color = getColorForTechnology(technologyName);
  const url = getUrlForTechnology(technologyName);

  // 为标签添加动画效果
  const tagVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.05 // 根据索引设置延迟，实现标签的逐个显示
      }
    },
    hover: {
      y: -4,
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={tagVariants}
    >
      <CustomChip
        label={technologyName}
        size={size}
        color={color}
        variant="filled"
        url={url}
        animate={false} // 我们使用自定义的motion动画，所以关闭CustomChip内部的动画
        interactive={!!url}
        customBgColor={theme === 'dark'
          ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`
          : `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.1)`}
        customTextColor={color}
        customSx={{
          fontSize: size === 'small' ? '0.75rem' : '0.875rem',
          height: size === 'small' ? '24px' : '32px',
          fontWeight: 500,
          borderRadius: '6px', // 减小圆角半径使其更现代
          letterSpacing: '0.4px', // 增加字母间距，提高可读性
          boxShadow: theme === 'dark'
            ? `0 2px 8px rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`
            : `0 2px 8px rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.1)`,
          // 添加边框以增强质感
          border: `1px solid ${theme === 'dark'
            ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.3)`
            : `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`}`,
        }}
      />
    </motion.div>
  );
}

// 同时提供默认导出和命名导出
export default TechnologyTag;
