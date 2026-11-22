/* ==========================================================================
   js/data/_about.js
   About section data — bio, education, awards, skills. Consumed by
   js/data.js aggregator.
   ========================================================================== */

const data = {
    bio: [
      "I eliminate manual administrative bottlenecks and brittle operations by shipping fault-tolerant, full-stack web platforms. From replacing spreadsheet-heavy workflows for 500+ community members to deploying multi-tenant booking and clinic management systems on AWS, I focus on reliable software built with React, Node.js, PostgreSQL, Docker, Nginx, and automated CI/CD pipelines.",
      "Beyond core web applications, I turn repetitive operational tasks into autonomous systems—designing event-driven n8n pipelines, LLM integrations, and retrieval-augmented generation (RAG) workflows that cut response times and manual data entry. BS Information Technology graduate from Laguna State Polytechnic University, based in Sta. Cruz, Laguna and open to remote, hybrid, or onsite engineering roles across Metro Manila."
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
export default data;
