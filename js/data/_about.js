/* ==========================================================================
   js/data/_about.js
   About section data — bio, education, awards, skills. Consumed by
   js/data.js aggregator.
   ========================================================================== */

(function () {
  "use strict";

  window.__portfolioData_about = {
    bio: [
      "Recent BS Information Technology graduate from Laguna State Polytechnic University with a full-stack development background and hands-on experience building and deploying production platforms. Delivered a community management system serving 500+ members with 99.9% uptime, and worked across React, Node.js, PostgreSQL, and AWS with Docker, Nginx, and GitHub Actions CI/CD.",
      "Focused on AI-assisted workflow automation and cloud deployment. Experienced in designing and operating automation pipelines, integrating LLMs, and applying retrieval-augmented generation to practical business problems. Based in Sta. Cruz, Laguna, and open to remote, hybrid, or onsite roles across Metro Manila."
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
      cloudDevops: ["AWS (EC2, RDS, S3)", "Docker", "Nginx", "PM2", "GitHub Actions", "CI/CD", "Cloudflare Tunnel", "Vercel"],
      ai: ["n8n", "AI Automation", "LLM Integration", "RAG (Retrieval-Augmented Generation)", "AI Agents", "Groq", "OpenAI APIs", "Google Gemini Embeddings", "MCP (Model Context Protocol)", "Supabase", "pgvector", "Telegram Bot API", "Prompt Engineering", "YOLO11", "DINOv2", "FAISS"],
      security: ["JWT Authentication", "RBAC", "Secure API Development", "OWASP Basics"],
      design: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "Mobile App Design", "Web App Design", "Color Theory", "Responsive Layouts"],
      other: ["PostgreSQL", "MySQL", "Git", "GitHub", "RESTful APIs", "Agile/Scrum", "Technical Documentation", "Workflow Orchestration", "Idempotent Design"]
    }
  };
})();