import './style.css';
import { products } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('pricingGrid');

  products.forEach(product => {
    // Generate Rows for each Package
    const packagesHtml = product.packages.map(pkg => `
      <div style="display: grid; grid-template-columns: 2fr 1fr; align-items: center; padding: 1rem 1.25rem; border-radius: var(--radius-md); border: 1px solid transparent; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
        <span style="color: var(--color-white); font-weight: 500;">${pkg.name}</span>
        <div style="text-align: right;">
          <span style="font-size: 1.15rem; font-weight: 800; color: var(--color-white);">${pkg.price}</span>
        </div>
      </div>
    `).join('');

    const card = document.createElement('div');
    card.style.cssText = `
      background-color: var(--color-surface);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: border-color 0.3s;
    `;
    card.onmouseover = () => card.style.borderColor = 'rgba(255,255,255,0.2)';
    card.onmouseout = () => card.style.borderColor = 'var(--color-border)';

    // Correct Icon and Color mapping for each product
    let icon = 'star';
    let bgColor = 'var(--color-primary)';
    
    switch(product.id.toLowerCase()) {
      case 'spotify': icon = 'music_note'; bgColor = '#1DB954'; break;
      case 'facebook': icon = 'thumb_up'; bgColor = '#1877F2'; break;
      case 'likee': icon = 'favorite'; bgColor = '#FF0050'; break;
      case 'chamet': icon = 'videocam'; bgColor = '#E91E63'; break;
      case 'bigo': icon = 'live_tv'; bgColor = '#00E5FF'; break;
      case 'tango': icon = 'payments'; bgColor = '#F97316'; break;
      case 'imo': icon = 'chat'; bgColor = '#1877F2'; break;
      case 'mico': icon = 'mic'; bgColor = '#FFC107'; break;
      default:
        if(product.category === 'streaming') { icon = 'play_circle'; bgColor = '#E50914'; }
        else if(product.category === 'social') { icon = 'thumb_up'; bgColor = '#1877F2'; }
        else if(product.category === 'coins') { icon = 'diamond'; bgColor = '#F5A623'; }
    }

    card.innerHTML = `
      <div style="padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-border); background: rgba(255,255,255,0.02);">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 3rem; height: 3rem; border-radius: var(--radius-md); background-color: ${bgColor}; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            <span class="material-symbols-outlined" style="font-size: 1.5rem;">${icon}</span>
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text); margin: 0;">${product.name}</h2>
        </div>
        <span style="font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; background: rgba(255,255,255,0.1); color: var(--color-text-light); border-radius: 9999px;">
          ${product.packages.length} Options
        </span>
      </div>
      
      <div style="flex-grow: 1; display: flex; flex-direction: column; padding: 0.5rem;">
        <div style="display: grid; grid-template-columns: 2fr 1fr; padding: 0.75rem 1.25rem; font-size: 0.75rem; font-weight: 700; color: var(--color-text-light); margin-bottom: 0.5rem;">
          <span>Package Name</span>
          <span style="text-align: right;">Price</span>
        </div>
        ${packagesHtml}
      </div>

      <div style="padding: 1.25rem; background: rgba(255,255,255,0.01);">
        <a href="/product.html?id=${product.id}" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1); color: var(--color-text); font-weight: 700; text-decoration: none; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
          Buy ${product.name} Now <span class="material-symbols-outlined" style="font-size: 1.1rem;">arrow_forward</span>
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
});
