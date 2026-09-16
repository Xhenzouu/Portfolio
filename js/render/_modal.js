/* ==========================================================================
   js/render/_modal.js
   Part of the render pipeline. Loaded FIFTH.

   Modal content renderer. Includes the Core Features block (native
   <details>/<summary>) and an image slideshow for items that carry an
   `images` array.

   TOP VISUAL LOGIC:
     - Non-empty `images` array → slideshow.
     - Else if `thumb`          → hero image.
     - Else                     → nothing.

   SLIDESHOW SIZING:
     Intrinsic sizing. The viewport wraps the image; the image is capped
     at max-height in CSS. No aspectRatio parameter is used — the image's
     intrinsic aspect ratio drives the box shape. This handles portrait
     and landscape screenshots with a single code path.

   LINKS ROW:
     Single variant (no primary/secondary distinction). All links render
     through buildModalLink(href, text) with .modal__link class,
     external-link icon, and label text.

   Cross-partial reads:
     - window.__render.el / clearChildren / buildIcon (from _shell)
     - window.__render.buildThumbSlot (from _cards)

   All reads happen inside function bodies, never at IIFE init time.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__render) window.__render = {};

  function el(tag, opts) { return window.__render.el(tag, opts); }
  function clearChildren(node) { return window.__render.clearChildren(node); }
  function buildIcon(name, opts) { return window.__render.buildIcon(name, opts); }
  function buildThumbSlot(thumbSrc, className, glyph, variant) {
    return window.__render.buildThumbSlot(thumbSrc, className, glyph, variant);
  }

  // ---------------------------------------------------------------------
  // Modal link builder — one shape for every external link button.
  // ---------------------------------------------------------------------

  function buildModalLink(href, text) {
    const link = el("a", {
      className: "modal__link",
      attrs: { href: href, target: "_blank", rel: "noopener noreferrer" }
    });

    const icon = buildIcon("external-link", { size: 14 });
    if (icon) link.appendChild(icon);

    link.appendChild(document.createTextNode(text));
    return link;
  }

  // ---------------------------------------------------------------------
  // Core Features block (<details>/<summary>)
  // ---------------------------------------------------------------------

  function buildFeaturesBlock(features) {
    const details = el("details", { className: "modal__features" });

    const summary = el("summary", { className: "modal__section-title" });
    summary.appendChild(document.createTextNode("Core Features"));

    const iconSlot = el("span", {
      className: "modal__features-icon",
      attrs: { "aria-hidden": "true" }
    });
    const chevron = buildIcon("chevron-down", { size: 16 });
    if (chevron) iconSlot.appendChild(chevron);
    summary.appendChild(iconSlot);

    details.appendChild(summary);

    const ul = el("ul", { className: "modal__highlights-list" });
    features.forEach((f) =>
      ul.appendChild(el("li", { className: "modal__highlight", text: f }))
    );
    details.appendChild(ul);

    return details;
  }

  // ---------------------------------------------------------------------
  // Slideshow (used by items with an `images` array)
  //
  // Two-argument signature. Sizing is handled entirely by CSS via
  // intrinsic image dimensions + max-height on the image.
  // ---------------------------------------------------------------------

  function buildSlideshow(images, itemName) {
    const wrap = el("div", { className: "modal__slideshow" });

    const viewport = el("div", { className: "modal__slideshow-viewport" });

    const img = document.createElement("img");
    img.className = "modal__slideshow-image";
    img.src = images[0];
    img.alt = itemName + " — screen 1 of " + images.length;
    img.loading = "lazy";
    img.decoding = "async";
    img.setAttribute("data-lightbox-src", images[0]);
    img.setAttribute("data-lightbox-alt", itemName + " — screen 1 of " + images.length);
    viewport.appendChild(img);
    wrap.appendChild(viewport);

    const prevBtn = el("button", {
      className: "modal__slideshow-btn modal__slideshow-btn--prev",
      attrs: { type: "button", "aria-label": "Previous image" }
    });
    const prevIcon = buildIcon("chevron-left", { size: 18 });
    if (prevIcon) prevBtn.appendChild(prevIcon);
    wrap.appendChild(prevBtn);

    const nextBtn = el("button", {
      className: "modal__slideshow-btn modal__slideshow-btn--next",
      attrs: { type: "button", "aria-label": "Next image" }
    });
    const nextIcon = buildIcon("chevron-right", { size: 18 });
    if (nextIcon) nextBtn.appendChild(nextIcon);
    wrap.appendChild(nextBtn);

    const dots = el("div", {
      className: "modal__slideshow-dots",
      attrs: { role: "tablist", "aria-label": "Screen navigation" }
    });
    images.forEach((_, i) => {
      const dot = el("button", {
        className: "modal__slideshow-dot" + (i === 0 ? " is-active" : ""),
        attrs: {
          type: "button",
          "data-index": String(i),
          role: "tab",
          "aria-selected": i === 0 ? "true" : "false",
          "aria-label": "Go to screen " + (i + 1)
        }
      });
      dots.appendChild(dot);
    });
    wrap.appendChild(dots);

    return wrap;
  }

  function setupSlideshow(slideshowEl, images, itemName) {
    if (!slideshowEl || !images || !images.length) return;

    let currentIndex = 0;

    const img = slideshowEl.querySelector(".modal__slideshow-image");
    const prevBtn = slideshowEl.querySelector(".modal__slideshow-btn--prev");
    const nextBtn = slideshowEl.querySelector(".modal__slideshow-btn--next");
    const dots = Array.prototype.slice.call(
      slideshowEl.querySelectorAll(".modal__slideshow-dot")
    );

    function render() {
      const src = images[currentIndex];
      const alt = itemName + " — screen " + (currentIndex + 1) + " of " + images.length;
      img.src = src;
      img.alt = alt;
      // Update lightbox metadata so a click on the current image opens
      // the correct screenshot.
      img.setAttribute("data-lightbox-src", src);
      img.setAttribute("data-lightbox-alt", alt);
      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", isActive ? "true" : "false");
      });
    }

    function goTo(index) {
      const n = images.length;
      currentIndex = ((index % n) + n) % n;
      render();
    }

    function prev() { goTo(currentIndex - 1); }
    function next() { goTo(currentIndex + 1); }

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.getAttribute("data-index"), 10);
        if (!isNaN(idx)) goTo(idx);
      });
    });

    const modal = document.getElementById("card-modal");
    const target = modal || slideshowEl;
    const keyHandler = function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      // If the lightbox is open, arrow keys belong to it, not the slideshow.
      const lightbox = document.getElementById("image-lightbox");
      if (lightbox && !lightbox.hidden) return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      if (e.key === "ArrowLeft") prev();
      else next();
    };
    target.addEventListener("keydown", keyHandler);

    render();
  }

  // ---------------------------------------------------------------------
  // Modal content
  // ---------------------------------------------------------------------

  function renderModalContent(item, sectionId) {
    const config = window.__render.config || {};
    const SECTION_ITEM_CONFIG = config.SECTION_ITEM_CONFIG || {};

    const container = document.getElementById("modal-content");
    if (!container || !item) return;
    clearChildren(container);

    const hasSlideshow = Array.isArray(item.images) && item.images.length > 0;

    if (hasSlideshow) {
      const slideshowEl = buildSlideshow(item.images, item.name || "");
      container.appendChild(slideshowEl);
      setupSlideshow(slideshowEl, item.images, item.name || "");
    } else if (item.thumb) {
      const sectionConfig = sectionId ? SECTION_ITEM_CONFIG[sectionId] : null;
      const variant = sectionConfig ? sectionConfig.thumbVariant : undefined;
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

    if (Array.isArray(item.features) && item.features.length) {
      container.appendChild(buildFeaturesBlock(item.features));
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
      links.appendChild(buildModalLink(item.repoUrl, "View Repo"));
    }
    if (item.liveUrl) {
      links.appendChild(buildModalLink(item.liveUrl, "View Live"));
    }
    if (item.figmaUrl) {
      links.appendChild(buildModalLink(item.figmaUrl, "View Figma Design"));
    }
    if (links.childNodes.length) container.appendChild(links);
  }

  window.__render.buildFeaturesBlock = buildFeaturesBlock;
  window.__render.buildSlideshow = buildSlideshow;
  window.__render.setupSlideshow = setupSlideshow;
  window.__render.renderModalContent = renderModalContent;
})();