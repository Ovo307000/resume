import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Box, keyframes } from '@mui/material';

interface HeadroomNavProps {
  children: ReactNode;
  // 向下滚动时是否隐藏
  pinStart?: number;      // 开始固定的滚动位置
  upTolerance?: number;   // 向上滚动多少像素时显示
  downTolerance?: number; // 向下滚动多少像素时隐藏
  style?: React.CSSProperties;
  className?: string;
  zIndex?: number;
  disable?: boolean;      // 是否禁用头部收起效果
  wrapperStyle?: React.CSSProperties;
  unfixStyle?: React.CSSProperties;
  fixedStyle?: React.CSSProperties;
}

// 定义动画
const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

/**
 * 类似Headroom的导航栏组件
 * 根据滚动方向控制导航栏的显示和隐藏
 */
const HeadroomNav: React.FC<HeadroomNavProps> = ({
  children,
  pinStart = 0,
  upTolerance = 5,
  downTolerance = 5,
  style = {},
  className = '',
  zIndex = 1000,
  disable = false,
  wrapperStyle = {},
  unfixStyle = {},
  fixedStyle = {}
}) => {
  const [state, setState] = useState({
    // 当前滚动状态
    state: 'unfixed', // unfixed, fixed, unpinned, pinned
    translateY: 0,
    className: 'headroom headroom--unfixed'
  });

  // 记录滚动方向和位置
  const lastKnownScrollY = useRef(0);
  const scrollDirection = useRef('none');
  const navRef = useRef<HTMLDivElement>(null);
  const navHeight = useRef(0);

  // 更新导航栏高度
  useEffect(() => {
    if (navRef.current) {
      navHeight.current = navRef.current.offsetHeight;
    }
  }, []);

  // 处理滚动事件
  useEffect(() => {
    if (disable) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastKnownScrollY.current ? 'down' : 'up';
      const distanceScrolled = Math.abs(currentScrollY - lastKnownScrollY.current);

      // 只有当滚动超过容忍度时才更新滚动方向
      if (distanceScrolled > (direction === 'down' ? downTolerance : upTolerance)) {
        scrollDirection.current = direction;
      }

      // 更新状态
      if (currentScrollY <= pinStart) {
        // 页面顶部，不固定
        if (state.state !== 'unfixed') {
          setState({
            state: 'unfixed',
            translateY: 0,
            className: 'headroom headroom--unfixed'
          });
        }
      } else if (scrollDirection.current === 'down' &&
                 distanceScrolled > downTolerance &&
                 state.state !== 'unpinned') {
        // 向下滚动，隐藏导航
        setState({
          state: 'unpinned',
          translateY: -navHeight.current,
          className: 'headroom headroom--unpinned'
        });
      } else if (scrollDirection.current === 'up' &&
                distanceScrolled > upTolerance &&
                state.state !== 'pinned') {
        // 向上滚动，显示导航
        setState({
          state: 'pinned',
          translateY: 0,
          className: 'headroom headroom--pinned'
        });
      }

      lastKnownScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [disable, downTolerance, pinStart, state.state, upTolerance]);

  // 合并样式
  const getStyles = () => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex,
      ...style
    };

    const transitionStyles: React.CSSProperties = {
      transition: 'all .2s ease-in-out'
    };

    // 根据状态返回不同样式
    switch (state.state) {
      case 'unfixed':
        return {
          ...baseStyles,
          position: 'absolute',
          transform: 'translateY(0)',
          ...unfixStyle
        };
      case 'fixed':
      case 'pinned':
        return {
          ...baseStyles,
          ...transitionStyles,
          transform: 'translateY(0)',
          animation: `${slideDown} 0.3s forwards`,
          ...fixedStyle
        };
      case 'unpinned':
        return {
          ...baseStyles,
          ...transitionStyles,
          transform: `translateY(${state.translateY}px)`,
          animation: `${slideUp} 0.3s forwards`,
        };
      default:
        return baseStyles;
    }
  };

  return (
    <Box
      ref={navRef}
      className={`${className} ${state.className}`}
      sx={{
        ...getStyles(),
        ...wrapperStyle
      }}
    >
      {children}
    </Box>
  );
};

export default HeadroomNav;
