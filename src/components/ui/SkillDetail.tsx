import React from 'react';
import { Box, Typography, alpha, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import TechTagGroup from './common/TechTagGroup';

interface SkillDetailProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  technologies?: Array<{
    name: string;
    icon?: React.ReactNode;
    url?: string;
  }>;
  delay?: number;
}

/**
 * 技能详述组件
 * 用于展示技能类别的详细描述和相关技术
 */
const SkillDetail: React.FC<SkillDetailProps> = ({
  title,
  description,
  icon,
  technologies = [],
  delay = 0
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // 为没有提供URL的技术标签生成默认URL
  const processedTechItems = technologies.map(tech => {
    // 如果已有URL，直接使用，否则尝试生成默认URL
    if (!tech.url) {
      // 常见技术的默认URL映射
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

        // 框架
        'React': 'https://reactjs.org/',
        'React.js': 'https://reactjs.org/',
        'Vue': 'https://vuejs.org/',
        'Vue.js': 'https://vuejs.org/',
        'Angular': 'https://angular.io/',
        'Spring': 'https://spring.io/',
        'Spring Boot': 'https://spring.io/projects/spring-boot',
        'Spring MVC': 'https://docs.spring.io/spring-framework/reference/web/webmvc.html',
        'Spring JPA': 'https://spring.io/projects/spring-data-jpa',
        'TailWind CSS': 'https://tailwindcss.com/',
        'TailwindCSS': 'https://tailwindcss.com/',
        'Tailwind': 'https://tailwindcss.com/',
        'Bootstrap': 'https://getbootstrap.com/',

        // 工具与技术
        'Docker': 'https://www.docker.com/',
        'Kubernetes': 'https://kubernetes.io/',
        'Git': 'https://git-scm.com/',
        'Linux': 'https://www.linux.org/',
        'Gradle': 'https://gradle.org/',
        'Maven': 'https://maven.apache.org/',
        'Jenkins': 'https://www.jenkins.io/',
        'GraphQL': 'https://graphql.org/',
        'REST API': 'https://restfulapi.net/',
        'Socket.IO': 'https://socket.io/',
        'WebSocket': 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
        'JWT': 'https://jwt.io/',
        'JavaFX': 'https://openjfx.io/'
      };

      // 尝试匹配技术名称（不区分大小写）
      const key = Object.keys(techUrls).find(
        k => k.toLowerCase() === tech.name.toLowerCase()
      );

      // 如果找到匹配的URL，添加到技术项目中
      if (key) {
        return { ...tech, url: techUrls[key] };
      }
    }

    return tech;
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          borderRadius: '24px',
          background: theme === 'dark'
            ? alpha(muiTheme.palette.background.paper, 0.25)
            : alpha(muiTheme.palette.background.paper, 0.6),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(
            theme === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.black,
            0.06
          )}`,
          boxShadow: theme === 'dark'
            ? `0 4px 20px ${alpha(muiTheme.palette.common.black, 0.25)}`
            : `0 4px 20px ${alpha(muiTheme.palette.common.black, 0.1)}`
        }}
      >
        {/* 标题 */}
        <motion.div variants={childVariants}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              height: '40px'
            }}
          >
            {icon && (
              <Box
                sx={{
                  mr: 1.5,
                  color: theme === 'dark'
                    ? muiTheme.palette.primary.light
                    : muiTheme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {icon}
              </Box>
            )}
            <Typography variant="h6" fontWeight="bold" noWrap>
              {title}
            </Typography>
          </Box>
        </motion.div>

        {/* 描述 */}
        <motion.div variants={childVariants} style={{ flexGrow: 1 }}>
          <Typography
            variant="body2"
            sx={{
              mb: 3,
              lineHeight: 1.8,
              height: { xs: 'auto', md: '150px' },
              overflow: 'auto',
              color: theme === 'dark'
                ? alpha(muiTheme.palette.common.white, 0.7)
                : alpha(muiTheme.palette.common.black, 0.7),
              '&::-webkit-scrollbar': {
                width: '6px',
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme === 'dark'
                  ? alpha(muiTheme.palette.primary.main, 0.5)
                  : alpha(muiTheme.palette.primary.main, 0.3),
                borderRadius: '6px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: theme === 'dark'
                  ? alpha(muiTheme.palette.primary.main, 0.7)
                  : alpha(muiTheme.palette.primary.main, 0.5)
              }
            }}
          >
            {description}
          </Typography>
        </motion.div>

        {/* 相关技术 */}
        <Box sx={{ mt: 'auto' }}>
          {technologies.length > 0 && (
            <TechTagGroup
              title="相关技术"
              techItems={processedTechItems}
              initiallyExpanded={false}
              showToggle={true}
              variant="small"
              collapsible={technologies.length > 6}
              maxVisibleItems={6}
              animate={true}
            />
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default SkillDetail;
