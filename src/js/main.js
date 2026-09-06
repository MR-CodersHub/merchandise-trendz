/**
 * Main Application Coordinator
 */

import { products } from './products.js';
import { CartManager } from './cart.js';
import { MockupCustomizer } from './customizer.js';
import { CreatorHub } from './creator.js';
import { initNavbar } from './navbar.js';
import { initFormValidation } from './form-validation.js';

// Toast Notification Dispatcher
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'success') {
    toast.style.borderLeftColor = '#10B981';
  } else if (type === 'warning') {
    toast.style.borderLeftColor = '#EF4444';
  } else {
    toast.style.borderLeftColor = '#FFB800';
  }

  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
};

// Main Initialization
function initApp() {
  // Initialize Shared Layout & Navbar
  initNavbar();

  // Initialize Core Managers
  window.cartManager = new CartManager();
  window.customizer = new MockupCustomizer();
  window.creatorHub = new CreatorHub();

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Render Product Catalog
  renderProductGrid('all');

  // Category Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderProductGrid(category);
    });
  });

  // Quick View Modal Controller
  initQuickViewModal();

  // FAQ Accordion
  initFAQ();

  // Mobile Menu Navigation
  initMobileMenu();

  // Newsletter Form
  initNewsletter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Render Products Grid
function renderProductGrid(category = 'all') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const filtered = category === 'all' 
    ? products 
    : products.filter(p => p.category === category);

  grid.innerHTML = filtered.map(product => `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-card-img-wrap">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" class="product-card-img" loading="lazy">
        <div class="product-actions">
          <button class="product-action-btn" onclick="openQuickView('${product.id}')" title="Quick View">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button class="product-action-btn" onclick="quickAddToCart('${product.id}')" title="Quick Add">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <span class="product-card-category">${product.categoryLabel}</span>
        <h4 class="product-card-title">${product.name}</h4>
        <div class="product-rating">
          <div class="stars">★★★★★</div>
          <span>${product.rating} (${product.reviewsCount})</span>
        </div>
        <div class="product-card-footer">
          <div class="product-price-box">
            <span class="product-price-label">From</span>
            <span class="product-price">$${product.basePrice.toFixed(2)}</span>
            <span class="product-price bulk">Bulk: $${product.bulkPrice.toFixed(2)}</span>
          </div>
          <button class="btn btn-yellow btn-sm" onclick="openQuickView('${product.id}')">
            Customize ↗
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Quick Add Handler
window.quickAddToCart = function(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  window.cartManager.addItem({
    productId: prod.id,
    title: prod.name,
    color: prod.colors[0],
    size: prod.sizes[0],
    artworkName: 'Standard Blank / Ready for Print',
    price: prod.basePrice,
    quantity: 1,
    image: prod.image
  });
};

// Quick View Modal
function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('closeQuickViewBtn');

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('active');
    document.body.style.overflow = '';
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

window.openQuickView = function(productId) {
  const prod = products.find(p => p.id === productId);
  const modal = document.getElementById('quickViewModal');
  const body = document.getElementById('quickViewBody');
  if (!prod || !modal || !body) return;

  let selectedSize = prod.sizes[0];
  let selectedColor = prod.colors[0];

  body.innerHTML = `
    <div class="qv-modal-grid">
      <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 24px;">
        <img src="${prod.image}" alt="${prod.name}" style="max-height: 320px; object-fit: contain;">
      </div>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <span class="badge-pill badge-yellow" style="width: fit-content;">${prod.categoryLabel}</span>
        <h3 style="font-size: 1.6rem; font-weight: 800;">${prod.name}</h3>
        <p style="font-size: 0.92rem; color: #6B7280; line-height: 1.5;">${prod.description}</p>
        
        <div style="display: flex; gap: 20px; align-items: baseline; margin: 4px 0;">
          <span style="font-size: 1.8rem; font-weight: 800; font-family: var(--font-heading);">$${prod.basePrice.toFixed(2)}</span>
          <span style="font-size: 0.9rem; color: #059669; font-weight: 700;">Bulk (50+ pcs): $${prod.bulkPrice.toFixed(2)}</span>
        </div>

        <div>
          <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; margin-bottom: 8px;">Select Size / Option:</div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${prod.sizes.map((s, idx) => `
              <button class="btn btn-outline btn-sm qv-size-btn ${idx === 0 ? 'active' : ''}" 
                      style="padding: 6px 14px; font-weight: 700; ${idx === 0 ? 'background: var(--primary-yellow); color: var(--color-dark); border-color: var(--primary-yellow);' : ''}" 
                      onclick="window.selectModalSize(this, '${s}')">
                ${s}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 10px; display: flex; gap: 12px;">
          <button class="btn btn-yellow" style="flex-grow: 1;" onclick="window.addFromQuickView('${prod.id}')">
            Add to Order ↗
          </button>
        </div>
      </div>
    </div>
  `;

  window.currentQuickViewProduct = prod;
  window.currentQuickViewSize = selectedSize;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.selectModalSize = function(btn, size) {
  document.querySelectorAll('.qv-size-btn').forEach(b => {
    b.style.background = 'transparent';
    b.style.color = '';
    b.style.borderColor = '';
  });
  btn.style.background = 'var(--primary-yellow)';
  btn.style.color = 'var(--color-dark)';
  btn.style.borderColor = 'var(--primary-yellow)';
  window.currentQuickViewSize = size;
};

window.addFromQuickView = function(productId) {
  const prod = window.currentQuickViewProduct;
  if (!prod) return;

  window.cartManager.addItem({
    productId: prod.id,
    title: prod.name,
    color: prod.colors[0],
    size: window.currentQuickViewSize || prod.sizes[0],
    artworkName: 'Custom Print Ready',
    price: prod.basePrice,
    quantity: 1,
    image: prod.image
  });

  document.getElementById('quickViewModal')?.classList.remove('active');
  document.body.style.overflow = '';
};

window.customizeFromQuickView = function(productId) {
  document.getElementById('quickViewModal')?.classList.remove('active');
  document.body.style.overflow = '';
  document.getElementById('customizerSection')?.scrollIntoView({ behavior: 'smooth' });
};

// FAQ
function initFAQ() {
  const cards = document.querySelectorAll('.faq-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      cards.forEach(c => c.classList.remove('open'));
      if (!isOpen) card.classList.add('open');
    });
  });
}

// Mobile Menu
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');

  toggleBtn?.addEventListener('click', () => {
    if (navLinks) {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'var(--bg-surface)';
      navLinks.style.padding = '24px';
      navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    }
  });
}

// Newsletter
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      window.showToast?.('Thank you for subscribing! Your 20% discount code is YELLOW20', 'success');
      form.reset();
    });
  });
}
