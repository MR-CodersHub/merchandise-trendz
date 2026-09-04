/**
 * TrendZ Unified Navbar & Footer Component Generator
 * Includes Theme Controller (Dark/Light with System Preference Detection),
 * RTL Mode Controller (Bidirectional layout with Locale Detection),
 * Keyboard Accessibility, and Interactive Components across all pages.
 */

// Global Toast Dispatcher
window.showToast = function(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'success') {
    toast.style.borderLeftColor = '#10B981';
  } else if (type === 'warning' || type === 'error') {
    toast.style.borderLeftColor = '#EF4444';
  } else {
    toast.style.borderLeftColor = '#FFB800';
  }

  toast.innerHTML = `
    <span style="font-size: 1.1rem; font-weight: bold;">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span style="flex: 1;">${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
};

/**
 * Calculates correct relative paths based on current page location
 */
export function getPathPrefixes() {
  const path = window.location.pathname.replace(/\\/g, '/');

  if (path.includes('/public/auth/admin/') || path.includes('/public/auth/user/')) {
    return {
      home: '../../../index.html',
      pages: '../../pages/',
      auth: '../',
      assets: '../../../assets/'
    };
  } else if (path.includes('/public/auth/')) {
    return {
      home: '../../index.html',
      pages: '../pages/',
      auth: './',
      assets: '../../assets/'
    };
  } else if (path.includes('/public/pages/')) {
    return {
      home: '../../index.html',
      pages: './',
      auth: '../auth/',
      assets: '../../assets/'
    };
  } else {
    return {
      home: 'index.html',
      pages: 'public/pages/',
      auth: 'public/auth/',
      assets: 'assets/'
    };
  }
}

/**
 * Generates Unified Navbar HTML template
 */
export function renderNavbar(paths) {
  // Get cart count from storage if available
  let cartCount = 1;
  try {
    const cartItems = JSON.parse(localStorage.getItem('pod_cart_items'));
    if (Array.isArray(cartItems)) {
      cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
  } catch (e) {}

  return `
    <div class="container nav-container">
      <!-- Brand Logo -->
      <a href="${paths.home}" class="brand-logo" id="mainBrandLogo">
        <img src="${paths.assets}logo.png" alt="TrendZ Logo" class="brand-logo-icon">
        <div class="brand-logo-text">
          <div class="brand-logo-main">
            Trend<span class="highlight">Z</span>
          </div>
          <div class="brand-logo-sub">CUSTOM MERCHANDISE</div>
        </div>
      </a>

      <!-- Navigation Links -->
      <nav>
        <ul class="nav-links">
          <li><a href="${paths.home}" class="nav-link" data-nav="home">Home</a></li>
          <li><a href="${paths.pages}home-2.html" class="nav-link" data-nav="niche">Home 2</a></li>
          <li><a href="${paths.pages}about.html" class="nav-link" data-nav="about">About</a></li>
          <li><a href="${paths.pages}services.html" class="nav-link" data-nav="services">Services</a></li>
          <li><a href="${paths.pages}blog.html" class="nav-link" data-nav="blog">Blog</a></li>
          <li><a href="${paths.pages}contact.html" class="nav-link" data-nav="contact">Contact</a></li>
        </ul>
      </nav>

      <!-- Nav Actions -->
      <div class="nav-actions">
        <!-- Quick Theme Toggle Button -->
        <button class="btn-icon theme-quick-toggle-btn" id="themeQuickToggleBtn" title="Toggle Theme (Alt + T)" aria-label="Toggle Theme">
          <svg class="theme-icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="theme-icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>

        <!-- Quick RTL Mode Toggle Button -->
        <button class="btn-icon rtl-quick-toggle-btn" id="rtlQuickToggleBtn" title="Toggle RTL / LTR Mode (Alt + R)" aria-label="Toggle RTL Layout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </button>

        <!-- Cart Button -->
        <button class="btn-icon" data-action="open-cart" title="Shopping Cart" id="cartOpenBtn" aria-label="Open Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-badge-count">${cartCount}</span>
        </button>

        <!-- Profile / Account Dropdown -->
        <div class="profile-dropdown-wrapper">
          <button class="profile-trigger-btn" title="Account & Settings" aria-label="Account Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <div class="profile-dropdown-menu">
            <div class="dropdown-header">
              <div class="dropdown-user-name">TrendZ Portal</div>
              <div class="dropdown-user-role">Guest / Creator Access</div>
            </div>
            <a href="${paths.auth}login.html" class="dropdown-item">
              <span>Sign In</span>
            </a>
            <a href="${paths.auth}signup.html" class="dropdown-item">
              <span>Create Account</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="${paths.auth}admin/admin-dashboard.html" class="dropdown-item">
              <span>Admin Dashboard</span>
            </a>
            <a href="${paths.auth}user/user-dashboard.html" class="dropdown-item">
              <span>User Dashboard</span>
            </a>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item theme-toggle-btn" type="button" aria-label="Toggle Dark or Light Mode">
              <span>Dark Mode</span>
            </button>
            <button class="dropdown-item rtl-toggle-btn" type="button" aria-label="Toggle RTL or LTR Layout">
              <span>RTL Mode</span>
            </button>
          </div>
        </div>

        <button class="mobile-toggle-btn" id="mobileMenuToggle" aria-label="Toggle Menu">
          ☰
        </button>
      </div>
    </div>
  `;
}

/**
 * Generates Unified Footer HTML template
 */
export function renderFooter(paths) {
  return `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${paths.home}" class="brand-logo" style="margin-bottom: 14px;">
            <img src="${paths.assets}logo.png" alt="TrendZ Logo" class="brand-logo-icon" style="height: 48px;">
            <div class="brand-logo-text">
              <div class="brand-logo-main">
                Trend<span class="highlight">Z</span>
              </div>
              <div class="brand-logo-sub">CUSTOM MERCHANDISE</div>
            </div>
          </a>
          <p>
            Modern digital printing solutions, corporate merchandise packages, and premier print-on-demand platform for creators and businesses.
          </p>
          <div style="display: flex; gap: 12px; margin-top: 14px;">
            <span class="badge-pill badge-yellow">Worldwide Express Shipping</span>
          </div>
        </div>

        <div>
          <h4 class="footer-title">Services & Print</h4>
          <ul class="footer-links">
            <li><a href="${paths.pages}services.html">All Services Listing</a></li>
            <li><a href="${paths.pages}service-details.html?id=dtg-printing">DTG HD Printing</a></li>
            <li><a href="${paths.pages}service-details.html?id=sublimation">All-Over Sublimation</a></li>
            <li><a href="${paths.pages}service-details.html?id=embroidery">3D Puff Embroidery</a></li>
            <li><a href="${paths.pages}service-details.html?id=creator-drops">Creator POD Drops</a></li>
            <li><a href="${paths.pages}pricing.html">Pricing & Volume Tiers</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-title">Company & Hub</h4>
          <ul class="footer-links">
            <li><a href="${paths.pages}about.html">About TrendZ</a></li>
            <li><a href="${paths.pages}home-2.html">Gaming Niche Studio</a></li>
            <li><a href="${paths.pages}blog.html">Printing Blog & Guides</a></li>
            <li><a href="${paths.pages}FAQ.html">FAQ & Help Center</a></li>
            <li><a href="${paths.pages}contact.html">Contact Support</a></li>
            <li><a href="${paths.pages}coming-soon.html">Upcoming Tech Drops</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-title">Creator Updates</h4>
          <p style="font-size: 0.88rem; color: #9CA3AF; margin-bottom: 12px;">
            Subscribe to receive new mockup drops, printing technology updates, and creator guides.
          </p>
          <form class="newsletter-form footer-newsletter-box" id="footerNewsletterForm">
            <input type="email" required placeholder="name@creator.com" class="footer-input" id="footerNewsletterEmail">
            <button type="submit" class="footer-btn" aria-label="Subscribe">➔</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <div>© 2026 TrendZ Studio. All Rights Reserved. Modern High-Definition Printing Platform.</div>
        <div style="display: flex; gap: 20px;">
          <a href="${paths.pages}Privacy-policy.html">Privacy Policy</a>
          <a href="${paths.pages}Terms-of-service.html">Terms of Service</a>
          <a href="${paths.pages}FAQ.html">Shipping & Returns</a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Theme Controller with Automatic System Preference Detection
 */
