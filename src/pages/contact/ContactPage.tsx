import React from 'react';
import {
  Container,
  Box
} from '@mui/material';
import ContactPage from '../../components/ui/contact/ContactPage';
import resumeData from '../../data/resumeData.json';
import EnhancedPageTitle from '../../components/ui/common/EnhancedPageTitle';
import { useTranslation } from 'react-i18next';

// 个人数据
const userData = {
  name: resumeData.basics.name,
  email: resumeData.basics.email,
  phone: resumeData.basics.phone,
  github: resumeData.basics.github,
  githubUsername: resumeData.basics.githubUsername,
  wechat: resumeData.basics.wechat,
  location: "安徽合肥",
  resume: "/resume.pdf"
};

/**
 * 联系页面
 */
const ContactPageContainer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 1, md: 2 },
        minHeight: 'calc(100vh - 180px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <EnhancedPageTitle
        title={t('contact.title', '联系我')}
        subtitle={t('contact.subtitle', '随时保持联系，了解更多合作机会')}
        textAlign="center"
        withAnimation={true}
      />

      {/* 联系卡片 */}
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ContactPage userData={userData} />
      </Box>
    </Container>
  );
};

export default ContactPageContainer;
