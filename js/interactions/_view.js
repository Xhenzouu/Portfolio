/* ==========================================================================
   js/interactions/_view.js
   Part of the interactions pipeline. Loaded THIRD.

   Grid/list view toggle. Reads qs from window.__interactions.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__interactions) window.__interactions = {};

  const SELECTORS = {
    dashboardGrid: "#dashboard-grid",
    viewGrid: "#view-toggle-grid",
    viewList: "#view-toggle-list"
  };

  function qs(selector, root) { return window.__interactions.qs(selector, root); }

  function setView(view) {
    const grid = qs(SELECTORS.dashboardGrid);
    const gridBtn = qs(SELECTORS.viewGrid);
    const listBtn = qs(SELECTORS.viewList);
    if (grid) grid.classList.toggle("is-list", view === "list");
    if (gridBtn) gridBtn.setAttribute("aria-pressed", String(view === "grid"));
    if (listBtn) listBtn.setAttribute("aria-pressed", String(view === "list"));
  }

  function handleViewToggleClick(e) {
    const gridBtn = e.target.closest(SELECTORS.viewGrid);
    const listBtn = e.target.closest(SELECTORS.viewList);
    if (gridBtn) setView("grid");
    else if (listBtn) setView("list");
  }

  window.__interactions.setView = setView;
  window.__interactions.handleViewToggleClick = handleViewToggleClick;
})();