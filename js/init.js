// js/init.js - Initial setup

export function initAOS() {
  AOS.init({ duration: 1000, easing: 'ease-out-cubic', once: true });
}

export function initLucide() {
  lucide.createIcons();
}

export function initHeroAnimation() {
  const hero = document.querySelector('.hero-animate');
  if (hero) hero.classList.add('show');
}