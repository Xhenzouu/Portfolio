import React, { useState } from 'react';

const iconShapes = {
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
  workflow: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M6.5 10v4a2 2 0 0 0 2 2H14"/></>,
  'layout-grid': <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  folder: <path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.5 1.5 0 0 1 .8-2.8H17a4 4 0 0 0 4-4c0-4.1-4-7.5-9-7.5Z"/><path d="M7.5 10h.01M10 7h.01M15 8h.01"/></>,
  'graduation-cap': <><path d="m2 10 10-6 10 6-10 6zM6 13v5c4 3 8 3 12 0v-5M22 10v6"/></>,
  award: <><circle cx="12" cy="8" r="5"/><path d="m8 12-1 9 5-3 5 3-1-9"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>
};

function SectionIcon({ name }) {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconShapes[name] || iconShapes.folder}</svg>;
}

export function Sidebar({ sections, counts = {}, active, onNavigate, theme, onTheme, mobile = false }) {
  return <aside className={mobile ? 'drive-drawer__panel' : 'explorer-sidebar'} aria-label="Folder navigation">
    <div className={mobile ? 'drive-drawer__header' : 'sidebar-header'}><span className="brand-mark" aria-hidden="true">▦</span><span className={mobile ? 'drive-drawer__name' : 'brand-name'}>Henson Brix A. Arroyo</span></div>
    <nav aria-label="Portfolio sections"><ul className={mobile ? 'drive-drawer__list' : 'folder-tree'} role="tree">{sections.map(section => <li key={section.id} role="treeitem" aria-selected={active === section.id} className="folder-tree__item"><button type="button" className={`${mobile ? 'drive-drawer__link' : 'folder-tree__leaf'}${active === section.id ? ' is-active' : ''}`} onClick={() => onNavigate(section)}><span className="folder-tree__icon"><SectionIcon name={section.icon} /></span><span className="folder-tree__label">{section.label}</span>{counts[section.id] != null && <span className="folder-tree__count" aria-label={`${counts[section.id]} items`}>{counts[section.id]}</span>}</button></li>)}</ul></nav>
    <div className={mobile ? 'drive-drawer__footer' : 'sidebar-footer'}><button type="button" className="theme-toggle" aria-pressed={theme === 'dark'} onClick={onTheme}><span className="theme-toggle__icon">{theme === 'dark' ? '☾' : '☼'}</span><span className="theme-toggle__label">Toggle theme</span></button></div>
  </aside>;
}

export function Toolbar({ section, query, onQuery, view, onView, onMenu }) {
  return <header className="explorer-toolbar"><button type="button" className="icon-button sidebar-collapse-btn" aria-label="Toggle navigation" onClick={onMenu}>☰</button><nav className="breadcrumb" aria-label="breadcrumb"><ol className="breadcrumb__list"><li className="breadcrumb__item"><span className="breadcrumb__link">Portfolio</span></li><li className="breadcrumb__item" aria-current="page">{section.label}</li></ol></nav><div className="toolbar-search"><label className="visually-hidden" htmlFor="search-input">Search portfolio</label><span className="toolbar-search__icon" aria-hidden="true">⌕</span><input id="search-input" className="toolbar-search__input" type="search" value={query} onChange={e => onQuery(e.target.value)} placeholder="Search portfolio" /></div><div className="toolbar-actions" role="group" aria-label="View options"><button className={`icon-button view-toggle${view === 'grid' ? ' is-active' : ''}`} aria-label="Grid view" aria-pressed={view === 'grid'} onClick={() => onView('grid')}>▦</button><button className={`icon-button view-toggle${view === 'list' ? ' is-active' : ''}`} aria-label="List view" aria-pressed={view === 'list'} onClick={() => onView('list')}>☷</button></div></header>;
}

