/**
 * TrendZ Shared Navbar, Theme, RTL & Profile Dropdown Controller
 * Re-exports layout methods and initializes the shared components.
 */

import { initLayout, renderNavbar, renderFooter, getPathPrefixes } from './layout.js';

export { initLayout, renderNavbar, renderFooter, getPathPrefixes };

export function initNavbar() {
  initLayout();
}

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLayout);
} else {
  initLayout();
}
