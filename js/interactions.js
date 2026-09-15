/**
 * interactions.js — Portfolio v2.0, Phase 9
 *
 * Exposes window.interactions = { init, ...named handlers }.
 * Uses event delegation. Does not touch index.html/render.js/data.js/CSS.
 *
 * Phase 9 changes:
 *   - openModalForCard now reads the currently-active section id from the
 *     sidebar (or mobile tab) and passes it to render.renderModalContent
 *     as a second argument. This lets the modal hero pick the correct
 *     thumbVariant for portrait sections (certifications).
 *   - getActiveSectionId(): new helper. Reads the active folder leaf's
 *     data-section attribute; falls back to the active mobile tab.
 *     Returns undefined if neither is present, which render.js treats as
 *     "no variant" (landscape modal hero).
 *
 * Phase 8.1 changes (preserved):
 *   1. Card detail modal wired.
 *   2. Focus returns to the specific card that was clicked on close.
 *   3. Theme toggle click refreshes theme-toggle icons (sun ↔ moon).
 *
 * Preserved from Phase 7.2: flat folder tree, chip filter, composed
 * search + chip predicate, drawer open/close with focus trap.
 */
(function () {
  'use strict';

  var SELECTORS = {
    folderTree: '#folder-tree',
    folderLeaf: '.folder-tree__leaf',
    sidebarCollapseBtn: '#sidebar-collapse-btn',
    explorerShell: '#explorer-shell',
    driveTab: '.drive-tabs__tab',
    drawerLink: '.drive-drawer__link',
    themeDesktop: '#theme-toggle-desktop',
    themeMobile: '#theme-toggle-mobile',
    themeLabel: '.theme-toggle__label',
    viewGrid: '#view-toggle-grid',
    viewList: '#view-toggle-list',
    dashboardGrid: '#dashboard-grid',
    driveGrid: '#drive-grid',
    searchDesktop: '#search-input',
    searchMobile: '#mobile-search-input',
    drawerOpenBtn: '#drawer-open-btn',
    drawer: '#drive-drawer',
    drawerBackdrop: '.drive-drawer__backdrop',
    fab: '#fab-button, .drive-fab',
    filterChip: '.filter-chip',
    chipContainers: '#dashboard-filters, #drive-filters',
    card: '[data-item-id]',
    modal: '#card-modal',
    modalClose: '[data-modal-close]',
    modalContent: '#modal-content'
  };

  var THEME_STORAGE_KEY = 'portfolio-theme';
  var SEARCH_DEBOUNCE_MS = 150;

  var EMPTY_STATE_CLASS = 'dashboard-grid__empty';
  var DRIVE_EMPTY_STATE_CLASS = 'grid-empty';

  var activeCategory = 'all';

  var lastFocusedBeforeDrawer = null;
  var lastFocusedBeforeModal = null;

  // ---------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------

  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function debounce(fn, wait) {
    var timer;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function getCurrentSearchQuery() {
    var d = qs(SELECTORS.searchDesktop), m = qs(SELECTORS.searchMobile);
    if (d && d.value) return d.value;
    if (m && m.value) return m.value;
    return '';
  }

  // Find an item by id across every section's array.
  function findItemById(id) {
    if (!id || !window.portfolioData) return null;
    var d = window.portfolioData;
    var arrays = [d.projects, d.experience, d.certifications, d.trainings, d.designs];
    for (var i = 0; i < arrays.length; i++) {
      var arr = arrays[i] || [];
      for (var j = 0; j < arr.length; j++) {
        if (arr[j] && arr[j].id === id) return arr[j];
      }
    }
    return null;
  }

  // Read the currently-active section id from the sidebar or mobile tab.
  // Used by openModalForCard to tell render.renderModalContent which
  // section the clicked item belongs to, so the modal hero can pick the
  // right thumbVariant.
  function getActiveSectionId() {
    var activeLeaf = qs(SELECTORS.folderLeaf + '.is-active');
    if (activeLeaf) {
      var leafSection = activeLeaf.getAttribute('data-section');
      if (leafSection) return leafSection;
    }
    var activeTab = qs(SELECTORS.driveTab + '.is-active');
    if (activeTab) {
      var tabSection = activeTab.getAttribute('data-section');
      if (tabSection) return tabSection;
    }
    return undefined;
  }

  // ---------------------------------------------------------------------
  // Folder tree
  // ---------------------------------------------------------------------

  function handleFolderTreeClick(e) {
    var leaf = e.target.closest(SELECTORS.folderLeaf);
    if (!leaf) return;
    var sectionId = leaf.getAttribute('data-section');
    if (sectionId) navigateToSection(sectionId);
  }

  // ---------------------------------------------------------------------
  // Sidebar collapse
  // ---------------------------------------------------------------------

  function toggleSidebarCollapse() {
    var shell = qs(SELECTORS.explorerShell);
    var btn = qs(SELECTORS.sidebarCollapseBtn);
    if (!shell || !btn) return;
    var isCollapsed = shell.classList.toggle('is-sidebar-collapsed');
    btn.setAttribute('aria-expanded', String(!isCollapsed));
  }

  // ---------------------------------------------------------------------
  // Section navigation
  // ---------------------------------------------------------------------

  function navigateToSection(sectionId) {
    activeCategory = 'all';
    if (window.render && typeof window.render.renderSection === 'function') {
      window.render.renderSection(sectionId);
    } else {
      console.warn('[interactions] window.render.renderSection unavailable; cannot navigate to "' + sectionId + '".');
    }
    filterCards(getCurrentSearchQuery());
    syncActiveSection(sectionId);
  }

  function syncActiveSection(sectionId) {
    qsa(SELECTORS.driveTab).forEach(function (tab) {
      var isActive = tab.getAttribute('data-section') === sectionId;
      tab.classList.toggle('is-active', isActive);
      if (isActive) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });
    qsa(SELECTORS.folderLeaf).forEach(function (leaf) {
      var isActive = leaf.getAttribute('data-section') === sectionId;
      leaf.classList.toggle('is-active', isActive);
      if (isActive) leaf.setAttribute('aria-current', 'page');
      else leaf.removeAttribute('aria-current');
    });
    qsa(SELECTORS.drawerLink).forEach(function (link) {
      var isActive = link.getAttribute('data-section') === sectionId;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function handleTabClick(e) {
    var tab = e.target.closest(SELECTORS.driveTab);
    if (!tab) return;
    var sectionId = tab.getAttribute('data-section');
    if (sectionId) navigateToSection(sectionId);
  }

  function handleDrawerLinkClick(e) {
    var link = e.target.closest(SELECTORS.drawerLink);
    if (!link) return;
    var sectionId = link.getAttribute('data-section');
    if (sectionId) navigateToSection(sectionId);
    closeDrawer();
  }

  // ---------------------------------------------------------------------
  // Theme toggle
  // ---------------------------------------------------------------------

  function setTheme(theme, opts) {
    opts = opts || {};
    var persist = opts.persist !== false;
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      try { localStorage.setItem(THEME_STORAGE_KEY, theme); }
      catch (err) { console.warn('[interactions] Could not persist theme.', err); }
    }
    syncThemeControls(theme);
    if (window.render && typeof window.render.renderThemeToggleIcons === 'function') {
      window.render.renderThemeToggleIcons();
    }
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  function syncThemeControls(theme) {
    var isDark = theme === 'dark';
    var switchToText = 'Switch to ' + (isDark ? 'light' : 'dark') + ' mode';
    [SELECTORS.themeDesktop, SELECTORS.themeMobile].forEach(function (selector) {
      var btn = qs(selector);
      if (!btn) return;
      btn.setAttribute('aria-pressed', String(isDark));
      var label = qs(SELECTORS.themeLabel, btn);
      if (label) label.textContent = switchToText;
      else btn.setAttribute('aria-label', switchToText);
    });
  }

  function handleThemeToggleClick() { toggleTheme(); }

  // ---------------------------------------------------------------------
  // View toggle
  // ---------------------------------------------------------------------

  function setView(view) {
    var grid = qs(SELECTORS.dashboardGrid);
    var gridBtn = qs(SELECTORS.viewGrid);
    var listBtn = qs(SELECTORS.viewList);
    if (grid) grid.classList.toggle('is-list', view === 'list');
    if (gridBtn) gridBtn.setAttribute('aria-pressed', String(view === 'grid'));
    if (listBtn) listBtn.setAttribute('aria-pressed', String(view === 'list'));
  }

  function handleViewToggleClick(e) {
    var gridBtn = e.target.closest(SELECTORS.viewGrid);
    var listBtn = e.target.closest(SELECTORS.viewList);
    if (gridBtn) setView('grid');
    else if (listBtn) setView('list');
  }

  // ---------------------------------------------------------------------
  // Search + chip filter
  // ---------------------------------------------------------------------

  function toggleEmptyState(grid, show, emptyClass) {
    var empty = qs('.' + emptyClass, grid);
    if (show) {
      if (!empty) {
        empty = document.createElement('div');
        empty.className = emptyClass;
        empty.setAttribute('role', 'status');
        empty.textContent = 'No results found.';
        grid.appendChild(empty);
      }
      empty.classList.remove('is-hidden');
    } else if (empty) {
      empty.classList.add('is-hidden');
    }
  }

  function cardMatchesCategory(card, category) {
    if (category === 'all' || !category) return true;
    return card.textContent.toLowerCase().indexOf(category.toLowerCase()) !== -1;
  }

  function cardMatchesSearch(card, normalizedQuery) {
    if (!normalizedQuery) return true;
    return card.textContent.toLowerCase().indexOf(normalizedQuery) !== -1;
  }

  function filterGrid(grid, normalizedQuery, category, emptyClass) {
    if (!grid) return;
    var cards = qsa(':scope > *', grid).filter(function (el) {
      return !el.classList.contains(emptyClass);
    });
    var anyVisible = false;
    cards.forEach(function (card) {
      var visible =
        cardMatchesCategory(card, category) &&
        cardMatchesSearch(card, normalizedQuery);
      card.classList.toggle('is-hidden', !visible);
      if (visible) anyVisible = true;
    });
    toggleEmptyState(grid, cards.length > 0 && !anyVisible, emptyClass);
  }

  function filterCards(query) {
    var normalized = (query || '').trim().toLowerCase();
    filterGrid(qs(SELECTORS.dashboardGrid), normalized, activeCategory, EMPTY_STATE_CLASS);
    filterGrid(qs(SELECTORS.driveGrid), normalized, activeCategory, DRIVE_EMPTY_STATE_CLASS);
  }

  var debouncedFilter = debounce(function (value) { filterCards(value); }, SEARCH_DEBOUNCE_MS);

  function syncSearchInputs(sourceEl, value) {
    [SELECTORS.searchDesktop, SELECTORS.searchMobile].forEach(function (selector) {
      var input = qs(selector);
      if (input && input !== sourceEl) input.value = value;
    });
  }

  function handleSearchInput(e) {
    var value = e.target.value;
    syncSearchInputs(e.target, value);
    debouncedFilter(value);
  }

  // ---------------------------------------------------------------------
  // Chip clicks
  // ---------------------------------------------------------------------

  function syncActiveCategoryUI(category) {
    qsa(SELECTORS.filterChip).forEach(function (chip) {
      var isActive = chip.getAttribute('data-filter-value') === category;
      chip.classList.toggle('is-active', isActive);
      chip.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function setActiveCategory(category) {
    activeCategory = category || 'all';
    syncActiveCategoryUI(activeCategory);
    filterCards(getCurrentSearchQuery());
  }

  function handleChipClick(e) {
    var chip = e.target.closest(SELECTORS.filterChip);
    if (!chip) return;
    setActiveCategory(chip.getAttribute('data-filter-value') || 'all');
  }

  // ---------------------------------------------------------------------
  // Focus trap (shared)
  // ---------------------------------------------------------------------

  function focusFirstFocusable(container) {
    var f = qs('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])', container);
    if (f) f.focus();
  }

  function trapFocus(e, container) {
    var focusables = qsa(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      container
    );
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  // ---------------------------------------------------------------------
  // Drawer
  // ---------------------------------------------------------------------

  function handleDrawerKeydown(e) {
    var drawer = qs(SELECTORS.drawer);
    if (!drawer || drawer.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeDrawer(); return; }
    if (e.key === 'Tab') trapFocus(e, drawer);
  }

  function openDrawer() {
    var drawer = qs(SELECTORS.drawer);
    var openBtn = qs(SELECTORS.drawerOpenBtn);
    if (!drawer) return;
    lastFocusedBeforeDrawer = document.activeElement;
    drawer.hidden = false;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', handleDrawerKeydown, true);
    focusFirstFocusable(drawer);
  }

  function closeDrawer() {
    var drawer = qs(SELECTORS.drawer);
    var openBtn = qs(SELECTORS.drawerOpenBtn);
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.hidden = true;
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', handleDrawerKeydown, true);
    if (lastFocusedBeforeDrawer && typeof lastFocusedBeforeDrawer.focus === 'function') {
      lastFocusedBeforeDrawer.focus();
    }
    lastFocusedBeforeDrawer = null;
  }

  function handleDrawerOpenClick() { openDrawer(); }

  function handleDrawerBackdropClick(e) {
    if (e.target.closest(SELECTORS.drawerBackdrop)) closeDrawer();
  }

  // ---------------------------------------------------------------------
  // MODAL
  // ---------------------------------------------------------------------

  function handleModalKeydown(e) {
    var modal = qs(SELECTORS.modal);
    if (!modal || modal.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
    if (e.key === 'Tab') {
      var panel = qs('.modal__panel', modal);
      if (panel) trapFocus(e, panel);
    }
  }

  function openModalForCard(cardEl) {
    var modal = qs(SELECTORS.modal);
    if (!modal || !cardEl) return;

    var itemId = cardEl.getAttribute('data-item-id');
    var item = findItemById(itemId);
    if (!item) {
      console.warn('[interactions] No item found for id "' + itemId + '".');
      return;
    }

    var sectionId = getActiveSectionId();

    if (window.render && typeof window.render.renderModalContent === 'function') {
      window.render.renderModalContent(item, sectionId);
    }

    lastFocusedBeforeModal = cardEl;

    modal.hidden = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    document.addEventListener('keydown', handleModalKeydown, true);
    var closeBtn = qs(SELECTORS.modalClose, modal);
    if (closeBtn) closeBtn.focus();
    else focusFirstFocusable(modal);
  }

  function closeModal() {
    var modal = qs(SELECTORS.modal);
    if (!modal || modal.hidden) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modal.hidden = true;

    document.removeEventListener('keydown', handleModalKeydown, true);

    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
      lastFocusedBeforeModal.focus();
    }
    lastFocusedBeforeModal = null;
  }

  function handleCardActivate(e) {
    var card = e.target.closest(SELECTORS.card);
    if (!card) return;
    if (e.target.closest(SELECTORS.modal)) return;
    if (e.target.closest('a')) return;
    openModalForCard(card);
  }

  function handleCardKeydown(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest(SELECTORS.card);
    if (!card) return;
    if (e.target.closest(SELECTORS.modal)) return;
    if (e.target.closest('a')) return;
    e.preventDefault();
    openModalForCard(card);
  }

  function handleModalCloseClick(e) {
    if (e.target.closest(SELECTORS.modalClose)) {
      closeModal();
    }
  }

  // ---------------------------------------------------------------------
  // FAB
  // ---------------------------------------------------------------------

  function handleFabClick() {
    console.log('[interactions] FAB clicked — placeholder, no action wired up yet.');
  }

  // ---------------------------------------------------------------------
  // Global delegated click listener
  // ---------------------------------------------------------------------

  function handleDocumentClick(e) {
    if (e.target.closest(SELECTORS.modal)) {
      handleModalCloseClick(e);
      return;
    }
    handleTabClick(e);
    handleDrawerLinkClick(e);
    handleDrawerBackdropClick(e);
    handleChipClick(e);
    handleCardActivate(e);
    if (e.target.closest(SELECTORS.fab)) handleFabClick();
  }

  // ---------------------------------------------------------------------
  // init
  // ---------------------------------------------------------------------

  function init() {
    var folderTree = qs(SELECTORS.folderTree);
    if (folderTree) folderTree.addEventListener('click', handleFolderTreeClick);

    var sidebarBtn = qs(SELECTORS.sidebarCollapseBtn);
    if (sidebarBtn) sidebarBtn.addEventListener('click', toggleSidebarCollapse);

    [SELECTORS.themeDesktop, SELECTORS.themeMobile].forEach(function (selector) {
      var btn = qs(selector);
      if (btn) btn.addEventListener('click', handleThemeToggleClick);
    });

    [SELECTORS.viewGrid, SELECTORS.viewList].forEach(function (selector) {
      var btn = qs(selector);
      if (btn) btn.addEventListener('click', handleViewToggleClick);
    });

    [SELECTORS.searchDesktop, SELECTORS.searchMobile].forEach(function (selector) {
      var input = qs(selector);
      if (input) input.addEventListener('input', handleSearchInput);
    });

    var drawerOpenBtn = qs(SELECTORS.drawerOpenBtn);
    if (drawerOpenBtn) drawerOpenBtn.addEventListener('click', handleDrawerOpenClick);

    document.addEventListener('keydown', handleCardKeydown);
    document.addEventListener('click', handleDocumentClick);
  }

  window.interactions = {
    init: init,
    toggleSidebarCollapse: toggleSidebarCollapse,
    navigateToSection: navigateToSection,
    setTheme: setTheme,
    toggleTheme: toggleTheme,
    toggleView: setView,
    filterCards: filterCards,
    setActiveCategory: setActiveCategory,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    openModalForCard: openModalForCard,
    closeModal: closeModal,
    handleFabClick: handleFabClick
  };
})();