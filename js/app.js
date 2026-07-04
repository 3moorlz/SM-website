// Login and checkout are cosmetic; cart lives in memory until page refresh.

(function () {
  'use strict';

  const state = {
    view: 'home',
    cart: [],
    user: null,
    bedrock: false,
    activeTableTab: 'overview',
  };

  let lastFocus = null;
  let openOverlay = null;
  let skinPreviewTimer = null;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

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

  function switchView(view) {
    state.view = view;
    $$('.view').forEach((el) => el.classList.remove('active'));
    $('#view-' + view).classList.add('active');
    $$('.top-nav .nav-link[data-view]').forEach((link) => {
      link.classList.toggle('active', link.dataset.view === view);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
    lastFocus = null;
  }

  function openOverlayPanel(id, panel, triggerEl) {
    if (openOverlay && openOverlay !== id) {
      closeOverlay(openOverlay);
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
        '<div class="advancement-detail" id="adv-' + i + '">' +
          '<p>' + f.text + '</p>' +
        '</div>' +
      '</div>'
    ).join('');
  }

  function toggleAdvancement(btn) {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    btn.closest('.advancement-item').classList.toggle('is-open', !open);
  }

  function renderRankCards() {
    $('#rank-cards').innerHTML = RANKS.map((rank) => {
      const inCart = state.cart.some((item) => item.id === rank.id);
      const featured = rank.id === 'immortal';
      return (
        '<article class="rank-card' + (featured ? ' rank-featured' : '') + '" style="--rank-accent:' + rank.accent + ';--rank-glow:' + rank.accentGlow + '">' +
          (featured ? '<span class="rank-tier-badge">Top Tier</span>' : '') +
          '<img src="' + rank.badge + '" alt="' + rank.name + ' rank badge" class="rank-badge">' +
          '<h3>' + rank.name + '</h3>' +
          '<div class="rank-price">' + formatPrice(rank.price) + '</div>' +
          '<ul class="rank-perks">' + rank.perks.map((p) => '<li>' + p + '</li>').join('') + '</ul>' +
          '<button type="button" class="add-cart-btn' + (inCart ? ' in-cart' : '') + '" data-rank-id="' + rank.id + '">' +
            (inCart ? '✓ In Cart' : '🛒 Add to Cart') +
          '</button>' +
        '</article>'
      );
    }).join('');
  }

  function renderComparisonTable() {
    const table = $('#comparison-table');
    table.querySelector('thead').innerHTML =
      '<tr><th>Feature</th>' + RANKS.map((r, i) =>
        '<th class="' + (i === RANKS.length - 1 ? 'col-immortal' : '') + '">' + r.name + '</th>'
      ).join('') + '</tr>';

    table.querySelector('tbody').innerHTML = COMPARISON_ROWS.map((row) =>
      '<tr><td>' + row.label + '</td>' + row.values.map((val, i) =>
        '<td class="' + (i === RANKS.length - 1 ? 'col-immortal' : '') + '">' + val + '</td>'
      ).join('') + '</tr>'
    ).join('');
  }

  function renderKitTable() {
    const table = $('#kit-table');
    table.querySelector('thead').innerHTML =
      '<tr><th>Command / Feature</th>' + RANKS.map((r, i) =>
        '<th class="' + (i === RANKS.length - 1 ? 'col-immortal' : '') + '">' + r.name + '</th>'
      ).join('') + '</tr>';

    table.querySelector('tbody').innerHTML = KIT_PERKS.map((row) =>
      '<tr><td>' + row.label + '</td>' + row.values.map((val, i) =>
        '<td class="' + (i === RANKS.length - 1 ? 'col-immortal' : '') + '">' +
          '<span class="' + (val ? 'check-yes' : 'check-no') + '">' + (val ? '✓' : '—') + '</span>' +
        '</td>'
      ).join('') + '</tr>'
    ).join('');
  }

  function switchTableTab(tab) {
    state.activeTableTab = tab;
    $$('.table-tab').forEach((btn) => {
      const active = btn.dataset.tableTab === tab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    $('#table-overview').classList.toggle('active', tab === 'overview');
    $('#table-overview').hidden = tab !== 'overview';
    $('#table-commands').classList.toggle('active', tab === 'commands');
    $('#table-commands').hidden = tab !== 'commands';
  }

  function updateCartUI() {
    const count = state.cart.length;
    $('#cart-count').textContent = count;
    $('#cart-total').textContent = formatPrice(state.cart.reduce((sum, item) => sum + item.price, 0));

    const list = $('#cart-items');
    if (count === 0) {
      list.innerHTML = '<li class="cart-empty">Your cart is empty</li>';
    } else {
      list.innerHTML = state.cart.map((item, index) =>
        '<li class="cart-item">' +
          '<div class="cart-item-info"><strong>' + item.name + '</strong><span>' + formatPrice(item.price) + '</span></div>' +
          '<button type="button" class="cart-remove" data-index="' + index + '" aria-label="Remove ' + item.name + '">&times;</button>' +
        '</li>'
      ).join('');
    }
    renderRankCards();
  }

  function addToCart(rankId) {
    const rank = RANKS.find((r) => r.id === rankId);
    if (!rank) return;
    if (state.cart.some((item) => item.id === rankId)) {
      showToast(rank.name + ' is already in your cart.', 'success');
    } else {
      state.cart.push({ id: rank.id, name: rank.name, price: rank.price });
      showToast(rank.name + ' added to cart!', 'success');
    }
    updateCartUI();
    openCart($('#cart-toggle'));
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

  function validateUsername(raw) {
    return MC_USERNAME_RE.test(raw.trim());
  }

  function updateSkinPreview(username) {
    const name = username.trim();
    if (!name || !MC_USERNAME_RE.test(name)) {
      $('#login-skin-preview').src = 'https://mc-heads.net/avatar/Steve/32';
      return;
    }
    $('#login-skin-preview').src = 'https://mc-heads.net/avatar/' + encodeURIComponent(name) + '/32';
  }

  function debouncedSkinPreview(username) {
    clearTimeout(skinPreviewTimer);
    skinPreviewTimer = setTimeout(() => updateSkinPreview(username), 280);
  }

  function handleLogin(username) {
    const name = username.trim();
    if (!name) {
      showUsernameError();
      return;
    }
    if (!validateUsername(name)) {
      showUsernameError();
      return;
    }
    clearUsernameError();
    state.user = name;
    const skinUrl = 'https://mc-heads.net/avatar/' + encodeURIComponent(name) + '/32';
    const img = new Image();
    img.onload = () => applyLogin(name, skinUrl);
    img.onerror = () => applyLogin(name, 'https://mc-heads.net/avatar/Steve/32');
    img.src = skinUrl;
  }

  function applyLogin(name, skinUrl) {
    $('#skin-preview').src = skinUrl;
    $('#welcome-label').textContent = 'Welcome, ' + name;
    $('#welcome-sub').textContent = state.bedrock ? 'Bedrock Edition' : 'Java Edition';
    closeLogin();
    showToast('Welcome, ' + name + '!', 'success');
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
        switchView(viewBtn.dataset.view);
        return;
      }

      const tableTab = e.target.closest('[data-table-tab]');
      if (tableTab) {
        switchTableTab(tableTab.dataset.tableTab);
        return;
      }

      const placeholderBtn = e.target.closest('.placeholder-trigger');
      if (placeholderBtn) {
        showPlaceholder(placeholderBtn.dataset.placeholder || 'This section');
        return;
      }

      const soonBtn = e.target.closest('.soon-trigger');
      if (soonBtn) {
        showSoon(soonBtn.dataset.soon || 'This feature');
        return;
      }

      const addBtn = e.target.closest('.add-cart-btn');
      if (addBtn) {
        addToCart(addBtn.dataset.rankId);
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
      }
    });

    $('#login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      handleLogin($('#username-input').value);
    });

    $('#username-input').addEventListener('input', (e) => {
      clearUsernameError();
      debouncedSkinPreview(e.target.value);
    });

    $('#bedrock-toggle').addEventListener('change', (e) => {
      state.bedrock = e.target.checked;
      $('#edition-label').textContent = state.bedrock ? 'Bedrock Edition' : 'Java Edition';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (openOverlay === 'login') closeLogin();
        if (openOverlay === 'cart') closeCart();
        return;
      }
      if (openOverlay === 'login') trapFocus(e, $('#login-modal'));
      if (openOverlay === 'cart') trapFocus(e, $('#cart-panel'));
    });
  }

  function init() {
    renderFeatures();
    renderRankCards();
    renderComparisonTable();
    renderKitTable();
    switchTableTab('overview');
    updateCartUI();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
