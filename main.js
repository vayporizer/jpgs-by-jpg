// Filter Functionality
const filterBtns  = document.querySelectorAll('.filter-btn');
const eventGroups = document.querySelectorAll('.event-group');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    // Deactivate all buttons, then activate the clicked one
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    eventGroups.forEach(group => {
      const match = filter === 'all' || group.dataset.category === filter;
      group.classList.toggle('hidden', !match);
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lightbox-img');
const lbName   = document.getElementById('lb-name');
const lbMeta   = document.getElementById('lb-meta');
const lbClose  = document.getElementById('lightbox-close');

// Open lightbox when a card is clicked
document.querySelectorAll('.event-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if (!img) return; // no real image yet — do nothing

    lbImg.src  = img.src;
    lbImg.alt  = img.alt;
    lbName.textContent = card.dataset.name || '';
    lbMeta.textContent = card.dataset.meta || '';

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  });
});

// Close via the ✕ button
lbClose.addEventListener('click', closeLightbox);

// Close by clicking the dark backdrop (not the image itself)
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Close with the Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = ''; // restore scrolling
}


// Copy Email Functionality
const copyEmail = document.getElementById('copy-email');
const emailHandle = document.getElementById('email-handle');

copyEmail.addEventListener('click', () => {
  navigator.clipboard.writeText('paogines.photos@gmail.com');
  emailHandle.textContent = 'Copied!';
  setTimeout(() => {
    emailHandle.textContent = 'paogines.photos@gmail.com';
  }, 2000);
});