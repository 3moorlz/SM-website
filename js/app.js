(function () {
  'use strict';

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

  function getRank(id) {
    return RANKS.find(function (r) { return r.id === id; });
  }

  function getPackageId(item) {
    var rank = getRank(item.id);
    if (rank) return item.tier === 'monthly' ? rank.monthlyPackageId : rank.lifetimePackageId;
    
    var key = KEYS.find(function(k) { return k.id === item.id; });
    if (key) return item.tier === 'pack' ? key.packId : key.singleId;
    
    var bundle = BUNDLES.find(function(b) { return b.id === item.id; });
    if (bundle) return bundle.packageId;
    
    return null;
  }

  function rankColClass(rank) {
    return rank.id === 'immortal' ? 'col-immortal' : '';
  }

  function rankCartLabel(rank, inCart) {
    if (inCart) return '✓ In Cart';
    if (rank.monthlyPrice) return 'View Options';
    return '🛒 Add to Cart';
  }

  function formatPrice(amount) {
    return '$' + amount.toFixed(2);
  }

  function showToast(message, type) {
    const container = $('#toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast' + (type === 'success' ? ' success' : '');
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
    if (openOverlay && openOverlay !== id) closeOverlay(openOverlay);
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
    }
    if (openOverlay === id) unlockPage();
  }

  function renderFeatures() {
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
    $('#rank-cards').innerHTML = RANKS.map(function (rank) {
      const inCart = state.cart.some(function (item) { return item.id === rank.id; });
      const featured = rank.id === 'immortal';
      return (
        '<article class="rank-card' + (featured ? ' rank-featured' : '') + '" style="--rank-accent:' + rank.accent + ';--rank-glow:' + rank.accentGlow + '">' +
          (featured ? '<span class="rank-tier-badge">Top Tier</span>' : '') +
          '<div class="rank-card-header">' +
            '<img src="' + rank.badge + '" alt="' + rank.name + ' rank badge" class="rank-badge">' +
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

  function renderKeys() {
    let html = KEYS.map(function(key) {
      return (
        '<article class="key-card">' +
          '<img src="' + key.image + '" alt="" class="key-card-icon" onerror="this.src=\'assets/key.webp\'">' +
          '<h3>' + key.name + '</h3>' +
          '<div class="key-prices" style="display:flex; gap:0.5rem; margin-top:auto; flex-direction:column;">' +
            '<button type="button" class="btn btn-primary btn-sm btn-buy-key" data-id="' + key.id + '" data-pack="single">1x - $' + key.singlePrice.toFixed(2) + '</button>' +
            '<button type="button" class="btn btn-secondary btn-sm btn-buy-key" data-id="' + key.id + '" data-pack="pack">5x - $' + key.packPrice.toFixed(2) + ' <small>(' + key.saveText + ')</small></button>' +
          '</div>' +
        '</article>'
      );
    }).join('');
    $('#keys-grid').innerHTML = html;
  }

  function renderBundles() {
    let html = BUNDLES.map(function(bundle) {
      return (
        '<article class="key-card">' +
          '<img src="' + bundle.image + '" alt="" class="key-card-icon" onerror="this.src=\'assets/money.webp\'">' +
          '<h3>' + bundle.name + '</h3>' +
          '<p class="key-card-slot">' + bundle.value + '</p>' +
          '<ul class="bundle-items">' + bundle.items.map(function(i) { return '<li>' + i + '</li>'; }).join('') + '</ul>' +
          '<button type="button" class="btn btn-primary btn-sm btn-buy-bundle" style="margin-top:auto;" data-id="' + bundle.id + '">Buy - $' + bundle.price.toFixed(2) + '</button>' +
        '</article>'
      );
    }).join('');
    $('#bundles-grid').innerHTML = html;
  }

  function renderComparisonTable() {
    const table = $('#comparison-table');
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
        '<img src="' + rank.badge + '" alt=""><div><h3>' + rank.name + '</h3>' +
        '<p class="confirm-tier-label">' + defaultLabel + ' · ' + formatPrice(defaultPrice) + '</p></div>' +
      '</div>' +
      tierPicker +
      '<ul class="embed-perk-list">' + rank.perks.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>';
    openOverlayPanel('confirm', $('#confirm-modal'));
  }

  function openConfirmKey(keyId, packType) {
    const key = KEYS.find(function(k) { return k.id === keyId; });
    if (!key) return;
    const isPack = packType === 'pack';
    const price = isPack ? key.packPrice : key.singlePrice;
    const label = key.name + (isPack ? ' (5x)' : '');
    
    state.pendingPurchase = { id: key.id, name: key.name, price: price, tier: packType, label: label };
    
    $('#confirm-modal-content').innerHTML =
      '<div class="embed-header" style="border-left-color:#6d28d9">' +
        '<img src="' + key.image + '" alt="" onerror="this.src=\'assets/key.webp\'"><div><h3>' + key.name + '</h3>' +
        '<p class="confirm-tier-label">' + label + ' · ' + formatPrice(price) + '</p></div>' +
      '</div>';
    openOverlayPanel('confirm', $('#confirm-modal'));
  }

  function openConfirmBundle(bundleId) {
    const bundle = BUNDLES.find(function(b) { return b.id === bundleId; });
    if (!bundle) return;
    
    state.pendingPurchase = { id: bundle.id, name: bundle.name, price: bundle.price, tier: 'bundle', label: bundle.name };
    
    $('#confirm-modal-content').innerHTML =
      '<div class="embed-header" style="border-left-color:#6d28d9">' +
        '<img src="' + bundle.image + '" alt="" onerror="this.src=\'assets/money.webp\'"><div><h3>' + bundle.name + '</h3>' +
        '<p class="confirm-tier-label">Bundle · ' + formatPrice(bundle.price) + '</p></div>' +
      '</div>' +
      '<ul class="embed-perk-list">' + bundle.items.map(function(i){return '<li>'+i+'</li>';}).join('') + '</ul>';
    openOverlayPanel('confirm', $('#confirm-modal'));
  }

  function setConfirmTier(tierBtn) {
    const rank = getRank(state.pendingPurchase && state.pendingPurchase.id);
    if (!rank) return;
    const tier = tierBtn.dataset.tier;
    const price = tier === 'monthly' ? rank.monthlyPrice : rank.lifetimePrice;
    const tierLabel = tier === 'monthly' ? 'Monthly' : 'Lifetime';
    state.pendingPurchase.price = price;
    state.pendingPurchase.tier = tier;
    state.pendingPurchase.label = rank.name + ' (' + tierLabel + ')';
    $$('.tier-option').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tier === tier);
    });
    const label = $('.confirm-tier-label');
    if (label) label.textContent = tierLabel + ' · ' + formatPrice(price);
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
    if (checkoutBtn) checkoutBtn.disabled = state.cart.length === 0;
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
      state.cart.push({ key: key, id: item.id, name: item.name, price: item.price, tier: item.tier, label: item.label });
      showToast(item.label + ' added to cart!', 'success');
    }
    closeOverlay('confirm');
    updateCartUI();
    openCart($('#cart-toggle'));
  }

  async function buyNowFromModal() {
    var pending = state.pendingPurchase;
    if (!pending) return;

    var pkgId = getPackageId(pending);
    if (!pkgId || pkgId === '{PENDING_ID}') return;

    var btn = document.querySelector('#confirm-buy-now');
    var originalText = btn ? btn.innerText : '';
    if (btn) btn.innerText = 'Creating Session...';

    try {
      var response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [{ packageId: pkgId, quantity: 1 }],
          customer: {
            playerUsername: state.user || 'Guest'
          },
          successUrl: window.location.href,
          cancelUrl: window.location.href
        })
      });

      var data = await response.json();
      
      if (data.success && data.data && data.data.url) {
        state.cart = [];
        updateCartUI();
        window.location.href = data.data.url;
      } else {
        throw new Error(data.message || 'No redirect URL provided by API.');
      }
    } catch (err) {
      console.error('FluxStore API Error:', err);
      alert('Store Configuration Error: ' + err.message + '\n\nPlease check your FluxStore Dashboard settings.');
      // Fallback
      var url = 'https://smsmp.fluxstore.net/package/' + pkgId;
      if (state.user) {
        url += '?ign=' + encodeURIComponent(state.user);
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    } finally {
      if (btn) btn.innerText = originalText;
      closeOverlay('confirm');
    }
  }

  // We will route this through a free Cloudflare Worker to fix the CORS error and secure the API Key
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
          successUrl: window.location.href,
          cancelUrl: window.location.href
        })
      });

      var data = await response.json();
      
      if (data.success && data.data && data.data.url) {
        state.cart = [];
        updateCartUI();
        window.location.href = data.data.url;
      } else {
        throw new Error(data.message || 'No redirect URL provided by API.');
      }
    } catch (err) {
      console.error('API Error:', err);
      alert('Store Configuration Error: ' + err.message + '\n\nPlease check your FluxStore Dashboard settings.');
      var fallbackUrl = 'https://smsmp.fluxstore.net/';
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    } finally {
      if (btn) btn.innerText = originalText;
    }
  }

  function removeFromCart(index) {
    state.cart.splice(index, 1);
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
  }

  function bindEvents() {
    document.addEventListener('click', (e) => {
      const advToggle = e.target.closest('.advancement-toggle');
      if (advToggle) {
        toggleAdvancement(advToggle);
        return;
      }

      const viewBtn = e.target.closest('[data-view]');
      if (viewBtn && viewBtn.dataset.view) {
        const cat = viewBtn.dataset.storeCat;
        switchView(viewBtn.dataset.view, cat);
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
        openConfirmKey(keyBtn.dataset.id, keyBtn.dataset.pack);
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
        showToast('IP copied');
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

  function init() {
    renderFeatures();
    renderRankCards();
    renderKeys();
    renderBundles();
    renderComparisonTable();
    renderKitTable();
    updateCartUI();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
