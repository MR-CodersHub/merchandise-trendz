/**
 * Creator Dashboard & Earnings Calculator Controller
 */

export class CreatorHub {
  constructor() {
    this.initDOM();
  }

  initDOM() {
    this.slider = document.getElementById('creatorSalesSlider');
    this.salesCountEl = document.getElementById('creatorSalesCount');
    this.monthlyProfitEl = document.getElementById('creatorMonthlyProfit');
    this.annualProfitEl = document.getElementById('creatorAnnualProfit');
    this.openDashboardBtn = document.getElementById('openCreatorDashboardBtn');
    this.modalOverlay = document.getElementById('creatorDashboardModal');
    this.closeModalBtn = document.getElementById('closeCreatorModalBtn');

    this.bindEvents();
    this.calculateEarnings();
  }

  bindEvents() {
    this.slider?.addEventListener('input', () => this.calculateEarnings());

    this.openDashboardBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.openModal();
    });

    this.closeModalBtn?.addEventListener('click', () => this.closeModal());

    this.modalOverlay?.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) this.closeModal();
    });

    // Payout simulator
    const payoutBtn = document.getElementById('requestPayoutBtn');
    if (payoutBtn) {
      payoutBtn.addEventListener('click', () => {
        window.showToast?.('💳 Payout request of $3,420.00 submitted via Stripe Express!', 'success');
      });
    }
  }

  calculateEarnings() {
    if (!this.slider) return;
    const sales = parseInt(this.slider.value, 10);
    const avgProfitPerSale = 15.50; // Average creator net profit after POD fulfillment cost
    const monthlyProfit = sales * avgProfitPerSale;
    const annualProfit = monthlyProfit * 12;

    if (this.salesCountEl) this.salesCountEl.textContent = `${sales.toLocaleString()} Sales / mo`;
    if (this.monthlyProfitEl) this.monthlyProfitEl.textContent = `$${Math.round(monthlyProfit).toLocaleString()}`;
    if (this.annualProfitEl) this.annualProfitEl.textContent = `$${Math.round(annualProfit).toLocaleString()} / yr`;
  }

  openModal() {
    this.modalOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }
}
