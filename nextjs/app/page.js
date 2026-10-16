'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import albums from '../data/albums';

// ── Gallery data for the main page (crème de la crème) ────────
const galleryEvents = [
  {
    category: 'landscapes',
    name: 'Katipunan in Slow Shutter',
    meta: 'Landscapes · October 2026',
    photos: ['/pictures/JPG_6670-5.jpg'],
  },
  {
    category: 'org-events',
    name: 'RecWeek 2026',
    meta: 'Org Event · June 2026',
    photos: [1, 2, 3, 4].map(n => `/pictures/RecWeek 26 (${n}).jpg`),
  },
  {
    category: 'portraits',
    name: "RecWeek '26 DP Shoots",
    meta: 'Portraits · August 2026',
    photos: ['/pictures/RecWeek DPs (3).jpg'],
  },
  {
    category: 'concerts',
    name: 'Ateneo Blue Rose 2026',
    meta: 'Concerts · June 2026',
    photos: [3, 5, 7, 8].map(n => `/pictures/Blue Rose 26 (${n}).jpg`),
  },
  {
    category: 'concerts',
    name: 'Petrichor Single Launch',
    meta: 'Concerts · Sep 2025',
    photos: [
      '/pictures/Petrichor (1).JPG',
      '/pictures/Petrichor (2).jpg',
      '/pictures/Petrichor (8).JPG',
      '/pictures/Petrichor (6).jpg',
    ],
  },
  {
    category: 'events',
    name: 'Reese at 18',
    meta: 'Events · Jan 2025',
    photos: [3, 6, 8, 9, 10].map(n => `/pictures/Reese at 18 (${n}).JPG`),
  },
  {
    category: 'portraits',
    name: "RecWeek '26 DP Shoots",
    meta: 'Portraits · August 2026',
    photos: ['/pictures/RecWeek DPs (2).jpg'],
  },
  {
    category: 'landscapes',
    name: 'Katipunan in Slow Shutter',
    meta: 'Landscapes · October 2026',
    photos: ['/pictures/JPG_6637-2.jpg'],
  },
  {
    category: 'sports',
    name: 'COA-M InterOrg Sportsfest',
    meta: 'Sports · Feb-Mar 2026',
    photos: [6, 18, 32, 49].map(n => `/pictures/COA-M IOSF (${n}).jpg`)
      .concat(['/pictures/COA-M IOSF (51).JPG']),
  },
  {
    category: 'org-events',
    name: 'COA-M LEADCon',
    meta: 'Org Event · Mar 2026',
    photos: [14, 17].map(n => `/pictures/COA-M LEADcon (${n}).jpg`),
  },
  {
    category: 'portraits',
    name: "RecWeek '26 DP Shoots",
    meta: 'Portraits · August 2026',
    photos: ['/pictures/RecWeek DPs (1).jpg'],
  },
  {
    category: 'org-events',
    name: 'COAlentines',
    meta: 'Org Event · Feb 2026',
    photos: ['/pictures/COAlentines-1.jpg'],
  },
  {
    category: 'cars',
    name: 'Panning Shots',
    meta: 'Cars · Sep 2026',
    photos: ['/pictures/Panning (1).jpg'],
  },
  {
    category: 'cars',
    name: "MIAS '26",
    meta: 'Cars · Apr 2026',
    photos: [
      "/pictures/MIAS '26 (1).JPG",
      "/pictures/MIAS '26 (3).jpg",
      "/pictures/MIAS '26 (11).JPG",
    ],
  },
];

