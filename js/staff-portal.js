(function() {
  let currentStaff = null;
  let activeTab = 'resources';
  let activeResourceSection = 'handbook';
  let activeRankFilter = 'all';
  let selectedRankForView = null;
  let calendarView = 'week';
  let currentAnchorDate = new Date();
  
  let allEditableDocs = [];
  let selectedDocId = null;
  let openTabs = [];
  let pendingPushTimerInterval = null;

  const ALL_STAFF_RANKS = [
    'Trainee', 'Helper', 'Jr. Mod', 'Mod', 'Sr. Mod',
    'Trial Admin', 'Admin', 'Sr. Admin', 'Trial Manager',
    'Manager', 'Promotional Manager', 'Ticket Manager', 'Staff Manager',
    'Informatics', 'Developer', 'Server Lead', 'Owner', 'Builder'
  ];

  const loggedInView = document.getElementById('portal-logged-in');
  const staffAvatar = document.getElementById('staff-avatar');
  const staffDiscordId = document.getElementById('staff-discord-id');
  const staffRankBadge = document.getElementById('staff-rank-badge');
  const staffBranchChip = document.getElementById('staff-branch-chip');
  const staffMcUsername = document.getElementById('staff-mc-username');
  const portalLogoutBtn = document.getElementById('portal-logout-btn');
  const executiveTabBtn = document.getElementById('executive-tab-btn');

  const modalOverlay = document.getElementById('portal-modal-overlay');
  const formStaffCodeLogin = document.getElementById('form-staff-code-login');
  const inputStaffCode = document.getElementById('input-staff-code');
  const staffCodeError = document.getElementById('staff-code-error');

  const calPrevBtn = document.getElementById('cal-prev-btn');
  const calNextBtn = document.getElementById('cal-next-btn');
  const calDateRangeLabel = document.getElementById('cal-date-range-label');
  const calendarGridContainer = document.getElementById('calendar-grid-container');
  const scheduleTimezoneLabel = document.getElementById('schedule-timezone-label');

  const execPendingPushBanner = document.getElementById('exec-pending-push-banner');
  const pendingDocName = document.getElementById('pending-doc-name');
  const pendingTimerDisplay = document.getElementById('pending-timer-display');
  const pendingDeployNowBtn = document.getElementById('pending-deploy-now-btn');
  const pendingCancelBtn = document.getElementById('pending-cancel-btn');

  const nppTabBar = document.getElementById('npp-tab-bar');
  const nppLineNumbers = document.getElementById('npp-line-numbers');
  const execDocContentTextarea = document.getElementById('exec-doc-content-textarea');
  const nppCursorPos = document.getElementById('npp-cursor-pos');
  const nppCharCount = document.getElementById('npp-char-count');
  const execDocList = document.getElementById('exec-doc-list');
  const execDocSearch = document.getElementById('exec-doc-search');
  const execDocCategoryFilter = document.getElementById('exec-doc-category-filter');
  const execNewDocBtn = document.getElementById('exec-new-doc-btn');
  const execDocTitleInput = document.getElementById('exec-doc-title-input');
  const execDocSectionSelect = document.getElementById('exec-doc-section-select');
  const execDocRankInput = document.getElementById('exec-doc-rank-input');
  const execPushDocBtn = document.getElementById('exec-push-doc-btn');
  const execDeleteDocBtn = document.getElementById('exec-delete-doc-btn');

  const execPushModal = document.getElementById('exec-push-modal');
  const execPushDocTitle = document.getElementById('exec-push-doc-title');
  const execPushClose = document.getElementById('exec-push-close');
  const execPushCancelBtn = document.getElementById('exec-push-cancel-btn');
  const formExecPush = document.getElementById('form-exec-push');

  const execChangelogPluginSelect = document.getElementById('exec-changelog-plugin-select');
  const execBuildsListContainer = document.getElementById('exec-builds-list-container');
  const execAddBuildBtn = document.getElementById('exec-add-build-btn');
  const execAddBuildModal = document.getElementById('exec-add-build-modal');
  const execAddBuildClose = document.getElementById('exec-add-build-close');
  const formExecAddBuild = document.getElementById('form-exec-add-build');
  const addBuildPluginTarget = document.getElementById('add-build-plugin-target');
  const addBuildVersion = document.getElementById('add-build-version');
  const addBuildTitle = document.getElementById('add-build-title');
  const addBuildNotes = document.getElementById('add-build-notes');

  const execStaffTbody = document.getElementById('exec-staff-tbody');
  const execAddStaffBtn = document.getElementById('exec-add-staff-btn');
  const execAddStaffModal = document.getElementById('exec-add-staff-modal');
  const execAddStaffClose = document.getElementById('exec-add-staff-close');
  const formExecAddStaff = document.getElementById('form-exec-add-staff');
  const addStaffName = document.getElementById('add-staff-name');
  const addStaffIgn = document.getElementById('add-staff-ign');
  const addStaffRank = document.getElementById('add-staff-rank');
  const addStaffCode = document.getElementById('add-staff-code');
  const addStaffRegenBtn = document.getElementById('add-staff-regen-btn');

  init();

  function init() {
    setupTimezoneLabel();
    bindEvents();
    loadAllEditableDocuments();
    checkAuthSession();
    checkPendingPushes();
  }

  function setupTimezoneLabel() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const date = new Date();
      const offsetMinutes = -date.getTimezoneOffset();
      const offsetHours = (offsetMinutes / 60).toFixed(1).replace('.0', '');
      const sign = offsetMinutes >= 0 ? '+' : '';
      if (scheduleTimezoneLabel) {
        scheduleTimezoneLabel.textContent = `Times shown in your local timezone (${tz}, UTC${sign}${offsetHours})`;
      }
    } catch(e) {}
  }

  function bindEvents() {
    if (portalLogoutBtn) portalLogoutBtn.addEventListener('click', handleLogout);

    if (formStaffCodeLogin) {
      formStaffCodeLogin.addEventListener('submit', handleStaffCodeLogin);
    }

    document.querySelectorAll('.portal-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.target.getAttribute('data-tab');
        switchTab(tab);
      });
    });

    document.querySelectorAll('.res-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.res-nav-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeResourceSection = e.target.getAttribute('data-section');
        loadResources();
      });
    });

    document.querySelectorAll('.cal-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.cal-view-btn').forEach(b => {
          b.classList.remove('active');
          b.style.background = 'none';
          b.style.color = 'var(--text-muted)';
        });
        e.target.classList.add('active');
        e.target.style.background = 'var(--purple-glow)';
        e.target.style.color = '#fff';
        calendarView = e.target.getAttribute('data-view');
        renderCalendar();
      });
    });

    if (calPrevBtn) {
      calPrevBtn.addEventListener('click', () => {
        if (calendarView === 'week') {
          currentAnchorDate.setDate(currentAnchorDate.getDate() - 7);
        } else {
          currentAnchorDate.setMonth(currentAnchorDate.getMonth() - 1);
        }
        renderCalendar();
      });
    }

    if (calNextBtn) {
      calNextBtn.addEventListener('click', () => {
        if (calendarView === 'week') {
          currentAnchorDate.setDate(currentAnchorDate.getDate() + 7);
        } else {
          currentAnchorDate.setMonth(currentAnchorDate.getMonth() + 1);
        }
        renderCalendar();
      });
    }

    const formShiftSignup = document.getElementById('form-shift-signup');
    if (formShiftSignup) {
      formShiftSignup.addEventListener('submit', handleShiftSignupSubmit);
    }
    const signupCloseBtn = document.getElementById('signup-close-btn');
    if (signupCloseBtn) {
      signupCloseBtn.addEventListener('click', closeShiftSignupModal);
    }
    const signupAddDateBtn = document.getElementById('signup-add-date-btn');
    if (signupAddDateBtn) {
      signupAddDateBtn.addEventListener('click', handleAddDateToShiftModal);
    }

    document.querySelectorAll('.exec-subtab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.exec-subtab-btn').forEach(b => {
          b.classList.remove('active');
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        });
        e.target.classList.add('active');
        e.target.classList.remove('btn-secondary');
        e.target.classList.add('btn-primary');

        const subtab = e.target.getAttribute('data-subtab');
        document.querySelectorAll('.exec-subtab-content').forEach(c => c.classList.add('hidden'));
        const target = document.getElementById(`exec-subtab-${subtab}`);
        if (target) target.classList.remove('hidden');

        if (subtab === 'codes') renderExecutiveStaffTable();
        if (subtab === 'docs') renderNotepadDocList();
        if (subtab === 'changelog') renderChangelogBuildsList();
      });
    });

    if (execDocContentTextarea) {
      execDocContentTextarea.addEventListener('input', () => {
        updateLineNumbers();
        updateCursorPosition();
        if (selectedDocId) {
          const doc = allEditableDocs.find(d => d.id === selectedDocId);
          if (doc) {
            doc.content = execDocContentTextarea.value;
            doc.isDirty = true;
            renderNotepadTabs();
          }
        }
      });
      execDocContentTextarea.addEventListener('keyup', updateCursorPosition);
      execDocContentTextarea.addEventListener('click', updateCursorPosition);
      execDocContentTextarea.addEventListener('scroll', () => {
        if (nppLineNumbers) nppLineNumbers.scrollTop = execDocContentTextarea.scrollTop;
      });
    }

    if (execDocSearch) execDocSearch.addEventListener('input', renderNotepadDocList);
    if (execDocCategoryFilter) execDocCategoryFilter.addEventListener('change', renderNotepadDocList);
    if (execNewDocBtn) execNewDocBtn.addEventListener('click', handleCreateNewDocument);

    if (execDocTitleInput) {
      execDocTitleInput.addEventListener('input', () => {
        if (selectedDocId) {
          const doc = allEditableDocs.find(d => d.id === selectedDocId);
          if (doc) {
            doc.title = execDocTitleInput.value;
            doc.isDirty = true;
            renderNotepadTabs();
            renderNotepadDocList();
          }
        }
      });
    }

    if (execDocSectionSelect) {
      execDocSectionSelect.addEventListener('change', () => {
        if (selectedDocId) {
          const doc = allEditableDocs.find(d => d.id === selectedDocId);
          if (doc) {
            doc.section = execDocSectionSelect.value;
            doc.isDirty = true;
          }
        }
      });
    }

    if (execDocRankInput) {
      execDocRankInput.addEventListener('input', () => {
        if (selectedDocId) {
          const doc = allEditableDocs.find(d => d.id === selectedDocId);
          if (doc) {
            doc.rank_name = execDocRankInput.value.trim() || null;
            doc.isDirty = true;
          }
        }
      });
    }

    if (execPushDocBtn) execPushDocBtn.addEventListener('click', openPushModal);
    if (execDeleteDocBtn) execDeleteDocBtn.addEventListener('click', handleDeleteDocument);
    if (execPushClose) execPushClose.addEventListener('click', closePushModal);
    if (execPushCancelBtn) execPushCancelBtn.addEventListener('click', closePushModal);
    if (formExecPush) formExecPush.addEventListener('submit', handleExecutePush);

    if (pendingDeployNowBtn) pendingDeployNowBtn.addEventListener('click', deployPendingImmediately);
    if (pendingCancelBtn) pendingCancelBtn.addEventListener('click', cancelPendingPush);

    if (execAddStaffBtn) execAddStaffBtn.addEventListener('click', openAddStaffModal);
    if (execAddStaffClose) execAddStaffClose.addEventListener('click', closeAddStaffModal);
    if (formExecAddStaff) formExecAddStaff.addEventListener('submit', handleAddStaffSubmit);
    if (addStaffRegenBtn) addStaffRegenBtn.addEventListener('click', generateRandomStaffCode);

    if (execChangelogPluginSelect) {
      execChangelogPluginSelect.addEventListener('change', renderChangelogBuildsList);
    }
    if (execAddBuildBtn) execAddBuildBtn.addEventListener('click', openAddBuildModal);
    if (execAddBuildClose) execAddBuildClose.addEventListener('click', closeAddBuildModal);
    if (formExecAddBuild) formExecAddBuild.addEventListener('submit', handleAddBuildSubmit);
  }

  function checkAuthSession() {
    try {
      const session = localStorage.getItem('sm_staff_session');
      if (session) {
        const staff = JSON.parse(session);
        const allAccounts = getStaffAccounts();
        const fresh = allAccounts.find(a => a.code === staff.code || a.minecraftUsername === staff.minecraftUsername);
        if (fresh) {
          currentStaff = fresh;
          localStorage.setItem('sm_staff_session', JSON.stringify(fresh));
          renderAuthenticatedView();
          return;
        }
      }
    } catch(e) {}
    showLoginModal();
  }

  function showLoginModal() {
    if (modalOverlay) modalOverlay.classList.remove('hidden');
    if (loggedInView) loggedInView.classList.add('hidden');
    if (inputStaffCode) {
      inputStaffCode.value = '';
      inputStaffCode.focus();
    }
  }

  function handleStaffCodeLogin(e) {
    e.preventDefault();
    const code = inputStaffCode ? inputStaffCode.value.trim() : '';
    if (!code) return;

    const accounts = getStaffAccounts();
    const matched = accounts.find(a => a.code.toUpperCase() === code.toUpperCase());

    if (matched) {
      currentStaff = matched;
      localStorage.setItem('sm_staff_session', JSON.stringify(matched));
      if (staffCodeError) staffCodeError.classList.add('hidden');
      if (modalOverlay) modalOverlay.classList.add('hidden');
      renderAuthenticatedView();
      showToast(`Welcome back, ${matched.name}!`, 'success');
    } else {
      if (staffCodeError) {
        staffCodeError.textContent = 'Invalid staff code. Verification failed.';
        staffCodeError.classList.remove('hidden');
      }
    }
  }

  function handleLogout() {
    currentStaff = null;
    localStorage.removeItem('sm_staff_session');
    showLoginModal();
    showToast('Logged out successfully', 'info');
  }

  function renderAuthenticatedView() {
    if (!currentStaff) return;
    if (loggedInView) loggedInView.classList.remove('hidden');
    if (modalOverlay) modalOverlay.classList.add('hidden');

    const mcUsername = currentStaff.minecraftUsername || 'MHF_Steve';
    if (staffAvatar) {
      staffAvatar.src = `https://mc-heads.net/avatar/${mcUsername}/100`;
    }
    if (staffDiscordId) {
      staffDiscordId.textContent = currentStaff.name || mcUsername;
    }
    if (staffMcUsername) {
      staffMcUsername.textContent = `Minecraft: ${mcUsername}`;
    }

    if (staffRankBadge) {
      staffRankBadge.textContent = currentStaff.rank || 'Staff';
      staffRankBadge.style.display = 'inline-block';

      const rankLower = (currentStaff.rank || '').toLowerCase();
      if (rankLower.includes('developer')) {
        staffRankBadge.style.background = 'rgba(239, 68, 68, 0.2)';
        staffRankBadge.style.color = '#f87171';
        staffRankBadge.style.border = '1px solid rgba(239, 68, 68, 0.4)';
      } else if (rankLower.includes('owner')) {
        staffRankBadge.style.background = 'rgba(234, 179, 8, 0.2)';
        staffRankBadge.style.color = '#facc15';
        staffRankBadge.style.border = '1px solid rgba(234, 179, 8, 0.4)';
      } else if (rankLower.includes('admin') || rankLower.includes('manager')) {
        staffRankBadge.style.background = 'rgba(168, 85, 247, 0.2)';
        staffRankBadge.style.color = '#c084fc';
        staffRankBadge.style.border = '1px solid rgba(168, 85, 247, 0.4)';
      } else {
        staffRankBadge.style.background = 'rgba(56, 189, 248, 0.2)';
        staffRankBadge.style.color = '#38bdf8';
        staffRankBadge.style.border = '1px solid rgba(56, 189, 248, 0.4)';
      }
    }

    if (staffBranchChip) {
      const branch = currentStaff.branch || (currentStaff.isSuperAdmin ? 'Executive Branch' : 'Moderation Branch');
      staffBranchChip.textContent = branch;
      staffBranchChip.style.display = 'inline-block';
    }

    const isSuperAdminOnly = currentStaff && (
      currentStaff.isSuperAdmin === true ||
      currentStaff.code === 'KALZ!9$8vM' ||
      currentStaff.code === 'G660$9!2kL' ||
      currentStaff.name === 'Kalz' ||
      currentStaff.name === 'G660' ||
      (currentStaff.minecraftUsername && ['UknUnc', 'G660'].includes(currentStaff.minecraftUsername))
    );
    
    if (executiveTabBtn) {
      if (isSuperAdminOnly) {
        executiveTabBtn.classList.remove('hidden');
        executiveTabBtn.style.display = 'inline-block';
      } else {
        executiveTabBtn.classList.add('hidden');
        executiveTabBtn.style.display = 'none';
      }
    }

    loadResources();
    renderCalendar();
  }

  function switchTab(tabName) {
    const isSuperAdminOnly = currentStaff && (
      currentStaff.isSuperAdmin === true ||
      currentStaff.code === 'KALZ!9$8vM' ||
      currentStaff.code === 'G660$9!2kL' ||
      currentStaff.name === 'Kalz' ||
      currentStaff.name === 'G660' ||
      (currentStaff.minecraftUsername && ['UknUnc', 'G660'].includes(currentStaff.minecraftUsername))
    );

    if (tabName === 'executive' && !isSuperAdminOnly) {
      switchTab('resources');
      return;
    }

    activeTab = tabName;
    document.querySelectorAll('.portal-tab').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('active');
        btn.style.borderBottomColor = 'var(--purple-glow)';
        btn.style.color = '#fff';
      } else {
        btn.classList.remove('active');
        btn.style.borderBottomColor = 'transparent';
        btn.style.color = 'var(--text-muted)';
      }
    });

    document.querySelectorAll('.portal-tab-content').forEach(content => {
      content.classList.add('hidden');
    });

    const target = document.getElementById(`tab-${tabName}`);
    if (target) target.classList.remove('hidden');

    if (tabName === 'schedule') {
      renderCalendar();
    } else if (tabName === 'executive') {
      initExecutivePanel();
    }
  }

  function loadResources() {
    const container = document.getElementById('resource-articles-container');
    if (!container) return;

    const docs = getStaffDocuments();
    const managementRanks = [
      'owner', 'server lead', 'developer', 'developers', 'informatics',
      'staff manager', 'promotional manager', 'ticket manager',
      'manager', 'trial manager'
    ];
    const userRankRaw = (currentStaff && currentStaff.rank) ? currentStaff.rank.trim() : '';
    const userRankLower = userRankRaw.toLowerCase();
    const isManagerOrAbove = currentStaff && (currentStaff.isSuperAdmin || managementRanks.includes(userRankLower));

    const myRankMatch = ALL_STAFF_RANKS.find(r => r.toLowerCase() === userRankLower) ||
                        ALL_STAFF_RANKS.find(r => r.toLowerCase().replace(/[^a-z]/g, '') === userRankLower.replace(/[^a-z]/g, '')) ||
                        'Trainee';

    if (!selectedRankForView) {
      selectedRankForView = myRankMatch;
    }

    let rankSelectorHtml = '';
    let itemsToDisplay = [];

    if (activeResourceSection === 'handbook' || activeResourceSection === 'permissions') {
      const activeRank = isManagerOrAbove ? selectedRankForView : myRankMatch;

      rankSelectorHtml = `
        <div style="background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 1.5rem;">
          <div style="margin-bottom: 0.75rem;">
            <span style="font-family: var(--font-display); font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.5px;">Staff Rank ${activeResourceSection === 'handbook' ? 'Handbook' : 'Permissions'}</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center;">
            ${ALL_STAFF_RANKS.map(rank => {
              const isSelected = (rank.toLowerCase() === activeRank.toLowerCase());
              const isClickable = isManagerOrAbove;
              const btnStyle = isSelected
                ? 'background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: #fff; border: 1px solid #c084fc; box-shadow: 0 0 14px rgba(139,92,246,0.4); font-weight: 700;'
                : (isClickable
                    ? 'background: rgba(255,255,255,0.05); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.12); cursor: pointer;'
                    : 'background: rgba(255,255,255,0.02); color: rgba(255,255,255,0.25); border: 1px solid rgba(255,255,255,0.05); cursor: not-allowed; opacity: 0.4; pointer-events: none;');

              return `
                <button type="button" class="rank-filter-btn" data-rank="${escapeHtml(rank)}" ${!isClickable ? 'disabled' : ''} style="padding: 0.45rem 0.85rem; border-radius: 6px; font-size: 0.82rem; white-space: nowrap; transition: all 0.2s ease; ${btnStyle}">
                  ${escapeHtml(rank)}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;

      const sectionDocs = docs.filter(r => r.section === activeResourceSection);
      const matchDoc = sectionDocs.find(d => d.rank_name && d.rank_name.trim().toLowerCase() === activeRank.toLowerCase()) ||
                       sectionDocs.find(d => d.rank_name && d.rank_name.trim().toLowerCase().replace(/[^a-z]/g, '') === activeRank.toLowerCase().replace(/[^a-z]/g, ''));
      
      if (matchDoc) {
        itemsToDisplay = [matchDoc];
      } else {
        itemsToDisplay = [];
      }
    } else {
      itemsToDisplay = docs.filter(r => r.section === activeResourceSection);
    }

    let articlesHtml = '';
    if (itemsToDisplay.length === 0) {
      articlesHtml = '<div style="background: var(--surface-1); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 2rem; text-align: center; color: var(--text-muted);">No documents available for this selection.</div>';
    } else {
      articlesHtml = itemsToDisplay.map(item => `
        <article class="portal-card" style="background: var(--surface-1, #0f0f15); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3); margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem;">
            <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: #fff; margin: 0;">${escapeHtml(item.title)}</h3>
            ${item.rank_name ? `<span style="font-size: 0.75rem; background: rgba(139,92,246,0.2); color: #d8b4fe; border: 1px solid rgba(139,92,246,0.3); padding: 0.25rem 0.6rem; border-radius: 4px; font-weight: 600;">${escapeHtml(item.rank_name)}</span>` : ''}
          </div>
          <div class="resource-body">${typeof marked !== 'undefined' ? marked.parse(item.content) : item.content}</div>
        </article>
      `).join('');
    }

    container.innerHTML = `
      <style>
        .resource-body {
          color: #d1d5db;
          line-height: 1.8;
          font-size: 1.05rem;
        }
        .resource-body h2 {
          color: #fff;
          font-family: var(--font-display);
          font-size: 1.75rem;
          margin: 2rem 0 1rem 0;
          border-bottom: 2px solid rgba(139,92,246,0.3);
          padding-bottom: 0.5rem;
        }
        .resource-body h3 {
          color: #e5e7eb;
          font-family: var(--font-display);
          font-size: 1.3rem;
          margin: 1.5rem 0 0.75rem 0;
        }
        .resource-body p {
          margin-bottom: 1rem;
        }
        .resource-body ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        .resource-body li {
          margin-bottom: 0.5rem;
          padding-left: 0.25rem;
        }
        .resource-body strong {
          color: #fff;
          font-weight: 600;
        }
        .resource-body code {
          background: rgba(0, 0, 0, 0.4);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          color: #f0abfc;
          font-family: monospace;
          font-size: 0.9em;
        }
        .resource-body blockquote {
          border-left: 4px solid var(--purple-glow);
          background: rgba(139,92,246,0.05);
          margin: 1.5rem 0;
          padding: 0.75rem 1.25rem;
          color: #cbd5e1;
        }
      </style>
      ${rankSelectorHtml}
      ${articlesHtml}
    `;

    if (isManagerOrAbove) {
      container.querySelectorAll('.rank-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetRank = btn.getAttribute('data-rank');
          if (targetRank) {
            selectedRankForView = targetRank;
            loadResources();
          }
        });
      });
    }
  }

  let selectedShiftDates = [];

  function getStaffShifts() {
    try {
      const saved = localStorage.getItem('sm_staff_shifts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  }

  function saveStaffShifts(shifts) {
    try {
      localStorage.setItem('sm_staff_shifts', JSON.stringify(shifts));
    } catch (e) {}
  }

  function parseAndValidateTime(timeStr) {
    if (!timeStr) return null;
    const s = timeStr.trim();
    
    const m12 = s.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
    if (m12) {
      const hr = parseInt(m12[1], 10);
      const min = parseInt(m12[2], 10);
      const period = m12[3].toUpperCase();
      if (hr >= 1 && hr <= 12 && min >= 0 && min <= 59) {
        return `${hr}:${min.toString().padStart(2, '0')} ${period}`;
      }
      return null;
    }

    const m24 = s.match(/^(\d{1,2}):(\d{2})$/);
    if (m24) {
      const hr = parseInt(m24[1], 10);
      const min = parseInt(m24[2], 10);
      if (hr >= 0 && hr <= 23 && min >= 0 && min <= 59) {
        return `${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      }
      return null;
    }

    return null;
  }

  function renderShiftDateChips() {
    const chipsContainer = document.getElementById('signup-dates-chips');
    if (!chipsContainer) return;

    if (selectedShiftDates.length === 0) {
      chipsContainer.innerHTML = '<span style="font-size: 0.78rem; color: #ef4444;">Please select at least one date.</span>';
      return;
    }

    chipsContainer.innerHTML = selectedShiftDates.map((dateStr, idx) => `
      <div style="background: rgba(139,92,246,0.18); border: 1px solid rgba(139,92,246,0.4); border-radius: 6px; padding: 0.25rem 0.6rem; display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: #e2e8f0;">
        <span>${escapeHtml(dateStr)}</span>
        <button type="button" class="remove-shift-date-btn" data-date-idx="${idx}" style="background: none; border: none; color: #f87171; font-weight: bold; cursor: pointer; padding: 0 0.15rem; font-size: 0.95rem; line-height: 1;">&times;</button>
      </div>
    `).join('');

    chipsContainer.querySelectorAll('.remove-shift-date-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.getAttribute('data-date-idx'), 10);
        selectedShiftDates.splice(idx, 1);
        renderShiftDateChips();
      });
    });
  }

  function handleAddDateToShiftModal() {
    const datePicker = document.getElementById('signup-date-picker');
    if (!datePicker || !datePicker.value) return;

    const val = datePicker.value;
    if (!selectedShiftDates.includes(val)) {
      selectedShiftDates.push(val);
      selectedShiftDates.sort();
      renderShiftDateChips();
    }
    datePicker.value = '';
  }

  function openShiftSignupModal(dateStr, dateLabel) {
    const modal = document.getElementById('signup-modal-overlay');
    const taskInput = document.getElementById('signup-task-input');
    const datePicker = document.getElementById('signup-date-picker');
    const tzLabel = document.getElementById('signup-tz-label');
    const startTimeInput = document.getElementById('signup-start-time');
    const finishTimeInput = document.getElementById('signup-finish-time');
    const timeError = document.getElementById('signup-time-error');

    selectedShiftDates = dateStr ? [dateStr] : [];
    if (taskInput) taskInput.value = '';
    if (datePicker) datePicker.value = '';
    if (startTimeInput) startTimeInput.value = '';
    if (finishTimeInput) finishTimeInput.value = '';
    if (timeError) timeError.style.display = 'none';

    if (tzLabel) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
        tzLabel.textContent = `Timezone: ${tz}`;
      } catch (e) {
        tzLabel.textContent = 'Timezone: Local';
      }
    }

    renderShiftDateChips();
    if (modal) modal.classList.remove('hidden');
  }

  function closeShiftSignupModal() {
    const modal = document.getElementById('signup-modal-overlay');
    if (modal) modal.classList.add('hidden');
  }

  function handleShiftSignupSubmit(e) {
    e.preventDefault();
    const taskInput = document.getElementById('signup-task-input');
    const startTimeInput = document.getElementById('signup-start-time');
    const finishTimeInput = document.getElementById('signup-finish-time');
    const timeError = document.getElementById('signup-time-error');

    const task = taskInput ? taskInput.value.trim() : '';
    if (!task) {
      showToast('Please enter a task name.', 'error');
      return;
    }

    if (selectedShiftDates.length === 0) {
      showToast('Please select at least one date.', 'error');
      return;
    }

    const startVal = startTimeInput ? startTimeInput.value.trim() : '';
    const finishVal = finishTimeInput ? finishTimeInput.value.trim() : '';

    const validStart = parseAndValidateTime(startVal);
    const validFinish = parseAndValidateTime(finishVal);

    if (!validStart || !validFinish) {
      if (timeError) {
        timeError.textContent = 'Invalid time format. Please enter a valid 12-hour (e.g. 2:00 PM) or 24-hour (e.g. 14:00) time.';
        timeError.style.display = 'block';
      }
      return;
    }

    if (timeError) timeError.style.display = 'none';

    const timeSlotStr = `${validStart} – ${validFinish}`;
    const shifts = getStaffShifts();

    selectedShiftDates.forEach(dateStr => {
      shifts.push({
        id: 'shift_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
        date: dateStr,
        task: task,
        timeSlot: timeSlotStr,
        staffName: currentStaff ? (currentStaff.name || currentStaff.minecraftUsername) : 'Staff',
        staffMc: currentStaff ? (currentStaff.minecraftUsername || 'MHF_Steve') : 'MHF_Steve',
        staffRank: currentStaff ? (currentStaff.rank || 'Staff') : 'Staff',
        createdAt: new Date().toISOString()
      });
    });

    saveStaffShifts(shifts);
    closeShiftSignupModal();
    renderCalendar();
    showToast(`Scheduled ${selectedShiftDates.length} shift(s) successfully!`, 'success');
  }

  function renderCalendar() {
    if (!calendarGridContainer) return;

    const allShifts = getStaffShifts();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const managementRanks = [
      'owner', 'server lead', 'developer', 'developers', 'informatics',
      'staff manager', 'promotional manager', 'ticket manager',
      'manager', 'trial manager'
    ];
    const isSuper = currentStaff && (currentStaff.isSuperAdmin || managementRanks.includes((currentStaff.rank || '').toLowerCase()));

    if (calendarView === 'week') {
      const startOfWeek = new Date(currentAnchorDate);
      startOfWeek.setDate(currentAnchorDate.getDate() - currentAnchorDate.getDay());

      if (calDateRangeLabel) {
        calDateRangeLabel.textContent = `Week of ${startOfWeek.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }

      calendarGridContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(140px, 1fr))';
      calendarGridContainer.innerHTML = days.map((dayName, idx) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + idx);
        const isoDate = d.toISOString().split('T')[0];
        const dateDisplay = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        const fullDateLabel = `${dayName}, ${dateDisplay}`;

        const dayShifts = allShifts.filter(s => s.date === isoDate);

        return `
          <div class="calendar-day-card" data-date="${isoDate}" data-label="${escapeHtml(fullDateLabel)}" style="background: var(--surface-1, #0f0f15); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; min-height: 220px; display: flex; flex-direction: column; cursor: pointer; transition: all 0.2s ease;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
              <div style="font-family: var(--font-display); font-size: 0.95rem; color: #fff;">${dayName}</div>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem;">${dateDisplay}</div>

            <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
              ${dayShifts.length === 0 ? `
                <div class="empty-shift-placeholder" data-date="${isoDate}" data-label="${escapeHtml(fullDateLabel)}" style="background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.1); border-radius: 6px; padding: 0.75rem 0.5rem; text-align: center; color: var(--text-muted); font-size: 0.78rem; cursor: pointer; flex: 1; display: flex; align-items: center; justify-content: center;">
                  + Click to set task
                </div>
              ` : dayShifts.map(s => {
                const canDelete = isSuper || (currentStaff && (s.staffName === currentStaff.name || s.staffMc === currentStaff.minecraftUsername));
                const headName = s.staffMc || 'MHF_Steve';
                return `
                  <div style="background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.3); border-radius: 6px; padding: 0.5rem; display: flex; flex-direction: column; gap: 0.25rem;">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.35rem;">
                      <div style="display: flex; align-items: center; gap: 0.4rem;">
                        <img src="https://mc-heads.net/avatar/${headName}/24" style="width: 18px; height: 18px; border-radius: 3px;" alt="">
                        <span style="font-size: 0.82rem; font-weight: 600; color: #fff;">${escapeHtml(s.staffName || 'Staff')}</span>
                      </div>
                      ${canDelete ? `<button type="button" class="delete-shift-btn" data-shift-id="${s.id}" style="background: none; border: none; color: #ef4444; font-size: 1rem; cursor: pointer; padding: 0 0.2rem; line-height: 1;" title="Cancel Shift">&times;</button>` : ''}
                    </div>
                    <div style="font-size: 0.75rem; color: #38bdf8; font-weight: 500;">${escapeHtml(s.task)}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">${escapeHtml(s.timeSlot || 'Flexible')}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('');
    } else {
      const year = currentAnchorDate.getFullYear();
      const month = currentAnchorDate.getMonth();
      const lastDay = new Date(year, month + 1, 0);
      const numDays = lastDay.getDate();

      if (calDateRangeLabel) {
        calDateRangeLabel.textContent = currentAnchorDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
      }

      const monthDaysHtml = [];
      for (let day = 1; day <= numDays; day++) {
        const d = new Date(year, month, day);
        const isoDate = d.toISOString().split('T')[0];
        const dayOfWeek = days[d.getDay()].slice(0, 3);
        const fullDateLabel = `${dayOfWeek}, ${d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
        const dayShifts = allShifts.filter(s => s.date === isoDate);

        monthDaysHtml.push(`
          <div class="calendar-day-card" data-date="${isoDate}" data-label="${escapeHtml(fullDateLabel)}" style="background: var(--surface-1, #0f0f15); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 0.75rem; min-height: 110px; display: flex; flex-direction: column; cursor: pointer; transition: all 0.2s ease;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <span style="font-size: 0.8rem; font-weight: 600; color: #fff;">${day}</span>
              <span style="font-size: 0.7rem; color: var(--text-muted);">${dayOfWeek}</span>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 0.25rem;">
              ${dayShifts.slice(0, 2).map(s => `
                <div style="background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.3); border-radius: 4px; padding: 0.2rem 0.35rem; font-size: 0.7rem; color: #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  <span style="color: #38bdf8; font-weight: 600;">${escapeHtml(s.staffName)}:</span> ${escapeHtml(s.task)}
                </div>
              `).join('')}
              ${dayShifts.length > 2 ? `<div style="font-size: 0.68rem; color: #c084fc;">+${dayShifts.length - 2} more</div>` : ''}
              ${dayShifts.length === 0 ? `<div style="font-size: 0.7rem; color: rgba(255,255,255,0.2); text-align: center; margin-top: auto;">+ Set task</div>` : ''}
            </div>
          </div>
        `);
      }

      calendarGridContainer.style.gridTemplateColumns = 'repeat(7, 1fr)';
      calendarGridContainer.innerHTML = monthDaysHtml.join('');
    }

    calendarGridContainer.querySelectorAll('.empty-shift-placeholder').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const date = el.getAttribute('data-date');
        const label = el.getAttribute('data-label');
        openShiftSignupModal(date, label);
      });
    });

    calendarGridContainer.querySelectorAll('.calendar-day-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.delete-shift-btn')) return;
        const date = card.getAttribute('data-date');
        const label = card.getAttribute('data-label');
        openShiftSignupModal(date, label);
      });
    });

    calendarGridContainer.querySelectorAll('.delete-shift-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const shiftId = btn.getAttribute('data-shift-id');
        const updated = allShifts.filter(s => s.id !== shiftId);
        saveStaffShifts(updated);
        renderCalendar();
        showToast('Shift cancelled', 'info');
      });
    });
  }

  function initExecutivePanel() {
    loadAllEditableDocuments();
    renderExecutiveStaffTable();
    renderNotepadDocList();
    renderNotepadTabs();
    renderChangelogBuildsList();
  }

  function renderNotepadDocList() {
    if (!execDocList) return;
    const filterCat = execDocCategoryFilter ? execDocCategoryFilter.value : 'all';
    const q = execDocSearch ? execDocSearch.value.trim().toLowerCase() : '';

    const filtered = allEditableDocs.filter(d => {
      if (filterCat !== 'all') {
        if (filterCat === 'legal') return d.section === 'legal' || d.type === 'legal';
        if (filterCat === 'custom') return d.section === 'custom' || d.type === 'custom';
        if (filterCat === 'core') return d.section === 'core';
        if (filterCat === 'player') return d.section === 'player';
        if (filterCat === 'staff') return d.section === 'staff';
        if (filterCat === 'communicators') return d.section === 'communicators';
        if (filterCat === 'handbook') return d.section === 'handbook';
        if (filterCat === 'rules') return d.section === 'rules';
        if (filterCat === 'permissions') return d.section === 'permissions';
        if (filterCat === 'plugins') return d.section === 'plugins';
      }
      if (q) {
        return (d.title || '').toLowerCase().includes(q) || (d.rank_name || '').toLowerCase().includes(q);
      }
      return true;
    });

    execDocList.innerHTML = filtered.map(doc => {
      const isSelected = doc.id === selectedDocId;
      const rankTag = doc.rank_name ? `<span style="font-size: 0.7rem; color: #c084fc; background: rgba(139,92,246,0.15); padding: 0.1rem 0.35rem; border-radius: 3px;">${escapeHtml(doc.rank_name)}</span>` : '';
      const sectionTag = `<span style="font-size: 0.68rem; color: #94a3b8; text-transform: uppercase;">${escapeHtml(doc.section || doc.type || 'doc')}</span>`;
      const dirtyDot = doc.isDirty ? '<span style="color: #f59e0b; margin-left: 0.3rem;">●</span>' : '';

      return `
        <div class="exec-doc-item ${isSelected ? 'active' : ''}" data-doc-id="${doc.id}" style="padding: 0.6rem 0.75rem; border-radius: 6px; background: ${isSelected ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.02)'}; border: 1px solid ${isSelected ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.05)'}; cursor: pointer; display: flex; flex-direction: column; gap: 0.25rem; transition: all 0.2s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #fff; font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(doc.title || 'Untitled')}${dirtyDot}</strong>
          </div>
          <div style="display: flex; gap: 0.4rem; align-items: center;">
            ${sectionTag}
            ${rankTag}
          </div>
        </div>
      `;
    }).join('');

    execDocList.querySelectorAll('.exec-doc-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-doc-id');
        openDocumentInEditor(id);
      });
    });
  }

  function renderNotepadTabs() {
    if (!nppTabBar) return;
    nppTabBar.innerHTML = openTabs.map(tabId => {
      const doc = allEditableDocs.find(d => d.id === tabId);
      if (!doc) return '';
      const isActive = tabId === selectedDocId;
      const dirtyDot = doc.isDirty ? '<span style="color: #f59e0b; margin-right: 0.3rem;">●</span>' : '';

      return `
        <div class="npp-tab ${isActive ? 'active' : ''}" data-tab-id="${doc.id}" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.85rem; background: ${isActive ? '#181824' : 'rgba(255,255,255,0.03)'}; border-top: 2px solid ${isActive ? 'var(--purple-glow)' : 'transparent'}; border-right: 1px solid rgba(255,255,255,0.05); color: ${isActive ? '#fff' : 'var(--text-muted)'}; font-size: 0.85rem; cursor: pointer; user-select: none;">
          <span>${dirtyDot}${escapeHtml(doc.title || 'Untitled')}</span>
          <button type="button" class="npp-tab-close" data-close-id="${doc.id}" style="background: none; border: none; color: inherit; font-size: 0.95rem; cursor: pointer; padding: 0 0.1rem; line-height: 1;">&times;</button>
        </div>
      `;
    }).join('');

    nppTabBar.querySelectorAll('.npp-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        if (e.target.closest('.npp-tab-close')) return;
        const id = tab.getAttribute('data-tab-id');
        openDocumentInEditor(id);
      });
    });

    nppTabBar.querySelectorAll('.npp-tab-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-close-id');
        closeDocumentTab(id);
      });
    });
  }

  function openDocumentInEditor(docId) {
    const doc = allEditableDocs.find(d => d.id == docId);
    if (!doc) return;

    selectedDocId = doc.id;
    if (!openTabs.includes(doc.id)) {
      openTabs.push(doc.id);
    }

    if (execDocTitleInput) execDocTitleInput.value = doc.title || '';
    if (execDocSectionSelect) execDocSectionSelect.value = doc.section || doc.type || 'handbook';
    if (execDocRankInput) execDocRankInput.value = doc.rank_name || '';
    if (execDocContentTextarea) {
      execDocContentTextarea.value = doc.content || '';
      execDocContentTextarea.disabled = false;
    }

    updateLineNumbers();
    updateCursorPosition();
    renderNotepadTabs();
    renderNotepadDocList();
  }

  function closeDocumentTab(docId) {
    openTabs = openTabs.filter(id => id != docId);
    if (selectedDocId == docId) {
      if (openTabs.length > 0) {
        openDocumentInEditor(openTabs[openTabs.length - 1]);
      } else {
        selectedDocId = null;
        if (execDocTitleInput) execDocTitleInput.value = '';
        if (execDocContentTextarea) {
          execDocContentTextarea.value = '';
          execDocContentTextarea.disabled = true;
        }
        if (nppLineNumbers) nppLineNumbers.innerHTML = '1';
        renderNotepadTabs();
        renderNotepadDocList();
      }
    } else {
      renderNotepadTabs();
    }
  }

  function handleCreateNewDocument() {
    const newDoc = {
      id: 'custom_' + Date.now(),
      section: 'handbook',
      rank_name: '',
      title: 'New Document',
      content: 'Write document content here...',
      sort_order: 99,
      isDirty: true,
      isNew: true
    };
    allEditableDocs.unshift(newDoc);
    openDocumentInEditor(newDoc.id);
    showToast('New document initialized', 'info');
  }

  function handleDeleteDocument() {
    if (!selectedDocId) return;
    const doc = allEditableDocs.find(d => d.id === selectedDocId);
    if (!doc) return;

    if (confirm(`Are you sure you want to delete "${doc.title}"?`)) {
      allEditableDocs = allEditableDocs.filter(d => d.id !== selectedDocId);
      closeDocumentTab(selectedDocId);
      saveAllEditableDocuments();
      showToast('Document deleted', 'info');
    }
  }

  function updateLineNumbers() {
    if (!execDocContentTextarea || !nppLineNumbers) return;
    const lines = execDocContentTextarea.value.split('\n').length;
    let numbers = '';
    for (let i = 1; i <= Math.max(lines, 1); i++) {
      numbers += i + '<br>';
    }
    nppLineNumbers.innerHTML = numbers;
  }

  function updateCursorPosition() {
    if (!execDocContentTextarea) return;
    const pos = execDocContentTextarea.selectionStart;
    const val = execDocContentTextarea.value;
    const line = val.substring(0, pos).split('\n').length;
    const col = pos - val.lastIndexOf('\n', pos - 1);
    if (nppCursorPos) nppCursorPos.textContent = `Ln: ${line}, Col: ${col}`;
    if (nppCharCount) nppCharCount.textContent = `Chars: ${val.length}`;
  }

  function openPushModal() {
    if (!selectedDocId) {
      showToast('Please select a document to push', 'error');
      return;
    }
    const doc = allEditableDocs.find(d => d.id === selectedDocId);
    if (!doc) return;

    if (execPushDocTitle) execPushDocTitle.textContent = `Deploy: "${doc.title}"`;
    if (execPushModal) execPushModal.classList.remove('hidden');
  }

  function closePushModal() {
    if (execPushModal) execPushModal.classList.add('hidden');
  }

  function handleExecutePush(e) {
    e.preventDefault();
    if (!selectedDocId) return;
    const doc = allEditableDocs.find(d => d.id === selectedDocId);
    if (!doc) return;

    const delaySelect = document.getElementById('push-delay-select');
    const delayMinutes = delaySelect ? parseInt(delaySelect.value, 10) : 0;
    const notesInput = document.getElementById('push-release-notes');
    const releaseNotes = notesInput ? notesInput.value.trim() : '';

    if (delayMinutes === 0) {
      deployDocumentDirectly(doc, releaseNotes);
      closePushModal();
      showToast(`"${doc.title}" pushed live immediately!`, 'success');
    } else {
      schedulePendingPush(doc, delayMinutes, releaseNotes);
      closePushModal();
      showToast(`"${doc.title}" scheduled for live deployment in ${delayMinutes} minute(s)`, 'info');
    }
  }

  function deployDocumentDirectly(doc, releaseNotes) {
    doc.isDirty = false;
    doc.isNew = false;
    saveAllEditableDocuments();

    if (doc.section === 'legal' || doc.type === 'legal') {
      const legalId = doc.id;
      const customLegal = getCustomLegalDocuments();
      customLegal[legalId] = doc.content;
      localStorage.setItem('sm_custom_legal', JSON.stringify(customLegal));
    } else {
      const liveStaffDocs = getStaffDocuments();
      const existingIdx = liveStaffDocs.findIndex(d => d.id == doc.id);
      if (existingIdx !== -1) {
        liveStaffDocs[existingIdx] = { ...doc };
      } else {
        liveStaffDocs.push({ ...doc });
      }
      saveStaffDocuments(liveStaffDocs);
    }

    renderNotepadDocList();
    renderNotepadTabs();
    loadResources();
  }

  function schedulePendingPush(doc, delayMinutes, releaseNotes) {
    const deployAt = Date.now() + (delayMinutes * 60 * 1000);
    const pendingItem = {
      id: 'pending_' + Date.now(),
      doc: { ...doc },
      releaseNotes: releaseNotes,
      deployAt: deployAt,
      scheduledBy: currentStaff ? currentStaff.name : 'Executive'
    };

    localStorage.setItem('sm_pending_push', JSON.stringify(pendingItem));
    startPendingPushTimer(pendingItem);
  }

  function checkPendingPushes() {
    try {
      const saved = localStorage.getItem('sm_pending_push');
      if (saved) {
        const pending = JSON.parse(saved);
        if (Date.now() >= pending.deployAt) {
          deployDocumentDirectly(pending.doc, pending.releaseNotes);
          localStorage.removeItem('sm_pending_push');
          if (execPendingPushBanner) execPendingPushBanner.classList.add('hidden');
        } else {
          startPendingPushTimer(pending);
        }
      }
    } catch(e) {}
  }

  function startPendingPushTimer(pendingItem) {
    if (pendingPushTimerInterval) clearInterval(pendingPushTimerInterval);
    if (!execPendingPushBanner) return;

    execPendingPushBanner.classList.remove('hidden');
    if (pendingDocName) pendingDocName.textContent = pendingItem.doc.title;

    function updateRemaining() {
      const remainingMs = pendingItem.deployAt - Date.now();
      if (remainingMs <= 0) {
        clearInterval(pendingPushTimerInterval);
        deployDocumentDirectly(pendingItem.doc, pendingItem.releaseNotes);
        localStorage.removeItem('sm_pending_push');
        execPendingPushBanner.classList.add('hidden');
        showToast(`Staged push "${pendingItem.doc.title}" is now LIVE!`, 'success');
        return;
      }

      const totalSec = Math.floor(remainingMs / 1000);
      const min = Math.floor(totalSec / 60);
      const sec = totalSec % 60;
      if (pendingTimerDisplay) {
        pendingTimerDisplay.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
      }
    }

    updateRemaining();
    pendingPushTimerInterval = setInterval(updateRemaining, 1000);
  }

  function deployPendingImmediately() {
    try {
      const saved = localStorage.getItem('sm_pending_push');
      if (saved) {
        const pending = JSON.parse(saved);
        if (pendingPushTimerInterval) clearInterval(pendingPushTimerInterval);
        deployDocumentDirectly(pending.doc, pending.releaseNotes);
        localStorage.removeItem('sm_pending_push');
        if (execPendingPushBanner) execPendingPushBanner.classList.add('hidden');
        showToast(`"${pending.doc.title}" deployed immediately!`, 'success');
      }
    } catch(e) {}
  }

  function cancelPendingPush() {
    if (pendingPushTimerInterval) clearInterval(pendingPushTimerInterval);
    localStorage.removeItem('sm_pending_push');
    if (execPendingPushBanner) execPendingPushBanner.classList.add('hidden');
    showToast('Staged push cancelled', 'info');
  }

  function loadAllEditableDocuments() {
    const staffDocs = getStaffDocuments();
    allEditableDocs = staffDocs.map(d => ({ ...d }));

    const defaultLegal = [
      { id: 'tos', title: 'Terms of Service', section: 'legal', type: 'legal', content: document.getElementById('tos-text')?.innerHTML?.trim() || 'Terms of Service' },
      { id: 'privacy', title: 'Privacy Policy', section: 'legal', type: 'legal', content: document.getElementById('privacy-text')?.innerHTML?.trim() || 'Privacy Policy' },
      { id: 'rules', title: 'Server Rules', section: 'legal', type: 'legal', content: document.getElementById('rules-text')?.innerHTML?.trim() || 'Server Rules' }
    ];

    defaultLegal.forEach(leg => {
      if (!allEditableDocs.some(d => d.id === leg.id)) {
        allEditableDocs.push(leg);
      }
    });
  }

  function saveAllEditableDocuments() {
    const staffOnly = allEditableDocs.filter(d => d.section !== 'legal' && d.type !== 'legal');
    saveStaffDocuments(staffOnly);
  }

  function renderExecutiveStaffTable() {
    if (!execStaffTbody) return;
    const accounts = getStaffAccounts();

    execStaffTbody.innerHTML = accounts.map((acc, idx) => {
      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 0.75rem; color: #fff; font-weight: 600;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <img src="https://mc-heads.net/avatar/${acc.minecraftUsername || 'MHF_Steve'}/20" style="width: 20px; height: 20px; border-radius: 3px;" alt="">
              <span>${escapeHtml(acc.name)}</span>
            </div>
          </td>
          <td style="padding: 0.75rem; color: var(--text-muted); font-family: monospace;">${escapeHtml(acc.minecraftUsername || 'N/A')}</td>
          <td style="padding: 0.75rem;">
            <span style="font-size: 0.75rem; background: rgba(139,92,246,0.15); color: #c084fc; padding: 0.2rem 0.5rem; border-radius: 4px;">${escapeHtml(acc.rank || 'Staff')}</span>
          </td>
          <td style="padding: 0.75rem; font-family: monospace; color: #22d3ee; letter-spacing: 0.5px;">${escapeHtml(acc.code)}</td>
          <td style="padding: 0.75rem; text-align: right;">
            <button type="button" class="btn btn-secondary btn-sm edit-staff-btn" data-idx="${idx}" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;">Edit</button>
            <button type="button" class="btn btn-sm delete-staff-btn" data-idx="${idx}" style="font-size: 0.75rem; padding: 0.2rem 0.5rem; background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); margin-left: 0.3rem;">Delete</button>
          </td>
        </tr>
      `;
    }).join('');

    execStaffTbody.querySelectorAll('.delete-staff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const accounts = getStaffAccounts();
        if (confirm(`Delete staff access for "${accounts[idx].name}"?`)) {
          accounts.splice(idx, 1);
          saveStaffAccounts(accounts);
          renderExecutiveStaffTable();
          showToast('Staff member deleted', 'info');
        }
      });
    });
  }

  function openAddStaffModal() {
    if (formExecAddStaff) formExecAddStaff.reset();
    generateRandomStaffCode();
    if (execAddStaffModal) execAddStaffModal.classList.remove('hidden');
  }

  function closeAddStaffModal() {
    if (execAddStaffModal) execAddStaffModal.classList.add('hidden');
  }

  function generateRandomStaffCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789!$@#';
    let code = '';
    for (let i = 0; i < 10; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (addStaffCode) addStaffCode.value = code;
  }

  function handleAddStaffSubmit(e) {
    e.preventDefault();
    const name = addStaffName ? addStaffName.value.trim() : '';
    const ign = addStaffIgn ? addStaffIgn.value.trim() : '';
    const rank = addStaffRank ? addStaffRank.value.trim() : 'Helper';
    const code = addStaffCode ? addStaffCode.value.trim() : '';

    if (!name || !code) return;

    const accounts = getStaffAccounts();
    accounts.push({
      code: code,
      name: name,
      minecraftUsername: ign || name,
      rank: rank,
      isSuperAdmin: ['owner', 'server lead', 'developer'].includes(rank.toLowerCase())
    });

    saveStaffAccounts(accounts);
    closeAddStaffModal();
    renderExecutiveStaffTable();
    showToast(`Staff access generated for ${name}`, 'success');
  }

  function renderChangelogBuildsList() {
    if (!execBuildsListContainer) return;
    const pluginId = execChangelogPluginSelect ? execChangelogPluginSelect.value : 'all';

    let changelogs = [];
    if (typeof SMSUITE_CHANGELOG_DATA !== 'undefined') {
      if (pluginId === 'all') {
        Object.keys(SMSUITE_CHANGELOG_DATA).forEach(key => {
          const mod = SMSUITE_CHANGELOG_DATA[key];
          mod.versions.forEach(v => {
            changelogs.push({ plugin: mod.name, ...v });
          });
        });
      } else if (SMSUITE_CHANGELOG_DATA[pluginId]) {
        const mod = SMSUITE_CHANGELOG_DATA[pluginId];
        mod.versions.forEach(v => {
          changelogs.push({ plugin: mod.name, ...v });
        });
      }
    }

    execBuildsListContainer.innerHTML = changelogs.map(b => `
      <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 1rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <strong style="color: #fff; font-size: 0.95rem;">${escapeHtml(b.plugin)}</strong>
            <span style="font-family: monospace; font-size: 0.8rem; color: #22d3ee; background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.3); padding: 0.1rem 0.4rem; border-radius: 4px;">v${escapeHtml(b.version)}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(b.date || '')}</span>
          </div>
          <div style="font-size: 0.85rem; color: #cbd5e1; margin-top: 0.3rem;">${escapeHtml(b.title || '')}</div>
        </div>
        <span style="font-size: 0.75rem; color: #4ade80; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); padding: 0.15rem 0.5rem; border-radius: 4px;">${escapeHtml(b.channel || 'Release')}</span>
      </div>
    `).join('');
  }

  function openAddBuildModal() {
    if (formExecAddBuild) formExecAddBuild.reset();
    if (execAddBuildModal) execAddBuildModal.classList.remove('hidden');
  }

  function closeAddBuildModal() {
    if (execAddBuildModal) execAddBuildModal.classList.add('hidden');
  }

  function handleAddBuildSubmit(e) {
    e.preventDefault();
    const plugin = addBuildPluginTarget ? addBuildPluginTarget.value : 'SMCore';
    const ver = addBuildVersion ? addBuildVersion.value.trim() : '1.0.0';
    const title = addBuildTitle ? addBuildTitle.value.trim() : `v${ver} Release`;
    const notes = addBuildNotes ? addBuildNotes.value.trim() : '';

    if (typeof SMSUITE_CHANGELOG_DATA !== 'undefined' && SMSUITE_CHANGELOG_DATA[plugin]) {
      SMSUITE_CHANGELOG_DATA[plugin].versions.unshift({
        version: ver,
        title: title,
        date: new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
        jarFileName: `${plugin}-${ver}.jar`,
        fileSize: 'N/A',
        channel: ver.toLowerCase().includes('beta') ? 'Beta' : 'Release',
        target: 'Paper 1.20.4+',
        content: notes
      });
    }

    closeAddBuildModal();
    renderChangelogBuildsList();
    showToast(`Build v${ver} added for ${plugin}`, 'success');
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

  function showToast(msg, type = 'info') {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, type);
    } else {
      const container = document.getElementById('toast-container');
      if (container) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
      }
    }
  }
})();
