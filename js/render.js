// js/render.js - Rendering functions

import { 
  headerData, 
  skillsData, 
  projectsData, 
  aboutData, 
  educationData, 
  footerData 
} from './data.js';

export function renderHeader() {
  document.getElementById('header-left').innerHTML = `
    <div class="text-right md:text-right flex flex-col justify-center stagger">
      <div class="inline-block">
        <h1 class="font-display font-black tracking-tighter leading-[0.85] gradient-text"
            style="font-size: clamp(4rem, 10vw, 9rem);">
          HENSON BRIX
        </h1>
        <p class="font-display font-black tracking-tighter leading-[0.85] gradient-text -mt-2 md:-mt-4"
           style="font-size: clamp(4rem, 10vw, 9rem);">
          ARROYO
        </p>
      </div>
      <p class="text-2xl md:text-3xl lg:text-4xl text-purple-300 font-light mt-8 tracking-wide stagger">
        ${headerData.title}
      </p>
    </div>
  `;

  document.getElementById('header-right').innerHTML = `
    <div class="space-y-6 md:space-y-8 stagger">
      <p class="text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90">
        ${headerData.description}
      </p>
      <div class="flex flex-wrap justify-center md:justify-start items-center gap-x-10 gap-y-4 text-lg stagger">
        <a href="mailto:${headerData.email}" class="flex items-center gap-3 hover:text-purple-400 transition">
          <i data-lucide="mail" class="w-6 h-6"></i> ${headerData.email}
        </a>
        <a href="tel:${headerData.phone.replace(/[^+\d]/g, '')}" class="flex items-center gap-3 hover:text-purple-400 transition">
          <i data-lucide="phone" class="w-6 h-6"></i> ${headerData.phone}
        </a>
      </div>
      <div class="flex gap-10 text-4xl stagger items-center">
        ${headerData.social.map(s => `
          <a href="${s.url}" target="_blank" rel="noopener noreferrer"
             class="hover:text-purple-400 transition">
            <i data-lucide="${s.icon}"></i>
          </a>
        `).join('')}
      </div>
    </div>
  `;

  lucide.createIcons();
}

export function renderSkills() {
  document.getElementById('skills-left').innerHTML = `
    <div data-aos="fade-right" class="space-y-12">
      <div class="text-center lg:text-left">
        <h3 class="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Full-Stack Developer
        </h3>
        <p class="text-xl leading-relaxed opacity-90 max-w-2xl">${skillsData.description}</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 opacity-70">
        ${skillsData.categories.map(cat => `
          <div class="skill-category !text-left">
            <h4 class="text-xl font-bold flex items-center gap-3 text-purple-300">
              <i data-lucide="${cat.icon}" class="w-6 h-6"></i> ${cat.title}
            </h4>
            <p class="mt-2 text-sm">${cat.skills}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('skills-right').innerHTML = `
    <div data-aos="fade-left" class="flex justify-center items-center h-96 lg:h-full relative">
      <div class="sphere-container">
        <div class="sphere" id="sphere">
          ${skillsData.sphereIcons.map((item, index) => `
            <i data-lucide="${item.icon}"
               class="skill-icon"
               data-skill="${item.skill}"
               style="--i:${index}">
            </i>
          `).join('')}
        </div>
      </div>

      <!-- Tooltip (NOW SAFE) -->
      <div id="skill-tooltip" class="skill-tooltip">
        <div id="tooltip-title" class="font-bold text-purple-300"></div>
        <div id="tooltip-desc" class="text-sm opacity-90"></div>
      </div>
    </div>
  `;

  lucide.createIcons();
}

export function renderProjects() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projectsData.map((proj, index) => `
    <div class="hover-card project-card relative" data-aos="fade-up" data-aos-delay="${index * 100}">
      <img src="${proj.image}" alt="${proj.title}">
      
      <!-- Project content -->
      <div class="project-content">
        <h3 class="text-3xl font-bold text-white">${proj.title}</h3>
        <p class="text-purple-300 text-sm">${proj.period}</p>
        <div class="flex flex-wrap gap-2 mt-3">
          ${proj.tech.map(tag => `<span class="tech-tag text-xs px-3 py-1">${tag}</span>`).join('')}
        </div>
      </div>
      
      <!-- Project details overlay -->
      <div class="project-details">
        <p class="text-purple-300 font-semibold mb-4">${proj.role}</p>
        <ul class="list-disc pl-6 space-y-3 text-gray-300 text-sm">
          ${proj.points.map(p => `<li>${p}</li>`).join('')}
        </ul>
        ${proj.liveUrl ? `<a href="${proj.liveUrl}" target="_blank" class="watch-demo">Live Demo</a>` : ''}
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

export function renderAbout() {
  document.getElementById('about-left').innerHTML = `
    <div data-aos="fade-right">
      <h2 class="section-title text-5xl mb-12">About Me</h2>
      <p class="text-lg leading-relaxed opacity-90 mb-6">${aboutData.bio}</p>
      <p class="text-lg leading-relaxed opacity-90 mb-10">${aboutData.hobbies}</p>
    </div>
  `;

  document.getElementById('about-right').innerHTML = `
    <div data-aos="fade-left">
      <h2 class="section-title text-5xl mb-12">Beyond Code</h2>
      <ul class="space-y-6 text-lg mb-12">
        ${aboutData.interests.map(i => `
          <li class="flex items-center gap-4">
            <i data-lucide="${i.icon}" class="w-6 h-6 text-purple-400"></i>
            ${i.text}
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  lucide.createIcons();
}

export function renderEducation() {
  document.getElementById('education-grid').innerHTML = educationData.map(edu => `
    <div class="education-card flex items-start gap-5 p-6">
      <img src="${edu.logo}" class="w-20 h-20 object-contain">
      <div>
        <h3 class="text-2xl font-bold">${edu.degree}</h3>
        <p class="text-purple-300">${edu.specialization}</p>
        <p>${edu.school}</p>
        <p class="opacity-70">${edu.year}</p>
      </div>
    </div>
  `).join('');
}

export function renderFooter() {
  document.getElementById('footer').innerHTML = `
    <p class="text-lg mb-8">${footerData.message}</p>
    <a href="mailto:${footerData.email}" class="bg-purple-600 px-10 py-4 rounded-full">
      Get in touch
    </a>
    <p class="mt-12 text-sm opacity-50">${footerData.copyright}</p>
  `;
}
