/* ==========================================================================
   js/data/_automation.js
   Automation section data — 20 n8n workflow case studies. Consumed by
   js/data.js aggregator.

   Items 1-10 are from platform-integration-portfolio (Commercial SaaS).
   Items 11-20 are from n8n-automation-portfolio (AI/RAG/Agents).
   ========================================================================== */

(function () {
  "use strict";

  window.__portfolioData_automation = [
    // --- PLATFORM INTEGRATION PORTFOLIO (1-10) ---
    {
      id: "hubspot-lead-enrichment-pipeline",
      name: "HubSpot Lead Enrichment Pipeline",
      category: "CRM / Enrichment",
      date: "2026",
      pattern: "Webhook, API enrichment, conditional deal creation",
      description: "Receives inbound leads via webhook, enriches them with Apify, scores them with Groq (LLM), and creates a HubSpot contact with a conditional deal. Includes a Supabase audit log.",
      docUrl: "https://github.com/Xhenzouu/platform-integration-portfolio/blob/main/docs/workflows/01-hubspot-lead-enrichment-pipeline.md",
      thumb: "assets/images/automation/01-hubspot-lead-enrichment-pipeline.png",
      thumbVariant: "contain"
    },
    {
      id: "shopify-order-confirmation-pipeline",
      name: "Shopify Order Confirmation Pipeline",
      category: "E-commerce / Webhooks",
      date: "2026",
      pattern: "HMAC verification, HTML email, order notes",
      description: "Receives Shopify order webhooks, verifies HMAC signatures, sends a rich HTML receipt email via Resend, updates the Shopify order note, and logs the transaction to Supabase.",
      docUrl: "https://github.com/Xhenzouu/platform-integration-portfolio/blob/main/docs/workflows/02-shopify-order-confirmation-pipeline.md",
      thumb: "assets/images/automation/02-shopify-order-confirmation-pipeline.png",
      thumbVariant: "contain"
    },
    {
      id: "shopify-to-hubspot-customer-sync",
      name: "Shopify to HubSpot Customer Sync",
      category: "Scheduled Sync",
      date: "2026",
      pattern: "Scheduled sync, cursor pagination, batch upsert",
      description: "Runs on a schedule to fetch updated Shopify customers via cursor pagination, upserts them into HubSpot with order statistics, and logs sync state and failures in Supabase.",
      docUrl: "https://github.com/Xhenzouu/platform-integration-portfolio/blob/main/docs/workflows/03-shopify-to-hubspot-customer-sync.md",
      thumb: "assets/images/automation/03-shopify-to-hubspot-customer-sync.png",
      thumbVariant: "contain"
    },
    {
      id: "airtable-notion-two-way-sync",
      name: "Airtable ↔ Notion Two-Way Sync",
      category: "Bidirectional Sync",
      date: "2026",
      pattern: "Per-record state, conflict detection",
      description: "A scheduled workflow that keeps Airtable and Notion in sync bidirectionally. Uses per-record state to detect changes, flags conflicts for manual review, and logs every sync run.",
      docUrl: "https://github.com/Xhenzouu/platform-integration-portfolio/blob/main/docs/workflows/04-airtable-notion-two-way-sync.md",
      thumb: "assets/images/automation/04-airtable-notion-two-way-sync.png",
      thumbVariant: "contain"
    },
    {
      id: "stripe-payment-fanout",
      name: "Stripe Payment Fan-Out",
      category: "Payments / Fan-Out",
      date: "2026",
      pattern: "Webhook, parallel fan-out, partial-failure handling",
      description: "Verifies Stripe webhook signatures using a companion Node.js process, fans out payment notifications to Slack, Airtable, and Resend in parallel, and logs per-branch outcomes so one failure doesn't crash the others.",
      docUrl: "https://github.com/Xhenzouu/platform-integration-portfolio/blob/main/docs/workflows/05-stripe-payment-fanout.md",
      thumb: "assets/images/automation/05-stripe-payment-fanout.png",
      thumbVariant: "contain"
    },
    {
      id: "google-calendar-oauth-slack",
      name: "Google Calendar → Slack with OAuth",
      category: "OAuth / Scheduling",
      date: "2026",
      pattern: "OAuth 2.0 refresh, token health monitoring, idempotency",
      description: "Fetches upcoming Google Calendar events on a schedule, handles OAuth token refresh automatically, posts meeting summaries to Slack, and triggers an alert on three consecutive refresh failures.",
      docUrl: "https://github.com/Xhenzouu/platform-integration-portfolio/blob/main/docs/workflows/06-google-calendar-oauth-slack.md",
      thumb: "assets/images/automation/06-google-calendar-oauth-slack.png",
      thumbVariant: "contain"
    },
    {
      id: "spreadsheet-import-validation",
      name: "Spreadsheet Validation Pipeline",
      category: "File Processing",
      date: "2026",
      pattern: "Form upload, schema normalization, staged review",
      description: "Accepts XLSX/CSV uploads via an n8n Form, normalizes headers to a canonical schema, classifies rows as valid or invalid, and stages them for manual review before a separate commit workflow inserts them.",
      docUrl: "https://github.com/Xhenzouu/platform-integration-portfolio/blob/main/docs/workflows/07-spreadsheet-import-validation.md",
      thumb: "assets/images/automation/07-spreadsheet-import-validation.png",
      thumbVariant: "contain"
    },
    {
      id: "canvas-deadline-aggregator",
      name: "Canvas Deadline Aggregator",
      category: "Education / API",
      date: "2026",
      pattern: "Paginated fan-out, regex categorization, Slack Block Kit",
      description: "Fetches all active Canvas courses, iterates through paginated assignments, categorizes them by regex (labs, KCs), and posts a daily grouped Slack digest of unsubmitted work to prevent pile-ups.",
      docUrl: "https://github.com/Xhenzouu/platform-integration-portfolio/blob/main/docs/workflows/08-canvas-deadline-aggregator.md",
      thumb: "assets/images/automation/08-canvas-deadline-aggregator.png",
      thumbVariant: "contain"
    },
    {
      id: "multi-tenant-payment-notifications",
      name: "Multi-Tenant Payment Notifications",
      category: "Multi-Tenant / Dynamic Auth",
      date: "2026",
      pattern: "Webhook, dynamic credential routing, tenant isolation",
      description: "Receives Stripe webhooks, looks up the specific tenant's API key and Slack webhook from Supabase at runtime, fetches the real PaymentIntent, and notifies the tenant without leaking data between accounts.",
      docUrl: "https://github.com/Xhenzouu/platform-integration-portfolio/blob/main/docs/workflows/09-multi-tenant-payment-notifications.md",
      thumb: "assets/images/automation/09-multi-tenant-payment-notifications.png",
      thumbVariant: "contain"
    },
    {
      id: "portfolio-health-monitor",
      name: "Portfolio Health Monitor",
      category: "Meta-Monitoring",
      date: "2026",
      pattern: "Cross-workflow aggregation, stale detection",
      description: "A daily rollup that queries the audit tables of all 9 previous workflows, normalizes their different status schemas, computes a health score (healthy, attention, stale), and sends a Slack Block Kit digest to the #portfolio-health channel.",
      docUrl: "https://github.com/Xhenzouu/platform-integration-portfolio/blob/main/docs/workflows/10-portfolio-health-monitor.md",
      thumb: "assets/images/automation/10-portfolio-health-monitor.png",
      thumbVariant: "contain"
    },

    // --- AI AUTOMATION PORTFOLIO (11-20) ---
    {
      id: "github-good-first-issue-notifier",
      name: "GitHub Good First Issue Notifier",
      category: "Developer Tooling",
      date: "2026",
      pattern: "Scheduled poll, filter, email",
      description: "A scheduled workflow that polls GitHub for issues labelled good first issue, filters them against a curated set of criteria, and sends a digest email. Built to help newcomers find approachable open-source work without manually scanning repositories.",
      docUrl: "https://github.com/Xhenzouu/n8n-automation-portfolio/blob/main/docs/workflows/01-github-notifier.md",
      thumb: "assets/images/automation/11-github-notifier.png",
      thumbVariant: "contain"
    },
    {
      id: "ai-log-classifier",
      name: "AI Log Classifier",
      category: "AI Classification",
      date: "2026",
      pattern: "Webhook, LLM classify, conditional Telegram alert",
      description: "A webhook endpoint that receives application logs, routes them through an LLM for severity and category classification, and pushes only high-priority entries to Telegram. Reduces alert noise by filtering routine log lines before they reach the on-call channel.",
      docUrl: "https://github.com/Xhenzouu/n8n-automation-portfolio/blob/main/docs/workflows/02-ai-log-classifier.md",
      thumb: "assets/images/automation/12-ai-log-classifier.png",
      thumbVariant: "contain"
    },
    {
      id: "error-handler",
      name: "Error Handler",
      category: "Reliability",
      date: "2026",
      pattern: "Cross-workflow failure notification",
      description: "A shared error handler that other workflows call when they fail. Captures the failing workflow name, the error payload, and a timestamp, then routes a structured notification to the appropriate channel. Provides a single point of failure visibility across the workflow suite.",
      docUrl: "https://github.com/Xhenzouu/n8n-automation-portfolio/blob/main/docs/workflows/03-error-handler.md",
      thumb: "assets/images/automation/13-error-handler.png",
      thumbVariant: "contain"
    },
    {
      id: "af-homes-inquiry-intake",
      name: "AF Homes Inquiry Intake",
      category: "RAG Pipeline",
      date: "2026",
      pattern: "RAG pipeline with vector search and grounded reply drafting",
      description: "An inquiry intake workflow for a real estate agency. Incoming messages are embedded, matched against a vector store of property documents and prior replies, and a grounded draft response is generated. The reply cites the source documents so the agent can verify before sending.",
      docUrl: "https://github.com/Xhenzouu/n8n-automation-portfolio/blob/main/docs/workflows/04-af-homes-inquiry-intake.md",
      thumb: "assets/images/automation/14-af-homes-inquiry-intake.png",
      thumbVariant: "contain"
    },
    {
      id: "ai-lead-qualification-agent",
      name: "AI Lead Qualification Agent",
      category: "AI Scoring",
      date: "2026",
      pattern: "Deterministic LLM scoring with machine-readable audit trail",
      description: "A lead qualification workflow that scores inbound leads using a deterministic LLM prompt with a fixed rubric. Every score is written to a structured audit trail including the rubric version, the model used, and the raw reasoning, so scores can be reviewed or replayed.",
      docUrl: "https://github.com/Xhenzouu/n8n-automation-portfolio/blob/main/docs/workflows/05-ai-lead-qualification-agent.md",
      thumb: "assets/images/automation/15-ai-lead-qualification-agent.png",
      thumbVariant: "contain"
    },
    {
      id: "invoice-processing-pipeline",
      name: "Invoice Processing Pipeline",
      category: "Document Processing",
      date: "2026",
      pattern: "PDF extraction, 3-branch validation, per-status routing",
      description: "An invoice processing pipeline that extracts structured fields from incoming PDFs, runs validation across three branches (extraction quality, vendor match, amount sanity), and routes each invoice by status: auto-approved, needs review, or rejected with reason. Replaces manual data entry with an auditable flow.",
      docUrl: "https://github.com/Xhenzouu/n8n-automation-portfolio/blob/main/docs/workflows/06-invoice-processing-pipeline.md",
      thumb: "assets/images/automation/16-invoice-processing-pipeline.png",
      thumbVariant: "contain"
    },
    {
      id: "customer-support-agent",
      name: "Customer Support Agent",
      category: "Conversational AI",
      date: "2026",
      pattern: "Conversational AI agent with tool calling and persistent memory",
      description: "A conversational support agent that handles inbound customer questions using tool calling and persistent memory. It can look up order status, retrieve policy documents, and escalate to a human when confidence is low. State is preserved across turns so the customer does not repeat context.",
      docUrl: "https://github.com/Xhenzouu/n8n-automation-portfolio/blob/main/docs/workflows/07-customer-support-agent.md",
      thumb: "assets/images/automation/17-customer-support-agent.png",
      thumbVariant: "contain"
    },
    {
      id: "human-in-the-loop-approval",
      name: "Human-in-the-Loop Approval",
      category: "Approval Workflow",
      date: "2026",
      pattern: "AI refinement plus Telegram inline keyboard approval",
      description: "An approval workflow for AI-generated content. A draft is generated and refined by an LLM, then posted to a Telegram chat with inline keyboard buttons for approve, edit, or reject. The chosen action is written back to the source system and the original requester is notified.",
      docUrl: "https://github.com/Xhenzouu/n8n-automation-portfolio/blob/main/docs/workflows/08-human-in-the-loop-approval.md",
      thumb: "assets/images/automation/18-human-in-the-loop-approval.png",
      thumbVariant: "contain"
    },
    {
      id: "mcp-integration-server",
      name: "MCP Integration Server",
      category: "Developer Tooling",
      date: "2026",
      pattern: "n8n workflows exposed as MCP tools for Claude Code",
      description: "An MCP server that exposes selected n8n workflows as tools callable from Claude Code. Lets AI-assisted development sessions invoke project-specific automations without leaving the editor, and provides a clean boundary between the AI client and the underlying workflow logic.",
      docUrl: "https://github.com/Xhenzouu/n8n-automation-portfolio/blob/main/docs/workflows/09-mcp-integration-server.md",
      thumb: "assets/images/automation/19-mcp-integration-server.png",
      thumbVariant: "contain"
    },
    {
      id: "workflow-health-monitor",
      name: "Workflow Health Monitor",
      category: "Reliability",
      date: "2026",
      pattern: "Cross-workflow failure classification, retry, and Telegram escalation",
      description: "A monitor that watches the health of every other workflow in the suite. Failures are classified by type (timeout, auth, rate limit, data error), retried automatically when appropriate, and escalated to Telegram with a classification summary when the retry budget is exhausted.",
      docUrl: "https://github.com/Xhenzouu/n8n-automation-portfolio/blob/main/docs/workflows/10-workflow-health-monitor.md",
      thumb: "assets/images/automation/20-workflow-health-monitor.png",
      thumbVariant: "contain"
    }
  ];
})();