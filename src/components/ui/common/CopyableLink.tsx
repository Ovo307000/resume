import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FiCopy, FiExternalLink } from 'react-icons/fi';
import AnimatedLink from './AnimatedLink';
import { motion, AnimatePresence } from 'framer-motion';

interface CopyableLinkProps {
  value: string | undefined;
  label?: string; // 用于复制成功消息
  to?: string; // 跳转链接
  copyIcon?: React.ReactNode;
  externalIcon?: React.ReactNode;
  linkColor?: string;
  fontSize?: string | number;
  isExternal?: boolean; // 是否为外部链接
  onCopy?: (text: string, label: string) => void; // 复制回调，如果不提供则不启用复制功能
}

/**
 * 增强型链接组件
 * 支持复制功能或外部链接，在悬停时显示相应图标
 */
const CopyableLink: React.FC<CopyableLinkProps> = ({
  value,
  label = '',
  to,
  copyIcon = <FiCopy size={14} />,
  externalIcon = <FiExternalLink size={14} />,
  linkColor,
  fontSize = '0.9rem',
  isExternal = false,
  onCopy
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!value) return null;

  // 确定链接目标
  const linkTarget = to || '#';

  // 确定是复制功能还是跳转功能
  const isCopyFunction = !!onCopy;

  // 处理点击事件
  const handleClick = (event?: React.MouseEvent<HTMLElement>) => {
    if (isCopyFunction && event) {
      event.preventDefault();
      onCopy?.(value, label);
    }
  };

  // 处理悬停事件
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // 显示的图标
  const icon = isCopyFunction ? copyIcon : isExternal ? externalIcon : null;

  return (
    <Box
      sx={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatedLink
        to={linkTarget}
        variant="underline"
        fontSize={fontSize}
        color={linkColor}
        showExternalIcon={false}
        onClick={handleClick}
      >
        {value}
      </AnimatedLink>

      {icon && (
        <Box
          sx={{
            position: 'absolute',
            right: -22,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, scale: 0, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0, x: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                  mass: 0.8
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '4px',
                }}
              >
                {icon}
              </motion.span>
            )}
          </AnimatePresence>
        </Box>
      )}
    </Box>
  );
};

export default CopyableLink;
