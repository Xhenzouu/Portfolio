/* ==========================================================================
   data.js
   Single source of truth for all portfolio content. Edit THIS file to add
   or change projects, certifications, experience, etc. — index.html and
   render.js should never need to change for content updates.

   No ES modules — plain script tag, exposes window.portfolioData.

   Phase 8.1:
     - 8 project thumb paths corrected from .jpg → .png.
     - sections[].icon values changed from Unicode glyphs to Lucide names.

   Phase 8.1 follow-up:
     - Certifications expanded from 6 → 10 entries, all with thumbnails.
     - 4 new entries' issuer + date placeholders filled in from the
       certificate images.
     - Certifications array reordered chronologically (most recent first).
       IDs are stable identifiers and do not need to be monotonic with
       array order.
   ========================================================================== */

const portfolioData = {

  /* ------------------------------------------------------------------------
     META — identity, tagline, contact info
     ------------------------------------------------------------------------ */
  meta: {
    name: "Henson Brix A. Arroyo",
    tagline: "Full-Stack Developer & Aspiring Tech Support Professional",
    location: "Sta. Cruz, Laguna, Philippines",
    avatarInitials: "HA",
    contact: {
      email: "arroyobrix@gmail.com",
      phone: "+63 966 314 8788",
      linkedin: "https://linkedin.com/in/arroyohensonbrix",
      github: "https://github.com/Xhenzouu",
      portfolioUrl: "https://hensonbrix-portfolio.vercel.app"
    }
  },

  /* ------------------------------------------------------------------------
     SECTIONS — ordered, maps 1:1 to sidebar folder tree, drawer, and
     (a subset of) the mobile tab switcher. icon values are Lucide icon
     names looked up in window.portfolioIcons by render.js.
     ------------------------------------------------------------------------ */
  sections: [
    { id: "about",           label: "About",           icon: "info",             hasChildren: false },
    { id: "projects",        label: "Projects",        icon: "folder",           hasChildren: true  },
    { id: "experience",      label: "Experience",      icon: "briefcase",        hasChildren: true  },
    { id: "designs",         label: "Designs",         icon: "palette",          hasChildren: false },
    { id: "trainings",       label: "Trainings",       icon: "graduation-cap",   hasChildren: false },
    { id: "certifications",  label: "Certifications",  icon: "award",            hasChildren: true  },
    { id: "contact",         label: "Contact",         icon: "mail",             hasChildren: false }
  ],

  /* ------------------------------------------------------------------------
     PROJECTS — real content. Thumb paths are .png matching the project id.
     ------------------------------------------------------------------------ */
  projects: [
    {
      id: "xirv-systems",
      name: "XIRV Systems",
      category: "Full-Stack / AI",
      date: "July 2026 – Present",
      description: "A secure enterprise platform with JWT auth, RBAC, secure API endpoints, and modular layered architecture. Includes an AI-powered RAG system with vector search, embeddings, and an internal retrieval gateway. Deployed on AWS with CI/CD.",
      tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "AWS (EC2, RDS, S3)", "GitHub Actions"],
      repoUrl: "https://github.com/Xhenzouu/xirv-systems",
      liveUrl: null,
      featured: true,
      thumb: "assets/images/projects/xirv-systems.png"
    },
    {
      id: "lynville-homes-8",
      name: "Lynville Homes 8",
      category: "Full-Stack",
      date: "March 2025 – December 2025",
      description: "A full-featured HOA platform serving 500+ members with automated notifications and reporting. Provisioned AWS cloud infrastructure with Nginx reverse proxy and PM2, achieving 99.9% uptime. Streamlined core administrative workflows, reducing manual effort by 40%.",
      tech: ["React", "Node.js", "Express", "PostgreSQL", "AWS (EC2, RDS)", "Nginx", "PM2"],
      repoUrl: "https://github.com/Xhenzouu/lynvillehomes8",
      liveUrl: null,
      featured: true,
      thumb: "assets/images/projects/lynville-homes-8.png"
    },
    {
      id: "pila-pets",
      name: "Pila Pets",
      category: "Web / Community",
      date: "December 2025",
      description: "A community pet platform with registration, lost reports, adoption listings, and search/filter. Full CRUD operations, authentication, and role-based access (resident/admin). Built as a DICT certification project.",
      tech: ["CodeIgniter 4", "PHP 8.2", "MySQL", "Bootstrap 5"],
      repoUrl: "https://github.com/Xhenzouu/pila-pets",
      liveUrl: "https://youtu.be/I4n8shvS1ZY",
      featured: false,
      thumb: "assets/images/projects/pila-pets.png"
    },
    {
      id: "lost-pet-ai",
      name: "Lost Pet Reunion AI — Pila, Laguna",
      category: "ML / AI",
      date: "2025 – 2026",
      description: "A machine learning–powered community project that predicts the likelihood of a lost pet being reunited with its owner in Pila, Laguna. Uses YOLO11 pet detection + DINOv2-small embeddings + FAISS cosine similarity search, plus a RandomForest tabular predictor with a Streamlit UI.",
      tech: ["Python", "Streamlit", "Scikit-learn", "YOLO11", "DINOv2", "FAISS", "PostgreSQL", "Cloudinary"],
      repoUrl: "https://github.com/Xhenzouu/lost-pet-ai",
      liveUrl: "https://lost-pet-ai.streamlit.app/",
      featured: true,
      thumb: "assets/images/projects/lost-pet-ai.png"
    },
    {
      id: "gaming-rigz",
      name: "GamingRigz",
      category: "Desktop / POS",
      date: "2023",
      description: "A Windows desktop application for managing sales and inventory of gaming rig parts. Handles login, registration, password retrieval, stock tracking, order creation, order history, archiving, and sales reporting, with SQL Server as the data layer.",
      tech: ["C#", ".NET Framework", "WinForms", "SQL Server", "T-SQL", "ADO.NET"],
      repoUrl: "https://github.com/Xhenzouu/GamingRigz",
      liveUrl: null,
      featured: false,
      thumb: "assets/images/projects/gaming-rigz.png"
    },
    {
      id: "chairable",
      name: "Chairable",
      category: "E-Commerce",
      date: "2024",
      description: "A full-stack e-commerce platform for furniture and home decor, with user and seller registration, product browsing by category, cart, checkout, and a mobile version in Flutter.",
      tech: ["HTML", "CSS", "JavaScript", "Python (Flask)", "PostgreSQL", "Flutter (Dart)"],
      repoUrl: "https://github.com/Xhenzouu/Chairable",
      liveUrl: null,
      featured: false,
      thumb: "assets/images/projects/chairable.png"
    },
    {
      id: "lspu-events",
      name: "LSPU Events Management System",
      category: "Web / Academic",
      date: "2024",
      description: "A PHP and MySQL web system for managing university events at LSPU — login/registration, full event CRUD, search, and PDF report generation via TCPDF.",
      tech: ["PHP", "MySQL", "TCPDF", "HTML", "CSS"],
      repoUrl: "https://github.com/Xhenzouu/lspu-event-management-system",
      liveUrl: null,
      featured: false,
      thumb: "assets/images/projects/lspu-events.png"
    },
    {
      id: "employee-management-system",
      name: "Employee Management System",
      category: "Web / HR",
      date: "2024",
      description: "A CodeIgniter 4 employee management system with authentication, full employee CRUD, a metrics-driven dashboard, and a dark theme UI.",
      tech: ["PHP", "CodeIgniter 4", "MySQL", "Composer", "PHPUnit"],
      repoUrl: "https://github.com/Xhenzouu/employee-management-system",
      liveUrl: null,
      featured: false,
      thumb: "assets/images/projects/employee-management-system.png"
    }
  ],

  /* ------------------------------------------------------------------------
     EXPERIENCE — most recent first.
     ------------------------------------------------------------------------ */
  experience: [
    {
      id: "exp-001",
      role: "Team Leader / Full-Stack Developer (Intern)",
      org: "C8NNECT IT Solutions",
      startDate: "January 2026",
      endDate: "May 2026",
      location: "Bulacan, Philippines",
      description: "Led a team through a project lifecycle, from research and planning to deployment and delivery.",
      highlights: [
        "Built backend modules using Java and tested APIs via Postman for quality assurance.",
        "Developed role-based user interfaces and documented progress reports for project supervisors."
      ]
    },
    {
      id: "exp-002",
      role: "Full-Stack Developer (Project-Based)",
      org: "Lynville Homes 8 HOA",
      startDate: "March 2025",
      endDate: "December 2025",
      location: "Laguna, Philippines",
      description: "Designed, built, and deployed a community platform serving 500+ members with 99.9% uptime.",
      highlights: [
        "Achieved 40% reduction in manual administrative work through automated workflows and reporting.",
        "Collaborated with HOA officers to gather requirements, provide support, and resolve user issues."
      ]
    },
    {
      id: "exp-003",
      role: "Shop Assistant (Seasonal, Family Business)",
      org: "Consumo Enterprises",
      startDate: "2019",
      endDate: "2024",
      location: "Laguna, Philippines",
      description: "Managed daily shop operations, handling procurement and inventory for construction materials.",
      highlights: [
        "Coordinated client communications and logistics for truck rental and material delivery services."
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     CERTIFICATIONS — 10 entries, all with thumbnails.
     Order: most recent first. IDs are stable identifiers and do not need
     to be monotonic with array order.

     Undated 2025 Cisco certs (cert-005, cert-006) are placed at the end
     under the assumption that they were completed earlier in 2025 than
     the dated October–December 2025 DICT certs. User confirmed this
     matches reality.
     ------------------------------------------------------------------------ */
  certifications: [
    {
      id: "cert-001",
      name: "Generative AI Foundations",
      issuer: "Certiport (Pearson VUE)",
      date: "2026",
      credentialUrl: null,
      thumb: "assets/images/certificates/arroyo-generative-ai-foundations-certificate.jpg"
    },
    {
      id: "cert-002",
      name: "Prompt Like an Engineer",
      issuer: "Cisco Networking Academy",
      date: "2026",
      credentialUrl: null,
      thumb: "assets/images/certificates/arroyo-prompt-like-an-engineer-certificate.jpg"
    },
    {
      id: "cert-003",
      name: "Introduction to Modern AI",
      issuer: "Cisco Networking Academy",
      date: "2026",
      credentialUrl: null,
      thumb: "assets/images/certificates/arroyo-introduction-to-modern-ai-certificate.jpg"
    },
    {
      id: "cert-004",
      name: "AI Essentials: Theory and Practice",
      issuer: "UPOU MODeL (University of the Philippines Open University)",
      date: "2026",
      credentialUrl: null,
      thumb: "assets/images/certificates/arroyo-ai-essentials-theory-and-practice-certificate.jpg"
    },
    {
      id: "cert-010",
      name: "Oplan Paskong Sigurado",
      issuer: "DICT Cybersecurity Bureau",
      date: "December 12, 2025",
      credentialUrl: null,
      thumb: "assets/images/certificates/arroyo-oplan-paskong-sigurado-certificate.jpg"
    },
    {
      id: "cert-009",
      name: "IoT in Smart Cities",
      issuer: "DICT I3 — ILCDB",
      date: "November 24, 2025",
      credentialUrl: null,
      thumb: "assets/images/certificates/arroyo-iot-in-smart-cities-certificate.jpg"
    },
    {
      id: "cert-007",
      name: "Cybersecurity ICT Professionals",
      issuer: "DICT Region V — Provincial Office of Catanduanes",
      date: "October 23, 2025",
      credentialUrl: null,
      thumb: "assets/images/certificates/arroyo-cybersecurity-ict-professionals-certification.jpg"
    },
    {
      id: "cert-008",
      name: "Design Thinking Process",
      issuer: "DICT I3 — ICT Industry Development Bureau",
      date: "October 18, 2025",
      credentialUrl: null,
      thumb: "assets/images/certificates/arroyo-design-thinking-process-certificate.jpg"
    },
    {
      id: "cert-005",
      name: "Linux Essentials",
      issuer: "Cisco Networking Academy",
      date: "2025",
      credentialUrl: null,
      thumb: "assets/images/certificates/arroyo-linux-essentials-certificate.jpg"
    },
    {
      id: "cert-006",
      name: "Operating Systems Basics",
      issuer: "Cisco Networking Academy",
      date: "2025",
      credentialUrl: null,
      thumb: "assets/images/certificates/arroyo-linux-os-basics-certificate.jpg"
    }
  ],

  /* ------------------------------------------------------------------------
     TRAININGS — most recent first. hours: null when undocumented;
     render.js omits the hours segment from the meta line when null.
     ------------------------------------------------------------------------ */
  trainings: [
    { id: "train-001", name: "AI Prompting for Automation Level III",                   provider: "TESDA",            hours: 224,  date: "2026" },
    { id: "train-002", name: "Web Development Using MERN",                              provider: "DICT Pampanga",    hours: null, date: "2026" },
    { id: "train-003", name: "PHP Web Application Framework: CodeIgniter 4",           provider: "DICT Calabarzon",  hours: 16,   date: "2025" }
  ],

  /* ------------------------------------------------------------------------
     DESIGNS — honest placeholder. No real design work to showcase yet.
     ------------------------------------------------------------------------ */
  designs: [
    {
      id: "design-001",
      name: "[Design Name Placeholder]",
      type: "[Type Placeholder]",
      description: "[Description placeholder.]"
    }
  ],

  /* ------------------------------------------------------------------------
     ABOUT — bio, education, awards, and grouped skills.
     ------------------------------------------------------------------------ */
  about: {
    bio: [
      "I'm a recent BS Information Technology graduate from Laguna State Polytechnic University with a full-stack development background and hands-on experience supporting live platforms. I built and deployed a community platform serving 500+ members with 99.9% uptime, and I've worked across the stack — React, Node.js, PostgreSQL, AWS — with a growing focus on AI-assisted workflows and cloud deployment.",
      "I'm currently exploring tech support as a career path, aiming to leverage my development background to troubleshoot from the inside and grow toward cloud engineering, DevOps, or systems administration. I'm based in Sta. Cruz, Laguna, and open to remote, hybrid, or onsite roles across Metro Manila."
    ],
    education: [
      {
        institution: "Laguna State Polytechnic University",
        degree: "BS Information Technology",
        startYear: "2022",
        endYear: "2026"
      }
    ],
    awards: [
      {
        id: "award-001",
        name: "Best Thesis in Information Technology",
        issuer: "Laguna State Polytechnic University",
        date: "2026"
      }
    ],
    skills: {
      languages: ["JavaScript", "TypeScript", "Python", "PHP", "C#", "Java"],
      frameworks: ["React", "Node.js", "Express", "Flask", "CodeIgniter 4", "Flutter (Dart)"],
      cloudDevops: ["AWS (EC2, RDS, S3)", "Docker", "Nginx", "PM2", "GitHub Actions", "CI/CD"],
      ai: ["AI Prompting", "RAG (Retrieval-Augmented Generation)", "Ollama", "OpenAI APIs", "YOLO11", "DINOv2", "FAISS"],
      security: ["JWT Authentication", "RBAC", "Secure API Development", "OWASP Basics"],
      other: ["PostgreSQL", "MySQL", "Git", "GitHub", "RESTful APIs", "Agile/Scrum", "Technical Documentation"]
    }
  }
};

window.portfolioData = portfolioData;