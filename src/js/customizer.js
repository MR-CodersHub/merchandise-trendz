/**
 * Interactive Live Mockup Studio Customizer
 */

import { sampleArtworks } from './products.js';

export class MockupCustomizer {
  constructor() {
    this.productsMap = {
      tshirt: {
        name: 'Custom Heavyweight T-Shirt',
        price: 24.00,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
        colors: ['#FFFFFF', '#18181B', '#FFB800', '#3B82F6', '#6B7280'],
        defaultColor: '#FFFFFF',
        printBox: { top: '46%', left: '50%', width: '120px', height: '140px' }
      },
      hoodie: {
        name: 'Custom Streetwear Fleece Hoodie',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
        colors: ['#FFFFFF', '#18181B', '#E5E7EB', '#D97706'],
        defaultColor: '#FFFFFF',
        printBox: { top: '48%', left: '50%', width: '110px', height: '130px' }
      },
      mug: {
        name: 'Custom Ceramic Coffee Mug',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
        colors: ['#FFFFFF', '#18181B', '#FFB800'],
        defaultColor: '#FFFFFF',
        printBox: { top: '52%', left: '46%', width: '100px', height: '100px' }
      },
      tote: {
        name: 'Custom Organic Canvas Tote',
        price: 18.00,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        colors: ['#F3F4F6', '#18181B', '#FEF3C7'],
        defaultColor: '#F3F4F6',
        printBox: { top: '56%', left: '50%', width: '130px', height: '140px' }
      },
      phonecase: {
        name: 'Custom Impact MagSafe Phone Case',
        price: 26.00,
        image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80',
        colors: ['#18181B', '#FFFFFF', '#FFB800'],
        defaultColor: '#18181B',
        printBox: { top: '50%', left: '50%', width: '110px', height: '170px' }
      }
    };

    this.state = {
      productKey: 'hoodie',
      color: '#FFFFFF',
      artId: 'art-1',
      customText: 'TrendZ 26',
      mode: 'artwork', // 'artwork' or 'text'
      size: 'L'
    };

    this.initDOM();
  }

  initDOM() {
    this.baseImage = document.getElementById('customizerBaseImage');
    this.printArea = document.getElementById('customizerPrintArea');
    this.printArt = document.getElementById('customizerPrintArt');
    this.printText = document.getElementById('customizerPrintText');
    this.productBtns = document.querySelectorAll('.customizer-product-btn');
    this.colorSwatchesContainer = document.getElementById('customizerColorSwatches');
    this.artPickerContainer = document.getElementById('customizerArtPicker');
    this.textInput = document.getElementById('customizerTextInput');
    this.priceTag = document.getElementById('customizerPriceTag');
    this.addToCartBtn = document.getElementById('customizerAddToCartBtn');
    this.sizeSelect = document.getElementById('customizerSizeSelect');

    this.renderArtPicker();
    this.bindEvents();
    this.updatePreview();
  }

  renderArtPicker() {
    if (!this.artPickerContainer) return;
    this.artPickerContainer.innerHTML = sampleArtworks.map(art => `
      <div class="art-thumb-btn ${art.id === this.state.artId ? 'active' : ''}" data-art-id="${art.id}" title="${art.name}">
        ${art.svg}
      </div>
    `).join('');
  }

  renderColorSwatches() {
    const currentProduct = this.productsMap[this.state.productKey];
    if (!this.colorSwatchesContainer || !currentProduct) return;

    this.colorSwatchesContainer.innerHTML = currentProduct.colors.map(color => `
      <div class="color-swatch ${color === this.state.color ? 'active' : ''}" 
           style="background-color: ${color};" 
           data-color="${color}" 
           title="${color}"></div>
    `).join('');
  }

  bindEvents() {
    // Product type toggle 
this.productBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-product-key');
        if (!key || !this.productsMap[key]) return;

        this.productBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.state.productKey = key;
        this.state.color = this.productsMap[key].defaultColor;
        this.updatePreview();
      });
    });

    // Color Swatch delegation 
this.colorSwatchesContainer?.addEventListener('click', (e) => {
      const swatch = e.target.closest('.color-swatch');
      if (!swatch) return;

      const color = swatch.getAttribute('data-color');
      this.state.color = color;
      this.updatePreview();
    });

    // Artwork preset delegation 
this.artPickerContainer?.addEventListener('click', (e) => {
      const btn = e.target.closest('.art-thumb-btn');
      if (!btn) return;

      this.state.artId = btn.getAttribute('data-art-id');
      this.state.mode = 'artwork';
      this.renderArtPicker();
      this.updatePreview();
    });

    // Custom Text input 
this.textInput?.addEventListener('input', (e) => {
      this.state.customText = e.target.value.toUpperCase();
      this.state.mode = 'text';
      this.updatePreview();
    });

    // Size Select 
this.sizeSelect?.addEventListener('change', (e) => {
      this.state.size = e.target.value;
    });

    // Add Customized Item to Cart 
this.addToCartBtn?.addEventListener('click', () => {
      const product = this.productsMap[this.state.productKey];
      const selectedArt = sampleArtworks.find(a => a.id === this.state.artId);

      const customItem = {
        productId: 'custom-' + this.state.productKey,
        title: product.name,
        color: this.state.color,
        size: this.state.size,
        printPlacement: 'Front Center Print',
        artworkName: this.state.mode === 'artwork' ? selectedArt?.name : `Custom Text: "${this.state.customText}"`,
        price: product.price,
        quantity: 1,
        image: product.image
      };

      window.cartManager?.addItem(customItem);
    });
  }

  updatePreview() {
    const product = this.productsMap[this.state.productKey];
    if (!product) return;

    this.renderColorSwatches();

    // Update base image 
if (this.baseImage) {
      this.baseImage.src = product.image;
      this.baseImage.alt = product.name;
    }

    // Update Print area positioning 
if (this.printArea) {
      this.printArea.style.top = product.printBox.top;
      this.printArea.style.left = product.printBox.left;
      this.printArea.style.width = product.printBox.width;
      this.printArea.style.height = product.printBox.height;
    }

    // Render Artwork or Text inside print area 
const selectedArt = sampleArtworks.find(a => a.id === this.state.artId);
    if (this.state.mode === 'artwork' && selectedArt) {
      if (this.printArt) {
        this.printArt.style.display = 'block';
        this.printArt.innerHTML = selectedArt.svg;
      }
      if (this.printText) {
        this.printText.style.display = 'none';
      }
    } else {
      if (this.printArt) this.printArt.style.display = 'none';
      if (this.printText) {
        this.printText.style.display = 'block';
        this.printText.textContent = this.state.customText || 'YOUR TEXT';
        this.printText.style.color = (this.state.color === '#FFFFFF' || this.state.color === '#F3F4F6') ? '#111111' : '#FFB800';
      }
    }

    // Update Price display 
if (this.priceTag) {
      this.priceTag.textContent = `$${product.price.toFixed(2)}`;
    }
  }
}
