// script.js — navigation toggle, form validation, small helpers
document.addEventListener('DOMContentLoaded', () => {
  // ==========================
  // Set current year on footers
  // ==========================
  const years = ['year', 'year-about', 'year-resume', 'year-projects', 'year-orgs', 'year-contact'];
  years.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  // ==========================
  // Mobile nav toggle
  // ==========================
  const toggles = document.querySelectorAll('[id^=nav-toggle]');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = btn.nextElementSibling;
      if (!nav) return;
      nav.style.display = (nav.style.display === 'flex' || nav.style.display === 'block') ? 'none' : 'flex';
    });
  });

  // Close nav when link clicked (mobile)
  document.querySelectorAll('.site-nav a').forEach(a => {
    a.addEventListener('click', () => {
      const nav = a.closest('.site-nav');
      if (nav && window.innerWidth <= 880) nav.style.display = 'none';
    });
  });

  // ==========================
  // Contact form validation
  // ==========================
  const form = document.getElementById('contact-form');
  if (form) {
    const msg = document.getElementById('form-msg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.textContent = '';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Please fill out all fields.';
        return;
      }

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Please enter a valid email address.';
        return;
      }

      msg.style.color = '#047857';
      msg.textContent = 'Message queued — thank you! (This demo does not send emails.)';
      form.reset();
    });
  }

  // ==========================
  // Accessibility: Escape closes mobile nav
  // ==========================
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.site-nav').forEach(n => {
        if (window.innerWidth <= 880) n.style.display = 'none';
      });
    }
  });

  // ==========================
  // 🌓 Dark Mode Toggle
  // ==========================
  const toggle = document.createElement('button');
  toggle.textContent = '🌓';
  toggle.setAttribute('aria-label', 'Toggle dark mode');
  toggle.style.position = 'fixed';
  toggle.style.bottom = '20px';
  toggle.style.right = '20px';
  toggle.style.padding = '10px 12px';
  toggle.style.borderRadius = '50%';
  toggle.style.fontSize = '1.2rem';
  toggle.style.cursor = 'pointer';
  toggle.style.border = 'none';
  toggle.style.background = '#444';
  toggle.style.color = '#fff';
  toggle.style.zIndex = '9999';
  toggle.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
  toggle.style.transition = 'transform 0.2s ease';
  toggle.addEventListener('mouseenter', () => toggle.style.transform = 'scale(1.1)');
  toggle.addEventListener('mouseleave', () => toggle.style.transform = 'scale(1)');
  document.body.appendChild(toggle);

  // Inject light mode styles
  const style = document.createElement('style');
  style.textContent = `
    .light-mode {
      background-color: #f5f5f5;
      color: #222;
    }
    .light-mode a { color: #007bff; }
    .light-mode .card { background: #fff; color: #000; }
    .light-mode .site-header,
    .light-mode .site-footer { background: #ddd; color: #000; }
    .light-mode .btn { background: #007bff; color: #fff; }
    .light-mode .btn.ghost { border-color: #007bff; color: #007bff; }
  `;
  document.head.appendChild(style);

  // Remember dark mode preference
  const savedMode = localStorage.getItem('theme');
  if (savedMode === 'light') document.body.classList.add('light-mode');

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);
  });
});
