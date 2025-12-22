// js/interactions.js - Interactive features

import { skillsData } from './data.js';

export function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  // Move the cursor
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  // CSS selectors for all interactive elements
  const interactiveSelectors = [
    'a',
    'button',
    '.skill-icon',
    '.hover-card',
    '.project-card',
    '.education-card',
    '.skill-category',
    '.watch-demo',
    'input', 'textarea', 'select'
  ];

  // Function to attach hover listeners to elements
  function attachHoverEffect(el) {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  }

  // Attach to existing elements
  interactiveSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(attachHoverEffect);
  });

  // Observe dynamically added elements (optional)
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        interactiveSelectors.forEach(selector => {
          if (node.matches && node.matches(selector)) attachHoverEffect(node);
          node.querySelectorAll && node.querySelectorAll(selector).forEach(attachHoverEffect);
        });
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

export function initSkillSphere() {
  const sphere = document.getElementById('sphere');
  const container = document.querySelector('.sphere-container');
  const tooltip = document.getElementById('skill-tooltip');
  const title = document.getElementById('tooltip-title');
  const desc  = document.getElementById('tooltip-desc');

  if (!sphere || !container || !tooltip) return;

  let currentIcon = null;

  container.addEventListener('mousemove', (e) => {
    const icon = e.target.closest('.skill-icon');

    // If NOT hovering an icon → reset
    if (!icon) {
      tooltip.classList.remove('show');
      sphere.classList.remove('paused');
      resetIcon();
      return;
    }

    const skill = icon.dataset.skill;
    const data = skillsData.tooltips[skill];
    if (!data) return;

    sphere.classList.add('paused');

    // ✅ Separate title and description for proper styling
    title.textContent = data.title;
    desc.textContent  = data.desc;

    // Tooltip positioning
    const iconRect = icon.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    tooltip.style.left =
    `${iconRect.left - containerRect.left + iconRect.width / 2}px`;
    tooltip.style.top =
    `${iconRect.top - containerRect.top}px`;

    tooltip.classList.add('show');

    // Highlight hovered icon
    if (currentIcon !== icon) {
      resetIcon();
      icon.style.transform =
        'translate(-50%, -50%) scale(1.8) translateZ(120px)';
      icon.style.boxShadow =
        '0 0 60px rgba(167,139,250,.9)';
      icon.style.zIndex = '100';
      currentIcon = icon;
    }
  });

  container.addEventListener('mouseleave', () => {
    tooltip.classList.remove('show');
    sphere.classList.remove('paused');
    resetIcon();
  });

  function resetIcon() {
    if (!currentIcon) return;
    currentIcon.style.transform = '';
    currentIcon.style.boxShadow = '';
    currentIcon.style.zIndex = '';
    currentIcon = null;
  }
}

export function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const close = document.getElementById('close-video');
  const video = document.getElementById('demo-video');

  if (!modal || !close || !video) return;

  document.querySelectorAll('.watch-demo').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      modal.classList.remove('opacity-0', 'pointer-events-none');
      video.currentTime = 0;
      video.play();
    });
  });

  close.addEventListener('click', () => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    video.pause();
  });
}
