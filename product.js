import './style.css';
import { products, whatsappNumber } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    window.location.href = '/';
    return;
  }

  const product = products.find(p => p.id === productId);
  
  if (!product) {
    window.location.href = '/';
    return;
  }

  // Set Title
  document.title = `${product.name} - Proyojon bd`;

  // Render Hero
  document.getElementById('heroImageBg').src = product.image;
  document.getElementById('heroImage').src = product.image;
  document.getElementById('heroTitle').textContent = product.name;
  document.getElementById('heroDesc').textContent = product.description;
  document.getElementById('heroBadge').textContent = product.badge;
  
  const baseWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello Proyojon bd! I want to order:\n*Service:* ${product.name}\n*Plan:* Best Plan\n*Price:* Contact Us\n\nPlease confirm my order. Thank you!`)}`;
  document.getElementById('heroWhatsApp').href = baseWhatsAppUrl;

  // Render Features
  const featuresGrid = document.getElementById('featuresGrid');
  featuresGrid.innerHTML = product.features.map(f => `
    <div class="feature-card" style="background: var(--color-surface); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--color-border); display: flex; align-items: flex-start; gap: 1rem;">
      <div style="background: var(--color-primary); color: white; padding: 0.75rem; border-radius: var(--radius-md); display: flex;">
        <span class="material-symbols-outlined">${f.icon}</span>
      </div>
      <div>
        <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem;">${f.title}</h3>
        <p style="color: var(--color-text-light); font-size: 0.9rem;">${f.desc}</p>
      </div>
    </div>
  `).join('');

  // Render Pricing Packages
  const pricingGrid = document.getElementById('pricingGrid');
  pricingGrid.innerHTML = product.packages.map(pkg => {
    const pkgMessage = `Hello Proyojon bd!\n\nI want to order:\n*Service:* ${product.name}\n*Plan:* ${pkg.name}\n*Price:* ${pkg.price}\n\nPlease confirm my order. Thank you!`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(pkgMessage)}`;
    
    return `
      <div class="pricing-card" style="background: var(--color-surface); padding: 2rem 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--color-border); text-align: center; display: flex; flex-direction: column; transition: transform 0.3s, border-color 0.3s;">
        <h3 style="font-size: 1.25rem; color: var(--color-text-light); margin-bottom: 0.5rem;">${pkg.name}</h3>
        <div style="font-size: 2.5rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1.5rem;">${pkg.price}</div>
        <div style="flex-grow: 1;"></div>
        <a href="${whatsappLink}" target="_blank" class="btn btn-primary" style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Order on WhatsApp
        </a>
      </div>
    `;
  }).join('');

  // Render FAQs
  const faqList = document.getElementById('faqList');
  if (product.faqs && product.faqs.length > 0) {
    faqList.innerHTML = product.faqs.map(faq => `
      <details style="background: var(--color-surface); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); cursor: pointer;">
        <summary style="font-weight: 600; font-size: 1.1rem; list-style: none; display: flex; justify-content: space-between; align-items: center;">
          ${faq.q}
          <span class="material-symbols-outlined">expand_more</span>
        </summary>
        <p style="margin-top: 1rem; color: var(--color-text-light); border-top: 1px solid var(--color-border); padding-top: 1rem;">
          ${faq.a}
        </p>
      </details>
    `).join('');
  } else {
    document.querySelector('.faq-section').style.display = 'none';
  }

  // Show App
  document.getElementById('productApp').style.display = 'block';
});
