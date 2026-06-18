import { products } from './data.js';

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card voucher-style-card';

  card.innerHTML = `
    <div class="voucher-card-top" style="padding: 0;">
      <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="voucher-card-bottom">
      <h3 class="voucher-card-title">${product.name}</h3>
    </div>
  `;

  
  card.style.cursor = 'pointer';
  card.onclick = (e) => {
    window.location.href = `./product.html?id=${product.id}`;
  };
  
  return card;
}

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  if (filteredProducts.length === 0) {
    grid.innerHTML = `<div class="search-no-results">No services found. Try a different search term.</div>`;
    return;
  }

  filteredProducts.forEach(product => {
    grid.appendChild(createProductCard(product));
  });
}

function renderSearchResults(term) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(term) || 
    p.category.toLowerCase().includes(term) ||
    p.description.toLowerCase().includes(term)
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="search-no-results">No services found for "${term}".</div>`;
    return;
  }

  filtered.forEach(product => {
    grid.appendChild(createProductCard(product));
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

function setupSearch() {
  const searchInput = document.querySelector('.search-bar input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.trim().toLowerCase();
    if (term.length > 0) {
      renderSearchResults(term);
    } else {
      renderProducts('all');
    }
  });
}

function setupMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.header-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = toggle.querySelector('.material-symbols-outlined');
    icon.textContent = nav.classList.contains('open') ? 'close' : 'menu';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupFilters();
  setupSearch();
  setupMobileMenu();
});
