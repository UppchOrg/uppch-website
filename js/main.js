document.addEventListener('DOMContentLoaded', function () {

  const SUPPORTED_LANGS = ['ht', 'en', 'fr'];
  const DEFAULT_LANG    = 'en';  // ← English default
  const LANG_LABELS     = { ht: 'Kreyòl', en: 'English', fr: 'Français' };
  const MISSION_KEYS    = ['mission_text_mission', 'mission_text_vision', 'mission_text_goals'];

  const missionText = document.getElementById('missionText');
  const tabs        = document.querySelectorAll('.mission-tabs span');
  let   activeMissionIndex = 0;

  // ── Swiper — photo strip ────────────────────────
  if (document.querySelector('.heroSwiper')) {
    new Swiper('.heroSwiper', {
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        640:  { slidesPerView: 2, spaceBetween: 3 },
        1024: { slidesPerView: 3, spaceBetween: 3 },
      },
    });
  }

  // ── Scroll reveal ───────────────────────────────
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  // ── Language helpers ────────────────────────────
  function detectLanguage() {
    const saved = localStorage.getItem('uppch_lang');
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    const browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browser.startsWith('fr')) return 'fr';
    if (browser.startsWith('ht')) return 'ht';
    return DEFAULT_LANG;
  }

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    const t = translations[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (t[key] === undefined) return;
      // Preserve .active class on mission tab spans
      if (el.tagName === 'SPAN' && el.closest('.mission-tabs')) {
        el.textContent = t[key];
      } else {
        el.innerHTML = t[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    // Update desktop dropdown button label
    document.querySelectorAll('.lang-dropdown-btn').forEach(function (btn) {
      const lbl = btn.querySelector('.lang-label');
      if (lbl) lbl.textContent = LANG_LABELS[lang] || lang;
    });

    // Update desktop dropdown option active state
    document.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    // Update mobile lang pill active state
    document.querySelectorAll('.mobile-lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Mission text in sync with current active tab
    if (missionText && t[MISSION_KEYS[activeMissionIndex]]) {
      missionText.textContent = t[MISSION_KEYS[activeMissionIndex]];
    }
  }

  function setLanguage(lang) {
    localStorage.setItem('uppch_lang', lang);
    applyLanguage(lang);
    closeAllDropdowns();
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.lang-dropdown-btn').forEach(b => b.classList.remove('open'));
  }

  // ── Desktop dropdown ────────────────────────────
  function initLangDropdowns() {
    document.querySelectorAll('.lang-dropdown-wrapper').forEach(function (wrapper) {
      const btn  = wrapper.querySelector('.lang-dropdown-btn');
      const menu = wrapper.querySelector('.lang-dropdown-menu');
      if (!btn || !menu) return;

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) { menu.classList.add('open'); btn.classList.add('open'); }
      });

      menu.querySelectorAll('.lang-option').forEach(function (opt) {
        opt.addEventListener('click', function (e) {
          e.stopPropagation();
          setLanguage(this.getAttribute('data-lang'));
        });
      });
    });
    document.addEventListener('click', closeAllDropdowns);
  }

  initLangDropdowns();
  applyLanguage(detectLanguage());

  // ── Mission tabs ────────────────────────────────
  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      activeMissionIndex = index;
      const lang = localStorage.getItem('uppch_lang') || detectLanguage();
      const t    = translations[lang];
      if (missionText && t[MISSION_KEYS[index]]) {
        missionText.textContent = t[MISSION_KEYS[index]];
      }
    });
  });

  // ── Mobile nav ──────────────────────────────────
  const menuBtn       = document.querySelector('.menu-btn');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const mobileClose   = document.getElementById('mobileNavClose');

  function openMobileNav() {
    if (!mobileOverlay) return;
    mobileOverlay.classList.add('active');
    if (menuBtn) menuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileOverlay) return;
    mobileOverlay.classList.remove('active');
    if (menuBtn) menuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', function () {
    mobileOverlay.classList.contains('active') ? closeMobileNav() : openMobileNav();
  });

  // ✕ button inside panel
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);

  // Close on backdrop click (outside panel)
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', function (e) {
      if (e.target === mobileOverlay) closeMobileNav();
    });
  }

  // Close on nav link click
  if (mobileOverlay) {
    mobileOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // Mobile lang pill buttons — simple, no dropdown
  document.querySelectorAll('.mobile-lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(this.getAttribute('data-lang'));
      // Don't close the menu — let user see the change applied
    });
  });

  // ── About Read More ─────────────────────────────
  const aboutBtn  = document.querySelector('.about-read-btn');
  const aboutPara = document.querySelector('.about-left p[data-i18n="about_left_p3"]');

  if (aboutBtn && aboutPara) {
    aboutBtn.addEventListener('click', function () {
      const isVisible = aboutPara.style.display === 'block';
      aboutPara.style.display = isVisible ? 'none' : 'block';
      const lang = localStorage.getItem('uppch_lang') || detectLanguage();
      const t    = translations[lang];
      aboutBtn.textContent = isVisible ? t['about_btn'] : (t['about_btn_less'] || 'Read Less');
    });
  }

  // ── Mission Read More ───────────────────────────
  const missionBtn  = document.querySelector('.mission-read-btn');
  const missionPara = document.querySelector('.mission-card-left p:nth-of-type(2)');

  if (missionBtn && missionPara) {
    missionBtn.addEventListener('click', function () {
      const isVisible = missionPara.style.display === 'block';
      missionPara.style.display = isVisible ? 'none' : 'block';
      const lang = localStorage.getItem('uppch_lang') || detectLanguage();
      const t    = translations[lang];
      missionBtn.textContent = isVisible ? t['mission_btn'] : (t['mission_btn_less'] || 'Read Less');
    });
  }

  // ── Video play button ───────────────────────────
  const playButton = document.getElementById('playButton');
  const video      = document.getElementById('aboutVideo');

  if (playButton && video) {
    playButton.addEventListener('click', function () {
      video.play();
      video.setAttribute('controls', true);
      playButton.style.display = 'none';
    });
  }

});
