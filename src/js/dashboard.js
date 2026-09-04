/**
 * TrendZ Admin & User Dashboard Unified Controller
 */

export function initDashboard() {
  // Tab Switching 
const navTabs = document.querySelectorAll('.dashboard-nav-link[data-tab]');
  const tabContents = document.querySelectorAll('.dashboard-tab-content');

  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = tab.getAttribute('data-tab');

      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabContents.forEach(content => {
        if (content.id === `tab-${targetTab}`) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });
    });
  });

  // Table Search Filter 
const tableSearchInput = document.getElementById('dashboardTableSearch');
  if (tableSearchInput) {
    tableSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll('.dashboard-data-table tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // Payout Request Modal 
const requestPayoutBtn = document.getElementById('requestPayoutBtn');
  const payoutModal = document.getElementById('payoutModal');
  const closePayoutBtn = document.getElementById('closePayoutModalBtn');
  const confirmPayoutBtn = document.getElementById('confirmPayoutSubmitBtn');

  if (requestPayoutBtn && payoutModal) {
    requestPayoutBtn.addEventListener('click', () => {
      payoutModal.classList.add('active');
    });
  }

  if (closePayoutBtn && payoutModal) {
    closePayoutBtn.addEventListener('click', () => {
      payoutModal.classList.remove('active');
    });
  }

  if (confirmPayoutBtn && payoutModal) {
    confirmPayoutBtn.addEventListener('click', () => {
      payoutModal.classList.remove('active');
      window.showToast('Payout transfer initiated! Funds will arrive via Stripe in 1-2 business days.', 'success');
    });
  }

  // Order Status Toggle / Action buttons 
document.querySelectorAll('[data-order-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.getAttribute('data-order-action');
      const orderId = btn.getAttribute('data-order-id') || 'Order';
      if (action === 'reprint') {
        window.showToast(`Queued ${orderId} for DTG emergency reprint.`, 'info');
      } else if (action === 'ship') {
        window.showToast(` Marked ${orderId} as Shipped with tracking code generated.`, 'success');
      } else if (action === 'cancel') {
        window.showToast(` ${orderId} has been cancelled and refunded.`, 'warning');
      }
    });
  });
}

// Auto-run if on dashboard page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}
