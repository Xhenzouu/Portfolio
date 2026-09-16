/* ==========================================================================
   js/interactions/index.js — Interactions pipeline barrel

   This file is the single entry point for the interactions pipeline,
   mirroring the role of css/components.css for the CSS partials. It is
   loaded LAST among the interactions partials and its only job is to
   wire up all event handlers by calling window.interactions.init().

   DO NOT add interaction handlers directly to this file. Add them to the
   relevant partial below, then list them here.

   PARTIALS (in load order):

     _nav.js         qs/qsa helpers, getActiveSectionId, folder tree
                     clicks, section navigation, syncActiveSection,
                     tab clicks, drawer link clicks
     _theme.js       THEME_STORAGE_KEY, setTheme, toggleTheme,
                     syncThemeControls, handleThemeToggleClick
     _view.js        setView, handleViewToggleClick
     _search.js      SEARCH_DEBOUNCE_MS, EMPTY_STATE_CLASS,
                     DRIVE_EMPTY_STATE_CLASS, debounce,
                     getCurrentSearchQuery, toggleEmptyState,
                     cardMatchesCategory, cardMatchesSearch,
                     filterGrid, filterCards, syncSearchInputs,
                     handleSearchInput
     _chips.js       activeCategory state, syncActiveCategoryUI,
                     setActiveCategory, handleChipClick
     _drawer.js      focusFirstFocusable, trapFocus, handleDrawerKeydown,
                     openDrawer, closeDrawer, handleDrawerOpenClick,
                     handleDrawerBackdropClick
     _modal.js       findItemById, openModalForCard, closeModal,
                     handleCardActivate, handleCardKeydown,
                     handleModalCloseClick, handleModalKeydown
     _sidebar.js     toggleSidebarCollapse
     _bootstrap.js   handleFabClick, handleDocumentClick, init,
                     window.interactions assembly

   Do not reference this file directly from anywhere except index.html.
   ========================================================================== */

(function () {
  "use strict";

  if (window.interactions && typeof window.interactions.init === "function") {
    window.interactions.init();
  } else {
    console.error(
      "[interactions/index.js] window.interactions.init is unavailable. " +
      "Make sure all interaction partials loaded before this file."
    );
  }
})();