import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// 暂时注释掉通知组件导入
// import NotificationsProvider from './components/ui/common/NotificationsProvider';
// 导入新的复制通知提供者
import CopyNotificationProvider from './contexts/CopyNotificationContext';

// 导入Layout和所有页面组件
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import SkillsPage from './pages/skills/SkillsPage';
import ProjectsPage from './pages/projects/ProjectsPage';
import EducationPage from './pages/education/EducationPage';
import ContactPage from './pages/contact/ContactPage';
import CustomScrollbar from './components/ui/common/CustomScrollbar';

// 导入简历数据
import resumeData from './data/resumeData.json';

/**
 * 应用主组件
 * 使用React Router实现多页面路由
 */
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* 添加全局复制通知提供者 */}
        <CopyNotificationProvider>
          {/* 应用自定义滚动条，放在最外层确保全局生效 */}
          <CustomScrollbar
            thickness={8}
            borderRadius={6}
            trackOpacity={0.08}
            primaryColor="#6366F1"
          />
          {/* 暂时移除通知提供者，解决白屏问题 */}
          <Router>
            <CssBaseline />
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage data={resumeData.basics} />} />
                <Route path="/about" element={<AboutPage data={resumeData.basics} />} />
                <Route path="/skills" element={<SkillsPage data={resumeData.skills} />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/education" element={<EducationPage data={resumeData.education} />} />
                <Route path="/contact" element={<ContactPage data={resumeData.basics} />} />
              </Routes>
            </Layout>
          </Router>
        </CopyNotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
