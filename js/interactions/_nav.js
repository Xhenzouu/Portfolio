/* ==========================================================================
   js/interactions/_nav.js
   Part of the interactions pipeline. Loaded FIRST among interactions
   partials.

   Owns:
     - qs / qsa (shared DOM helpers, exposed on window.__interactions)
     - getActiveSectionId (exposed; read by _modal.js)
     - handleFolderTreeClick, navigateToSection, syncActiveSection,
       handleTabClick, handleDrawerLinkClick

   Cross-partial reads (inside function bodies only):
     - window.__interactions.state.activeCategory (from _chips.js)
     - window.__interactions.filterCards / getCurrentSearchQuery
       (from _search.js)
     - window.__interactions.closeDrawer (from _drawer.js)
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__interactions) window.__interactions = {};
  if (!window.__interactions.state) window.__interactions.state = {};

  const SELECTORS = {
    folderLeaf: ".folder-tree__leaf",
    driveTab: ".drive-tabs__tab",
    drawerLink: ".drive-drawer__link"
  };

  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function getActiveSectionId() {
    const activeLeaf = qs(SELECTORS.folderLeaf + ".is-active");
    if (activeLeaf) {
      const s = activeLeaf.getAttribute("data-section");
      if (s) return s;
    }
    const activeTab = qs(SELECTORS.driveTab + ".is-active");
    if (activeTab) {
      const s = activeTab.getAttribute("data-section");
      if (s) return s;
    }
    return undefined;
  }

  function handleFolderTreeClick(e) {
    const leaf = e.target.closest(SELECTORS.folderLeaf);
    if (!leaf) return;
    const sectionId = leaf.getAttribute("data-section");
    if (sectionId) navigateToSection(sectionId);
  }

  function navigateToSection(sectionId) {
    window.__interactions.state.activeCategory = "all";

    if (window.render && typeof window.render.renderSection === "function") {
      window.render.renderSection(sectionId);
    } else {
      console.warn('[interactions] window.render.renderSection unavailable; cannot navigate to "' + sectionId + '".');
    }

    if (typeof window.__interactions.filterCards === "function") {
      window.__interactions.filterCards(window.__interactions.getCurrentSearchQuery());
    }

    syncActiveSection(sectionId);
  }

  function syncActiveSection(sectionId) {
    qsa(SELECTORS.driveTab).forEach((tab) => {
      const isActive = tab.getAttribute("data-section") === sectionId;
      tab.classList.toggle("is-active", isActive);
      if (isActive) tab.setAttribute("aria-current", "page");
      else tab.removeAttribute("aria-current");
    });
    qsa(SELECTORS.folderLeaf).forEach((leaf) => {
      const isActive = leaf.getAttribute("data-section") === sectionId;
      leaf.classList.toggle("is-active", isActive);
      if (isActive) leaf.setAttribute("aria-current", "page");
      else leaf.removeAttribute("aria-current");
    });
    qsa(SELECTORS.drawerLink).forEach((link) => {
      const isActive = link.getAttribute("data-section") === sectionId;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function handleTabClick(e) {
    const tab = e.target.closest(SELECTORS.driveTab);
    if (!tab) return;
    const sectionId = tab.getAttribute("data-section");
    if (sectionId) navigateToSection(sectionId);
  }

  function handleDrawerLinkClick(e) {
    const link = e.target.closest(SELECTORS.drawerLink);
    if (!link) return;
    const sectionId = link.getAttribute("data-section");
    if (sectionId) navigateToSection(sectionId);
    if (typeof window.__interactions.closeDrawer === "function") {
      window.__interactions.closeDrawer();
    }
  }

  window.__interactions.qs = qs;
  window.__interactions.qsa = qsa;
  window.__interactions.getActiveSectionId = getActiveSectionId;
  window.__interactions.handleFolderTreeClick = handleFolderTreeClick;
  window.__interactions.navigateToSection = navigateToSection;
  window.__interactions.syncActiveSection = syncActiveSection;
  window.__interactions.handleTabClick = handleTabClick;
  window.__interactions.handleDrawerLinkClick = handleDrawerLinkClick;
})();