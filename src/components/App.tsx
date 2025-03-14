import MobileNavbar from './navigation/mobile/MobileNavbar';

const App: React.FC = () => {
  // 设置路由
  const routes = [
    { path: '/', label: t('navigation.home', '首页') },
    { path: '/about', label: t('navigation.about', '关于我') },
    { path: '/projects', label: t('navigation.projects', '项目') },
    { path: '/education', label: t('navigation.education', '教育') },
    { path: '/experience', label: t('navigation.experience', '经验') },
    { path: '/contact', label: t('navigation.contact', '联系') },
  ];

  // 导航判断路径是否激活
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={`app ${theme}`}>
        {/* 桌面导航栏 */}
        <Hidden smDown>
          <Navbar routes={routes} isActive={isActive} />
        </Hidden>

        {/* 移动导航栏 - 使用新的组件 */}
        <Hidden mdUp>
          <MobileNavbar
            routes={routes}
            showLanguageSelector={true}
            logo="/logo.png"
            title={t('site.title', '个人简历')}
            avatarSrc="/avatar.jpg"
            name={t('site.author', '您的名字')}
            socialLinks={{
              github: 'https://github.com/yourusername',
              linkedin: 'https://linkedin.com/in/yourusername',
              email: 'your.email@example.com'
            }}
          />
        </Hidden>

        {/* 页面内容 */}
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* 页脚 */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
