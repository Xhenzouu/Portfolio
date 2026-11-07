/* ==========================================================================
   js/render/index.js — Render pipeline barrel

   Injects each render partial as a <script> tag in the required order,
   waits for window.portfolioData to be ready (via window.__dataReadyPromise
   from the data barrel), then calls window.render.renderAll().
   ========================================================================== */

(function () {
  "use strict";

  var PARTIALS = [
    "js/render/_shell.js",
    "js/render/_cards.js",
    "js/render/_chips.js",
    "js/render/_sections.js",
    "js/render/_modal.js",
    "js/render/_drawer.js",
    "js/render/_bootstrap.js"
  ];

  function loadScript(src) {
    return new Promise(function (resolve) {
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = function () { resolve(src); };
      script.onerror = function () {
        console.error("[render barrel] Failed to load: " + src);
        resolve(src);
      };
      document.head.appendChild(script);
    });
  }

  window.__renderReadyPromise = PARTIALS.reduce(function (chain, src) {
    return chain.then(function () { return loadScript(src); });
  }, Promise.resolve()).then(function () {
    // WAIT FOR DATA: This is the critical line.
    // Do not render until the data barrel has finished assembling window.portfolioData.
    return window.__dataReadyPromise || Promise.resolve(); 
  }).then(function () {
    if (window.render && typeof window.render.renderAll === "function") {
      window.render.renderAll();
      window.__renderReady = true;
      document.dispatchEvent(new CustomEvent("portfolio-render-ready"));
    } else {
      console.error(
        "[render/index.js] window.render.renderAll is unavailable. " +
        "Make sure all render partials loaded before this file."
      );
    }
  });
})();