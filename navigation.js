class Navigation {
  constructor() {
    this.pages = [
      { href: "index.html", key: "home" },
      { href: "about.html", key: "about" },
      { href: "quick-start.html", key: "quickStart" },
      { href: "api-docs.html", key: "apiDocs" },
      { href: "examples.html", key: "examples" },
      { href: "libraries.html", key: "libraries" },
    ]

    this.translations = {
      en: {
        home: "Home",
        about: "About",
        quickStart: "Quick Start",
        apiDocs: "API Docs",
        examples: "Examples",
        libraries: "Libraries",
        language: "Language",
      },
      ru: {
        home: "Главная",
        about: "О проекте",
        quickStart: "Быстрый старт",
        apiDocs: "API документация",
        examples: "Примеры",
        libraries: "Библиотеки",
        language: "Язык",
      },
      az: {
        home: "Ana səhifə",
        about: "Haqqında",
        quickStart: "Sürətli başlanğıc",
        apiDocs: "API sənədləri",
        examples: "Nümunələr",
        libraries: "Kitabxanalar",
        language: "Dil",
      },
    }

    this.currentLang = localStorage.getItem("preferred-language") || "en"
    this.currentPage = window.location.pathname.split("/").pop() || "index.html"
  }

  render() {
    const t = this.translations[this.currentLang]

    return `
            <nav class="container">
                <div class="nav-controls">
                    <a href="index.html" class="logo">
                        ⚡ NEONPAY API
                    </a>
                    <ul class="nav-links" id="navLinks">
                        ${this.pages
                          .map(
                            (page) => `
                            <li><a href="${page.href}" ${page.href === this.currentPage ? 'class="active"' : ""}>${t[page.key]}</a></li>
                        `,
                          )
                          .join("")}
                    </ul>
                    <div class="language-selector">
                        <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
                        <button class="lang-btn ${this.currentLang === 'ru' ? 'active' : ''}" data-lang="ru">RU</button>
                        <button class="lang-btn ${this.currentLang === 'az' ? 'active' : ''}" data-lang="az">AZ</button>
                    </div>
                </div>
                <button class="mobile-menu" id="mobileMenu">☰</button>
            </nav>
        `
  }

  init() {
    const header = document.querySelector("header") || document.getElementById("navbar-container")
    if (header) {
      header.innerHTML = this.render()
    }

    // Setup event listeners
    this.setupEventListeners()

    // Apply current language to page content
    this.applyLanguage()
  }

  setupEventListeners() {
    // Language buttons
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });

    // Mobile menu
    const mobileMenu = document.getElementById("mobileMenu")
    const navLinks = document.getElementById("navLinks")

    if (mobileMenu && navLinks) {
      mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active")
      })

      // Close mobile menu when clicking on a link
      navLinks.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          navLinks.classList.remove("active")
        }
      })

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav');
        if (nav && !nav.contains(e.target)) {
          navLinks.classList.remove('active');
        }
      });
    }
  }

  setLanguage(lang) {
    this.currentLang = lang
    localStorage.setItem("preferred-language", lang)

    // Re-render navigation with new language
    const header = document.querySelector("header") || document.getElementById("navbar-container")
    if (header) {
      header.innerHTML = this.render()
      this.setupEventListeners()
    }

    // Apply language to page content
    this.applyLanguage()
  }

  applyLanguage() {
    if (window.applyTranslations) {
      window.applyTranslations(this.currentLang, this.translations[this.currentLang])
    }
  }
}

function initializeNavigation() {
  const nav = new Navigation()
  nav.init()
}

// Initialize navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeNavigation)

// Also expose for manual initialization after async loading
window.initializeNavigation = initializeNavigation
