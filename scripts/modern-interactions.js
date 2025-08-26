/**
 * Modern Interactions System for NEONPAY API Documentation
 * Advanced JavaScript for enhanced user experience
 */

class ModernInteractions {
  constructor() {
    this.config = {
      observerOptions: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      },
      animationDelay: 100,
      scrollThreshold: 100
    };

    this.state = {
      isScrolled: false,
      activeSection: null,
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };

    this.observers = new Map();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollEffects();
    this.setupLazyLoading();
    this.setupCodeBlockEnhancements();
    this.setupFormEnhancements();
    this.setupKeyboardNavigation();
    this.setupPerformanceOptimizations();
    this.setupAccessibilityEnhancements();
    
    console.log('🎨 Modern Interactions initialized');
  }

  /**
   * Setup Intersection Observer for animations
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = this.state.prefersReducedMotion ? 0 : index * this.config.animationDelay;
          
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);
          
          animationObserver.unobserve(entry.target);
        }
      });
    }, this.config.observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .feature-card, .example-card, .library-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      animationObserver.observe(el);
    });

    this.observers.set('animation', animationObserver);
  }

  /**
   * Setup scroll effects
   */
  setupScrollEffects() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollState();
          this.updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  updateScrollState() {
    const scrolled = window.scrollY > this.config.scrollThreshold;
    
    if (scrolled !== this.state.isScrolled) {
      this.state.isScrolled = scrolled;
      document.body.classList.toggle('scrolled', scrolled);
    }
  }

  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos <= bottom) {
        if (this.state.activeSection !== section.id) {
          this.state.activeSection = section.id;
          this.highlightActiveNavItem(section.id);
        }
      }
    });
  }

  highlightActiveNavItem(sectionId) {
    document.querySelectorAll('.sidebar a, .nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Setup lazy loading for images and content
   */
  setupLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          lazyImageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      img.classList.add('lazy');
      lazyImageObserver.observe(img);
    });

    this.observers.set('lazyImage', lazyImageObserver);
  }

  /**
   * Enhanced code block functionality
   */
  setupCodeBlockEnhancements() {
    document.querySelectorAll('.code-block').forEach(block => {
      this.addCopyButton(block);
      this.addLineNumbers(block);
      this.enhanceSyntaxHighlighting(block);
    });
  }

  addCopyButton(codeBlock) {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span>Copy</span>
    `;
    
    button.addEventListener('click', () => this.copyCode(codeBlock, button));
    
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(button);
  }

  async copyCode(codeBlock, button) {
    const code = codeBlock.textContent.replace(/Copy$/, '').trim();
    
    try {
      await navigator.clipboard.writeText(code);
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
        <span>Copied!</span>
      `;
      
      setTimeout(() => {
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        `;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }

  addLineNumbers(codeBlock) {
    const lines = codeBlock.textContent.split('\n');
    const lineNumbers = document.createElement('div');
    lineNumbers.className = 'line-numbers';
    
    lines.forEach((_, index) => {
      const lineNumber = document.createElement('span');
      lineNumber.textContent = index + 1;
      lineNumbers.appendChild(lineNumber);
    });
    
    codeBlock.style.paddingLeft = '3rem';
    codeBlock.appendChild(lineNumbers);
  }

  enhanceSyntaxHighlighting(codeBlock) {
    // Enhanced syntax highlighting patterns
    const patterns = {
      comment: /\/\*[\s\S]*?\*\/|\/\/.*$/gm,
      string: /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g,
      keyword: /\b(async|await|class|const|def|from|import|function|let|var|if|else|for|while|return|try|catch|finally)\b/g,
      function: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
      number: /\b\d+\.?\d*\b/g,
      operator: /[+\-*/%=<>!&|^~?:]/g
    };

    let html = codeBlock.innerHTML;
    
    Object.entries(patterns).forEach(([type, pattern]) => {
      html = html.replace(pattern, `<span class="${type}">$&</span>`);
    });
    
    codeBlock.innerHTML = html;
  }

  /**
   * Enhanced form functionality
   */
  setupFormEnhancements() {
    document.querySelectorAll('input, textarea, select').forEach(input => {
      this.enhanceFormField(input);
    });
  }

  enhanceFormField(field) {
    // Add floating labels
    if (field.placeholder && !field.labels.length) {
      const wrapper = document.createElement('div');
      wrapper.className = 'form-field';
      
      const label = document.createElement('label');
      label.textContent = field.placeholder;
      label.className = 'floating-label';
      
      field.parentNode.insertBefore(wrapper, field);
      wrapper.appendChild(field);
      wrapper.appendChild(label);
      
      field.addEventListener('focus', () => label.classList.add('active'));
      field.addEventListener('blur', () => {
        if (!field.value) label.classList.remove('active');
      });
    }

    // Add validation feedback
    field.addEventListener('invalid', (e) => {
      e.preventDefault();
      this.showValidationError(field, field.validationMessage);
    });

    field.addEventListener('input', () => {
      this.clearValidationError(field);
    });
  }

  showValidationError(field, message) {
    this.clearValidationError(field);
    
    const error = document.createElement('div');
    error.className = 'validation-error';
    error.textContent = message;
    
    field.parentNode.appendChild(error);
    field.classList.add('invalid');
  }

  clearValidationError(field) {
    const error = field.parentNode.querySelector('.validation-error');
    if (error) error.remove();
    field.classList.remove('invalid');
  }

  /**
   * Enhanced keyboard navigation
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Skip links for accessibility
      if (e.key === 'Tab' && e.shiftKey && e.target === document.body) {
        this.createSkipLinks();
      }

      // Quick navigation shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            this.openQuickSearch();
            break;
          case '/':
            e.preventDefault();
            this.focusSearch();
            break;
        }
      }

      // Arrow key navigation for cards
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        this.handleArrowNavigation(e);
      }
    });
  }

  createSkipLinks() {
    if (document.querySelector('.skip-links')) return;

    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#main-content">Skip to main content</a>
      <a href="#navigation">Skip to navigation</a>
    `;
    
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }

  /**
   * Performance optimizations
   */
  setupPerformanceOptimizations() {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Setup resource hints
    this.setupResourceHints();
    
    // Optimize images
    this.optimizeImages();
    
    // Setup service worker
    this.setupServiceWorker();
  }

  preloadCriticalResources() {
    const criticalResources = [
      { href: '/styles/modern-theme.css', as: 'style' },
      { href: '/scripts/modern-interactions.js', as: 'script' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });
  }

  setupResourceHints() {
    const hints = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
    ];

    hints.forEach(hint => {
      const link = document.createElement('link');
      Object.assign(link, hint);
      document.head.appendChild(link);
    });
  }

  optimizeImages() {
    // Add loading="lazy" to images below the fold
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (!img.loading) img.loading = 'lazy';
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  async setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered');
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }

  /**
   * Accessibility enhancements
   */
  setupAccessibilityEnhancements() {
    // Announce page changes to screen readers
    this.setupPageAnnouncements();
    
    // Enhanced focus management
    this.setupFocusManagement();
    
    // Color contrast checking
    this.checkColorContrast();
    
    // ARIA live regions
    this.setupLiveRegions();
  }

  setupPageAnnouncements() {
    const announcer = document.createElement('div');
    announcer.id = 'page-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
    document.body.appendChild(announcer);
  }

  setupFocusManagement() {
    // Focus visible polyfill
    document.addEventListener('keydown', () => {
      document.body.classList.add('using-keyboard');
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('using-keyboard');
    });

    // Focus trap for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.handleFocusTrap(e);
      }
    });
  }

  handleFocusTrap(e) {
    const modal = document.querySelector('.modal:not([aria-hidden="true"])');
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  /**
   * Cleanup method
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ModernInteractions());
} else {
  new ModernInteractions();
}

// CSS for enhanced interactions
const interactionStyles = `
  .copy-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.375rem;
    color: #f1f5f9;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(4px);
  }

  .copy-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .line-numbers {
    position: absolute;
    left: 0;
    top: 1.5rem;
    padding: 0 0.75rem;
    color: #64748b;
    font-size: 0.75rem;
    line-height: 1.7;
    user-select: none;
    border-right: 1px solid #334155;
  }

  .form-field {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .floating-label {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    color: #6b7280;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    pointer-events: none;
    background: white;
    padding: 0 0.25rem;
  }

  .floating-label.active {
    top: -0.5rem;
    left: 0.5rem;
    font-size: 0.75rem;
    color: var(--primary-600);
  }

  .validation-error {
    margin-top: 0.5rem;
    color: #ef4444;
    font-size: 0.875rem;
  }

  .skip-links {
    position: absolute;
    top: -100px;
    left: 0;
    z-index: 9999;
  }

  .skip-links a {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .skip-links a:focus {
    position: static;
    width: auto;
    height: auto;
    padding: 0.5rem 1rem;
    background: var(--primary-600);
    color: white;
    text-decoration: none;
    border-radius: 0.25rem;
  }

  .using-keyboard *:focus {
    outline: 2px solid var(--primary-500);
    outline-offset: 2px;
  }

  .lazy {
    opacity: 0;
    transition: opacity 0.3s;
  }

  .lazy.loaded {
    opacity: 1;
  }
`;

// Inject interaction styles
const styleSheet = document.createElement('style');
styleSheet.textContent = interactionStyles;
document.head.appendChild(styleSheet);