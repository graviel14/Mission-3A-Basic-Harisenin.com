// Validasi form login & register (front-end only — MVP, belum terhubung ke backend)
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const form = $('#loginForm') || $('#registerForm');
  if (!form) return;
  const isRegister = form.id === 'registerForm';
  const status = $('#status');

  const rules = {
    name: v => v.trim().length >= 2,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    phone: v => /^[1-9]\d{8,12}$/.test(v.replace(/[\s-]/g, '')),
    password: v => v.length >= 6,
    confirm: v => v === $('#password').value && v.length >= 6,
  };

  function check(input) {
    const rule = rules[input.id];
    if (!rule) return true;
    const ok = rule(input.value);
    input.closest('.field').classList.toggle('has-error', !ok);
    return ok;
  }

  form.querySelectorAll('.input').forEach(input => {
    input.addEventListener('blur', () => { if (input.value) check(input); });
    input.addEventListener('input', () => {
      if (input.closest('.field').classList.contains('has-error')) check(input);
      if (input.id === 'password' && isRegister && $('#confirm').value) check($('#confirm'));
    });
  });

  // tampil/sembunyikan kata sandi
  form.querySelectorAll('.pw-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.toggle);
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-label', show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = [...form.querySelectorAll('.input')];
    const valid = inputs.map(check).every(Boolean);
    if (!valid) { inputs.find(i => i.closest('.field').classList.contains('has-error')).focus(); return; }

    status.className = 'form-status ok';
    status.textContent = isRegister ? 'Pendaftaran berhasil! Mengalihkan ke halaman masuk…' : 'Berhasil masuk! Mengalihkan ke beranda…';
    setTimeout(() => { location.href = isRegister ? 'login.html' : 'beranda.html'; }, 900);
  });

  $('#googleBtn').addEventListener('click', () => {
    status.className = 'form-status ok';
    status.textContent = 'Demo MVP: integrasi Google Sign-In (OAuth) akan dihubungkan pada tahap backend.';
  });

  $('#forgot').addEventListener('click', e => {
    e.preventDefault();
    status.className = 'form-status ok';
    status.textContent = 'Demo MVP: halaman reset kata sandi belum tersedia.';
  });
})();
