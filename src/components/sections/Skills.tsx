import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SkillGroupProps {
  title: string;
  skills: string[];
  delay?: number;
}

const SkillGroup: React.FC<SkillGroupProps> = ({ title, skills, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card hover:shadow-xl dark:hover:shadow-gray-900/40 transition-shadow"
    >
      <h3 className="text-xl font-semibold mb-4">
        <span className="relative">
          {title}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-red via-accent-blue to-accent-green transform translate-y-1"></span>
        </span>
      </h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-4 h-4 text-accent-blue mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const { t } = useTranslation();

  const programmingLanguages = ['JAVA', 'C#', 'C', 'Python', 'TypeScript'];
  const frameworks = ['Spring', 'Spring JPA', 'Spring MVC', 'Spring Boot', 'RESTAPI', 'Maven', 'Gradle', 'React.js', 'Vue.js', 'TailWind CSS'];
  const tools = ['MySql', 'PostgreSql', 'MongoDB', 'Redis', 'Git', 'Linux', 'Docker', 'Stable Diffusion'];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="relative">
              {t('skills.title')}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-red via-accent-blue to-accent-green transform translate-y-1"></span>
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <SkillGroup title={t('skills.programmingLanguages')} skills={programmingLanguages} delay={0.1} />
          <SkillGroup title={t('skills.devFrameworks')} skills={frameworks} delay={0.2} />
          <SkillGroup title={t('skills.devTools')} skills={tools} delay={0.3} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="card rgb-border p-8"
        >
          <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-accent-red via-accent-blue to-accent-green text-transparent bg-clip-text">
            {t('skills.overview')}
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium mb-2">Java & Spring</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Java 基础：熟悉Java编程语言，熟悉面向对象编程思想（OOP），包括封装、继承、多态等特性，并能灵活运用到实际项目开发中。熟悉Java常用集合框架（Collection、List、Set、Map），能够根据不同的业务场景选择合适的数据结构，提高程序性能。熟悉多线程和异步编程，了解线程池、锁机制等相关知识，能够解决并发环境下的数据安全问题。Spring 框架：深入理解Spring框架的核心概念，包括IoC（控制反转）和AOP（面向切面编程），能够灵活运用其特性进行模块化设计和解耦。熟练使用Spring MVC构建高效的RESTful API，具备良好的API设计能力，能够根据需求设计清晰、易用的接口。熟悉Spring Data JPA和MyBatis等ORM框架，能够根据项目需求选择合适的框架进行数据访问，提高开发效率。
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-2">Others</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Linux：熟悉Linux常用命令，能够进行服务器日常维护和故障排查，并能编写Shell脚本进行自动化部署和监控。熟悉Nginx和Tomcat的配置和优化。Git：熟练使用Git进行版本控制，熟悉Gitflow工作流，能够高效地进行代码管理和团队协作。Docker:熟悉Docker的基本概念和常用命令，能够编写Dockerfile和使用Docker Compose构建和管理容器化应用。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
