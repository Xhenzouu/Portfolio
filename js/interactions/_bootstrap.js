/* ==========================================================================
   js/interactions/_bootstrap.js
   Part of the interactions pipeline. Loaded NINTH (LAST among partials,
   before the barrel).

   Owns:
     - handleFabClick (placeholder)
     - handleDocumentClick (cross-partial click aggregation)
     - init() — the wiring function that binds every listener
     - The public window.interactions API

   Load order requirement: _nav, _theme, _view, _search, _chips, _drawer,
   _modal, _sidebar must all have run before this file. Every
   cross-partial read happens inside function bodies (or inside
   handleDocumentClick / init, which run after load), so this is safe.

   CLICK ROUTING ORDER (handleDocumentClick):
     1. Slideshow image click → open lightbox, return.
        Must run before the #card-modal check because the slideshow
        image lives inside the modal.
     2. [data-lightbox-close] click → close lightbox, return.
        Must run before the #card-modal check so backdrop/close clicks
        on the lightbox don't get routed to the modal's close handler.
     3. Click inside #card-modal → route to modal close click.
     4. Everything else → tabs, drawer links, chips, card activation.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__interactions) window.__interactions = {};

  const SELECTORS = {
    folderTree: "#folder-tree",
    sidebarCollapseBtn: "#sidebar-collapse-btn",
    themeDesktop: "#theme-toggle-desktop",
    themeMobile: "#theme-toggle-mobile",
    viewGrid: "#view-toggle-grid",
    viewList: "#view-toggle-list",
    searchDesktop: "#search-input",
    searchMobile: "#mobile-search-input",
    drawerOpenBtn: "#drawer-open-btn",
    fab: "#fab-button, .drive-fab",
    slideshowImage: ".modal__slideshow-image",
    lightboxCloseTarget: "[data-lightbox-close]",
    modal: "#card-modal"
  };

  function qs(selector, root) { return window.__interactions.qs(selector, root); }

  function handleFabClick() {
    console.log("[interactions] FAB clicked — placeholder, no action wired up yet.");
  }

  function handleDocumentClick(e) {
    // 1. Slideshow image → open lightbox. Must run before the modal
    //    check because the image is inside the modal.
    if (e.target.closest(SELECTORS.slideshowImage)) {
      window.__interactions.handleSlideshowImageClick(e);
      return;
    }

    // 2. Lightbox close targets (backdrop + X button) → close lightbox.
    //    Must run before the modal check so a lightbox backdrop click
    //    doesn't reach the modal's close-button handler.
    if (e.target.closest(SELECTORS.lightboxCloseTarget)) {
      window.__interactions.handleLightboxCloseClick(e);
      return;
    }

    // 3. Modal close targets win next — they're inside the modal.
    if (e.target.closest(SELECTORS.modal)) {
      window.__interactions.handleModalCloseClick(e);
      return;
    }

    // 4. Standard delegated chain.
    window.__interactions.handleTabClick(e);
    window.__interactions.handleDrawerLinkClick(e);
    window.__interactions.handleDrawerBackdropClick(e);
    window.__interactions.handleChipClick(e);
    window.__interactions.handleCardActivate(e);
    if (e.target.closest(SELECTORS.fab)) handleFabClick();
  }

  function init() {
    const folderTree = qs(SELECTORS.folderTree);
    if (folderTree) folderTree.addEventListener("click", window.__interactions.handleFolderTreeClick);

    const sidebarBtn = qs(SELECTORS.sidebarCollapseBtn);
    if (sidebarBtn) sidebarBtn.addEventListener("click", window.__interactions.toggleSidebarCollapse);

    [SELECTORS.themeDesktop, SELECTORS.themeMobile].forEach((selector) => {
      const btn = qs(selector);
      if (btn) btn.addEventListener("click", window.__interactions.handleThemeToggleClick);
    });

    [SELECTORS.viewGrid, SELECTORS.viewList].forEach((selector) => {
      const btn = qs(selector);
      if (btn) btn.addEventListener("click", window.__interactions.handleViewToggleClick);
    });

    [SELECTORS.searchDesktop, SELECTORS.searchMobile].forEach((selector) => {
      const input = qs(selector);
      if (input) input.addEventListener("input", window.__interactions.handleSearchInput);
    });

    const drawerOpenBtn = qs(SELECTORS.drawerOpenBtn);
    if (drawerOpenBtn) drawerOpenBtn.addEventListener("click", window.__interactions.handleDrawerOpenClick);

    document.addEventListener("keydown", window.__interactions.handleCardKeydown);
    document.addEventListener("click", handleDocumentClick);
  }

  window.interactions = {
    init: init,
    toggleSidebarCollapse: window.__interactions.toggleSidebarCollapse,
    navigateToSection: window.__interactions.navigateToSection,
    setTheme: window.__interactions.setTheme,
    toggleTheme: window.__interactions.toggleTheme,
    toggleView: window.__interactions.setView,
    filterCards: window.__interactions.filterCards,
    setActiveCategory: window.__interactions.setActiveCategory,
    openDrawer: window.__interactions.openDrawer,
    closeDrawer: window.__interactions.closeDrawer,
    openModalForCard: window.__interactions.openModalForCard,
    closeModal: window.__interactions.closeModal,
    openLightbox: window.__interactions.openLightbox,
    closeLightbox: window.__interactions.closeLightbox,
    handleFabClick: handleFabClick
  };
})();