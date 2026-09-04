/**
 * TrendZ Client-Side Form Validation & Toast Notification System
 */

export function initFormValidation() {
  // Contact Forms 
const contactForms = document.querySelectorAll('form.contact-form, #contactForm');
  contactForms.forEach(form => {
    form.addEventListener('submit', handleContactSubmit);
  });

  // Newsletter Forms 
const newsletterForms = document.querySelectorAll('form.newsletter-form, .footer-newsletter-box');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', handleNewsletterSubmit);
  });

  // Auth Login Forms 
const loginForms = document.querySelectorAll('form.login-form, #loginForm');
  loginForms.forEach(form => {
    form.addEventListener('submit', handleLoginSubmit);
  });

  // Auth Signup Forms 
const signupForms = document.querySelectorAll('form.signup-form, #signupForm');
  signupForms.forEach(form => {
    setupPasswordStrength(form);
    form.addEventListener('submit', handleSignupSubmit);
  });

  // Pricing / Quote Calculator Forms 
const quoteForms = document.querySelectorAll('form.quote-form, #quoteForm');
  quoteForms.forEach(form => {
    form.addEventListener('submit', handleQuoteSubmit);
  });
}

function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('[name="name"]')?.value.trim();
  const email = form.querySelector('[name="email"]')?.value.trim();
  const message = form.querySelector('[name="message"]')?.value.trim();

  if (!name || name.length < 2) {
    window.showToast('Please provide your valid full name.', 'warning');
    return;
  }

  if (!validateEmail(email)) {
    window.showToast('Please enter a valid email address.', 'warning');
    return;
  }

  if (!message || message.length < 10) {
    window.showToast('Please write a message of at least 10 characters.', 'warning');
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Message...';
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message ➔';
    }
    form.reset();
    window.showToast(`Thank you, ${name}! Your inquiry has been dispatched to our printing specialists. We will reply within 2 hours.`, 'success');
  }, 900);
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('input[type="email"]');
  const email = input?.value.trim();

  if (!validateEmail(email)) {
    window.showToast('Please enter a valid email for newsletter updates.', 'warning');
    return;
  }

  input.value = '';
  window.showToast('You are now subscribed to TrendZ creator drops & VIP printing updates!', 'success');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('[name="email"]')?.value.trim();
  const password = form.querySelector('[name="password"]')?.value;

  if (!validateEmail(email)) {
    window.showToast('Please enter a valid login email.', 'warning');
    return;
  }

  if (!password || password.length < 6) {
    window.showToast('Password must be at least 6 characters.', 'warning');
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Authenticating...';
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Sign In to Dashboard ➔';
    }
    window.showToast(`Welcome back, ${email.split('@')[0]}! Redirecting to dashboard...`, 'success');
    setTimeout(() => {
      window.location.href = email.includes('admin') ? '../auth/admin/admin-dashboard.html' : '../auth/user/user-dashboard.html';
    }, 1200);
  }, 800);
}

function setupPasswordStrength(form) {
  const passwordInput = form.querySelector('[name="password"]');
  const meter = form.querySelector('.password-strength-bar');
  const text = form.querySelector('.password-strength-text');

  if (!passwordInput || !meter) return;

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let strength = 0;
    if (val.length >= 6) strength += 25;
    if (val.length >= 10) strength += 25;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) strength += 25;
    if (/[^A-Za-z0-9]/.test(val)) strength += 25;

    meter.style.width = `${strength}%`;
    if (strength <= 25) {
      meter.style.backgroundColor = '#EF4444';
      if (text) text.textContent = 'Weak';
    } else if (strength <= 50) {
      meter.style.backgroundColor = '#F59E0B';
      if (text) text.textContent = 'Fair';
    } else if (strength <= 75) {
      meter.style.backgroundColor = '#3B82F6';
      if (text) text.textContent = 'Good';
    } else {
      meter.style.backgroundColor = '#10B981';
      if (text) text.textContent = 'Strong & Secure';
    }
  });
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('[name="name"]')?.value.trim();
  const email = form.querySelector('[name="email"]')?.value.trim();
  const password = form.querySelector('[name="password"]')?.value;
  const terms = form.querySelector('[name="terms"]');

  if (!name || name.length < 2) {
    window.showToast('Please enter your full creator or brand name.', 'warning');
    return;
  }

  if (!validateEmail(email)) {
    window.showToast('Please enter a valid business email address.', 'warning');
    return;
  }

  if (!password || password.length < 8) {
    window.showToast('Password must be at least 8 characters with numbers/symbols.', 'warning');
    return;
  }

  if (terms && !terms.checked) {
    window.showToast('Please agree to the Terms of Service & Privacy Policy.', 'warning');
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Creating Creator Account...';
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Complete Registration ➔';
    }
    window.showToast(`Account created for ${name}! Welcome to TrendZ Studio.`, 'success');
    setTimeout(() => {
      window.location.href = '../auth/user/user-dashboard.html';
    }, 1200);
  }, 900);
}

function handleQuoteSubmit(e) {
  e.preventDefault();
  window.showToast('Custom quote request submitted! Our production manager will contact you with wholesale tiers.', 'success');
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFormValidation);
} else {
  initFormValidation();
}
