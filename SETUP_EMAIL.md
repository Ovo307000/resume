# 安全实现联系表单邮件功能

本文档提供了关于如何安全地实现联系表单邮件功能的详细说明，使用Mailgun作为邮件发送服务。

## 架构概述

此实现采用前后端分离的架构：

1. **前端**：React应用程序提供联系表单UI并收集用户输入
2. **后端**：Express服务器处理API请求并安全地调用Mailgun API
3. **安全性**：敏感的API密钥仅存储在后端服务器，从不暴露到前端

## 设置说明

### 步骤1：设置Mailgun账户

1. 注册[Mailgun](https://www.mailgun.com/)账户
2. 验证你的域名或使用Mailgun提供的沙盒域名
3. 获取API密钥和域名信息

### 步骤2：设置后端服务器

1. 首先创建并进入server目录：
   ```bash
   mkdir -p server
   cd server
   ```

2. 安装后端依赖：
   ```bash
   npm install express cors body-parser axios dotenv form-data
   npm install --save-dev nodemon
   ```

3. 复制环境变量示例文件并配置：
   ```bash
   cp .env.example .env
   ```

4. 编辑`.env`文件，填入你的实际Mailgun信息：
   ```
   MAILGUN_API_KEY=your_actual_mailgun_api_key
   MAILGUN_DOMAIN=your_mailgun_domain.com
   RECIPIENT_EMAIL=your_email@example.com
   ```

### 步骤3：配置前端项目

1. 更新Vite配置以添加代理（已完成）
2. 确保前端联系表单向`/api/send-email`发送请求（已完成）

## 启动开发环境

需要同时运行前端和后端服务：

### 启动后端服务

```bash
cd server
npm run dev
```

### 启动前端服务

在另一个终端：
```bash
npm run dev
```

## 生产环境部署

### 选项1：单独部署

你可以将前端和后端部署到不同的服务上：

1. 前端：Netlify, Vercel, GitHub Pages等
2. 后端：Heroku, Render, DigitalOcean, AWS等

### 选项2：集成部署

将后端代码配置为同时提供API和静态前端文件（已在server.js中配置）：

1. 构建前端：
   ```bash
   npm run build
   ```

2. 部署后端，它将自动提供前端构建文件

## 安全注意事项

- **绝不要在前端代码中包含API密钥**
- 确保`.env`文件被添加到`.gitignore`中
- 定期更换API密钥以增强安全性
- 考虑添加速率限制以防止API滥用

## 故障排除

如果遇到问题：

1. 检查后端服务器日志
2. 验证Mailgun API密钥和域名是否正确
3. 确保代理配置正确（前端请求能够到达后端）
4. 检查Mailgun控制台中的日志和发送历史

## 自定义选项

你可以扩展此实现以添加更多功能：

- 邮件模板：使用HTML模板创建更漂亮的邮件
- 垃圾邮件防护：添加reCAPTCHA或其他机制
- 文件附件：允许用户在联系表单中附加文件
- 自动回复：向表单提交者发送确认邮件
