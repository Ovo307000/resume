import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Box, Container, Paper, Grid, Avatar, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle } from 'react-icons/fi';

interface AboutPageProps {
  data: {
    name: string;
    label: string;
    summary: string;
    email: string;
    phone: string;
    github: string;
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
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{ mb: 2 }}
                    >
                      {t('contact.title')}
                    </Typography>

                    {[
                      { label: t('contact.email'), value: data.email },
                      { label: t('contact.phone'), value: data.phone },
                      { label: t('contact.github'), value: data.github },
                      { label: t('contact.wechat'), value: data.wechat }
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          mb: 1.5,
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {item.label}:
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* 特质标签 */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{ mb: 2 }}
                    >
                      特长
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {traits.map((trait, index) => (
                        <Chip
                          key={index}
                          label={trait}
                          size="small"
                          color={index % 3 === 0 ? "primary" : index % 3 === 1 ? "info" : "success"}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* 右侧个人介绍 */}
            <Grid item xs={12} md={8}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: '16px',
                    mb: 4
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    我的故事
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.8 }}
                  >
                    {data.summary}
                  </Typography>

                  <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.8 }}>
                    作为一名Java后端工程师，我始终保持对新技术的好奇心和学习热情。我相信优秀的软件不仅仅是功能的实现，更重要的是高性能、可扩展和易维护，而这正是我一直追求的目标。
                  </Typography>

                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    我喜欢与团队协作解决复杂问题，通过技术创新提升用户体验和业务效率。无论是开发新功能还是优化现有系统，我都力求写出干净、高效的代码。
                  </Typography>
                </Paper>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: '16px'
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    我能做什么
                  </Typography>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {[
                      '设计和开发高性能、可扩展的Java应用',
                      '构建RESTful API和微服务架构',
                      '数据库设计和优化（MySQL、MongoDB等）',
                      '容器化应用部署（Docker、Kubernetes）',
                      '持续集成和部署流程优化',
                      '代码重构和性能优化',
                      '系统问题诊断和故障排除',
                      '技术文档编写和知识分享'
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <FiCheckCircle color="#4338CA" size={20} style={{ marginTop: '2px' }} />
                          <Typography variant="body2" color="text.secondary">
                            {item}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutPage;
