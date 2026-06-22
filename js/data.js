export const headerData = {
  title: "FULL-STACK DEVELOPER",
  description: `Full-Stack Developer focused on building practical, scalable, and user-centered systems. Experienced in developing web applications, workflow automation, backend architecture, and system optimization. Comfortable leading projects, translating requirements into working solutions, and delivering reliable, maintainable software that solves real operational problems efficiently.`,
  email: "arroyobrix@gmail.com",
  phone: "+63-966-314-8788",
  social: [
    { icon: "github", url: "https://github.com/Xhenzouu" },
    { icon: "linkedin", url: "https://www.linkedin.com/in/arroyohensonbrix/" },
    { icon: "facebook", url: "https://www.facebook.com/lioasuno" },
    { icon: "instagram", url: "https://www.instagram.com/xhenzouu/" },
    { icon: "x-twitter", url: "https://x.com/lioasuno" }
  ]
};

export const skillsData = {
  description: `I build modern full-stack applications with a strong focus on backend systems, database design, cloud deployment, and clean user experiences. My work spans community platforms, AI-powered tools, and practical software solutions designed to improve operations and reduce manual effort.`,

  categories: [
    {
      title: "Frontend",
      icon: "monitor",
      skills: "React.js • JavaScript • Bootstrap 5 • Responsive UI"
    },
    {
      title: "Backend",
      icon: "server",
      skills: "Node.js • Express • PHP (CodeIgniter 4) • Python • REST APIs"
    },
    {
      title: "Database",
      icon: "database",
      skills: "PostgreSQL • MySQL • Schema Design • Query Optimization"
    },
    {
      title: "Cloud & DevOps",
      icon: "cloud",
      skills: "AWS (EC2, RDS, S3) • Docker • Nginx • PM2 • CI/CD"
    }
  ],

  sphereIcons: [
    { icon: "atom", skill: "react" },
    { icon: "server", skill: "backend" },
    { icon: "database", skill: "postgres" },
    { icon: "git-branch", skill: "git" },
    { icon: "cloud", skill: "aws" },
    { icon: "brain", skill: "automation" },
    { icon: "smartphone", skill: "mobile" },
    { icon: "paw-print", skill: "lostpet" },
    { icon: "shield", skill: "security" },
    { icon: "sparkles", skill: "growth" }
  ],

  tooltips: {
    react: {
      title: "React.js",
      desc: "Building responsive, reusable, and modern frontend interfaces."
    },
    backend: {
      title: "Backend Development",
      desc: "Developing APIs, application logic, and scalable backend systems."
    },
    postgres: {
      title: "PostgreSQL",
      desc: "Database modeling, structured schemas, and efficient querying."
    },
    git: {
      title: "Git & Collaboration",
      desc: "Version control, branching workflows, and team collaboration."
    },
    aws: {
      title: "AWS Cloud",
      desc: "Deployed full-stack apps on EC2 with RDS, Docker, Nginx, and CI/CD."
    },
    automation: {
      title: "Automation",
      desc: "Building features that reduce repetitive work through smart workflows."
    },
    mobile: {
      title: "Cross-Platform Development",
      desc: "Experience building mobile-ready applications and responsive systems."
    },
    lostpet: {
      title: "Machine Learning Project",
      desc: "AI-powered web application focused on prediction and user guidance."
    },
    security: {
      title: "Application Security",
      desc: "Working with authentication, access control, and secure backend practices."
    },
    growth: {
      title: "Continuous Learning",
      desc: "Always improving through projects, internships, and new technologies."
    }
  }
};

export const projectsData = [
  {
    image: "assets/images/lynville-homes-8-logo.png",
    title: "Lynville Homes 8",
    period: "Community Management Platform • 2025 – Present",
    tech: ["React", "Node.js", "Express", "PostgreSQL"],
    role: "Full-Stack Developer",
    liveUrl: "https://lynvillehomes8.me",
    points: [
      "Built a full-featured community management platform for HOA operations.",
      "Implemented authentication, role-based access, announcements, and administrative workflows.",
      "Automated notifications and reporting processes to reduce manual work.",
      "Provided ongoing maintenance, support, and feature improvements based on user feedback.",
      "Focused on performance optimization, backend reliability, and practical usability."
    ],
    hasDemo: false
  },

  {
    image: "assets/images/chairable-logo.png",
    title: "Chairable",
    period: "Cross-Platform Commerce System • 2024 – 2025",
    tech: ["Flutter", "Flask", "PostgreSQL"],
    role: "Full-Stack Developer",
    liveUrl: "",
    points: [
      "Developed a multi-role commerce platform supporting customers, sellers, administrators, and riders.",
      "Built order workflows, inventory management, and secure access control systems.",
      "Designed backend integrations for transactions, fulfillment, and operational coordination.",
      "Focused on scalable architecture and practical business workflows."
    ],
    hasDemo: false
  },

  {
    image: "assets/images/gaming-rigz-logo.png",
    title: "GamingRigz",
    period: "Desktop POS & Inventory System • 2023",
    tech: ["C# .NET", "WinForms"],
    role: "Developer",
    liveUrl: "",
    points: [
      "Built a desktop point-of-sale and inventory management application.",
      "Implemented stock monitoring, checkout workflows, payment handling, and reporting.",
      "Designed stable offline-first functionality with structured local data storage.",
      "Created practical admin tools for tracking sales and inventory movement."
    ],
    hasDemo: false
  },

  {
    image: "assets/images/lost-pet-ai.png",
    title: "Lost Pet Reunion AI",
    period: "Machine Learning Web Application • 2025 – Present",
    tech: ["Python", "Streamlit", "Machine Learning"],
    role: "Independent Developer",
    liveUrl: "https://lost-pet-ai.streamlit.app/",
    points: [
      "Built a prediction-based web application estimating pet reunion likelihood.",
      "Developed feature engineering logic to improve prediction quality.",
      "Designed a simple and mobile-friendly user experience with real-time outputs.",
      "Combined machine learning with practical community use."
    ],
    hasDemo: true,
    demoText: "Try live demo"
  }
];

