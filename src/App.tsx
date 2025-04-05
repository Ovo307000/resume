// import React from 'react';
import { HashRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import CopyNotificationProvider from './contexts/CopyNotificationContext';
import DarkReaderProvider from './contexts/DarkReaderContext';
import Layout from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import SkillsPage from './pages/skills/SkillsPage';
import ProjectsPage from './pages/projects/ProjectsPage';
import EducationPage from './pages/education/EducationPage';
import ContactPage from './pages/contact/ContactPage';
import resumeData from './data/resumeData.json';
import GlobalStyles from './styles/GlobalStyles';

/**
 * 应用主组件
 * 使用React Router实现多页面路由
 */
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CopyNotificationProvider>
          <DarkReaderProvider>
            <HashRouter>
              <CssBaseline />
              <GlobalStyles />
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage data={resumeData.basics} />} />
                  <Route path="/about" element={<AboutPage data={resumeData.basics} />} />
                  <Route path="/skills" element={<SkillsPage data={resumeData.skills} />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/education" element={<EducationPage data={resumeData.education} />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </Layout>
            </HashRouter>
          </DarkReaderProvider>
        </CopyNotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
