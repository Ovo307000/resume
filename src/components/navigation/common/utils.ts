import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * 滚动方向类型
 */
export type ScrollDirection = 'up' | 'down' | 'none';

/**
 * 增强型滚动检测钩子
 * 提供更精确的滚动状态检测，包含方向、可见性和粘性状态
 */
export const useEnhancedScroll = (options: {
  threshold?: number;        // 滚动阈值
  offsetShowThreshold?: number; // 向上滚动多少距离显示
  stickyOffset?: number;     // 粘性定位偏移
  immediatelySticky?: boolean; // 是否立即启用粘性
} = {}) => {
  const {
    threshold = 100,
    offsetShowThreshold = 50,
    stickyOffset = 0,
    immediatelySticky = false
  } = options;

  // 定义状态
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('none');
  const [isVisible, setIsVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(immediatelySticky);
  const [isCompact, setIsCompact] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // 存储上一次滚动位置
  const lastScrollY = useRef(0);
  const lastDirectionChangePos = useRef(0);
  const ticking = useRef(false);

  // 处理滚动事件
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      // 优化滚动性能，使用requestAnimationFrame
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // 更新滚动位置
        setScrollY(currentScrollY);

        // 确定滚动方向
        const newDirection: ScrollDirection =
          currentScrollY > lastScrollY.current ? 'down' :
          currentScrollY < lastScrollY.current ? 'up' : 'none';

        // 当方向改变时，记录位置
        if (scrollDirection !== newDirection && newDirection !== 'none') {
          lastDirectionChangePos.current = currentScrollY;
          setScrollDirection(newDirection);
        }

        // 更新导航栏可见性
        // 向下滚动隐藏，向上滚动超过阈值显示
        if (newDirection === 'down' && currentScrollY > threshold) {
          setIsVisible(false);
        } else if (
          newDirection === 'up' &&
          (currentScrollY <= threshold ||
           Math.abs(lastDirectionChangePos.current - currentScrollY) > offsetShowThreshold)
        ) {
          setIsVisible(true);
        }

        // 更新粘性状态
        // 当滚动超过阈值时启用粘性
        setIsSticky(immediatelySticky || currentScrollY > stickyOffset);

        // 更新紧凑状态
        // 当滚动超过阈值时启用紧凑模式
        setIsCompact(currentScrollY > threshold);

        // 更新上一次滚动位置
        lastScrollY.current = currentScrollY;

        // 重置ticking标志
        ticking.current = false;
      });

      ticking.current = true;
    }
  }, [immediatelySticky, offsetShowThreshold, scrollDirection, stickyOffset, threshold]);

  // 监听滚动事件
  useEffect(() => {
    // 初始化时检查一次滚动位置
    handleScroll();

    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 清理监听
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    scrollDirection,
    isVisible,
    isSticky,
    isCompact,
    scrollY
  };
};

/**
 * 基础滚动检测钩子
 * 检测页面是否已滚动超过指定阈值
 */
export const useScrollDetection = (threshold: number = 20): boolean => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > threshold;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // 初始检查
    handleScroll();

    // 添加事件监听
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, threshold]);

  return scrolled;
};
