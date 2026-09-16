/* ==========================================================================
   js/interactions/_modal.js
   Part of the interactions pipeline. Loaded SEVENTH.

   Modal open/close + focus trap, plus the click-to-zoom lightbox for
   slideshow images. The lightbox supports Ctrl/Cmd + scroll to zoom,
   drag-to-pan when zoomed, and double-click / double-tap to toggle
   between 1x and 2x.

   Reuses trapFocus / focusFirstFocusable from _drawer.js (cross-partial
   read via window.__interactions, called inside function bodies only).
   Reads getActiveSectionId from _nav.js.

   CLICK ROUTING:
     Lightbox open and close clicks are routed via the document-level
     delegated listener in _bootstrap.js (handleDocumentClick), which
     calls handleSlideshowImageClick and handleLightboxCloseClick
     BEFORE checking #card-modal.

   ESCAPE PRIORITY:
     When the lightbox is open, Escape closes only the lightbox.
     handleModalKeydown checks lightbox.hidden first and returns early.

   SCROLL LOCK:
     openLightbox sets document.body.style.overflow = "hidden", saving
     the previous inline value so it can be restored on close.

   ZOOM + PAN:
     - lightboxScale in [1, 5], lightboxOffsetX/Y in px.
     - Ctrl/Cmd + wheel zooms toward the cursor.
     - When scale > 1, mousedown on the image starts a drag; mousemove
       updates offset; mouseup ends it. The .is-dragging class disables
       the CSS transition during pan (see _modal.css).
     - Double-click toggles 1x / 2x.
     - resetLightboxZoom() runs on open (clean state) and on close.
     - All wheel/mouse/dblclick listeners are removed on close.

   MOBILE DOUBLE-TAP CAVEAT:
     Double-tap-to-zoom relies on the browser synthesizing a "dblclick"
     event from two quick taps. Most mobile browsers do this when
     touch-action: manipulation is set on the image (see _modal.css),
     but it is not universally reliable. If double-tap does not fire in
     practice on a target device, add explicit touchstart-based
     double-tap detection as a follow-up. Pinch-to-zoom is not
     implemented in this pass and would require its own touch handlers.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.__interactions) window.__interactions = {};

  const SELECTORS = {
    card: "[data-item-id]",
    modal: "#card-modal",
    modalClose: "[data-modal-close]",
    slideshowImage: ".modal__slideshow-image",
    lightbox: "#image-lightbox",
    lightboxImage: ".lightbox__image",
    lightboxClose: ".lightbox__close",
    lightboxCloseTarget: "[data-lightbox-close]"
  };

  const ZOOM_MIN = 1;
  const ZOOM_MAX = 5;
  const ZOOM_STEP = 1.15;
  const DBLCLICK_ZOOM = 2;

  let lastFocusedBeforeModal = null;
  let lastFocusedBeforeLightbox = null;
  let savedBodyOverflow = null;

  // Zoom / pan state. Reset on open and close.
  let lightboxScale = 1;
  let lightboxOffsetX = 0;
  let lightboxOffsetY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  function qs(selector, root) { return window.__interactions.qs(selector, root); }
  function qsa(selector, root) { return window.__interactions.qsa(selector, root); }

  function trapFocus(e, container) {
    return window.__interactions.trapFocus(e, container);
  }

  function focusFirstFocusable(container) {
    return window.__interactions.focusFirstFocusable(container);
  }

  function findItemById(id) {
    if (!id || !window.portfolioData) return null;
    const d = window.portfolioData;
    const arrays = [d.projects, d.experience, d.certifications, d.trainings, d.designs];
    for (let i = 0; i < arrays.length; i++) {
      const arr = arrays[i] || [];
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] && arr[j].id === id) return arr[j];
      }
    }
    return null;
  }

  // ---------------------------------------------------------------------
  // Lightbox — zoom / pan helpers
  // ---------------------------------------------------------------------

  function applyLightboxTransform() {
    const lbImg = qs(SELECTORS.lightboxImage);
    if (!lbImg) return;
    lbImg.style.transform =
      "translate(" + lightboxOffsetX + "px, " + lightboxOffsetY + "px) scale(" + lightboxScale + ")";
    lbImg.style.cursor = lightboxScale > 1 ? "grab" : "zoom-in";
  }

  function resetLightboxZoom() {
    lightboxScale = 1;
    lightboxOffsetX = 0;
    lightboxOffsetY = 0;
    isDragging = false;
    applyLightboxTransform();
  }

  function handleLightboxWheel(e) {
    const lightbox = qs(SELECTORS.lightbox);
    if (!lightbox || lightbox.hidden) return;
    if (!e.ctrlKey && !e.metaKey) return;

    e.preventDefault();

    const lbImg = qs(SELECTORS.lightboxImage);
    if (!lbImg) return;

    const rect = lbImg.getBoundingClientRect();
    const cursorX = e.clientX - (rect.left + rect.width / 2);
    const cursorY = e.clientY - (rect.top + rect.height / 2);

    const zoomDirection = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
    const newScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, lightboxScale * zoomDirection));
    const actualZoom = newScale / lightboxScale;

    lightboxOffsetX -= cursorX * (actualZoom - 1);
    lightboxOffsetY -= cursorY * (actualZoom - 1);
    lightboxScale = newScale;

    if (lightboxScale === 1) {
      lightboxOffsetX = 0;
      lightboxOffsetY = 0;
    }

    applyLightboxTransform();
  }

  function handleLightboxMouseDown(e) {
    const lightbox = qs(SELECTORS.lightbox);
    if (!lightbox || lightbox.hidden) return;
    if (lightboxScale <= 1) return;

    const lbImg = qs(SELECTORS.lightboxImage);
    if (!lbImg || !e.target.closest(SELECTORS.lightboxImage)) return;

    isDragging = true;
    dragStartX = e.clientX - lightboxOffsetX;
    dragStartY = e.clientY - lightboxOffsetY;
    lbImg.classList.add("is-dragging");
    lbImg.style.cursor = "grabbing";
    e.preventDefault();
  }

  function handleLightboxMouseMove(e) {
    if (!isDragging) return;
    lightboxOffsetX = e.clientX - dragStartX;
    lightboxOffsetY = e.clientY - dragStartY;
    applyLightboxTransform();
  }

  function handleLightboxMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    const lbImg = qs(SELECTORS.lightboxImage);
    if (lbImg) {
      lbImg.classList.remove("is-dragging");
      lbImg.style.cursor = lightboxScale > 1 ? "grab" : "zoom-in";
    }
  }

  function handleLightboxDoubleClick(e) {
    const lbImg = qs(SELECTORS.lightboxImage);
    if (!lbImg || !e.target.closest(SELECTORS.lightboxImage)) return;
    e.preventDefault();

    if (lightboxScale > 1) {
      resetLightboxZoom();
    } else {
      lightboxScale = DBLCLICK_ZOOM;
      lightboxOffsetX = 0;
      lightboxOffsetY = 0;
      applyLightboxTransform();
    }
  }

  // ---------------------------------------------------------------------
  // Lightbox — open / close
  // ---------------------------------------------------------------------

  function handleLightboxKeydown(e) {
    const lightbox = qs(SELECTORS.lightbox);
    if (!lightbox || lightbox.hidden) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeLightbox();
      return;
    }
    if (e.key === "Tab") {
      const panel = qs(".lightbox__panel", lightbox);
      if (panel) trapFocus(e, panel);
    }
  }

  function attachLightboxZoomListeners() {
    const lightbox = qs(SELECTORS.lightbox);
    const lbImg = qs(SELECTORS.lightboxImage);
    if (lightbox) {
      lightbox.addEventListener("wheel", handleLightboxWheel, { passive: false });
      lightbox.addEventListener("mousedown", handleLightboxMouseDown);
    }
    if (lbImg) {
      lbImg.addEventListener("dblclick", handleLightboxDoubleClick);
    }
    document.addEventListener("mousemove", handleLightboxMouseMove);
    document.addEventListener("mouseup", handleLightboxMouseUp);
  }

  function detachLightboxZoomListeners() {
    const lightbox = qs(SELECTORS.lightbox);
    const lbImg = qs(SELECTORS.lightboxImage);
    if (lightbox) {
      lightbox.removeEventListener("wheel", handleLightboxWheel);
      lightbox.removeEventListener("mousedown", handleLightboxMouseDown);
    }
    if (lbImg) {
      lbImg.removeEventListener("dblclick", handleLightboxDoubleClick);
      lbImg.classList.remove("is-dragging");
    }
    document.removeEventListener("mousemove", handleLightboxMouseMove);
    document.removeEventListener("mouseup", handleLightboxMouseUp);
  }

  function openLightbox(src, alt) {
    const lightbox = qs(SELECTORS.lightbox);
    const img = qs(SELECTORS.lightboxImage, lightbox);
    if (!lightbox || !img) return;

    lastFocusedBeforeLightbox = document.activeElement;

    img.src = src || "";
    img.alt = alt || "";

    // Clean zoom/pan state on open. Without this, a second open could
    // inherit transforms from the previous image.
    resetLightboxZoom();

    savedBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    lightbox.hidden = false;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");

    document.addEventListener("keydown", handleLightboxKeydown, true);
    attachLightboxZoomListeners();

    const closeBtn = qs(SELECTORS.lightboxClose, lightbox);
    if (closeBtn) closeBtn.focus();
    else focusFirstFocusable(lightbox);
  }

  function closeLightbox() {
    const lightbox = qs(SELECTORS.lightbox);
    if (!lightbox || lightbox.hidden) return;

    detachLightboxZoomListeners();
    resetLightboxZoom();

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.hidden = true;

    document.removeEventListener("keydown", handleLightboxKeydown, true);

    if (savedBodyOverflow !== null) {
      document.body.style.overflow = savedBodyOverflow;
      savedBodyOverflow = null;
    } else {
      document.body.style.overflow = "";
    }

    if (lastFocusedBeforeLightbox && typeof lastFocusedBeforeLightbox.focus === "function") {
      lastFocusedBeforeLightbox.focus();
    }
    lastFocusedBeforeLightbox = null;
  }

  function handleSlideshowImageClick(e) {
    const img = e.target.closest(SELECTORS.slideshowImage);
    if (!img) return;
    if (e.target.closest(".modal__slideshow-btn")) return;
    openLightbox(img.src, img.alt || "");
  }

  function handleLightboxCloseClick(e) {
    if (e.target.closest(SELECTORS.lightboxCloseTarget)) {
      e.preventDefault();
      closeLightbox();
    }
  }

  // ---------------------------------------------------------------------
  // Modal open/close
  // ---------------------------------------------------------------------

  function handleModalKeydown(e) {
    const modal = qs(SELECTORS.modal);
    if (!modal || modal.hidden) return;

    const lightbox = qs(SELECTORS.lightbox);
    if (lightbox && !lightbox.hidden) return;

    if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
    if (e.key === "Tab") {
      const panel = qs(".modal__panel", modal);
      if (panel) trapFocus(e, panel);
    }
  }

  function openModalForCard(cardEl) {
    const modal = qs(SELECTORS.modal);
    if (!modal || !cardEl) return;

    const itemId = cardEl.getAttribute("data-item-id");
    const item = findItemById(itemId);
    if (!item) {
      console.warn('[interactions] No item found for id "' + itemId + '".');
      return;
    }

    const sectionId = window.__interactions.getActiveSectionId();

    if (window.render && typeof window.render.renderModalContent === "function") {
      window.render.renderModalContent(item, sectionId);
    }

    lastFocusedBeforeModal = cardEl;

    modal.hidden = false;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    document.addEventListener("keydown", handleModalKeydown, true);
    const closeBtn = qs(SELECTORS.modalClose, modal);
    if (closeBtn) closeBtn.focus();
    else focusFirstFocusable(modal);
  }

  function closeModal() {
    const modal = qs(SELECTORS.modal);
    if (!modal || modal.hidden) return;

    closeLightbox();

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modal.hidden = true;
    document.removeEventListener("keydown", handleModalKeydown, true);
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") {
      lastFocusedBeforeModal.focus();
    }
    lastFocusedBeforeModal = null;
  }

  // ---------------------------------------------------------------------
  // Card activation
  // ---------------------------------------------------------------------

  function handleCardActivate(e) {
    const card = e.target.closest(SELECTORS.card);
    if (!card) return;
    if (e.target.closest(SELECTORS.modal)) return;
    if (e.target.closest("a")) return;
    openModalForCard(card);
  }

  function handleCardKeydown(e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(SELECTORS.card);
    if (!card) return;
    if (e.target.closest(SELECTORS.modal)) return;
    if (e.target.closest("a")) return;
    e.preventDefault();
    openModalForCard(card);
  }

  function handleModalCloseClick(e) {
    if (e.target.closest(SELECTORS.modalClose)) closeModal();
  }

  window.__interactions.handleModalKeydown = handleModalKeydown;
  window.__interactions.openModalForCard = openModalForCard;
  window.__interactions.closeModal = closeModal;
  window.__interactions.handleCardActivate = handleCardActivate;
  window.__interactions.handleCardKeydown = handleCardKeydown;
  window.__interactions.handleModalCloseClick = handleModalCloseClick;
  window.__interactions.handleSlideshowImageClick = handleSlideshowImageClick;
  window.__interactions.handleLightboxCloseClick = handleLightboxCloseClick;
  window.__interactions.openLightbox = openLightbox;
  window.__interactions.closeLightbox = closeLightbox;
})();