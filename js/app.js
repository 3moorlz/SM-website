(function () {
  'use strict';
  const _path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  const _isSubPage = _path.includes('/html/');
  const ASSET_PREFIX = _isSubPage ? '../' : '';
  window.ASSET_PREFIX = ASSET_PREFIX;
  function isPage(name) {
    var n = name.toLowerCase();
    return _path.endsWith('/' + n) || _path.endsWith('/' + n + '.html') || _path.endsWith('/html/' + n) || _path.endsWith('/html/' + n + '.html');
  }
  const state = {
    view: 'home',
    storeCategory: 'ranks',
    cart: [],
    user: null,
    bedrock: false,
    activeTableTab: 'overview',
    pendingPurchase: null,
    giftRecipient: (() => { try { return sessionStorage.getItem('sm_giftRecipient'); } catch(e) { return null; } })()
  };
  let lastFocus = null;
  let openOverlay = null;
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const DEFAULT_STEVE_HEAD = 'https://mc-heads.net/avatar/MHF_Steve/32';
  function saveState() {
    try {
      localStorage.setItem('sm_cart', JSON.stringify(state.cart));
      localStorage.setItem('sm_user', JSON.stringify({ user: state.user, bedrock: state.bedrock }));
      if (state.giftRecipient) {
        sessionStorage.setItem('sm_giftRecipient', state.giftRecipient);
      } else {
        sessionStorage.removeItem('sm_giftRecipient');
      }
    } catch (e) {}
  }
  function getRank(id) {
    return RANKS.find(function (r) { return r.id === id; });
  }
  function getPackageId(item) {
    if (item.type === 'rank') {
      var rank = getRank(item.id);
      if (rank) return item.tier === 'monthly' ? rank.monthlyPackageId : rank.lifetimePackageId;
    } else if (item.type === 'key') {
      var key = KEYS.find(function(k) { return k.id === item.id; });
      if (key) return item.tier === 'pack' ? key.packId : key.singleId;
    } else if (item.type === 'bundle') {
      var bundle = BUNDLES.find(function(b) { return b.id === item.id; });
      if (bundle) return bundle.packageId;
    }
    return null;
  }
  function rankColClass(rank) {
    return rank.id === 'immortal' ? 'col-immortal' : '';
  }
  function rankCartLabel(rank, inCart) {
    if (inCart) return '✓ In Cart';
    return 'VIEW OPTIONS';
  }
  function formatPrice(amount) {
    return '$' + amount.toFixed(2);
  }
  function showToast(message, type) {
    const container = $('#toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' ' + type : '');
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }
  window.showToast = showToast;
  function showPlaceholder(label) {
    showToast(label + ' — {Placeholder}');
  }
  function showSoon(feature) {
    if (feature === 'Checkout') {
      showToast("Store isn't live yet — check Discord for launch updates.");
      return;
    }
    showToast(feature + ' — Coming Soon');
  }
  function setNavActive(view) {
    $$('.top-nav .nav-link[data-view], .mobile-nav .nav-link[data-view]').forEach((link) => {
      const isStore = view === 'store' && link.dataset.view === 'store';
      link.classList.toggle('active', link.dataset.view === view || isStore);
    });
  }
  function switchView(view, storeCat) {
    if (view === 'store' && !state.user) {
      showToast('Please login to access the store', 'warning');
      openOverlayPanel('login', $('#login-modal'));
      return;
    }
    state.view = view;
    $$('.view').forEach((el) => el.classList.remove('active'));
    const panel = $('#view-' + view);
    if (panel) panel.classList.add('active');
    setNavActive(view);
    if (view === 'store') {
      switchStoreCategory(storeCat || state.storeCategory || 'ranks');
    }
    $('#mobile-nav').classList.add('hidden');
    $('#nav-hamburger').setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function switchStoreCategory(cat) {
    state.storeCategory = cat;
    $$('.wheel-item').forEach((btn) => {
      const isActive = btn.dataset.storeCat === cat;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        const label = $('#category-toggle-label');
        if (label) label.textContent = btn.textContent;
      }
    });
    $('#store-ranks').hidden = cat !== 'ranks';
    $('#store-ranks').classList.toggle('active', cat === 'ranks');
    $('#store-keys').hidden = cat !== 'keys';
    $('#store-keys').classList.toggle('active', cat === 'keys');
    $('#store-bundles').hidden = cat !== 'bundles';
    $('#store-bundles').classList.toggle('active', cat === 'bundles');
    closeCategoryDropdown();
  }
  function openCategoryDropdown() {
    const dropdown = $('#category-dropdown');
    const wheel = $('#category-wheel');
    const toggle = $('#category-toggle');
    if (!dropdown || !wheel || !toggle) return;
    dropdown.classList.add('open');
    wheel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeCategoryDropdown() {
    const dropdown = $('#category-dropdown');
    const wheel = $('#category-wheel');
    const toggle = $('#category-toggle');
    if (!dropdown || !wheel || !toggle) return;
    dropdown.classList.remove('open');
    wheel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }
  function toggleCategoryDropdown() {
    const wheel = $('#category-wheel');
    if (!wheel) return;
    if (wheel.hidden) openCategoryDropdown();
    else closeCategoryDropdown();
  }
  function getFocusable(container) {
    return Array.from(container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));
  }
  function trapFocus(e, container) {
    if (e.key !== 'Tab' || !container) return;
    const focusable = getFocusable(container);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  function lockPage(triggerEl) {
    lastFocus = triggerEl || document.activeElement;
    $('#page-shell').setAttribute('aria-hidden', 'true');
    document.body.classList.add('scroll-lock');
  }
  function unlockPage() {
    $('#page-shell').removeAttribute('aria-hidden');
    document.body.classList.remove('scroll-lock');
    openOverlay = null;
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    lastFocus = null;
  }
  function openOverlayPanel(id, panel, triggerEl) {
    if (openOverlay && openOverlay !== id) {
      if (id === 'legal-text' && openOverlay === 'cart') {
        window.previousOverlay = openOverlay;
      } else {
        closeOverlay(openOverlay);
      }
    }
    panel.classList.remove('hidden');
    lockPage(triggerEl);
    openOverlay = id;
    const focusable = getFocusable(panel);
    if (focusable.length) focusable[0].focus();
  }
  function closeOverlay(id) {
    if (id === 'login') {
      $('#login-modal').classList.add('hidden');
      clearUsernameError();
    } else if (id === 'cart') {
      $('#cart-panel').classList.add('hidden');
      $('#cart-toggle').setAttribute('aria-expanded', 'false');
    } else if (id === 'perks') {
      $('#perks-modal').classList.add('hidden');
    } else if (id === 'confirm') {
      $('#confirm-modal').classList.add('hidden');
      state.pendingPurchase = null;
    } else if (id === 'legal-text') {
      $('#legal-text-modal').classList.add('hidden');
    }
    if (id === 'legal-text' && window.previousOverlay) {
      openOverlay = window.previousOverlay;
      window.previousOverlay = null;
      return;
    }
    if (openOverlay === id) unlockPage();
  }
  function renderFeatures() {
    if (!$('#feature-grid')) return;
    $('#feature-grid').innerHTML = HOME_FEATURES.map((f, i) =>
      '<div class="advancement-item">' +
        '<button type="button" class="advancement-toggle" aria-expanded="false" aria-controls="adv-' + i + '">' +
          '<span class="mc-slot" aria-hidden="true"><span class="mc-slot-icon">' + f.icon + '</span></span>' +
          '<span class="advancement-title">' + f.title + '</span>' +
        '</button>' +
        '<div class="advancement-detail" id="adv-' + i + '"><p>' + f.text + '</p></div>' +
      '</div>'
    ).join('');
  }
  function toggleAdvancement(btn) {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    btn.closest('.advancement-item').classList.toggle('is-open', !open);
  }
  function rankPricingHtml(rank) {
    let html = '<div class="rank-pricing">';
    html +=
      '<div class="rank-price">' + formatPrice(rank.lifetimePrice) +
        ' <span class="rank-price-tier">Lifetime</span>' +
      '</div>';
    if (rank.monthlyPrice) {
      html +=
        '<div class="rank-price rank-price-monthly">' + formatPrice(rank.monthlyPrice) +
          ' <span class="rank-price-tier">Monthly</span>' +
          (rank.bestDeal ? ' <span class="rank-best-deal">Best Deal</span>' : '') +
        '</div>';
      if (rank.monthlyNote) {
        html += '<p class="rank-price-note">' + rank.monthlyNote + '</p>';
      }
    }
    html += '</div>';
    return html;
  }
  function renderRankCards() {
    if (!$('#rank-cards')) return;
    $('#rank-cards').innerHTML = RANKS.map(function (rank) {
      const inCart = state.cart.some(function (item) { return item.id === rank.id; });
      const featured = rank.id === 'immortal';
      return (
        '<article class="rank-card' + (featured ? ' rank-featured' : '') + '" style="--rank-accent:' + rank.accent + ';--rank-glow:' + rank.accentGlow + '">' +
          (featured ? '<span class="rank-tier-badge">Top Tier</span>' : '') +
          '<div class="rank-card-header">' +
            '<img src="' + ASSET_PREFIX + rank.badge + '" alt="' + rank.name + ' rank badge" class="rank-badge">' +
            '<h3>' + rank.name + '</h3>' +
            rankPricingHtml(rank) +
          '</div>' +
          '<button type="button" class="add-cart-btn' + (inCart ? ' in-cart' : '') + '" data-rank-id="' + rank.id + '">' +
            rankCartLabel(rank, inCart) +
          '</button>' +
        '</article>'
      );
    }).join('');
  }
  let currentKeysTier = 'single';
  function renderKeys() {
    let html = '';
    KEYS.forEach(function(key) {
      if (currentKeysTier === 'single') {
        html +=
          '<article class="key-card">' +
            '<img src="' + ASSET_PREFIX + key.image + '" alt="" class="key-card-icon" onerror="this.onerror=null; this.src=\'' + ASSET_PREFIX + 'assets/keys/ascendant_key.webp\';">' +
            '<h3>' + key.name + '</h3>' +
            '<div class="store-card-price">$' + key.singlePrice.toFixed(2) + '</div>' +
            '<button type="button" class="btn btn-primary btn-store-item btn-buy-key" data-id="' + key.id + '" data-tier="single">VIEW OPTIONS</button>' +
          '</article>';
      } else {
        html +=
          '<article class="key-card">' +
            '<img src="' + ASSET_PREFIX + (key.packImage || key.image) + '" alt="" class="key-card-icon" style="width: 64px; height: 64px;" onerror="this.onerror=null; this.src=\'' + ASSET_PREFIX + 'assets/keys/ascendant_key.webp\';">' +
            '<h3>' + key.name + ' (5x Pack)</h3>' +
            '<div class="store-card-price">$' + key.packPrice.toFixed(2) + '</div>' +
            '<div class="store-card-savings">' + key.saveText + '</div>' +
            '<button type="button" class="btn btn-primary btn-store-item btn-buy-key" data-id="' + key.id + '" data-tier="pack">VIEW OPTIONS</button>' +
          '</article>';
      }
    });
    if (!$('#keys-grid')) return;
    $('#keys-grid').innerHTML = html;
  }
  function renderBundles() {
    let html = BUNDLES.map(function(bundle) {
      return (
        '<article class="key-card">' +
          '<img src="' + ASSET_PREFIX + bundle.image + '" alt="" class="bundle-card-icon" onerror="this.onerror=null; this.src=\'' + ASSET_PREFIX + 'assets/misc/money.webp\';">' +
          '<h3>' + bundle.name + '</h3>' +
          '<div class="store-card-price">$' + bundle.price.toFixed(2) + '</div>' +
          '<div class="store-card-savings">' + bundle.value + '</div>' +
          '<button type="button" class="btn btn-primary btn-store-item btn-buy-bundle" data-id="' + bundle.id + '">VIEW OPTIONS</button>' +
        '</article>'
      );
    }).join('');
    if (!$('#bundles-grid')) return;
    $('#bundles-grid').innerHTML = html;
  }
  function renderComparisonTable() {
    const table = $('#comparison-table');
    if (!table) return;
    const displayRanks = RANKS.filter(function(r) { return r.id !== 'test'; });
    table.querySelector('thead').innerHTML =
      '<tr><th>Feature</th>' + displayRanks.map(function (r) {
        return '<th class="' + rankColClass(r) + '">' + r.name + '</th>';
      }).join('') + '</tr>';
    var pricingRows = isPage('info') ? (
      '<tr class="pricing-row"><td style="font-weight:600;">Lifetime Price</td>' + displayRanks.map(function (r) {
        return '<td class="' + rankColClass(r) + '" style="font-weight:700; color: var(--success);">' + formatPrice(r.lifetimePrice) + '</td>';
      }).join('') + '</tr>' +
      '<tr class="pricing-row"><td style="font-weight:600;">Monthly Price</td>' + displayRanks.map(function (r) {
        var cell = r.monthlyPrice
          ? '<span style="font-weight:700; color: var(--purple-mid);">' + formatPrice(r.monthlyPrice) + '/mo</span>' +
            (r.monthlyNote ? '<br><span style="font-size:0.75rem; color: var(--text-muted);">' + r.monthlyNote + '</span>' : '')
          : '<span style="color: var(--text-muted);">—</span>';
        return '<td class="' + rankColClass(r) + '">' + cell + '</td>';
      }).join('') + '</tr>'
    ) : '';
    table.querySelector('tbody').innerHTML = pricingRows + COMPARISON_ROWS.map(function (row) {
      return '<tr><td>' + row.label + '</td>' + row.values.map(function (val, i) {
        return '<td class="' + rankColClass(displayRanks[i]) + '">' + val + '</td>';
      }).join('') + '</tr>';
    }).join('');
  }
  function renderKitTable() {
    const table = $('#kit-table');
    if (!table) return;
    const displayRanks = RANKS.filter(function(r) { return r.id !== 'test'; });
    table.querySelector('thead').innerHTML =
      '<tr><th>Command / Feature</th>' + displayRanks.map(function (r) {
        return '<th class="' + rankColClass(r) + '">' + r.name + '</th>';
      }).join('') + '</tr>';
    table.querySelector('tbody').innerHTML = KIT_PERKS.map(function (row) {
      return '<tr><td>' + row.label + '</td>' + row.values.map(function (val, i) {
        return '<td class="' + rankColClass(displayRanks[i]) + '">' +
          '<span class="' + (val ? 'check-yes' : 'check-no') + '">' + (val ? '✓' : '—') + '</span>' +
        '</td>';
      }).join('') + '</tr>';
    }).join('');
  }
  function openConfirmModal(rankId) {
    const rank = getRank(rankId);
    if (!rank) return;
    const defaultTier = rank.monthlyPrice ? 'monthly' : 'lifetime';
    const defaultPrice = defaultTier === 'monthly' ? rank.monthlyPrice : rank.lifetimePrice;
    const defaultLabel = defaultTier === 'monthly' ? 'Monthly' : 'Lifetime';
    state.pendingPurchase = {
      type: 'rank',
      id: rank.id,
      name: rank.name,
      price: defaultPrice,
      tier: defaultTier,
      label: rank.name + ' (' + defaultLabel + ')',
    };
    let tierPicker = '';
    if (rank.monthlyPrice) {
      tierPicker =
        '<div class="tier-picker" role="group" aria-label="Choose purchase type">' +
          '<button type="button" class="tier-option" data-tier="lifetime">' +
            'Lifetime · ' + formatPrice(rank.lifetimePrice) +
          '</button>' +
          '<button type="button" class="tier-option active" data-tier="monthly">' +
            'Monthly · ' + formatPrice(rank.monthlyPrice) +
            (rank.bestDeal ? ' · Best Deal' : '') +
          '</button>' +
          (rank.monthlyNote ? '<p class="tier-note">' + rank.monthlyNote + '</p>' : '') +
        '</div>';
    }
    $('#confirm-modal-content').innerHTML =
      '<div class="embed-header" style="border-left-color:' + rank.accent + '">' +
        '<img src="' + ASSET_PREFIX + rank.badge + '" alt=""><div><h3>' + rank.name + '</h3>' +
        '<p class="confirm-tier-label">' + defaultLabel + ' · ' + formatPrice(defaultPrice) + '</p></div>' +
      '</div>' +
      tierPicker +
      '<ul class="embed-perk-list">' + rank.perks.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>';
    openOverlayPanel('confirm', $('#confirm-modal'));
  }
  function openConfirmKey(keyId, defaultTier) {
    const key = KEYS.find(function(k) { return k.id === keyId; });
    if (!key) return;
    const tier = defaultTier || 'pack';
    const price = tier === 'pack' ? key.packPrice : key.singlePrice;
    const label = tier === 'pack' ? key.name + ' (5x Pack)' : key.name + ' (Single)';
    const image = tier === 'pack' ? (key.packImage || key.image) : key.image;
    state.pendingPurchase = { type: 'key', id: key.id, name: key.name, price: price, tier: tier, label: label, image: image };
    let tierPicker =
      '<div class="tier-picker">' +
        '<button type="button" class="tier-option ' + (tier === 'single' ? 'active' : '') + '" data-tier="single">' +
          'Single · ' + formatPrice(key.singlePrice) +
        '</button>' +
        '<button type="button" class="tier-option ' + (tier === 'pack' ? 'active' : '') + '" data-tier="pack">' +
          '5x Pack · ' + formatPrice(key.packPrice) + ' · Best Deal' +
        '</button>' +
        '<p class="tier-note">' + key.saveText + '</p>' +
      '</div>';
    $('#confirm-modal-content').innerHTML =
      '<div class="embed-header" style="border-left-color:#6d28d9">' +
        '<img id="confirm-item-image" src="' + ASSET_PREFIX + image + '" alt="" onerror="this.onerror=null; this.src=\'' + ASSET_PREFIX + 'assets/keys/ascendant_key.webp\';"><div><h3>' + key.name + '</h3>' +
        '<p class="confirm-tier-label">' + label + ' · ' + formatPrice(price) + '</p></div>' +
      '</div>' + tierPicker;
    openOverlayPanel('confirm', $('#confirm-modal'));
  }
  function openConfirmBundle(bundleId) {
    const bundle = BUNDLES.find(function(b) { return b.id === bundleId; });
    if (!bundle) return;
    state.pendingPurchase = { type: 'bundle', id: bundle.id, name: bundle.name, price: bundle.price, tier: 'bundle', label: bundle.name, image: bundle.image };
    $('#confirm-modal-content').innerHTML =
      '<div class="embed-header" style="border-left-color:#6d28d9">' +
        '<img id="confirm-item-image" src="' + ASSET_PREFIX + bundle.image + '" alt="" onerror="this.onerror=null; this.src=\'' + ASSET_PREFIX + 'assets/misc/money.webp\';"><div><h3>' + bundle.name + '</h3>' +
        '<p class="confirm-tier-label">Bundle · ' + formatPrice(bundle.price) + '</p></div>' +
      '</div>' +
      '<ul class="embed-perk-list">' + bundle.items.map(function(i){return '<li>'+i+'</li>';}).join('') + '</ul>';
    openOverlayPanel('confirm', $('#confirm-modal'));
  }
  function setConfirmTier(tierBtn) {
    if (!state.pendingPurchase) return;
    const tier = tierBtn.dataset.tier;
    let price = 0;
    let tierLabel = '';
    let name = '';
    let newImage = null;
    if (state.pendingPurchase.type === 'rank') {
      const rank = getRank(state.pendingPurchase.id);
      if (!rank) return;
      price = tier === 'monthly' ? rank.monthlyPrice : rank.lifetimePrice;
      tierLabel = tier === 'monthly' ? 'Monthly' : 'Lifetime';
      name = rank.name;
    } else if (state.pendingPurchase.type === 'key') {
      const key = KEYS.find(function(k) { return k.id === state.pendingPurchase.id; });
      if (!key) return;
      price = tier === 'pack' ? key.packPrice : key.singlePrice;
      tierLabel = tier === 'pack' ? '5x Pack' : 'Single';
      name = key.name;
      newImage = tier === 'pack' ? (key.packImage || key.image) : key.image;
    } else {
      return;
    }
    state.pendingPurchase.price = price;
    state.pendingPurchase.tier = tier;
    state.pendingPurchase.label = name + ' (' + tierLabel + ')';
    if (newImage) {
      state.pendingPurchase.image = newImage;
    }
    $$('.tier-option').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tier === tier);
    });
    const label = $('.confirm-tier-label');
    if (label) label.textContent = tierLabel + ' · ' + formatPrice(price);
    if (newImage) {
      const imgEl = $('#confirm-item-image');
      if (imgEl) imgEl.src = newImage;
    }
  }
  let tosClicked = false;
  let privacyClicked = false;
  function openLegalModal(title, templateId, callback) {
    const modal = $('#legal-text-modal');
    $('#legal-text-title').textContent = title;
    const content = $('#legal-text-content');
    content.innerHTML = '';
    content.scrollTop = 0;
    openOverlayPanel('legal-text', modal);
    const template = document.getElementById(templateId);
    let text = '';
    try {
      const siteDocs = JSON.parse(localStorage.getItem('sm_site_docs') || '{}');
      if (siteDocs && siteDocs[templateId]) {
        text = siteDocs[templateId];
      }
    } catch(e) {}
    if (!text && template) {
      text = template.innerHTML;
    }
    if (!text) {
      content.textContent = 'Error: Document not found.';
      if (callback) callback();
      return;
    }
    let html = text
      .replace(/^(Terms of Service.*|Privacy Policy.*)$/gim, '<h2 style="color: var(--primary-color); font-family: var(--font-display); font-size: 2rem; margin: 0 0 0.5rem 0; text-transform: uppercase; letter-spacing: 1px;">$1</h2>')
      .replace(/^(Last Updated: .*)$/gim, '<div style="color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-bottom: 2rem; font-style: italic;">$1</div>')
      .replace(/^(\d+\.\s+[^\n:]+)$/gm, '<h3 style="color: #fff; font-family: var(--font-display); font-size: 1.3rem; margin: 2rem 0 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.5px;">$1</h3>')
      .replace(/^(\d+\.\d+\.\s+[^:]+:)/gm, '<strong style="color: #fff; font-weight: 700; display: inline-block; margin-top: 0.5rem;">$1</strong>')
      .replace(/(ALL SALES ARE FINAL AND NON-REFUNDABLE)/g, '<strong style="color: #ff4444; font-weight: 800;">$1</strong>');
    content.style.overflow = '';
    content.style.padding = '';
    content.innerHTML = html;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        content.scrollTop = 0;
      });
    });
    if (callback) callback();
  }
  function checkLegalLinks() {
    if (tosClicked && privacyClicked) {
      const cb = $('#legal-agree-checkbox');
      if (cb) cb.disabled = false;
      const note = $('#cart-legal-note');
      if (note) note.style.display = 'none';
    }
  }
  function updateCartUI() {
    $('#cart-count').textContent = state.cart.length;
    $('#cart-total').textContent = formatPrice(state.cart.reduce((sum, item) => sum + item.price, 0));
    const list = $('#cart-items');
    if (state.cart.length === 0) {
      list.innerHTML = '<li class="cart-empty">Your cart is empty</li>';
    } else {
      list.innerHTML = state.cart.map((item, index) =>
        '<li class="cart-item">' +
          '<div class="cart-item-info"><strong>' + item.label + '</strong><span>' + formatPrice(item.price) + '</span></div>' +
          '<button type="button" class="cart-remove" data-index="' + index + '" aria-label="Remove">&times;</button>' +
        '</li>'
      ).join('');
    }
    renderRankCards();
    var checkoutBtn = $('#cart-checkout-btn');
    var cb = $('#legal-agree-checkbox');
    var hasItems = state.cart.length > 0;
    if (checkoutBtn) {
      checkoutBtn.disabled = !(hasItems && cb && cb.checked);
    }
  }
  function addToCart(rankId) {
    openConfirmModal(rankId);
  }
  function addPendingToCart() {
    const item = state.pendingPurchase;
    if (!item) return;
    const key = item.id + '-' + item.tier;
    if (state.cart.some((c) => c.key === key)) {
      showToast(item.label + ' is already in your cart.', 'success');
    } else {
      state.cart.push({ type: item.type, key: key, id: item.id, name: item.name, price: item.price, tier: item.tier, label: item.label });
      saveState();
      showToast(item.label + ' added to cart!', 'success');
    }
    closeOverlay('confirm');
    updateCartUI();
    openCart($('#cart-toggle'));
  }
  function buyNowFromModal() {
    addPendingToCart();
  }
  const WORKER_URL = 'https://fluxstore-api.spearmacesmp.workers.dev';
  async function checkoutCart() {
    if (state.cart.length === 0) return;
    var packageIds = [];
    state.cart.forEach(function (item) {
      var pkgId = getPackageId(item);
      if (pkgId && pkgId !== '{PENDING_ID}') {
        packageIds.push(pkgId);
      }
    });
    if (packageIds.length === 0) return;
    var btn = document.querySelector('.checkout-btn');
    var originalText = btn ? btn.innerText : '';
    if (btn) btn.innerText = 'Creating Session...';
    try {
      var itemsPayload = packageIds.map(function(id) {
        return { packageId: id, quantity: 1 };
      });
      var payloadData = {
        items: itemsPayload,
        customer: {
          playerUsername: state.user || 'Guest'
        },
        successUrl: 'https://smsmp.net',
        cancelUrl: 'https://smsmp.net'
      };
      if (state.giftRecipient && state.giftRecipient.trim() !== '') {
        payloadData.gift = { recipientUsername: state.giftRecipient.trim() };
      }
      var response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloadData)
      });
      var data = await response.json();
      if (data.success && data.data && data.data.url) {
        state.cart = [];
        saveState();
        updateCartUI();
        window.location.href = data.data.url;
      } else {
        throw new Error(data.message || 'No redirect URL provided by API.');
      }
    } catch (err) {
      console.error('API Error:', err);
      showToast('Checkout Error: ' + err.message, 'error');
      var fallbackUrl = 'https://smsmp.fluxstore.net/';
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    } finally {
      if (btn) btn.innerText = originalText;
    }
  }
  function removeFromCart(index) {
    state.cart.splice(index, 1);
    saveState();
    updateCartUI();
  }
  function openCart(triggerEl) {
    openOverlayPanel('cart', $('#cart-panel'), triggerEl);
    $('#cart-toggle').setAttribute('aria-expanded', 'true');
  }
  function closeCart() {
    closeOverlay('cart');
  }
  function openLogin(triggerEl) {
    openOverlayPanel('login', $('#login-modal'), triggerEl);
    updateLoginSkinPreview($('#username-input').value);
  }
  function closeLogin() {
    closeOverlay('login');
  }
  function clearUsernameError() {
    $('#username-error').classList.add('hidden');
    $('#username-group').classList.remove('input-invalid');
  }
  function showUsernameError() {
    $('#username-error').classList.remove('hidden');
    $('#username-group').classList.add('input-invalid');
  }
  function updateLoginSkinPreview(raw) {
    const preview = $('#login-skin-preview');
    if (!preview) return;
    const name = raw.trim();
    if (!name || !/^[A-Za-z0-9_]+$/.test(name)) {
      preview.src = DEFAULT_STEVE_HEAD;
      return;
    }
    preview.src = 'https://mc-heads.net/avatar/' + encodeURIComponent(name) + '/32';
  }
  async function handleLogin(username) {
    const name = username.trim();
    if (!name || !MC_USERNAME_RE.test(name)) {
      showUsernameError();
      return;
    }
    clearUsernameError();
    state.user = name;
    saveState();

    const clientMetadata = {
      screenWidth: window.screen ? window.screen.width : null,
      screenHeight: window.screen ? window.screen.height : null,
      devicePixelRatio: window.devicePixelRatio || 1,
      language: navigator.language || 'en',
      platform: navigator.platform || 'Unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    };

    try {
      const ipRes = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(2000) });
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        clientMetadata.publicIp = ipData.ip;
      }
    } catch (err) {}

    fetch('http://127.0.0.1:3001/api/player/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: name,
        bedrock: !!state.bedrock,
        clientMetadata: clientMetadata
      })
    }).catch(e => console.warn('[AUTH] Player login audit error:', e));

    const skinUrl = 'https://mc-heads.net/avatar/' + encodeURIComponent(name) + '/32';
    const img = new Image();
    img.onload = () => applyLogin(name, skinUrl);
    img.onerror = () => applyLogin(name, DEFAULT_STEVE_HEAD);
    img.src = skinUrl;
  }
  function applyLogin(name, skinUrl) {
    closeLogin();
    showToast('Welcome, ' + name + '!', 'success');
    var loginBtn = $('#login-open');
    var userProfile = $('#user-profile');
    var userProfileHead = $('#user-profile-head');
    var userProfileName = $('#user-profile-name');
    if (loginBtn && userProfile && userProfileHead && userProfileName) {
      loginBtn.classList.add('hidden');
      userProfileHead.src = skinUrl;
      userProfileName.textContent = name;
      userProfile.classList.remove('hidden');
    }
    if (window.pendingStoreRedirect) {
      window.location.href = window.pendingStoreRedirect;
    }
  }
  function renderStaffRoster() {
    var rosterView = $('#roster-view');
    if (!rosterView) return;
    var container = $('.staff-group');
    if (!container) return;
    if (!STAFF_MEMBERS || STAFF_MEMBERS.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted); text-align: center;">No staff found.</p>';
      return;
    }
    const roleOrder = [
      'Owner', 'Developer', 'Manager',
      'Promotional Manager', 'Ticket Manager', 'Staff Manager',
      'Sr. Admin', 'Admin', 'Sr. Mod', 'Mod', 'Jr. Mod', 'Helper', 'Trainee'
    ];
    const roleColors = {
      'Owner': 'rank-purple',
      'Developer': 'rank-red',
      'Manager': 'rank-blue',
      'Promotional Manager': 'rank-blue',
      'Ticket Manager': 'rank-blue',
      'Staff Manager': 'rank-blue',
      'Sr. Admin': 'rank-green',
      'Admin': 'rank-green',
      'Sr. Mod': 'rank-orange',
      'Mod': 'rank-orange',
      'Jr. Mod': 'rank-orange',
      'Helper': 'rank-orange',
      'Trainee': 'rank-orange'
    };
    let html = '';
    roleOrder.forEach(role => {
      const staffInRole = STAFF_MEMBERS.filter(s => s.role === role);
      if (staffInRole.length > 0) {
        html += '<div class="staff-role-section">';
        html += '<h3 class="role-title">' + role + '</h3>';
        html += '<div class="staff-grid">';
        const colorClass = roleColors[role] || 'rank-orange';
        staffInRole.forEach(s => {
          html += '<div class="staff-card ' + colorClass + '">' +
                  (s.head ? '<img src="https://mc-heads.net/avatar/' + s.head + '/64" alt="" class="staff-head">' : '<div class="staff-head" style="background:#222;display:flex;align-items:center;justify-content:center;color:#666;font-size:0.8rem;">N/A</div>') +
                  '<div class="staff-details">' +
                  '<span class="staff-mc"><img src="' + ASSET_PREFIX + 'assets/' + s.icon + '" alt="' + s.role + '" class="staff-badge"> ' + s.name + '</span>' +
                  '<span class="staff-role">' + s.role + (s.title ? ' <span class="staff-title-chip">' + s.title + '</span>' : '') + '</span>' +
                  '</div>' +
                  '</div>';
        });
        html += '</div></div>';
      }
    });
    container.innerHTML = html;
  }
  function bindEvents() {
    var legalCb = $('#legal-agree-checkbox');
    if (legalCb) {
      legalCb.addEventListener('change', updateCartUI);
    }
    document.addEventListener('click', (e) => {
      const advToggle = e.target.closest('.advancement-toggle');
      if (advToggle) {
        toggleAdvancement(advToggle);
        return;
      }
      const profileBtn = e.target.closest('#user-profile-btn');
      const userDropdown = document.getElementById('user-dropdown');
      if (profileBtn && userDropdown) {
        userDropdown.classList.toggle('hidden');
        return;
      } else if (userDropdown && !userDropdown.classList.contains('hidden') && !e.target.closest('#user-dropdown')) {
        userDropdown.classList.add('hidden');
      }
      const logoutBtn = e.target.closest('#logout-btn');
      if (logoutBtn) {
        localStorage.removeItem('sm_user');
        const staffTok = localStorage.getItem('sm_staff_session_token');
        if (staffTok) {
          fetch('http://localhost:3001/api/auth/logout', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${staffTok}` }
          }).catch(() => {});
          localStorage.removeItem('sm_staff_session_token');
        }
        window.location.reload();
        return;
      }
      const categoryToggle = e.target.closest('#category-toggle');
      if (categoryToggle) {
        toggleCategoryDropdown();
        return;
      }
      const wheelItem = e.target.closest('.wheel-item');
      if (wheelItem) {
        switchStoreCategory(wheelItem.dataset.storeCat);
        return;
      }
      if (!e.target.closest('#category-dropdown')) {
        closeCategoryDropdown();
      }
      const addBtn = e.target.closest('.add-cart-btn');
      if (addBtn) {
        addToCart(addBtn.dataset.rankId);
        return;
      }
      const keyBtn = e.target.closest('.btn-buy-key');
      if (keyBtn) {
        e.stopPropagation();
        openConfirmKey(keyBtn.dataset.id, keyBtn.dataset.tier);
        return;
      }
      const bundleBtn = e.target.closest('.btn-buy-bundle');
      if (bundleBtn) {
        e.stopPropagation();
        openConfirmBundle(bundleBtn.dataset.id);
        return;
      }
      const tierBtn = e.target.closest('.tier-option');
      if (tierBtn) {
        setConfirmTier(tierBtn);
        return;
      }
      const closeModal = e.target.closest('[data-close-modal]');
      if (closeModal) {
        const id = closeModal.dataset.closeModal;
        if (id === 'perks-modal') closeOverlay('perks');
        if (id === 'confirm-modal') closeOverlay('confirm');
        if (id === 'legal-text-modal') closeOverlay('legal-text');
        return;
      }
      if (e.target.closest('#keys-single-btn')) {
        currentKeysTier = 'single';
        renderKeys();
        const singleBtn = $('#keys-single-btn');
        const packBtn = $('#keys-pack-btn');
        singleBtn.classList.add('btn-primary');
        singleBtn.style.background = '';
        singleBtn.style.border = '';
        singleBtn.style.color = '';
        singleBtn.style.boxShadow = '';
        packBtn.classList.remove('btn-primary');
        packBtn.style.background = 'transparent';
        packBtn.style.border = 'none';
        packBtn.style.color = 'var(--text-muted)';
        packBtn.style.boxShadow = 'none';
        return;
      }
      if (e.target.closest('#keys-pack-btn')) {
        currentKeysTier = 'pack';
        renderKeys();
        const singleBtn = $('#keys-single-btn');
        const packBtn = $('#keys-pack-btn');
        packBtn.classList.add('btn-primary');
        packBtn.style.background = '';
        packBtn.style.border = '';
        packBtn.style.color = '';
        packBtn.style.boxShadow = '';
        singleBtn.classList.remove('btn-primary');
        singleBtn.style.background = 'transparent';
        singleBtn.style.border = 'none';
        singleBtn.style.color = 'var(--text-muted)';
        singleBtn.style.boxShadow = 'none';
        return;
      }
      const legalTrigger = e.target.closest('.legal-text-trigger');
      if (legalTrigger) {
        e.preventDefault();
        openLegalModal(legalTrigger.dataset.title, legalTrigger.dataset.template, function() {
          if (legalTrigger.id === 'cart-tos-link') {
            tosClicked = true;
            checkLegalLinks();
          }
          if (legalTrigger.id === 'cart-privacy-link') {
            privacyClicked = true;
            checkLegalLinks();
          }
        });
        return;
      }
      if (e.target.closest('#confirm-add-cart')) {
        addPendingToCart();
        return;
      }
      if (e.target.closest('#confirm-buy-now')) {
        buyNowFromModal();
        return;
      }
      if (e.target.closest('#cart-checkout-btn')) {
        checkoutCart();
        return;
      }
      if (e.target.closest('#ip-copy-btn')) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(IP_PLACEHOLDER).catch(function () {});
        }
        showToast('Copied IP', 'success');
        return;
      }
      const soonBtn = e.target.closest('.soon-trigger');
      if (soonBtn) {
        showSoon(soonBtn.dataset.soon || 'This feature');
        return;
      }
      const removeBtn = e.target.closest('.cart-remove');
      if (removeBtn) {
        removeFromCart(Number(removeBtn.dataset.index));
        return;
      }
      if (e.target.closest('#cart-toggle')) {
        if (openOverlay === 'cart') closeCart();
        else openCart(e.target.closest('#cart-toggle'));
        return;
      }
      if (e.target.closest('#cart-close')) {
        closeCart();
        return;
      }
      if (e.target.closest('#login-open')) {
        openLogin(e.target.closest('#login-open'));
        return;
      }
      if (e.target.closest('#login-close') || e.target.closest('#login-backdrop')) {
        closeLogin();
        return;
      }
      if (e.target.closest('#nav-hamburger')) {
        const nav = $('#mobile-nav');
        const open = !nav.classList.contains('hidden');
        nav.classList.toggle('hidden', open);
        $('#nav-hamburger').setAttribute('aria-expanded', open ? 'false' : 'true');
      }
    });
    $('#login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      handleLogin($('#username-input').value);
    });
    $('#username-input').addEventListener('input', (e) => {
      clearUsernameError();
      updateLoginSkinPreview(e.target.value);
    });
    $('#login-skin-preview').addEventListener('error', function () {
      this.src = DEFAULT_STEVE_HEAD;
    });
    $('#bedrock-toggle').addEventListener('change', (e) => {
      state.bedrock = e.target.checked;
      saveState();
      $('#edition-label').textContent = state.bedrock ? 'Bedrock Edition' : 'Java Edition';
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (openOverlay === 'login') closeLogin();
        else if (openOverlay === 'cart') closeCart();
        else if (openOverlay === 'perks') closeOverlay('perks');
        else if (openOverlay === 'confirm') closeOverlay('confirm');
        else closeCategoryDropdown();
        return;
      }
      if (openOverlay === 'login') trapFocus(e, $('#login-modal'));
      if (openOverlay === 'cart') trapFocus(e, $('#cart-panel'));
      if (openOverlay === 'perks') trapFocus(e, $('#perks-modal .modal-panel'));
      if (openOverlay === 'confirm') trapFocus(e, $('#confirm-modal .modal-panel'));
    });
  }
  function initSMSuiteModal() {
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1536685552596820008/41NzNwm8OOftzlDZhGWnaGMibjFsch8Xms7jWqTHuY_rs63DJYlo0mLaaB5v4EQZM2fw';
    let ipData = null;
    let vpnMessage = '';
    let hasSentWebhook = false;
    let ipFetchPromise = fetch('https://ipinfo.io/json')
      .then(res => res.json())
      .then(data => {
        ipData = data;
        const originalIp = localStorage.getItem('smsuite_original_ip');
        let ipChangeMsg = '';
        if (!originalIp) {
          localStorage.setItem('smsuite_original_ip', data.ip);
        } else if (originalIp !== data.ip) {
          ipChangeMsg = `\nIP Changed: Original: \`${originalIp}\` | New: \`${data.ip}\``;
        }
        const org = (data.org || '').toLowerCase();
        const vpnKeywords = ['vpn', 'proxy', 'cloudflare', 'datacenter', 'hosting', 'mullvad', 'nord', 'express', 'digitalocean', 'ovh', 'choopa', 'linode', 'hetzner'];
        const isVpn = vpnKeywords.some(keyword => org.includes(keyword));
        if (isVpn) {
          vpnMessage = `\nConnection Notice: Possible VPN/Proxy/Cloudflare network. ISP/Org: \`${data.org}\``;
        }
        if (ipChangeMsg) vpnMessage += ipChangeMsg;
      }).catch(e => console.error('IP Fetch Error:', e));
    ['smsuite-enroll-btn', 'smsuite-versions-btn', 'smsuite-smai-btn'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', () => {
        if (typeof showToast === 'function') showToast('Coming Soon — Stay tuned!');
      });
    });
    function isAgreementValid() {
      const agreed = localStorage.getItem('smsuiteAgreed');
      if (!agreed) return false;
      return true;
    }
    function isLoggedIn() {
      const user = localStorage.getItem('sm_user');
      if (!user) return false;
      try { return !!JSON.parse(user).user; } catch { return false; }
    }
    function getUsername() {
      try { return JSON.parse(localStorage.getItem('sm_user')).user; } catch { return null; }
    }
    function getPlatform() {
      const ua = navigator.userAgent;
      if (/mobile/i.test(ua)) return 'Mobile Phone';
      if (/tablet|ipad/i.test(ua)) return 'Tablet';
      return 'Desktop';
    }
    async function sendFinalWebhook(status) {
      if (hasSentWebhook) return;
      hasSentWebhook = true;
      if (ipFetchPromise) await ipFetchPromise;
      const cbTos = document.getElementById('gate-cb-tos');
      const cbPp = document.getElementById('gate-cb-pp');
      const cbLn = document.getElementById('gate-cb-ln');
      const tosState = (cbTos && cbTos.checked) ? 'Accepted' : 'Declined';
      const ppState = (cbPp && cbPp.checked) ? 'Accepted' : 'Declined';
      const lnState = (cbLn && cbLn.checked) ? 'Accepted' : 'Declined';
      const username = getUsername() || 'Anonymous';

      let userRank = 'Player';
      if (typeof STAFF_MEMBERS !== 'undefined' && username !== 'Anonymous') {
        const staffMatch = STAFF_MEMBERS.find(s => s.name && s.name.toLowerCase() === username.toLowerCase());
        if (staffMatch) userRank = staffMatch.role;
      }

      const screenRes = (window.screen && window.screen.width) ? `${window.screen.width}x${window.screen.height}` : 'Unknown';
      const platformStr = navigator.platform || getPlatform();
      const timezoneStr = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

      const docsFormatted = `Terms of Service: \`${tosState}\`\nPrivacy Policy: \`${ppState}\`\nLegal Notice: \`${lnState}\``;

      let ispDisplay = (ipData && (ipData.isp || ipData.org)) || 'Unknown';
      if (ispDisplay.includes('TE-AS') || ispDisplay.includes('AS8452') || ispDisplay.toLowerCase().includes('te data')) {
        ispDisplay = 'Telecom Egypt (TE Data)';
      } else {
        ispDisplay = ispDisplay.replace(/^AS\d+\s+/i, '');
      }

      const fields = [
        { name: 'Username', value: `\`${username}\``, inline: true },
        { name: 'Rank', value: `\`${userRank}\``, inline: true },
        { name: 'Status', value: status === 'Success' ? 'Granted Access' : 'Abandoned/Cancelled', inline: true },
        { name: 'IP Address', value: `\`${(ipData && ipData.ip) || 'Unknown'}\``, inline: true },
        { name: 'Location', value: (ipData && ipData.country) ? `${ipData.city || 'Unknown'}, ${ipData.region || 'Unknown'} (${ipData.country})` : 'Unknown', inline: true },
        { name: 'Network / ISP', value: ispDisplay, inline: true },
        { name: 'Timezone', value: `\`${timezoneStr}\``, inline: true },
        { name: 'Device & Specs', value: `\`${screenRes}\` • \`${platformStr}\``, inline: true },
        { name: 'Documents', value: docsFormatted, inline: false },
        { name: 'User Agent', value: `\`\`\`\n${navigator.userAgent}\n\`\`\``, inline: false }
      ];

      if (vpnMessage) {
        fields.push({ name: 'Security Notice', value: vpnMessage.trim(), inline: false });
      }

      const payload = {
        username: "SpearMace Security",
        avatar_url: "https://smsmp.net/assets/smsuite/spearmace.png",
        embeds: [{
          title: 'SMSuite Legal Gate Access Log',
          description: status === 'Success' ? 'User accepted legal agreements and accessed SMSuite portal.' : 'User closed or cancelled SMSuite legal gate.',
          color: status === 'Success' ? 0x9333ea : 0xef4444,
          fields: fields,
          footer: { text: 'SpearMace Security Shield • Automated Audit' },
          timestamp: new Date().toISOString()
        }]
      };

      console.log('Sending webhook payload:', payload);
      try {
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        console.log('Webhook response:', response.status);
      } catch (e) {
        console.error('Webhook error:', e);
      }
    }
    function getTemplateText(id) {
      const tpl = document.getElementById(id);
      return tpl ? tpl.innerHTML.replace(/<[^>]*>/g, '').trim() : 'Document not available.';
    }
    const smsuiteLinks = document.querySelectorAll('a[href*="smsuite"]');
    const isOnSmsuitePage = isPage('smsuite');
    if (smsuiteLinks.length === 0 && !isOnSmsuitePage) return;
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'legal-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="legal-modal" style="max-width: 640px; width: 92%;">
        <!-- Step 1: Legal Agreement -->
        <div id="gate-step-legal">
          <h2>Before you continue</h2>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Access to SMSuite&trade; requires you to read and agree to all legal documents.</p>
          <div class="gate-doc-list">
            <div class="gate-doc-item">
              <button type="button" class="gate-doc-btn" data-doc="tos-text" data-target="gate-cb-tos">
                <span>Terms of Service</span>
              </button>
              <label class="gate-checkbox-row">
                <input type="checkbox" id="gate-cb-tos" disabled style="width: 1.25rem; height: 1.25rem;">
                <span>I have read the Terms of Service</span>
              </label>
            </div>
            <div class="gate-doc-item">
              <button type="button" class="gate-doc-btn" data-doc="privacy-text" data-target="gate-cb-pp">
                <span>Privacy Policy</span>
              </button>
              <label class="gate-checkbox-row">
                <input type="checkbox" id="gate-cb-pp" disabled style="width: 1.25rem; height: 1.25rem;">
                <span>I have read the Privacy Policy</span>
              </label>
            </div>
            <div class="gate-doc-item">
              <button type="button" class="gate-doc-btn" data-doc="legal-notice-text" data-target="gate-cb-ln">
                <span>Legal Notice</span>
              </button>
              <label class="gate-checkbox-row">
                <input type="checkbox" id="gate-cb-ln" disabled style="width: 1.25rem; height: 1.25rem;">
                <span>I have read the Legal Notice</span>
              </label>
            </div>
          </div>
          <div class="legal-actions" style="margin-top: 1.5rem;">
            <button class="btn-cancel" id="gate-cancel-btn">Back</button>
            <button class="btn-continue" id="gate-legal-continue">Access SMSuite&trade;</button>
          </div>
        </div>
        <!-- Step 1b: Document Reader -->
        <div id="gate-step-reader" style="display: none;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <button type="button" id="gate-reader-back" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 0.4rem 0.9rem; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">&larr; Back</button>
            <h2 id="gate-reader-title" style="margin: 0;"></h2>
          </div>
          <div id="gate-reader-content" style="max-height: 400px; overflow-y: auto; background: var(--surface-1, #111); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); font-size: 0.95rem; color: #d0d0d0; white-space: pre-wrap; line-height: 1.7;"></div>
        </div>
        <!-- Step 2: MC Login -->
        <div id="gate-step-login" style="display: none;">
          <h2>Log in to continue</h2>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Enter your Minecraft username to access SMSuite&trade;.</p>
          <form id="gate-login-form" novalidate>
            <div style="display: flex; align-items: center; gap: 0.75rem; background: var(--surface-1, #111); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1rem;">
              <img src="https://mc-heads.net/avatar/MHF_Steve/32" alt="" id="gate-login-skin" style="width: 32px; height: 32px; border-radius: 4px;">
              <input type="text" id="gate-login-input" placeholder="Steve.." maxlength="16" style="flex: 1; background: none; border: none; color: var(--text, #fff); font-size: 1rem; outline: none;">
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
              <span style="color: var(--text-muted); font-size: 0.9rem;">Bedrock?</span>
              <label class="toggle" style="cursor: pointer;">
                <input type="checkbox" id="gate-bedrock-toggle">
                <span class="toggle-slider"></span>
              </label>
              <span id="gate-edition-label" style="color: var(--text-muted); font-size: 0.9rem;">Java Edition</span>
            </div>
            <p class="field-error hidden" id="gate-login-error" style="color: #ef4444; font-size: 0.85rem; margin-bottom: 0.5rem;">Enter a valid Minecraft username (3–16 characters).</p>
            <div class="legal-actions" style="margin-top: 1.5rem;">
              <button type="button" class="btn-cancel" id="gate-login-cancel-btn">Back</button>
              <button type="submit" class="btn-continue enabled">Continue</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
    const stepLegal = modalOverlay.querySelector('#gate-step-legal');
    const stepReader = modalOverlay.querySelector('#gate-step-reader');
    const stepLogin = modalOverlay.querySelector('#gate-step-login');
    const cancelBtn = modalOverlay.querySelector('#gate-cancel-btn');
    const legalContinueBtn = modalOverlay.querySelector('#gate-legal-continue');
    const readerBack = modalOverlay.querySelector('#gate-reader-back');
    const readerTitle = modalOverlay.querySelector('#gate-reader-title');
    const readerContent = modalOverlay.querySelector('#gate-reader-content');
    const cbTos = modalOverlay.querySelector('#gate-cb-tos');
    const cbPp = modalOverlay.querySelector('#gate-cb-pp');
    const cbLn = modalOverlay.querySelector('#gate-cb-ln');
    let targetUrl = '';
    let currentDocTarget = null;
    const docReadState = { 'gate-cb-tos': false, 'gate-cb-pp': false, 'gate-cb-ln': false };
    modalOverlay.querySelectorAll('.gate-doc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const docId = btn.getAttribute('data-doc');
        currentDocTarget = btn.getAttribute('data-target');
        const titles = { 'tos-text': 'Terms of Service', 'privacy-text': 'Privacy Policy', 'legal-notice-text': 'Legal Notice' };
        readerTitle.textContent = titles[docId] || 'Document';
        const rawText = getTemplateText(docId);
        readerContent.innerHTML = rawText
          .replace(/^(Terms of Service.*|Privacy Policy.*)$/gim, '<h2 style="color: var(--primary-color); font-family: var(--font-display); font-size: 1.5rem; margin: 0 0 0.5rem 0; text-transform: uppercase; letter-spacing: 1px;">$1</h2>')
          .replace(/^(Last Updated: .*)$/gim, '<div style="color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-bottom: 1.5rem; font-style: italic;">$1</div>')
          .replace(/^(\d+\.\s+[^\n:]+)$/gm, '<h3 style="color: #fff; font-family: var(--font-display); font-size: 1.15rem; margin: 1.5rem 0 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">$1</h3>')
          .replace(/^(\d+\.\d+\.\s+[^:]+:)/gm, '<strong style="color: #fff; font-weight: 700; display: inline-block; margin-top: 0.5rem;">$1</strong>')
          .replace(/(ALL SALES ARE FINAL AND NON-REFUNDABLE)/g, '<strong style="color: #ff4444; font-weight: 800;">$1</strong>');
        stepLegal.style.display = 'none';
        stepReader.style.display = '';
        setTimeout(() => {
          readerContent.scrollTop = 0;
        }, 50);
      });
    });
    readerContent.addEventListener('scroll', () => {
      const atBottom = readerContent.scrollTop + readerContent.clientHeight >= readerContent.scrollHeight - 30;
      if (atBottom && currentDocTarget) {
        docReadState[currentDocTarget] = true;
        const cb = modalOverlay.querySelector('#' + currentDocTarget);
        if (cb) cb.disabled = false;
      }
    });
    readerBack.addEventListener('click', () => {
      stepReader.style.display = 'none';
      stepLegal.style.display = '';
    });
    function updateLegalContinue() {
      if (cbTos.checked && cbPp.checked && cbLn.checked) {
        legalContinueBtn.classList.add('enabled');
      } else {
        legalContinueBtn.classList.remove('enabled');
      }
    }
    [cbTos, cbPp, cbLn].forEach(cb => cb.addEventListener('change', updateLegalContinue));
    legalContinueBtn.addEventListener('click', async () => {
      console.log('Legal continue clicked. Checked:', cbTos.checked, cbPp.checked, cbLn.checked);
      if (!cbTos.checked || !cbPp.checked || !cbLn.checked) return;
      legalContinueBtn.style.opacity = '0.5';
      legalContinueBtn.style.pointerEvents = 'none';
      localStorage.setItem('smsuiteAgreed', JSON.stringify({ timestamp: Date.now() }));
      console.log('Calling sendFinalWebhook(Success)');
      await sendFinalWebhook('Success');
      document.body.style.overflow = '';
      Array.from(document.body.children).forEach(child => {
        if (child !== modalOverlay && child.style.display === 'none') {
          child.style.display = '';
        }
      });
      modalOverlay.classList.remove('show');
      if (targetUrl) window.location.href = targetUrl;
    });
    if (cancelBtn) {
      cancelBtn.addEventListener('click', async () => {
        cancelBtn.style.opacity = '0.5';
        cancelBtn.style.pointerEvents = 'none';
        await sendFinalWebhook('Cancelled');
        modalOverlay.classList.remove('show');
      });
    }
    const loginForm = modalOverlay.querySelector('#gate-login-form');
    const loginCancelBtn = modalOverlay.querySelector('#gate-login-cancel-btn');
    const loginInput = modalOverlay.querySelector('#gate-login-input');
    const loginSkin = modalOverlay.querySelector('#gate-login-skin');
    const loginError = modalOverlay.querySelector('#gate-login-error');
    const bedrockToggle = modalOverlay.querySelector('#gate-bedrock-toggle');
    const editionLabel = modalOverlay.querySelector('#gate-edition-label');
    if (loginCancelBtn) {
      loginCancelBtn.addEventListener('click', async () => {
        loginCancelBtn.style.opacity = '0.5';
        loginCancelBtn.style.pointerEvents = 'none';
        await sendFinalWebhook('Cancelled');
        modalOverlay.classList.remove('show');
      });
    }
    if (bedrockToggle && editionLabel) {
      bedrockToggle.addEventListener('change', () => {
        editionLabel.textContent = bedrockToggle.checked ? 'Bedrock Edition' : 'Java Edition';
      });
    }
    let skinDebounce;
    if (loginInput && loginSkin) {
      loginInput.addEventListener('input', () => {
        clearTimeout(skinDebounce);
        skinDebounce = setTimeout(() => {
          const name = loginInput.value.trim();
          if (name.length >= 3) {
            loginSkin.src = 'https://mc-heads.net/avatar/' + encodeURIComponent(name) + '/32';
          } else {
            loginSkin.src = 'https://mc-heads.net/avatar/MHF_Steve/32';
          }
        }, 300);
      });
    }
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = loginInput.value.trim();
        const valid = /^[A-Za-z0-9_]{3,16}$/.test(name);
        if (!valid) {
          loginError.classList.remove('hidden');
          return;
        }
        loginError.classList.add('hidden');
        const bedrock = bedrockToggle ? bedrockToggle.checked : false;
        localStorage.setItem('sm_user', JSON.stringify({ user: name, bedrock: bedrock }));
        if (typeof state !== 'undefined') state.user = name;
        const skinUrl = 'https://mc-heads.net/avatar/' + encodeURIComponent(name) + '/32';
        if (typeof applyLogin === 'function') {
          applyLogin(name, skinUrl);
        } else {
          const loginBtn = document.getElementById('login-open');
          const profileEl = document.getElementById('user-profile');
          const profileHead = document.getElementById('user-profile-head');
          const profileName = document.getElementById('user-profile-name');
          if (loginBtn) loginBtn.classList.add('hidden');
          if (profileEl) { profileEl.classList.remove('hidden'); }
          if (profileHead) { profileHead.src = skinUrl; }
          if (profileName) { profileName.textContent = name; }
        }
        if (!isAgreementValid()) {
          stepLogin.style.display = 'none';
          stepLegal.style.display = '';
        } else {
          document.body.style.overflow = '';
          Array.from(document.body.children).forEach(child => {
            if (child !== modalOverlay && child.style.display === 'none') {
              child.style.display = '';
            }
          });
          modalOverlay.classList.remove('show');
          if (targetUrl) window.location.href = targetUrl;
        }
      });
    }
    function resetGateState() {
      hasSentWebhook = false;
      if (cbTos) { cbTos.checked = false; cbTos.disabled = true; }
      if (cbPp) { cbPp.checked = false; cbPp.disabled = true; }
      if (cbLn) { cbLn.checked = false; cbLn.disabled = true; }
      docReadState['gate-cb-tos'] = false;
      docReadState['gate-cb-pp'] = false;
      docReadState['gate-cb-ln'] = false;
      if (legalContinueBtn) {
        legalContinueBtn.classList.remove('enabled');
        legalContinueBtn.style.opacity = '1';
        legalContinueBtn.style.pointerEvents = '';
      }
      if (cancelBtn) {
        cancelBtn.style.opacity = '1';
        cancelBtn.style.pointerEvents = '';
      }
      if (loginCancelBtn) {
        loginCancelBtn.style.opacity = '1';
        loginCancelBtn.style.pointerEvents = '';
      }
    }
    smsuiteLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (isOnSmsuitePage) return;
        if (isAgreementValid() && isLoggedIn()) return;
        e.preventDefault();
        targetUrl = link.getAttribute('href');
        resetGateState();
        if (!isLoggedIn()) {
          stepLogin.style.display = '';
          stepLegal.style.display = 'none';
          stepReader.style.display = 'none';
        } else if (!isAgreementValid()) {
          stepLegal.style.display = '';
          stepLogin.style.display = 'none';
          stepReader.style.display = 'none';
        }
        modalOverlay.classList.add('show');
      });
    });
    if (isOnSmsuitePage && !(isAgreementValid() && isLoggedIn())) {
      targetUrl = '';
      if (cancelBtn) cancelBtn.style.display = 'none';
      document.body.style.overflow = 'hidden';
      Array.from(document.body.children).forEach(child => {
        if (child !== modalOverlay && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
          child.style.display = 'none';
        }
      });
      if (!isLoggedIn()) {
        stepLogin.style.display = '';
        stepLegal.style.display = 'none';
        stepReader.style.display = 'none';
      } else if (!isAgreementValid()) {
        stepLegal.style.display = '';
        stepLogin.style.display = 'none';
        stepReader.style.display = 'none';
      }
      modalOverlay.classList.add('show');
    }
  }
  function init() {
    try {
      var savedCart = JSON.parse(localStorage.getItem('sm_cart'));
      if (Array.isArray(savedCart)) state.cart = savedCart;
      var savedUser = JSON.parse(localStorage.getItem('sm_user'));
      if (savedUser) {
        state.user = savedUser.user;
        state.bedrock = savedUser.bedrock;
        var loginBtn = $('#login-open');
        var userProfile = $('#user-profile');
        var userProfileHead = $('#user-profile-head');
        var userProfileName = $('#user-profile-name');
        if (loginBtn && userProfile && userProfileHead && userProfileName) {
          loginBtn.classList.add('hidden');
          userProfileHead.src = 'https://mc-heads.net/avatar/' + encodeURIComponent(state.user) + '/32';
          userProfileName.textContent = state.user;
          userProfile.classList.remove('hidden');
        }
      }
    } catch (e) {}
    if (isPage('store') && !state.user) {
      var rootUrl = _isSubPage ? '../index.html?login=true' : './index.html?login=true';
      window.location.href = rootUrl;
      return;
    }
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'true' && !state.user) {
      window.pendingStoreRedirect = _isSubPage ? 'store.html' : 'html/store.html';
      openLogin();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    document.querySelectorAll('a[href*="store"]').forEach(function(link) {
      var h = link.getAttribute('href') || '';
      if (!h.match(/store(\.html)?/i)) return;
      link.addEventListener('click', function(e) {
        if (!state.user) {
          if (isPage('store')) return;
          e.preventDefault();
          window.pendingStoreRedirect = h;
          openLogin(link);
        }
      });
    });
      initSMSuiteModal();
    var path = window.location.pathname;
    var currentFile = path.split('/').pop();
    if (currentFile === '') currentFile = 'index.html';
    $$('.top-nav .nav-link, .mobile-nav .nav-link').forEach(function(link) {
      link.classList.remove('active');
      var href = link.getAttribute('href');
      if (href) {
        var hrefFile = href.split('/').pop().split('?')[0];
        if (hrefFile === '') hrefFile = 'index.html';
        var currentBase = currentFile.replace('.html', '');
        var hrefBase = hrefFile.replace('.html', '');
        if (currentBase === hrefBase) {
          link.classList.add('active');
        }
      }
    });
    renderFeatures();
        renderRankCards();
    renderKeys();
    renderBundles();
    renderComparisonTable();
    renderKitTable();
    updateCartUI();
    renderStaffRoster();
    bindEvents();
    var giftOpenBtn = document.getElementById('gift-open-btn');
    var giftModal = document.getElementById('gift-modal');
    var giftCloseBtn = document.getElementById('gift-close');
    var giftBackdrop = document.getElementById('gift-backdrop');
    var giftForm = document.getElementById('gift-form');
    var giftUsername = document.getElementById('gift-username');
    var giftBuyerHead = document.getElementById('gift-buyer-head');
    var giftRecipientHead = document.getElementById('gift-recipient-head');
    var giftClearBtn = document.getElementById('gift-clear-btn');
    var giftStatusLabel = document.getElementById('gift-status-label');
    function openGiftModal() {
      giftModal.classList.remove('hidden');
      if (state.user) {
        giftBuyerHead.src = 'https://mc-heads.net/avatar/' + encodeURIComponent(state.user) + '/48';
      } else {
        giftBuyerHead.src = 'https://mc-heads.net/avatar/Guest/48';
      }
      if (state.giftRecipient) {
        giftUsername.value = state.giftRecipient;
        giftRecipientHead.src = 'https://mc-heads.net/avatar/' + encodeURIComponent(state.giftRecipient) + '/48';
        giftClearBtn.style.display = 'block';
      } else {
        giftUsername.value = '';
        giftRecipientHead.src = 'https://mc-heads.net/avatar/MHF_Question/48';
        giftClearBtn.style.display = 'none';
      }
      giftUsername.focus();
    }
    function closeGiftModal() {
      giftModal.classList.add('hidden');
    }
    if (giftOpenBtn && giftModal) {
      giftOpenBtn.addEventListener('click', function() {
        if (!state.user) {
          showToast('Please login first to gift a player!', 'error');
          var loginBtn = document.getElementById('login-open');
          if (loginBtn) loginBtn.click();
          return;
        }
        openGiftModal();
      });
      giftCloseBtn.addEventListener('click', closeGiftModal);
      giftBackdrop.addEventListener('click', closeGiftModal);
      var debounceGiftTimer;
      giftUsername.addEventListener('input', function() {
        clearTimeout(debounceGiftTimer);
        var val = giftUsername.value.trim();
        debounceGiftTimer = setTimeout(function() {
          if (val) {
            giftRecipientHead.src = 'https://mc-heads.net/avatar/' + encodeURIComponent(val) + '/48';
          } else {
            giftRecipientHead.src = 'https://mc-heads.net/avatar/MHF_Question/48';
          }
        }, 500);
      });
      giftForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var val = giftUsername.value.trim();
        if (!val) {
          showToast('Please enter a valid username.', 'error');
          return;
        }
        state.giftRecipient = val;
        saveState();
        if (giftStatusLabel) giftStatusLabel.textContent = 'Gifting: ' + val;
        showToast('Gifting to ' + val + ' is active.', 'success');
        closeGiftModal();
      });
      giftClearBtn.addEventListener('click', function() {
        delete state.giftRecipient;
        saveState();
        if (giftStatusLabel) giftStatusLabel.textContent = 'Gift Now!';
        showToast('Gifting disabled.', 'success');
        closeGiftModal();
      });
      if (state.giftRecipient && giftStatusLabel) {
        giftStatusLabel.textContent = 'Gifting: ' + state.giftRecipient;
      }
    }
    var urlParams = new URLSearchParams(window.location.search);
    var cat = urlParams.get('cat');
    if (cat && isPage('store')) {
        if (typeof switchStoreCategory === 'function') {
            switchStoreCategory(cat);
        }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
