import React from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  Avatar,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiBriefcase, FiStar, FiCode } from 'react-icons/fi';

interface AboutPageProps {
  data: {
    name: string;
    label: string;
    summary: string;
    email: string;
    phone: string;
    github: string;
    githubUsername?: string;
    wechat: string;
  };
}

/**
 * 关于我页面组件
 */
const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  const { t } = useTranslation();

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // 个人特质
  const traits = [
    'Spring', 'Java', 'MySQL', 'Docker',
    '问题解决能力', '团队协作', '持续学习', '代码质量'
  ];

  // 工作经验
  const experiences = [
    {
      title: "Java 后端开发工程师",
      company: "某科技公司",
      period: "2022年4月 - 至今",
      description: "负责公司核心服务的后端开发和维护，使用Spring Boot框架开发RESTful API，参与微服务架构设计，优化系统性能，提高服务可用性。",
      achievements: [
        "重构遗留代码，提高系统性能30%",
        "构建自动化测试流程，减少80%的回归测试时间",
        "设计并实现了分布式缓存解决方案"
      ],
      technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"]
    },
    {
      title: "Java 开发实习生",
      company: "某网络科技有限公司",
      period: "2021年7月 - 2022年3月",
      description: "参与公司电商平台后端开发，负责订单模块API开发和优化，协助资深开发人员进行系统设计和代码审查。",
      achievements: [
        "独立开发订单管理模块，获得导师好评",
        "参与性能优化，帮助系统支持双倍并发量",
        "编写详细的技术文档，降低新人学习成本"
      ],
      technologies: ["Java", "Spring MVC", "MyBatis", "MySQL"]
    }
  ];

  // 项目经验
  const projectExperiences = [
    {
      name: "苍穹外卖",
      role: "后端开发负责人",
      period: "2022年10月 - 2023年2月",
      description: "专为餐饮企业定制的一款软件产品，包括系统管理后台和小程序端应用，实现了餐厅菜品管理、订单处理、数据统计等功能。",
      contributions: [
        "设计并实现了核心订单处理模块，支持高并发访问",
        "开发了实时数据统计功能，提升运营决策效率",
        "构建了系统缓存架构，优化了菜品展示性能"
      ],
      technologies: ["Spring Boot", "Redis", "MySQL", "WebSocket"]
    },
    {
      name: "尚庭公寓",
      role: "全栈开发工程师",
      period: "2022年5月 - 2022年9月",
      description: "公寓租赁平台项目，包含移动端和后台管理系统，实现租房查询、预约看房、在线签约等功能。",
      contributions: [
        "负责后端API设计和开发，构建RESTful服务",
        "实现了在线签约功能，整合第三方电子签章服务",
        "开发了房源推荐算法，提高用户点击转化率25%"
      ],
      technologies: ["Spring Boot", "MyBatis Plus", "Redis", "MySQL"]
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 页面标题 */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              textAlign="center"
              sx={{
                mb: 6,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #4338CA, #6366F1)',
                  borderRadius: '2px',
                }
              }}
            >
              {t('about.title')}
            </Typography>
          </motion.div>

          {/* 主要内容 */}
          <Grid container spacing={4}>
            {/* 左侧个人信息卡片 */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: '16px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, rgba(67, 56, 202, 0.05), rgba(99, 102, 241, 0.05))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {/* 头像 */}
                  <Box
                    sx={{
                      position: 'relative',
                      mb: 3
                    }}
                  >
                    <Avatar
                      src="/profile_avatar.png"
                      alt={data.name}
                      sx={{
                        width: 120,
                        height: 120,
                        boxShadow: '0 10px 20px rgba(67, 56, 202, 0.2)',
                        border: '3px solid rgba(255, 255, 255, 0.1)',
                      }}
                    />

                    {/* 状态指示器 */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 5,
                        right: 5,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: '#10B981',
                        border: '3px solid white',
                        boxShadow: '0 0 0 2px #10B981',
                      }}
                    />
                  </Box>

                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {data.name}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    color="primary"
                    fontWeight="medium"
                    sx={{ mb: 3 }}
                  >
                    {data.label}
                  </Typography>

                  {/* 联系方式 */}
                  <Box sx={{ width: '100%', mb: 3 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
                      {t('about.contact')}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(67, 56, 202, 0.1)',
                            color: 'primary.main',
                          }}
                        >
                          <i className="far fa-envelope"></i>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {t('about.email')}
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {data.email}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(67, 56, 202, 0.1)',
                            color: 'primary.main',
                          }}
                        >
                          <i className="fas fa-phone-alt"></i>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {t('about.phone')}
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {data.phone}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(67, 56, 202, 0.1)',
                            color: 'primary.main',
                          }}
                        >
                          <i className="fab fa-github"></i>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {t('about.github')}
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            <a
                              href={data.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {data.githubUsername || data.github}
                            </a>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* 特质标签 */}
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
                      {t('about.traits')}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {traits.map((trait, index) => (
                        <Chip
                          key={index}
                          label={trait}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(67, 56, 202, 0.1)',
                            color: 'primary.main',
                            fontWeight: 'medium',
                            '&:hover': {
                              backgroundColor: 'rgba(67, 56, 202, 0.2)',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* 右侧内容区域 */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                {/* 关于我 */}
                <Grid item xs={12}>
                  <motion.div variants={itemVariants}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 4,
                        borderRadius: '16px',
                        backgroundColor: 'background.paper',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(67, 56, 202, 0.1)',
                            color: 'primary.main',
                          }}
                        >
                          <i className="fas fa-user"></i>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          {t('about.aboutMe')}
                        </Typography>
                      </Box>

                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {data.summary}
                      </Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FiCheckCircle color="#4338CA" />
                          <Typography variant="body2">善于解决复杂问题</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FiCheckCircle color="#4338CA" />
                          <Typography variant="body2">注重代码质量</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FiCheckCircle color="#4338CA" />
                          <Typography variant="body2">热爱学习新技术</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FiCheckCircle color="#4338CA" />
                          <Typography variant="body2">注重团队协作</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>

                {/* 工作经验 */}
                <Grid item xs={12}>
                  <motion.div variants={itemVariants}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 4,
                        borderRadius: '16px',
                        backgroundColor: 'background.paper',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          mb: 4,
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(67, 56, 202, 0.1)',
                            color: 'primary.main',
                          }}
                        >
                          <FiBriefcase size={20} />
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          工作经验
                        </Typography>
                      </Box>

                      <Timeline position="alternate">
                        {experiences.map((exp, index) => (
                          <TimelineItem key={index}>
                            <TimelineOppositeContent color="text.secondary">
                              {exp.period}
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                              <TimelineDot color="primary">
                                <FiBriefcase size={16} />
                              </TimelineDot>
                              {index < experiences.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>

                            <TimelineContent>
                              <Card
                                variant="outlined"
                                sx={{
                                  borderRadius: '12px',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    transform: 'translateY(-5px)'
                                  }
                                }}
                              >
                                <CardContent>
                                  <Typography variant="h6" color="primary" fontWeight="bold">
                                    {exp.title}
                                  </Typography>
                                  <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                                    {exp.company}
                                  </Typography>

                                  <Typography variant="body2" sx={{ mb: 2 }}>
                                    {exp.description}
                                  </Typography>

                                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                    成就:
                                  </Typography>
                                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                                    {exp.achievements.map((achievement, i) => (
                                      <Box component="li" key={i} sx={{ mb: 0.5 }}>
                                        <Typography variant="body2">
                                          {achievement}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>

                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {exp.technologies.map((tech, i) => (
                                      <Chip
                                        key={i}
                                        label={tech}
                                        size="small"
                                        sx={{
                                          backgroundColor: 'rgba(67, 56, 202, 0.1)',
                                          color: 'primary.main',
                                          fontWeight: 'medium',
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </CardContent>
                              </Card>
                            </TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </Paper>
                  </motion.div>
                </Grid>

                {/* 项目经验 */}
                <Grid item xs={12}>
                  <motion.div variants={itemVariants}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 4,
                        borderRadius: '16px',
                        backgroundColor: 'background.paper',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          mb: 4,
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(67, 56, 202, 0.1)',
                            color: 'primary.main',
                          }}
                        >
                          <FiCode size={20} />
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          项目经验
                        </Typography>
                      </Box>

                      <Grid container spacing={3}>
                        {projectExperiences.map((project, index) => (
                          <Grid item xs={12} key={index}>
                            <Card
                              variant="outlined"
                              sx={{
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                }
                              }}
                            >
                              <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                  <Box>
                                    <Typography variant="h6" color="primary" fontWeight="bold">
                                      {project.name}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                      {project.role} · {project.period}
                                    </Typography>
                                  </Box>
                                  <Chip
                                    icon={<FiStar size={14} />}
                                    label="精选项目"
                                    size="small"
                                    sx={{
                                      backgroundColor: 'rgba(67, 56, 202, 0.1)',
                                      color: 'primary.main',
                                    }}
                                  />
                                </Box>

                                <Typography variant="body2" paragraph>
                                  {project.description}
                                </Typography>

                                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                  我的贡献:
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                                  {project.contributions.map((contribution, i) => (
                                    <Box component="li" key={i} sx={{ mb: 0.5 }}>
                                      <Typography variant="body2">
                                        {contribution}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                                  {project.technologies.map((tech, i) => (
                                    <Chip
                                      key={i}
                                      label={tech}
                                      size="small"
                                      sx={{
                                        backgroundColor: 'rgba(67, 56, 202, 0.1)',
                                        color: 'primary.main',
                                        fontWeight: 'medium',
                                      }}
                                    />
                                  ))}
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutPage;
