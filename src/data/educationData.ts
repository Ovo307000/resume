export interface LocalizedText {
  en: string;
  zh: string;
}

export interface EducationDataItem {
  institutionName: LocalizedText;
  studyType: LocalizedText;
  areaOfStudy: LocalizedText;
  startDate: Date;
  endDate: Date | null;
  location: LocalizedText;
  description: LocalizedText;
  courses: LocalizedText[];
  activities: LocalizedText[];
  achievements: LocalizedText[];
  skills: LocalizedText[];
  currentFocus: LocalizedText[];
  goals: LocalizedText[];
  logoUrl: string;
}

const educationData: EducationDataItem[] = [
  {
    institutionName: {
      en: "Anhui Finance and Economics University",
      zh: "安徽财经大学"
    },
    studyType: {
      en: "Bachelor's Degree",
      zh: "学士学位"
    },
    areaOfStudy: {
      en: "Computer Science and Technology",
      zh: "计算机科学与技术"
    },
    startDate: new Date(2024, 2, 1), // 2024年3月
    endDate: null, // 在读
    location: {
      en: "Bengbu, Anhui, China",
      zh: "中国安徽蚌埠"
    },
    description: {
      en: "Currently pursuing a Bachelor's degree in Computer Science and Technology, focusing on advanced programming and system design.",
      zh: "目前正在攻读计算机科学与技术学士学位，专注于高级编程和系统设计。"
    },
    courses: [
      { en: "Advanced Algorithms", zh: "高级算法" },
      { en: "System Architecture", zh: "系统架构" },
      { en: "Cloud Computing", zh: "云计算" },
      { en: "Database Systems", zh: "数据库系统" }
    ],
    activities: [
      { en: "Computer Science Club", zh: "计算机科学俱乐部" },
      { en: "Open Source Projects Contributor", zh: "开源项目贡献者" }
    ],
    achievements: [
      { en: "Dean's List", zh: "院长嘉许名单" }
    ],
    skills: [
      { en: "Java", zh: "Java" },
      { en: "Spring", zh: "Spring" },
      { en: "MySQL", zh: "MySQL" },
      { en: "REST API", zh: "REST API" }
    ],
    currentFocus: [
      { en: "Distributed Systems", zh: "分布式系统" },
      { en: "Cloud Native Applications", zh: "云原生应用" },
      { en: "DevOps Practices", zh: "DevOps实践" }
    ],
    goals: [
      { en: "Master microservices architecture", zh: "掌握微服务架构" },
      { en: "Contribute to major open source projects", zh: "为主要开源项目做贡献" },
      { en: "Develop expertise in cloud computing", zh: "发展云计算专业知识" }
    ],
    logoUrl: "/images/education/afeu.png" // 请确保有这个图片
  },
  {
    institutionName: {
      en: "Anhui Industry and Trade Vocational College",
      zh: "安徽工贸学院"
    },
    studyType: {
      en: "Associate Degree",
      zh: "专科"
    },
    areaOfStudy: {
      en: "Software Technology",
      zh: "软件技术"
    },
    startDate: new Date(2020, 9, 1), // 2020年10月
    endDate: new Date(2023, 5, 1), // 2023年6月
    location: {
      en: "Anhui, China",
      zh: "中国安徽"
    },
    description: {
      en: "Focused on software development techniques, including front-end and back-end technologies, with an emphasis on practical project implementation.",
      zh: "专注于软件开发技术，包括前端和后端技术，注重实际项目实施。"
    },
    courses: [
      { en: "Programming Fundamentals", zh: "编程基础" },
      { en: "Database Management", zh: "数据库管理" },
      { en: "Web Development", zh: "Web开发" },
      { en: "Object-Oriented Programming", zh: "面向对象编程" }
    ],
    activities: [
      { en: "Software Development Club", zh: "软件开发俱乐部" },
      { en: "College Coding Competition", zh: "学院编程比赛" }
    ],
    achievements: [
      { en: "Outstanding Student Award", zh: "优秀学生奖" },
      { en: "Best Project Design", zh: "最佳项目设计" }
    ],
    skills: [
      { en: "C#", zh: "C#" },
      { en: "Java", zh: "Java" },
      { en: "C", zh: "C" },
      { en: "Python", zh: "Python" },
      { en: "TypeScript", zh: "TypeScript" },
      { en: "MySQL", zh: "MySQL" }
    ],
    currentFocus: [],
    goals: [],
    logoUrl: "/images/education/aitvc.png" // 请确保有这个图片
  }
];

export default educationData;