export function initThemeController() {
  const savedTheme = localStorage.getItem('trendz_theme');
  const hasManualChoice = localStorage.getItem('trendz_theme_manual') === 'true';

  let initialTheme = 'light';

  if (hasManualChoice && (savedTheme === 'dark' || savedTheme === 'light')) {
    initialTheme = savedTheme;
  } else {
    // Automatic system preference detection
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    initialTheme = systemPrefersDark ? 'dark' : 'light';
  }

  applyTheme(initialTheme, false);

  // Listen for real-time OS/System preference changes
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', (e) => {
      const isManual = localStorage.getItem('trendz_theme_manual') === 'true';
      if (!isManual) {
        const systemTheme = e.matches ? 'dark' : 'light';
        applyTheme(systemTheme, false);
      }
    });
  }
}

/**
 * Applies theme and updates all UI buttons and badges
 */
export function applyTheme(theme, isManual = true) {
  const doc = document.documentElement;
  const isDark = theme === 'dark';

  // Smooth transition class
  document.body?.classList.add('theme-transitioning');

  doc.setAttribute('data-theme', theme);
  if (isDark) {
    doc.classList.add('dark');
  } else {
    doc.classList.remove('dark');
  }

  if (isManual) {
    localStorage.setItem('trendz_theme', theme);
    localStorage.setItem('trendz_theme_manual', 'true');
    window.showToast?.(isDark ? 'Dark Mode Activated' : 'Light Mode Activated', 'info');
  }

  // Update quick toggle icons
  const sunIcons = document.querySelectorAll('.theme-icon-sun');
  const moonIcons = document.querySelectorAll('.theme-icon-moon');
  sunIcons.forEach(icon => { icon.style.display = isDark ? 'none' : 'block'; });
  moonIcons.forEach(icon => { icon.style.display = isDark ? 'block' : 'none'; });

  // Update dropdown buttons
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.innerHTML = isDark
      ? '<span>Light Mode</span><span class="badge-pill badge-yellow" style="font-size:0.7rem; padding:2px 6px;">Active Dark</span>'
      : '<span>Dark Mode</span><span class="badge-pill badge-dark" style="font-size:0.7rem; padding:2px 6px;">Active Light</span>';
  });

  setTimeout(() => {
    document.body?.classList.remove('theme-transitioning');
  }, 350);
}

