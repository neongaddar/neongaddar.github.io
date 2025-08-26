// Modern Navigation System for NEONPAY with Smart Search
// Handles language switching, page navigation and intelligent search

class ModernNavigation {
    constructor() {
        this.currentLang = localStorage.getItem('preferred-language') || 'en';
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.searchEngine = null;
        this.searchTimeout = null;
        this.isSearchResultsVisible = false;
        
        this.translations = {
            en: {
                project: "Project",
                about: "About", 
                quickStart: "Quick Start",
                apiDocs: "API Docs",
                examples: "Examples",
                libraries: "Libraries",
                searchPlaceholder: "Search documentation...",
                noResults: "No results found",
                suggestions: "Suggestions:",
                searchIn: "Search in",
                categories: {
                    main: "Main Pages",
                    docs: "Documentation", 
                    examples: "Code Examples",
                    info: "About & Info"
                }
            },
            ru: {
                project: "Проект",
                about: "О проекте",
                quickStart: "Быстрый старт", 
                apiDocs: "API документация",
                examples: "Примеры",
                libraries: "Библиотеки",
                searchPlaceholder: "Поиск по документации...",
                noResults: "Результаты не найдены",
                suggestions: "Предложения:",
                searchIn: "Поиск в",
                categories: {
                    main: "Главные страницы",
                    docs: "Документация",
                    examples: "Примеры кода", 
                    info: "О проекте"
                }
            },
            az: {
                project: "Layihə",
                about: "Haqqında",
                quickStart: "Sürətli başlanğıc",
                apiDocs: "API sənədləri", 
                examples: "Nümunələr",
                libraries: "Kitabxanalar",
                searchPlaceholder: "Sənədlərdə axtarış...",
                noResults: "Heç bir nəticə tapılmadı",
                suggestions: "Təkliflər:",
                searchIn: "Axtarış",
                categories: {
                    main: "Ana səhifələr",
                    docs: "Sənədlər",
                    examples: "Kod nümunələri",
                    info: "Məlumat"
                }
            }
        };
    }

    init() {
        this.setupLanguageSwitching();
        this.setupMobileMenu();
        this.setupSmartSearch();
        this.loadSavedLanguage();
        this.createSearchResultsContainer();
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
        
        // Update navigation text
        this.updateNavText(lang);
        
        // Update search engine language
        if (this.searchEngine) {
            this.searchEngine.setLanguage(lang);
        }
        
        // Update search placeholder
        this.updateSearchPlaceholder();
        
        // Save preference
        localStorage.setItem('preferred-language', lang);
        
        // Apply translations to page content
        this.applyPageTranslations(lang);
        
        // Hide search results when language changes
        this.hideSearchResults();
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

    updateSearchPlaceholder() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.placeholder = this.translations[this.currentLang].searchPlaceholder;
        }
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