export function Cards({ items, onOpen, view }) {
  const cardItems = items || [];
  return <div id="dashboard-grid" className={`dashboard-grid${view === 'list' ? ' is-list' : ''}`} role="list">
    {cardItems.map((item, i) => {
      const title = item.name || item.role || item.title || item.workflow || 'Details';
      return <article className="card is-clickable" role="listitem" key={item.id || `${title}-${i}`} onClick={() => onOpen(item)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') onOpen(item); }} tabIndex="0" aria-label={`View ${title} details`}>
          <div className={`card__thumb${item.thumbVariant ? ` card__thumb--${item.thumbVariant}` : ''}`}>{item.thumb ? <img src={item.thumb} alt={`Preview ${title}`} loading={item.id === 'bookmuna' ? 'eager' : 'lazy'} /> : <span aria-hidden="true">▧</span>}</div>
          <div className="card__body"><h2 className="card__title">{title}{item.featured && <span className="card__featured">Featured</span>}</h2>
            <p className="card__meta">{[item.category, item.org, item.issuer, item.provider, item.workflow, item.date, item.startDate && `${item.startDate}${item.endDate ? ` – ${item.endDate}` : ''}`].filter(Boolean).join(' · ')}</p>
          </div>
      </article>;
    })}
  </div>;
}

const skillLabels = {
  languages: 'Languages', frameworks: 'Frameworks', cloudDevops: 'Cloud & DevOps',
  ai: 'AI & ML', security: 'Security', design: 'Design', other: 'Other'
};

export function AboutView({ about }) {
  return <div className="dashboard-grid about-layout">
    <section className="about-block"><h2 className="about-block__title">Bio</h2><div className="about-block__body">{(about.bio || []).map((text, index) => <p className="about-bio__paragraph" key={index}>{text}</p>)}</div></section>
    <section className="about-block"><h2 className="about-block__title">Education</h2><div className="about-education">{(about.education || []).map((item, index) => <article className="about-education__item" key={item.id || index}><strong className="about-education__degree">{item.degree}</strong><span className="about-education__institution">{item.institution}</span><span className="about-education__years">{[item.startYear, item.endYear].filter(Boolean).join('–')}</span></article>)}</div></section>
    <section className="about-block"><h2 className="about-block__title">Awards</h2><div className="about-awards">{(about.awards || []).map((item, index) => <article className="about-awards__item" key={item.id || index}><strong className="about-awards__name">{item.name}</strong><span className="about-awards__meta">{[item.issuer, item.date].filter(Boolean).join(' · ')}</span></article>)}</div></section>
    <section className="about-block"><h2 className="about-block__title">Skills</h2><div className="about-skills">{Object.entries(about.skills || {}).map(([key, values]) => <div className="about-skills__group" key={key}><h3 className="about-skills__label">{skillLabels[key] || key}</h3><ul className="about-skills__list">{values.map(value => <li className="about-skills__item" key={value}>{value}</li>)}</ul></div>)}</div></section>
  </div>;
}

export function SectionRenderer({ sectionId, items, about, meta, onOpen, onPreview, view }) {
  if (sectionId === 'about') return <AboutView about={about} />;
  if (sectionId === 'contact') return <address className="contact-list">{Object.entries(meta.contact || {}).map(([label, href]) => <a key={label} href={href.includes('@') ? `mailto:${href}` : href} target={href.includes('@') ? undefined : '_blank'} rel="noreferrer">{label}: {href}</a>)}</address>;
  const sectionClass = `section-view section-view--${sectionId}`;
  return <div className={sectionClass}><Cards items={items} onOpen={onOpen} view={view} /></div>;
}

export function Modal({ item, onClose, onPreview }) {
  if (!item) return null;
  const features = item.features || item.highlights || item.skills || [];
  const title = item.name || item.role || item.title || item.workflow || 'Details';
  const summary = item.description || item.summary || item.tagline || item.workflow || '';
  const tags = Array.isArray(item.tech) ? item.tech : Array.isArray(item.tags) ? item.tags : [];
  return <div className="modal" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="modal__backdrop" onClick={onClose} />
    <div className="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button type="button" className="icon-button modal__close" onClick={onClose} aria-label="Close details">×</button>
      <div className="modal__content">
        {item.thumb && <div className={`modal__hero${item.thumbVariant ? ` modal__hero--${item.thumbVariant}` : ''}`}><img className="modal__hero-image" src={item.thumb} alt={`${title} preview`} onClick={() => onPreview?.(item.thumb, title)} /></div>}
        <header className="modal__header"><h2 className="modal__title" id="modal-title">{title}</h2><p className="modal__meta">{[item.category, item.org, item.issuer, item.provider, item.date].filter(Boolean).join(' · ')}</p></header>
        {summary && <p className="modal__description">{summary}</p>}
        {tags.length > 0 && <section className="modal__tags"><h3 className="modal__section-title">Technologies & Skills</h3><ul className="modal__tag-list">{tags.map((tag, index) => <li className="modal__tag" key={`${tag}-${index}`}>{tag}</li>)}</ul></section>}
        {features.length > 0 && <details className="modal__features"><summary className="modal__section-title">Core Features</summary><ul className="modal__highlights-list">{features.map((feature, index) => <li className="modal__highlight" key={index}>{typeof feature === 'string' ? feature : JSON.stringify(feature)}</li>)}</ul></details>}
        <div className="modal__links">{(item.liveUrl || item.url || item.credentialUrl) && <a className="modal__link" href={item.liveUrl || item.url || item.credentialUrl} target="_blank" rel="noreferrer">Open link ↗</a>}{item.repoUrl && <a className="modal__link" href={item.repoUrl} target="_blank" rel="noreferrer">View source ↗</a>}</div>
      </div>
    </div>
  </div>;
}

export function ImageLightbox({ preview, onClose }) {
  const [zoomed, setZoomed] = useState(false);
  if (!preview) return null;
  return <div className="lightbox lightbox--enter" role="dialog" aria-modal="true" aria-label={`${preview.title} image preview`}><button className="lightbox__backdrop" aria-label="Close image preview" onClick={onClose} /><button type="button" className="lightbox__close" aria-label="Close image preview" onClick={onClose}>×</button><div className="lightbox__panel"><img className={`lightbox__image${zoomed ? ' is-zoomed' : ''}`} src={preview.src} alt={`${preview.title} preview`} onClick={() => setZoomed(value => !value)} /></div></div>;
}
