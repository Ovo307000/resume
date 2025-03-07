import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  delay?: number;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, value, href, delay = 0 }) => {
  const content = (
    <>
      <div className="text-primary dark:text-primary-light mb-3">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{value}</p>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card text-center"
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
};

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const emailIcon = (
    <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );

  const phoneIcon = (
    <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );

  const githubIcon = (
    <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );

  const wechatIcon = (
    <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2C4.306 2 .693 4.949.693 8.587c0 1.92.843 3.589 2.245 4.807l-.584 1.87c-.059.17-.023.357.095.486a.466.466 0 0 0 .309.117.514.514 0 0 0 .216-.05l2.323-1.157c1.046.289 2.147.444 3.293.444 4.385 0 7.998-2.949 7.998-6.587C16.488 4.949 13.075 2 8.691 2zm-1.21 3.91c.566 0 1.025.459 1.025 1.025 0 .566-.459 1.025-1.025 1.025s-1.025-.459-1.025-1.025c0-.566.46-1.025 1.025-1.025zm4.882 0c.566 0 1.025.459 1.025 1.025 0 .566-.459 1.025-1.025 1.025-.565 0-1.025-.459-1.025-1.025 0-.566.46-1.025 1.025-1.025zM21.308 22c3.649 0 6.653-2.454 6.653-5.48 0-3.025-3.004-5.48-6.653-5.48-3.65 0-6.654 2.454-6.654 5.48S17.657 22 21.308 22zM17.85 13.303c.47 0 .852.382.852.852 0 .47-.382.852-.852.852s-.852-.382-.852-.852c0-.47.382-.852.852-.852zm6.199 0c.47 0 .852.382.852.852 0 .47-.382.852-.852.852s-.852-.382-.852-.852c0-.47.382-.852.852-.852zm.97 3.854l1.303.644c.128.064.17.215.089.339-.064.109-.196.154-.305.109l-1.519-.753a.381.381 0 0 0-.191-.035 4.769 4.769 0 0 1-1.549.271c-2.219 0-4.032-1.304-4.032-2.915s1.813-2.914 4.032-2.914 4.032 1.304 4.032 2.914c0 .853-.595 1.622-1.531 2.188-.138.082-.348.003-.33-.172.006-.045.015-.089.025-.134.042-.189.273-.279.445-.186.644.354 1.028.851 1.028 1.397 0 .992-1.295 1.809-2.897 1.871-.137.005-.232-.13-.17-.257a.252.252 0 0 1 .145-.137c.662-.189 1.147-.584 1.147-1.052 0-.307-.203-.59-.548-.816a.233.233 0 0 1-.096-.191c0-.069.036-.135.096-.171z" />
    </svg>
  );

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-bg/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="relative">
              {t('contact.title')}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-red via-accent-blue to-accent-green transform translate-y-1"></span>
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <ContactItem
            icon={emailIcon}
            title={t('contact.email')}
            value="solowzl@outlook.com"
            href="mailto:solowzl@outlook.com"
            delay={0.1}
          />
          <ContactItem
            icon={phoneIcon}
            title={t('contact.phone')}
            value="19154085798"
            href="tel:19154085798"
            delay={0.2}
          />
          <ContactItem
            icon={githubIcon}
            title={t('contact.github')}
            value="github.com/Ovo307000"
            href="https://github.com/Ovo307000"
            delay={0.3}
          />
          <ContactItem
            icon={wechatIcon}
            title={t('contact.wechat')}
            value="za1-37"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
