import React, { useEffect, useState } from 'react';

const iconShapes = {
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
  workflow: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M6.5 10v4a2 2 0 0 0 2 2H14"/></>,
  'layout-grid': <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  folder: <path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.5 1.5 0 0 1 .8-2.8H17a4 4 0 0 0 4-4c0-4.1-4-7.5-9-7.5Z"/><path d="M7.5 10h.01M10 7h.01M15 8h.01"/></>,
  'graduation-cap': <><path d="m2 10 10-6 10 6-10 6zM6 13v5c4 3 8 3 12 0v-5M22 10v6"/></>,
  award: <><circle cx="12" cy="8" r="5"/><path d="m8 12-1 9 5-3 5 3-1-9"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  phone: <><path d="M5 3h4l2 5-2.5 1.5a14 14 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2C10 20 4 14 3 5a2 2 0 0 1 2-2Z"/></>,
  link: <><path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7"/></>,
  github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.4-3.7 4.9 4.9 0 0 0-.1-3.7s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7.1 0C5.1.8 3.9 1.2 3.9 1.2a4.9 4.9 0 0 0-.1 3.7 5.3 5.3 0 0 0-1.4 3.7c0 5.3 3.2 6.5 6.2 6.8a3.4 3.4 0 0 0-.9 2.7V22"/></>,
  'map-pin': <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>
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

export function AboutView({ about, onNavigate }) {
  const metrics = [['500+', 'Active Platform Members'], ['99.9%', 'Production Uptime'], ['20+', 'AI & n8n Automations'], ['15', 'Verified Certifications']];
  return <div className="about-layout">
    <nav className="about-contact-bar" aria-label="Contact details">
      <span className="about-contact-pill"><SectionIcon name="map-pin" /><span>Sta. Cruz, Laguna</span></span>
      <a className="about-contact-pill" href="tel:+639663148788"><SectionIcon name="phone" /><span>+63 966 314 8788</span></a>
      <a className="about-contact-pill" href="mailto:arroyobrix@gmail.com"><SectionIcon name="mail" /><span>arroyobrix@gmail.com</span></a>
      <a className="about-contact-pill" href="https://linkedin.com/in/arroyohensonbrix" target="_blank" rel="noopener noreferrer"><SectionIcon name="link" /><span>linkedin.com/in/arroyohensonbrix</span></a>
      <a className="about-contact-pill" href="https://github.com/Xhenzouu" target="_blank" rel="noopener noreferrer"><SectionIcon name="github" /><span>github.com/Xhenzouu</span></a>
    </nav>
    <div className="about-intro-actions">
      <span className="about-status"><span className="about-status__dot" />Available for Opportunities</span>
      <nav className="about-actions" aria-label="About section links">
        <button className="btn-primary" onClick={() => onNavigate('projects')}>View Projects <span aria-hidden="true">→</span></button>
      </nav>
    </div>
    <section className="about-block about-bio-card"><h2 className="about-block__title">How I solve problems</h2><div className="about-block__body">{(about.bio || []).map((text, index) => <p className="about-bio__paragraph" key={index}>{text}</p>)}</div></section>
    <section className="about-metrics" aria-label="Impact highlights">{metrics.map(([value, label]) => <article className="about-metric" key={label}><strong className="about-metric__value">{value}</strong><span className="about-metric__label">{label}</span></article>)}</section>
    <div className="about-details-grid">
      <section className="about-block about-detail-card"><h2 className="about-block__title"><SectionIcon name="graduation-cap" />Education</h2><div className="about-education">{(about.education || []).map((item, index) => <article className="about-education__item" key={item.id || index}><strong className="about-education__degree">{item.degree}</strong><span className="about-education__institution">{item.institution}</span><span className="about-education__years">{[item.startYear, item.endYear].filter(Boolean).join('–')}</span></article>)}</div></section>
      <section className="about-block about-detail-card"><h2 className="about-block__title"><SectionIcon name="award" />Awards</h2><div className="about-awards">{(about.awards || []).map((item, index) => <article className="about-awards__item" key={item.id || index}><strong className="about-awards__name">{item.name}</strong><span className="about-awards__meta">{[item.issuer, item.date].filter(Boolean).join(' · ')}</span></article>)}</div></section>
    </div>
    <section className="about-block about-skills-section"><h2 className="about-block__title">Skills &amp; Tools</h2><div className="about-skills">{Object.entries(about.skills || {}).map(([key, values]) => <div className="about-skills__group" key={key}><h3 className="about-skills__label">{skillLabels[key] || key}</h3><ul className="about-skills__list">{values.map(value => <li className="about-skills__item" key={value}>{value}</li>)}</ul></div>)}</div></section>
  </div>;
}

export function SectionRenderer({ sectionId, items, about, onNavigate, onOpen, onPreview, view }) {
  if (sectionId === 'about') return <AboutView about={about} onNavigate={onNavigate} />;
  const sectionClass = `section-view section-view--${sectionId}`;
  return <div className={sectionClass}><Cards items={items} onOpen={onOpen} view={view} /></div>;
}

export function Modal({ item, onClose, onPreview }) {
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => { setSlideIndex(0); }, [item?.id]);
  if (!item) return null;
  const features = item.features || item.highlights || item.skills || [];
  const title = item.name || item.role || item.title || item.workflow || 'Details';
  const summary = item.description || item.summary || item.tagline || item.workflow || '';
  const tags = Array.isArray(item.tech) ? item.tech : Array.isArray(item.tags) ? item.tags : [];
  const images = Array.isArray(item.images) && item.images.length ? item.images : item.thumb ? [item.thumb] : [];
  const hasSlideshow = images.length > 1;
  const activeImage = images[slideIndex] || images[0];
  const showSlide = index => setSlideIndex((index + images.length) % images.length);
  return <div className="modal" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="modal__backdrop" onClick={onClose} />
    <div className="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button type="button" className="icon-button modal__close" onClick={onClose} aria-label="Close details">×</button>
      <div className="modal__content">
        {activeImage && (hasSlideshow ? <div className="modal__slideshow">
          <div className={`modal__hero modal__slideshow-viewport${item.thumbVariant ? ` modal__hero--${item.thumbVariant}` : ''}`}>
            <img className="modal__hero-image modal__slideshow-image" src={activeImage} alt={`${title} screenshot ${slideIndex + 1} of ${images.length}`} onClick={() => onPreview?.(activeImage, title)} />
            <button type="button" className="modal__slideshow-btn modal__slideshow-btn--prev" aria-label="Previous screenshot" onClick={() => showSlide(slideIndex - 1)}>‹</button>
            <button type="button" className="modal__slideshow-btn modal__slideshow-btn--next" aria-label="Next screenshot" onClick={() => showSlide(slideIndex + 1)}>›</button>
          </div>
          <div className="modal__slideshow-dots" role="group" aria-label="Choose screenshot">
            {images.map((image, index) => <button type="button" className={`modal__slideshow-dot${slideIndex === index ? ' is-active' : ''}`} key={image} aria-label={`Show screenshot ${index + 1}`} aria-pressed={slideIndex === index} onClick={() => showSlide(index)} />)}
          </div>
          <p className="modal__slideshow-count" aria-live="polite">{slideIndex + 1} / {images.length}</p>
        </div> : <div className={`modal__hero${item.thumbVariant ? ` modal__hero--${item.thumbVariant}` : ''}`}><img className="modal__hero-image" src={activeImage} alt={`${title} preview`} onClick={() => onPreview?.(activeImage, title)} /></div>)}
        <header className="modal__header"><h2 className="modal__title" id="modal-title">{title}</h2><p className="modal__meta">{[item.category, item.type, item.org, item.issuer, item.provider, item.date].filter(Boolean).join(' · ')}</p></header>
        {summary && <p className="modal__description">{summary}</p>}
        {tags.length > 0 && <section className="modal__tags"><h3 className="modal__section-title">Technologies & Skills</h3><ul className="modal__tag-list">{tags.map((tag, index) => <li className="modal__tag" key={`${tag}-${index}`}>{tag}</li>)}</ul></section>}
        {features.length > 0 && <details className="modal__features"><summary className="modal__section-title">Core Features</summary><ul className="modal__highlights-list">{features.map((feature, index) => <li className="modal__highlight" key={index}>{typeof feature === 'string' ? feature : JSON.stringify(feature)}</li>)}</ul></details>}
        <div className="modal__links">{(item.liveUrl || item.url || item.credentialUrl) && <a className="modal__link" href={item.liveUrl || item.url || item.credentialUrl} target="_blank" rel="noopener noreferrer">Open link ↗</a>}{item.repoUrl && <a className="modal__link" href={item.repoUrl} target="_blank" rel="noopener noreferrer">View source ↗</a>}{item.figmaUrl && <a className="modal__link" href={item.figmaUrl} target="_blank" rel="noopener noreferrer">Open Figma prototype ↗</a>}</div>
      </div>
    </div>
  </div>;
}

export function ImageLightbox({ preview, onClose }) {
  const [zoomed, setZoomed] = useState(false);
  if (!preview) return null;
  return <div className="lightbox lightbox--enter" role="dialog" aria-modal="true" aria-label={`${preview.title} image preview`}><button className="lightbox__backdrop" aria-label="Close image preview" onClick={onClose} /><button type="button" className="lightbox__close" aria-label="Close image preview" onClick={onClose}>×</button><div className="lightbox__panel"><img className={`lightbox__image${zoomed ? ' is-zoomed' : ''}`} src={preview.src} alt={`${preview.title} preview`} onClick={() => setZoomed(value => !value)} /></div></div>;
}
