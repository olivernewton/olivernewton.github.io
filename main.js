/* =============================================
   OLIVER THOMPSON — PORTFOLIO
   main.js
   ============================================= */

// ─── NAV SCROLL SHADOW ───────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── PAGE NAVIGATION ─────────────────────────
// Pages: 'about' | 'works' | 'detail'
let currentDetailId = null;

function showPage(pageId) {
  // Hide all pages and detail pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.detail-page').forEach(p => p.classList.remove('active'));

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    target.classList.add('fade-in');
    setTimeout(() => target.classList.remove('fade-in'), 600);
  }

  // Update nav active links
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.dataset.page === pageId) a.classList.add('active');
    // Keep "Work" active when viewing a detail
    if (pageId.startsWith('detail-') && a.dataset.page === 'works') {
      a.classList.add('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDetail(projectId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.detail-page').forEach(p => p.classList.remove('active'));

  const target = document.getElementById('detail-' + projectId);
  if (target) {
    target.classList.add('active');
    target.classList.add('fade-in');
    setTimeout(() => target.classList.remove('fade-in'), 600);
    currentDetailId = projectId;
  }

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.dataset.page === 'works') a.classList.add('active');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Nav link clicks
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    showPage(a.dataset.page);
  });
});

// Project card clicks
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    showDetail(card.dataset.project);
  });
});

// Back buttons
document.querySelectorAll('.detail-back').forEach(btn => {
  btn.addEventListener('click', () => {
    showPage('works');
  });
});

// ─── IMAGE CAROUSEL ───────────────────────────
(function () {
  const track       = document.querySelector('.carousel-track');
  const items       = document.querySelectorAll('.carousel-item');
  const prevBtn     = document.querySelector('.carousel-btn.prev');
  const nextBtn     = document.querySelector('.carousel-btn.next');
  const dotsWrapper = document.querySelector('.carousel-dots');

  if (!track || items.length === 0) return;

  // How many items visible at once (matches CSS)
  function getVisible() {
    return window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
  }

  let current = 0;
  const total  = items.length;

  // Build dots
  items.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrapper.appendChild(dot);
  });

  function goTo(index) {
    const visible   = getVisible();
    const maxIndex  = Math.max(0, total - visible);
    current         = Math.max(0, Math.min(index, maxIndex));

    const itemW     = items[0].offsetWidth;
    const gap       = 20; // matches CSS gap
    track.style.transform = `translateX(-${current * (itemW + gap)}px)`;

    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch/swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  window.addEventListener('resize', () => goTo(current));
})();

// ─── DISCLAIMER MODAL ────────────────────────
const modal = document.getElementById('disclaimerModal');
const modalClose = modal.querySelector('.modal-close');

document.querySelectorAll('.disclaimer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});

// ─── INITIAL PAGE ────────────────────────────
showPage('about');
