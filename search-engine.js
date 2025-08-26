// Smart Search Engine for NEONPAY Website
// Features: Full-text search, auto-complete, suggestions, multi-language support

class SmartSearchEngine {
    constructor() {
        this.searchIndex = {};
        this.currentLanguage = 'en';
        this.initializeIndex();
    }

    // Initialize search index for all pages and languages
    initializeIndex() {
        this.searchIndex = {
            en: {
                pages: [
                    {
                        title: 'NEONPAY API - Home',
                        url: 'index.html',
                        category: 'main',
                        keywords: ['neonpay', 'api', 'telegram', 'stars', 'payment', 'bot', 'python', 'integration'],
                        content: 'Simple and elegant Telegram Stars payment integration for Python bots. Add payments to your bot with just 2-3 lines of code. Easy Integration Multi-Library Support Telegram Stars Secure',
                        description: 'Main page with overview of NEONPAY features and quick example'
                    },
                    {
                        title: 'About NEONPAY',
                        url: 'about.html',
                        category: 'info',
                        keywords: ['about', 'mission', 'team', 'history', 'abbas sultanov', 'goals'],
                        content: 'About NEONPAY Simplifying Telegram payment integration for developers worldwide. Our mission is to make bot monetization accessible to everyone. Mission Goals Project History Team',
                        description: 'Learn about NEONPAY mission, team and project history'
                    },
                    {
                        title: 'Quick Start Guide',
                        url: 'quick-start.html',
                        category: 'docs',
                        keywords: ['quick start', 'installation', 'setup', 'tutorial', 'getting started', 'pip install'],
                        content: 'Quick Start Guide Get started with NEONPAY in minutes. Installation tutorial setup guide pip install neonpay',
                        description: 'Step-by-step guide to get started with NEONPAY'
                    },
                    {
                        title: 'API Documentation',
                        url: 'api-docs.html',
                        category: 'docs',
                        keywords: ['api', 'documentation', 'reference', 'methods', 'parameters', 'examples'],
                        content: 'API Documentation Complete reference for all NEONPAY methods and parameters. Methods Parameters Examples Reference',
                        description: 'Complete API reference and documentation'
                    },
                    {
                        title: 'Code Examples',
                        url: 'examples.html',
                        category: 'examples',
                        keywords: ['examples', 'code', 'samples', 'aiogram', 'pyrogram', 'telebot', 'ptb', 'premium', 'store', 'donations'],
                        content: 'Code Examples Real-world examples Premium Bot Aiogram Digital Store Pyrogram Subscription System PTB Donation Bot Telebot Premium Features Digital Products Donations Tips',
                        description: 'Real-world code examples for all supported libraries'
                    },
                    {
                        title: 'Supported Libraries',
                        url: 'libraries.html',
                        category: 'docs',
                        keywords: ['libraries', 'aiogram', 'pyrogram', 'python-telegram-bot', 'ptb', 'telebot', 'pytelegramботapi', 'support'],
                        content: 'Supported Libraries Aiogram Pyrogram python-telegram-bot PTB pyTelegramBotAPI Telebot Integration Support',
                        description: 'List of all supported Python Telegram bot libraries'
                    }
                ],
                suggestions: [
                    'How to install NEONPAY',
                    'Aiogram integration',
                    'Payment examples',
                    'Telegram Stars',
                    'Premium features',
                    'Donation system',
                    'Subscription model',
                    'API reference',
                    'Quick start guide',
                    'Supported libraries'
                ],
                categories: {
                    'main': 'Main Pages',
                    'docs': 'Documentation',
                    'examples': 'Code Examples',
                    'info': 'About & Info'
                }
            },
            ru: {
                pages: [
                    {
                        title: 'NEONPAY API - Главная',
                        url: 'index.html',
                        category: 'main',
                        keywords: ['neonpay', 'апи', 'телеграм', 'звезды', 'платежи', 'бот', 'питон', 'интеграция'],
                        content: 'Простая и элегантная интеграция платежей Telegram Stars для Python ботов. Добавьте платежи в ваш бот всего 2-3 строками кода. Простая интеграция Поддержка библиотек Telegram Stars Безопасный',
                        description: 'Главная страница с обзором функций NEONPAY и быстрым примером'
                    },
                    {
                        title: 'О NEONPAY',
                        url: 'about.html',
                        category: 'info',
                        keywords: ['о проекте', 'миссия', 'команда', 'история', 'аббас султанов', 'цели'],
                        content: 'О NEONPAY Упрощаем интеграцию платежей Telegram для разработчиков по всему миру. Наша миссия - сделать монетизацию ботов доступной для всех. Миссия Цели История проекта Команда',
                        description: 'Узнайте о миссии NEONPAY, команде и истории проекта'
                    },
                    {
                        title: 'Быстрый старт',
                        url: 'quick-start.html',
                        category: 'docs',
                        keywords: ['быстрый старт', 'установка', 'настройка', 'туториал', 'начало работы', 'pip install'],
                        content: 'Быстрый старт Начните работу с NEONPAY за несколько минут. Установка руководство настройка pip install neonpay',
                        description: 'Пошаговое руководство для начала работы с NEONPAY'
                    },
                    {
                        title: 'API Документация',
                        url: 'api-docs.html',
                        category: 'docs',
                        keywords: ['апи', 'документация', 'справочник', 'методы', 'параметры', 'примеры'],
                        content: 'API Документация Полный справочник всех методов и параметров NEONPAY. Методы Параметры Примеры Справочник',
                        description: 'Полный справочник API и документация'
                    },
                    {
                        title: 'Примеры кода',
                        url: 'examples.html',
                        category: 'examples',
                        keywords: ['примеры', 'код', 'образцы', 'aiogram', 'pyrogram', 'telebot', 'ptb', 'премиум', 'магазин', 'пожертвования'],
                        content: 'Примеры кода Реальные примеры Премиум бот Aiogram Цифровой магазин Pyrogram Система подписок PTB Бот пожертвований Telebot Премиум функции Цифровые продукты Пожертвования',
                        description: 'Реальные примеры кода для всех поддерживаемых библиотек'
                    },
                    {
                        title: 'Поддерживаемые библиотеки',
                        url: 'libraries.html',
                        category: 'docs',
                        keywords: ['библиотеки', 'aiogram', 'pyrogram', 'python-telegram-bot', 'ptb', 'telebot', 'pytelegramботapi', 'поддержка'],
                        content: 'Поддерживаемые библиотеки Aiogram Pyrogram python-telegram-bot PTB pyTelegramBotAPI Telebot Интеграция Поддержка',
                        description: 'Список всех поддерживаемых Python Telegram bot библиотек'
                    }
                ],
                suggestions: [
                    'Как установить NEONPAY',
                    'Интеграция с Aiogram',
                    'Примеры платежей',
                    'Telegram Stars',
                    'Премиум функции',
                    'Система пожертвований',
                    'Модель подписки',
                    'Справочник API',
                    'Быстрый старт',
                    'Поддерживаемые библиотеки'
                ],
                categories: {
                    'main': 'Главные страницы',
                    'docs': 'Документация',
                    'examples': 'Примеры кода',
                    'info': 'О проекте'
                }
            },
            az: {
                pages: [
                    {
                        title: 'NEONPAY API - Ana səhifə',
                        url: 'index.html',
                        category: 'main',
                        keywords: ['neonpay', 'api', 'telegram', 'ulduzlar', 'ödəniş', 'bot', 'python', 'inteqrasiya'],
                        content: 'Python botları üçün sadə və zərif Telegram Stars ödəniş inteqrasiyası. Cəmi 2-3 kod sətri ilə botunuza ödənişlər əlavə edin. Asan İnteqrasiya Çox Kitabxana Dəstəyi Telegram Stars Təhlükəsiz',
                        description: 'NEONPAY xüsusiyyətlərinə baxış və sürətli nümunə ilə ana səhifə'
                    },
                    {
                        title: 'NEONPAY haqqında',
                        url: 'about.html',
                        category: 'info',
                        keywords: ['haqqında', 'missiya', 'komanda', 'tarix', 'abbas sultanov', 'məqsədlər'],
                        content: 'NEONPAY haqqında Dünya üzrə tərtibatçılar üçün Telegram ödəniş inteqrasiyasını sadələşdiririk. Missiyamız bot monetizasiyasını hər kəs üçün əlçatan etməkdir. Missiya Məqsədlər Layihə tarixi Komanda',
                        description: 'NEONPAY missiyası, komandası və layihə tarixi haqqında öyrənin'
                    },
                    {
                        title: 'Sürətli başlanğıc',
                        url: 'quick-start.html',
                        category: 'docs',
                        keywords: ['sürətli başlanğıc', 'quraşdırma', 'tənzimləmə', 'dərslik', 'başlanğıc', 'pip install'],
                        content: 'Sürətli başlanğıc NEONPAY ilə dəqiqələr içində başlayın. Quraşdırma təlimat tənzimləmə pip install neonpay',
                        description: 'NEONPAY ilə işə başlamaq üçün addım-addım təlimat'
                    },
                    {
                        title: 'API Sənədləri',
                        url: 'api-docs.html',
                        category: 'docs',
                        keywords: ['api', 'sənədlər', 'arayış', 'metodlar', 'parametrlər', 'nümunələr'],
                        content: 'API Sənədləri Bütün NEONPAY metodları və parametrləri üçün tam arayış. Metodlar Parametrlər Nümunələr Arayış',
                        description: 'Tam API arayışı və sənədləri'
                    },
                    {
                        title: 'Kod nümunələri',
                        url: 'examples.html',
                        category: 'examples',
                        keywords: ['nümunələr', 'kod', 'örnəklər', 'aiogram', 'pyrogram', 'telebot', 'ptb', 'premium', 'mağaza', 'ianələr'],
                        content: 'Kod nümunələri Real nümunələr Premium bot Aiogram Rəqəmsal mağaza Pyrogram Abunəlik sistemi PTB İanə botu Telebot Premium xüsusiyyətlər Rəqəmsal məhsullar İanələr',
                        description: 'Bütün dəstəklənən kitabxanalar üçün real kod nümunələri'
                    },
                    {
                        title: 'Dəstəklənən kitabxanalar',
                        url: 'libraries.html',
                        category: 'docs',
                        keywords: ['kitabxanalar', 'aiogram', 'pyrogram', 'python-telegram-bot', 'ptb', 'telebot', 'pytelegramботapi', 'dəstək'],
                        content: 'Dəstəklənən kitabxanalar Aiogram Pyrogram python-telegram-bot PTB pyTelegramBotAPI Telebot İnteqrasiya Dəstək',
                        description: 'Bütün dəstəklənən Python Telegram bot kitabxanalarının siyahısı'
                    }
                ],
                suggestions: [
                    'NEONPAY necə quraşdırılır',
                    'Aiogram inteqrasiyası',
                    'Ödəniş nümunələri',
                    'Telegram Stars',
                    'Premium xüsusiyyətlər',
                    'İanə sistemi',
                    'Abunəlik modeli',
                    'API arayışı',
                    'Sürətli başlanğıc',
                    'Dəstəklənən kitabxanalar'
                ],
                categories: {
                    'main': 'Ana səhifələr',
                    'docs': 'Sənədlər',
                    'examples': 'Kod nümunələri',
                    'info': 'Məlumat'
                }
            }
        };
    }

