# Modern Resume Website

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Ovo307000/resume?style=social)
![GitHub forks](https://img.shields.io/github/forks/Ovo307000/resume?style=social)
![GitHub repo size](https://img.shields.io/github/repo-size/Ovo307000/resume)
![GitHub last commit](https://img.shields.io/github/last-commit/Ovo307000/resume)
![GitHub](https://img.shields.io/github/license/Ovo307000/resume?color=blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript)
![Material UI](https://img.shields.io/badge/Material%20UI-6.4.7-0081CB?logo=mui)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0.11-38B2AC?logo=tailwind-css)

<p align="center">
  <img src="https://img.php.cn/upload/image/550/982/756/1684488126246446.png" alt="Resume Website Preview" width="700">
</p>

**一个现代化的个人简历网站，基于 React、TypeScript 和 Material UI 构建，支持多语言和暗色/亮色主题切换。**

[🌐 在线预览](#) | [📝 报告问题](https://github.com/Ovo307000/resume/issues) | [⭐ 给个星星](https://github.com/Ovo307000/resume)

</div>

## ✨ 特性

<table>
  <tr>
    <td>
      <h3>🔄 响应式设计</h3>
      <p>完美适配所有设备尺寸，从手机到桌面端</p>
    </td>
    <td>
      <h3>🌍 多语言支持</h3>
      <p>内置中文和英文，易于扩展更多语言</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>🌓 主题切换</h3>
      <p>明亮/暗黑模式自由切换，支持系统主题跟随</p>
    </td>
    <td>
      <h3>🎨 现代化 UI</h3>
      <p>使用 Material UI 组件库和 Tailwind CSS</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>✨ 平滑动画</h3>
      <p>整合 Framer Motion 实现流畅过渡效果</p>
    </td>
    <td>
      <h3>🧩 模块化架构</h3>
      <p>采用组件化和单一职责原则设计</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>🌈 炫彩进度条</h3>
      <p>技能展示使用 RGB 无限渐变效果</p>
    </td>
    <td>
      <h3>📱 优雅导航</h3>
      <p>粘滞式导航栏和平滑滚动效果</p>
    </td>
  </tr>
</table>

## 🛠️ 技术栈

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Material_UI-0081CB?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white" alt="i18next" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

- **React**: 使用最新的 React 框架和 Hooks
- **TypeScript**: 类型安全的 JavaScript 超集
- **Material UI**: 流行的 React UI 组件库
- **Tailwind CSS**: 实用优先的 CSS 框架
- **i18next**: 强大的国际化解决方案
- **Framer Motion**: React 动画库
- **React Router**: 页面路由管理
- **Vite**: 现代前端构建工具

## 🚀 快速开始

### 前置条件

- Node.js 16.0 或更高版本
- npm 或 yarn

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/Ovo307000/resume.git

# 进入项目目录
cd resume

# 安装依赖
npm install
# 或者
yarn install

# 启动开发服务器
npm run dev
# 或者
yarn dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看你的应用。

## 📂 项目结构

```
resume/
├── public/               # 静态资源
├── src/                  # 源代码
│   ├── components/       # 可复用组件
│   │   ├── layout/       # 布局组件
│   │   ├── navigation/   # 导航组件
│   │   ├── ui/           # UI 组件
│   │   └── footer/       # 页脚组件
│   ├── contexts/         # React 上下文
│   ├── data/             # 数据文件
│   │   └── resumeData.json  # 简历数据
│   ├── hooks/            # 自定义 Hooks
│   ├── locales/          # 国际化文件
│   │   ├── en/           # 英文翻译
│   │   └── zh/           # 中文翻译
│   ├── pages/            # 页面组件
│   │   ├── home/         # 首页
│   │   ├── about/        # 关于我
│   │   ├── skills/       # 技能
│   │   ├── projects/     # 项目
│   │   ├── education/    # 教育经历
│   │   └── contact/      # 联系方式
│   ├── styles/           # 样式文件
│   ├── types/            # TypeScript 类型
│   ├── utils/            # 工具函数
│   ├── App.tsx           # 应用入口
│   └── main.tsx          # React 渲染入口
├── index.html            # HTML 模板
├── vite.config.ts        # Vite 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 依赖和脚本
```

## 📱 功能展示

<table>
  <tr>
    <td align="center">
      <img src="https://via.placeholder.com/300x200" alt="主页" width="300px">
      <br />
      <b>主页</b>
      <p>个人介绍和快速导航，炫酷动态背景</p>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/300x200" alt="关于我" width="300px">
      <br />
      <b>关于我</b>
      <p>个人背景、简介和精美头像展示</p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://via.placeholder.com/300x200" alt="技能" width="300px">
      <br />
      <b>技能</b>
      <p>技术技能和专长展示，动画进度条</p>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/300x200" alt="项目" width="300px">
      <br />
      <b>项目</b>
      <p>重要项目展示，精美卡片布局</p>
    </td>
  </tr>
</table>

## 🔄 变更日志

<details>
<summary>查看完整变更记录</summary>

### 2024-07-09 - UI增强与功能优化
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
</details>

## 🚢 部署

### GitHub Pages 部署

```bash
# 1. 安装 gh-pages 包
npm install gh-pages --save-dev

# 2. 在 package.json 添加 homepage 字段
# "homepage": "https://yourusername.github.io/resume"

# 3. 添加部署脚本
# "scripts": {
#   "predeploy": "npm run build",
#   "deploy": "gh-pages -d dist"
# }

# 4. 构建并部署
npm run deploy
```

### Vercel 部署

项目已配置 `vercel.json`，可以直接部署到 Vercel：

1. 在 [Vercel](https://vercel.com) 创建账号
2. 导入 GitHub 仓库
3. 使用默认设置，点击部署

## 📚 自定义指南

### 1. 编辑个人数据

修改 `src/data/resumeData.json` 文件，更新您的个人信息、教育背景、技能和项目经验。

### 2. 自定义主题

主题设置位于 `src/contexts/ThemeContext.tsx`，您可以根据个人喜好调整颜色和样式。

### 3. 添加新语言

1. 在 `src/locales` 创建新语言文件夹
2. 复制 `en/translation.json` 并翻译内容
3. 在 `src/locales/i18n.ts` 添加新语言支持

## 🤝 贡献

欢迎贡献！请随时提交 PR 或创建 issue。

1. Fork 这个仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 📄 许可

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 👨‍💻 作者

赵东安 - [@Ovo307000](https://github.com/Ovo307000)

---

<p align="center">
  <a href="https://github.com/Ovo307000/resume/stargazers">
    <img src="https://img.shields.io/github/stars/Ovo307000/resume?style=social" alt="给个星星" />
  </a>
  &nbsp;&nbsp;
  <a href="#">
    <img src="https://img.shields.io/badge/赞赏-支持作者-ff69b4.svg" alt="赞赏" />
  </a>
</p>
