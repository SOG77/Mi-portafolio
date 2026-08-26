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

  /* ---------- HUD: fondo sólido + barra de progreso ---------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('solid', y > 20);

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
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
    if (burger) {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menú');
    }
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
  var links = document.querySelectorAll('.hud-links a[href^="#"]');

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

  /* ---------- Contadores del HUD ---------- */
  var counters = document.querySelectorAll('[data-count]');

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }

    var duration = 1200;
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

  /* ---------- Barras de XP ---------- */
  var bars = document.querySelectorAll('.xp i[data-level]');

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

  /* ---------- Máquina de escribir en la línea de CLASE ---------- */
  var typed = document.getElementById('typed');
  var ROLES = [
    'Full Stack Developer',
    'Backend · Java + Spring',
    'Frontend · React',
    'Resuelve problemas'
  ];

  if (typed) {
    if (reduceMotion) {
      typed.textContent = ROLES[0];
    } else {
      var roleIndex = 0;
      var charIndex = 0;
      var deleting = false;

      (function typeLoop() {
        var role = ROLES[roleIndex];
        charIndex += deleting ? -1 : 1;
        typed.textContent = role.slice(0, charIndex);

        var delay = deleting ? 34 : 66;

        if (!deleting && charIndex === role.length) {
          deleting = true;
          delay = 2000;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
          delay = 300;
        }
        setTimeout(typeLoop, delay);
      })();
    }
  }

  /* ---------- Easter egg: código Konami ---------- */
  var KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  var streak = 0;

  document.addEventListener('keydown', function (e) {
    var expected = KONAMI[streak];
    var pressed = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    if (pressed === expected) {
      streak++;
      if (streak === KONAMI.length) {
        streak = 0;
        showAchievement();
      }
    } else {
      streak = pressed === KONAMI[0] ? 1 : 0;
    }
  });

  function showAchievement() {
    if (document.querySelector('.achievement')) return;

    var box = document.createElement('div');
    box.className = 'achievement';
    box.setAttribute('role', 'status');
    box.innerHTML =
      '<span class="toast-key">LOGRO DESBLOQUEADO</span>' +
      '<b>Código Konami</b>' +
      '<small>Sabes buscar. Eso ya dice mucho. Escríbeme.</small>';

    Object.assign(box.style, {
      position: 'fixed',
      left: '50%',
      bottom: '32px',
      transform: 'translateX(-50%)',
      zIndex: '400',
      display: 'grid',
      gap: '4px',
      padding: '16px 22px',
      border: '1px solid #34343a',
      background: 'rgba(20,20,22,.97)',
      boxShadow: '6px 6px 0 rgba(0,0,0,.5)',
      textAlign: 'center'
    });
    box.querySelector('small').style.cssText =
      'font-family:"JetBrains Mono",monospace;font-size:11px;color:#9a978f';

    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 5200);
  }
})();
