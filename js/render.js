/* ==========================================================================
   render.js
   Reads window.portfolioData + window.portfolioIcons and builds/populates
   the DOM. Exposes window.render for interactions.js to call.

   Phase 9 changes:
     - renderContactSection(): new. Builds a Contact section from
       data.meta.contact, using the same .about-layout wrapper and
       .about-block styling as About. Email → mailto:, phone → tel: (with
       spaces/dashes stripped from the href), LinkedIn / GitHub /
       portfolioUrl → external links with target="_blank"
       rel="noopener noreferrer". Falsy fields are skipped.
     - renderModalContent(item, sectionId): new second argument. Looks up
       SECTION_ITEM_CONFIG[sectionId].thumbVariant and passes it to the
       modal hero slot, so certifications render their portrait hero
       with object-fit: contain instead of the default landscape crop.
       Missing sectionId → no variant → landscape (matches pre-change
       behavior).
     - renderSectionHeader(): special case for "contact" → subtitle
       "Get in touch".
     - renderDashboard/renderDriveGrid dispatch: contact branch added
       alongside about.

   Phase 8.1 follow-up (preserved):
     - SECTION_ITEM_CONFIG.certifications has thumbVariant: "portrait".
     - buildThumbSlot() takes a 4th arg (variant).
     - Guard-block stub list complete.

   Phase 8.1 (preserved):
     - buildIcon/hydrateIcons/replaceIconSlot/renderThemeToggleIcons.
     - buildDashboardCard/buildDriveCard(item, config).
     - renderBreadcrumb uses Lucide chevron-right.

   Phase 7.5 / 7.2 (preserved): renderMeta, renderAboutSection,
   applyGridMode, flat folder tree, renderFilterChips.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.portfolioData) {
    console.warn(
      "[render.js] window.portfolioData is missing. " +
      "Make sure js/data.js is loaded before js/render.js. Rendering skipped."
    );
    window.render = {
      renderAll: function () {},
      renderMeta: function () {},
      hydrateIcons: function () {},
      renderThemeToggleIcons: function () {},
      replaceIconSlot: function () {},
      renderFolderTree: function () {},
      renderDashboard: function () {},
      renderDriveGrid: function () {},
      renderFilterChips: function () {},
      renderDrawerList: function () {},
      renderMobileTabs: function () {},
      renderBreadcrumb: function () {},
      renderSectionHeader: function () {},
      renderCounts: function () {},
      renderSection: function () {},
      renderModalContent: function () {},
      renderContactSection: function () {}
    };
    return;
  }

  const data = window.portfolioData;
  const iconSource = window.portfolioIcons || {};

  const DEFAULT_SECTION_ID = "projects";
  const COUNTED_SECTIONS = ["projects", "certifications"];
  const MOBILE_TAB_SECTIONS = ["projects", "certifications", "experience"];
  const SECTIONS_WITH_CHIPS = ["projects"];

  const SECTION_ITEM_CONFIG = {
    projects: {
      items: () => data.projects,
      title: (item) => item.name,
      meta: (item) => [item.category, item.date].filter(Boolean).join(" · "),
      chipKey: (item) => item.category
    },
    experience: {
      items: () => data.experience,
      title: (item) => item.role,
      meta: (item) => [item.org, [item.startDate, item.endDate].filter(Boolean).join("–")]
        .filter(Boolean).join(" · "),
      chipKey: (item) => item.org
    },
    certifications: {
      items: () => data.certifications,
      title: (item) => item.name,
      meta: (item) => [item.issuer, item.date].filter(Boolean).join(" · "),
      chipKey: (item) => item.issuer,
      thumbVariant: "portrait"
    },
    trainings: {
      items: () => data.trainings,
      title: (item) => item.name,
      meta: (item) => [item.provider, item.hours != null ? item.hours + "h" : null]
        .filter(Boolean).join(" · "),
      chipKey: null
    },
    designs: {
      items: () => data.designs,
      title: (item) => item.name,
      meta: (item) => item.type,
      chipKey: null
    }
  };

  const CHIP_CONTAINER_IDS = ["dashboard-filters", "drive-filters"];
  const GRID_MODE_CLASS = { about: "about-layout" };

  // Sections rendered via the About-style stacked layout. Used by
  // renderDashboard/renderDriveGrid to decide whether to call the
  // generic card renderer or a section-specific renderer.
  const STATIC_LAYOUT_SECTIONS = ["about", "contact"];

  // ---------------------------------------------------------------------
  // DOM helpers
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
    if (!gridEl) return;
    Object.keys(GRID_MODE_CLASS).forEach((k) => gridEl.classList.remove(GRID_MODE_CLASS[k]));
    if (mode && GRID_MODE_CLASS[mode]) gridEl.classList.add(GRID_MODE_CLASS[mode]);
  }

  // ---------------------------------------------------------------------
  // ICONS
  // ---------------------------------------------------------------------

  const ICON_FALLBACK = "circle";
  const unknownIconsWarned = {};

  function buildIcon(name, opts) {
    opts = opts || {};
    const svgString = iconSource[name];
    let chosen = name;

    if (!svgString) {
      if (!unknownIconsWarned[name]) {
        console.warn('[render.js] Unknown icon "' + name + '", falling back to "' + ICON_FALLBACK + '".');
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
  // META
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
  // FOLDER TREE
  // ---------------------------------------------------------------------

  function buildFolderTreeItem(section) {
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
    if (!tree) { console.warn("[render.js] #folder-tree not found in DOM."); return; }
    clearChildren(tree);
    data.sections.forEach((s) => tree.appendChild(buildFolderTreeItem(s)));
  }

  // ---------------------------------------------------------------------
  // COUNTS / CHIPS
  // ---------------------------------------------------------------------

  function renderCounts() {
    COUNTED_SECTIONS.forEach((sectionId) => {
      const badge = document.querySelector('[data-count="' + sectionId + '"]');
      if (!badge) return;
      const config = SECTION_ITEM_CONFIG[sectionId];
      const count = config ? (config.items() || []).length : 0;
      badge.textContent = String(count);
    });
  }

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
    const config = SECTION_ITEM_CONFIG[sectionId];
    const showChips = SECTIONS_WITH_CHIPS.indexOf(sectionId) !== -1;

    CHIP_CONTAINER_IDS.forEach((containerId) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      clearChildren(container);

      if (!showChips || !config || !config.chipKey) {
        container.hidden = true;
        return;
      }

      const items = config.items() || [];
      const values = uniqueInOrder(items.map(config.chipKey));

      container.appendChild(buildChip("All", "all", true));
      values.forEach((v) => container.appendChild(buildChip(v, v, false)));
      container.hidden = false;
    });
  }

  // ---------------------------------------------------------------------
  // IMAGE / GLYPH SLOT
  // ---------------------------------------------------------------------

  function buildThumbSlot(thumbSrc, className, glyph, variant) {
    const composedClass = variant ? className + " " + className + "--" + variant : className;
    const slot = el("div", { className: composedClass, attrs: { "aria-hidden": "true" } });

    if (!thumbSrc) {
      slot.textContent = glyph || "▢";
      return slot;
    }

    const img = document.createElement("img");
    img.src = thumbSrc;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    img.onerror = function () {
      while (slot.firstChild) slot.removeChild(slot.firstChild);
      slot.textContent = glyph || "▢";
    };
    slot.appendChild(img);
    return slot;
  }

  // ---------------------------------------------------------------------
  // CARDS (dashboard + drive)
  // ---------------------------------------------------------------------

  function attachCardInteraction(cardEl, item) {
    cardEl.setAttribute("role", "button");
    cardEl.setAttribute("tabindex", "0");
    cardEl.setAttribute("data-item-id", item.id || "");
    cardEl.classList.add("is-clickable");
  }

  function buildDashboardCard(item, config) {
    const card = el("article", { className: "card" });

    const thumb = buildThumbSlot(item.thumb, "card__thumb", "▢", config.thumbVariant);

    const body = el("div", { className: "card__body" });
    body.appendChild(el("h2", { className: "card__title", text: config.title(item) }));
    body.appendChild(el("p", { className: "card__meta", text: config.meta(item) }));

    card.appendChild(thumb);
    card.appendChild(body);
    attachCardInteraction(card, item);
    return card;
  }

  function buildDriveCard(item, config) {
    const card = el("article", { className: "drive-card" });

    const thumb = buildThumbSlot(item.thumb, "drive-card__thumb", "▢", config.thumbVariant);

    card.appendChild(thumb);
    card.appendChild(el("div", { className: "drive-card__label", text: config.title(item) }));
    card.appendChild(el("div", { className: "drive-card__meta", text: config.meta(item) }));

    attachCardInteraction(card, item);
    return card;
  }

  // ---------------------------------------------------------------------
  // ABOUT LAYOUT
  // ---------------------------------------------------------------------

  function buildAboutBlock(titleText, bodyNode) {
    const section = el("section", { className: "about-block" });
    section.appendChild(el("h2", { className: "about-block__title", text: titleText }));
    const body = el("div", { className: "about-block__body" });
    body.appendChild(bodyNode);
    section.appendChild(body);
    return section;
  }

  function buildBioBlock() {
    const wrap = el("div", { className: "about-bio" });
    ((data.about && data.about.bio) || []).forEach((text) =>
      wrap.appendChild(el("p", { className: "about-bio__paragraph", text: text }))
    );
    return wrap;
  }

  function buildEducationBlock() {
    const wrap = el("div", { className: "about-education" });
    ((data.about && data.about.education) || []).forEach((entry) => {
      const item = el("div", { className: "about-education__item" });
      item.appendChild(el("div", { className: "about-education__degree", text: entry.degree || "" }));
      item.appendChild(el("div", { className: "about-education__institution", text: entry.institution || "" }));
      item.appendChild(el("div", {
        className: "about-education__years",
        text: [entry.startYear, entry.endYear].filter(Boolean).join(" – ")
      }));
      wrap.appendChild(item);
    });
    return wrap;
  }

  function buildAwardsBlock() {
    const wrap = el("div", { className: "about-awards" });
    ((data.about && data.about.awards) || []).forEach((award) => {
      const item = el("div", { className: "about-awards__item" });
      item.appendChild(el("div", { className: "about-awards__name", text: award.name || "" }));
      item.appendChild(el("div", {
        className: "about-awards__meta",
        text: [award.issuer, award.date].filter(Boolean).join(" · ")
      }));
      wrap.appendChild(item);
    });
    return wrap;
  }

  function buildSkillsBlock() {
    const wrap = el("div", { className: "about-skills" });
    const skills = (data.about && data.about.skills) || {};
    const GROUP_LABELS = {
      languages: "Languages",
      frameworks: "Frameworks",
      cloudDevops: "Cloud & DevOps",
      ai: "AI & ML",
      security: "Security",
      other: "Other"
    };

    Object.keys(skills).forEach((key) => {
      const items = skills[key] || [];
      if (!items.length) return;
      const group = el("div", { className: "about-skills__group" });
      group.appendChild(el("div", {
        className: "about-skills__label",
        text: GROUP_LABELS[key] || key
      }));
      const list = el("ul", { className: "about-skills__list" });
      items.forEach((s) => list.appendChild(el("li", { className: "about-skills__item", text: s })));
      group.appendChild(list);
      wrap.appendChild(group);
    });
    return wrap;
  }

  function renderAboutSection(gridEl) {
    if (!gridEl) return;
    gridEl.appendChild(buildAboutBlock("Bio", buildBioBlock()));
    gridEl.appendChild(buildAboutBlock("Education", buildEducationBlock()));
    gridEl.appendChild(buildAboutBlock("Awards", buildAwardsBlock()));
    gridEl.appendChild(buildAboutBlock("Skills", buildSkillsBlock()));
  }

  // ---------------------------------------------------------------------
  // CONTACT LAYOUT (Phase 9)
  //
  // Renders one stacked block from data.meta.contact. Email → mailto:,
  // phone → tel: (href normalized), external URLs → target="_blank".
  // Falsy fields are skipped, so a blank phone or missing LinkedIn won't
  // produce a dead link row.
  // ---------------------------------------------------------------------

  function normalizePhoneHref(raw) {
    // Keep a leading + (for international dialing) and digits only.
    // Strips spaces, dashes, parens, dots.
    return String(raw || "").replace(/[^+\d]/g, "");
  }

  function buildContactList() {
    const contact = (data.meta && data.meta.contact) || {};
    const list = el("ul", { className: "contact-list" });

    const rows = [];

    if (contact.email) {
      rows.push({
        label: "Email",
        display: contact.email,
        href: "mailto:" + contact.email,
        external: false
      });
    }
    if (contact.phone) {
      rows.push({
        label: "Phone",
        display: contact.phone,
        href: "tel:" + normalizePhoneHref(contact.phone),
        external: false
      });
    }
    if (contact.linkedin) {
      rows.push({
        label: "LinkedIn",
        display: contact.linkedin.replace(/^https?:\/\//, ""),
        href: contact.linkedin,
        external: true
      });
    }
    if (contact.github) {
      rows.push({
        label: "GitHub",
        display: contact.github.replace(/^https?:\/\//, ""),
        href: contact.github,
        external: true
      });
    }
    if (contact.portfolioUrl) {
      rows.push({
        label: "Portfolio",
        display: contact.portfolioUrl.replace(/^https?:\/\//, ""),
        href: contact.portfolioUrl,
        external: true
      });
    }

    rows.forEach((row) => {
      const li = el("li", { className: "contact-list__item" });
      li.appendChild(el("span", { className: "contact-list__label", text: row.label }));

      const linkAttrs = { href: row.href };
      if (row.external) {
        linkAttrs.target = "_blank";
        linkAttrs.rel = "noopener noreferrer";
      }
      const link = el("a", {
        className: "contact-list__link",
        text: row.display,
        attrs: linkAttrs
      });
      li.appendChild(link);
      list.appendChild(li);
    });

    return list;
  }

  function renderContactSection(gridEl) {
    if (!gridEl) return;
    gridEl.appendChild(buildAboutBlock("Contact", buildContactList()));
  }

  // ---------------------------------------------------------------------
  // GRID RENDERERS
  // ---------------------------------------------------------------------

  function renderDashboard(sectionId) {
    const grid = document.getElementById("dashboard-grid");
    if (!grid) { console.warn("[render.js] #dashboard-grid not found in DOM."); return; }
    clearChildren(grid);
    applyGridMode(grid, STATIC_LAYOUT_SECTIONS.indexOf(sectionId) !== -1 ? "about" : "cards");

    if (sectionId === "about")   { renderAboutSection(grid);   return; }
    if (sectionId === "contact") { renderContactSection(grid); return; }

    const config = SECTION_ITEM_CONFIG[sectionId];
    if (!config) {
      console.info('[render.js] Section "' + sectionId + '" has no grid-card representation yet.');
      return;
    }
    (config.items() || []).forEach((item) =>
      grid.appendChild(buildDashboardCard(item, config))
    );
  }

  function renderDriveGrid(sectionId) {
    const grid = document.getElementById("drive-grid");
    if (!grid) { console.warn("[render.js] #drive-grid not found in DOM."); return; }
    clearChildren(grid);
    applyGridMode(grid, STATIC_LAYOUT_SECTIONS.indexOf(sectionId) !== -1 ? "about" : "cards");

    if (sectionId === "about")   { renderAboutSection(grid);   return; }
    if (sectionId === "contact") { renderContactSection(grid); return; }

    const config = SECTION_ITEM_CONFIG[sectionId];
    if (!config) {
      console.info('[render.js] Section "' + sectionId + '" has no grid-card representation yet.');
      return;
    }
    (config.items() || []).forEach((item) =>
      grid.appendChild(buildDriveCard(item, config))
    );
  }

  // ---------------------------------------------------------------------
  // DRAWER LIST / MOBILE TABS / BREADCRUMB / SECTION HEADER
  // ---------------------------------------------------------------------

  function renderDrawerList() {
    const list = document.querySelector(".drive-drawer__list");
    if (!list) { console.warn("[render.js] .drive-drawer__list not found in DOM."); return; }
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
    const tabs = document.querySelector(".drive-tabs");
    if (!tabs) { console.warn("[render.js] .drive-tabs not found in DOM."); return; }
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

  function buildBreadcrumbSeparator() {
    const li = el("li", { className: "breadcrumb__separator", attrs: { "aria-hidden": "true" } });
    const svg = buildIcon("chevron-right", { size: 14 });
    if (svg) li.appendChild(svg);
    return li;
  }

  function renderBreadcrumb(sectionId) {
    const list = document.querySelector("#breadcrumb .breadcrumb__list");
    if (!list) { console.warn("[render.js] #breadcrumb .breadcrumb__list not found in DOM."); return; }
    clearChildren(list);

    const rootItem = el("li", { className: "breadcrumb__item" });
    const rootLink = el("a", {
      className: "breadcrumb__link",
      text: "Portfolio",
      attrs: { href: "#" }
    });
    rootItem.appendChild(rootLink);
    list.appendChild(rootItem);

    const section = getSection(sectionId);
    if (section) {
      list.appendChild(buildBreadcrumbSeparator());
      list.appendChild(el("li", {
        className: "breadcrumb__item",
        text: section.label,
        attrs: { "aria-current": "page" }
      }));
    }
  }

  function renderSectionHeader(sectionId) {
    const heading = document.getElementById("dashboard-heading");
    const subtitle = document.querySelector(".dashboard-section__subtitle");
    const section = getSection(sectionId);
    if (!section) return;

    if (heading) heading.textContent = section.label;

    if (subtitle) {
      if (sectionId === "about") {
        subtitle.textContent = (data.meta && data.meta.tagline) || "";
      } else if (sectionId === "contact") {
        subtitle.textContent = "Get in touch";
      } else {
        const config = SECTION_ITEM_CONFIG[sectionId];
        if (config) {
          subtitle.textContent = (config.items() || []).length + " " + section.label;
        } else {
          subtitle.textContent = "[Placeholder subtitle for " + section.label + "]";
        }
      }
    }
  }

  // ---------------------------------------------------------------------
  // MODAL CONTENT (Phase 8.1; sectionId param added Phase 9)
  //
  // sectionId is used only to look up a thumbVariant for the modal hero
  // (certifications → portrait). Missing sectionId → no variant, which
  // renders the landscape hero that was the default before this change.
  // ---------------------------------------------------------------------

  function renderModalContent(item, sectionId) {
    const container = document.getElementById("modal-content");
    if (!container || !item) return;
    clearChildren(container);

    if (item.thumb) {
      const config = sectionId ? SECTION_ITEM_CONFIG[sectionId] : null;
      const variant = config ? config.thumbVariant : undefined;
      const hero = buildThumbSlot(item.thumb, "modal__hero", "▢", variant);
      container.appendChild(hero);
    }

    const header = el("div", { className: "modal__header" });
    const titleText = item.name || item.role || "";
    header.appendChild(el("h2", {
      className: "modal__title",
      text: titleText,
      attrs: { id: "modal-title" }
    }));

    const metaParts = [];
    if (item.category) metaParts.push(item.category);
    if (item.date) metaParts.push(item.date);
    if (item.org) metaParts.push(item.org);
    if (item.issuer) metaParts.push(item.issuer);
    if (item.provider) metaParts.push(item.provider);
    if (item.startDate || item.endDate) {
      metaParts.push([item.startDate, item.endDate].filter(Boolean).join("–"));
    }
    if (metaParts.length) {
      header.appendChild(el("p", { className: "modal__meta", text: metaParts.join(" · ") }));
    }
    container.appendChild(header);

    if (item.description) {
      container.appendChild(el("p", { className: "modal__description", text: item.description }));
    }

    if (Array.isArray(item.highlights) && item.highlights.length) {
      const wrap = el("div", { className: "modal__highlights" });
      wrap.appendChild(el("h3", { className: "modal__section-title", text: "Highlights" }));
      const ul = el("ul", { className: "modal__highlights-list" });
      item.highlights.forEach((h) =>
        ul.appendChild(el("li", { className: "modal__highlight", text: h }))
      );
      wrap.appendChild(ul);
      container.appendChild(wrap);
    }

    if (Array.isArray(item.tech) && item.tech.length) {
      const wrap = el("div", { className: "modal__tags" });
      wrap.appendChild(el("h3", { className: "modal__section-title", text: "Tech" }));
      const list = el("ul", { className: "modal__tag-list" });
      item.tech.forEach((t) =>
        list.appendChild(el("li", { className: "modal__tag", text: t }))
      );
      wrap.appendChild(list);
      container.appendChild(wrap);
    }

    const links = el("div", { className: "modal__links" });
    if (item.repoUrl) {
      links.appendChild(el("a", {
        className: "modal__link",
        text: "View Repo",
        attrs: { href: item.repoUrl, target: "_blank", rel: "noopener noreferrer" }
      }));
    }
    if (item.liveUrl) {
      links.appendChild(el("a", {
        className: "modal__link modal__link--primary",
        text: "View Live",
        attrs: { href: item.liveUrl, target: "_blank", rel: "noopener noreferrer" }
      }));
    }
    if (links.childNodes.length) container.appendChild(links);
  }

  // ---------------------------------------------------------------------
  // COMPOSITE
  // ---------------------------------------------------------------------

  function renderSection(sectionId) {
    const targetId = getSection(sectionId) ? sectionId : DEFAULT_SECTION_ID;
    renderDashboard(targetId);
    renderDriveGrid(targetId);
    renderFilterChips(targetId);
    renderBreadcrumb(targetId);
    renderSectionHeader(targetId);
  }

  function renderAll() {
    renderMeta();
    hydrateIcons();
    renderFolderTree();
    renderCounts();
    renderDrawerList();
    renderMobileTabs();
    renderSection(DEFAULT_SECTION_ID);
  }

  window.render = {
    renderAll: renderAll,
    renderMeta: renderMeta,
    hydrateIcons: hydrateIcons,
    renderThemeToggleIcons: renderThemeToggleIcons,
    replaceIconSlot: replaceIconSlot,
    renderFolderTree: renderFolderTree,
    renderDashboard: renderDashboard,
    renderDriveGrid: renderDriveGrid,
    renderFilterChips: renderFilterChips,
    renderDrawerList: renderDrawerList,
    renderMobileTabs: renderMobileTabs,
    renderBreadcrumb: renderBreadcrumb,
    renderSectionHeader: renderSectionHeader,
    renderCounts: renderCounts,
    renderSection: renderSection,
    renderModalContent: renderModalContent,
    renderContactSection: renderContactSection
  };

  renderAll();
})();