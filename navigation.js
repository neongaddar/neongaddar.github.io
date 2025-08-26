/**
 * Modern Navigation System for NEONPAY API Documentation
 * Optimized for performance, accessibility, and user experience
 */

class ModernNavigation {
  constructor() {
    this.config = {
      pages: [
        { href: "index.html", key: "home", icon: "🏠" },
        { href: "quick-start.html", key: "quickStart", icon: "🚀" },
        { href: "api-docs.html", key: "apiDocs", icon: "📚" },
        { href: "examples.html", key: "examples", icon: "💡" },
        { href: "libraries.html", key: "libraries", icon: "🔧" },
      ],
      
      languages: [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "ru", name: "Русский", flag: "🇷🇺" },
        { code: "az", name: "Azərbaycan", flag: "🇦🇿" },
      ],

      translations: {
        en: {
          home: "Home",
          quickStart: "Quick Start",
          apiDocs: "API Docs",
          examples: "Examples",
          libraries: "Libraries",
          language: "Language",
          menu: "Menu",
          close: "Close",
        },
        ru: {
          home: "Главная",
          quickStart: "Быстрый старт",
          apiDocs: "API документация",
          examples: "Примеры",
          libraries: "Библиотеки",
          language: "Язык",
          menu: "Меню",
          close: "Закрыть",
        },
        az: {
          home: "Ana səhifə",
          quickStart: "Sürətli başlanğıc",
          apiDocs: "API sənədləri",
          examples: "Nümunələr",
          libraries: "Kitabxanalar",
          language: "Dil",
          menu: "Menyu",
          close: "Bağla",
        },
      }
    };

    this.state = {
      currentLang: this.getSavedLanguage(),
      currentPage: this.getCurrentPage(),
      isMenuOpen: false,
      isScrolled: false,
    };

    this.elements = {};
    this.observers = new Set();
    
    // Bind methods
    this.handleScroll = this.throttle(this.handleScroll.bind(this), 16);
    this.handleResize = this.debounce(this.handleResize.bind(this), 250);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  /**
   * Initialize the navigation system
   */
  init() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
    this.setupScrollEffects();
    this.applyLanguage();
    
    // Preload critical resources
    this.preloadPages();
    
