/* ============================================================
   Portafolio SOG77 — interacciones
   Vanilla JS, sin dependencias (funciona en GitHub Pages tal cual)
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     IDIOMA — ES / EN
     El español vive en el HTML; el inglés en i18n.js.
     Orden de prioridad: ?lang= → lo guardado → idioma del navegador.
     ============================================================ */
  var DICT = window.I18N || { es: {}, en: {} };
  var lang = 'es';

  function detectLang() {
    var fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl === 'en' || fromUrl === 'es') return fromUrl;

    try {
      var saved = localStorage.getItem('sog77-lang');
      if (saved === 'en' || saved === 'es') return saved;
    } catch (e) { /* modo privado o cookies bloqueadas */ }

    return (navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }

  function applyLang(next) {
    var dict = DICT[next];
    if (!dict) return;
    lang = next;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = dict[el.getAttribute('data-i18n')];
      if (typeof value === 'string') el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var value = dict[el.getAttribute('data-i18n-alt')];
      if (typeof value === 'string') el.setAttribute('alt', value);
    });

    document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
      var value = dict[el.getAttribute('data-i18n-content')];
      if (typeof value === 'string') el.setAttribute('content', value);
    });

    document.documentElement.lang = next;
    if (dict['meta.title']) document.title = dict['meta.title'];

    // el CV cambia de idioma junto con la página
    ['cvLink', 'cvLink2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && dict._cv) el.setAttribute('href', dict._cv);
    });

    document.querySelectorAll('.lang button[data-lang]').forEach(function (btn) {
      var on = btn.getAttribute('data-lang') === next;
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    try { localStorage.setItem('sog77-lang', next); } catch (e) { /* sin persistencia */ }

    restartTyping();
  }

  document.querySelectorAll('.lang button[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

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
      burger.setAttribute('aria-label', lang === 'en' ? 'Open menu' : 'Abrir menú');
    }
  }

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label',
        open ? (lang === 'en' ? 'Close menu' : 'Cerrar menú')
             : (lang === 'en' ? 'Open menu' : 'Abrir menú'));
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
  var typingTimer = null;
  var typingToken = 0;

  function restartTyping() {
    if (!typed) return;
    var roles = (DICT[lang] && DICT[lang]._roles) || ['Full Stack Developer'];

    clearTimeout(typingTimer);
    typingToken++;
    var myToken = typingToken;

    if (reduceMotion) { typed.textContent = roles[0]; return; }

    var roleIndex = 0, charIndex = 0, deleting = false;
    typed.textContent = '';

    (function loop() {
      if (myToken !== typingToken) return;   // se cambió de idioma: este ciclo muere

      var role = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      typed.textContent = role.slice(0, charIndex);

      var delay = deleting ? 34 : 66;

      if (!deleting && charIndex === role.length) {
        deleting = true;
        delay = 2000;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 300;
      }
      typingTimer = setTimeout(loop, delay);
    })();
  }

  /* ---------- Easter egg: código Konami ---------- */
  var KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  var streak = 0;

  document.addEventListener('keydown', function (e) {
    var pressed = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    if (pressed === KONAMI[streak]) {
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

    var copy = lang === 'en'
      ? { key: 'ACHIEVEMENT UNLOCKED', title: 'Konami Code',
          sub: 'You know how to look. That says a lot. Get in touch.' }
      : { key: 'LOGRO DESBLOQUEADO', title: 'Código Konami',
          sub: 'Sabes buscar. Eso ya dice mucho. Escríbeme.' };

    var box = document.createElement('div');
    box.className = 'achievement';
    box.setAttribute('role', 'status');
    box.innerHTML =
      '<span class="toast-key">' + copy.key + '</span>' +
      '<b>' + copy.title + '</b>' +
      '<small>' + copy.sub + '</small>';

    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 5200);
  }

  /* ---------- Arranque ---------- */
  applyLang(detectLang());
})();
