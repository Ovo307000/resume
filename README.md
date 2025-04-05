<p align="center">
  <img src="public/logo.png" alt="赵东安简历" width="200" height="200" style="border-radius: 50%;">
</p>

<h1 align="center">赵东安 - 个人简历网站</h1>

<p align="center">
  <a href="https://ovo307000.github.io/resume" target="_blank">预览网站</a> •
  <a href="#技术栈">技术栈</a> •
  <a href="#项目特性">项目特性</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#项目结构">项目结构</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript" alt="TypeScript 5.7" />
  <img src="https://img.shields.io/badge/MUI-6.4-blue?logo=mui" alt="MUI 6.4" />
  <img src="https://img.shields.io/badge/Vite-6.2-blue?logo=vite" alt="Vite 6.2" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-blue?logo=tailwindcss" alt="TailwindCSS 4.0" />
</p>

## ✨ 项目特性

<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
  <div style="flex: 0 0 48%;">
    <h3>📱 响应式设计</h3>
    <p>完美适配从手机到桌面的各种设备尺寸</p>
  </div>
  <div style="flex: 0 0 48%;">
    <h3>🌍 多语言支持</h3>
    <p>内置中文和英文，一键切换语言</p>
  </div>
  <div style="flex: 0 0 48%;">
    <h3>🌓 主题切换</h3>
    <p>明亮/暗黑模式自由切换，支持系统主题自动跟踪</p>
  </div>
  <div style="flex: 0 0 48%;">
    <h3>🎨 现代化 UI</h3>
    <p>基于 Material UI 的精美组件和交互效果</p>
  </div>
  <div style="flex: 0 0 48%;">
    <h3>✨ 平滑动画</h3>
    <p>使用 Framer Motion 实现流畅的过渡和动画效果</p>
  </div>
  <div style="flex: 0 0 48%;">
    <h3>🌈 RGB 风格</h3>
    <p>简约设计中融入精心设计的 RGB 动态元素</p>
  </div>
  <div style="flex: 0 0 48%;">
    <h3>🧩 模块化架构</h3>
    <p>基于组件化和单一职责原则设计的代码结构</p>
  </div>
  <div style="flex: 0 0 48%;">
    <h3>📊 炫彩进度条</h3>
    <p>技能展示采用无限 RGB 渐变效果</p>
  </div>
</div>

## 🛠️ 技术栈

### 核心框架
- [React 19](https://react.dev/) - 最新版 React 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript 超集
- [Material UI](https://mui.com/material-ui/) - 流行的 React UI 组件库

### 样式与动画
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - 强大的 React 动画库

### 工具与功能
- [React Icons](https://react-icons.github.io/react-icons/) - 流行图标库集合
- [i18next](https://www.i18next.com/) - 强大的国际化框架
- [React Router](https://reactrouter.com/) - React 应用路由管理

### 构建与部署
- [Vite](https://vitejs.dev/) - 现代前端构建工具
- [GitHub Pages](https://pages.github.com/) - 静态网站托管服务

## 🚀 快速开始

### 前置条件

- Node.js 16.0 或更高版本
- npm 或 yarn

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/resume-website.git
   cd resume-website
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **构建生产版本**
   ```bash
   npm run build
   ```

5. **在本地预览生产版本**
   ```bash
   npm run preview
   ```

## 📂 项目结构

```
src/
├── components/            # UI 组件
│   ├── layout/            # 布局组件 (Header, Footer, Layout)
│   ├── ui/                # UI 组件
│   │   ├── about/         # 关于我相关组件
│   │   ├── backgrounds/   # 背景相关组件
│   │   ├── common/        # 通用组件
│   │   ├── contact/       # 联系方式组件
│   │   ├── education/     # 教育经历组件
│   │   ├── glass/         # 玻璃拟态组件
│   │   ├── language/      # 语言切换组件
│   │   ├── logo/          # Logo 相关组件
│   │   ├── navigation/    # 导航相关组件
│   │   ├── progress/      # 进度相关组件
│   │   ├── projects/      # 项目展示组件
│   │   ├── skills/        # 技能相关组件
│   │   ├── theme/         # 主题相关组件
│   │   └── transitions/   # 过渡动画组件
│   ├── navigation/        # 导航组件
│   └── footer/            # 页脚组件
├── contexts/              # React 上下文
├── data/                  # 数据文件
├── hooks/                 # 自定义 Hooks
├── locales/               # 国际化文件
│   ├── en/                # 英文翻译
│   └── zh/                # 中文翻译
├── pages/                 # 页面组件
│   ├── about/             # 关于我页面
│   ├── contact/           # 联系方式页面
│   ├── education/         # 教育经历页面
│   ├── home/              # 首页
│   ├── projects/          # 项目展示页面
│   └── skills/            # 技能页面
├── styles/                # 样式文件
├── types/                 # TypeScript 类型定义
└── utils/                 # 工具函数
```

## 📱 功能展示

### 主页
- 个人介绍和快速导航
- 炫酷动态背景效果
- 响应式卡片布局

### 关于我
- 个人背景与详细简介
- 精美头像动画展示
- 技能标签与进度条

### 技能
- 分类展示的技术技能
- 可交互的技能标签
- RGB 无限渐变进度条

### 项目经验
- 精美卡片式项目展示
- 详细的项目描述与技术栈
- 项目链接与演示

### 教育经历
- 现代化时间线展示
- 学历与成就详情
- 平滑的动画效果

### 联系方式
- 交互式联系表单
- 社交媒体链接
- 邮件直接发送功能

## 🔄 最近更新

### 2024-07-09 - UI增强与功能优化
- 添加个性化头像，显示在Logo、Hero组件和About页面
- 实现统一的CustomChip组件，支持链接跳转和动画效果
- 创建RainbowProgressBar组件，实现炫彩无限RGB渐变效果
- 优化导航栏粘滞效果，提升滚动体验
- 改进返回顶部按钮，增加优雅的出现/消失动画
- 优化移动端体验，将语言切换整合到导航菜单中

### 2024-07-08 - 暗色模式优化
- 全面增强暗色模式支持，优化所有组件的暗色显示效果
- 改进 MUI 主题设置，添加更完善的组件级暗色样式
- 增强主题切换功能，添加系统主题自动跟踪
- 优化组件间暗色模式的一致性

## 📧 联系表单功能

网站集成了安全的邮件发送功能，使用 Express 后端与 Mailgun API 交互：

- 前端：React 联系表单收集用户输入
- 后端：Express 服务器安全处理 API 请求
- 安全性：敏感 API 密钥仅存储在后端

详细配置说明请参考 `SETUP_EMAIL.md`。

## 🤝 贡献

欢迎贡献！请随时提交 PR 或创建 issue。

## 📄 许可

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🚀 部署到 GitHub Pages

### 手动部署

```bash
npm run deploy
```

### 自动部署

本项目已配置 GitHub Actions 自动部署工作流，当推送代码到主分支时会自动部署。
