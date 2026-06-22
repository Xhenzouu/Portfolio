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

import { aboutData } from './data.js';

window.aboutData = aboutData;

document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initLucide();

  renderHeader();
  renderSkills();
  renderProjects();
  renderAbout();
  renderEducation();
  renderFooter();

  lucide.createIcons();

  initCustomCursor();
  initSkillSphere();
  initVideoModal();
  initHeroAnimation();

  if (typeof initScrollRoadmap === "function") {
    initScrollRoadmap();
  }
});