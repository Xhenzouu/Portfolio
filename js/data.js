// data.js - Model (All portfolio content in one place)

export const headerData = {
  title: "JUNIOR FULL-STACK DEVELOPER",
  description: `Junior Full-Stack Developer with hands-on experience building web and mobile applications using PERN stack and Flutter. Skilled in enhancing system efficiency, optimizing workflows, and integrating user-focused features, with a track record of improving performance and usability. Experienced in delivering end-to-end solutions across web, mobile, desktop, showcasing expertise in Node.js, React, Python, Flutter, and database management.`,
  email: "arroyobrix@gmail.com",
  phone: "+63-966-314-8788",
  social: [
    { icon: "github",    url: "https://github.com/Xhenzouu" },
    { icon: "linkedin",  url: "https://www.linkedin.com/in/arroyohensonbrix/" },
    { icon: "facebook",  url: "https://www.facebook.com/lioasuno" },
    { icon: "instagram", url: "https://www.instagram.com/xhenzouu/" },
    { icon: "x",         url: "https://x.com/lioasuno" }
  ]
};

export const skillsData = {
  description: `I build end-to-end solutions across web, mobile, and embedded systems using modern tools like React, Node.js, Flutter, PostgreSQL, and IoT platforms. From responsive frontends to secure backends and real-time features — I deliver fast, scalable, and user-focused applications.`,

  categories: [
    {
      title: "Frontend",
      icon: "monitor",
      skills: "React.js • Flutter • Responsive Design"
    },
    {
      title: "Backend",
      icon: "server",
      skills: "Node.js • Express • Flask • PERN"
    },
    {
      title: "Databases",
      icon: "database",
      skills: "PostgreSQL • Optimization • Migrations"
    },
    {
      title: "Mobile",
      icon: "smartphone",
      skills: "Flutter • Cross-platform Apps"
    }
  ],

  // Maps card title → skill key for sphere highlighting
  // Used in script.js to connect hover on mini cards to sphere icons
  sphereIcons: [
    { icon: "atom",        skill: "react" },
    { icon: "smartphone",  skill: "flutter" },
    { icon: "server",      skill: "backend" },
    { icon: "database",    skill: "postgres" },
    { icon: "pen-tool",    skill: "design" },
    { icon: "brain",       skill: "ai" },
    { icon: "train",       skill: "devops" },
    { icon: "radio",       skill: "iot" },
    { icon: "git-branch",  skill: "git" },
    { icon: "sparkles",    skill: "emerging" }
  ],

  tooltips: {
    react:     { title: "React.js",                 desc: "Building fast, reusable, component-driven UIs with React, hooks, and modern patterns." },
    flutter:   { title: "Flutter",                  desc: "Crafting stunning, high-performance cross-platform mobile apps for iOS & Android." },
    backend:   { title: "Node.js & Express",        desc: "Designing scalable RESTful APIs, real-time systems, and secure backends." },
    postgres:  { title: "PostgreSQL",               desc: "Mastery of complex database design, query optimization, migrations, and reliability." },
    design:    { title: "Figma & UI/UX",            desc: "Turning ideas into pixel-perfect, interactive prototypes and user-centered designs." },
    ai:        { title: "AI & Automation",          desc: "Integrating NLP, smart workflows, SMS gateways, and smart automation." },
    devops:    { title: "DevOps & Git",             desc: "Deploying with Railway, managing Git workflows, tests, and CI/CD pipelines." },
    iot:       { title: "IoT & Embedded",           desc: "Building real-world assistive devices using ESP8266, Arduino, and cloud systems." },
    git:       { title: "Git & Collaboration",      desc: "Advanced Git workflows, branching, code reviews, and team collaboration." },
    emerging:  { title: "Always Growing",           desc: "Expanding into C#, Linux, Cybersecurity, Design Thinking, and new tech." }
  }
};

