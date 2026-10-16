'use client';

import { useState, use, useEffect} from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import albums from '../../../data/albums';

export default function AlbumPage({ params }) {
  const { slug } = use(params);
  const album = albums.find(a => a.slug === slug);
  const [lightbox, setLightbox] = useState(null);

  if (!album) notFound();
  const photos = album.photos.filter(p => !p.galleryOnly);

  useEffect(() => {
    function handleKeyDown(e) {
      if (lightbox === null) return;
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') closeLightbox();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);


  function openLightbox(index) {
    setLightbox(index);
  }

  function closeLightbox() {
    setLightbox(null);
  }

  function prevPhoto() {
    setLightbox(i => (i === 0 ? photos.length - 1 : i - 1));
  }

  function nextPhoto() {
    setLightbox(i => (i === photos.length - 1 ? 0 : i + 1));
  }

  return (
    <>
      {/* ── HEADER ── */}
      <header>
        <Link href="/">
          <img src="/logos/IMG_5882.PNG" alt="jpgsbyjpg logo" width={70} height={70} />
        </Link>
        <nav>
          <Link href="/#portfolio">GALLERY</Link>
          <Link href="/albums">ALBUMS</Link>
          <Link href="/#about">ABOUT</Link>
          <Link href="/#contact">CONTACT</Link>
        </nav>
      </header>

      {/* ── ALBUM HERO ── */}
      <section id="album-hero">
        <div className="album-hero-cover">
          <img
            src={album.cover}
            alt={album.name}
            style={{ objectPosition: album.coverPosition || 'center' }}
          />
          <div className="album-hero-overlay" />
        </div>
        <div className="album-hero-content">
          <Link href="/albums" className="album-back">
            ← Back to Albums
          </Link>
          <h4>{album.category.replace('-', ' ').toUpperCase()}</h4>
          <h1><i>{album.name}</i></h1>
          <div className="album-meta-row">
            {album.date && (
              <span className="album-meta-item">{album.date}</span>
            )}
            {album.location && (
              <span className="album-meta-item">{album.location}</span>
            )}
            <span className="album-meta-item">{photos.length} photos</span>
          </div>
        </div>
      </section>

      {/* ── PHOTO GRID ── */}
      <section id="album-grid">
        <div className="gallery">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="event-card"
              onClick={() => openLightbox(i)}
            >
              <img src={photo.src} alt={`${album.name} — photo ${i + 1}`} />
            </div>
          ))}
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
      {lightbox !== null && (
        <div id="lightbox" className="open" onClick={closeLightbox}>
          <div id="lightbox-close" onClick={closeLightbox}>✕ Close</div>

          {/* Counter */}
          <div id="lightbox-counter">
            {lightbox + 1} / {photos.length}
          </div>

          {/* Arrows */}
          <button className="lb-arrow lb-arrow-left" onClick={e => { e.stopPropagation(); prevPhoto(); }}>
            ‹
          </button>
          <button className="lb-arrow lb-arrow-right" onClick={e => { e.stopPropagation(); nextPhoto(); }}>
            ›
          </button>

          <img
            id="lightbox-img"
            src={photos[lightbox].src}
            alt={`${album.name} — photo ${lightbox + 1}`}
            onClick={e => e.stopPropagation()}
          />

          {/* <div id="lightbox-caption">
            <span id="lb-name">{album.name}</span>
            <span id="lb-meta">{album.date}</span>
          </div> */}
        </div>
      )}
    </>
  );
}
