/* ==========================================================================
   js/render/_chips.js
   Part of the render pipeline. Loaded THIRD.

   Filter chip rendering. Reads el/clearChildren/uniqueInOrder from
   window.__render. Config read via window.__render.config INSIDE
   function bodies.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__render) window.__render = {};

  function el(tag, opts) { return window.__render.el(tag, opts); }
  function clearChildren(node) { return window.__render.clearChildren(node); }
  function uniqueInOrder(values) { return window.__render.uniqueInOrder(values); }

  function buildChip(label, value, isActive) {
    const chip = el("button", {
      className: "filter-chip" + (isActive ? " is-active" : ""),
      text: label,
      attrs: { type: "button", role: "tab", "data-filter-value": value }
    });
    chip.setAttribute("aria-selected", isActive ? "true" : "false");
    return chip;
  }

  function renderFilterChips(sectionId) {
    const config = window.__render.config || {};
    const CHIP_CONTAINER_IDS = config.CHIP_CONTAINER_IDS || [];
    const SECTIONS_WITH_CHIPS = config.SECTIONS_WITH_CHIPS || [];
    const SECTION_ITEM_CONFIG = config.SECTION_ITEM_CONFIG || {};

    const sectionConfig = SECTION_ITEM_CONFIG[sectionId];
    const showChips = SECTIONS_WITH_CHIPS.indexOf(sectionId) !== -1;

    CHIP_CONTAINER_IDS.forEach((containerId) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      clearChildren(container);

      if (!showChips || !sectionConfig || !sectionConfig.chipKey) {
        container.hidden = true;
        return;
      }

      const items = sectionConfig.items() || [];
      const values = uniqueInOrder(items.map(sectionConfig.chipKey));

      container.appendChild(buildChip("All", "all", true));
      values.forEach((v) => container.appendChild(buildChip(v, v, false)));
      container.hidden = false;
    });
  }

  window.__render.buildChip = buildChip;
  window.__render.renderFilterChips = renderFilterChips;
})();