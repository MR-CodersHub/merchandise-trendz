/**
 * TrendZ Shared Navbar, Theme, RTL & Profile Dropdown Controller
 */

// Toast Notification Dispatcher available globally
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
    <span style="font-size: 1.1rem;">${type === 'success' ? '✓' : type === 'error' ? '⚠' : '⚡'}</span>
    <span>${message}</span>
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

export function initNavbar() {
  // Determine root path prefix based on current page location
  const path = window.location.pathname.replace(/\\/g, '/');
  let prefix = './';
  let rootPrefix = './';

  if (path.includes('/public/auth/admin/') || path.includes('/public/auth/user/')) {
    prefix = '../../pages/';
    rootPrefix = '../../../';
  } else if (path.includes('/public/auth/')) {
    prefix = '../pages/';
    rootPrefix = '../../';
  } else if (path.includes('/public/pages/')) {
    prefix = './';
    rootPrefix = '../../';
  }

  // Apply saved Theme Preference
  const savedTheme = localStorage.getItem('trendz_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Apply saved RTL Preference
  const savedRtl = localStorage.getItem('trendz_rtl') === 'true';
  if (savedRtl) {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }

  // Profile Dropdown Setup
  setupProfileDropdown(rootPrefix, prefix);

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile Menu Setup
  setupMobileMenu();

  // Highlight Current Active Nav Link
  highlightActiveLink();
}

function setupProfileDropdown(rootPrefix, pagesPrefix) {
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
      updateThemeBtnText(themeBtn);
      themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('trendz_theme', newTheme);
        updateThemeBtnText(themeBtn);
        window.showToast(`Switched to ${newTheme === 'dark' ? 'Dark 🌙' : 'Light ☀️'} mode`, 'info');
      });
    }

    // RTL Switcher Button inside Dropdown
    const rtlBtn = menu.querySelector('.rtl-toggle-btn');
    if (rtlBtn) {
      updateRtlBtnText(rtlBtn);
      rtlBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('trendz_rtl', newDir === 'rtl' ? 'true' : 'false');
        updateRtlBtnText(rtlBtn);
        window.showToast(`Switched to ${newDir.toUpperCase()} layout`, 'info');
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

function updateThemeBtnText(btn) {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  btn.innerHTML = currentTheme === 'dark' 
    ? '<span>☀️ Light Mode</span><span class="badge-pill badge-yellow" style="font-size:0.7rem; padding:2px 6px;">Active Dark</span>'
    : '<span>🌙 Dark Mode</span><span class="badge-pill badge-dark" style="font-size:0.7rem; padding:2px 6px;">Active Light</span>';
}

function updateRtlBtnText(btn) {
  const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
  btn.innerHTML = currentDir === 'rtl'
    ? '<span>🌐 LTR Mode</span><span class="badge-pill badge-yellow" style="font-size:0.7rem; padding:2px 6px;">Active RTL</span>'
    : '<span>🌐 RTL Mode</span><span class="badge-pill badge-dark" style="font-size:0.7rem; padding:2px 6px;">Active LTR</span>';
}

function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const nav = document.querySelector('.header nav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('mobile-active');
      toggleBtn.innerHTML = nav.classList.contains('mobile-active') ? '✕' : '☰';
    });
  }
}

function highlightActiveLink() {
  const currentUrl = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href')?.toLowerCase() || '';
    if (href.startsWith('#')) return;

    if (currentUrl.endsWith(href) || (currentUrl.endsWith('/') && href.includes('index.html'))) {
      link.classList.add('active');
    }
  });
}

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar);
} else {
  initNavbar();
}
