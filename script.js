/* ============================================================
   Portafolio SOG77 — interacciones
   Vanilla JS, sin dependencias (funciona en GitHub Pages tal cual)
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Año automático en el footer ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Nav: fondo sólido + barra de progreso ---------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('solid', y > 20);

    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Reveal al hacer scroll ---------- */
  var revealables = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Link activo según la sección visible ---------- */
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav-links a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- Contadores del hero ---------- */
  var counters = document.querySelectorAll('[data-count]');

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }

    var duration = 1300;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Barras de nivel ---------- */
  var bars = document.querySelectorAll('.bar i[data-level]');

  if ('IntersectionObserver' in window && bars.length) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.width = entry.target.getAttribute('data-level') + '%';
        barObserver.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    bars.forEach(function (el) { barObserver.observe(el); });
  } else {
    bars.forEach(function (el) { el.style.width = el.getAttribute('data-level') + '%'; });
  }

  /* ---------- Efecto máquina de escribir en el hero ---------- */
  var typed = document.getElementById('typed');
  var WORDS = ['principio a fin.', 'la base de datos a la UI.', 'verdad, no de demo.', 'forma clara y mantenible.'];

  if (typed) {
    if (reduceMotion) {
      typed.textContent = WORDS[0];
    } else {
      var wordIndex = 0;
      var charIndex = 0;
      var deleting = false;

      (function typeLoop() {
        var word = WORDS[wordIndex];
        charIndex += deleting ? -1 : 1;
        typed.textContent = word.slice(0, charIndex);

        var delay = deleting ? 38 : 68;

        if (!deleting && charIndex === word.length) {
          deleting = true;
          delay = 1900;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % WORDS.length;
          delay = 320;
        }
        setTimeout(typeLoop, delay);
      })();
    }
  }

  /* ---------- Brillo que sigue el cursor en las tarjetas de stack ---------- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.stack-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }
})();
