import React from 'react';
import { Box, alpha, useTheme as useMuiTheme, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface TechTagProps {
  label: string;
  category?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'small' | 'large';
  animate?: boolean;
  index?: number;
  onClick?: () => void;
  url?: string;
  size?: number; // 标签尺寸比例，用于技术池显示
  customColor?: string; // 自定义颜色
}

/**
 * 通用技术标签组件
 * 可在不同页面复用的技术标签，支持多种尺寸和样式
 */
const TechTag: React.FC<TechTagProps> = ({
  label,
  category,
  icon,
  variant = 'default',
  animate = true,
  index = 0,
  onClick,
  url,
  size = 1,
  customColor
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // 获取技术对应的颜色
  const getTechColor = () => {
    if (customColor) return customColor;

    // 根据技术名称设置特定颜色
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

      // 前端
      'HTML': '#e34c26',
      'HTML5': '#e34c26',
      'CSS': '#563d7c',
      'CSS3': '#563d7c',
      'SASS': '#c6538c',
      'SCSS': '#c6538c',
      'Less': '#1d365d',
      'Webpack': '#8DD6F9',
      'Babel': '#f9dc3e',
      'jQuery': '#0769ad',

      // 状态管理
      'Redux': '#764abc',
      'Vuex': '#4FC08D',
      'MobX': '#ff9955',

      // 数据库
      'MySQL': '#4479A1',
      'PostgreSQL': '#336791',
      'MongoDB': '#4DB33D',
      'Redis': '#DC382D',
      'SQLite': '#0f80cc',
      'Oracle': '#F80000',
      'MS SQL': '#CC2927',
      'Firebase': '#FFCA28',

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
      'RESTful': '#0096c7',
      'gRPC': '#244c5a',
      'SOAP': '#5a86ad',
      'WebSocket': '#4353af',
      'MQTT': '#660066',
      'JWT': '#000000',
      'OAuth': '#5ab44b',
      'Microservices': '#1e88e5',
      'AWS': '#FF9900',
      'Azure': '#0078D4',
      'GCP': '#4285F4',
      'Netlify': '#00AD9F',
      'Vercel': '#000000',
      'Heroku': '#430098',
      'CI/CD': '#40c057',
      'JUnit': '#25A162',
      'Jasmine': '#8A4182',
      'Jest': '#C21325',
      'Mocha': '#8D6748',
      'Chai': '#A30701',
      'Selenium': '#43B02A',
      'JPA': '#59666c',
      'Hibernate': '#bcae79',
      'MyBatis': '#3d3d3d',
      'RabbitMQ': '#FF6600',
      'Kafka': '#000000',
      'Elasticsearch': '#005571',
      'Logstash': '#005571',
      'Kibana': '#005571',
      'ELK Stack': '#005571',

      // 移动开发
      'Android': '#3DDC84',
      'iOS': '#000000',
      'Swift': '#F05138',
      'Flutter': '#02569B',
      'React Native': '#61dafb',

      // 游戏开发
      'Unity': '#000000',
      'Unreal Engine': '#313131',
      'Godot': '#478CBF',
      'OpenGL': '#5586A4',

      // AI & 机器学习
      'TensorFlow': '#FF6F00',
      'PyTorch': '#EE4C2C',
      'Scikit-learn': '#F7931E',
      'NLTK': '#3492ff',
      'Pandas': '#150458',
      'NumPy': '#013243',
      'OpenCV': '#5C3EE8',

      // 编辑器和IDE
      'VS Code': '#007ACC',
      'Visual Studio': '#5C2D91',
      'IntelliJ IDEA': '#000000',
      'WebStorm': '#00CDD7',
      'PyCharm': '#21D789',

      // PDF生成
      'PDF Generation': '#c62828'
    };

    // 尝试匹配技术名称（不区分大小写）
    const key = Object.keys(techColors).find(
      k => k.toLowerCase() === label.toLowerCase()
    );

    return key ? techColors[key] : undefined;
  };

  // 根据尺寸变体确定样式
  const getStyles = () => {
    const baseColor = getTechColor() || (theme === 'dark'
      ? muiTheme.palette.primary.light
      : muiTheme.palette.primary.main);

    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: variant === 'small' ? 0.5 : 1,
      borderRadius: variant === 'small' ? '6px' : '8px',
      backgroundColor: theme === 'dark'
        ? alpha(baseColor, 0.15)
        : alpha(baseColor, 0.08),
      color: baseColor,
      border: `1px solid ${alpha(baseColor, 0.2)}`,
      transition: 'all 0.2s ease',
      cursor: onClick || url ? 'pointer' : 'default',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      boxShadow: `0 2px 6px ${alpha(
        muiTheme.palette.common.black,
        theme === 'dark' ? 0.2 : 0.08
      )}`,
      '&:hover': (onClick || url) ? {
        backgroundColor: theme === 'dark'
          ? alpha(baseColor, 0.25)
          : alpha(baseColor, 0.12),
        transform: 'translateY(-2px)',
        boxShadow: `0 4px 8px ${alpha(baseColor, 0.25)}`
      } : {},
      zIndex: size !== 1 ? Math.floor(size * 10) : undefined
    };

    // 根据不同尺寸变体添加特殊样式
    switch (variant) {
      case 'small':
        return {
          ...baseStyles,
          fontSize: '0.7rem',
          py: 0.3,
          px: 1,
          fontWeight: 500
        };
      case 'large':
        return {
          ...baseStyles,
          fontSize: '0.9rem',
          py: 1,
          px: 2,
          fontWeight: 600
        };
      default:
        return {
          ...baseStyles,
          fontSize: '0.8rem',
          py: 0.5,
          px: 1.5,
          fontWeight: 500
        };
    }
  };

  // 生成动画变体
  const tagVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.1 + (index * 0.05)
      }
    }
  };

  // 处理点击事件
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const WrapperComponent = animate ? motion.div : Box;
  const wrapperProps = animate ? {
    variants: tagVariants,
    initial: "hidden",
    animate: "visible"
  } : {};

  return (
    <WrapperComponent
      {...wrapperProps}
      onClick={handleClick}
    >
      <Box
        component="span"
        sx={getStyles()}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.9,
              color: 'inherit'
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          component="span"
          variant="inherit"
          sx={{
            lineHeight: 1.2,
            whiteSpace: 'nowrap'
          }}
        >
          {label}
        </Typography>
        {category && variant !== 'small' && (
          <Box
            component="span"
            sx={{
              fontSize: '0.65em',
              opacity: 0.7,
              ml: 0.5,
              backgroundColor: alpha(
                getTechColor() || (theme === 'dark'
                  ? muiTheme.palette.primary.light
                  : muiTheme.palette.primary.main),
                0.1
              ),
              px: 0.5,
              py: 0.2,
              borderRadius: '4px'
            }}
          >
            {category}
          </Box>
        )}
      </Box>
    </WrapperComponent>
  );
};

export default TechTag;
