# 邮件发送后端服务

这是一个简单的Express后端服务，用于处理简历网站的邮件发送功能。它使用Mailgun API安全地发送邮件，避免在前端暴露API密钥。

## 安装

1. 安装依赖：

```bash
cd server
npm install
```

2. 复制环境变量示例文件并填入你的Mailgun API信息：

```bash
cp .env.example .env
```

然后编辑`.env`文件，填入你的Mailgun API密钥、域名和接收邮件的地址。

## 配置

在`.env`文件中设置以下变量：

- `MAILGUN_API_KEY`: 你的Mailgun API密钥
- `MAILGUN_DOMAIN`: 你的Mailgun域名
- `RECIPIENT_EMAIL`: 接收联系表单邮件的邮箱地址
- `PORT`: (可选) 服务器端口，默认为5000
- `NODE_ENV`: (可选) 环境，如'development'或'production'

## 运行服务器

### 开发模式

```bash
npm run dev
```

### 生产模式

```bash
npm start
```

## 与前端集成

前端应该通过发送POST请求到`/api/send-email`端点来使用这个服务器。请求体应包含以下字段：

- `name`: 发送者姓名
- `email`: 发送者邮箱
- `subject`: 邮件主题
- `message`: 邮件内容

示例：

```javascript
const response = await axios.post('/api/send-email', {
  name: '张三',
  email: 'zhangsan@example.com',
  subject: '咨询问题',
  message: '您好，我想了解更多关于您的服务...'
});
```

## 安全性说明

- 这个后端服务负责安全地存储并使用Mailgun API密钥
- 绝不要在前端代码中包含API密钥
- 确保`.env`文件被添加到`.gitignore`中，避免将敏感信息提交到版本控制系统

## 部署

建议将此服务部署到支持Node.js的平台，如：

- Heroku
- Vercel
- Netlify
- AWS Elastic Beanstalk
- DigitalOcean
