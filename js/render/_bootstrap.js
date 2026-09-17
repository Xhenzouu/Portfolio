/* ==========================================================================
   js/render/_bootstrap.js
   Part of the render pipeline. Loaded SEVENTH (LAST among partials,
   before the barrel).

   Owns:
     - window.__render.config  (all module-level constants)
     - renderSection()
     - renderAll()
     - The public window.render API assembly
     - The top-level guard for missing window.portfolioData

   Load order requirement: _shell, _cards, _chips, _sections, _modal,
   _drawer must all have run before this file. Every partial's
   cross-partial reads happen inside function bodies, so ordering is
   only critical for the functions called here at init time.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__render) window.__render = {};

  // ---------------------------------------------------------------------
  // Guard
  // ---------------------------------------------------------------------

  if (!window.portfolioData) {
    console.warn(
      "[render] window.portfolioData is missing. " +
      "Make sure js/data.js is loaded before js/render/*. Rendering skipped."
    );
    window.render = {
      renderAll: function () {},
      renderMeta: function () {},
      hydrateIcons: function () {},
      renderThemeToggleIcons: function () {},
      replaceIconSlot: function () {},
      renderFolderTree: function () {},
      renderDashboard: function () {},
      renderDriveGrid: function () {},
      renderFilterChips: function () {},
      renderDrawerList: function () {},
      renderMobileTabs: function () {},
      renderBreadcrumb: function () {},
      renderSectionHeader: function () {},
      renderCounts: function () {},
      renderSection: function () {},
      renderModalContent: function () {},
      renderContactSection: function () {}
    };
    return;
  }

  const data = window.portfolioData;

  // ---------------------------------------------------------------------
  // Config — read by other partials via window.__render.config inside
  // function bodies. Never read at IIFE-init time in any partial.
  // ---------------------------------------------------------------------

  const DEFAULT_SECTION_ID = "projects";

  // Sections that emit a numeric count badge in the sidebar folder tree.
  // Any section with a SECTION_ITEM_CONFIG entry is "list-backed" and
  // can be counted. Designs is excluded because it holds a single
  // project whose name is already unique — a "1" badge would be noise.
  // About and Contact are excluded because they aren't list-backed.
  const COUNTED_SECTIONS = ["projects", "certifications", "experience", "designs", "trainings"];

  const MOBILE_TAB_SECTIONS = ["projects", "certifications", "experience"];
  const SECTIONS_WITH_CHIPS = ["projects"];

  const SECTION_ITEM_CONFIG = {
    projects: {
      items: () => data.projects,
      title: (item) => item.name,
      meta: (item) => [item.category, item.date].filter(Boolean).join(" · "),
      chipKey: (item) => item.category
    },
    experience: {
      items: () => data.experience,
      title: (item) => item.role,
      meta: (item) => [item.org, [item.startDate, item.endDate].filter(Boolean).join("–")]
        .filter(Boolean).join(" · "),
      chipKey: (item) => item.org
    },
    certifications: {
      items: () => data.certifications,
      title: (item) => item.name,
      meta: (item) => [item.issuer, item.date].filter(Boolean).join(" · "),
      chipKey: (item) => item.issuer,
      thumbVariant: "portrait"
    },
    trainings: {
      items: () => data.trainings,
      title: (item) => item.name,
      meta: (item) => [item.provider, item.hours != null ? item.hours + "h" : null]
        .filter(Boolean).join(" · "),
      chipKey: null
    },
    designs: {
      items: () => data.designs,
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