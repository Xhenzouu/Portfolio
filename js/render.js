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
    <div class="space-y-3 md:space-y-4 stagger">
      <p class="text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90">
        ${headerData.description}
      </p>

      <div class="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-base stagger">
        <a href="mailto:${headerData.email}" class="flex items-center gap-2 hover:text-purple-400 transition">
          <i data-lucide="mail" class="w-5 h-5"></i> ${headerData.email}
        </a>

        <a href="tel:${headerData.phone.replace(/[^+\d]/g, '')}" class="flex items-center gap-2 hover:text-purple-400 transition">
          <i data-lucide="phone" class="w-5 h-5"></i> ${headerData.phone}
        </a>
      </div>

      <div class="flex gap-6 text-3xl stagger items-center">
        ${headerData.social.map(s => `
          <a href="${s.url}" target="_blank" rel="noopener noreferrer"
            class="hover:text-purple-400 transition">
            <i class="fa-brands fa-${s.icon}"></i>
          </a>
        `).join('')}
      </div>
    </div>
  `;
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

      <div id="skill-tooltip" class="skill-tooltip">
        <div id="tooltip-title" class="font-bold text-purple-300"></div>
        <div id="tooltip-desc" class="text-sm opacity-90"></div>
      </div>
    </div>
  `;
}

export function renderProjects() {
  document.getElementById('projects-grid').innerHTML = projectsData.map((proj, index) => `
    <div class="hover-card project-card relative" data-aos="fade-up" data-aos-delay="${index * 100}">
      <img src="${proj.image}" alt="${proj.title}">

      <div class="project-content">
        <h3 class="text-3xl font-bold text-white">${proj.title}</h3>
        <p class="text-purple-300 text-sm">${proj.period}</p>
        <div class="flex flex-wrap gap-2 mt-3">
          ${proj.tech.map(tag => `<span class="tech-tag text-xs px-3 py-1">${tag}</span>`).join('')}
        </div>
      </div>

      <div class="project-details">
        <p class="text-purple-300 font-semibold mb-4">${proj.role}</p>
        <ul class="list-disc pl-6 space-y-3 text-gray-300 text-sm">
          ${proj.points.map(p => `<li>${p}</li>`).join('')}
        </ul>

        ${proj.liveUrl ? `
          <a href="${proj.liveUrl}" target="_blank" class="watch-demo">
            Live Demo
          </a>` : ''}
      </div>
    </div>
  `).join('');
}

export function renderAbout() {
  const certs = aboutData.certifications || [];

  const container = document.getElementById('about-left');
  const right = document.getElementById('about-right');

  container.innerHTML = "";
  right.innerHTML = "";

  const left = certs.slice(0, 4);
  const rightList = certs.slice(4);

  function createCard(cert, index) {
    return `
      <div class="cert-card group relative p-4 border border-purple-900/30 rounded-xl hover:border-purple-500 transition cursor-pointer"
           data-index="${index}">

        <div class="font-semibold text-purple-300">${cert.title}</div>
        <div class="text-sm opacity-70">${cert.issuer}</div>

        <!-- tooltip -->
        <div class="cert-tooltip hidden absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 bg-[#111118] border border-purple-500 rounded-lg p-3 z-50 shadow-xl">
          <img src="${cert.image}" class="w-full rounded mb-2" />
          <div class="text-sm font-semibold text-purple-300">${cert.title}</div>
          <div class="text-xs opacity-70 mb-1">${cert.issuer}</div>
          <div class="text-xs opacity-60">${cert.level || ""}</div>
        </div>
      </div>
    `;
  }

  container.innerHTML = left.map((c, i) => createCard(c, i)).join("");
  right.innerHTML = rightList.map((c, i) => createCard(c, i + 4)).join("");

  // hover tooltip logic
  document.querySelectorAll(".cert-card").forEach(card => {
    const tooltip = card.querySelector(".cert-tooltip");

    card.addEventListener("mouseenter", () => {
      tooltip.classList.remove("hidden");
    });

    card.addEventListener("mouseleave", () => {
      tooltip.classList.add("hidden");
    });

    card.addEventListener("click", () => {
      const index = Number(card.dataset.index);
      openCertModal(index);
    });
  });
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