/* =============================================================
   Dra. Raquel — script.js
   Reveals on scroll · Máscara WhatsApp · Submit (placeholder)
   ============================================================= */
(function () {
  'use strict';

  /* ---------- Ano dinâmico ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Máscara WhatsApp BR ---------- */
  var whatsapp = document.getElementById('whatsapp');
  if (whatsapp) {
    whatsapp.addEventListener('input', function (e) {
      var v = e.target.value.replace(/\D/g, '').slice(0, 11);
      var out = v;
      if (v.length > 0) out = '(' + v.slice(0, 2);
      if (v.length >= 3 && v.length <= 6) out += ') ' + v.slice(2);
      else if (v.length >= 7 && v.length <= 10) out += ') ' + v.slice(2, 6) + '-' + v.slice(6);
      else if (v.length === 11) out += ') ' + v.slice(2, 7) + '-' + v.slice(7);
      e.target.value = out;
    });
  }

  /* ---------- Submit (placeholder) ---------- */
  var form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // validação simples
      var ok = true;
      ['nome', 'whatsapp', 'quem'].forEach(function (id) {
        var el = document.getElementById(id);
        var field = el && el.closest('.field');
        if (!el || !el.value || (id === 'whatsapp' && el.value.replace(/\D/g, '').length < 10)) {
          if (field) field.classList.add('is-error');
          ok = false;
        } else if (field) {
          field.classList.remove('is-error');
        }
      });
      if (!ok) return;

      // Meta Pixel — placeholder (descomentar após adicionar ID real)
      // if (window.fbq) fbq('track', 'Lead');

      // Envio real seria aqui (POST -> pixel.php / endpoint Meta CAPI)
      // fetch('pixel.php', { method:'POST', body: new FormData(form) });

      window.location.href = 'obrigado/';
    });
  }
})();
