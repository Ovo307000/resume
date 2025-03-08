import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  mode?: 'default' | 'fade' | 'slide' | 'scale';
}

/**
 * 页面过渡动画组件，可以为页面提供过渡动画效果
 */
const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  mode = 'default'
}) => {
  // 不同模式的动画变量
  const variants = {
    default: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeInOut'
        }
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.3,
          ease: 'easeInOut'
        }
      }
    },
    fade: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          duration: 0.4
        }
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.3
        }
      }
    },
    slide: {
      initial: { opacity: 0, x: -20 },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut'
        }
      },
      exit: {
        opacity: 0,
        x: 20,
        transition: {
          duration: 0.3,
          ease: 'easeIn'
        }
      }
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.175, 0.885, 0.32, 1.275]
        }
      },
      exit: {
        opacity: 0,
        scale: 1.1,
        transition: {
          duration: 0.3,
          ease: 'easeIn'
        }
      }
    }
  };

  // 获取当前模式的变量
  const currentVariants = variants[mode];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={currentVariants}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
