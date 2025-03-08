import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface ProfileAvatarProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  imageSrc: string;
  alt?: string;
  animate?: boolean;
  showBorder?: boolean;
  sx?: SxProps<Theme>;
  linkTo?: string;
}

/**
 * 个人头像组件
 * 显示用户头像，支持不同尺寸和动画效果
 */
const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 'medium',
  imageSrc,
  alt,
  animate = false,
  showBorder = true,
  sx = {},
  linkTo,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  // 使用翻译或默认值
  const altText = alt || t('home.avatar_alt', '个人头像');

  // 计算头像尺寸
  const getSizeValue = () => {
    switch (size) {
      case 'small':
        return { width: 36, height: 36 };
      case 'medium':
        return { width: 50, height: 50 };
      case 'large':
        return { width: { xs: 160, md: 220 } };
      case 'xlarge':
        return { width: { xs: 200, md: 360 } };
      default:
        return { width: 50, height: 50 };
    }
  };

  // 边框样式
  const borderStyle = showBorder ? {
    border: `4px solid ${theme === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.05)'}`,
    boxShadow: theme === 'dark'
      ? '0 10px 30px rgba(0, 0, 0, 0.3)'
      : '0 10px 30px rgba(0, 0, 0, 0.1)',
  } : {};

  // 动画变体
  const avatarVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    hover: animate ? {
      scale: 1.05,
      transition: { duration: 0.3 }
    } : {},
    tap: animate ? {
      scale: 0.95,
      transition: { duration: 0.2 }
    } : {}
  };

  // 创建头像图片元素
  const avatarImage = (
    <Box
      component="img"
      src={imageSrc}
      alt={altText}
      sx={{
        borderRadius: '50%',
        objectFit: 'cover',
        height: 'auto',
        aspectRatio: '1/1',
        ...getSizeValue(),
        ...borderStyle,
        ...sx
      }}
    />
  );

  // 如果不需要动画或链接，直接返回头像图片
  if (!animate && !linkTo) {
    return avatarImage;
  }

  // 创建带有动画效果的头像
  const animatedAvatar = (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover={animate ? "hover" : undefined}
      whileTap={animate ? "tap" : undefined}
      variants={avatarVariants}
    >
      {avatarImage}
    </motion.div>
  );

  // 如果有链接，包装在链接中
  if (linkTo) {
    return (
      <Box
        component="a"
        href={linkTo}
        sx={{
          display: 'inline-block',
          textDecoration: 'none',
          cursor: 'pointer'
        }}
      >
        {animatedAvatar}
      </Box>
    );
  }

  return animatedAvatar;
};

export default ProfileAvatar;
