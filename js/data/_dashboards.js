/* ==========================================================================
   js/data/_dashboards.js
   Dashboards section data — 10 Lovable apps that serve as the UI layer
   for the n8n workflow portfolio. Consumed by js/data.js aggregator.
   ========================================================================== */

(function () {
  "use strict";

  window.__portfolioData_dashboards = [
    {
      id: "dash-lead-enrichment",
      name: "Lead Enrichment Pipeline",
      workflow: "Workflow 1 — HubSpot Lead Enrichment",
      description: "Interactive pipeline simulation showing domain normalization, Apify enrichment, Groq scoring, and HubSpot upsert.",
      tech: ["React", "TypeScript", "Tailwind", "n8n"],
      liveUrl: "https://lead-enrichment-pipeline.lovable.app",
      repoUrl: "https://github.com/Xhenzouu/lead-enrichment-pipeline",
      docUrl: "https://github.com/Xhenzouu/lead-enrichment-pipeline",
      thumb: "assets/images/dashboards/01-lead-enrichment.png"
    },
    {
      id: "dash-triagedesk",
      name: "Triagedesk",
      workflow: "Workflow 2 — Shopify Order Confirmation",
      description: "Order triage dashboard with HMAC verification status and mock HTML email previews.",
      tech: ["React", "TypeScript", "Tailwind", "n8n"],
      liveUrl: "https://triagedesk.lovable.app",
      repoUrl: "https://github.com/Xhenzouu/triagedesk",
      docUrl: "https://github.com/Xhenzouu/triagedesk",
      thumb: "assets/images/dashboards/02-triagedesk.png"
    },
    {
      id: "dash-getsync-command",
      name: "GetSync Command",
      workflow: "Workflow 3 — Shopify to HubSpot Sync",
      description: "Cursor-based sync monitor with per-run audit trail and HubSpot string-property preview.",
      tech: ["React", "TypeScript", "Tailwind", "n8n"],
      liveUrl: "https://getsync-command.lovable.app",
      repoUrl: "https://github.com/Xhenzouu/getsync-command",
      docUrl: "https://github.com/Xhenzouu/getsync-command",
      thumb: "assets/images/dashboards/03-getsync-command.png"
    },
    {
      id: "dash-airtable-notion-diff",
      name: "Airtable Notion Diff",
      workflow: "Workflow 4 — Airtable ↔ Notion Sync",
      description: "Split-screen conflict resolver with per-field highlighting and resolution actions.",
      tech: ["React", "TypeScript", "Tailwind", "n8n"],
      liveUrl: "https://airtable-notion-diff.lovable.app",
      repoUrl: "https://github.com/Xhenzouu/airtable-notion-diff",
      docUrl: "https://github.com/Xhenzouu/airtable-notion-diff",
      thumb: "assets/images/dashboards/04-airtable-notion-diff.png"
    },
    {
      id: "dash-stripe-fanout",
      name: "Stripe FanOut",
      workflow: "Workflow 5 — Stripe Payment Fan-Out",
      description: "Node-graph simulator for parallel payment fan-out with per-branch failure injection.",
      tech: ["React", "TypeScript", "Tailwind", "n8n"],
      liveUrl: "https://stripe-fanout.lovable.app",
      repoUrl: "https://github.com/Xhenzouu/stripe-fanout",
      docUrl: "https://github.com/Xhenzouu/stripe-fanout",
      thumb: "assets/images/dashboards/05-stripe-fanout.png"
    },
    {
      id: "dash-synchealth",
      name: "SyncHealth",
      workflow: "Workflow 6 — Google Calendar to Slack (OAuth)",
      description: "OAuth token lifecycle dashboard with reactive refresh handling and failure threshold alerts.",
      tech: ["React", "TypeScript", "Tailwind", "n8n"],
      liveUrl: "https://google-slack-sync.lovable.app",
      repoUrl: "https://github.com/Xhenzouu/google-slack-sync",
      docUrl: "https://github.com/Xhenzouu/google-slack-sync",
      thumb: "assets/images/dashboards/06-synchealth.png"
    },
    {
      id: "dash-data-ingest",
      name: "Data Ingest",
      workflow: "Workflow 7 — Spreadsheet Consolidation",
      description: "CSV ingestion and staged review with valid/suspicious/invalid row classification.",
      tech: ["React", "TypeScript", "Tailwind", "n8n"],
      liveUrl: "https://data-ingest.lovable.app",
      repoUrl: "https://github.com/Xhenzouu/data-ingest",
      docUrl: "https://github.com/Xhenzouu/data-ingest",
      thumb: "assets/images/dashboards/07-data-ingest.png"
    },
    {
      id: "dash-canvas-deadlines",
      name: "Canvas Deadlines",
      workflow: "Workflow 8 — Canvas Deadline Aggregator",
      description: "Kanban and list views for Canvas assignments, categorized by regex (Labs, KCs).",
      tech: ["React", "TypeScript", "Tailwind", "n8n"],
      liveUrl: "https://canvas-deadlines.lovable.app",
      repoUrl: "https://github.com/Xhenzouu/canvas-deadlines",
      docUrl: "https://github.com/Xhenzouu/canvas-deadlines",
      thumb: "assets/images/dashboards/08-canvas-deadlines.png"
    },
    {
      id: "dash-routeway",
      name: "Routeway",
      workflow: "Workflow 9 — Multi-Tenant Payments",
      description: "Tenant switcher with isolated credentials and per-tenant audit logs.",
      tech: ["React", "TypeScript", "Tailwind", "n8n"],
      liveUrl: "https://routeway-multi-tenant.lovable.app",
      repoUrl: "https://github.com/Xhenzouu/routeway-multi-tenant",
      docUrl: "https://github.com/Xhenzouu/routeway-multi-tenant",
      thumb: "assets/images/dashboards/09-routeway.png"
    },
    {
      id: "dash-workflow-health",
      name: "Workflow Health",
      workflow: "Workflow 10 — Portfolio Health Monitor",
      description: "Observability dashboard with KPI cards, ledger view, and Slack digest preview.",
      tech: ["React", "TypeScript", "Tailwind", "n8n"],
      liveUrl: "https://workflow-health.lovable.app",
      repoUrl: "https://github.com/Xhenzouu/workflow-health",
      docUrl: "https://github.com/Xhenzouu/workflow-health",
      thumb: "assets/images/dashboards/10-workflow-health.png"
    }
  ];
})();