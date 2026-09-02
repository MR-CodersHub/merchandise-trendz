/**
 * TrendZ Dynamic Service Details Page Controller
 * Reads ?id=... parameter from URL and loads service details dynamically
 */

import { servicesData } from './services-data.js';

export function initServiceDetails() {
  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get('id') || 'dtg-printing';

  const service = servicesData.find(s => s.id === serviceId) || servicesData[0];

  renderServiceDetails(service);
}

function renderServiceDetails(service) {
  // Update Document Title
  document.title = `${service.title} | TrendZ Custom Merchandise`;

  // Breadcrumb
  const breadcrumbCurrent = document.getElementById('serviceBreadcrumbCurrent');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = service.title;

  // Hero Section Elements
  const heroBadge = document.getElementById('serviceHeroBadge');
  if (heroBadge) heroBadge.textContent = service.badge;

  const heroCategory = document.getElementById('serviceHeroCategory');
  if (heroCategory) heroCategory.textContent = service.category;

  const heroTitle = document.getElementById('serviceHeroTitle');
  if (heroTitle) heroTitle.innerHTML = highlightWords(service.title);

  const heroSubtitle = document.getElementById('serviceHeroSubtitle');
  if (heroSubtitle) heroSubtitle.textContent = service.subtitle;

  const heroTurnaround = document.getElementById('serviceTurnaround');
  if (heroTurnaround) heroTurnaround.textContent = service.turnaround;

  const heroMinOrder = document.getElementById('serviceMinOrder');
  if (heroMinOrder) heroMinOrder.textContent = service.minOrder;

  const heroRating = document.getElementById('serviceRating');
  if (heroRating) heroRating.textContent = `★ ${service.rating} (${service.reviewsCount} reviews)`;

  const heroImage = document.getElementById('serviceHeroImage');
  if (heroImage) {
    heroImage.src = service.heroImage;
    heroImage.alt = service.title;
  }

  // Overview Text
  const overviewEl = document.getElementById('serviceOverview');
  if (overviewEl) overviewEl.textContent = service.overview;

  // Benefits Grid
  const benefitsGrid = document.getElementById('serviceBenefitsGrid');
  if (benefitsGrid) {
    benefitsGrid.innerHTML = service.benefits.map((b, idx) => `
      <div class="glass-panel" style="padding: 24px; position: relative; overflow: hidden;">
        <div style="font-size: 1.8rem; font-weight: 900; color: var(--primary-yellow); opacity: 0.7; margin-bottom: 8px;">0${idx + 1}</div>
        <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 8px; color: var(--color-dark);">${b.title}</h3>
        <p style="font-size: 0.92rem; color: var(--color-text-muted); line-height: 1.6;">${b.desc}</p>
      </div>
    `).join('');
  }

  // Technical Specs Table
  const specsTableBody = document.getElementById('serviceSpecsTableBody');
  if (specsTableBody) {
    specsTableBody.innerHTML = service.technicalSpecs.map(spec => `
      <tr style="border-bottom: 1px solid var(--border-light);">
        <td style="padding: 14px 18px; font-weight: 700; color: var(--color-dark); width: 35%;">${spec.key}</td>
        <td style="padding: 14px 18px; color: var(--color-text-muted);">${spec.value}</td>
      </tr>
    `).join('');
  }

  // Pricing Tiers Cards
  const pricingContainer = document.getElementById('servicePricingGrid');
  if (pricingContainer) {
    pricingContainer.innerHTML = service.pricingTiers.map(tier => `
      <div class="pricing-card ${tier.isPopular ? 'featured' : ''}">
        ${tier.isPopular ? '<span class="badge-pill badge-yellow" style="position: absolute; top: -14px; right: 24px; font-size: 0.75rem;">Most Popular</span>' : ''}
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 6px; color: var(--color-dark);">${tier.tier}</h3>
          <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 18px;">Volume: ${tier.qtyRange}</div>
          <div style="font-size: 2.4rem; font-weight: 900; color: var(--color-dark); margin-bottom: 24px; font-family: var(--font-heading);">
            ${tier.pricePerUnit} <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-text-muted);">/ item</span>
          </div>
          <ul style="list-style: none; margin-bottom: 28px; display: flex; flex-direction: column; gap: 10px;">
            ${tier.features.map(f => `
              <li style="display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: var(--color-text-main);">
                <span style="color: #10B981; font-weight: 800;">✓</span> ${f}
              </li>
            `).join('')}
          </ul>
        </div>
        <button class="btn ${tier.isPopular ? 'btn-yellow' : 'btn-outline'}" style="width: 100%;" onclick="window.showToast('Selected ${tier.tier} for ${service.title}! Redirecting to customizer...', 'success')">
          Select Tier ➔
        </button>
      </div>
    `).join('');
  }

  // FAQs Accordion
  const faqsContainer = document.getElementById('serviceFaqsAccordion');
  if (faqsContainer) {
    faqsContainer.innerHTML = service.faqs.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}" style="margin-bottom: 12px;">
        <button class="faq-question" style="width: 100%; text-align: left; padding: 18px 24px; font-weight: 700; font-size: 1.05rem; display: flex; justify-content: space-between; align-items: center;">
          <span>${faq.q}</span>
          <span class="faq-toggle" style="font-size: 1.2rem; transition: transform 0.3s ease;">${idx === 0 ? '−' : '+'}</span>
        </button>
        <div class="faq-answer" style="padding: 0 24px 18px; color: var(--color-text-muted); line-height: 1.7; display: ${idx === 0 ? 'block' : 'none'};">
          ${faq.a}
        </div>
      </div>
    `).join('');

    // Attach FAQ toggle handlers
    faqsContainer.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const ans = item.querySelector('.faq-answer');
        const icon = btn.querySelector('.faq-toggle');
        const isOpen = item.classList.contains('active');

        faqsContainer.querySelectorAll('.faq-item').forEach(other => {
          other.classList.remove('active');
          const a = other.querySelector('.faq-answer');
          if (a) a.style.display = 'none';
          const t = other.querySelector('.faq-toggle');
          if (t) t.textContent = '+';
        });

        if (!isOpen) {
          item.classList.add('active');
          if (ans) ans.style.display = 'block';
          if (icon) icon.textContent = '−';
        }
      });
    });
  }

  // Related Services Section
  const relatedGrid = document.getElementById('relatedServicesGrid');
  if (relatedGrid) {
    const others = servicesData.filter(s => s.id !== service.id).slice(0, 3);
    relatedGrid.innerHTML = others.map(other => `
      <div class="glass-panel" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="font-size: 2.2rem; margin-bottom: 14px;">${other.icon}</div>
          <span class="badge-pill badge-yellow" style="font-size: 0.72rem; margin-bottom: 10px;">${other.category}</span>
          <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 8px; color: var(--color-dark);">${other.title}</h3>
          <p style="font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 16px;">${other.subtitle}</p>
        </div>
        <a href="service-details.html?id=${other.id}" class="btn btn-outline btn-sm" style="font-weight: 700;">
          Explore Service ➔
        </a>
      </div>
    `).join('');
  }
}

function highlightWords(str) {
  const parts = str.split(' ');
  if (parts.length > 2) {
    const lastWord = parts.pop();
    return `${parts.join(' ')} <span class="highlight-yellow">${lastWord}</span>`;
  }
  return str;
}

// Auto-run if on service details page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initServiceDetails);
} else {
  initServiceDetails();
}
