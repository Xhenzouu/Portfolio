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

  // Render all content
  renderHeader();
  renderSkills();
  renderProjects();
  renderAbout();
  renderEducation();
  renderFooter();

  // Initialize interactions
  initCustomCursor();
  initSkillSphere();
  initVideoModal();
  initHeroAnimation();

  // Scroll roadmap
  initScrollRoadmap();
});