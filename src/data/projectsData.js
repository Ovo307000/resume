const projectsData = [
  {
    name: "Lease System",
    nameZh: "租赁管理系统",
    url: "https://github.com/Ovo307000/lease",
    description: "A comprehensive Java-based lease management system",
    descriptionZh: "基于Java的全面租赁管理系统",
    longDescription: "This project is a Java-based enterprise lease management system that helps users manage property rentals and leases efficiently. Built with Spring Boot, JPA, and MySQL.",
    technologies: ["Java", "Spring Boot", "MySQL", "JPA", "Thymeleaf", "Docker"],
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "web",
    githubUrl: "https://github.com/Ovo307000/lease"
  },
  {
    name: "Chat App",
    nameZh: "聊天应用",
    url: "https://github.com/Ovo307000/Chat",
    description: "Real-time chat application with JavaFX frontend",
    descriptionZh: "基于JavaFX的实时聊天应用",
    longDescription: "A real-time chat application with client-server architecture, allowing users to communicate instantly. Features include user authentication, message history, and private messaging.",
    technologies: ["Java", "JavaFX", "Socket.IO", "MySQL", "Maven"],
    imageUrl: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "web",
    githubUrl: "https://github.com/Ovo307000/Chat"
  },
  {
    name: "Hmall E-commerce",
    nameZh: "Hmall电商平台",
    url: "https://github.com/Ovo307000/hmall",
    description: "Comprehensive e-commerce platform with modern architecture",
    descriptionZh: "全面的电子商务平台，采用现代架构",
    longDescription: "A microservice-based e-commerce platform with features like product management, user authentication, shopping cart functionality, order processing, and payment integration.",
    technologies: ["Java", "Spring Cloud", "MySQL", "Redis", "RabbitMQ", "Elasticsearch"],
    imageUrl: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "web",
    githubUrl: "https://github.com/Ovo307000/hmall"
  },
  {
    name: "Night-snack Simple",
    nameZh: "简易夜宵点餐系统",
    url: "https://github.com/Ovo307000/Night-snack-simple",
    description: "Python-based late-night food ordering system",
    descriptionZh: "基于Python的夜宵点餐系统",
    longDescription: "A simplified night snack ordering system built with Python, featuring menu management, ordering process, and basic customer data analytics.",
    technologies: ["Python", "Flask", "SQLite", "Bootstrap", "jQuery"],
    imageUrl: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "web",
    githubUrl: "https://github.com/Ovo307000/Night-snack-simple"
  },
  {
    name: "Core Java Learning",
    nameZh: "Java核心学习项目",
    url: "https://github.com/Ovo307000/CoreJava",
    description: "Repository for learning and practicing core Java concepts",
    descriptionZh: "用于学习和练习Java核心概念的仓库",
    longDescription: "A collection of Java examples demonstrating core concepts like OOP, data structures, algorithms, multithreading, and IO operations. Includes practical exercises and solutions.",
    technologies: ["Java", "JUnit", "Data Structures", "Algorithms"],
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "other",
    githubUrl: "https://github.com/Ovo307000/CoreJava"
  },
  {
    name: "Night Snake Game",
    nameZh: "夜蛇游戏",
    url: "https://github.com/Ovo307000/Night-snake",
    description: "C++ implementation of the classic Snake game with night theme",
    descriptionZh: "经典贪吃蛇游戏的C++实现，带有夜间主题",
    longDescription: "A C++ implementation of the classic Snake game with a night theme, featuring custom graphics, score tracking, and difficulty levels. Built using modern C++ and OpenGL for rendering.",
    technologies: ["C++", "OpenGL", "Game Development", "Graphics Programming"],
    imageUrl: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "other",
    githubUrl: "https://github.com/Ovo307000/Night-snake"
  },
  {
    name: "Personal Website",
    nameZh: "个人网站",
    url: "https://github.com/Ovo307000/ovo307000.github.io",
    description: "Personal portfolio website built with Vue.js",
    descriptionZh: "使用Vue.js构建的个人作品集网站",
    longDescription: "A responsive personal portfolio website showcasing projects, skills, and experience. Built with Vue.js and hosted on GitHub Pages with custom domain integration.",
    technologies: ["Vue.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "web",
    githubUrl: "https://github.com/Ovo307000/ovo307000.github.io"
  },
  {
    name: "Resume Generator",
    nameZh: "简历生成器",
    url: "https://github.com/Ovo307000/resume",
    description: "Modern resume builder with React and Material UI",
    descriptionZh: "使用React和Material UI构建的现代简历生成器",
    longDescription: "A web application for creating professional resumes with customizable templates. Features include real-time preview, export to PDF, and multiple language support.",
    technologies: ["React", "TypeScript", "Material UI", "PDF Generation", "i18n"],
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "web",
    githubUrl: "https://github.com/Ovo307000/resume"
  }
];

export default projectsData;