export const aboutData = {

certifications: [
  {
    title: "Critical Career Skills – Generative AI Foundations",
    issuer: "Certiport (Pearson VUE)",
    level: "Artificial Intelligence / AI Literacy",
    image: "assets/images/certificates/arroyo-generative-ai-foundations-certificate.jpg",
    dateIssued: "May 11, 2026",
    expires: "May 12, 2031",
    badgeId: "3cb4c275-ed45-4d90-b8ff-a732643e5ca9",
    featured: true,
    highlights: [
      "Understanding of generative AI concepts and models",
      "Prompt engineering and responsible AI usage",
      "Ethical and practical AI applications in real-world contexts"
    ]
  },

  {
    title: "OJT Completion (440 Hours) – IT Internship",
    issuer: "C8nnect IT Solutions",
    level: "Professional Experience",
    image: "assets/images/certificates/arroyo-c8nnect-internship-completion-certification.jpg",
    featured: true,
    highlights: [
      "Hands-on full-stack development exposure",
      "Real-world workflow and system support experience",
      "Collaboration in production-level development environment"
    ]
  },

  {
    title: "Web Development Using MERN",
    issuer: "DICT Region III",
    level: "Full-Stack Web Development",
    image: "assets/images/certificates/arroyo-web-dev-using-mern-stack-certificate.jpg",
    featured: true,
    highlights: [
      "Built applications using MongoDB, Express, React, Node.js",
      "Developed RESTful APIs and backend integration",
      "Full-stack application architecture and deployment concepts"
    ]
  },

  {
    title: "PHP Web Application Framework: CodeIgniter 4 (Intermediate)",
    issuer: "DICT CALABARZON",
    level: "Web Development",
    image: "assets/images/certificates/arroyo-php-webapp-framework-codeigniter4-intermediate-certificate.jpg",
    featured: true,
    highlights: [
      "MVC-based backend development using CodeIgniter 4",
      "Routing, controllers, and database integration",
      "Structured web application architecture"
    ]
  },

  {
    title: "Artificial Intelligence and Cybersecurity",
    issuer: "Sorsogon State University Graduate School",
    level: "Cybersecurity & AI",
    image: "assets/images/certificates/arroyo-oplan-paskong-sigurado-certificate.jpg",
    featured: true,
    highlights: [
      "AI applications in cybersecurity systems",
      "Threat detection and digital risk awareness",
      "Modern security challenges in AI-driven environments"
    ]
  },

  {
    title: "Linux Essentials",
    issuer: "Cisco Networking Academy",
    level: "Systems Administration",
    image: "assets/images/certificates/arroyo-linux-essentials-certificate.jpg",
    featured: true,
    highlights: [
      "Linux command-line fundamentals",
      "File system navigation and permissions",
      "Basic system administration tasks"
    ]
  },

  {
    title: "Operating Systems Basics",
    issuer: "Cisco Networking Academy",
    level: "Systems & Infrastructure",
    image: "assets/images/certificates/arroyo-linux-os-basics-certificate.jpg",
    highlights: [
      "Core operating system principles",
      "Process and memory management concepts",
      "System architecture fundamentals"
    ]
  },

  {
    title: "Internet of Things (IoT) in Smart Cities",
    issuer: "DICT Caraga",
    level: "Emerging Technology",
    image: "assets/images/certificates/arroyo-iot-in-smart-cities-certificate.jpg",
    highlights: [
      "IoT system architecture and connectivity",
      "Smart city application scenarios",
      "Integration of sensors and digital systems"
    ]
  }
  ]
};

export const educationData = [
  {
    logo: "assets/images/lspu-logo.webp",
    degree: "Bachelor of Science in Information Technology",
    specialization: "Specialization: Web & Mobile Application Development",
    school: "Laguna State Polytechnic University – Santa Cruz Main Campus",
    year: "2022 – 2026"
  },
  {
    logo: "assets/images/AMA-University-and-Colleges-main-logo.png",
    degree: "Senior High School",
    specialization: "Science, Technology, Engineering, & Mathematics",
    school: "AMA Computer College – Santa Cruz, Laguna",
    year: "2020 – 2022"
  }
];

export const footerData = {
  message: "Let's build something meaningful together",
  email: "arroyobrix@gmail.com",
  copyright: "© 2026 Henson Brix A. Arroyo • Built with Tailwind"
};