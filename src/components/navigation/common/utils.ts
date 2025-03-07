import { useEffect, useState, useCallback } from 'react';

/**
 * 使用滚动监听的Hook
 * @param threshold 滚动阈值
 * @returns 是否已滚动超过阈值
 */
export const useScrollDetection = (threshold: number = 20): boolean => {
  const [scrolled, setScrolled] = useState(() => {
    // 初始化时就检查滚动位置
    return window.scrollY > threshold;
  });

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    setScrolled(offset > threshold);
  }, [threshold]);

  useEffect(() => {
    // 组件挂载时立即检查一次
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return scrolled;
};
