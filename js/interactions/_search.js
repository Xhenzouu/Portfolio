/* ==========================================================================
   js/interactions/_search.js
   Part of the interactions pipeline. Loaded FOURTH.

   Search + empty-state filtering. Reads `activeCategory` from
   window.__interactions.state (written by _chips.js). Exposes
   filterCards / getCurrentSearchQuery / toggleEmptyState so _nav.js and
   _chips.js can compose search + chip predicates.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__interactions) window.__interactions = {};
  if (!window.__interactions.state) window.__interactions.state = {};

  const SELECTORS = {
    dashboardGrid: "#dashboard-grid",
    driveGrid: "#drive-grid",
    searchDesktop: "#search-input",
    searchMobile: "#mobile-search-input"
  };

  const SEARCH_DEBOUNCE_MS = 150;
  const EMPTY_STATE_CLASS = "dashboard-grid__empty";
  const DRIVE_EMPTY_STATE_CLASS = "grid-empty";

  function qs(selector, root) { return window.__interactions.qs(selector, root); }
  function qsa(selector, root) { return window.__interactions.qsa(selector, root); }

  function debounce(fn, wait) {
    let timer;
    return function () {
      const args = arguments, ctx = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function getCurrentSearchQuery() {
    const d = qs(SELECTORS.searchDesktop), m = qs(SELECTORS.searchMobile);
    if (d && d.value) return d.value;
    if (m && m.value) return m.value;
    return "";
  }

  function toggleEmptyState(grid, show, emptyClass) {
    let empty = qs("." + emptyClass, grid);
    if (show) {
      if (!empty) {
        empty = document.createElement("div");
        empty.className = emptyClass;
        empty.setAttribute("role", "status");
        empty.textContent = "No results found.";
        grid.appendChild(empty);
      }
      empty.classList.remove("is-hidden");
    } else if (empty) {
      empty.classList.add("is-hidden");
    }
  }

  function cardMatchesCategory(card, category) {
    if (category === "all" || !category) return true;
    return card.textContent.toLowerCase().indexOf(category.toLowerCase()) !== -1;
  }

  function cardMatchesSearch(card, normalizedQuery) {
    if (!normalizedQuery) return true;
    return card.textContent.toLowerCase().indexOf(normalizedQuery) !== -1;
  }

  function filterGrid(grid, normalizedQuery, category, emptyClass) {
    if (!grid) return;
    const cards = qsa(":scope > *", grid).filter((el) =>
      !el.classList.contains(emptyClass)
    );
    let anyVisible = false;
    cards.forEach((card) => {
      const visible =
        cardMatchesCategory(card, category) &&
        cardMatchesSearch(card, normalizedQuery);
      card.classList.toggle("is-hidden", !visible);
      if (visible) anyVisible = true;
    });
    toggleEmptyState(grid, cards.length > 0 && !anyVisible, emptyClass);
  }

  function filterCards(query) {
    const normalized = (query || "").trim().toLowerCase();
    const category = window.__interactions.state.activeCategory || "all";
    filterGrid(qs(SELECTORS.dashboardGrid), normalized, category, EMPTY_STATE_CLASS);
    filterGrid(qs(SELECTORS.driveGrid), normalized, category, DRIVE_EMPTY_STATE_CLASS);
  }

  const debouncedFilter = debounce(function (value) { filterCards(value); }, SEARCH_DEBOUNCE_MS);

  function syncSearchInputs(sourceEl, value) {
    [SELECTORS.searchDesktop, SELECTORS.searchMobile].forEach((selector) => {
      const input = qs(selector);
      if (input && input !== sourceEl) input.value = value;
    });
  }

  function handleSearchInput(e) {
    const value = e.target.value;
    syncSearchInputs(e.target, value);
    debouncedFilter(value);
  }

  window.__interactions.getCurrentSearchQuery = getCurrentSearchQuery;
  window.__interactions.toggleEmptyState = toggleEmptyState;
  window.__interactions.cardMatchesCategory = cardMatchesCategory;
  window.__interactions.cardMatchesSearch = cardMatchesSearch;
  window.__interactions.filterGrid = filterGrid;
  window.__interactions.filterCards = filterCards;
  window.__interactions.syncSearchInputs = syncSearchInputs;
  window.__interactions.handleSearchInput = handleSearchInput;
})();