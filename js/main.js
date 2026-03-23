document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // i18n — Language Detection & Switching
  // ============================================

  const SUPPORTED_LANGS = ['ht', 'en', 'fr'];
  const DEFAULT_LANG = 'ht';

  function detectLanguage() {
    // 1. Check localStorage for a saved user preference
    const saved = localStorage.getItem('uppch_lang');
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;

    // 2. Check browser language (navigator.language returns e.g. "en-US", "fr-FR", "ht")
    const browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browser.startsWith('fr')) return 'fr';
    if (browser.startsWith('en')) return 'en';
    if (browser.startsWith('ht')) return 'ht';

    // 3. Default to Haitian Creole
    return DEFAULT_LANG;
  }

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    const t = translations[lang];

    // Update <html lang=""> attribute for accessibility & SEO
    document.documentElement.lang = lang;

    // Swap every element that has a data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        // Use innerHTML for elements that may contain nested tags (like <br>)
        el.innerHTML = t[key];
      }
    });

    // Swap placeholder attributes (inputs/textareas)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.placeholder = t[key];
      }
    });

    // Update active state on language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Update mission tab text in the JS content object to match language
    updateMissionContent(lang);
  }

  function setLanguage(lang) {
    localStorage.setItem('uppch_lang', lang);
    applyLanguage(lang);
  }

  // Language switcher button clicks
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(this.getAttribute('data-lang'));
    });
  });

  // Run on page load
  const currentLang = detectLanguage();
  applyLanguage(currentLang);


  // ============================================
  // Toggle mobile nav menu
  // ============================================
  const menuBtn = document.querySelector('.menu-btn');
  const rightText = document.querySelector('.bottom-nav .right-text');

  if (menuBtn && rightText) {
    menuBtn.addEventListener('click', function () {
      menuBtn.classList.toggle('active');
      rightText.classList.toggle('active');
    });

    document.querySelectorAll('.bottom-nav .right-text a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuBtn.classList.remove('active');
        rightText.classList.remove('active');
      });
    });
  }


  // ============================================
  // Read More / Read Less — About section
  // ============================================
  const aboutBtn = document.querySelector('.about-read-btn');
  const aboutPara = document.querySelector('.about-card-left p:nth-child(4)');

  if (aboutBtn && aboutPara) {
    aboutBtn.addEventListener('click', function () {
      const isVisible = aboutPara.style.display === 'block';
      aboutPara.style.display = isVisible ? 'none' : 'block';
      // Update button text in current language
      const lang = localStorage.getItem('uppch_lang') || detectLanguage();
      const t = translations[lang];
      aboutBtn.setAttribute('data-i18n', isVisible ? 'about_btn' : 'about_btn_less');
      aboutBtn.textContent = isVisible ? t['about_btn'] : (t['about_btn_less'] || 'Read Less');
    });
  }


  // ============================================
  // Read More / Read Less — Mission section
  // ============================================
  const missionBtn = document.querySelector('.mission-read-btn');
  const missionPara = document.querySelector('.mission-card-left p:nth-of-type(2)');

  if (missionBtn && missionPara) {
    missionBtn.addEventListener('click', function () {
      const isVisible = missionPara.style.display === 'block';
      missionPara.style.display = isVisible ? 'none' : 'block';
      const lang = localStorage.getItem('uppch_lang') || detectLanguage();
      const t = translations[lang];
      missionBtn.textContent = isVisible ? t['mission_btn'] : (t['mission_btn_less'] || 'Read Less');
    });
  }


  // ============================================
  // Custom play button — About section video
  // ============================================
  const playButton = document.getElementById('playButton');
  const video = document.getElementById('aboutVideo');

  if (playButton && video) {
    playButton.addEventListener('click', function () {
      video.play();
      video.setAttribute('controls', true);
      playButton.style.display = 'none';
    });
  }


  // ============================================
  // Mission tabs
  // ============================================
  const tabs = document.querySelectorAll('.mission-tabs span');
  const missionText = document.querySelector('.mission-card-right p');

  function updateMissionContent(lang) {
    if (!missionText) return;
    const t = translations[lang];
    // Find the currently active tab and show its content
    const activeTab = document.querySelector('.mission-tabs span.active');
    if (!activeTab) return;
    const index = Array.from(tabs).indexOf(activeTab);
    const keys = ['mission_text_mission', 'mission_text_vision', 'mission_text_goals'];
    if (keys[index] && t[keys[index]]) {
      missionText.textContent = t[keys[index]];
    }
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');

      const lang = localStorage.getItem('uppch_lang') || detectLanguage();
      const t = translations[lang];
      const keys = ['mission_text_mission', 'mission_text_vision', 'mission_text_goals'];
      if (missionText && t[keys[index]]) {
        missionText.textContent = t[keys[index]];
      }
    });
  });

});
