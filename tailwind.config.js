/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 主题颜色
        primary: {
          light: '#4F46E5', // 紫蓝色
          DEFAULT: '#4338CA',
          dark: '#3730A3',
        },
        // RGB点缀色彩
        accent: {
          red: '#EF4444',
          green: '#10B981',
          blue: '#3B82F6',
        },
        // 暗色模式背景
        dark: {
          bg: '#121212',
          card: '#1E1E1E',
          border: '#2D2D2D',
        }
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
