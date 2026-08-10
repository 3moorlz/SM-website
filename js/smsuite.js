document.addEventListener("DOMContentLoaded", () => {
  const coreGrid = document.getElementById("core-grid");
  const playerGrid = document.getElementById("player-grid");
  const staffGrid = document.getElementById("staff-grid");
  const upcomingGrid = document.getElementById("upcoming-grid");

  const modal = document.getElementById("smsuite-modal");
  const modalBackdrop = document.getElementById("smsuite-modal-backdrop");
  const modalClose = document.getElementById("smsuite-modal-close");
  const modalTitle = document.getElementById("smsuite-modal-title");
  const modalContent = document.getElementById("smsuite-modal-content");

  // Render cards
  SMSUITE_DATA.forEach(plugin => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "plugin-card";
    
    // Add trademark handling for name
    let displayName = plugin.name;
    
    // Strip out any weird encoding artifacts if they exist
    displayName = displayName.replace(/[^\x00-\x7F]/g, "");
    
    if (!displayName.includes("&trade;")) {
      displayName += "&trade;";
    }

    const versionHtml = plugin.version 
      ? `<span class="plugin-version">${plugin.version}</span>` 
      : "";

    const expandHtml = plugin.content 
      ? `<span class="plugin-expand-hint">Click to expand</span>` 
      : `<span class="plugin-expand-hint">Coming Soon</span>`;

    card.innerHTML = `
      <div class="plugin-card-header">
        <h3 class="plugin-name">${displayName}</h3>
        <div class="plugin-line"></div>
      </div>
      <div class="plugin-body">
        <p class="plugin-tagline">${plugin.tagline}</p>
      </div>
      <div class="plugin-footer">
        ${expandHtml}
        ${versionHtml}
      </div>
    `;

    // Click handler for modal
    if (plugin.content) {
      card.addEventListener("click", () => {
        modalTitle.innerHTML = displayName;
        modalContent.innerHTML = plugin.content;
        modal.classList.remove("hidden");
        // Simple animation
        setTimeout(() => modal.classList.add("active"), 10);
      });
    } else {
      card.classList.add("coming-soon-card");
      card.style.cursor = "default";
    }

    // Append to correct grid
    if (plugin.group === "core") coreGrid.appendChild(card);
    else if (plugin.group === "player") playerGrid.appendChild(card);
    else if (plugin.group === "staff") staffGrid.appendChild(card);
    else if (plugin.group === "upcoming") upcomingGrid.appendChild(card);
  });

  // Modal close handlers
  const closeModal = () => {
    modal.classList.remove("active");
    setTimeout(() => modal.classList.add("hidden"), 300);
  };

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
});
