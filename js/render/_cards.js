/* ==========================================================================
   js/render/_cards.js
   Part of the render pipeline. Loaded SECOND.

   Card + thumb slot builders. Reads el from window.__render.

   Provides:
     - buildThumbSlot
     - attachCardInteraction
     - buildDashboardCard
     - buildDriveCard

   THUMB VARIANT RESOLUTION:
     Each card reads  item.thumbVariant || config.thumbVariant  so a
     section can mix orientations. Item-level wins; section-level is
     the fallback; neither present → default landscape (no modifier).

   Config read via window.__render.config INSIDE function bodies only.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__render) window.__render = {};

  function el(tag, opts) { return window.__render.el(tag, opts); }

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

  function attachCardInteraction(cardEl, item) {
    cardEl.setAttribute("role", "button");
    cardEl.setAttribute("tabindex", "0");
    cardEl.setAttribute("data-item-id", item.id || "");
    cardEl.classList.add("is-clickable");
  }

  function buildDashboardCard(item, config) {
    const card = el("article", { className: "card" });

    // Per-item thumbVariant wins; section config is the fallback.
    const variant = item.thumbVariant || config.thumbVariant;
    const thumb = buildThumbSlot(item.thumb, "card__thumb", "▢", variant);

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

    // Per-item thumbVariant wins; section config is the fallback.
    const variant = item.thumbVariant || config.thumbVariant;
    const thumb = buildThumbSlot(item.thumb, "drive-card__thumb", "▢", variant);

    card.appendChild(thumb);
    card.appendChild(el("div", { className: "drive-card__label", text: config.title(item) }));
    card.appendChild(el("div", { className: "drive-card__meta", text: config.meta(item) }));

    attachCardInteraction(card, item);
    return card;
  }

  window.__render.buildThumbSlot = buildThumbSlot;
  window.__render.attachCardInteraction = attachCardInteraction;
  window.__render.buildDashboardCard = buildDashboardCard;
  window.__render.buildDriveCard = buildDriveCard;
})();