(function () {
  'use strict';

  const ASSET_PREFIX = window.location.pathname.includes('/html/') ? '../' : '';

  const state = {
    view: 'home',
    storeCategory: 'ranks',
    cart: [],
    user: null,
    bedrock: false,
    activeTableTab: 'overview',
    pendingPurchase: null,
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
    const toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' ' + type : '');
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

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
    table.querySelector('thead').innerHTML =
      '<tr><th>Feature</th>' + RANKS.map(function (r) {
        return '<th class="' + rankColClass(r) + '">' + r.name + '</th>';
      }).join('') + '</tr>';

    table.querySelector('tbody').innerHTML = COMPARISON_ROWS.map(function (row) {
      return '<tr><td>' + row.label + '</td>' + row.values.map(function (val, i) {
        return '<td class="' + rankColClass(RANKS[i]) + '">' + val + '</td>';
      }).join('') + '</tr>';
    }).join('');
  }

  function renderKitTable() {
    const table = $('#kit-table');
    if (!table) return;
    table.querySelector('thead').innerHTML =
      '<tr><th>Command / Feature</th>' + RANKS.map(function (r) {
        return '<th class="' + rankColClass(r) + '">' + r.name + '</th>';
      }).join('') + '</tr>';

    table.querySelector('tbody').innerHTML = KIT_PERKS.map(function (row) {
      return '<tr><td>' + row.label + '</td>' + row.values.map(function (val, i) {
        return '<td class="' + rankColClass(RANKS[i]) + '">' +
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

    // Wipe old content and scroll BEFORE opening so browser has nothing to anchor to
    content.innerHTML = '';
    content.scrollTop = 0;

    openOverlayPanel('legal-text', modal);

    const template = document.getElementById(templateId);
    let text = template ? template.innerHTML : '';
    if (!text) {
      content.textContent = 'Error: Document not found.';
      if (callback) callback();
      return;
    }

    let html = text
      .replace(/^(Terms of Service.*|Privacy Policy.*)$/gim, '<h2 style="color: var(--primary-color); font-family: var(--font-display); font-size: 2rem; margin: 0 0 0.5rem 0; text-transform: uppercase; letter-spacing: 1px;">$1</h2>')
      .replace(/^(Last Updated: .*)$/gim, '<div style="color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-bottom: 2rem; font-style: italic;">$1</div>')
      .replace(/^(\d+\.\s+[A-Z\s]+)$/gm, '<h3 style="color: #fff; font-family: var(--font-display); font-size: 1.3rem; margin: 2rem 0 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">$1</h3>')
      .replace(/(ALL SALES ARE FINAL AND NON-REFUNDABLE)/g, '<strong style="color: #ff4444; font-weight: 800;">$1</strong>');

    content.style.overflow = '';
    content.style.padding = '';
    content.innerHTML = html;

    // Reset scroll again after content injection, using double rAF to guarantee browser has painted
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

      var response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: itemsPayload,
          customer: {
            playerUsername: state.user || 'Guest'
          },
          successUrl: 'https://smsmp.net',
          cancelUrl: 'https://smsmp.net'
        })
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
      
      // Clear the cart when proceeding to fallback checkout
      state.cart = [];
      saveState();
      updateCartUI();
      
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

  function handleLogin(username) {
    const name = username.trim();
    if (!name || !MC_USERNAME_RE.test(name)) {
      showUsernameError();
      return;
    }
    clearUsernameError();
    state.user = name;
    saveState();
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
                  '<img src="https://mc-heads.net/avatar/' + s.head + '/64" alt="" class="staff-head">' +
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
    const smsuiteLinks = document.querySelectorAll('a[href*="smsuite"]');
    if (smsuiteLinks.length === 0 && !window.location.pathname.includes('smsuite')) return;
    
    // Create Modal HTML
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'legal-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="legal-modal">
        <h2>Before you continue</h2>
        <p>Access to SMSuite&trade; requires you to read and agree to our legal agreements.</p>
        
        <div class="legal-links">
          <a href="#" target="_blank">Terms of Service</a>
          <a href="#" target="_blank">Privacy Policy</a>
          <a href="#" target="_blank">Legal Notice</a>
        </div>
        
        <label class="legal-checkbox-group">
          <input type="checkbox" id="legal-agree-checkbox">
          <span>I have read and agree to the Terms of Service, Privacy Policy, and Legal Notice.</span>
        </label>
        
        <div class="legal-actions">
          <button class="btn-cancel" id="legal-cancel-btn">Cancel</button>
          <button class="btn-continue" id="legal-continue-btn">Continue</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    const checkbox = modalOverlay.querySelector('#legal-agree-checkbox');
    const continueBtn = modalOverlay.querySelector('#legal-continue-btn');
    const cancelBtn = modalOverlay.querySelector('#legal-cancel-btn');
    
    let targetUrl = '';
    
    // Enable/Disable continue button based on checkbox
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        continueBtn.classList.add('enabled');
      } else {
        continueBtn.classList.remove('enabled');
      }
    });
    
    // Cancel closes modal
    cancelBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('show');
      checkbox.checked = false;
      continueBtn.classList.remove('enabled');
    });
    
    // Continue navigates
    continueBtn.addEventListener('click', () => {
      if (checkbox.checked) {
        localStorage.setItem('smsuiteAgreed', 'true');
        modalOverlay.classList.remove('show');
        if (targetUrl) {
          window.location.href = targetUrl;
        }
      }
    });
    
    // Intercept clicks
    smsuiteLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.location.pathname.includes('smsuite')) return;
        if (localStorage.getItem('smsuiteAgreed') === 'true') return;
        
        e.preventDefault();
        targetUrl = link.getAttribute('href');
        modalOverlay.classList.add('show');
      });
    });

    // Check if directly loaded without agreement
    if (window.location.pathname.includes('smsuite') && localStorage.getItem('smsuiteAgreed') !== 'true') {
      targetUrl = '';
      modalOverlay.classList.add('show');
      if (cancelBtn) cancelBtn.style.display = 'none';
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
    // Force login on store page direct navigation
    if (window.location.pathname.includes('store.html') && !state.user) {
      window.location.href = '../index.html?login=true';
      return;
    }

    // Handle redirect back from store page
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'true' && !state.user) {
      window.pendingStoreRedirect = 'html/store.html';
      openLogin();
      // Remove query param without refreshing
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Intercept store links
    document.querySelectorAll('a[href*="store.html"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        if (!state.user) {
          if (window.location.pathname.includes('store.html')) return;
          e.preventDefault();
          window.pendingStoreRedirect = link.getAttribute('href');
          openLogin(link);
        }
      });
    });

      initSMSuiteModal();


    var path = window.location.pathname;
    var currentFile = path.split('/').pop();
    if (currentFile === '') currentFile = 'index.html'; // Root path defaults to index.html
    
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

    var urlParams = new URLSearchParams(window.location.search);
    var cat = urlParams.get('cat');
    if (cat && window.location.pathname.includes('store.html')) {
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

