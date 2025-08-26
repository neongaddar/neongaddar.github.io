// Modern Navigation System for NEONPAY
// Handles language switching and page navigation in PyPI-style interface

class ModernNavigation {
    constructor() {
        this.currentLang = localStorage.getItem('preferred-language') || 'en';
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        this.translations = {
            en: {
                project: "Project",
                about: "About", 
                quickStart: "Quick Start",
                apiDocs: "API Docs",
                examples: "Examples",
                libraries: "Libraries"
            },
            ru: {
                project: "Проект",
                about: "О проекте",
                quickStart: "Быстрый старт", 
                apiDocs: "API документация",
                examples: "Примеры",
                libraries: "Библиотеки"
            },
            az: {
                project: "Layihə",
                about: "Haqqında",
                quickStart: "Sürətli başlanğıc",
                apiDocs: "API sənədləri", 
                examples: "Nümunələr",
                libraries: "Kitabxanalar"
            }
        };
    }

    init() {
        this.setupLanguageSwitching();
        this.setupMobileMenu();
        this.setupSearch();
        this.loadSavedLanguage();
    }

    setupLanguageSwitching() {
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        
        // Update button states
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(b => b.classList.remove('active'));
        const activeLangBtn = document.querySelector(`[data-lang="${lang}"]`);
        if (activeLangBtn) {
            activeLangBtn.classList.add('active');
        }
        
        // Update navigation text if needed
        this.updateNavText(lang);
        
        // Save preference
        localStorage.setItem('preferred-language', lang);
        
        // Apply translations to page content
        this.applyPageTranslations(lang);
    }

    updateNavText(lang) {
        // Update navigation links based on language
        const navLinks = document.querySelectorAll('.nav-links a');
        const t = this.translations[lang];
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === 'index.html') {
                link.textContent = t.project;
            } else if (href === 'about.html') {
                link.textContent = t.about;
            } else if (href === 'quick-start.html') {
                link.textContent = t.quickStart;
            } else if (href === 'api-docs.html') {
                link.textContent = t.apiDocs;
            } else if (href === 'examples.html') {
                link.textContent = t.examples;
            } else if (href === 'libraries.html') {
                link.textContent = t.libraries;
            }
        });
    }

    applyPageTranslations(lang) {
        // Hide all language content
        const allLangContent = document.querySelectorAll('.lang-content');
        allLangContent.forEach(content => {
            content.classList.remove('active');
        });

        // Show content for selected language
        const selectedLangContent = document.querySelectorAll(`[data-lang="${lang}"]`);
        selectedLangContent.forEach(content => {
            content.classList.add('active');
        });

        // Update HTML lang attribute
        const htmlRoot = document.getElementById('html-root');
        if (htmlRoot) {
            htmlRoot.setAttribute('lang', lang);
        }
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                }
            });
        }
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const query = e.target.value.trim();
                    if (query) {
                        // Implement search functionality here
                        console.log('Search query:', query);
                        // For now, we'll just show an alert
                        alert(`Search functionality coming soon! Query: "${query}"`);
                    }
                }
            });
        }
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferred-language') || 'en';
        const savedLangBtn = document.querySelector(`[data-lang="${savedLang}"]`);
        
        if (savedLangBtn) {
            const langBtns = document.querySelectorAll('.lang-btn');
            langBtns.forEach(b => b.classList.remove('active'));
            savedLangBtn.classList.add('active');
            this.updateNavText(savedLang);
            this.applyPageTranslations(savedLang);
        }
    }

    highlightCurrentPage() {
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            if (item.getAttribute('href') === this.currentPage) {
                item.classList.add('active');
            }
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const navigation = new ModernNavigation();
    navigation.init();
    navigation.highlightCurrentPage();
    
    // Global function for other scripts to use
    window.applyTranslations = function(lang) {
        navigation.setLanguage(lang);
    };
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernNavigation;
}
