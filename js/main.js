(() => {
  'use strict';

  /* ── Loader ────────────────────────────────────────────────────── */
  const loader    = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');

  if (loader && loaderBar) {
    document.body.style.overflow = 'hidden';
    let progress = 0;
    const sim = setInterval(() => {
      progress += Math.random() * 18 + 4;
      if (progress >= 88) { progress = 88; clearInterval(sim); }
      loaderBar.style.width = progress + '%';
    }, 120);

    const finish = () => {
      clearInterval(sim);
      loaderBar.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.removeProperty('overflow');
      }, 350);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }
    // Safety fallback — never block the page
    setTimeout(() => { loader.classList.add('hidden'); document.body.style.removeProperty('overflow'); }, 4000);
  }

  /* ── Scroll Progress Bar ───────────────────────────────────────── */
  const progressFill = document.getElementById('scroll-progress-fill');
  const backToTop    = document.getElementById('back-to-top');
  const header       = document.getElementById('site-header');
  const navLinks     = document.querySelectorAll('nav a');
  const sections     = document.querySelectorAll('section[id]');

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY   = window.scrollY;
      const docH      = document.documentElement.scrollHeight - window.innerHeight;
      const pct       = docH > 0 ? (scrollY / docH) * 100 : 0;

      if (progressFill) progressFill.style.width = pct + '%';
      if (header)        header.classList.toggle('scrolled', scrollY > 40);
      if (backToTop)     backToTop.classList.toggle('visible', scrollY > 320);

      let current = '';
      sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - 140) current = sec.id;
      });
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Custom Cursor (desktop only) ─────────────────────────────── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');

  if (cursor && ring && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; ring.style.opacity  = '0.6'; });

    const hoverTargets = 'a, button, .gallery-item, .quality-item, .service-card, .contact-channel';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  } else {
    if (cursor) cursor.style.display = 'none';
    if (ring)   ring.style.display   = 'none';
  }

  /* ── Mobile Menu ───────────────────────────────────────────────── */
  const toggle    = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (toggle && mobileNav) {
    const closeMenu = () => {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
      document.body.classList.remove('no-scroll');
    };

    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      mobileNav.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.classList.toggle('no-scroll', open);
    });

    document.querySelectorAll('[data-mobile-link]').forEach(a => a.addEventListener('click', closeMenu));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeMenu();
    });
  }

  /* ── Scroll Reveal ─────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Gallery & Lightbox ────────────────────────────────────────── */
  /* Filenames match actual files — JPG uppercase on some entries */
  const galleryImages = [
    'foto1.jpg',  'foto2.jpg',  'foto3.jpg',  'foto4.jpg',  'foto5.jpg',  'foto6.jpg',
    'foto7.jpg',  'foto8.jpg',  'foto9.jpg',  'foto10.jpg', 'foto11.jpg', 'foto12.jpg',
    'foto13.jpg', 'foto14.jpg', 'foto15.jpg', 'foto16.jpg', 'foto17.jpg', 'foto18.jpg',
    'foto19.jpg', 'foto20.jpg', 'foto21.jpg', 'foto22.jpg', 'foto23.jpg', 'foto24.jpg',
    'foto25.jpg', 'foto26.jpg', 'foto27.jpg', 'foto28.jpg', 'foto29.jpg', 'foto30.jpg',
    'foto31.jpg', 'foto32.jpg', 'foto33.png', 'foto34.jpg', 'foto35.jpg', 'foto36.jpg',
    'foto37.jpg', 'foto38.jpg', 'foto39.jpg', 'foto40.jpg', 'foto41.JPG', 'foto42.JPG',
    'foto43.jpg', 'foto44.JPG', 'foto45.JPG', 'foto46.png', 'foto47.jpg', 'foto48.jpg',
    'foto49.jpg', 'foto50.jpg', 'foto51.jpg', 'foto52.jpg', 'foto53.jpg', 'foto54.jpg',
    'foto55.jpg', 'foto56.jpg', 'foto57.jpg', 'foto58.jpg', 'foto59.jpg', 'foto60.jpg',
    'foto61.jpg'
  ];

  const grid       = document.getElementById('gallery');
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lb-img');
  const lbClose    = document.getElementById('lb-close');
  const lbPrev     = document.getElementById('lb-prev');
  const lbNext     = document.getElementById('lb-next');
  const lbCurrent  = document.getElementById('lb-current');
  const lbTotal    = document.getElementById('lb-total');
  const lbLoading  = document.getElementById('lb-loading');
  const photoCount = document.getElementById('photo-count');

  let lbIdx = 0, lbTrigger = null, touchStartX = 0;
  const total = galleryImages.length;

  if (lbTotal)    lbTotal.textContent    = total;
  if (photoCount) photoCount.textContent = total;

  function svgPlaceholder(label) {
    const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700"><rect width="600" height="700" fill="#1a1a18"/><text x="50%" y="55%" text-anchor="middle" fill="#4a4a48" font-family="DM Mono,monospace" font-size="20">${label}</text></svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(s);
  }

  function loadLbImage(i) {
    if (lbLoading) lbLoading.classList.add('active');
    lbImg.style.opacity = '0';

    const src  = 'img/' + galleryImages[i];
    const temp = new Image();

    temp.onload = () => {
      lbImg.src = src;
      lbImg.alt = 'Fotografía ' + (i + 1) + ' — JH Studio Photography';
      if (lbCurrent) lbCurrent.textContent = i + 1;
      if (lbLoading) lbLoading.classList.remove('active');
      requestAnimationFrame(() => { lbImg.style.opacity = '1'; });
    };
    temp.onerror = () => {
      lbImg.src = svgPlaceholder('No disponible');
      if (lbLoading) lbLoading.classList.remove('active');
      lbImg.style.opacity = '1';
    };
    temp.src = src;

    // Preload adjacent images
    [i - 1, i + 1].forEach(n => {
      const adj = (n + total) % total;
      const pre = new Image();
      pre.src = 'img/' + galleryImages[adj];
    });
  }

  function openLb(i, trigger) {
    lbIdx = i; lbTrigger = trigger;
    loadLbImage(i);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    lbClose.focus();
  }

  function closeLb() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    lbImg.src = '';
    if (lbTrigger) lbTrigger.focus();
  }

  function navLb(dir) {
    lbIdx = (lbIdx + dir + total) % total;
    loadLbImage(lbIdx);
  }

  lbImg.style.transition = 'opacity 0.2s';

  /* Build gallery */
  if (grid) {
    const fragment = document.createDocumentFragment();

    galleryImages.forEach((name, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gallery-item';
      btn.setAttribute('aria-label', 'Ver fotografía ' + (i + 1));

      const img = document.createElement('img');
      img.src          = 'img/' + name;
      img.alt          = 'Fotografía ' + (i + 1) + ' — JH Studio Photography';
      img.loading      = i < 6 ? 'eager' : 'lazy';
      img.decoding     = 'async';
      if (i < 2) img.fetchPriority = 'high';
      img.onerror = function() { this.onerror = null; this.src = svgPlaceholder('Imagen ' + (i + 1)); };

      const overlay = document.createElement('div'); overlay.className = 'gallery-overlay';
      const oc      = document.createElement('div'); oc.className      = 'gallery-overlay-content';
      const num     = document.createElement('div'); num.className     = 'gallery-num';
      num.textContent = String(i + 1).padStart(2, '0');
      const exp = document.createElement('div'); exp.className = 'gallery-expand';
      exp.textContent = 'Ampliar';

      oc.append(num, exp);
      overlay.append(oc);
      btn.append(img, overlay);
      btn.addEventListener('click', () => openLb(i, btn));
      fragment.appendChild(btn);
    });

    grid.appendChild(fragment);
  }

  /* Lightbox controls */
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lbPrev)  lbPrev.addEventListener('click',  () => navLb(-1));
  if (lbNext)  lbNext.addEventListener('click',  () => navLb(1));

  if (lightbox) {
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
    lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', e => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 48) navLb(dx > 0 ? 1 : -1);
    }, { passive: true });
  }

  if (lbImg) lbImg.addEventListener('error', function() { this.src = svgPlaceholder('No disponible'); });

  document.addEventListener('keydown', e => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    const map = { Escape: closeLb, ArrowLeft: () => navLb(-1), ArrowRight: () => navLb(1) };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });

  /* ── Gallery View Toggle ───────────────────────────────────────── */
  const viewMasonry = document.getElementById('view-masonry');
  const viewGrid    = document.getElementById('view-grid');

  if (viewMasonry && viewGrid && grid) {
    function setView(mode) {
      const isGrid = mode === 'grid';
      grid.classList.toggle('grid-view', isGrid);
      viewGrid.classList.toggle('active', isGrid);
      viewMasonry.classList.toggle('active', !isGrid);
      viewGrid.setAttribute('aria-pressed',    String(isGrid));
      viewMasonry.setAttribute('aria-pressed', String(!isGrid));
    }

    viewMasonry.addEventListener('click', () => setView('masonry'));
    viewGrid.addEventListener('click',    () => setView('grid'));
  }

  /* ── Back to Top ───────────────────────────────────────────────── */
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

})();