    setupSmartSearch() {
        // Initialize search engine
        if (typeof SmartSearchEngine !== 'undefined') {
            this.searchEngine = new SmartSearchEngine();
            this.searchEngine.setLanguage(this.currentLang);
        }

        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;

        // Real-time search as user types
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            // Clear previous timeout
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            
            // Debounce search to avoid too many requests
            this.searchTimeout = setTimeout(() => {
                if (query.length >= 2) {
                    this.performSearch(query);
                } else if (query.length === 0) {
                    this.showDefaultSuggestions();
                } else {
                    this.hideSearchResults();
                }
            }, 150);
        });

        // Handle Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = e.target.value.trim();
                if (query && this.searchEngine) {
                    const results = this.searchEngine.search(query);
                    if (results.hasResults) {
                        // Navigate to first result
                        window.location.href = results.results[0].url;
                    }
                }
            } else if (e.key === 'Escape') {
                this.hideSearchResults();
                searchInput.blur();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateSearchResults('down');
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateSearchResults('up');
            }
        });

        // Focus events
        searchInput.addEventListener('focus', () => {
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                this.performSearch(query);
            } else {
                this.showDefaultSuggestions();
            }
        });

        // Click outside to hide results
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) {
                this.hideSearchResults();
            }
        });
    }

    createSearchResultsContainer() {
        // Create search results container if it doesn't exist
        if (document.querySelector('.search-results')) return;

        const searchBox = document.querySelector('.search-box');
        if (!searchBox) return;

        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        resultsContainer.style.display = 'none';
        searchBox.appendChild(resultsContainer);
    }

    performSearch(query) {
        if (!this.searchEngine) return;

        const searchResults = this.searchEngine.search(query);
        this.displaySearchResults(searchResults);
    }

    showDefaultSuggestions() {
        if (!this.searchEngine) return;

        const suggestions = this.searchEngine.getSuggestions('');
        const results = {
            results: [],
            suggestions: suggestions,
            hasResults: false,
            query: ''
        };
        this.displaySearchResults(results);
    }

    displaySearchResults(searchData) {
        const resultsContainer = document.querySelector('.search-results');
        if (!resultsContainer) return;

        const t = this.translations[this.currentLang];
        let html = '';

        if (searchData.hasResults) {
            // Group results by category
            const categories = this.searchEngine.getCategories();
            const groupedResults = {};
            
            searchData.results.forEach(result => {
                if (!groupedResults[result.category]) {
                    groupedResults[result.category] = [];
                }
                groupedResults[result.category].push(result);
            });

            // Display results by category
            Object.keys(groupedResults).forEach(category => {
                const categoryTitle = categories[category] || category;
                html += `<div class="search-category">
                    <div class="search-category-title">${categoryTitle}</div>
                `;
                
                groupedResults[category].forEach(result => {
                    html += `
                        <div class="search-result-item" data-url="${result.url}">
                            <div class="search-result-title">${this.highlightText(result.title, searchData.query)}</div>
                            <div class="search-result-description">${this.highlightText(result.matchedText, searchData.query)}</div>
                            <div class="search-result-url">${result.url}</div>
                        </div>
                    `;
                });
                
                html += '</div>';
            });
        } else if (searchData.query) {
            html = `<div class="search-no-results">
                <div class="search-no-results-text">${t.noResults}</div>
            </div>`;
        }

        // Add suggestions
        if (searchData.suggestions.length > 0) {
            html += `<div class="search-suggestions">
                <div class="search-suggestions-title">${t.suggestions}</div>
                <div class="search-suggestions-list">`;
            
            searchData.suggestions.forEach(suggestion => {
                html += `<div class="search-suggestion-item" data-suggestion="${suggestion}">${suggestion}</div>`;
            });
            
            html += `</div></div>`;
        }

        resultsContainer.innerHTML = html;
        
        // Add click handlers
        this.addSearchResultHandlers();
        
        // Show results
        this.showSearchResults();
    }

    addSearchResultHandlers() {
        // Handle result item clicks
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const url = item.getAttribute('data-url');
                if (url) {
                    window.location.href = url;
                }
            });
        });

        // Handle suggestion clicks
        document.querySelectorAll('.search-suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const suggestion = item.getAttribute('data-suggestion');
                if (suggestion) {
                    const searchInput = document.querySelector('.search-input');
                    searchInput.value = suggestion;
                    this.performSearch(suggestion);
                }
            });
        });
    }

    highlightText(text, query) {
        if (!query || !text) return text;
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    showSearchResults() {
        const resultsContainer = document.querySelector('.search-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
            this.isSearchResultsVisible = true;
        }
    }

    hideSearchResults() {
        const resultsContainer = document.querySelector('.search-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
            this.isSearchResultsVisible = false;
        }
    }

    navigateSearchResults(direction) {
        const results = document.querySelectorAll('.search-result-item');
        if (results.length === 0) return;

        const currentActive = document.querySelector('.search-result-item.active');
        let nextIndex = 0;

        if (currentActive) {
            const currentIndex = Array.from(results).indexOf(currentActive);
            nextIndex = direction === 'down' ? 
                Math.min(currentIndex + 1, results.length - 1) : 
                Math.max(currentIndex - 1, 0);
            currentActive.classList.remove('active');
        }

        results[nextIndex].classList.add('active');
        results[nextIndex].scrollIntoView({ block: 'nearest' });
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
        
        // Update search placeholder
        this.updateSearchPlaceholder();
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