/**
 * Toggles theme between Light and Dark
 */
export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme, true);
}

/**
 * RTL Layout Controller with Automatic Locale Detection
 */
export function initRtlController() {
  const savedRtl = localStorage.getItem('trendz_rtl');
  let isRtl = false;

  if (savedRtl !== null) {
    isRtl = savedRtl === 'true';
  } else {
    // Automatic system / browser locale detection
    const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'dv', 'ps', 'ku', 'yi', 'ug'];
    const userLocale = (navigator.language || navigator.userLanguage || '').toLowerCase().split('-')[0];
    isRtl = rtlLanguages.includes(userLocale);
  }

  applyRtl(isRtl, false);
}

/**
 * Applies RTL or LTR layout
 */
export function applyRtl(isRtl, isManual = true) {
  const dir = isRtl ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  if (document.body) {
    document.body.setAttribute('dir', dir);
  }

  if (isManual) {
    localStorage.setItem('trendz_rtl', isRtl ? 'true' : 'false');
    window.showToast?.(isRtl ? 'RTL Layout Activated (Right-to-Left)' : 'LTR Layout Activated (Left-to-Right)', 'info');
  }

  // Update quick RTL toggle button state
  document.querySelectorAll('.rtl-quick-toggle-btn').forEach(btn => {
    btn.classList.toggle('active', isRtl);
    btn.setAttribute('title', isRtl ? 'Switch to LTR Mode (Alt + R)' : 'Switch to RTL Mode (Alt + R)');
  });

  // Update dropdown buttons
  document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
    btn.innerHTML = isRtl
      ? '<span>LTR Mode</span><span class="badge-pill badge-yellow" style="font-size:0.7rem; padding:2px 6px;">Active RTL</span>'
      : '<span>RTL Mode</span><span class="badge-pill badge-dark" style="font-size:0.7rem; padding:2px 6px;">Active LTR</span>';
  });
}

/**
 * Toggles RTL layout direction
 */
export function toggleRtl() {
  const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
  const newRtl = currentDir !== 'rtl';
  applyRtl(newRtl, true);
}

/**
 * Initializes and Mounts the Unified Navbar & Footer
 */
