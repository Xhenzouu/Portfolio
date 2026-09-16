/* ==========================================================================
   js/render/index.js — Render pipeline barrel

   This file is the single entry point for the render pipeline, mirroring
   the role of css/components.css for the CSS partials. It is loaded LAST
   among the render partials and its only job is to kick off the initial
   render by calling window.render.renderAll().

   DO NOT add render functions directly to this file. Add them to the
   relevant partial below, then list them here.

   PARTIALS (in load order — order matters; every partial reads from
   window.__render.* at call time, never at IIFE-init time):

     _shell.js       shared DOM helpers (el, clearChildren, getSection,
                     uniqueInOrder, applyGridMode), icon helpers
                     (buildIcon, replaceIconSlot, hydrateIcons,
                     renderThemeToggleIcons), renderMeta, folder tree
                     (buildFolderTreeItem, renderFolderTree),
                     renderCounts
     _cards.js       buildThumbSlot, attachCardInteraction,
                     buildDashboardCard, buildDriveCard
     _chips.js       buildChip, renderFilterChips
     _sections.js    About + Contact block builders, renderAboutSection,
                     renderContactSection, renderDashboard, renderDriveGrid,
                     renderSectionHeader, renderBreadcrumb
     _modal.js       renderModalContent (including collapsible
                     <details> Core Features block)
     _drawer.js      renderDrawerList, renderMobileTabs
     _bootstrap.js   render config (window.__render.config), renderSection,
                     renderAll, window.render assembly, data guard

   Do not reference this file directly from anywhere except index.html.
   ========================================================================== */

(function () {
  "use strict";

  if (window.render && typeof window.render.renderAll === "function") {
    window.render.renderAll();
  } else {
    console.error(
      "[render/index.js] window.render.renderAll is unavailable. " +
      "Make sure all render partials loaded before this file."
    );
  }
})();