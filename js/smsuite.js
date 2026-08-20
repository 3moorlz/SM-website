document.addEventListener("DOMContentLoaded", () => {
  const coreGrid = document.getElementById("core-grid");
  const playerGrid = document.getElementById("player-grid");
  const staffGrid = document.getElementById("staff-grid");
  const communicatorsGrid = document.getElementById("communicators-grid");
  const upcomingGrid = document.getElementById("upcoming-grid");

  const modal = document.getElementById("smsuite-modal");
  const modalBackdrop = document.getElementById("smsuite-modal-backdrop");
  const modalClose = document.getElementById("smsuite-modal-close");
  const modalBreadcrumb = document.getElementById("smsuite-modal-breadcrumb");
  const modalContent = document.getElementById("smsuite-modal-content");

  if (typeof SMSUITE_DATA !== "undefined" && Array.isArray(SMSUITE_DATA)) {
    SMSUITE_DATA.forEach(plugin => {
      if (plugin.icon) {
        const img = new Image();
        img.src = `${window.ASSET_PREFIX || ''}${plugin.icon}`;
      }
    });
  }

  if (typeof SMSUITE_DATA !== "undefined" && Array.isArray(SMSUITE_DATA)) {
    SMSUITE_DATA.forEach(plugin => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "plugin-card";
      let displayName = plugin.name;
      if (!displayName.includes("&trade;") && !displayName.includes("™") && !displayName.includes("℠") && !displayName.includes("<sup")) {
        displayName += "&trade;";
      }
      const versionHtml = plugin.version
        ? `<span class="plugin-version">${plugin.version}</span>`
        : "";

      const isUpcoming = (plugin.group === "upcoming") || (!plugin.content && (!window.SMSUITE_CHANGELOG_DATA || !window.SMSUITE_CHANGELOG_DATA[plugin.id]));

      let expandHtml = `<span class="plugin-expand-hint">Click to expand</span>`;
      if (isUpcoming) {
        expandHtml = `<span class="plugin-expand-hint" style="color: var(--text-muted);">Coming Soon</span>`;
      }

      card.innerHTML = `
        <div class="plugin-card-header" style="margin-bottom: 0.5rem; max-width: 65%;">
          <h3 class="plugin-name" style="margin-bottom: 0; line-height: 1.2;">${displayName}</h3>
        </div>
        <div class="plugin-line" style="margin-bottom: 3.5rem;"></div>
        <div class="plugin-body">
          <p class="plugin-tagline">${plugin.tagline}</p>
        </div>
        <div class="plugin-footer">
          ${expandHtml}
          ${versionHtml}
        </div>
      `;

      if (!isUpcoming) {
        card.addEventListener("click", () => {
          openModuleView(plugin.id);
        });
      } else {
        card.classList.add("coming-soon-card");
        card.style.cursor = "default";
        card.style.pointerEvents = "none";
      }

      if (plugin.group === "core" && coreGrid) coreGrid.appendChild(card);
      else if (plugin.group === "player" && playerGrid) playerGrid.appendChild(card);
      else if (plugin.group === "staff" && staffGrid) staffGrid.appendChild(card);
      else if (plugin.group === "communicators" && communicatorsGrid) communicatorsGrid.appendChild(card);
      else if (plugin.group === "upcoming" && upcomingGrid) upcomingGrid.appendChild(card);
    });
  }

  const closeModal = () => {
    if (modal) {
      modal.classList.remove("active");
      setTimeout(() => modal.classList.add("hidden"), 300);
    }
  };
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

  function openDirectoryView() {
    if (!modalContent || !modalBreadcrumb) return;

    modalBreadcrumb.innerHTML = `
      <a href="#" class="smsuite-nav-link" data-nav="dir" style="color: #c084fc; text-decoration: none; font-weight: 600;">SMSuite™</a>
      <span style="color: #64748b;">/</span>
      <span style="color: #38bdf8; font-weight: 600;">Changelog</span>
      <span style="color: #64748b;">/</span>
    `;

    const changelogModules = (typeof SMSUITE_CHANGELOG_DATA !== "undefined") ? SMSUITE_CHANGELOG_DATA : {};
    const moduleKeys = Object.keys(changelogModules);

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-family: var(--font-display); font-size: 1.35rem; color: #fff; margin: 0 0 0.4rem 0;">SMSuite™ Modules Archive Directory</h3>
        <p style="font-size: 0.88rem; color: #94a3b8; margin: 0;">Browse full release version history, JAR files, and changelogs for all first-party modules.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.85rem;">
        ${moduleKeys.map(key => {
          const mod = changelogModules[key];
          const latest = mod.versions[0];
          return `
            <button type="button" class="smsuite-dir-card" data-open-module="${key}" style="background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; text-align: left; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all 0.2s ease;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.4rem;">📁</span>
                <div>
                  <div style="font-weight: 600; font-size: 0.95rem; color: #fff; font-family: var(--font-display);">${escapeHtml(mod.displayName || mod.name)}</div>
                  <div style="font-size: 0.75rem; color: #94a3b8;">${mod.versions.length} release build(s)</div>
                </div>
              </div>
              <span style="font-size: 0.75rem; color: #38bdf8; background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.25); border-radius: 4px; padding: 0.2rem 0.5rem; font-family: var(--font-mono);">v${latest?.version || '1.0.0'}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;

    bindModalNavigationEvents();
    if (modal) {
      modal.classList.remove("hidden");
      setTimeout(() => modal.classList.add("active"), 10);
    }
  }

  function openModuleView(moduleId) {
    if (!modalContent || !modalBreadcrumb) return;

    const changelogModules = (typeof SMSUITE_CHANGELOG_DATA !== "undefined") ? SMSUITE_CHANGELOG_DATA : {};
    
    const matchedKey = Object.keys(changelogModules).find(k => k.toLowerCase() === moduleId.toLowerCase()) ||
                       Object.keys(changelogModules).find(k => k.toLowerCase().includes(moduleId.toLowerCase()) || moduleId.toLowerCase().includes(k.toLowerCase())) ||
                       'SMCore';
    
    const changelogData = changelogModules[matchedKey] || { name: moduleId, displayName: moduleId + '™', versions: [] };
    const pluginMeta = (typeof SMSUITE_DATA !== "undefined") ? SMSUITE_DATA.find(p => p.id.toLowerCase() === moduleId.toLowerCase() || (changelogData.name && p.id.toLowerCase() === changelogData.name.toLowerCase())) : null;

    const moduleDisplayName = changelogData.displayName || (pluginMeta ? pluginMeta.name : matchedKey) + '™';
    const latestVersion = changelogData.versions[0] || { version: '1.0.0', date: 'Release', target: 'Paper 1.20.4+' };

    modalBreadcrumb.innerHTML = `
      <a href="#" class="smsuite-nav-link" data-nav="dir" style="color: #c084fc; text-decoration: none; font-weight: 600;">SMSuite™</a>
      <span style="color: #64748b;">/</span>
      <a href="#" class="smsuite-nav-link" data-nav="dir" style="color: #c084fc; text-decoration: none; font-weight: 600;">Changelog</a>
      <span style="color: #64748b;">/</span>
      <span style="color: #38bdf8; font-weight: 600;">${escapeHtml(moduleDisplayName)}</span>
      <span style="color: #64748b;">/</span>
    `;

    const iconSrc = pluginMeta && pluginMeta.icon ? `${window.ASSET_PREFIX || ''}${pluginMeta.icon}` : `../assets/smsuite/smsuite.png`;
    const tagline = pluginMeta ? pluginMeta.tagline : 'First-party SMSuite server module.';
    const content = pluginMeta ? pluginMeta.content : `<p>Comprehensive modular server component powering SpearMace SMP.</p>`;

    modalContent.innerHTML = `
      <style>
        .modrinth-version-card:hover {
          border-color: rgba(139,92,246,0.4) !important;
          background: rgba(139,92,246,0.03) !important;
        }
        .modrinth-version-card.expanded {
          border-color: rgba(139,92,246,0.6) !important;
        }
        .modrinth-version-card.expanded .modrinth-chevron {
          transform: rotate(180deg);
        }
        .modrinth-version-body h1, .modrinth-version-body h2 {
          color: #fff;
          font-family: var(--font-display);
          font-size: 1.15rem;
          margin: 1rem 0 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 0.35rem;
        }
        .modrinth-version-body h3 {
          color: #e2e8f0;
          font-size: 1rem;
          margin: 0.85rem 0 0.35rem 0;
        }
        .modrinth-version-body ul {
          margin: 0.5rem 0 1rem 1.25rem;
          padding-left: 0.5rem;
        }
        .modrinth-version-body li {
          margin-bottom: 0.3rem;
        }
        .modrinth-version-body code {
          background: rgba(0,0,0,0.5);
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          color: #f0abfc;
          font-family: monospace;
          font-size: 0.85em;
        }
        @media (max-width: 640px) {
          .smsuite-modal-panel {
            padding: 1rem 0.9rem !important;
            width: 96% !important;
          }
          .module-overview-flex {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1.25rem !important;
          }
          .module-overview-img-container {
            width: 100% !important;
            align-self: center !important;
            margin: 0 auto !important;
            text-align: center !important;
          }
          .module-overview-img-container img {
            width: 100% !important;
            max-width: 320px !important;
            margin: 0 auto !important;
          }
          .modrinth-version-row {
            padding: 0.75rem 0.85rem !important;
            gap: 0.6rem !important;
          }
          .modrinth-version-body {
            padding: 0.9rem !important;
          }
        }
      </style>

      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.4rem; flex-wrap: wrap;">
          <h2 style="font-family: var(--font-display); font-size: 1.6rem; color: #fff; margin: 0;">${escapeHtml(moduleDisplayName)}</h2>
          <span style="font-family: var(--font-mono); font-size: 0.78rem; color: #22d3ee; background: rgba(34,211,238,0.12); border: 1px solid rgba(34,211,238,0.35); padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">v${latestVersion.version}</span>
        </div>
        <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.5; margin: 0 0 1.2rem 0;">${escapeHtml(tagline)}</p>
        
        <div class="module-overview-flex" style="display: flex; justify-content: space-between; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 260px; color: #cbd5e1; font-size: 0.92rem; line-height: 1.7;">
            ${content}
          </div>
          <div class="module-overview-img-container" style="flex-shrink: 0; align-self: flex-end; margin-left: auto; text-align: right;">
            <img src="${iconSrc}" alt="${escapeHtml(moduleDisplayName)}" style="width: 250px; max-width: 100%; aspect-ratio: 3 / 2; object-fit: cover; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.5); display: block; box-shadow: 0 4px 16px rgba(0,0,0,0.45);">
          </div>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 2rem; margin-bottom: 1rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem;">
        <div>
          <h3 style="font-family: var(--font-display); font-size: 1.25rem; color: #fff; margin: 0;">Version History &amp; Changelogs</h3>
          <p style="font-size: 0.82rem; color: #94a3b8; margin: 0.2rem 0 0 0;">Artifact versions, builds, and release notes for ${escapeHtml(moduleDisplayName)}</p>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(56,189,248,0.1) 100%); border: 1px solid rgba(139,92,246,0.35); border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
          <span style="background: #22c55e; color: #052e16; font-weight: 700; font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase;">Latest Release</span>
          <span style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 700; color: #fff;">v${latestVersion.version}</span>
          <span style="font-size: 0.8rem; color: #cbd5e1;">• Pushed ${latestVersion.date} • ${latestVersion.target}</span>
        </div>
        <span style="font-size: 0.78rem; color: #38bdf8; font-weight: 500;">Click build to view changelog</span>
      </div>

      <div class="modrinth-versions-list" style="display: flex; flex-direction: column; gap: 0.6rem;">
        ${changelogData.versions.map(v => {
          const downloadHref = v.downloadUrl || (v.sourceZip ? `../smplugins/${moduleId.toLowerCase()}/${v.sourceZip}` : null);
          const downloadBtn = downloadHref ? `
            <a href="${downloadHref}" download="${escapeHtml(v.sourceZip || v.jarFileName.replace('.jar', '.zip'))}" class="btn btn-sm btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.82rem; text-decoration: none; display: flex; align-items: center; gap: 0.4rem; border-radius: 6px; white-space: nowrap; flex-shrink: 0;" title="Download (${escapeHtml(v.version)})">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download
            </a>
          ` : `
            <button type="button" class="btn" disabled style="padding: 0.4rem 0.85rem; font-size: 0.82rem; background: rgba(255,255,255,0.05); color: #64748b; border: 1px solid rgba(255,255,255,0.08); cursor: not-allowed; display: flex; align-items: center; gap: 0.4rem; border-radius: 6px; white-space: nowrap; flex-shrink: 0;" title="Verified production build">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download
            </button>
          `;

          return `
          <div class="modrinth-version-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow: hidden; transition: all 0.2s ease;">
            <div class="modrinth-version-row" data-toggle-version="${escapeHtml(v.version)}" style="padding: 0.85rem 1.25rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; gap: 1rem; user-select: none;">
              <div style="display: flex; align-items: center; gap: 0.75rem; min-width: 0; flex: 1; flex-wrap: wrap;">
                <span class="modrinth-channel-pill" style="font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.55rem; border-radius: 4px; text-transform: uppercase; background: ${v.channel === 'Release' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(249, 115, 22, 0.15)'}; color: ${v.channel === 'Release' ? '#4ade80' : '#fb923c'}; border: 1px solid ${v.channel === 'Release' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(249, 115, 22, 0.3)'}; flex-shrink: 0;">${v.channel}</span>
                
                <div style="display: flex; align-items: center; gap: 0.4rem; flex-shrink: 0;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  <strong style="color: #fff; font-size: 0.92rem; font-family: var(--font-mono);">${escapeHtml(v.jarFileName)}</strong>
                </div>

                <span style="font-size: 0.75rem; color: #38bdf8; background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.25); border-radius: 4px; padding: 0.15rem 0.5rem; white-space: nowrap; flex-shrink: 0;">${escapeHtml(v.target)}</span>
                <span style="font-size: 0.78rem; color: #94a3b8; white-space: nowrap; flex-shrink: 0;">${escapeHtml(v.date)}</span>
              </div>

              <div style="display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0;">
                ${downloadBtn}
                <span class="modrinth-chevron" style="color: #a855f7; font-size: 0.85rem; font-weight: bold; margin-left: 0.2rem; transition: transform 0.2s ease;">▾</span>
              </div>
            </div>

            <div class="modrinth-version-body hidden" style="padding: 1.25rem; border-top: 1px solid rgba(255,255,255,0.06); background: rgba(0,0,0,0.35); font-size: 0.9rem; color: #cbd5e1; line-height: 1.7;">
              ${typeof marked !== 'undefined' ? marked.parse(v.content) : v.content}
            </div>
          </div>
          `;
        }).join('')}
      </div>
    `;

    modalContent.querySelectorAll('.modrinth-version-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a')) return;
        const card = row.closest('.modrinth-version-card');
        const body = card ? card.querySelector('.modrinth-version-body') : null;
        if (card && body) {
          const isHidden = body.classList.contains('hidden');
          modalContent.querySelectorAll('.modrinth-version-card').forEach(otherCard => {
            if (otherCard !== card) {
              const otherBody = otherCard.querySelector('.modrinth-version-body');
              if (otherBody) otherBody.classList.add('hidden');
              otherCard.classList.remove('expanded');
            }
          });
          body.classList.toggle('hidden', !isHidden);
          card.classList.toggle('expanded', isHidden);
        }
      });
    });

    bindModalNavigationEvents();
    if (modal) {
      modal.classList.remove("hidden");
      setTimeout(() => modal.classList.add("active"), 10);
    }
  }

  function bindModalNavigationEvents() {
    if (!modal) return;
    modal.querySelectorAll('.smsuite-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openDirectoryView();
      });
    });

    modal.querySelectorAll('.smsuite-dir-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const modId = card.getAttribute('data-open-module');
        if (modId) openModuleView(modId);
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal && !modal.classList.contains("hidden")) {
        closeModal();
      }
    }
  });
});
