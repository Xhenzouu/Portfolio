/* ==========================================================================
   js/render/_drawer.js
   Part of the render pipeline. Loaded SIXTH.

   Drawer link list + mobile tab strip renderers.

   Cross-partial reads: el, clearChildren, getSection (from _shell).
   All reads inside function bodies.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__render) window.__render = {};

  const data = window.portfolioData || {};

  function el(tag, opts) { return window.__render.el(tag, opts); }
  function clearChildren(node) { return window.__render.clearChildren(node); }
  function getSection(sectionId) { return window.__render.getSection(sectionId); }

  function renderDrawerList() {
    const list = document.querySelector(".drive-drawer__list");
    if (!list) { console.warn("[render] .drive-drawer__list not found in DOM."); return; }
    clearChildren(list);

    data.sections.forEach((section) => {
      const li = el("li");
      const btn = el("button", {
        className: "drive-drawer__link",
        text: section.label,
        attrs: { type: "button", "data-section": section.id }
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function renderMobileTabs() {
    const config = window.__render.config || {};
    const MOBILE_TAB_SECTIONS = config.MOBILE_TAB_SECTIONS || [];
    const DEFAULT_SECTION_ID = config.DEFAULT_SECTION_ID;

    const tabs = document.querySelector(".drive-tabs");
    if (!tabs) { console.warn("[render] .drive-tabs not found in DOM."); return; }
    clearChildren(tabs);

    MOBILE_TAB_SECTIONS.forEach((sectionId) => {
      const section = getSection(sectionId);
      if (!section) return;
      const isActive = sectionId === DEFAULT_SECTION_ID;
      const btn = el("button", {
        className: "drive-tabs__tab" + (isActive ? " is-active" : ""),
        text: section.label,
        attrs: { type: "button", "data-section": section.id }
      });
      if (isActive) btn.setAttribute("aria-current", "page");
      tabs.appendChild(btn);
    });
  }

  window.__render.renderDrawerList = renderDrawerList;
  window.__render.renderMobileTabs = renderMobileTabs;
})();