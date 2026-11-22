/* ==========================================================================
   js/data/_projects.js
   Projects section data. Consumed by js/data.js aggregator.
   ========================================================================== */

const data = [
    {
      id: "xirv-systems",
      name: "XIRV Systems",
      category: "Full-Stack / AI",
      date: "July 2026 – Present",
      description: "A secure enterprise platform with JWT auth, RBAC, secure API endpoints, and modular layered architecture. Includes an AI-powered RAG system with vector search, embeddings, and an internal retrieval gateway. Deployed on AWS with CI/CD.",
      tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "AWS (EC2, RDS, S3)", "GitHub Actions"],
      features: [
        "Secures enterprise workspaces with rotating JWT sessions, granular USER/ADMIN/SUPER_ADMIN permissions, and auditable actions.",
        "Turns uploaded, categorized knowledge into searchable answers with pgvector-backed RAG and a provider-agnostic AI gateway for OpenAI, Ollama, and Anthropic.",
        "Coordinates approvals and task workflows on an AWS deployment with Redis caching, rate limits, CI/CD, and a 52+ test Vitest suite."
      ],
      repoUrl: "https://github.com/Xhenzouu/xirv-systems",
      liveUrl: null,
      featured: true,
      thumb: "/assets/images/projects/xirv-systems.png"
    },
    {
      id: "lynville-homes-8",
      name: "Lynville Homes 8",
      category: "Full-Stack",
      date: "March 2025 – December 2025",
      description: "A full-featured HOA platform serving 500+ members with automated notifications and reporting. Provisioned AWS cloud infrastructure with Nginx reverse proxy and PM2, achieving 99.9% uptime. Streamlined core administrative workflows, reducing manual effort by 40%.",
      tech: ["React", "Node.js", "Express", "PostgreSQL", "AWS (EC2, RDS)", "Nginx", "PM2"],
      features: [
        "Serves 500+ residents with role-specific access and a community hub for announcements, activities, polls, projects, and threaded discussion.",
        "Replaces manual HOA administration with member and content management, payment tracking, approval queues, and real-time WebSocket alerts.",
        "Sustains 99.9% uptime on AWS using Nginx, PM2, HTTPS, Cloudflare CDN, and GitHub Actions deployments; reduces manual effort by 40%."
      ],
      repoUrl: "https://github.com/Xhenzouu/lynvillehomes8",
      liveUrl: null,
      featured: true,
      thumb: "/assets/images/projects/lynville-homes-8.png"
    },
    {
      id: "pila-pets",
      name: "Pila Pets",
      category: "Web / Community",
      date: "December 2025",
      description: "A community pet platform with registration, lost reports, adoption listings, and search/filter. Full CRUD operations, authentication, and role-based access (resident/admin). Built as a DICT certification project.",
      tech: ["CodeIgniter 4", "PHP 8.2", "MySQL", "Bootstrap 5"],
      features: [
        "Protects resident and administrator workflows with staff authentication and route-level role checks through AuthFilter and AdminFilter.",
        "Centralizes barangay resident, pet-owner, pet, and staff records with linked CRUD workflows for accurate community data.",
        "Gives administrators an activity overview and focused resident, authentication, and admin screens to support day-to-day pet services."
      ],
      repoUrl: "https://github.com/Xhenzouu/pila-pets",
      liveUrl: "https://youtu.be/I4n8shvS1ZY",
      featured: false,
      thumb: "/assets/images/projects/pila-pets.png"
    },
    {
      id: "lost-pet-ai",
      name: "Lost Pet Reunion AI — Pila, Laguna",
      category: "ML / AI",
      date: "2025 – 2026",
      description: "A machine learning–powered community project that predicts the likelihood of a lost pet being reunited with its owner in Pila, Laguna. Uses YOLO11 pet detection + DINOv2-small embeddings + FAISS cosine similarity search, plus a RandomForest tabular predictor with a Streamlit UI.",
      tech: ["Python", "Streamlit", "Scikit-learn", "YOLO11", "DINOv2", "FAISS", "PostgreSQL", "Cloudinary"],
      features: [
        "Combines a RandomForest recovery-likelihood model with YOLO11 detection and automatic image crops to help prioritize lost-pet cases.",
        "Finds visually similar animals using 384-dimensional DINOv2 embeddings and FAISS cosine search, with PostgreSQL JSONB storage and Cloudinary images.",
        "Presents results through a Streamlit workflow for community users and includes embedding migration support for evolving model data."
      ],
      repoUrl: "https://github.com/Xhenzouu/lost-pet-ai",
      liveUrl: "https://lost-pet-ai.streamlit.app/",
      featured: true,
      thumb: "/assets/images/projects/lost-pet-ai.png"
    },
    {
      id: "gaming-rigz",
      name: "GamingRigz",
      category: "Desktop / POS",
      date: "2023",
      description: "A Windows desktop application for managing sales and inventory of gaming rig parts. Handles login, registration, password retrieval, stock tracking, order creation, order history, archiving, and sales reporting, with SQL Server as the data layer.",
      tech: ["C#", ".NET Framework", "WinForms", "SQL Server", "T-SQL", "ADO.NET"],
      features: [
        "Supports staff account registration, sign-in, and password recovery in a Windows point-of-sale workflow.",
        "Tracks gaming components and accessory inventory with color-coded stock levels to surface replenishment needs.",
        "Records sales from checkout through receipt generation, order history, archives, and reports backed by SQL Server."
      ],
      repoUrl: "https://github.com/Xhenzouu/GamingRigz",
      liveUrl: null,
      featured: false,
      thumb: "/assets/images/projects/gaming-rigz.png"
    },
    {
      id: "chairable",
      name: "Chairable",
      category: "E-Commerce",
      date: "2024",
      description: "A full-stack e-commerce platform for furniture and home decor, with user and seller registration, product browsing by category, cart, checkout, and a mobile version in Flutter.",
      tech: ["HTML", "CSS", "JavaScript", "Python (Flask)", "PostgreSQL", "Flutter (Dart)"],
      features: [
        "Onboards shoppers and verified sellers with OTP account recovery, business-document review, and admin-managed approvals and commissions.",
        "Helps customers discover furniture through category browsing, search, filters, comparison, favorites, and product promotions.",
        "Connects cart, checkout, and order tracking with live chat and a Flutter app sharing the Flask/PostgreSQL backend."
      ],
      repoUrl: "https://github.com/Xhenzouu/Chairable",
      liveUrl: null,
      featured: false,
      thumb: "/assets/images/projects/chairable.png"
    },
    {
      id: "lspu-events",
      name: "LSPU Events Management System",
      category: "Web / Academic",
      date: "2024",
      description: "A PHP and MySQL web system for managing university events at LSPU — login/registration, full event CRUD, search, and PDF report generation via TCPDF.",
      tech: ["PHP", "MySQL", "TCPDF", "HTML", "CSS"],
      features: [
        "Provides account registration, sign-in, and password recovery for authorized event staff.",
        "Manages university events end to end with create, edit, delete, and searchable event records.",
        "Produces shareable PDF event reports with TCPDF and consistent navigation across the management screens."
      ],
      repoUrl: "https://github.com/Xhenzouu/lspu-event-management-system",
      liveUrl: null,
      featured: false,
      thumb: "/assets/images/projects/lspu-events.png"
    },
    {
      id: "employee-management-system",
      name: "Employee Management System",
      category: "Web / HR",
      date: "2024",
      description: "A CodeIgniter 4 employee management system with authentication, full employee CRUD, a metrics-driven dashboard, and a dark theme UI.",
      tech: ["PHP", "CodeIgniter 4", "MySQL", "Composer", "PHPUnit"],
      features: [
        "Restricts HR tools through authenticated routes and CodeIgniter AuthFilter access controls.",
        "Centralizes employee record creation, review, updates, and removal with a metrics-driven admin dashboard.",
        "Includes a consistent dark-theme interface, MySQL schema, and PHPUnit-ready project setup for maintainable operation."
      ],
      repoUrl: "https://github.com/Xhenzouu/employee-management-system",
      liveUrl: null,
      featured: false,
      thumb: "/assets/images/projects/employee-management-system.png"
    },
    {
      id: "bookmuna",
      name: "BookMuna",
      category: "Full-Stack / SaaS",
      date: "2026",
      description: "Multi-tenant appointment-booking and scheduling platform built for local Philippine service businesses (clinics, barbershops, and cafes).",
      tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Google Cloud", "Google Sign-In / OAuth"],
      features: [
        "Gives clinics, barbershops, and cafes isolated multi-tenant workspaces to publish services and manage appointment schedules.",
        "Automates payment status updates through PayMongo/GCash checkout and webhook integrations, reducing manual reconciliation for bookings.",
        "Manages live availability and slot reservations to prevent double-bookings and resolve schedule conflicts as customers book."
      ],
      repoUrl: null,
      liveUrl: "https://bookmuna.com",
      featured: true,
      thumb: "/assets/images/bookmuna-banner.png"
    }
];
export default data;
