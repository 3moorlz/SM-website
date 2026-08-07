

window.openStaffModal = function(rankObj) {
  
  const modal = document.getElementById('staff-modal');
  const title = document.getElementById('staff-modal-title');
  const content = document.getElementById('staff-modal-content');
  if (!modal || !title || !content) {
    alert("Error: Modal elements not found!");
    return;
  }

  const roleName = rankObj.label;
  title.style.display = 'none';
  
  let color = '#fff';
  if (rankObj.colorClass === 'rank-purple') color = '#a855f7';
  if (rankObj.colorClass === 'rank-blue') color = '#3b82f6';
  if (rankObj.colorClass === 'rank-green') color = '#22c55e';
  if (rankObj.colorClass === 'rank-orange') color = '#f59e0b';
  if (rankObj.colorClass === 'rank-red') color = '#ef4444';
  if (rankObj.colorClass === 'rank-teal') color = '#14b8a6';

  const members = (typeof STAFF_MEMBERS !== 'undefined') ? STAFF_MEMBERS.filter(m => m.role === roleName || m.title === roleName) : [];

  if (members.length === 0) {
    content.innerHTML = '<p style="color: #888; font-style: italic; width: 100%; text-align: center;">None</p>';
  } else {
    content.innerHTML = members.map(m => `
      <div style="display: flex; align-items: center; gap: 1.5rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem 2rem; width: 100%; justify-content: flex-start; margin-bottom: 0.5rem;">
        <img src="https://mc-heads.net/avatar/${m.head || m.name}/64" alt="${m.name} head" style="width: 48px; height: 48px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.5);">
        <img src="../assets/${m.icon || 'default.webp'}" alt="${m.role} icon" style="height: 32px; object-fit: contain;">
        <div style="font-family: var(--font-display, sans-serif); font-weight: 700; font-size: 1.3rem; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${m.name}</div>
      </div>
    `).join('');
  }

  modal.classList.remove('hidden');

  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');
  
  const closeModal = () => {
    modal.classList.add('hidden');
    closeBtn.removeEventListener('click', closeModal);
    backdrop.removeEventListener('click', closeModal);
  };
  
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
};

(function bindHotspots() {
  const hotspots = document.querySelectorAll('.pathway-hotspot');
  const tooltip = document.getElementById('pathway-tooltip');
  
  hotspots.forEach(h => {
     const onclickStr = h.getAttribute('onclick');
     if (onclickStr) {
        const match = onclickStr.match(/label:\s*'([^']+)',\s*colorClass:\s*'([^']+)'/);
        if (match) {
           h.removeAttribute('onclick');
           const label = match[1];
           const colorClass = match[2];
           
           h.addEventListener('click', (e) => {
              e.preventDefault();
              window.openStaffModal({label: label, colorClass: colorClass});
           });
           
           h.addEventListener('mouseenter', (e) => {
             if (!tooltip) return;
             
             let tooltipHtml = `<strong style="font-family: var(--font-display, sans-serif); letter-spacing: 0.5px;">${label}</strong>`;
             
             const paidRanks = {
               'Admin': 'Immortal',
               'Sr. Mod': 'Ascendant',
               'Mod': 'Champion',
               'Jr. Mod': 'Crusader',
               'Helper': 'Sentinel'
             };
             
             if (paidRanks[label]) {
               tooltipHtml += `<div style="color: #a855f7; font-size: 0.85em; margin-top: 4px;">${paidRanks[label]} Rank Perk</div>`;
             }
             
             if (['Manager', 'Developer', 'Server Lead', 'Ticket Manager', 'Promotional Manager', 'Staff Manager', 'Informatics'].includes(label)) {
               const members = (typeof STAFF_MEMBERS !== 'undefined') ? STAFF_MEMBERS.filter(m => m.role === label || m.title === label) : [];
               const maxCapacity = (label === 'Manager' || label === 'Developer') ? 3 : 1;
               const currentCapacity = (label === 'Informatics') ? 1 : members.length;
               tooltipHtml += `<div style="color: #cbd5e1; font-size: 0.85em; margin-top: 4px;">Capacity: ${currentCapacity}/${maxCapacity}</div>`;
             }
             
             tooltip.innerHTML = tooltipHtml;
             tooltip.classList.remove('hidden');
           });
           
           h.addEventListener('mousemove', (e) => {
             if (!tooltip) return;
             tooltip.style.left = e.clientX + 'px';
             tooltip.style.top = e.clientY + 'px';
           });
           
           h.addEventListener('mouseleave', () => {
             if (!tooltip) return;
             tooltip.classList.add('hidden');
           });
        }
     }
  });
})();
