/**
 * script.js — Portfolio v2.0, Phase 4
 *
 * Thin entry point. Loaded last, after data.js, render.js, interactions.js,
 * and init.js. Its only job is to trigger the bootstrap defined in init.js.
 */
(function () {
  'use strict';

  if (typeof window.init === 'function') {
    window.init();
  } else {
    console.error('[script] window.init is not defined. Make sure init.js loaded before script.js.');
  }
})();