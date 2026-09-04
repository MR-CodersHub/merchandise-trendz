/**
 * TrendZ Dynamic Blog Details Controller
 * Reads ?id=... parameter from URL and loads full article dynamically
 */

import { blogData } from './blog-data.js';

export function initBlogDetails() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id') || 'dtg-vs-screen-printing';

  const post = blogData.find(p => p.id === postId) || blogData[0];

  renderBlogDetails(post);
  initCommentSystem();
}

function renderBlogDetails(post) {
  // Update Title 
document.title = `${post.title} | TrendZ Insights`;

  // Breadcrumbs 
const breadcrumbCurrent = document.getElementById('blogBreadcrumbCurrent');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = post.title;

  // Header Elements 
const categoryBadge = document.getElementById('blogCategoryBadge');
  if (categoryBadge) categoryBadge.textContent = post.category;

  const titleEl = document.getElementById('blogPostTitle');
  if (titleEl) titleEl.textContent = post.title;

  const dateEl = document.getElementById('blogPostDate');
  if (dateEl) dateEl.textContent = post.date;

  const readTimeEl = document.getElementById('blogPostReadTime');
  if (readTimeEl) readTimeEl.textContent = post.readTime;

  // Author Elements 
const authorAvatar = document.getElementById('blogAuthorAvatar');
  if (authorAvatar) {
    authorAvatar.src = post.author.avatar;
    authorAvatar.alt = post.author.name;
  }

  const authorName = document.getElementById('blogAuthorName');
  if (authorName) authorName.textContent = post.author.name;

  const authorRole = document.getElementById('blogAuthorRole');
  if (authorRole) authorRole.textContent = post.author.role;

  // Banner Image 
const bannerImg = document.getElementById('blogBannerImage');
  if (bannerImg) {
    bannerImg.src = post.banner;
    bannerImg.alt = post.title;
  }

  // Article Body 
const bodyEl = document.getElementById('blogArticleBody');
  if (bodyEl) bodyEl.innerHTML = post.content;

  // Tags List 
const tagsContainer = document.getElementById('blogPostTags');
  if (tagsContainer) {
    tagsContainer.innerHTML = post.tags.map(tag => `
      <span class="badge-pill" style="background: var(--bg-surface-alt); color: var(--color-text-main); font-size: 0.8rem; border: 1px solid var(--border-light);">
        #${tag}
      </span>
    `).join('');
  }

  // Author Bio Box 
const authorBioName = document.getElementById('authorBioName');
  if (authorBioName) authorBioName.textContent = post.author.name;

  const authorBioRole = document.getElementById('authorBioRole');
  if (authorBioRole) authorBioRole.textContent = post.author.role;

  const authorBioAvatar = document.getElementById('authorBioAvatar');
  if (authorBioAvatar) {
    authorBioAvatar.src = post.author.avatar;
    authorBioAvatar.alt = post.author.name;
  }

  // Related Articles Grid 
const relatedGrid = document.getElementById('relatedPostsGrid');
  if (relatedGrid) {
    const relatedPosts = blogData.filter(p => post.relatedIds?.includes(p.id) || p.id !== post.id).slice(0, 2);
    relatedGrid.innerHTML = relatedPosts.map(rel => `
      <article class="glass-panel" style="overflow: hidden; display: flex; flex-direction: column;">
        <div style="height: 180px; position: relative;">
          <img src="${rel.thumbnail}" alt="${rel.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <span class="badge-pill badge-yellow" style="position: absolute; top: 12px; left: 12px; font-size: 0.72rem;">${rel.category}</span>
        </div>
        <div style="padding: 20px; display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
          <div>
            <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 8px;">${rel.date} • ${rel.readTime}</div>
            <h4 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 12px; line-height: 1.4;">
              <a href="blog-details.html?id=${rel.id}" style="color: inherit;">${rel.title}</a>
            </h4>
          </div>
          <a href="blog-details.html?id=${rel.id}" class="btn btn-outline btn-sm" style="font-weight: 700;">
            Read Article ➔
          </a>
        </div>
      </article>
    `).join('');
  }

  // Sidebar Popular Posts 
const sidebarPopular = document.getElementById('sidebarPopularPosts');
  if (sidebarPopular) {
    const popular = blogData.filter(p => p.id !== post.id).slice(0, 4);
    sidebarPopular.innerHTML = popular.map(pop => `
      <div style="display: flex; gap: 12px; align-items: center;">
        <img src="${pop.thumbnail}" alt="${pop.title}" style="width: 64px; height: 64px; border-radius: 6px; object-fit: cover; flex-shrink: 0;">
        <div>
          <div style="font-size: 0.75rem; color: var(--primary-yellow); font-weight: 700;">${pop.category}</div>
          <h4 style="font-size: 0.88rem; font-weight: 700; line-height: 1.3;">
            <a href="blog-details.html?id=${pop.id}" style="color: inherit;">${pop.title}</a>
          </h4>
        </div>
      </div>
    `).join('');
  }

  // Social Share Handler 
const shareCopyBtn = document.getElementById('shareCopyLinkBtn');
  if (shareCopyBtn) {
    shareCopyBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(window.location.href);
      window.showToast(' Article link copied to clipboard!', 'success');
    });
  }
}

function initCommentSystem() {
  const commentForm = document.getElementById('blogCommentForm');
  const commentsList = document.getElementById('blogCommentsList');

  if (!commentForm || !commentsList) return;

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('commentNameInput')?.value.trim();
    const email = document.getElementById('commentEmailInput')?.value.trim();
    const text = document.getElementById('commentTextInput')?.value.trim();

    if (!name || !email || !text) {
      window.showToast('Please fill out all comment fields.', 'warning');
      return;
    }

    const newComment = document.createElement('div');
    newComment.className = 'glass-panel';
    newComment.style.padding = '18px';
    newComment.style.marginBottom = '14px';
    newComment.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 34px; height: 34px; border-radius: 50%; background: var(--primary-yellow); color: var(--color-dark); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem;">
            ${name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style="font-weight: 800; font-size: 0.92rem; color: var(--color-dark);">${name}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">Just now</div>
          </div>
        </div>
        <span class="badge-pill badge-yellow" style="font-size: 0.7rem;">Verified Reader</span>
      </div>
      <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.6;">${text}</p>
    `;

    commentsList.prepend(newComment);
    commentForm.reset();
    window.showToast(' Your comment has been posted successfully!', 'success');
  });
}

// Auto-run if on blog details page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlogDetails);
} else {
  initBlogDetails();
}
