import Link from 'next/link';
import albums from '../../data/albums';

export const metadata = {
  title: "Albums — JPGs by JPG",
  description: "Full event albums by Juan Paolo Gines",
};

export default function AlbumsPage() {
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

      {/* ── PAGE HEADER ── */}
      <section id="albums-hero">
        <div className="hero-bg"></div>
        <h4>JPGS BY JPG</h4>
        <div className="hero-content-wrap">
          <h1>Event <i>Albums.</i></h1>
          <p>The full story behind every event, start to finish.</p>
        </div>
      </section>

      {/* ── ALBUMS GRID ── */}
      <section id="albums-index">
        <h3>ALL EVENTS</h3>
        <div className="albums-grid">
          {albums.filter(album => album.hasAlbum).map(album => (
            <Link
                key={album.slug}
                href={`/albums/${album.slug}`}
                className="album-card"
            >
                <div className="album-card-img-wrap">
                <img
                    src={album.cover}
                    alt={album.name}
                    style={{ objectPosition: album.coverPosition || 'center' }}
                />
                <div className="album-card-overlay">
                    <span className="album-card-category">
                    {album.category.replace('-', ' ')}
                    </span>
                </div>
                </div>
                <div className="album-card-info">
                <p className="album-card-name">{album.name}</p>
                <p className="album-card-date">{album.date}</p>
                </div>
            </Link>
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
    </>
  );
}