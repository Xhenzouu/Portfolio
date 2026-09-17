/* ==========================================================================
   data.js
   Single source of truth for all portfolio content. Edit THIS file to add
   or change projects, certifications, experience, etc. — index.html and
   render.js should never need to change for content updates.

   No ES modules — plain script tag, exposes window.portfolioData.

   Designs update:
     - Eighth and ninth design entries added: POEA Website Redesign —
       Desktop (5 landscape screens) and POEA Website Redesign — Mobile
       Web (2 portrait screens). Both point at the same Figma file.
     - thumbVariant: "portrait" on gdrive-redesign, cardbank-redesign,
       clinica-design, and poea-design-mobile. The others have no
       thumbVariant — landscape default.
     - Slideshow sizing is intrinsic. No aspectRatio field is used.

   Per-item thumbVariant resolution:
     js/render/_cards.js reads  item.thumbVariant || config.thumbVariant
     so a section can mix orientations.
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
     SECTIONS
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
     PROJECTS
     ------------------------------------------------------------------------ */
  projects: [
    {
      id: "xirv-systems",
      name: "XIRV Systems",
      category: "Full-Stack / AI",
      date: "July 2026 – Present",
      description: "A secure enterprise platform with JWT auth, RBAC, secure API endpoints, and modular layered architecture. Includes an AI-powered RAG system with vector search, embeddings, and an internal retrieval gateway. Deployed on AWS with CI/CD.",
      tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "AWS (EC2, RDS, S3)", "GitHub Actions"],
      features: [
        "JWT authentication with refresh token rotation",
        "Role-based access control (USER, ADMIN, SUPER_ADMIN)",
        "Knowledge management — document upload, search, categories, tags",
        "AI Gateway — provider abstraction across OpenAI, Ollama, and Anthropic",
        "RAG (Retrieval-Augmented Generation) powered by pgvector",
        "Workflow automation with task management and approvals",
        "Redis-powered caching and rate limiting",
        "Audit logging for every action",
        "52+ tests with Vitest"
      ],
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
      features: [
        "Role-based access for Member, Admin, Public Relations, and Auditor",
        "Community dashboard with announcements, activities, polls, and projects",
        "Threaded comments and real-time WebSocket notifications",
        "CMS for dynamic banner, welcome, about, and affiliation sections",
        "Admin tools for member, activity, poll, and project management",
        "Payment tracking and pending-actions approval queue",
        "SSL/HTTPS with Let's Encrypt and Cloudflare CDN",
        "GitHub Actions CI/CD pipeline"
      ],
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
      features: [
        "Authentication for staff and admin login",
        "Role-based access control via AuthFilter and AdminFilter",
        "Admin dashboard with system activity overview",
        "Resident management — full CRUD for barangay residents",
        "Pet management — full CRUD for pets linked to their owners",
        "User management for staff accounts",
        "Custom views organized by area (admin, auth, residents)"
      ],
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
      features: [
        "RandomForest tabular predictor for pet recovery likelihood",
        "YOLO11 pet detection with automatic cropping",
        "DINOv2-small embeddings (384-dim) for visual similarity",
        "FAISS cosine similarity search across pet images",
        "PostgreSQL storage with JSONB embeddings",
        "Streamlit UI designed for non-technical users",
        "Cloudinary image storage",
        "Migration scripts for legacy embeddings (v5 → v6)"
      ],
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
      features: [
        "Login, registration, and password retrieval for staff accounts",
        "Stock management for gaming rig parts and accessories",
        "Order creation with receipt generation at checkout",
        "Order history and archive for older records",
        "Sales reporting for day-to-day decisions",
        "Color-coded stock indicators (green/yellow/red)",
        "SQL Server data layer via ADO.NET"
      ],
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
      features: [
        "User registration and login with forgot-password + OTP verification",
        "Seller registration with business permit and valid ID upload",
        "Admin tools for user management, seller approvals, and commissions",
        "Category-based browsing (Home Comfort, Garden & Outdoor, Dining, Living, Bedroom)",
        "Product showcase with discount badges, New tags, and hover overlays",
        "Shopping cart, checkout flow, and order tracking",
        "Favorites, product comparison, search, filtering, and pagination",
        "Live chat and in-app notifications",
        "Newsletter subscription and #ShareableChairable community collage",
        "Flutter mobile app sharing the same backend"
      ],
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
      features: [
        "Login, register, and forgot-password recovery",
        "Event creation, editing, and deletion (full CRUD)",
        "Event search across the records",
        "PDF report generation via the TCPDF library",
        "Shared layout via header, footer, and sidebar includes"
      ],
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
      features: [
        "Authentication with filtered access via AuthFilter",
        "Metrics-driven admin dashboard",
        "Full CRUD for employee records",
        "Dark theme UI throughout",
        "Database schema included for quick local setup"
      ],
      repoUrl: "https://github.com/Xhenzouu/employee-management-system",
      liveUrl: null,
      featured: false,
      thumb: "assets/images/projects/employee-management-system.png"
    }
  ],

  /* ------------------------------------------------------------------------
     EXPERIENCE
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
      ],
      thumb: "assets/images/experience/c8nnect.png"
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
      ],
      thumb: "assets/images/experience/lynville-homes-8.png"
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
      ],
      thumb: "assets/images/experience/consumo-enterprises.png"
    }
  ],

  /* ------------------------------------------------------------------------
     CERTIFICATIONS — 11 entries, all with thumbnails.
     Order: most recent first.
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
      id: "cert-011",
      name: "PHP Web Application Framework: CodeIgniter 4 (Intermediate)",
      issuer: "DICT CALABARZON Regional Office",
      date: "December 17-18, 2025",
      credentialUrl: null,
      thumb: "assets/images/certificates/arroyo-php-webapp-framework-codeigniter4-intermediate-certificate.jpg"
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
     TRAININGS
     ------------------------------------------------------------------------ */
  trainings: [
    {
      id: "train-001",
      name: "AI Prompting for Automation Level III",
      provider: "TESDA",
      hours: 224,
      date: "2026",
      thumb: "assets/images/trainings/ai-prompting-automation.png"
    },
    {
      id: "train-002",
      name: "AI Essentials: Theory and Practice",
      provider: "UPOU MODeL (University of the Philippines Open University)",
      hours: 16,
      date: "2026",
      thumb: "assets/images/trainings/upou-ai-essentials.png"
    },
    {
      id: "train-003",
      name: "PHP Web Application Framework: CodeIgniter 4",
      provider: "DICT Calabarzon",
      hours: 16,
      date: "2025",
      thumb: "assets/images/trainings/php-codeigniter4.png"
    }
  ],

  /* ------------------------------------------------------------------------
     DESIGNS — nine entries, all with slideshows and Figma links.

     - gdrive-redesign: portrait mobile, thumbVariant "portrait".
     - chairable-design: landscape desktop, default.
     - pila-pets-design: landscape desktop, default.
     - cardbank-redesign: portrait mobile, thumbVariant "portrait".
     - lynville-design: landscape desktop, default. Thumb = screen 3.
     - dental-design: landscape desktop, default. Thumb = screen 3.
     - clinica-design: portrait mobile, thumbVariant "portrait".
     - poea-design-desktop: landscape desktop, default.
     - poea-design-mobile: portrait mobile, thumbVariant "portrait".

     The two POEA entries share a Figma file but render as separate
     cards and modals — one landscape (5 desktop pages), one portrait
     (2 mobile web pages).

     Slideshow sizing is intrinsic. No aspectRatio field is used.
     Design items carry figmaUrl only — no repoUrl / liveUrl.
     ------------------------------------------------------------------------ */
  designs: [
    {
      id: "gdrive-redesign",
      name: "Google Drive Mobile Re-Design",
      type: "Mobile UI / UX",
      description: "A mobile re-design concept for the Google Drive app, exploring a cleaner folder grid, a simplified bottom navigation, and a more accessible file-management flow. Part of a UI/UX coursework assignment that required selecting an existing app and re-designing its core screens.",
      date: "2025",
      images: [
        "assets/images/designs/gdrive-redesign-1.png",
        "assets/images/designs/gdrive-redesign-2.png",
        "assets/images/designs/gdrive-redesign-3.png",
        "assets/images/designs/gdrive-redesign-4.png",
        "assets/images/designs/gdrive-redesign-5.png"
      ],
      thumbVariant: "portrait",
      thumb: "assets/images/designs/gdrive-redesign-1.png",
      figmaUrl: "https://www.figma.com/design/CaXty4fmgF2vcNu3UIVEFq/google-drive--re-design-?node-id=0-1&t=KGMPRU4dVTsKT3A4-1"
    },
    {
      id: "chairable-design",
      name: "Chairable — E-Commerce Web App",
      type: "Web UI / UX",
      description: "High-fidelity design for Chairable, my first full-stack e-commerce system for furniture and home decor. This was also my first project with a synchronized mobile app — products added to the cart on mobile appear instantly in the web cart, using a shared backend. Though the system wasn't deployed publicly, we presented the working prototype including the mobile-web synchronization feature. The design covers the full user journey: landing, shop, product detail, cart sidebar, product comparison, cart, checkout, and contact.",
      date: "2024",
      images: [
        "assets/images/designs/chairable-1-home.png",
        "assets/images/designs/chairable-2-shop.png",
        "assets/images/designs/chairable-3-product.png",
        "assets/images/designs/chairable-4-cart-sidebar.png",
        "assets/images/designs/chairable-5-comparison.png",
        "assets/images/designs/chairable-6-cart.png",
        "assets/images/designs/chairable-7-checkout.png",
        "assets/images/designs/chairable-8-contact.png"
      ],
      thumb: "assets/images/designs/chairable-1-home.png",
      figmaUrl: "https://www.figma.com/design/RBocDFtirCyUKh9PEgnbVq/chairable?node-id=0-1&t=MpueN9x1vE6B4YOf-1"
    },
    {
      id: "pila-pets-design",
      name: "Pila Pets — Pet & Resident Registry",
      type: "Web UI / UX",
      description: "High-fidelity design for Pila Pets, a barangay pet and resident registry system for Pila, Laguna. The design explores an admin dashboard with live metrics and charts, a searchable pet grid, a resident management table, and a public-facing webpage that tells the community story. The design directly inspired the working CodeIgniter 4 system I later built — you can see the code in the Projects section.",
      date: "2025",
      images: [
        "assets/images/designs/pila-pets-1-dashboard.png",
        "assets/images/designs/pila-pets-2-pets.png",
        "assets/images/designs/pila-pets-3-residents.png",
        "assets/images/designs/pila-pets-4-webpage.png"
      ],
      thumb: "assets/images/designs/pila-pets-1-dashboard.png",
      figmaUrl: "https://www.figma.com/design/agVQI1RvTZctGFOEtc9IRF/PAWS---Pila?node-id=0-1&t=HbXkrsKluCGOjG5O-1"
    },
    {
      id: "cardbank-redesign",
      name: "Card Bank Mobile App Re-Design",
      type: "Mobile UI / UX",
      description: "An academic UI/UX re-design for a fictional digital banking app called Card Bank. The design covers the core user journey — splash and onboarding, sign-in, dashboard, transaction history, transfer flow, and card management. The visual language uses a warm yellow-and-green palette with clean typography to convey approachability and trust.",
      date: "2025",
      images: [
        "assets/images/designs/cardbank-1-splash.png",
        "assets/images/designs/cardbank-2-signin.png",
        "assets/images/designs/cardbank-3-dashboard.png",
        "assets/images/designs/cardbank-4-history.png",
        "assets/images/designs/cardbank-5-transfer.png",
        "assets/images/designs/cardbank-6-card.png"
      ],
      thumbVariant: "portrait",
      thumb: "assets/images/designs/cardbank-1-splash.png",
      figmaUrl: "https://www.figma.com/design/tN6tLGgckMtgt7J9aXAiX7/card-bank-mobile?node-id=0-1&t=sEI2HZaVjThxYZZA-1"
    },
    {
      id: "lynville-design",
      name: "Lynville Homes 8 — HOA Management System",
      type: "Web UI / UX",
      description: "High-fidelity design for a client-driven capstone project — a web-based HOA management system built for Lynville Homes 8. The design went through multiple iterations with the HOA president, my thesis adviser, and a system expert, and covers role-based experiences for Admin, PR Officer, Auditor, Treasurer, and Committee members. This is a mid-development design snapshot; the working system (in the Projects section) includes additional features developed after this design pass, such as application submission and NLP-assisted processing.",
      date: "2025",
      images: [
        "assets/images/designs/lynville-1-signin.png",
        "assets/images/designs/lynville-2-changepassword.png",
        "assets/images/designs/lynville-3-dashboard.png",
        "assets/images/designs/lynville-4-announcements.png",
        "assets/images/designs/lynville-5-activities.png",
        "assets/images/designs/lynville-6-projects.png",
        "assets/images/designs/lynville-7-project-details.png",
        "assets/images/designs/lynville-8-payments.png",
        "assets/images/designs/lynville-9-pr-announcements.png",
        "assets/images/designs/lynville-10-auditor-finances.png"
      ],
      thumb: "assets/images/designs/lynville-3-dashboard.png",
      figmaUrl: "https://www.figma.com/design/PZoNGFQpO3zXCqjacTylce/hoa-management-system?node-id=0-1&t=OgYKoBkJS6Vo8wQv-1"
    },
    {
      id: "dental-design",
      name: "Dental Clinic Management System",
      type: "Web UI / UX",
      description: "UI/UX design for a full dental clinic management platform — designed and led by me as part of a team project with interns. The system serves four roles: Dentist, Patient, Staff, and Admin (plus a Super Admin tier), and covers appointment scheduling, patient records, billing and invoicing, earnings tracking, inventory management, and admin user controls. This was my first experience designing and directing a multi-role enterprise application, coordinating the design system across team members.",
      date: "2025",
      images: [
        "assets/images/designs/dental-1-landing.png",
        "assets/images/designs/dental-2-login.png",
        "assets/images/designs/dental-3-dentist-dashboard.png",
        "assets/images/designs/dental-4-dentist-appointments.png",
        "assets/images/designs/dental-5-dentist-earnings.png",
        "assets/images/designs/dental-6-patient-profile.png",
        "assets/images/designs/dental-7-patient-appointments.png",
        "assets/images/designs/dental-8-staff-patients.png",
        "assets/images/designs/dental-9-staff-billing.png",
        "assets/images/designs/dental-10-admin-users.png"
      ],
      thumb: "assets/images/designs/dental-3-dentist-dashboard.png",
      figmaUrl: "https://www.figma.com/design/nzaFmmLpToDIMR8bhyaoK9/Batch-3-Dental-Clinic?node-id=0-1&t=ZOxxdTbiS3D7HGEK-1"
    },
    {
      id: "clinica-design",
      name: "Clinica — Dental Clinic Mobile App",
      type: "Mobile UI / UX",
      description: "Academic UI/UX exercise: a mobile app design for a dental clinic, produced as a LinkedIn design challenge and graded by my professor. The design covers the full patient journey — splash, onboarding, sign-in, profile setup, appointment booking, confirmation, and medical records — with a focus on clean typography, generous whitespace, and a friendly medical aesthetic. A central part of the exercise was exploring the same core screens across multiple color palettes (brown, green, dark green variants alongside the default blue) to demonstrate a themable design system.",
      date: "2025",
      images: [
        "assets/images/designs/clinica-1-splash.png",
        "assets/images/designs/clinica-2-onboarding.png",
        "assets/images/designs/clinica-3-login.png",
        "assets/images/designs/clinica-4-appointments.png",
        "assets/images/designs/clinica-5-confirmation.png",
        "assets/images/designs/clinica-6-profile-brown.png",
        "assets/images/designs/clinica-7-profile-green.png",
        "assets/images/designs/clinica-8-profile-darkgreen.png"
      ],
      thumbVariant: "portrait",
      thumb: "assets/images/designs/clinica-1-splash.png",
      figmaUrl: "https://www.figma.com/design/7xVr9SpQ1rHjJNbVO9ZvX7/clinic-mobile?node-id=0-1&t=VEOK4a6UgQ00TVaR-1"
    },
    {
      id: "poea-design-desktop",
      name: "POEA Website Redesign — Desktop",
      type: "Web UI / UX",
      description: "Academic UI/UX exercise: a full desktop redesign of the POEA (Philippine Overseas Employment Administration) government website. The redesign restructures information architecture, modernizes the visual language, and makes key services — OFW support, LRA licensing, contact, and agency information — easier to find. The 5 selected pages cover the homepage, both major service categories, contact information, and the agency's mission and functions.",
      date: "2025",
      images: [
        "assets/images/designs/poea-1-frontpage.png",
        "assets/images/designs/poea-2-ofw-services.png",
        "assets/images/designs/poea-3-lra-services.png",
        "assets/images/designs/poea-4-contact.png",
        "assets/images/designs/poea-5-about.png"
      ],
      thumb: "assets/images/designs/poea-1-frontpage.png",
      figmaUrl: "https://www.figma.com/design/Mfm4FYo5bFc6JNC9lug9LH/poea-redesign-web-mobile?node-id=0-1&t=RDaPTR9wy7qfseX0-1"
    },
    {
      id: "poea-design-mobile",
      name: "POEA Website Redesign — Mobile Web",
      type: "Mobile Web UI / UX",
      description: "The mobile web counterpart to the POEA redesign — a responsive adaptation that preserves the same information architecture and content while optimizing for small screens. Shows how the desktop layout collapses gracefully: simplified navigation, stacked content cards, and touch-friendly controls.",
      date: "2025",
      images: [
        "assets/images/designs/poea-6-mobile-frontpage.png",
        "assets/images/designs/poea-7-mobile-services.png"
      ],
      thumbVariant: "portrait",
      thumb: "assets/images/designs/poea-6-mobile-frontpage.png",
      figmaUrl: "https://www.figma.com/design/Mfm4FYo5bFc6JNC9lug9LH/poea-redesign-web-mobile?node-id=0-1&t=RDaPTR9wy7qfseX0-1"
    }
  ],

  /* ------------------------------------------------------------------------
     ABOUT
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