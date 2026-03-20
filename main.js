/**
 * main.js — Shared interactions
 * Encoding: UTF-8
 */

// ── Custom Cursor ──────────────────────────────────────────
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top  = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .btn-primary, .btn-outline, .glass-card, .magnetic-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
});

// ── Scroll Reveal ──────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-img').forEach(el => {
  revealObserver.observe(el);
});

// ── Navbar Scroll Effect ───────────────────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(14,14,14,0.97)';
  } else {
    navbar.style.background = 'rgba(14,14,14,0.85)';
  }
});

// ── Magnetic Button ────────────────────────────────────────
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) * 0.35;
    const dy   = (e.clientY - cy) * 0.35;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
  });
  btn.addEventListener('mouseenter', () => {
    btn.style.transition = 'transform 0.1s linear';
  });
});

// ── Hero Stagger (home only) ────────────────────────────────
const staggerEls = document.querySelectorAll('[data-stagger]');
staggerEls.forEach((el, i) => {
  el.style.animationDelay = `${0.5 + i * 0.18}s`;
  el.classList.add('stagger-init');
  requestAnimationFrame(() => el.classList.add('stagger-play'));
});
