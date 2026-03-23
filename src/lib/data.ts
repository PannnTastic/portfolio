export const userData = {
  name: "Ahmad Alfan Alfian Irfan",
  username: "PannnTastic",
  nickname: "PannnTastic",
  title: "Information Technology Student & Full Stack Developer",
  bio: "Information Technology student at Universitas Muhammadiyah Yogyakarta, specializing in backend development and machine learning. Passionate about building scalable systems and intelligent applications.",
  location: "Yogyakarta, Indonesia",
  email: "pannntastic@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/PannnTastic",
  github: "https://github.com/PannnTastic",
  linkedin: "https://www.linkedin.com/in/alfan-alfian-4a6571333/",
  twitter: "https://twitter.com/pannntastic",
  website: "https://pannntastic.dev",
  stats: {
    publicRepos: 25,
    followers: 150,
    following: 100,
    stars: 500,
  },
  // Education
  education: {
    university: "Universitas Muhammadiyah Yogyakarta",
    degree: "Bachelor of Engineering",
    major: "Information Technology",
    startYear: 2023,
    endYear: null, // Currently studying
    status: "Currently Studying",
  },
};

// Updated projects based on actual GitHub repos with proper tech stacks
export const projects = [
  {
    id: 1,
    name: "portfolio-website",
    description: "Personal portfolio website built with Next.js, TypeScript, and Three.js featuring 3D animations",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
    github: "https://github.com/PannnTastic/portfolio-website",
    demo: "https://pannntastic.dev",
    stars: 15,
    forks: 5,
    image: "/projects/project1.jpg",
  },
  {
    id: 2,
    name: "web-based-apps",
    description: "Collection of web-based applications and experiments with modern frontend technologies",
    tech: ["JavaScript", "HTML", "CSS", "React", "Node.js"],
    github: "https://github.com/PannnTastic/web-based-apps",
    demo: "#",
    stars: 8,
    forks: 3,
    image: "/projects/project2.jpg",
  },
  {
    id: 3,
    name: "java-projects",
    description: "Various Java programming projects and assignments from university coursework",
    tech: ["Java", "OOP", "JavaFX", "MySQL"],
    github: "https://github.com/PannnTastic/java-projects",
    demo: "#",
    stars: 5,
    forks: 2,
    image: "/projects/project3.jpg",
  },
  {
    id: 4,
    name: "python-scripts",
    description: "Python scripts and automation tools for data processing and task automation",
    tech: ["Python", "Pandas", "NumPy", "BeautifulSoup"],
    github: "https://github.com/PannnTastic/python-scripts",
    demo: "#",
    stars: 12,
    forks: 4,
    image: "/projects/project4.jpg",
  },
  {
    id: 5,
    name: "mobile-app-umy",
    description: "Mobile application project for university assignment using React Native",
    tech: ["React Native", "Expo", "Firebase", "JavaScript"],
    github: "https://github.com/PannnTastic/mobile-app-umy",
    demo: "#",
    stars: 6,
    forks: 2,
    image: "/projects/project5.jpg",
  },
  {
    id: 6,
    name: "database-management",
    description: "Database design and management projects with SQL and NoSQL implementations",
    tech: ["MySQL", "PostgreSQL", "MongoDB", "PHP"],
    github: "https://github.com/PannnTastic/database-management",
    demo: "#",
    stars: 9,
    forks: 3,
    image: "/projects/project6.jpg",
  },
];

// Updated skills based on actual GitHub repositories and focus on Backend & ML
export const skills = [
  // Programming Languages
  { name: "JavaScript", level: 85, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "Go", level: 75, category: "backend" },
  { name: "Python", level: 82, category: "backend" },
  { name: "Java", level: 75, category: "backend" },
  { name: "PHP", level: 65, category: "backend" },
  { name: "HTML/CSS", level: 90, category: "frontend" },
  
  // Frameworks & Libraries
  { name: "React", level: 82, category: "frontend" },
  { name: "Next.js", level: 78, category: "frontend" },
  { name: "React Native", level: 65, category: "frontend" },
  { name: "Tailwind CSS", level: 88, category: "frontend" },
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Gin", level: 70, category: "backend" },
  { name: "JavaFX", level: 60, category: "frontend" },
  
  // Database
  { name: "MySQL", level: 78, category: "backend" },
  { name: "PostgreSQL", level: 75, category: "backend" },
  { name: "MongoDB", level: 72, category: "backend" },
  { name: "Redis", level: 65, category: "backend" },
  { name: "Firebase", level: 70, category: "backend" },
  
  // Machine Learning & Data
  { name: "TensorFlow", level: 60, category: "tools" },
  { name: "Scikit-learn", level: 65, category: "tools" },
  { name: "Pandas", level: 75, category: "tools" },
  { name: "NumPy", level: 72, category: "tools" },
  
  // Tools & Others
  { name: "Git/GitHub", level: 85, category: "tools" },
  { name: "Docker", level: 68, category: "tools" },
  { name: "Three.js", level: 55, category: "frontend" },
  { name: "Figma", level: 65, category: "tools" },
  { name: "VS Code", level: 90, category: "tools" },
];

// Updated experiences - reflecting student journey
export const experiences = [
  {
    id: 1,
    role: "Information Technology Student",
    company: "Universitas Muhammadiyah Yogyakarta",
    period: "2023 - Present",
    description: "Pursuing Bachelor's degree in Information Technology. Focusing on software development, database management, backend systems, and machine learning.",
  },
  {
    id: 2,
    role: "Backend Developer (Self-Learning)",
    company: "Personal Projects",
    period: "2023 - Present",
    description: "Building scalable backend systems using Go, Node.js, and Python. Exploring APIs, microservices, and database optimization.",
  },
  {
    id: 3,
    role: "Machine Learning Enthusiast",
    company: "Self-Study & University Projects",
    period: "2024 - Present",
    description: "Learning machine learning concepts, building predictive models with Python, TensorFlow, and Scikit-learn. Working on data analysis projects.",
  },
];

// Education timeline
export const educationTimeline = [
  {
    id: 1,
    institution: "Universitas Muhammadiyah Yogyakarta",
    degree: "Bachelor of Engineering (B.Eng.)",
    field: "Information Technology",
    period: "2023 - Present",
    description: "Focusing on software engineering, backend development, database systems, and machine learning.",
    status: "Currently Enrolled",
  },
];
