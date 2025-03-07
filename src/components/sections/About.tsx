import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-dark-bg/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="relative">
              {t('about.title')}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-red via-accent-blue to-accent-green transform translate-y-1"></span>
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 mx-auto overflow-hidden rounded-full rgb-border">
                <div className="w-full h-full bg-gradient-to-b from-primary/80 to-primary-dark/80 flex items-center justify-center">
                  <span className="text-7xl text-white">赵</span>
                </div>
              </div>

              <div className="absolute -bottom-5 right-1/4 bg-white dark:bg-dark-card p-3 rounded-lg shadow-lg light-shimmer">
                <span className="text-primary font-bold">{t('header.skills')}</span>
              </div>

              <div className="absolute -top-5 right-1/4 bg-white dark:bg-dark-card p-3 rounded-lg shadow-lg light-shimmer">
                <span className="text-primary font-bold">Java</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {t('about.description')}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Spring</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Java</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>MySQL</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Docker</span>
              </div>
            </div>

            <a
              href="#skills"
              className="inline-block btn btn-outline"
            >
              {t('header.skills')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
