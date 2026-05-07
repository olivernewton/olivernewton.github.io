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
function showPage(id) {
  document.querySelectorAll('.page, .case-page').forEach(p => p.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
  updateNav(id);
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function updateNav(id) {
  const onWork = id === 'work' || id.startsWith('case-');
  document.querySelector('.nav-link')?.classList.toggle('active', onWork);
}

// Nav — logo → home
document.querySelector('.nav-logo')?.addEventListener('click', e => {
  e.preventDefault();
  showPage('home');
});

// Nav — Work link → work page
document.querySelector('.nav-link')?.addEventListener('click', e => {
  e.preventDefault();
  showPage('work');
});

// Work grid cards → individual case studies
document.querySelectorAll('.work-card[data-case]').forEach(card => {
  card.addEventListener('click', () => showPage(card.dataset.case));
});

// Back buttons → work page
document.querySelectorAll('.back-btn[data-page]').forEach(btn => {
  btn.addEventListener('click', () => showPage(btn.dataset.page));
});

// Home page links (featured cards, hero CTA, see-all) → work page
document.body.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (!el) return;
  // Skip nav elements (they have their own handlers above)
  if (el.classList.contains('nav-logo') || el.classList.contains('nav-link')) return;
  e.preventDefault();
  showPage(el.dataset.page);
});

// ─── VIDEO FACADE ────────────────────────────
document.querySelectorAll('.video-facade').forEach(facade => {
  facade.addEventListener('click', () => {
    const id = facade.dataset.videoId;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    facade.parentElement.replaceChild(iframe, facade);
  });
});

// ─── INITIAL PAGE ────────────────────────────
showPage('home');
