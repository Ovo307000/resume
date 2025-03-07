import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  delay?: number;
}

const Project: React.FC<ProjectProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  delay = 0
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          {t('projects.viewCode')}
        </a>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { t } = useTranslation();

  // 项目信息
  const projects = [
    {
      title: t('projects.sky.title'),
      description: t('projects.sky.description'),
      technologies: ['Spring Boot', 'SpringMVC', 'Redis', 'MySQL', 'Docker', 'Nginx', 'WebSocket', '阿里云OSS'],
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      githubUrl: 'https://github.com/Ovo307000/sky-take-out'
    },
    {
      title: t('projects.lease.title'),
      description: t('projects.lease.description'),
      technologies: ['Spring Boot', 'SpringMVC', 'MyBatis/Plus', 'Redis', 'MySQL', 'MinIO', 'Nginx', 'WebSocket', 'Docker'],
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      githubUrl: 'https://github.com/Ovo307000/lease'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-dark-bg/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="relative">
              {t('projects.title')}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-red via-accent-blue to-accent-green transform translate-y-1"></span>
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Project
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              imageUrl={project.imageUrl}
              githubUrl={project.githubUrl}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
