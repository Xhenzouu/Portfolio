window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-animate');
  hero.classList.add('show');
});

AOS.init({ duration: 1000, easing: 'ease-out-cubic', once: true });
lucide.createIcons();

// Custom Cursor
const cursor = document.querySelector('.cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .project-card, .hover-card, .tech-tag, .skill-category, .education-card, .skill-icon').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// === FINAL BEHAVIOR: Cards = rotating + strong glow | Icons = pause + tooltip ===
const skillDescriptions = {
  react:     { title: "React.js",                 desc: "Building fast, reusable, component-driven UIs with React, hooks, and modern patterns." },
  flutter:   { title: "Flutter",                  desc: "Crafting stunning, high-performance cross-platform mobile apps for iOS & Android." },
  backend:   { title: "Node.js & Express",        desc: "Designing scalable RESTful APIs, real-time systems, and secure backends." },
  postgres:  { title: "PostgreSQL",               desc: "Mastery of complex database design, query optimization, migrations, and reliability." },
  design:    { title: "Figma & UI/UX",            desc: "Turning ideas into pixel-perfect, interactive prototypes and user-centered designs." },
  ai:        { title: "AI & Automation",          desc: "Integrating NLP, smart workflows, SMS gateways, and smart automation." },
  devops:    { title: "DevOps & Git",             desc: "Deploying with Railway, managing Git workflows, tests, and CI/CD pipelines." },
  iot:       { title: "IoT & Embedded",           desc: "Building real-world assistive devices using ESP8266, Arduino, and cloud systems." },
  git:       { title: "Git & Collaboration",      desc: "Advanced Git workflows, branching, code reviews, and team collaboration." },
  emerging:  { title: "Always Growing",           desc: "Expanding into C#, Linux, Cybersecurity, Design Thinking, and new tech." }
};

const tooltip         = document.getElementById('skill-tooltip');
const tooltipTitle    = document.getElementById('tooltip-title');
const tooltipDesc     = document.getElementById('tooltip-desc');
const sphere          = document.getElementById('sphere');
const sphereContainer = document.querySelector('.sphere-container');

let currentIcon = null;
let isHoveringIcon = false; // Track if we're directly over an icon

const cardToSkill = {
  'Frontend':   'react',
  'Backend':    'backend',
  'Databases':  'postgres',
  'Mobile':     'flutter'
};

// === Hover sphere icons → pause + tooltip + normal glow ===
sphereContainer.addEventListener('mousemove', (e) => {
  const icon = e.target.closest('.skill-icon');
  if (!icon?.hasAttribute('data-skill')) return;

  isHoveringIcon = true;
  const skill = icon.getAttribute('data-skill');
  const data = skillDescriptions[skill];

  // Show tooltip
  tooltipTitle.textContent = data.title;
  tooltipDesc.textContent  = data.desc;
  const rect = icon.getBoundingClientRect();
  const containerRect = sphereContainer.getBoundingClientRect();
  tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
  tooltip.style.top  = `${rect.top - containerRect.top + rect.height / 2}px`;
  tooltip.classList.add('show');

  highlightIcon(icon, false); // normal glow + pause
});

sphereContainer.addEventListener('mouseleave', () => {
  isHoveringIcon = false;
  tooltip.classList.remove('show');
  if (!document.querySelector('.skill-category:hover')) {
    resetAll();
  }
});

// === Hover cards → rotating + STRONG glow (no tooltip) ===
document.querySelectorAll('.skill-category').forEach(card => {
  const titleText = card.querySelector('h4')?.textContent.trim();
  const skillKey = Object.keys(cardToSkill).find(key => titleText.includes(key));
  if (!skillKey) return;

  const targetSkill = cardToSkill[skillKey];
  const targetIcon = document.querySelector(`.skill-icon[data-skill="${targetSkill}"]`);
  if (!targetIcon) return;

  card.addEventListener('mouseenter', () => {
    if (isHoveringIcon) return; // Don't override direct icon hover
    highlightIcon(targetIcon, true); // strong glow + keep rotating
  });

  card.addEventListener('mouseleave', () => {
    if (isHoveringIcon) return;
    if (!sphereContainer.matches(':hover') && !document.querySelector('.skill-category:hover')) {
      resetAll();
    }
  });
});

// === Shared highlight function ===
function highlightIcon(icon, strongGlow = false) {
  // Only pause if hovering the actual icon
  if (!strongGlow && !isHoveringIcon) {
    sphere.classList.add('paused');
  }

  if (currentIcon && currentIcon !== icon) {
    currentIcon.style.transform = '';
    currentIcon.style.zIndex = '';
    currentIcon.style.boxShadow = '';
  }

  if (strongGlow) {
    // From card: BIG glow, keep rotating
    icon.style.transform = 'translate(-50%, -50%) scale(2.2) translateZ(160px) !important';
    icon.style.zIndex = '200';
    icon.style.boxShadow = '0 0 90px rgba(167, 139, 250, 1), 0 0 140px rgba(199, 157, 255, 0.9)';
  } else {
    // From sphere: normal glow, pause rotation
    icon.style.transform = 'translate(-50%, -50%) scale(1.8) translateZ(120px) !important';
    icon.style.zIndex = '100';
    icon.style.boxShadow = '0 0 60px rgba(167,139,250,0.9)';
    sphere.classList.add('paused');
  }

  currentIcon = icon;
}

function resetAll() {
  tooltip.classList.remove('show');
  sphere.classList.remove('paused');
  if (currentIcon) {
    currentIcon.style.transform = '';
    currentIcon.style.zIndex = '';
    currentIcon.style.boxShadow = '';
    currentIcon = null;
  }
}