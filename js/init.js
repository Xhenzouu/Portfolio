/**
 * init.js — Portfolio v2.0, Phase 4
 *
 * Defines window.init, the single bootstrap entry point. Does NOT call
 * itself — script.js is responsible for invoking window.init() once
 * all scripts have loaded. Internally waits for DOMContentLoaded so it
 * is safe to call regardless of where the <script> tags sit in the page.
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
      // interactions.js failed to load.
      document.documentElement.setAttribute('data-theme', theme);
      console.warn('[init] window.interactions.setTheme is unavailable; applied theme attribute directly.');
    }
  }

  function bootstrap() {
    if (window.render && typeof window.render.renderAll === 'function') {
      window.render.renderAll();
    } else {
      console.warn('[init] window.render.renderAll is unavailable; skipping initial render.');
    }

    if (window.interactions && typeof window.interactions.init === 'function') {
      window.interactions.init();
    } else {
      console.warn('[init] window.interactions.init is unavailable; interactions were not wired up.');
    }

    applySavedTheme();
  }

  function run() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
      bootstrap();
    }
  }

  window.init = run;
})();