export const projectsData = [
  {
    image: "assets/images/lynville-homes-8-logo.png",
    title: "Lynville Homes 8",
    period: "Community Management Platform • March 2025 – Present",
    tech: ["PERN Stack", "Railway"],
    role: "Full-Stack Developer • March 2025 – Present",
    liveUrl: "https://lynvillehomes8.me",
    points: [
      "Built a full web platform for HOA community management using PostgreSQL, Express, React, and Node.",
      "Handles system upkeep, updates, bug fixes, and overall performance optimization.",
      "Integrated authentication, role-based access, real-time alerts, and admin tools.",
      "Collaborated closely with HOA officers to gather requirements and deliver user-focused features.",
      "Deployed using Railway; implemented secure API routes and system monitoring.",
      "Streamlined administrative workflows through automated tools and structured data processing."
    ],
    hasDemo: false
  },
  {
    image: "assets/images/chairable-logo.png",
    title: "Chairable",
    period: "Cross-Platform E-Commerce • Sept 2024 – May 2025",
    tech: ["Flutter", "Flask", "PostgreSQL"],
    role: "Full-Stack Developer • Sept 2024 – May 2025",
    liveUrl: "",
    points: [
      "Designed a multi-role platform supporting customers, sellers, admins, and riders across Web and mobile.",
      "Implemented secure role-based access, inventory controls, order workflows, and delivery coordination.",
      "Built an administrative backend with user management, commission tracking, and actionable dashboard analytics.",
      "Designed API integrations enabling smooth transactions, order updates, and courier operations."
    ],
    hasDemo: false
  },
  {
    image: "assets/images/gaming-rigz-logo.png",
    title: "GamingRigz",
    period: "Point-of-Sale System • Nov 2023 – Dec 2023",
    tech: ["C# .NET", "WinForms"],
    role: "Full-Stack Developer • Nov 2023 – Dec 2023",
    liveUrl: "",
    points: [
      "Built a desktop application in C# (Windows Forms) with embedded local database for stable offline operations.",
      "Designed a structured stock management system with color-coded categories.",
      "Implemented inventory controls, checkout operations, automated payment calculations, change handling, restock tracking, and low-stock alerts.",
      "Generated automated sales reports with daily/weekly summaries and formatted receipts."
    ],
    hasDemo: false
  },
  {
    image: "assets/images/IoT-nodeMCU-diagram.png",
    title: "IoT Assistive Device",
    period: "For the Visually Impaired • Oct 2023 – Dec 2023",
    tech: ["NodeMCU ESP8266", "Arduino IoT Cloud"],
    role: "Embedded Systems & IoT Developer • Oct 2023 – Dec 2023",
    liveUrl: "",
    points: [
      "Designed and built a low-cost, cane-mounted obstacle detection system using NodeMCU ESP8266.",
      "Integrated HC-SR04 ultrasonic sensor for real-time distance measurement (up to 4 m).",
      "RGB LED + buzzer feedback system with multiple alert levels.",
      "Full remote monitoring via Arduino IoT Cloud and mobile app.",
      "Programmed in Arduino IDE (C/C++), achieving less than 5% error and power-efficient operation."
    ],
    hasDemo: true,
    demoText: "20-sec IoT demo"
  }
];

export const aboutData = {
  bio: `21-year-old developer from the Philippines. I wrote my first line of code at 18 and never stopped learning. 
I love turning ideas into real, impactful products whether it’s a full-blown community platform for 500+ members or a low-cost IoT cane that helps the visually impaired navigate the world.`,

  hobbies: `When I’m not coding, you’ll find me binge-watching fantasy/dystopian series, reading Tolkien (and anything with dragons or rings), queuing for Dota 2 or Apex Legends, or enjoying a clean, no-nonsense espresso/Americano.`,

  interests: [
    { icon: "clapperboard", text: "Fantasy & dystopian movies/series" },
    { icon: "swords",       text: "Dota 2 & Apex Legends" },
    { icon: "book-open",    text: "Tolkien books & high fantasy" },
    { icon: "coffee",       text: "Straight espresso / Americano purist" }
  ],

  certifications: [
    "Operating Systems Basics — Cisco Networking Academy (2025)",
    "Linux Essentials — Cisco Networking Academy / NDG (2025)",
    "Internet of Things (IoT) in Smart Cities — DICT Caraga (2025)",
    "Cybersecurity for ICT Professionals — DICT Region V (2025)",
    "Design Thinking: Ideation Wednesdays — DICT Caraga (2025)"
  ]
};

export const educationData = [
  {
    logo: "assets/images/lspu-logo.webp",
    degree: "Bachelor of Science in Information Technology",
    specialization: "Specialization: Web & Mobile Application Development",
    school: "Laguna State Polytechnic University Santa Cruz Main Campus",
    year: "2022 – Present"
  },
  {
    logo: "assets/images/AMA-University-and-Colleges-main-logo.png",
    degree: "Senior High School",
    specialization: "Science, Technology, Engineering, & Mathematics",
    school: "AMA Computer College — Santa Cruz, Laguna",
    year: "2020 – 2022"
  }
];

export const footerData = {
  message: "Let's build something awesome together",
  email: "arroyobrix@gmail.com",
  copyright: "© 2025 Henson Brix A. Arroyo • Built with Tailwind"
};