/* ==========================================================================
   js/data/_sections.js
   Sidebar section manifest. Consumed by js/data.js aggregator.
   ========================================================================== */

(function () {
  "use strict";

  window.__portfolioData_sections = [
    { id: "about",           label: "About",           icon: "info",             hasChildren: false },
    { id: "automation",      label: "Automation",      icon: "workflow",         hasChildren: true  },
    { id: "dashboards",      label: "Dashboards",      icon: "layout-grid",      hasChildren: false },
    { id: "projects",        label: "Projects",        icon: "folder",           hasChildren: true  },
    { id: "experience",      label: "Experience",      icon: "briefcase",        hasChildren: true  },
    { id: "designs",         label: "Designs",         icon: "palette",          hasChildren: false },
    { id: "trainings",       label: "Trainings",       icon: "graduation-cap",   hasChildren: false },
    { id: "certifications",  label: "Certifications",  icon: "award",            hasChildren: true  },
    { id: "contact",         label: "Contact",         icon: "mail",             hasChildren: false }
  ];
})();