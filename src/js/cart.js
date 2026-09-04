/**
 * Cart State & Drawer Controller
 */

export class CartManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('pod_cart_items')) || [
      {
        id: 'cart-init-1',
        productId: 'prod-02',
        title: 'Oversized Streetwear Fleece Hoodie',
        color: '#FFFFFF',
        size: 'L',
        printPlacement: 'Front Center',
        artworkName: 'Retro Sunrise Wave',
        price: 42.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
      }
    ];
    this.discountPercent = 0;
    this.discountCode = '';
    this.initDOM();
  }

  initDOM() {
    this.drawerOverlay = document.getElementById('cartDrawerOverlay');
    this.drawer = document.getElementById('cartDrawer');
    this.drawerList = document.getElementById('cartItemsList');
    this.cartCountBadges = document.querySelectorAll('.cart-badge-count');
    this.cartSubtotalEl = document.getElementById('cartSubtotal');
    this.cartDiscountRow = document.getElementById('cartDiscountRow');
    this.cartDiscountVal = document.getElementById('cartDiscountVal');
    this.cartTotalEl = document.getElementById('cartTotal');
    this.couponInput = document.getElementById('cartCouponInput');
    this.couponBtn = document.getElementById('cartCouponBtn');

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Open cart drawer triggers 
document.querySelectorAll('[data-action="open-cart"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Close cart triggers 
document.querySelectorAll('[data-action="close-cart"]').forEach(btn => {
      btn.addEventListener('click', () => this.closeDrawer());
    });

    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', (e) => {
        if (e.target === this.drawerOverlay) this.closeDrawer();
      });
    }

    if (this.couponBtn && this.couponInput) {
      this.couponBtn.addEventListener('click', () => {
        const code = this.couponInput.value.trim().toUpperCase();
        if (code === 'YELLOW20' || code === 'CREATOR20' || code === 'TRENDZ20' || code === 'TRENDZ') {
          this.discountPercent = 0.20;
          this.discountCode = code;
          this.render();
          window.showToast?.(' 20% Discount Code Applied!', 'success');
        } else if (code === '') {
          window.showToast?.('Please enter a coupon code.', 'info');
        } else {
          window.showToast?.('Invalid coupon code. Try YELLOW20 or TRENDZ20', 'warning');
        }
      });
    }

    // Checkout CTA 
const checkoutBtn = document.getElementById('cartCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.items.length === 0) {
          window.showToast?.('Your cart is empty! Add products to proceed.', 'warning');
          return;
        }
        window.showToast?.(' Proceeding to Secure Encrypted Checkout...', 'success');
        setTimeout(() => {
          alert('Order placed successfully in Demo Mode! Thank you for ordering from TrendZ Studio.');
          this.items = [];
          this.save();
          this.render();
          this.closeDrawer();
        }, 1200);
      });
    }
  }

  openDrawer() {
    this.drawerOverlay?.classList.add('active');
    this.drawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    this.drawerOverlay?.classList.remove('active');
    this.drawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  addItem(item) {
    // Check if duplicate item exists 
const existingIndex = this.items.findIndex(
      i => i.productId === item.productId && i.color === item.color && i.size === item.size && i.artworkName === item.artworkName
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += (item.quantity || 1);
    } else {
      this.items.push({
        id: 'cart-' + Date.now(),
        quantity: item.quantity || 1,
        ...item
      });
    }

    this.save();
    this.render();
    this.openDrawer();
    window.showToast?.(` Added "${item.title}" to cart!`, 'success');
  }

  updateQuantity(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.items = this.items.filter(i => i.id !== id);
    }

    this.save();
    this.render();
  }

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.render();
    window.showToast?.('Item removed from cart', 'info');
  }

  save() {
    localStorage.setItem('pod_cart_items', JSON.stringify(this.items));
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    const discount = subtotal * this.discountPercent;
    return Math.max(0, subtotal - discount);
  }

  render() {
    const totalCount = this.items.reduce((sum, i) => sum + i.quantity, 0);
    this.cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
    });

    if (!this.drawerList) return;

    if (this.items.length === 0) {
      this.drawerList.innerHTML = `
        <div style="text-align: center; padding: 48px 20px;">
          <div style="font-size: 3rem; margin-bottom: 12px;"></div>
          <h4 style="margin-bottom: 8px; font-weight: 800;">Your Cart is Empty</h4>
          <p style="font-size: 0.9rem; color: #6B7280; margin-bottom: 20px;">Pick a custom product or launch our Mockup Studio to start creating!</p>
          <button class="btn btn-yellow btn-sm" data-action="close-cart" onclick="document.querySelector('#customizerSection').scrollIntoView({behavior: 'smooth'})">
            Launch Mockup Studio ↗
          </button>
        </div>
      `;
    } else {
      this.drawerList.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-meta">
              ${item.size ? `Size: <strong>${item.size}</strong> • ` : ''}
              ${item.artworkName ? `Print: <strong>${item.artworkName}</strong>` : ''}
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div class="cart-item-stepper">
                <button class="cart-step-btn" onclick="window.cartManager.updateQuantity('${item.id}', -1)">−</button>
                <span class="cart-step-val">${item.quantity}</span>
                <button class="cart-step-btn" onclick="window.cartManager.updateQuantity('${item.id}', 1)">+</button>
              </div>
              <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
          <button onclick="window.cartManager.removeItem('${item.id}')" style="color: #9CA3AF; padding: 4px;" title="Remove Item">✕</button>
        </div>
      `).join('');
    }

    const subtotal = this.getSubtotal();
    const discount = subtotal * this.discountPercent;
    const total = this.getTotal();

    if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (this.cartDiscountRow) {
      if (this.discountPercent > 0) {
        this.cartDiscountRow.style.display = 'flex';
        if (this.cartDiscountVal) this.cartDiscountVal.textContent = `-$${discount.toFixed(2)} (${this.discountCode})`;
      } else {
        this.cartDiscountRow.style.display = 'none';
      }
    }
    if (this.cartTotalEl) this.cartTotalEl.textContent = `$${total.toFixed(2)}`;
  }
}
