// Beranda: render kartu kursus, filter kategori, newsletter, menu profil
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Data dummy (nanti diganti dengan data dari API)
  const mentors = [
    ['Jenna Ortega', 'Senior Accountant', 'Gojek'],
    ['Jenna Ortega', 'Senior Accountant', 'Gojek'],
    ['Jenna Ortega', 'Senior Accountant', 'Gojek'],
  ];
  const courses = [
    { title: 'Big 4 Auditor Financial Analyst', cat: 'bisnis' },
    { title: 'Digital Marketing Strategy untuk Pemula', cat: 'pemasaran' },
    { title: 'Dasar-Dasar Riset & Analisis Data', cat: 'bisnis' },
    { title: 'UI/UX Design: Dari Nol hingga Portofolio', cat: 'desain' },
    { title: 'Public Speaking & Komunikasi Efektif', cat: 'pengembangan-diri' },
    { title: 'Content Marketing yang Menghasilkan', cat: 'pemasaran' },
    { title: 'Manajemen Waktu & Produktivitas', cat: 'pengembangan-diri' },
    { title: 'Strategi Bisnis & Manajemen Keuangan', cat: 'bisnis' },
    { title: 'Desain Grafis dengan Figma', cat: 'desain' },
  ].map((c, i) => ({
    ...c,
    img: `img/course${i + 1}.jpg`,
    avatar: `img/avatar${i + 1}.png`,
    mentor: mentors[i % mentors.length],
    desc: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan fleksibilitas belajar tanpa batas.',
    rating: 3.5, reviews: 86, price: 'Rp 300K',
  }));

  const grid = $('#courseGrid');
  const stars = r => [1, 2, 3, 4, 5].map(n =>
    n <= Math.floor(r) ? '★' : (n - r === 0.5 ? '<span class="half">★</span>' : '<span class="off">★</span>')).join('');
  const esc = s => s.replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  function render(cat) {
    const list = cat === 'semua' ? courses : courses.filter(c => c.cat === cat);
    if (!list.length) { grid.innerHTML = '<p class="empty">Belum ada kelas pada kategori ini.</p>'; return; }
    grid.innerHTML = list.map(c => `
      <article class="card">
        <a href="#" aria-label="${esc(c.title)}">
          <img class="thumb" src="${c.img}" alt="" loading="lazy">
          <h3>${esc(c.title)}</h3>
        </a>
        <p class="desc">${esc(c.desc)}</p>
        <div class="mentor">
          <img src="${c.avatar}" alt="" width="36" height="36">
          <div>
            <div class="name">${esc(c.mentor[0])}</div>
            <div class="role">${esc(c.mentor[1])} di <b>${esc(c.mentor[2])}</b></div>
          </div>
        </div>
        <div class="card-foot">
          <div class="rating"><span class="stars" aria-hidden="true">${stars(c.rating)}</span><u>${c.rating} (${c.reviews})</u></div>
          <div class="price">${c.price}</div>
        </div>
      </article>`).join('');
  }

  function setCategory(cat) {
    $$('.tab').forEach(t => {
      const on = t.dataset.cat === cat;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on);
    });
    render(cat);
  }

  $$('.tab').forEach(t => t.addEventListener('click', () => setCategory(t.dataset.cat)));
  $$('[data-go]').forEach(a => a.addEventListener('click', () => setCategory(a.dataset.go)));
  render('semua');

  // Newsletter
  const form = $('#subscribeForm'), msg = $('#nlMsg'), nlEmail = $('#nlEmail');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(nlEmail.value.trim());
    msg.className = 'msg ' + (ok ? 'ok' : 'err');
    msg.textContent = ok ? 'Terima kasih! Kamu sudah terdaftar di newsletter videobelajar.' : 'Masukkan alamat e-mail yang valid.';
    if (ok) form.reset();
  });

  // Menu profil
  const btn = $('#avatarBtn'), dd = $('#profileDropdown');
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = dd.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', () => { dd.classList.remove('open'); btn.setAttribute('aria-expanded', false); });
})();