    console.log('🚀 Modern Navigation initialized');
  }

  /**
   * Render the navigation HTML
   */
  render() {
    const container = document.querySelector("header") || document.getElementById("navbar-container");
    if (!container) {
      console.error('Navigation container not found');
      return;
    }

    const t = this.config.translations[this.state.currentLang];
    
    container.innerHTML = `
      <nav class="modern-nav" role="navigation" aria-label="Main navigation">
        <div class="nav-container">
          <!-- Logo -->
          <a href="index.html" class="nav-logo" aria-label="NEONPAY API Home">
            <span class="logo-icon">⚡</span>
            <span class="logo-text">NEONPAY API</span>
          </a>

          <!-- Desktop Navigation -->
          <ul class="nav-links" role="menubar">
            ${this.config.pages.map(page => `
              <li role="none">
                <a href="${page.href}" 
                   class="nav-link ${page.href === this.state.currentPage ? 'active' : ''}"
                   role="menuitem"
                   data-page="${page.key}">
                  <span class="nav-icon">${page.icon}</span>
                  <span class="nav-text">${t[page.key]}</span>
                </a>
              </li>
            `).join('')}
          </ul>

          <!-- Controls -->
          <div class="nav-controls">
            <!-- Language Selector -->
            <div class="language-selector" role="group" aria-label="${t.language}">
              <button class="lang-toggle" 
                      aria-expanded="false" 
                      aria-haspopup="true"
                      aria-label="${t.language}: ${this.config.languages.find(l => l.code === this.state.currentLang)?.name}">
                <span class="lang-flag">${this.config.languages.find(l => l.code === this.state.currentLang)?.flag}</span>
                <span class="lang-code">${this.state.currentLang.toUpperCase()}</span>
                <svg class="lang-arrow" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 8L2 4h8L6 8z"/>
                </svg>
              </button>
              
              <div class="lang-dropdown" role="menu" aria-hidden="true">
                ${this.config.languages.map(lang => `
                  <button class="lang-option ${lang.code === this.state.currentLang ? 'active' : ''}"
                          role="menuitem"
                          data-lang="${lang.code}"
                          aria-label="Switch to ${lang.name}">
                    <span class="lang-flag">${lang.flag}</span>
                    <span class="lang-name">${lang.name}</span>
                    ${lang.code === this.state.currentLang ? '<span class="checkmark">✓</span>' : ''}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Mobile Menu Button -->
            <button class="mobile-menu-btn" 
                    aria-expanded="false"
                    aria-controls="mobile-menu"
                    aria-label="${t.menu}">
              <span class="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
          <div class="mobile-menu-content">
            <ul class="mobile-nav-links" role="menu">
              ${this.config.pages.map(page => `
                <li role="none">
                  <a href="${page.href}" 
                     class="mobile-nav-link ${page.href === this.state.currentPage ? 'active' : ''}"
                     role="menuitem"
                     data-page="${page.key}">
                    <span class="nav-icon">${page.icon}</span>
                    <span class="nav-text">${t[page.key]}</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="scroll-progress" aria-hidden="true"></div>
      </nav>
    `;

    this.cacheElements();
  }

  /**
   * Cache DOM elements for better performance
   */
  cacheElements() {
    this.elements = {
      nav: document.querySelector('.modern-nav'),
      mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
      mobileMenu: document.querySelector('.mobile-menu'),
      langToggle: document.querySelector('.lang-toggle'),
      langDropdown: document.querySelector('.lang-dropdown'),
      scrollProgress: document.querySelector('.scroll-progress'),
      navLinks: document.querySelectorAll('.nav-link, .mobile-nav-link'),
      langOptions: document.querySelectorAll('.lang-option'),
    };
  }

  /**
   * Setup all event listeners
   */
  setupEventListeners() {
    // Mobile menu toggle
    this.elements.mobileMenuBtn?.addEventListener('click', () => this.toggleMobileMenu());
    
    // Language selector
    this.elements.langToggle?.addEventListener('click', () => this.toggleLanguageDropdown());
    
    // Language options
    this.elements.langOptions?.forEach(option => {
      option.addEventListener('click', (e) => {
        const lang = e.currentTarget.dataset.lang;
        this.setLanguage(lang);
      });
    });

    // Navigation links
    this.elements.navLinks?.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
    
    // Scroll and resize handlers
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize);
    
    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeyboard);

    // Page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.closeMobileMenu();
        this.closeLanguageDropdown();
      }
    });
  }

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    // Focus trap for mobile menu
    this.setupFocusTrap();
    
    // Announce language changes to screen readers
    this.createAriaLiveRegion();
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--nav-transition-duration', '0s');
    }
  }

  /**
   * Setup scroll effects
   */
  setupScrollEffects() {
    // Intersection Observer for scroll progress
    if ('IntersectionObserver' in window) {
      const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.updateScrollProgress();
          }
        });
      });
      
      document.querySelectorAll('section, main').forEach(section => {
        progressObserver.observe(section);
      });
      
      this.observers.add(progressObserver);
    }
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    const scrolled = window.scrollY > 20;
    
    if (scrolled !== this.state.isScrolled) {
      this.state.isScrolled = scrolled;
      this.elements.nav?.classList.toggle('scrolled', scrolled);
    }
    
    this.updateScrollProgress();
  }

  /**
   * Update scroll progress bar
   */
  updateScrollProgress() {
    if (!this.elements.scrollProgress) return;
    
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    this.elements.scrollProgress.style.width = `${Math.min(scrolled, 100)}%`;
  }

  /**
   * Handle resize events
   */
  handleResize() {
    if (window.innerWidth > 768 && this.state.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Handle keyboard navigation
   */
  handleKeyboard(e) {
    switch (e.key) {
      case 'Escape':
        this.closeMobileMenu();
        this.closeLanguageDropdown();
        break;
      case 'Tab':
        if (this.state.isMenuOpen) {
          this.handleTabInMobileMenu(e);
        }
        break;
    }
  }

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu() {
    this.state.isMenuOpen = !this.state.isMenuOpen;
    
    this.elements.mobileMenuBtn?.setAttribute('aria-expanded', this.state.isMenuOpen);
    this.elements.mobileMenu?.setAttribute('aria-hidden', !this.state.isMenuOpen);
    
    document.body.classList.toggle('nav-menu-open', this.state.isMenuOpen);
    
    if (this.state.isMenuOpen) {
      this.elements.mobileMenu?.querySelector('.mobile-nav-link')?.focus();
    }
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    if (!this.state.isMenuOpen) return;
    
    this.state.isMenuOpen = false;
    this.elements.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    this.elements.mobileMenu?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-menu-open');
  }

  /**
   * Toggle language dropdown
   */
  toggleLanguageDropdown() {
    const isOpen = this.elements.langToggle?.getAttribute('aria-expanded') === 'true';
    const newState = !isOpen;
    
    this.elements.langToggle?.setAttribute('aria-expanded', newState);
    this.elements.langDropdown?.setAttribute('aria-hidden', !newState);
    
    if (newState) {
      this.elements.langDropdown?.querySelector('.lang-option:not(.active)')?.focus();
    }
  }

  /**
   * Close language dropdown
   */
  closeLanguageDropdown() {
    this.elements.langToggle?.setAttribute('aria-expanded', 'false');
    this.elements.langDropdown?.setAttribute('aria-hidden', 'true');
  }

  /**
   * Handle outside clicks
   */
  handleOutsideClick(e) {
    if (!this.elements.langToggle?.contains(e.target) && 
        !this.elements.langDropdown?.contains(e.target)) {
      this.closeLanguageDropdown();
    }
    
    if (!this.elements.nav?.contains(e.target) && this.state.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Set language
   */
  setLanguage(lang) {
    if (lang === this.state.currentLang) return;
    
    this.state.currentLang = lang;
    localStorage.setItem('preferred-language', lang);
    
    this.closeLanguageDropdown();
    this.render();
    this.setupEventListeners();
    this.applyLanguage();
    
    // Announce to screen readers
    this.announceLanguageChange(lang);
  }

  /**
   * Apply language to page content
   */
  applyLanguage() {
    if (window.applyTranslations) {
      window.applyTranslations(this.state.currentLang, this.config.translations[this.state.currentLang]);
    }
    
    // Update document language
    document.documentElement.lang = this.state.currentLang;
  }

  /**
   * Utility functions
   */
  getSavedLanguage() {
    return localStorage.getItem('preferred-language') || 
           navigator.language.split('-')[0] || 'en';
  }

  getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Accessibility helpers
   */
  setupFocusTrap() {
    // Implementation for focus trap in mobile menu
  }

  createAriaLiveRegion() {
    if (!document.getElementById('nav-announcements')) {
      const liveRegion = document.createElement('div');
      liveRegion.id = 'nav-announcements';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
      document.body.appendChild(liveRegion);
    }
  }

  announceLanguageChange(lang) {
    const liveRegion = document.getElementById('nav-announcements');
    const langName = this.config.languages.find(l => l.code === lang)?.name;
    if (liveRegion && langName) {
      liveRegion.textContent = `Language changed to ${langName}`;
    }
  }

  /**
   * Preload critical pages
   */
  preloadPages() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.config.pages.forEach(page => {
          if (page.href !== this.state.currentPage) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page.href;
            document.head.appendChild(link);
          }
        });
      });
    }
  }

  /**
   * Cleanup method
   */
  destroy() {
    // Remove event listeners
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('keydown', this.handleKeyboard);
    
    // Disconnect observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    // Clean up DOM
    document.body.classList.remove('nav-menu-open');
  }
}

