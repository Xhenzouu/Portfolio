/* ==========================================================================
   js/interactions/_theme.js
   Part of the interactions pipeline. Loaded SECOND.

   Theme toggle, localStorage persistence, control sync. Reads qs from
   window.__interactions. Calls into window.render.renderThemeToggleIcons
   (feature-detected) so the sun/moon icon swaps on theme change.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__interactions) window.__interactions = {};

  const THEME_STORAGE_KEY = "portfolio-theme";
  const SELECTORS = {
    themeDesktop: "#theme-toggle-desktop",
    themeMobile: "#theme-toggle-mobile",
    themeLabel: ".theme-toggle__label"
  };

  function qs(selector, root) { return window.__interactions.qs(selector, root); }

  function setTheme(theme, opts) {
    opts = opts || {};
    const persist = opts.persist !== false;
    document.documentElement.setAttribute("data-theme", theme);
    if (persist) {
      try { localStorage.setItem(THEME_STORAGE_KEY, theme); }
      catch (err) { console.warn("[interactions] Could not persist theme.", err); }
    }
    syncThemeControls(theme);
    if (window.render && typeof window.render.renderThemeToggleIcons === "function") {
      window.render.renderThemeToggleIcons();
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(current === "dark" ? "light" : "dark");
  }

  function syncThemeControls(theme) {
    const isDark = theme === "dark";
    const switchToText = "Switch to " + (isDark ? "light" : "dark") + " mode";
    [SELECTORS.themeDesktop, SELECTORS.themeMobile].forEach((selector) => {
      const btn = qs(selector);
      if (!btn) return;
      btn.setAttribute("aria-pressed", String(isDark));
      const label = qs(SELECTORS.themeLabel, btn);
      if (label) label.textContent = switchToText;
      else btn.setAttribute("aria-label", switchToText);
    });
  }

  function handleThemeToggleClick() { toggleTheme(); }

  window.__interactions.setTheme = setTheme;
  window.__interactions.toggleTheme = toggleTheme;
  window.__interactions.syncThemeControls = syncThemeControls;
  window.__interactions.handleThemeToggleClick = handleThemeToggleClick;
})();