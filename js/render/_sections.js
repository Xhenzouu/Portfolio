/* ==========================================================================
   js/render/_sections.js
   Part of the render pipeline. Loaded FOURTH.

   Section renderers: dashboard grid, drive grid, About blocks, Contact
   list, breadcrumb, section header.

   Cross-partial reads:
     - window.__render.el / clearChildren / getSection / applyGridMode /
       buildIcon (from _shell)
     - window.__render.buildDashboardCard / buildDriveCard (from _cards)

   All reads happen inside function bodies, never at IIFE init time.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__render) window.__render = {};

  const data = window.portfolioData || {};

  function el(tag, opts) { return window.__render.el(tag, opts); }
  function clearChildren(node) { return window.__render.clearChildren(node); }
  function getSection(sectionId) { return window.__render.getSection(sectionId); }
  function applyGridMode(gridEl, mode) { return window.__render.applyGridMode(gridEl, mode); }
  function buildIcon(name, opts) { return window.__render.buildIcon(name, opts); }
  function buildDashboardCard(item, config) { return window.__render.buildDashboardCard(item, config); }
  function buildDriveCard(item, config) { return window.__render.buildDriveCard(item, config); }

  // ---------------------------------------------------------------------
  // About blocks
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
  // Contact
  // ---------------------------------------------------------------------

  function normalizePhoneHref(raw) {
    return String(raw || "").replace(/[^+\d]/g, "");
  }

  function buildContactList() {
    const contact = (data.meta && data.meta.contact) || {};
    const list = el("ul", { className: "contact-list" });

    const rows = [];

    if (contact.email) {
      rows.push({ label: "Email", display: contact.email, href: "mailto:" + contact.email, external: false });
    }
    if (contact.phone) {
      rows.push({ label: "Phone", display: contact.phone, href: "tel:" + normalizePhoneHref(contact.phone), external: false });
    }
    if (contact.linkedin) {
      rows.push({ label: "LinkedIn", display: contact.linkedin.replace(/^https?:\/\//, ""), href: contact.linkedin, external: true });
    }
    if (contact.github) {
      rows.push({ label: "GitHub", display: contact.github.replace(/^https?:\/\//, ""), href: contact.github, external: true });
    }
    if (contact.portfolioUrl) {
      rows.push({ label: "Portfolio", display: contact.portfolioUrl.replace(/^https?:\/\//, ""), href: contact.portfolioUrl, external: true });
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
  // Grid renderers
  // ---------------------------------------------------------------------

  function renderDashboard(sectionId) {
    const config = window.__render.config || {};
    const STATIC_LAYOUT_SECTIONS = config.STATIC_LAYOUT_SECTIONS || [];
    const SECTION_ITEM_CONFIG = config.SECTION_ITEM_CONFIG || {};

    const grid = document.getElementById("dashboard-grid");
    if (!grid) { console.warn("[render] #dashboard-grid not found in DOM."); return; }
    clearChildren(grid);
    applyGridMode(grid, STATIC_LAYOUT_SECTIONS.indexOf(sectionId) !== -1 ? "about" : "cards");

    if (sectionId === "about")   { renderAboutSection(grid);   return; }
    if (sectionId === "contact") { renderContactSection(grid); return; }

    const sectionConfig = SECTION_ITEM_CONFIG[sectionId];
    if (!sectionConfig) {
      console.info('[render] Section "' + sectionId + '" has no grid-card representation yet.');
      return;
    }
    (sectionConfig.items() || []).forEach((item) =>
      grid.appendChild(buildDashboardCard(item, sectionConfig))
    );
  }

  function renderDriveGrid(sectionId) {
    const config = window.__render.config || {};
    const STATIC_LAYOUT_SECTIONS = config.STATIC_LAYOUT_SECTIONS || [];
    const SECTION_ITEM_CONFIG = config.SECTION_ITEM_CONFIG || {};

    const grid = document.getElementById("drive-grid");
    if (!grid) { console.warn("[render] #drive-grid not found in DOM."); return; }
    clearChildren(grid);
    applyGridMode(grid, STATIC_LAYOUT_SECTIONS.indexOf(sectionId) !== -1 ? "about" : "cards");

    if (sectionId === "about")   { renderAboutSection(grid);   return; }
    if (sectionId === "contact") { renderContactSection(grid); return; }

    const sectionConfig = SECTION_ITEM_CONFIG[sectionId];
    if (!sectionConfig) {
      console.info('[render] Section "' + sectionId + '" has no grid-card representation yet.');
      return;
    }
    (sectionConfig.items() || []).forEach((item) =>
      grid.appendChild(buildDriveCard(item, sectionConfig))
    );
  }

  // ---------------------------------------------------------------------
  // Breadcrumb
  // ---------------------------------------------------------------------

  function buildBreadcrumbSeparator() {
    const li = el("li", { className: "breadcrumb__separator", attrs: { "aria-hidden": "true" } });
    const svg = buildIcon("chevron-right", { size: 14 });
    if (svg) li.appendChild(svg);
    return li;
  }

  function renderBreadcrumb(sectionId) {
    const list = document.querySelector("#breadcrumb .breadcrumb__list");
    if (!list) { console.warn("[render] #breadcrumb .breadcrumb__list not found in DOM."); return; }
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

  // ---------------------------------------------------------------------
  // Section header
  // ---------------------------------------------------------------------

  function renderSectionHeader(sectionId) {
    const config = window.__render.config || {};
    const SECTION_ITEM_CONFIG = config.SECTION_ITEM_CONFIG || {};

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
        const cfg = SECTION_ITEM_CONFIG[sectionId];
        if (cfg) {
          subtitle.textContent = (cfg.items() || []).length + " " + section.label;
        } else {
          subtitle.textContent = "[Placeholder subtitle for " + section.label + "]";
        }
      }
    }
  }

  window.__render.buildAboutBlock = buildAboutBlock;
  window.__render.buildBioBlock = buildBioBlock;
  window.__render.buildEducationBlock = buildEducationBlock;
  window.__render.buildAwardsBlock = buildAwardsBlock;
  window.__render.buildSkillsBlock = buildSkillsBlock;
  window.__render.renderAboutSection = renderAboutSection;
  window.__render.normalizePhoneHref = normalizePhoneHref;
  window.__render.buildContactList = buildContactList;
  window.__render.renderContactSection = renderContactSection;
  window.__render.renderDashboard = renderDashboard;
  window.__render.renderDriveGrid = renderDriveGrid;
  window.__render.buildBreadcrumbSeparator = buildBreadcrumbSeparator;
  window.__render.renderBreadcrumb = renderBreadcrumb;
  window.__render.renderSectionHeader = renderSectionHeader;
})();