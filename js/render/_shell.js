/* ==========================================================================
   js/render/_shell.js
   Part of the render pipeline. Loaded FIRST among render partials.

   Attaches shared DOM/data utilities and shell-related renderers to
   window.__render. Every function here is read by other partials at
   CALL time (never at IIFE-init time), so load order is safe as long
   as this partial is loaded before any other render partial runs.

   Provides:
     - DOM helpers: el, clearChildren
     - Data helpers: getSection, uniqueInOrder
     - Icons: buildIcon, replaceIconSlot, hydrateIcons,
              renderThemeToggleIcons
     - Shell renderers: renderMeta, buildFolderTreeItem,
                        renderFolderTree, renderCounts
     - Grid mode helper: applyGridMode

   Config read via window.__render.config. Every config read happens
   INSIDE a function body, never at IIFE top level. Enforce this
   discipline in future edits.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__render) window.__render = {};

  const data = window.portfolioData || {};
  const iconSource = window.portfolioIcons || {};
  const ICON_FALLBACK = "circle";
  const unknownIconsWarned = {};

  // ---------------------------------------------------------------------
  // DOM / data helpers
  // ---------------------------------------------------------------------

  function el(tag, opts) {
    opts = opts || {};
    const node = document.createElement(tag);
    if (opts.className) node.className = opts.className;
    if (opts.text != null) node.textContent = opts.text;
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach((k) => node.setAttribute(k, opts.attrs[k]));
    }
    return node;
  }

  function clearChildren(node) {
    if (!node) return;
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function getSection(sectionId) {
    return data.sections.find((s) => s.id === sectionId) || null;
  }

  function uniqueInOrder(values) {
    const seen = new Set();
    const out = [];
    values.forEach((v) => {
      if (v != null && !seen.has(v)) { seen.add(v); out.push(v); }
    });
    return out;
  }

  function applyGridMode(gridEl, mode) {
    const GRID_MODE_CLASS = (window.__render.config || {}).GRID_MODE_CLASS || {};
    if (!gridEl) return;
    Object.keys(GRID_MODE_CLASS).forEach((k) => gridEl.classList.remove(GRID_MODE_CLASS[k]));
    if (mode && GRID_MODE_CLASS[mode]) gridEl.classList.add(GRID_MODE_CLASS[mode]);
  }

  // ---------------------------------------------------------------------
  // Icons
  // ---------------------------------------------------------------------

  function buildIcon(name, opts) {
    opts = opts || {};
    const svgString = iconSource[name];
    let chosen = name;

    if (!svgString) {
      if (!unknownIconsWarned[name]) {
        console.warn('[render] Unknown icon "' + name + '", falling back to "' + ICON_FALLBACK + '".');
        unknownIconsWarned[name] = true;
      }
      chosen = ICON_FALLBACK;
    }

    const raw = iconSource[chosen] || iconSource[ICON_FALLBACK];
    if (!raw) return null;

    const tpl = document.createElement("template");
    tpl.innerHTML = raw;
    const svg = tpl.content.firstElementChild;
    if (!svg) return null;

    svg.setAttribute("focusable", "false");
    svg.setAttribute("width", String(opts.size || 20));
    svg.setAttribute("height", String(opts.size || 20));
    if (opts.className) svg.setAttribute("class", opts.className);
    if (opts.ariaHidden === false) svg.removeAttribute("aria-hidden");
    return svg;
  }

  function replaceIconSlot(slot, name, opts) {
    if (!slot) return;
    const svg = buildIcon(name, opts);
    if (!svg) return;
    while (slot.firstChild) slot.removeChild(slot.firstChild);
    slot.appendChild(svg);
  }

  function hydrateIcons(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-icon]").forEach((slot) => {
      const name = slot.getAttribute("data-icon");
      if (!name) return;
      const wasHidden = slot.getAttribute("aria-hidden") === "true";
      replaceIconSlot(slot, name, { ariaHidden: wasHidden });
      slot.removeAttribute("data-icon");
    });
  }

  function renderThemeToggleIcons() {
    const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const iconName = theme === "dark" ? "moon" : "sun";
    document.querySelectorAll(".theme-toggle__icon").forEach((slot) => {
      replaceIconSlot(slot, iconName, { ariaHidden: true });
    });
  }

  // ---------------------------------------------------------------------
  // Meta
  // ---------------------------------------------------------------------

  function renderMeta() {
    const meta = data.meta || {};

    const brandName = document.querySelector(".brand-name");
    if (brandName) brandName.textContent = meta.name || "";

    const drawerName = document.querySelector(".drive-drawer__name");
    if (drawerName) drawerName.textContent = meta.name || "";

    const initials = meta.avatarInitials || "";
    document.querySelectorAll(".avatar-button__initials").forEach((n) => {
      n.textContent = initials;
    });

    if (meta.name) document.title = "Portfolio — " + meta.name;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl && meta.name) {
      const tagline = meta.tagline ? " — " + meta.tagline : "";
      descEl.setAttribute("content", "Portfolio of " + meta.name + tagline);
    }

    renderThemeToggleIcons();
  }

  // ---------------------------------------------------------------------
  // Folder tree
  // ---------------------------------------------------------------------

  function buildFolderTreeItem(section) {
    const config = window.__render.config || {};
    const DEFAULT_SECTION_ID = config.DEFAULT_SECTION_ID;
    const COUNTED_SECTIONS = config.COUNTED_SECTIONS || [];
    const SECTION_ITEM_CONFIG = config.SECTION_ITEM_CONFIG || {};

    const li = el("li", { className: "folder-tree__item", attrs: { role: "treeitem" } });

    const btn = el("button", {
      className: "folder-tree__leaf" + (section.id === DEFAULT_SECTION_ID ? " is-active" : ""),
      attrs: { type: "button", "data-section": section.id }
    });
    if (section.id === DEFAULT_SECTION_ID) btn.setAttribute("aria-current", "page");

    const iconSlot = el("span", {
      className: "folder-tree__icon",
      attrs: { "aria-hidden": "true" }
    });
    const iconNode = buildIcon(section.icon || ICON_FALLBACK, { size: 16 });
    if (iconNode) iconSlot.appendChild(iconNode);

    const label = el("span", { className: "folder-tree__label", text: section.label });

    btn.appendChild(iconSlot);
    btn.appendChild(label);

    if (COUNTED_SECTIONS.indexOf(section.id) !== -1) {
      const countArray = SECTION_ITEM_CONFIG[section.id]
        ? SECTION_ITEM_CONFIG[section.id].items() || []
        : [];
      btn.appendChild(el("span", {
        className: "folder-tree__count",
        text: String(countArray.length),
        attrs: { "data-count": section.id }
      }));
    }

    li.appendChild(btn);
    return li;
  }

  function renderFolderTree() {
    const tree = document.getElementById("folder-tree");
    if (!tree) { console.warn("[render] #folder-tree not found in DOM."); return; }
    clearChildren(tree);
    data.sections.forEach((s) => tree.appendChild(buildFolderTreeItem(s)));
  }

  // ---------------------------------------------------------------------
  // Counts
  // ---------------------------------------------------------------------

  function renderCounts() {
    const config = window.__render.config || {};
    const COUNTED_SECTIONS = config.COUNTED_SECTIONS || [];
    const SECTION_ITEM_CONFIG = config.SECTION_ITEM_CONFIG || {};

    COUNTED_SECTIONS.forEach((sectionId) => {
      const badge = document.querySelector('[data-count="' + sectionId + '"]');
      if (!badge) return;
      const cfg = SECTION_ITEM_CONFIG[sectionId];
      const count = cfg ? (cfg.items() || []).length : 0;
      badge.textContent = String(count);
    });
  }

  // ---------------------------------------------------------------------
  // Expose
  // ---------------------------------------------------------------------

  window.__render.el = el;
  window.__render.clearChildren = clearChildren;
  window.__render.getSection = getSection;
  window.__render.uniqueInOrder = uniqueInOrder;
  window.__render.applyGridMode = applyGridMode;
  window.__render.buildIcon = buildIcon;
  window.__render.replaceIconSlot = replaceIconSlot;
  window.__render.hydrateIcons = hydrateIcons;
  window.__render.renderThemeToggleIcons = renderThemeToggleIcons;
  window.__render.renderMeta = renderMeta;
  window.__render.buildFolderTreeItem = buildFolderTreeItem;
  window.__render.renderFolderTree = renderFolderTree;
  window.__render.renderCounts = renderCounts;
})();