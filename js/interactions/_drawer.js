/* ==========================================================================
   js/interactions/_drawer.js
   Part of the interactions pipeline. Loaded SIXTH.

   Drawer open/close + focus trap. Owns focusFirstFocusable and
   trapFocus — both EXPOSED for _modal.js to reuse (cross-partial
   read, but only inside function bodies).
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__interactions) window.__interactions = {};

  const SELECTORS = {
    drawerOpenBtn: "#drawer-open-btn",
    drawer: "#drive-drawer",
    drawerBackdrop: ".drive-drawer__backdrop"
  };

  let lastFocusedBeforeDrawer = null;

  function qs(selector, root) { return window.__interactions.qs(selector, root); }
  function qsa(selector, root) { return window.__interactions.qsa(selector, root); }

  function focusFirstFocusable(container) {
    const f = qs(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      container
    );
    if (f) f.focus();
  }

  function trapFocus(e, container) {
    const focusables = qsa(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      container
    );
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  function handleDrawerKeydown(e) {
    const drawer = qs(SELECTORS.drawer);
    if (!drawer || drawer.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); closeDrawer(); return; }
    if (e.key === "Tab") trapFocus(e, drawer);
  }

  function openDrawer() {
    const drawer = qs(SELECTORS.drawer);
    const openBtn = qs(SELECTORS.drawerOpenBtn);
    if (!drawer) return;
    lastFocusedBeforeDrawer = document.activeElement;
    drawer.hidden = false;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    if (openBtn) openBtn.setAttribute("aria-expanded", "true");
    document.addEventListener("keydown", handleDrawerKeydown, true);
    focusFirstFocusable(drawer);
  }

  function closeDrawer() {
    const drawer = qs(SELECTORS.drawer);
    const openBtn = qs(SELECTORS.drawerOpenBtn);
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    drawer.hidden = true;
    if (openBtn) openBtn.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", handleDrawerKeydown, true);
    if (lastFocusedBeforeDrawer && typeof lastFocusedBeforeDrawer.focus === "function") {
      lastFocusedBeforeDrawer.focus();
    }
    lastFocusedBeforeDrawer = null;
  }

  function handleDrawerOpenClick() { openDrawer(); }

  function handleDrawerBackdropClick(e) {
    if (e.target.closest(SELECTORS.drawerBackdrop)) closeDrawer();
  }

  window.__interactions.focusFirstFocusable = focusFirstFocusable;
  window.__interactions.trapFocus = trapFocus;
  window.__interactions.openDrawer = openDrawer;
  window.__interactions.closeDrawer = closeDrawer;
  window.__interactions.handleDrawerOpenClick = handleDrawerOpenClick;
  window.__interactions.handleDrawerBackdropClick = handleDrawerBackdropClick;
})();