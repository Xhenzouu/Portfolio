/* ==========================================================================
   js/interactions/index.js — Interactions pipeline barrel

   Injects each interaction partial as a <script> tag in the required
   order, waits for the render pipeline to finish (via
   window.__renderReadyPromise from the render barrel), then calls
   window.interactions.init() and sets window.__portfolioReady = true.

   That final flag is what init.js listens for to know the page is
   fully wired up.
   ========================================================================== */

(function () {
  "use strict";

  var PARTIALS = [
    "js/interactions/_nav.js",
    "js/interactions/_theme.js",
    "js/interactions/_view.js",
    "js/interactions/_search.js",
    "js/interactions/_chips.js",
    "js/interactions/_drawer.js",
    "js/interactions/_modal.js",
    "js/interactions/_sidebar.js",
    "js/interactions/_bootstrap.js"
  ];

  function loadScript(src) {
    return new Promise(function (resolve) {
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = function () { resolve(src); };
      script.onerror = function () {
        console.error("[interactions barrel] Failed to load: " + src);
        resolve(src);
      };
      document.head.appendChild(script);
    });
  }

    PARTIALS.reduce(function (chain, src) {
    return chain.then(function () { return loadScript(src); });
  }, Promise.resolve()).then(function () {
    // WAIT FOR RENDER: Ensure the DOM actually has the rendered cards before wiring listeners.
    return window.__renderReadyPromise || Promise.resolve();
  }).then(function () {
    if (window.interactions && typeof window.interactions.init === "function") {
      window.interactions.init();
      window.__portfolioReady = true;
      document.dispatchEvent(new CustomEvent("portfolio-interactions-ready"));
    } else {
      console.error(
        "[interactions/index.js] window.interactions.init is unavailable. " +
        "Make sure all interaction partials loaded before this file."
      );
    }
  });
})();