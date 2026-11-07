/* ==========================================================================
   js/render/_bootstrap.js
   Part of the render pipeline. Loaded SEVENTH (LAST among partials,
   before the barrel).

   Owns:
     - window.__render.config  (all module-level constants)
     - renderSection()
     - renderAll()
     - The public window.render API assembly

   IMPORTANT: The data guard runs at renderAll() call time, not at
   parse time. This file is loaded asynchronously by js/render/index.js
   which itself waits for window.__dataReadyPromise before calling
   renderAll(). Doing the guard at parse time caused a race condition
   where _bootstrap.js loaded before js/data.js finished assembling
   window.portfolioData, and the whole render pipeline became a no-op.

   Load order requirement: _shell, _cards, _chips, _sections, _modal,
   _drawer must all have run before this file. Every partial's
   cross-partial reads happen inside function bodies, so ordering is
   only critical for the functions called here at init time.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__render) window.__render = {};

  // NOTE: The `data` reference is deferred. It used to be
  //   const data = window.portfolioData;
  // at parse time, which broke whenever the data barrel resolved after
  // this file. Instead, each SECTION_ITEM_CONFIG entry reads
  // window.portfolioData at call time via the getters below.

  function getData() {
    return window.portfolioData || {};
  }

  // ---------------------------------------------------------------------
  // Config — read by other partials via window.__render.config inside
  // function bodies. Never read at IIFE-init time in any partial.
  // ---------------------------------------------------------------------

  const DEFAULT_SECTION_ID = "projects";

    // Sections that emit a numeric count badge in the sidebar folder tree.
  // Any section with a SECTION_ITEM_CONFIG entry is "list-backed" and
  // can be counted. About and Contact are excluded because they aren't
  // list-backed (rendered by dedicated renderers, no numeric count).
  const COUNTED_SECTIONS = ["projects", "certifications", "experience", "designs", "trainings", "automation", "dashboards"];

  const MOBILE_TAB_SECTIONS = ["projects", "certifications", "experience"];
  const SECTIONS_WITH_CHIPS = ["projects"];

    const SECTION_ITEM_CONFIG = {
    projects: {
      items: () => getData().projects || [],
      title: (item) => item.name,
      meta: (item) => [item.category, item.date].filter(Boolean).join(" · "),
      chipKey: (item) => item.category
    },
    automation: {
      items: () => getData().automation || [],
      title: (item) => item.name,
      meta: (item) => [item.category, item.date].filter(Boolean).join(" · "),
      chipKey: null
    },
    dashboards: {
      items: () => getData().dashboards || [],
      title: (item) => item.name,
      meta: (item) => [item.workflow].filter(Boolean).join(" · "),
      chipKey: null
    },
    experience: {
      items: () => getData().experience || [],
      title: (item) => item.role,
      meta: (item) => [item.org, [item.startDate, item.endDate].filter(Boolean).join("–")]
        .filter(Boolean).join(" · "),
      chipKey: (item) => item.org
    },
    certifications: {
      items: () => getData().certifications || [],
      title: (item) => item.name,
      meta: (item) => [item.issuer, item.date].filter(Boolean).join(" · "),
      chipKey: (item) => item.issuer,
      thumbVariant: "portrait"
    },
    trainings: {
      items: () => getData().trainings || [],
      title: (item) => item.name,
      meta: (item) => [item.provider, item.hours != null ? item.hours + "h" : null]
        .filter(Boolean).join(" · "),
      chipKey: null
    },
    designs: {
      items: () => getData().designs || [],
      title: (item) => item.name,
      meta: (item) => item.type,
      chipKey: null,
      // Mobile screens are portrait; without this the thumbnail would
      // crop to a landscape slice and lose the whole point. The
      // portrait variant keeps the 16:10 box (uniform with every other
      // card) but letterboxes the image inside via object-fit: contain.
      thumbVariant: "portrait"
    }
  };

  const CHIP_CONTAINER_IDS = ["dashboard-filters", "drive-filters"];
  const GRID_MODE_CLASS = { about: "about-layout" };
  const STATIC_LAYOUT_SECTIONS = ["about", "contact"];

  window.__render.config = {
    DEFAULT_SECTION_ID,
    COUNTED_SECTIONS,
    MOBILE_TAB_SECTIONS,
    SECTIONS_WITH_CHIPS,
    SECTION_ITEM_CONFIG,
    CHIP_CONTAINER_IDS,
    GRID_MODE_CLASS,
    STATIC_LAYOUT_SECTIONS
  };

  // ---------------------------------------------------------------------
  // Composite renderers
  // ---------------------------------------------------------------------

  function renderSection(sectionId) {
    const cfg = window.__render.config || {};
    const targetId = window.__render.getSection(sectionId)
      ? sectionId
      : cfg.DEFAULT_SECTION_ID;
    window.__render.renderDashboard(targetId);
    window.__render.renderDriveGrid(targetId);
    window.__render.renderFilterChips(targetId);
    window.__render.renderBreadcrumb(targetId);
    window.__render.renderSectionHeader(targetId);
  }

  function renderAll() {
    // Call-time guard. If the data barrel hasn't finished yet, do not
    // silently no-op — warn so the cause is obvious in the console, and
    // leave the DOM as-is (the render barrel will retry if it fires
    // again after data resolves, but with the promise chain in
    // js/render/index.js that shouldn't happen).
    if (!window.portfolioData) {
      console.warn(
        "[render] renderAll() called before window.portfolioData was assembled. " +
        "Check that js/data/index.js is listed before js/render/index.js in index.html."
      );
      return;
    }

    window.__render.renderMeta();
    window.__render.hydrateIcons();
    window.__render.renderFolderTree();
    window.__render.renderCounts();
    window.__render.renderDrawerList();
    window.__render.renderMobileTabs();
    renderSection(window.__render.config.DEFAULT_SECTION_ID);
  }

  // ---------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------

  window.render = {
    renderAll: renderAll,
    renderMeta: window.__render.renderMeta,
    hydrateIcons: window.__render.hydrateIcons,
    renderThemeToggleIcons: window.__render.renderThemeToggleIcons,
    replaceIconSlot: window.__render.replaceIconSlot,
    renderFolderTree: window.__render.renderFolderTree,
    renderDashboard: window.__render.renderDashboard,
    renderDriveGrid: window.__render.renderDriveGrid,
    renderFilterChips: window.__render.renderFilterChips,
    renderDrawerList: window.__render.renderDrawerList,
    renderMobileTabs: window.__render.renderMobileTabs,
    renderBreadcrumb: window.__render.renderBreadcrumb,
    renderSectionHeader: window.__render.renderSectionHeader,
    renderCounts: window.__render.renderCounts,
    renderSection: renderSection,
    renderModalContent: window.__render.renderModalContent,
    renderContactSection: window.__render.renderContactSection
  };
})();