export function initLayout() {
  const paths = getPathPrefixes();

  // 1. Mount Navbar
  let headerEl = document.querySelector('header.header') || document.getElementById('navbar-container');
  if (headerEl) {
    if (!headerEl.classList.contains('header')) headerEl.classList.add('header');
    headerEl.innerHTML = renderNavbar(paths);
  }

  // 2. Mount Footer
  let footerEl = document.querySelector('footer.footer') || document.getElementById('footer-container');
  if (footerEl) {
    if (!footerEl.classList.contains('footer')) footerEl.classList.add('footer');
    footerEl.innerHTML = renderFooter(paths);
  }

  // 3. Mount Toast Container if missing
  if (!document.getElementById('toastContainer')) {
    const toastCont = document.createElement('div');
    toastCont.id = 'toastContainer';
    toastCont.className = 'toast-container';
    document.body.appendChild(toastCont);
  }

  // 4. Setup Theme and RTL with System Preference Detection
  initThemeController();
  initRtlController();

  // 5. Setup UI & Event Listeners
  setupDropdownEvents();
  setupQuickThemeButtons();
  setupKeyboardShortcuts();
  setupScrollEffect();
  setupMobileMenu();
  highlightActiveLink();
  setupFooterNewsletter();
}

/**
 * Sets up profile dropdown, theme toggler, and RTL toggler
 */
function setupDropdownEvents() {
  const dropdownWrappers = document.querySelectorAll('.profile-dropdown-wrapper');

  dropdownWrappers.forEach(wrapper => {
    const trigger = wrapper.querySelector('.profile-trigger-btn');
    const menu = wrapper.querySelector('.profile-dropdown-menu');

    if (!trigger || !menu) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('show');
      closeAllDropdowns();
      if (!isOpen) {
        menu.classList.add('show');
        trigger.classList.add('active');
      }
    });

    // Theme Switcher Button inside Dropdown
    const themeBtn = menu.querySelector('.theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTheme();
      });
    }

    // RTL Switcher Button inside Dropdown
    const rtlBtn = menu.querySelector('.rtl-toggle-btn');
    if (rtlBtn) {
      rtlBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleRtl();
      });
    }
  });

  document.addEventListener('click', () => {
    closeAllDropdowns();
  });
}

function closeAllDropdowns() {
  document.querySelectorAll('.profile-dropdown-menu').forEach(m => m.classList.remove('show'));
  document.querySelectorAll('.profile-trigger-btn').forEach(t => t.classList.remove('active'));
}

/**
 * Sets up header quick theme & RTL toggle buttons
 */
function setupQuickThemeButtons() {
  document.querySelectorAll('.theme-quick-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
  });

  document.querySelectorAll('.rtl-quick-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleRtl();
    });
  });
}

/**
 * Accessibility: Keyboard shortcuts (Alt+T for Theme, Alt+R for RTL)
 */
function setupKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Don't trigger if user is typing in an input / textarea
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
      return;
    }

    // Alt + T -> Toggle Theme
    if (e.altKey && (e.key === 't' || e.key === 'T')) {
      e.preventDefault();
      toggleTheme();
    }

    // Alt + R -> Toggle RTL
    if (e.altKey && (e.key === 'r' || e.key === 'R')) {
      e.preventDefault();
      toggleRtl();
    }
  });
}

/**
 * Header scroll transparency -> frosted glass effect
 */
function setupScrollEffect() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * Mobile responsive menu drawer toggle
 */
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const nav = document.querySelector('.header nav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('mobile-active');
      toggleBtn.innerHTML = nav.classList.contains('mobile-active') ? '✕' : '☰';
    });
  }
}

/**
 * Highlights current active link in navbar
 */
function highlightActiveLink() {
  const currentUrl = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href')?.toLowerCase() || '';
    if (href.startsWith('#')) return;

    const linkFilename = href.split('/').pop();
    const currentFilename = currentUrl.split('/').pop() || 'index.html';

    if (linkFilename === currentFilename || 
       ((currentFilename === '' || currentFilename === 'index.html') && linkFilename === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Handles footer newsletter subscription
 */
function setupFooterNewsletter() {
  const form = document.getElementById('footerNewsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('footerNewsletterEmail');
      const email = emailInput ? emailInput.value.trim() : '';
      if (email) {
        window.showToast?.(`Thank you! ${email} has been subscribed to creator updates.`, 'success');
        form.reset();
      }
    });
  }
}

// Global click delegation for cart buttons
document.addEventListener('click', (e) => {
  const openCartBtn = e.target.closest('[data-action="open-cart"]');
  if (openCartBtn && window.cartManager) {
    e.preventDefault();
    window.cartManager.openDrawer();
  }
});

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLayout);
} else {
  initLayout();
}
