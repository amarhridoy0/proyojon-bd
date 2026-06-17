import './style.css';
import { products } from './data.js';

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Get the first two features to show as tags
    const tagsHtml = product.features && product.features.length >= 2 
      ? `<div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
           <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--color-border); padding: 0.2rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.7rem; color: var(--color-text-light); font-weight: 600;">${product.features[0].title}</span>
           <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--color-border); padding: 0.2rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.7rem; color: var(--color-text-light); font-weight: 600;">${product.features[1].title}</span>
         </div>`
      : `<div style="margin-bottom: 1.5rem;"></div>`;

    const startingPackage = product.packages[0];

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<div class="product-badge" style="background: #e50914; color: white;">${product.badge}</div>` : ''}
      </div>
      <div class="product-content" style="padding: 1.25rem;">
        <h3 class="product-title" style="margin-bottom: 0.75rem; font-size: 1.1rem;">${product.name}</h3>
        ${tagsHtml}

        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto; border-top: 1px solid var(--color-border); padding-top: 1rem;">
          <div>
            <div style="font-size: 0.7rem; color: var(--color-text-light); margin-bottom: 0.2rem;">${startingPackage.name}</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--color-primary);">${startingPackage.price}</div>
          </div>
          <a href="/product.html?id=${product.id}" style="color: var(--color-text); text-decoration: none; font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 0.1rem; transition: color 0.3s;" onmouseover="this.style.color='var(--color-primary)'" onmouseout="this.style.color='var(--color-text)'">
            View <span class="material-symbols-outlined" style="font-size: 1rem;">chevron_right</span>
          </a>
        </div>
      </div>
    `;
    
    // Make the entire card clickable (optional, but good UX)
    card.style.cursor = 'pointer';
    card.onclick = (e) => {
      // Don't trigger if they clicked the link directly
      if(e.target.tagName !== 'A' && !e.target.closest('a')) {
        window.location.href = `/product.html?id=${product.id}`;
      }
    };
    
    grid.appendChild(card);
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProducts(e.target.dataset.filter);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupFilters();
});
