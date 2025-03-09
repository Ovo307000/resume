const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const FormData = require('form-data');

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// Mailgun配置 - 从环境变量获取敏感信息
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL; // 接收邮件的地址

// 验证必要的环境变量
if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !RECIPIENT_EMAIL) {
  console.error('Missing required environment variables. Please check your .env file.');
  process.exit(1);
}

// 发送邮件的API端点
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // 验证请求数据
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: '所有字段都是必填的' });
  }

  try {
    // 构建FormData
    const formData = new FormData();
    formData.append('from', `${name} <${email}>`);
    formData.append('to', RECIPIENT_EMAIL);
    formData.append('subject', subject);
    formData.append('text', `From: ${name}\nEmail: ${email}\n\n${message}`);

    // 发送邮件请求到Mailgun
    const response = await axios({
      method: 'post',
      url: `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
      auth: {
        username: 'api',
        password: MAILGUN_API_KEY,
      },
      data: formData,
      headers: formData.getHeaders(),
    });

    // 成功发送
    console.log('Email sent successfully:', response.data);
    return res.json({ success: true, message: '邮件发送成功' });
  } catch (error) {
    // 处理错误
    console.error('Error sending email:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: '发送邮件时出错',
      error: error.response?.data || error.message,
    });
  }
});

// 在生产环境中提供前端构建文件
if (process.env.NODE_ENV === 'production') {
  // 静态文件
  app.use(express.static(path.join(__dirname, '../dist')));

  // 所有未匹配的请求都返回index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
