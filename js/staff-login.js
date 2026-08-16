(function() {
  const API_BASE = 'http://127.0.0.1:3001/api';

  const modalOverlay = document.getElementById('portal-modal-overlay');
  const loginOpenBtns = document.querySelectorAll('#login-open');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const formRequestCode = document.getElementById('form-request-code');
  const formVerifyCode = document.getElementById('form-verify-code');
  const inputDiscordId = document.getElementById('input-discord-id');
  const inputVerifyCode = document.getElementById('input-verify-code');
  const requestError = document.getElementById('request-error');
  const verifyError = document.getElementById('verify-error');
  const verifyBackBtn = document.getElementById('verify-back-btn');

  if (!modalOverlay) return;

  loginOpenBtns.forEach(btn => {
    btn.addEventListener('click', openLoginModal);
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeLoginModal);

  if (formRequestCode) formRequestCode.addEventListener('submit', handleRequestCode);
  if (formVerifyCode) formVerifyCode.addEventListener('submit', handleVerifyCode);
  verifyBackBtn.addEventListener('click', () => {
    formVerifyCode.classList.add('hidden');
    formRequestCode.classList.remove('hidden');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeLoginModal();
    }
  });

  function openLoginModal() {
    requestError.style.display = 'none';
    verifyError.style.display = 'none';
    formVerifyCode.classList.add('hidden');
    formRequestCode.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
    inputDiscordId.focus();
  }

  function closeLoginModal() {
    modalOverlay.classList.add('hidden');
  }

  async function handleRequestCode(e) {
    e.preventDefault();
    requestError.style.display = 'none';
    const username = inputDiscordId.value.trim();

    try {
      const res = await fetch(`${API_BASE}/auth/request-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        formRequestCode.classList.add('hidden');
        formVerifyCode.classList.remove('hidden');
        inputVerifyCode.value = '';
        inputVerifyCode.focus();
      } else {
        requestError.textContent = data.error || 'Failed to request code.';
        requestError.style.display = 'block';
      }
    } catch(err) {
      console.error(err);
      requestError.textContent = 'Network error: ' + err.message;
      requestError.style.display = 'block';
    }
  }

  async function handleVerifyCode(e) {
    e.preventDefault();
    verifyError.style.display = 'none';
    const username = inputDiscordId.value.trim();
    const code = inputVerifyCode.value.trim();

    try {
      const res = await fetch(`${API_BASE}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, code })
      });
      const data = await res.json();

      if (res.ok && data.success) {

        localStorage.setItem('sm_staff_session_token', data.token);
        window.location.href = 'staff-portal.html';
      } else {
        verifyError.textContent = data.error || 'Invalid code.';
        verifyError.style.display = 'block';
      }
    } catch(err) {
      verifyError.textContent = 'Network error during verification.';
      verifyError.style.display = 'block';
    }
  }

  if (new URLSearchParams(window.location.search).get('login') === 'staff') {
    openLoginModal();

    window.history.replaceState({}, document.title, window.location.pathname);
  }
})();