// CSS Styles (injected dynamically for better performance)
const modernNavStyles = `
  :root {
    --nav-height: 70px;
    --nav-bg: rgba(255, 255, 255, 0.95);
    --nav-border: #e5e7eb;
    --nav-text: #1f2937;
    --nav-text-hover: #6366f1;
    --nav-accent: #6366f1;
    --nav-transition-duration: 0.3s;
    --nav-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    --nav-shadow-scrolled: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .modern-nav {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: var(--nav-bg);
    border-bottom: 1px solid var(--nav-border);
    backdrop-filter: blur(20px);
    transition: all var(--nav-transition-duration) ease;
    box-shadow: var(--nav-shadow);
  }

  .modern-nav.scrolled {
    box-shadow: var(--nav-shadow-scrolled);
    background: rgba(255, 255, 255, 0.98);
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--nav-height);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--nav-accent);
    font-weight: 700;
    font-size: 1.25rem;
    transition: transform var(--nav-transition-duration) ease;
  }

  .nav-logo:hover {
    transform: scale(1.05);
  }

  .logo-icon {
    font-size: 1.5rem;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 0.5rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: var(--nav-text);
    font-weight: 500;
    border-radius: 0.5rem;
    transition: all var(--nav-transition-duration) ease;
    position: relative;
    overflow: hidden;
  }

  .nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
    transition: left var(--nav-transition-duration) ease;
  }

  .nav-link:hover::before {
    left: 100%;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--nav-text-hover);
    background: rgba(99, 102, 241, 0.1);
    transform: translateY(-1px);
  }

  .nav-icon {
    font-size: 1rem;
    opacity: 0.8;
  }

  .nav-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .language-selector {
    position: relative;
  }

  .lang-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: none;
    border: 1px solid var(--nav-border);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all var(--nav-transition-duration) ease;
    font-size: 0.875rem;
  }

  .lang-toggle:hover {
    border-color: var(--nav-accent);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }

  .lang-arrow {
    transition: transform var(--nav-transition-duration) ease;
  }

  .lang-toggle[aria-expanded="true"] .lang-arrow {
    transform: rotate(180deg);
  }

  .lang-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: white;
    border: 1px solid var(--nav-border);
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    min-width: 150px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all var(--nav-transition-duration) ease;
    z-index: 1001;
  }

  .lang-toggle[aria-expanded="true"] + .lang-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .lang-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: background var(--nav-transition-duration) ease;
    font-size: 0.875rem;
  }

  .lang-option:hover {
    background: rgba(99, 102, 241, 0.05);
  }

  .lang-option.active {
    background: rgba(99, 102, 241, 0.1);
    color: var(--nav-accent);
  }

  .checkmark {
    margin-left: auto;
    color: var(--nav-accent);
  }

  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background var(--nav-transition-duration) ease;
  }

  .mobile-menu-btn:hover {
    background: rgba(99, 102, 241, 0.1);
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 20px;
    height: 16px;
  }

  .hamburger span {
    display: block;
    height: 2px;
    background: var(--nav-text);
    border-radius: 1px;
    transition: all var(--nav-transition-duration) ease;
    transform-origin: center;
  }

  .mobile-menu-btn[aria-expanded="true"] .hamburger span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .mobile-menu-btn[aria-expanded="true"] .hamburger span:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-btn[aria-expanded="true"] .hamburger span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-bottom: 1px solid var(--nav-border);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: all var(--nav-transition-duration) ease;
  }

  .mobile-menu[aria-hidden="false"] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .mobile-menu-content {
    padding: 1rem;
  }

  .mobile-nav-links {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .mobile-nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    text-decoration: none;
    color: var(--nav-text);
    border-radius: 0.5rem;
    transition: all var(--nav-transition-duration) ease;
    margin-bottom: 0.5rem;
  }

  .mobile-nav-link:hover,
  .mobile-nav-link.active {
    background: rgba(99, 102, 241, 0.1);
    color: var(--nav-accent);
    transform: translateX(5px);
  }

  .scroll-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--nav-accent), #4ade80);
    transition: width 0.1s ease;
    border-radius: 0 1px 1px 0;
  }

  body.nav-menu-open {
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .mobile-menu-btn {
      display: block;
    }

    .nav-container {
      padding: 0 1rem;
    }

    .lang-dropdown {
      right: auto;
      left: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --nav-bg: rgba(17, 24, 39, 0.95);
      --nav-border: #374151;
      --nav-text: #f9fafb;
      --nav-text-hover: #818cf8;
    }

    .lang-dropdown,
    .mobile-menu {
      background: #1f2937;
      border-color: #374151;
    }
  }
`;

// Inject styles
function injectStyles() {
  if (!document.getElementById('modern-nav-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'modern-nav-styles';
    styleSheet.textContent = modernNavStyles;
    document.head.appendChild(styleSheet);
  }
}

// Initialize navigation
function initializeModernNavigation() {
  injectStyles();
  
  const nav = new ModernNavigation();
  nav.init();
  
  // Expose for debugging
  window.modernNav = nav;
  
  return nav;
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeModernNavigation);
} else {
  initializeModernNavigation();
}

// Export for manual initialization
window.initializeModernNavigation = initializeModernNavigation;