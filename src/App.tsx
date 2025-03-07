import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// 导入Layout和所有页面组件
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import SkillsPage from './pages/skills/SkillsPage';
import ProjectsPage from './pages/projects/ProjectsPage';
import EducationPage from './pages/education/EducationPage';
import ContactPage from './pages/contact/ContactPage';

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
        <Router>
          <CssBaseline />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage data={resumeData.basics} />} />
              <Route path="/about" element={<AboutPage data={resumeData.basics} />} />
              <Route path="/skills" element={<SkillsPage data={resumeData.skills} />} />
              <Route path="/projects" element={<ProjectsPage data={resumeData.projects} />} />
              <Route path="/education" element={<EducationPage data={resumeData.education} />} />
              <Route path="/contact" element={<ContactPage data={resumeData.basics} />} />
            </Routes>
          </Layout>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
