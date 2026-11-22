import React, { useEffect, useMemo, useState } from 'react';
import meta from './data/meta.js';
import sections from './data/sections.js';
import about from './data/about.js';
import projects from './data/projects.js';
import experience from './data/experience.js';
import certifications from './data/certifications.js';
import trainings from './data/trainings.js';
import automation from './data/automation.js';
import dashboards from './data/dashboards.js';
import designs from './data/designs.js';
import { Sidebar, Toolbar, SectionRenderer, Modal, ImageLightbox } from './components/PortfolioComponents.jsx';
import './styles/styles.css';

const collections = { projects, experience, certifications, trainings, automation, dashboards, designs };

export default function App() {
  const [activeId, setActiveId] = useState('projects');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState('grid');
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('portfolio-theme') || 'light'; } catch { return 'light'; } });
  const [modal, setModal] = useState(null);
  const [preview, setPreview] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const section = sections.find(entry => entry.id === activeId) || sections[0];
  const data = activeId === 'projects' ? projects : (collections[activeId] || []);
  const categories = activeId === 'projects' ? ['All', ...new Set(data.map(item => item.category).filter(Boolean))] : ['All'];
  const shown = useMemo(() => data.filter(item => (category === 'All' || item.category === category) && JSON.stringify(item).toLowerCase().includes(query.toLowerCase())), [data, category, query]);
  const counts = { automation: automation.length, dashboards: dashboards.length, projects: projects.length, experience: experience.length, designs: designs.length, trainings: trainings.length, certifications: certifications.length };
  const navigate = entry => { setActiveId(entry.id); setCategory('All'); setQuery(''); setDrawerOpen(false); };
  const toggleTheme = () => setTheme(current => { const next = current === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('portfolio-theme', next); } catch {} return next; });
  useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.classList.remove('is-loading'); }, [theme]);
  useEffect(() => { const handler = event => { if (event.key === 'Escape') { if (preview) setPreview(null); else setModal(null); setDrawerOpen(false); } }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler); }, [preview]);
  const title = activeId === 'about' ? 'About' : activeId === 'contact' ? 'Contact' : section.label;

  const handleMenu = () => { if (window.matchMedia('(max-width: 768px)').matches) setDrawerOpen(true); else setCollapsed(value => !value); };
  return <><a className="skip-link" href="#main-content">Skip to main content</a><div className={`explorer-shell${collapsed ? ' is-sidebar-collapsed' : ''}`}><Sidebar sections={sections} counts={counts} active={activeId} onNavigate={navigate} theme={theme} onTheme={toggleTheme} /><Toolbar section={section} query={query} onQuery={setQuery} view={view} onView={setView} onMenu={handleMenu} /><main className="explorer-main" id="main-content" tabIndex="-1"><section className="dashboard-section"><div className="dashboard-section__header"><h1 id="dashboard-heading">{title}</h1><p className="dashboard-section__subtitle">{activeId === 'projects' ? `${shown.length} projects across ${categories.length - 1} categories` : section.label}</p>{activeId === 'projects' && <div className="dashboard-filters" role="tablist" aria-label="Filter by category">{categories.map(value => <button key={value} role="tab" aria-selected={category === value} className={`filter-chip${category === value ? ' is-active' : ''}`} onClick={() => setCategory(value)}>{value}</button>)}</div>}</div><SectionRenderer sectionId={activeId} items={shown} about={about} meta={meta} onOpen={setModal} onPreview={(src, title) => setPreview({src, title})} view={view} /></section></main></div>
    <div className={`drive-drawer${drawerOpen ? ' is-open' : ''}`} hidden={!drawerOpen}><button className="drive-drawer__backdrop" aria-label="Close menu" onClick={() => setDrawerOpen(false)} /><Sidebar sections={sections} counts={counts} active={activeId} onNavigate={navigate} theme={theme} onTheme={toggleTheme} mobile /></div>
    <Modal item={modal} onClose={() => setModal(null)} onPreview={(src, title) => setPreview({src, title})} />
    <ImageLightbox preview={preview} onClose={() => setPreview(null)} />
  </>;
}
