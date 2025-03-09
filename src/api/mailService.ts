import axios from 'axios';

// 使用环境变量获取API密钥，而不是硬编码
// 这些变量应该在后端服务器上设置，而不是前端
// 这个文件应该在后端服务中使用，而不是直接在React前端
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const MAILGUN_BASE_URL = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}`;

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * 发送邮件的函数 - 在后端服务器上使用
 * @param emailData 邮件数据
 * @param recipientEmail 接收邮件的地址
 */
export const sendEmail = async (emailData: EmailData, recipientEmail: string) => {
  try {
    const formData = new FormData();
    formData.append('from', `${emailData.name} <${emailData.email}>`);
    formData.append('to', recipientEmail);
    formData.append('subject', emailData.subject);
    formData.append('text', `From: ${emailData.name}\nEmail: ${emailData.email}\n\n${emailData.message}`);

    const response = await axios({
      method: 'post',
      url: `${MAILGUN_BASE_URL}/messages`,
      auth: {
        username: 'api',
        password: MAILGUN_API_KEY || '',
      },
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * 前端安全发送邮件的函数
 * 通过调用后端API而不是直接调用Mailgun API来保证安全性
 * @param emailData 邮件数据
 * @param recipientEmail 接收邮件的地址
 */
export const sendEmailViaBackend = async (emailData: EmailData, recipientEmail: string) => {
  try {
    // 这里应该调用你的后端API，而不是直接调用Mailgun
    const response = await axios.post('/api/send-email', {
      ...emailData,
      recipientEmail,
    });

    return response.data;
  } catch (error) {
    console.error('Error sending email via backend:', error);
    throw error;
  }
};
