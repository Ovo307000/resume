import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { FiGlobe } from 'react-icons/fi';

interface FlagIconProps {
  countryCode: string;
  size?: number;
  sx?: SxProps<Theme>;
}

// 国旗表情符号映射
const FLAG_EMOJIS: Record<string, string> = {
  US: '🇺🇸',
  CN: '🇨🇳',
  JP: '🇯🇵',
  GLOBE: '🌐' // 全局图标
};

/**
 * 国旗图标组件
 * 显示特定国家/地区的国旗表情或全局图标
 */
const FlagIcon: React.FC<FlagIconProps> = ({
  countryCode = 'GLOBE',
  size = 24,
  sx = {}
}) => {
  // 如果国家代码不在预定义的映射中，使用全局图标
  const flagEmoji = FLAG_EMOJIS[countryCode] || <FiGlobe size={size * 0.8} />;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size ? `${size}px` : '24px',
        lineHeight: 1,
        ...sx
      }}
    >
      {typeof flagEmoji === 'string' ? (
        <span role="img" aria-label={`${countryCode} flag`}>
          {flagEmoji}
        </span>
      ) : (
        flagEmoji
      )}
    </Box>
  );
};

export default FlagIcon;
