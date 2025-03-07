import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface ConfettiProps {
  active?: boolean;
  duration?: number;
  pieces?: number;
  colors?: string[];
  gravity?: number;
  onComplete?: () => void;
}

/**
 * 彩带动画组件
 * 用于庆祝成功操作（如表单提交）的视觉反馈
 */
const Confetti: React.FC<ConfettiProps> = ({
  active = false,
  duration = 3000,
  pieces = 200,
  colors = [
    '#f44336', // 红
    '#e91e63', // 粉
    '#9c27b0', // 紫
    '#673ab7', // 深紫
    '#3f51b5', // 靛蓝
    '#2196f3', // 蓝
    '#03a9f4', // 浅蓝
    '#00bcd4', // 青
    '#009688', // 绿松石
    '#4caf50', // 绿
    '#8bc34a', // 浅绿
    '#cddc39', // 酸橙
    '#ffeb3b', // 黄
    '#ffc107', // 琥珀
    '#ff9800', // 橙
    '#ff5722'  // 深橙
  ],
  gravity = 0.2,
  onComplete
}) => {
  const { width, height } = useWindowSize();
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    if (active) {
      setIsActive(true);

      // 设置彩带动画持续时间
      const timer = setTimeout(() => {
        setIsActive(false);
        if (onComplete) onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration, onComplete]);

  if (!isActive) return null;

  return (
    <ReactConfetti
      width={width}
      height={height}
      numberOfPieces={pieces}
      recycle={false}
      colors={colors}
      gravity={gravity}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    />
  );
};

export default Confetti;
