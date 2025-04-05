import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 从环境变量中读取基础路径，默认为'/'，适应GitHub Pages部署
  base: process.env.NODE_ENV === 'production' ? '/resume/' : '/',
  server: {
    // 添加代理配置，将/api请求代理到后端服务
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      },
    },
    allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', '*.ngrok-free.app']
  },
  // 添加Vercel分析和速度洞察支持
  build: {
    sourcemap: true, // 启用sourcemap以支持速度洞察
  }
})
