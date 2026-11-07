/* ==========================================================================
   js/data.js
   Aggregator — assembles window.portfolioData from partial globals.

   ROLE IN THE PIPELINE

   This file is the "assembly step" of the data layer. It does not
   define content. It does not know the load order. It does not touch
   the DOM. Its entire job is to read the window.__portfolioData_*
   globals that the partials registered and merge them into the single
   window.portfolioData object that the render pipeline consumes.

   WHERE THE CONTENT LIVES

   Content lives in the per-domain partials under js/data/:

     js/data/_meta.js            → window.__portfolioData_meta
     js/data/_sections.js        → window.__portfolioData_sections
     js/data/_projects.js        → window.__portfolioData_projects
     js/data/_automation.js      → window.__portfolioData_automation
     js/data/_dashboards.js      → window.__portfolioData_dashboards
     js/data/_experience.js      → window.__portfolioData_experience
     js/data/_certifications.js  → window.__portfolioData_certifications
     js/data/_trainings.js       → window.__portfolioData_trainings
     js/data/_designs.js         → window.__portfolioData_designs
     js/data/_about.js           → window.__portfolioData_about

   To change content, edit the relevant partial. Never edit this file
   to change content — the only reason to edit js/data.js is to add a
   new top-level section key to window.portfolioData (which means also
   adding a partial under js/data/ and listing it in the barrel).

   WHERE THE LOAD ORDER LIVES

   The barrel at js/data/index.js owns the load order. It injects
   each partial as a <script> tag, waits for every one to fire its
   load event, then dispatches "portfolio-data-ready". This file
   listens for that event.

   The downstream render and interactions barrels wait on
   window.__dataReadyPromise (which the barrel resolves after the
   event), so by the time renderAll() runs, window.portfolioData is
   guaranteed to exist and to be fully populated.

   WHY THE EVENT GUARD EXISTS

   Depending on network timing and browser caching, this file may
   parse before OR after the partials have loaded:

     Case A — partials already loaded (flag set, or globals present):
       assemble() runs immediately at parse time.

     Case B — partials still loading:
       The event listener waits for "portfolio-data-ready", then runs
       assemble().

   Both paths end with window.portfolioData populated. The `|| {}` and
   `|| []` fallbacks in assemble() mean a missing partial produces an
   empty section rather than an undefined key, so the render pipeline
   never throws on a partially-loaded data layer.

   ADDING A NEW SECTION

   To add a new top-level section (e.g., "talks" for a list of speaking
   engagements), three changes are required:

     1. Create js/data/_talks.js, assigning to
        window.__portfolioData_talks.
     2. Add "js/data/_talks.js" to the PARTIALS array in
        js/data/index.js (in the position that matches the sidebar
        order you want).
     3. Add `talks: window.__portfolioData_talks || []` to the object
        literal in assemble() below.

   Then update js/render/_bootstrap.js to add the section id to
   SECTION_ITEM_CONFIG, and js/interactions/_modal.js to add the
   array to findItemById's search list. The render and interactions
   pipelines handle the rest automatically.

   No ES modules — plain script tag, exposes window.portfolioData.
   ========================================================================== */

(function () {
  "use strict";

  // Merge partials into the single object the render pipeline reads.
  // Fallback (`|| {}` / `|| []`) keeps the shape stable even if a
  // partial failed to load — better to render an empty section than
  // to throw during renderAll().
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

  // Timing guard — see "WHY THE EVENT GUARD EXISTS" above.
  if (
    window.__dataReady ||
    window.__portfolioData_meta ||
    window.__portfolioData_sections
  ) {
    assemble();
  } else {
    document.addEventListener("portfolio-data-ready", assemble, { once: true });
  }
})();