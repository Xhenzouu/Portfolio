/* ==========================================================================
   js/data/index.js
   Barrel for the per-domain data partials.

   Injects each partial as a <script> tag in the required order, then
   assembles window.portfolioData from the partials' registered globals.
   Sets window.__dataReadyPromise so the render and interactions barrels
   can wait for data before running.

   index.html only needs one tag for the entire data layer:
     <script src="js/data/index.js"></script>

   If you ever need the aggregator as a standalone script (e.g., to
   unit test it in isolation), the assemble() function is defined at
   the bottom of this file and can be extracted into js/data.js.
   ========================================================================== */

(function () {
  "use strict";

  var PARTIALS = [
    "js/data/_meta.js",
    "js/data/_sections.js",
    "js/data/_projects.js",
    "js/data/_automation.js",
    "js/data/_dashboards.js",
    "js/data/_experience.js",
    "js/data/_certifications.js",
    "js/data/_trainings.js",
    "js/data/_designs.js",
    "js/data/_about.js",
    "js/data.js"
  ];

  function loadScript(src) {
    return new Promise(function (resolve) {
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = function () { resolve(src); };
      script.onerror = function () {
        console.error("[data barrel] Failed to load: " + src);
        resolve(src); // don't block the chain on a missing file
      };
      document.head.appendChild(script);
    });
  }

  function assemble() {
    window.portfolioData = {
      meta:           window.__portfolioData_meta           || {},
      sections:       window.__portfolioData_sections       || [],
      projects:       window.__portfolioData_projects       || [],
      automation:     window.__portfolioData_automation     || [],
      dashboards:     window.__portfolioData_dashboards     || [],
      experience:     window.__portfolioData_experience     || [],
      certifications: window.__portfolioData_certifications || [],
      trainings:      window.__portfolioData_trainings      || [],
      designs:        window.__portfolioData_designs        || [],
      about:          window.__portfolioData_about          || {}
    };
  }

  window.__dataReadyPromise = PARTIALS.reduce(function (chain, src) {
    return chain.then(function () { return loadScript(src); });
  }, Promise.resolve()).then(function () {
    // js/data.js already assembled window.portfolioData as the final
    // partial in the chain. Just flip the ready flag and fire the event.
    window.__dataReady = true;
    document.dispatchEvent(new CustomEvent("portfolio-data-ready"));
    return window.portfolioData;
  });
})();