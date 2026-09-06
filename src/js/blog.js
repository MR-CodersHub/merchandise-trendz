/**
 * TrendZ Blog Listing, Live Search & Category Filtering Controller
 */

import { blogData } from './blog-data.js';

let currentCategory = 'all';
let searchQuery = '';
let selectedTag = null;

export function initBlogListing() {
  const grid = document.getElementById('blogCardsGrid');
  if (!grid) return;

  renderBlogGrid();

  // Search Input Handler 
const searchInput = document.getElementById('blogSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderBlogGrid();
    });
  }

  // Category Filter Tabs 
const categoryBtns = document.querySelectorAll('.blog-category-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category') || 'all';
      selectedTag = null;
      renderBlogGrid();
    });
  });

  // Tag Badges / Quick Filters 
const tagBtns = document.querySelectorAll('.blog-tag-badge');
  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedTag = btn.getAttribute('data-tag');
      renderBlogGrid();
    });
  });
}

function renderBlogGrid() {
  const grid = document.getElementById('blogCardsGrid');
  const countEl = document.getElementById('blogCountIndicator');
  if (!grid) return;

  const filtered = blogData.filter(post => {
    const matchesCategory = currentCategory === 'all' || post.category.toLowerCase().includes(currentCategory.toLowerCase());
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery) ||
      post.summary.toLowerCase().includes(searchQuery) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery));
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);

    return matchesCategory && matchesSearch && matchesTag;
  });

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${blogData.length} articles`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px dashed var(--border-light);">
        <div style="font-size: 3rem; margin-bottom: 14px;"></div>
        <h3 style="margin-bottom: 8px;">No matching articles found</h3>
        <p style="margin-bottom: 20px;">Try adjusting your search query or clear your category filter.</p>
        <button class="btn btn-yellow btn-sm" id="resetBlogFilterBtn">Reset All Filters</button>
      </div>
    `;

    document.getElementById('resetBlogFilterBtn')?.addEventListener('click', () => {
      currentCategory = 'all';
      searchQuery = '';
      selectedTag = null;
      const searchInput = document.getElementById('blogSearchInput');
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.blog-category-btn').forEach((b, i) => {
        b.classList.toggle('active', i === 0);
      });
      renderBlogGrid();
    });
    return;
  }

  grid.innerHTML = filtered.map(post => `
    <article class="glass-panel" style="overflow: hidden; display: flex; flex-direction: column; transition: all 0.3s ease;">
      <div style="position: relative; overflow: hidden; height: 220px;">
        <img src="${post.thumbnail}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" class="blog-card-img">
      </div>
      <div style="padding: 24px; display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        <div>
          <div style="display: flex; gap: 12px; font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 12px;">
            <span> ${post.date}</span>
            <span>•</span>
            <span>⏱ ${post.readTime}</span>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 800; line-height: 1.35; margin-bottom: 12px; color: var(--color-dark);">
            <a href="blog-details.html?id=${post.id}" style="color: inherit;" class="hover-underline">
              ${post.title}
            </a>
          </h3>
          <p style="font-size: 0.92rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 18px;">
            ${post.summary}
          </p>
        </div>
        <div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px;">
            ${post.tags.map(tag => `<span style="font-size: 0.72rem; padding: 3px 8px; background: var(--bg-surface-alt); border-radius: var(--radius-full); color: var(--color-text-muted);">#${tag}</span>`).join('')}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${post.author.avatar}" alt="${post.author.name}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
              <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-dark);">${post.author.name}</span>
            </div>
            <a href="blog-details.html?id=${post.id}" class="btn btn-outline btn-sm" style="font-weight: 700;">
              Read Article ➔
            </a>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

// Auto-run if on blog page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlogListing);
} else {
  initBlogListing();
}
