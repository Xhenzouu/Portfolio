import { 
  renderHeader, 
  renderSkills, 
  renderProjects, 
  renderAbout, 
  renderEducation, 
  renderFooter 
} from './render.js';

import { 
  initCustomCursor, 
  initSkillSphere, 
  initVideoModal 
} from './interactions.js';

import { 
  initAOS, 
  initLucide, 
  initHeroAnimation 
} from './init.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize libraries
  initAOS();
  initLucide();

  // Render all content FIRST
  renderHeader();
  renderSkills();
  renderProjects();
  renderAbout();
  renderEducation();
  renderFooter();

  // ✅ FIX: run Lucide ONCE after all DOM is rendered
  lucide.createIcons();

  // Initialize interactions
  initCustomCursor();
  initSkillSphere();
  initVideoModal();
  initHeroAnimation();

  // Scroll roadmap (if exists in your project)
  if (typeof initScrollRoadmap === "function") {
    initScrollRoadmap();
  }
});