const filters = ['all', 'portraits', 'concerts', 'events', 'sports', 'org-events', 'cars', 'landscapes'];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [emailLabel, setEmailLabel] = useState('paogines.photos@gmail.com');

  // ── Filter logic ─────────────────────────────────────────────
  const filtered = activeFilter === 'all'
    ? galleryEvents
    : galleryEvents.filter(e => e.category === activeFilter);

  // ── Lightbox ─────────────────────────────────────────────────
  function openLightbox(src, name, meta) {
    setLightbox({ src, name, meta });
  }
  function closeLightbox() {
    setLightbox(null);
  }

  // ── Copy email ───────────────────────────────────────────────
  function copyEmail() {
    navigator.clipboard.writeText('paogines.photos@gmail.com');
    setEmailLabel('Copied!');
    setTimeout(() => setEmailLabel('paogines.photos@gmail.com'), 2000);
  }

  return (
    <>
      {/* ── HEADER ── */}
      <header>
        <a href="#hero">
          <img src="/logos/IMG_5882.PNG" alt="jpgsbyjpg logo" width={70} height={70} />
        </a>
        <nav>
          <a href="#portfolio">GALLERY</a>
          <Link href="/albums">ALBUMS</Link>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-bg"></div>
        <h4>PHOTOGRAPHY PORTFOLIO</h4>
        <div className="hero-content-wrap">
          <h1>JPGs <i>by</i> <span style={{ color: '#c9a96e' }}>JPG</span></h1>
          <p>A collection of .jpegs photographed and edited by Juan Paolo Gines.</p>
        </div>
        <img src="/logos/IMG_5882.PNG" className="hero-wm" alt="" />
      </section>

      {/* ── GALLERY ── */}
      <section id="portfolio">
        <h3>GALLERY</h3>
        <div id="filter-bar">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        <div className="gallery">
          {filtered.map(event =>
            event.photos.map((src, i) => (
              <div
                key={`${event.name}-${i}`}
                className="event-card"
                onClick={() => openLightbox(src, event.name, event.meta)}
              >
                <img src={src} alt={event.name} />
                <div className="event-card-overlay">
                  <p className="event-name">{event.name}</p>
                  <p className="event-meta">{event.meta}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Albums teaser */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ marginBottom: '1rem' }}>Want to see the full story behind each event?</p>
          <Link href="/albums" style={{
            display: 'inline-block',
            padding: '0.85rem 2.5rem',
            border: '1px solid #c9a96e',
            color: '#c9a96e',
            fontFamily: 'var(--mono-font)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            View All Albums →
          </Link>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="about-img-wrap">
          <img src="/pictures/About_Me.JPG" alt="Juan Paolo Gines" />
        </div>
        <div className="about-text">
          <h3>ABOUT</h3>
          <h2 className="about-header">
            Hey, I'm{' '}
            <span className="about-name">Juan</span>{' '}
            <span className="about-name">Paolo</span>{' '}
            <span className="about-name">Gines!</span>
          </h2>
          <p>
            My dad has been a photographer for as long as I've known him,
            and he'd never let a moment or a memory pass without at least
            one photo to commemorate and look back on. It only took one
            gig for that same passion to ignite in me.
          </p>
          <p>
            Through different settings, I've realized I find fulfilment in
            being the one responsible for making sure people have something
            to look back on. I've found that I thrive when capturing moments
            and emotions in their rawest form. I love that people can just be
            themselves knowing that I'll be there to document it.
          </p>
          <h4>ORG EXPERIENCE</h4>
          <div className="org-experience-list">
            <span className="org-exp">COA-M Associate Vice President for Documentations 2026-2027</span>
            <span className="org-exp">COA-M RecWeek 2026 Documentations Head</span>
            <span className="org-exp">COA-M IOSF 2026 and LEADCon 2026 Documentations Head</span>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <h2>Let's work together!</h2>
        <div className="socmed-list">
          <button className="socmed" onClick={() => window.open('https://instagram.com/jpgsbyjpg', '_blank')}>
            <span className="socmed-label">INSTAGRAM</span>
            <span className="socmed-handle">@jpgsbyjpg</span>
          </button>
          <button className="socmed" onClick={copyEmail}>
            <span className="socmed-label">EMAIL</span>
            <span className="socmed-handle">{emailLabel}</span>
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <span>© JPGs by JPG 2026</span>
        <span>All rights reserved.</span>
        <span>Last updated October 2026.</span>
        <span>Logo by Zoe Salcedo</span>
      </footer>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div id="lightbox" className="open" onClick={closeLightbox}>
          <div id="lightbox-close" onClick={closeLightbox}>✕ Close</div>
          <img
            id="lightbox-img"
            src={lightbox.src}
            alt={lightbox.name}
            onClick={e => e.stopPropagation()}
          />
          <div id="lightbox-caption">
            <span id="lb-meta">{lightbox.name} | {lightbox.meta}</span>
          </div>
        </div>
      )}
    </>
  );
}