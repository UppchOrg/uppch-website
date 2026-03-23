document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // i18n — Language Detection & Switching
  // (mirrors main.js — shared translations.js)
  // ============================================

  const SUPPORTED_LANGS = ['ht', 'en', 'fr'];
  const DEFAULT_LANG = 'ht';

  function detectLanguage() {
    const saved = localStorage.getItem('uppch_lang');
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;

    const browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browser.startsWith('fr')) return 'fr';
    if (browser.startsWith('en')) return 'en';
    if (browser.startsWith('ht')) return 'ht';

    return DEFAULT_LANG;
  }

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    const t = translations[lang];

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.placeholder = t[key];
      }
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  function setLanguage(lang) {
    localStorage.setItem('uppch_lang', lang);
    applyLanguage(lang);
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(this.getAttribute('data-lang'));
    });
  });

  const currentLang = detectLanguage();
  applyLanguage(currentLang);


  // ============================================
  // Mobile hamburger menu
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeBtn');

  if (hamburger && mobileMenu && closeBtn) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.add('active');
    });
    closeBtn.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
    });
  }

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu) mobileMenu.classList.remove('active');
    });
  });


  // ============================================
  // Read More / Read Less — blog-start section
  // ============================================
  const readMoreBtn = document.getElementById('readMoreBtn');
  const moreText = document.querySelector('.more-text');

  if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener('click', function () {
      const isHidden = moreText.classList.contains('hidden');
      moreText.classList.toggle('hidden', !isHidden);

      // Determine which page we're on by checking the data-page attribute on body
      const page = document.body.getAttribute('data-page') || 'ed1';
      const lang = localStorage.getItem('uppch_lang') || detectLanguage();
      const t = translations[lang];
      const lessKey = page + '_read_less';
      const moreKey = page + '_read_more';

      readMoreBtn.textContent = isHidden
        ? (t[lessKey] || 'Read Less')
        : (t[moreKey] || 'Read More');
    });
  }


  // ============================================
  // Video Play Button + Watch Video Button
  // ============================================
  const playButton = document.getElementById('playButton');
  const watchVidBtn = document.querySelector('.watchVid');
  const thumbnail = document.querySelector('.video-thumbnail');
  const video = document.querySelector('.event-video');

  function playVideo() {
    if (playButton && thumbnail && video) {
      playButton.style.opacity = '0';
      thumbnail.style.display = 'none';
      video.style.display = 'block';
      video.play();
    }
  }

  if (playButton) playButton.addEventListener('click', playVideo);
  if (watchVidBtn) {
    watchVidBtn.addEventListener('click', function (e) {
      e.preventDefault();
      playVideo();
    });
  }

});
