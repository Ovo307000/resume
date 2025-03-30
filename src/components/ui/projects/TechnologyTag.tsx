import React from 'react';
import { Box, Typography, useTheme as useMuiTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { DiJava, DiJavascript1, DiPython, DiMysql, DiPostgresql, DiMongodb, DiReact, DiDocker, DiGit, DiRedis } from 'react-icons/di';
import { SiTypescript, SiSpring, SiVuedotjs, SiTailwindcss, SiGradle, SiLinux, SiC, SiCplusplus, SiGo, SiRust, SiSharp } from 'react-icons/si';
import { FiCode, FiSettings, FiServer } from 'react-icons/fi';

interface TechnologyTagProps {
  name?: string;
  tech?: string; // 保持兼容性
  icon?: React.ReactNode; // 允许直接传入图标
  url?: string; // 允许直接传入URL
  size?: 'small' | 'medium';
  index?: number; // 用于动画延迟
  darkMode?: boolean; // 允许覆盖主题
}

// 统一的获取图标函数
const getTechnologyIcon = (name: string): React.ReactNode => {
  const iconSize = 14; // 统一图标大小
  const iconMap: Record<string, React.ReactNode> = {
    'JAVA': <DiJava size={iconSize} />, // 大小写都覆盖
    'Java': <DiJava size={iconSize} />,
    'JavaScript': <DiJavascript1 size={iconSize} />,
    'TypeScript': <SiTypescript size={iconSize} />,
    'Python': <DiPython size={iconSize} />,
    'C': <SiC size={iconSize} />,
    'C++': <SiCplusplus size={iconSize} />,
    'C#': <SiSharp size={iconSize} />,
    'Go': <SiGo size={iconSize} />,
    'Rust': <SiRust size={iconSize} />,
    'Spring': <SiSpring size={iconSize} />,
    'Spring Boot': <SiSpring size={iconSize} />,
    'Spring MVC': <SiSpring size={iconSize} />,
    'Spring JPA': <SiSpring size={iconSize} />,
    'React.js': <DiReact size={iconSize} />,
    'React': <DiReact size={iconSize} />,
    'Vue.js': <SiVuedotjs size={iconSize} />,
    'Vue': <SiVuedotjs size={iconSize} />,
    'TailWind CSS': <SiTailwindcss size={iconSize} />,
    'TailwindCSS': <SiTailwindcss size={iconSize} />,
    'Tailwind': <SiTailwindcss size={iconSize} />,
    'MySql': <DiMysql size={iconSize} />,
    'MySQL': <DiMysql size={iconSize} />,
    'PostgreSql': <DiPostgresql size={iconSize} />,
    'PostgreSQL': <DiPostgresql size={iconSize} />,
    'MongoDB': <DiMongodb size={iconSize} />,
    'Redis': <DiRedis size={iconSize} />,
    'Git': <DiGit size={iconSize} />,
    'Linux': <SiLinux size={iconSize} />,
    'Docker': <DiDocker size={iconSize} />,
    'Maven': <FiServer size={iconSize} />, // 用通用服务器图标
    'Gradle': <SiGradle size={iconSize} />,
    'RESTAPI': <FiServer size={iconSize} />, // 用通用服务器图标
    'REST API': <FiServer size={iconSize} />,
    'Stable Diffusion': <FiSettings size={iconSize} />,
    // 添加其他可能的技术...
  };
  const lowerCaseName = name.toLowerCase();
  const foundKey = Object.keys(iconMap).find(k => k.toLowerCase() === lowerCaseName);
  return foundKey ? iconMap[foundKey] : <FiCode size={iconSize} />; // 默认代码图标
};

// 统一的获取颜色函数
const getColorForTechnology = (techName: string, defaultColor: string): string => {
  const techColors: Record<string, string> = {
    'java': '#b07219',
    'javascript': '#f1e05a',
    'typescript': '#3178c6',
    'python': '#3572A5',
    'c': '#555555',
    'c++': '#f34b7d',
    'c#': '#178600',
    'go': '#00ADD8',
    'rust': '#dea584',
    'react': '#61dafb',
    'react.js': '#61dafb',
    'vue': '#4FC08D',
    'vue.js': '#4FC08D',
    'angular': '#DD0031',
    'spring': '#6DB33F',
    'spring boot': '#6DB33F',
    'spring mvc': '#6DB33F',
    'spring jpa': '#6DB33F',
    'tailwind css': '#38B2AC',
    'tailwindcss': '#38B2AC',
    'tailwind': '#38B2AC',
    'bootstrap': '#7952B3',
    'mysql': '#4479A1',
    'postgresql': '#336791',
    'mongodb': '#4DB33D',
    'redis': '#DC382D',
    'sqlite': '#0f80cc',
    'oracle': '#F80000',
    'docker': '#2496ED',
    'kubernetes': '#326CE5',
    'git': '#F05032',
    'linux': '#FCC624',
    'gradle': '#02303A',
    'maven': '#C71A36',
    'jenkins': '#D33833',
    'graphql': '#E535AB',
    'rest api': '#0096c7',
    'restapi': '#0096c7',
    'socket.io': '#010101',
    'websocket': '#4353af',
    'jwt': '#000000',
    'javafx': '#5382a1',
    'stable diffusion': '#A020F0' // Purple for AI/ML
  };
  return techColors[techName.toLowerCase()] || defaultColor;
};

// 统一的获取URL函数 - 添加默认搜索链接
const getUrlForTechnology = (techName: string): string | undefined => {
  const techUrls: Record<string, string> = {
    'java': 'https://www.java.com/',
    'javascript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    'typescript': 'https://www.typescriptlang.org/',
    'python': 'https://www.python.org/',
    'c': 'https://en.cppreference.com/w/c',
    'c++': 'https://isocpp.org/',
    'c#': 'https://dotnet.microsoft.com/languages/csharp',
    'go': 'https://golang.org/',
    'rust': 'https://www.rust-lang.org/',
    'mysql': 'https://www.mysql.com/',
    'postgresql': 'https://www.postgresql.org/',
    'mongodb': 'https://www.mongodb.com/',
    'redis': 'https://redis.io/',
    'react': 'https://reactjs.org/',
    'react.js': 'https://reactjs.org/',
    'vue': 'https://vuejs.org/',
    'vue.js': 'https://vuejs.org/',
    'spring': 'https://spring.io/',
    'spring boot': 'https://spring.io/projects/spring-boot',
    'socket.io': 'https://socket.io/',
    'docker': 'https://www.docker.com/',
    'git': 'https://git-scm.com/',
    'linux': 'https://www.linux.org/',
    'maven': 'https://maven.apache.org/',
    'gradle': 'https://gradle.org/',
    'tailwind css': 'https://tailwindcss.com/',
    'tailwindcss': 'https://tailwindcss.com/',
    'tailwind': 'https://tailwindcss.com/',
    'stable diffusion': 'https://stability.ai/',
    'javafx': 'https://openjfx.io/', // 添加 JavaFX 链接
    'spring mvc': 'https://docs.spring.io/spring-framework/reference/web/webmvc.html', // 添加 Spring MVC
    'spring jpa': 'https://spring.io/projects/spring-data-jpa', // 添加 Spring JPA
    'bootstrap': 'https://getbootstrap.com/', // 添加 Bootstrap
    'sqlite': 'https://www.sqlite.org/index.html', // 添加 SQLite
    'flask': 'https://flask.palletsprojects.com/' // 添加 Flask
  };
  const lowerCaseName = techName.toLowerCase();
  // 如果找到特定URL则返回，否则返回Google搜索链接
  return techUrls[lowerCaseName] || `https://www.google.com/search?q=${encodeURIComponent(techName + ' technology')}`;
};

// 使用函数声明而不是箭头函数，有时这可以解决导出问题
export function TechnologyTag({ name, tech, icon, url: propUrl, size = 'small', index = 0, darkMode }: TechnologyTagProps) {
  const { theme: contextTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const theme = darkMode !== undefined ? (darkMode ? 'dark' : 'light') : contextTheme;
  const isDark = theme === 'dark';

  const technologyName = name || tech || '';
  if (!technologyName) return null;

  const finalIcon = icon || getTechnologyIcon(technologyName);
  const color = getColorForTechnology(technologyName, muiTheme.palette.primary.main);
  // 现在总会有一个 URL (官网或搜索链接)
  const finalUrl = propUrl || getUrlForTechnology(technologyName);

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: index * 0.05
      }
    },
    hover: {
      scale: 1.08,
      boxShadow: `0 0 8px 1px ${alpha(color, 0.4)}`,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: {
      scale: 0.95
    }
  };

  const handleClick = () => {
    if (finalUrl) {
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      variants={tagVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        borderRadius: '6px',
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          px: size === 'small' ? 1 : 1.5,
          py: size === 'small' ? 0.3 : 0.5,
          borderRadius: '6px',
          fontSize: size === 'small' ? '0.75rem' : '0.875rem',
          fontWeight: 500,
          lineHeight: 1.4,
          backgroundColor: alpha(color, isDark ? 0.15 : 0.1),
          border: `1px solid ${alpha(color, isDark ? 0.4 : 0.3)}`,
          color: color,
          transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        {finalIcon}
        <Typography
          component="span"
          sx={{
            fontSize: 'inherit',
            fontWeight: 'inherit',
            lineHeight: 'inherit'
          }}
        >
          {technologyName}
        </Typography>
      </Box>
    </motion.div>
  );
}

// 同时提供默认导出和命名导出
export default TechnologyTag;
