/* ==========================================================================
   js/interactions/_chips.js
   Part of the interactions pipeline. Loaded FIFTH.

   Chip filter clicks. Owns window.__interactions.state.activeCategory
   (read/written here and by _search.js / _nav.js).

   Cross-partial reads (inside function bodies only):
     - window.__interactions.filterCards / getCurrentSearchQuery
       (from _search.js)
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__interactions) window.__interactions = {};
  if (!window.__interactions.state) window.__interactions.state = {};

  const SELECTORS = { filterChip: ".filter-chip" };

  window.__interactions.state.activeCategory = "all";

  function qsa(selector, root) { return window.__interactions.qsa(selector, root); }

  function syncActiveCategoryUI(category) {
    qsa(SELECTORS.filterChip).forEach((chip) => {
      const isActive = chip.getAttribute("data-filter-value") === category;
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function setActiveCategory(category) {
    window.__interactions.state.activeCategory = category || "all";
    syncActiveCategoryUI(window.__interactions.state.activeCategory);
    if (typeof window.__interactions.filterCards === "function") {
      window.__interactions.filterCards(window.__interactions.getCurrentSearchQuery());
    }
  }

  function handleChipClick(e) {
    const chip = e.target.closest(SELECTORS.filterChip);
    if (!chip) return;
    setActiveCategory(chip.getAttribute("data-filter-value") || "all");
  }

  window.__interactions.syncActiveCategoryUI = syncActiveCategoryUI;
  window.__interactions.setActiveCategory = setActiveCategory;
  window.__interactions.handleChipClick = handleChipClick;
})();