    // Set current language for search
    setLanguage(lang) {
        this.currentLanguage = lang;
    }

    // Main search function with relevance scoring
    search(query) {
        if (!query || query.trim().length === 0) {
            return {
                results: [],
                suggestions: this.getSuggestions(''),
                hasResults: false
            };
        }

        const cleanQuery = query.toLowerCase().trim();
        const words = cleanQuery.split(/\s+/);
        const langData = this.searchIndex[this.currentLanguage];
        
        if (!langData) {
            return { results: [], suggestions: [], hasResults: false };
        }

        // Search through pages
        const results = langData.pages.map(page => {
            const score = this.calculateRelevanceScore(page, words, cleanQuery);
            return {
                ...page,
                score,
                matchedText: this.getMatchedText(page, cleanQuery)
            };
        })
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8); // Limit to 8 results

        return {
            results,
            suggestions: this.getSuggestions(cleanQuery),
            hasResults: results.length > 0,
            query: cleanQuery
        };
    }

    // Calculate relevance score for a page
    calculateRelevanceScore(page, words, fullQuery) {
        let score = 0;
        const titleLower = page.title.toLowerCase();
        const contentLower = page.content.toLowerCase();
        const keywordsLower = page.keywords.join(' ').toLowerCase();
        const descriptionLower = page.description.toLowerCase();

        // Exact title match (highest priority)
        if (titleLower.includes(fullQuery)) {
            score += 100;
        }

        // Keywords match (high priority)
        words.forEach(word => {
            if (keywordsLower.includes(word)) {
                score += 50;
            }
        });

        // Title word matches
        words.forEach(word => {
            if (titleLower.includes(word)) {
                score += 30;
            }
        });

        // Description matches
        words.forEach(word => {
            if (descriptionLower.includes(word)) {
                score += 20;
            }
        });

        // Content matches (lower priority)
        words.forEach(word => {
            const matches = (contentLower.match(new RegExp(word, 'g')) || []).length;
            score += matches * 5;
        });

        // Boost for category relevance
        if (fullQuery.includes('example') && page.category === 'examples') score += 20;
        if (fullQuery.includes('doc') && page.category === 'docs') score += 20;
        if (fullQuery.includes('api') && page.category === 'docs') score += 15;

        return score;
    }

    // Get matched text snippet for display
    getMatchedText(page, query) {
        const content = page.content.toLowerCase();
        const queryLower = query.toLowerCase();
        
        const index = content.indexOf(queryLower);
        if (index !== -1) {
            const start = Math.max(0, index - 30);
            const end = Math.min(content.length, index + query.length + 30);
            let snippet = page.content.substring(start, end);
            
            if (start > 0) snippet = '...' + snippet;
            if (end < content.length) snippet += '...';
            
            return snippet;
        }
        
        return page.description;
    }

    // Get search suggestions based on query
    getSuggestions(query) {
        const langData = this.searchIndex[this.currentLanguage];
        if (!langData) return [];

        const queryLower = query.toLowerCase();
        
        if (queryLower.length === 0) {
            return langData.suggestions.slice(0, 5);
        }

        const suggestions = langData.suggestions
            .filter(suggestion => suggestion.toLowerCase().includes(queryLower))
            .slice(0, 5);

        // If no direct matches, return popular suggestions
        if (suggestions.length === 0) {
            return langData.suggestions.slice(0, 3);
        }

        return suggestions;
    }

    // Get autocomplete suggestions as user types
    getAutocomplete(query) {
        if (!query || query.length < 2) return [];
        
        const langData = this.searchIndex[this.currentLanguage];
        if (!langData) return [];

        const queryLower = query.toLowerCase();
        const suggestions = [];

        // Get suggestions from keywords
        langData.pages.forEach(page => {
            page.keywords.forEach(keyword => {
                if (keyword.toLowerCase().startsWith(queryLower) && 
                    !suggestions.includes(keyword) && 
                    suggestions.length < 5) {
                    suggestions.push(keyword);
                }
            });
        });

        // Get suggestions from pre-defined suggestions list
        langData.suggestions.forEach(suggestion => {
            if (suggestion.toLowerCase().includes(queryLower) && 
                !suggestions.includes(suggestion) && 
                suggestions.length < 5) {
                suggestions.push(suggestion);
            }
        });

        return suggestions.slice(0, 5);
    }

    // Get category information for results grouping
    getCategories() {
        const langData = this.searchIndex[this.currentLanguage];
        return langData ? langData.categories : {};
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartSearchEngine;
} else {
    window.SmartSearchEngine = SmartSearchEngine;
}
