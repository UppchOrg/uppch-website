document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // i18n — Language Detection & Switching
  // ============================================

  const SUPPORTED_LANGS = ['ht', 'en', 'fr'];
  const DEFAULT_LANG = 'en';

  const LANG_LABELS = {
    ht: 'Kreyòl',
    en: 'English',
    fr: 'Français',
  };

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

    // Update all dropdown buttons to show active lang label
    document.querySelectorAll('.lang-dropdown-btn').forEach(function (btn) {
      const labelSpan = btn.querySelector('.lang-label');
      if (labelSpan) labelSpan.textContent = LANG_LABELS[lang] || lang;
    });

    // Update active state on options
    document.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });
  }

  function setLanguage(lang) {
    localStorage.setItem('uppch_lang', lang);
    applyLanguage(lang);
    // Close all dropdowns
    document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.lang-dropdown-btn').forEach(b => b.classList.remove('open'));
  }

  // Build dropdown functionality
  function initLangDropdowns() {
    const currentLang = detectLanguage();

    document.querySelectorAll('.lang-dropdown-wrapper, .mobile-lang-wrapper').forEach(function (wrapper) {
      const btn = wrapper.querySelector('.lang-dropdown-btn');
      const menu = wrapper.querySelector('.lang-dropdown-menu');
      if (!btn || !menu) return;

      // Populate options if empty (in case HTML is minimal)
      if (!menu.children.length) {
        SUPPORTED_LANGS.forEach(function (lang) {
          const opt = document.createElement('button');
          opt.className = 'lang-option' + (lang === currentLang ? ' active' : '');
          opt.setAttribute('data-lang', lang);
          opt.textContent = LANG_LABELS[lang];
          menu.appendChild(opt);
        });
      }

      // Toggle dropdown
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        // Close all others first
        document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.remove('open'));
        document.querySelectorAll('.lang-dropdown-btn').forEach(b => b.classList.remove('open'));
        if (!isOpen) {
          menu.classList.add('open');
          btn.classList.add('open');
        }
      });

      // Option click
      menu.querySelectorAll('.lang-option').forEach(function (opt) {
        opt.addEventListener('click', function () {
          setLanguage(this.getAttribute('data-lang'));
        });
      });
    });

    // Close on outside click
    document.addEventListener('click', function () {
      document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.remove('open'));
      document.querySelectorAll('.lang-dropdown-btn').forEach(b => b.classList.remove('open'));
    });
  }

  initLangDropdowns();
  applyLanguage(detectLanguage());


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

      const page = document.body.getAttribute('data-page') || 'ed1';
      const lang = localStorage.getItem('uppch_lang') || detectLanguage();
      const t = translations[lang];
      const key = isHidden ? page + '_read_less' : page + '_read_more';
      readMoreBtn.textContent = t[key] || (isHidden ? 'Read Less' : 'Read More');
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
    if (thumbnail) thumbnail.style.display = 'none';
    if (playButton) playButton.style.display = 'none';
    if (video) {
      video.style.display = 'block';
      video.play();
    }
  }

  if (playButton) playButton.addEventListener('click', playVideo);
  if (watchVidBtn) {
    watchVidBtn.addEventListener('click', function (e) {
      e.preventDefault();
      playVideo();
      const target = document.querySelector('.video-placeholder, .video-placeholder2');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

});
