# 赵东安 - 个人简历网站

一个现代化的个人简历网站，基于 React、TypeScript 和 Material UI 构建，支持多语言和暗色/亮色主题切换。

## 🌟 特性

- **响应式设计**：完美适配所有设备尺寸
- **多语言支持**：支持中文和英文
- **主题切换**：明亮/暗黑模式自由切换
- **现代化 UI**：使用 Material UI 组件库
- **平滑动画**：整合 Framer Motion 实现流畅过渡效果
- **简约 RGB 风格**：简约设计中点缀 RGB 元素
- **模块化架构**：采用组件化和单一职责原则
- **炫彩进度条**：技能展示使用RGB无限渐变效果
- **优雅导航**：粘滞式导航栏和平滑过渡效果

## 🛠️ 技术栈

- **React 19**：使用最新的 React 框架
- **TypeScript**：类型安全的 JavaScript 超集
- **Material UI**：流行的 React UI 组件库
- **Tailwind CSS**：实用优先的 CSS 框架
- **React Icons**：流行的图标库集合
- **i18next**：强大的国际化框架
- **Framer Motion**：React 动画库
- **Vite**：现代前端构建工具

## 🚀 快速开始

### 前置条件

- Node.js 16.0 或更高版本
- npm 或 yarn

### 安装步骤

1. 克隆仓库
   ```
   git clone https://github.com/yourusername/resume-website.git
   ```

2. 安装依赖
   ```
   cd resume-website
   npm install
   ```

3. 启动开发服务器
   ```
   npm run dev
   ```

4. 打开浏览器访问 http://localhost:5173

## 📂 项目结构

```
src/
├── components/            # 组件文件夹
│   ├── layout/            # 布局组件
│   │   └── sections/          # 页面各部分组件
│   │       ├── hero/          # 首页英雄部分
│   │       ├── about/         # 关于我部分
│   │       ├── skills/        # 技能部分
│   │       ├── projects/      # 项目部分
│   │       ├── education/     # 教育经历部分
│   │       └── contact/       # 联系方式部分
│   └── ui/                # UI 组件
│       ├── theme/         # 主题相关组件
│       └── language/      # 语言相关组件
├── contexts/              # React 上下文
├── data/                  # 数据文件
├── hooks/                 # 自定义 Hooks
├── locales/               # 国际化文件
│   ├── en/                # 英文翻译
│   └── zh/                # 中文翻译
├── types/                 # TypeScript 类型定义
└── utils/                 # 工具函数
```

## 🔄 变更日志

### 2024-07-09 - UI增强与功能优化喵～

- 添加个性化头像，显示在Logo、Hero组件和About页面
- 实现统一的CustomChip组件，支持链接跳转和动画效果
- 创建RainbowProgressBar组件，实现炫彩无限RGB渐变效果
- 优化导航栏粘滞效果，提升滚动体验
- 改进返回顶部按钮，增加优雅的出现/消失动画
- 优化移动端体验，将语言切换整合到导航菜单中
- 修复技能图标导入问题，确保页面正常显示

### 2024-07-08 - 暗色模式优化

- 全面增强暗色模式支持，优化所有组件的暗色显示效果
- 改进 MUI 主题设置，添加更完善的组件级暗色样式
- 增强主题切换功能，添加系统主题自动跟踪
- 优化组件间暗色模式的一致性
- 添加主题元数据，改进移动端暗色模式体验

### 2024-07-07 - 修复与优化

- 修复了语言上下文导出问题导致的白屏
- 将 BrowserRouter 替换为 HashRouter，提高开发环境兼容性
- 添加共享页面标题组件，提高代码复用性
- 优化页面过渡动画效果

### 2024-07-07 - 项目优化

- 使用 Material UI 重构组件
- 添加 React Icons 图标库
- 实现更现代化的界面设计
- 将简历数据迁移到 JSON 文件
- 按照单一职责原则重构组件
- 添加 README 和变更日志

### 2024-07-06 - 初始版本

- 创建基本项目结构
- 实现主题切换功能
- 添加多语言支持
- 创建基础组件

## 📱 功能展示

- **主页**：个人介绍和快速导航，炫酷动态背景
- **关于我**：个人背景、简介和精美头像展示
- **技能**：技术技能和专长展示，可点击标签和动画进度条
- **项目经验**：重要项目展示，精美卡片布局
- **教育经历**：教育背景时间线，现代化展示效果
- **联系方式**：联系信息和社交媒体链接

## 📚 学习资源

- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [Material UI 文档](https://mui.com/material-ui/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs/)
- [Framer Motion 文档](https://www.framer.com/motion/)
- [i18next 文档](https://www.i18next.com/)

## 🤝 贡献

欢迎贡献！请随时提交 PR 或创建 issue。

## 📄 许可

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。
