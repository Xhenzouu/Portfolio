/* ==========================================================================
   js/interactions/_sidebar.js
   Part of the interactions pipeline. Loaded EIGHTH.

   Sidebar collapse toggle. Reads qs from window.__interactions.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__interactions) window.__interactions = {};

  const SELECTORS = {
    sidebarCollapseBtn: "#sidebar-collapse-btn",
    explorerShell: "#explorer-shell"
  };

  function qs(selector, root) { return window.__interactions.qs(selector, root); }

  function toggleSidebarCollapse() {
    const shell = qs(SELECTORS.explorerShell);
    const btn = qs(SELECTORS.sidebarCollapseBtn);
    if (!shell || !btn) return;
    const isCollapsed = shell.classList.toggle("is-sidebar-collapsed");
    btn.setAttribute("aria-expanded", String(!isCollapsed));
  }

  window.__interactions.toggleSidebarCollapse = toggleSidebarCollapse;
})();