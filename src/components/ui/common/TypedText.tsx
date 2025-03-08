import React, { useState, useEffect, useRef } from 'react';

interface TypedTextProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  startDelay?: number;
  backDelay?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorChar?: string;
  className?: string;
}

/**
 * 简易打字机效果组件
 * 提供类似于typed.js的文字打字效果
 */
const TypedText: React.FC<TypedTextProps> = ({
  strings,
  typeSpeed = 70,
  backSpeed = 50,
  startDelay = 300,
  backDelay = 1500,
  loop = false,
  showCursor = true,
  cursorChar = '|',
  className
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentStringIndex = useRef(0);

  // 打字效果逻辑
  useEffect(() => {
    // 初始延迟
    let timer: NodeJS.Timeout;

    if (currentText === '' && !isDeleting && !isPaused && currentIndex === 0) {
      timer = setTimeout(() => {
        setCurrentIndex(1);
      }, startDelay);
      return () => clearTimeout(timer);
    }

    const text = strings[currentStringIndex.current];

    // 如果暂停中，不执行任何操作
    if (isPaused) return;

    // 打字过程
    if (!isDeleting && currentIndex < text.length) {
      timer = setTimeout(() => {
        setCurrentText(text.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }, typeSpeed);
    }
    // 删除过程
    else if (isDeleting && currentIndex > 0) {
      timer = setTimeout(() => {
        setCurrentText(text.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
      }, backSpeed);
    }
    // 完成打字，准备删除
    else if (!isDeleting && currentIndex >= text.length) {
      // 如果不需要循环，且是最后一个字符串，则不执行删除
      if (!loop && currentStringIndex.current === strings.length - 1) {
        return;
      }

      setIsPaused(true);
      pauseTimeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
        setIsPaused(false);
      }, backDelay);
    }
    // 完成删除，准备打下一个字符串
    else if (isDeleting && currentIndex <= 0) {
      setIsDeleting(false);
      setIsPaused(true);
      currentStringIndex.current = (currentStringIndex.current + 1) % strings.length;

      pauseTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, startDelay);
    }

    return () => {
      clearTimeout(timer);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [currentText, currentIndex, isDeleting, isPaused, strings, typeSpeed, backSpeed, startDelay, backDelay, loop]);

  return (
    <span className={className}>
      {currentText}
      {showCursor && <span className="typed-cursor">{cursorChar}</span>}
    </span>
  );
};

export default TypedText;
