import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-2"
          >
            {t('hero.greeting')}
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="relative inline-block">
              赵东安
              <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-accent-red via-accent-blue to-accent-green opacity-30 rounded"></span>
            </span>
          </motion.h1>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold mb-6 bg-gradient-to-r from-accent-red via-accent-blue to-accent-green text-transparent bg-clip-text animate-gradient"
          >
            {t('hero.title')}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mb-8"
          >
            {t('hero.summary')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#contact"
              className="btn btn-primary rgb-border px-8 py-3"
            >
              {t('contact.getInTouch')}
            </a>
            <a
              href="https://github.com/Ovo307000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline px-8 py-3"
            >
              GitHub
            </a>
          </motion.div>
        </div>
      </div>

      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-gradient-to-bl from-accent-blue/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-gradient-to-tr from-accent-red/20 to-transparent rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
