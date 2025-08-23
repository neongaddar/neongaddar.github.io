class Navigation {
  constructor() {
    this.pages = [
      { href: "index.html", key: "home" },
      { href: "quick-start.html", key: "quickStart" },
      { href: "api-docs.html", key: "apiDocs" },
      { href: "examples.html", key: "examples" },
      { href: "libraries.html", key: "libraries" },
    ]

    this.translations = {
      en: {
        home: "Home",
        quickStart: "Quick Start",
        apiDocs: "API Docs",
        examples: "Examples",
        libraries: "Libraries",
        language: "Language",
      },
      ru: {
        home: "Главная",
        quickStart: "Быстрый старт",
        apiDocs: "API документация",
        examples: "Примеры",
        libraries: "Библиотеки",
        language: "Язык",
      },
      az: {
        home: "Ana səhifə",
        quickStart: "Sürətli başlanğıc",
        apiDocs: "API sənədləri",
        examples: "Nümunələr",
        libraries: "Kitabxanalar",
        language: "Dil",
      },
    }

    this.currentLang = localStorage.getItem("language") || "en"
    this.currentPage = window.location.pathname.split("/").pop() || "index.html"
  }

  render() {
    const t = this.translations[this.currentLang]

    return `
            <nav class="container">
                <a href="index.html" class="logo">
                    ⚡ NEONPAY
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
                <div class="nav-controls">
                    <select class="language-selector" id="languageSelector">
                        <option value="en" ${this.currentLang === "en" ? "selected" : ""}>English</option>
                        <option value="ru" ${this.currentLang === "ru" ? "selected" : ""}>Русский</option>
                        <option value="az" ${this.currentLang === "az" ? "selected" : ""}>Azərbaycan</option>
                    </select>
                    <button class="mobile-menu" id="mobileMenu">☰</button>
                </div>
            </nav>
        `
  }

  init() {
    // Render navigation
    const header = document.querySelector("header")
    if (header) {
      header.innerHTML = this.render()
    }

    // Setup event listeners
    this.setupEventListeners()

    // Apply current language
    this.applyLanguage()
  }

  setupEventListeners() {
    // Language selector
    const languageSelector = document.getElementById("languageSelector")
    if (languageSelector) {
      languageSelector.addEventListener("change", (e) => {
        this.setLanguage(e.target.value)
      })
    }

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
    }
  }

  setLanguage(lang) {
    this.currentLang = lang
    localStorage.setItem("language", lang)
    this.applyLanguage()

    // Re-render navigation
    const header = document.querySelector("header")
    if (header) {
      header.innerHTML = this.render()
      this.setupEventListeners()
    }
  }

  applyLanguage() {
    // This method will be overridden by each page to apply translations
    if (window.applyTranslations) {
      window.applyTranslations(this.currentLang, this.translations[this.currentLang])
    }
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const nav = new Navigation()
  nav.init()
})
