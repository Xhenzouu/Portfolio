/**
 * init.js — Portfolio v2.0
 *
 * Synchronous responsibilities:
 *   - Apply saved theme before first paint (prevents theme flash)
 *
 * Deferred responsibilities:
 *   - Wait for the render and interactions barrels to finish loading
 *     their partials and calling their own renderAll()/init().
 *   - Run anything that needs rendered DOM here.
 *
 * The render barrel (js/render/index.js) handles renderAll().
 * The interactions barrel (js/interactions/index.js) handles init().
 * This file does NOT call either — that's the barrels' job.
 */
(function () {
  'use strict';

  var THEME_STORAGE_KEY = 'portfolio-theme';
  var DEFAULT_THEME = 'light';

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (err) {
      console.warn('[init] Could not read saved theme from localStorage.', err);
      return null;
    }
  }

  function applySavedTheme() {
    var theme = getSavedTheme() || DEFAULT_THEME;

    if (window.interactions && typeof window.interactions.setTheme === 'function') {
      // persist:false — we're only reflecting existing storage, not
      // recording a new user choice.
      window.interactions.setTheme(theme, { persist: false });
    } else {
      // Fallback so the correct theme still applies even if
      // interactions partials are not loaded yet.
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  // Apply theme synchronously. The inline <script> in <head> does this
  // too, but keeping it here means this file works standalone (e.g.,
  // in a test harness or if the inline script is blocked).
  applySavedTheme();

  function onReady() {
    // Everything is rendered and wired. Anything that needs DOM access
    // goes here. Currently empty — the barrels handle it.
    console.log('[init] Portfolio fully initialized.');
  }

  if (window.__portfolioReady) {
    onReady();
  } else {
    document.addEventListener('portfolio-interactions-ready', onReady, { once: true });
  }
})();