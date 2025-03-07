import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface EducationItemProps {
  name: string;
  degree: string;
  date: string;
  delay?: number;
}

const EducationItem: React.FC<EducationItemProps> = ({ name, degree, date, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex relative hover-lift"
    >
      {/* Left timeline */}
      <div className="flex flex-col items-center mr-6">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-accent-red via-accent-blue to-accent-green"></div>
        <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
      </div>

      {/* Content */}
      <div className="card mb-10 flex-grow">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">{degree}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
      </div>
    </motion.div>
  );
};

const Education: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="relative">
              {t('education.title')}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-red via-accent-blue to-accent-green transform translate-y-1"></span>
            </span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <EducationItem
            name={t('education.college1.name')}
            degree={t('education.college1.degree')}
            date={t('education.college1.date')}
            delay={0.1}
          />
          <EducationItem
            name={t('education.college2.name')}
            degree={t('education.college2.degree')}
            date={t('education.college2.date')}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
};

export default Education;
