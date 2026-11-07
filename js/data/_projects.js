/* ==========================================================================
   js/data/_projects.js
   Projects section data. Consumed by js/data.js aggregator.
   ========================================================================== */

(function () {
  "use strict";

  window.__portfolioData_projects = [
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
  ];
})();