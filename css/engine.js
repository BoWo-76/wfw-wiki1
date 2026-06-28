// ============================================================
// WIKI ENGINE — liest WIKI_CONFIG und baut alles automatisch
// ============================================================

const STATUS_BADGE = {
  fertig:   { label: "Fertig",   cls: "ok"      },
  entwurf:  { label: "Entwurf",  cls: "warn"    },
  geplant:  { label: "Geplant",  cls: "neutral" },
};

// Pfad-Tiefe ermitteln (index.html = root, pages/*.html = 1 tief)
function getRoot() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  // Netlify / lokaler Aufruf: wenn Pfad mit /pages/ endet → eine Ebene hoch
  return window.location.pathname.includes('/pages/') ? '..' : '.';
}

// ── SIDEBAR ─────────────────────────────────────────────────
function buildSidebar() {
  const r = getRoot();
  const current = window.location.pathname.split('/').pop();

  let html = `
    <div class="nav-section">
      <div class="nav-heading">Navigation</div>
      <a href="${r}/index.html" ${current === 'index.html' || current === '' ? 'class="active"' : ''}>
        <span class="icon">🏠</span> Startseite
      </a>
    </div>`;

  WIKI_CONFIG.modules.forEach(mod => {
    const pages = WIKI_CONFIG.pages.filter(p => p.module === mod.id);
    if (!pages.length) return;

    html += `<div class="nav-section">
      <div class="nav-heading">${mod.icon} ${mod.label}</div>`;

    pages.forEach(p => {
      const fileName = p.file.split('/').pop();
      const isActive = current === fileName ? 'class="active"' : '';
      const dot = p.status === 'fertig' ? '●' : p.status === 'entwurf' ? '◐' : '○';
      html += `<a href="${r}/${p.file}" ${isActive}>
        <span class="icon" style="font-size:11px;opacity:.6">${dot}</span> ${p.title}
      </a>`;
    });

    html += `</div>`;
  });

  document.querySelectorAll('.sidebar').forEach(el => el.innerHTML = html);
}

// ── SEARCH ──────────────────────────────────────────────────
function buildSearch() {
  const r = getRoot();
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.style.display = 'none'; return; }

    const hits = WIKI_CONFIG.pages.filter(p =>
      p.status !== 'geplant' && (
        p.title.toLowerCase().includes(q) ||
        p.keywords.some(k => k.includes(q))
      )
    );

    if (hits.length === 0) {
      results.innerHTML = '<div class="no-result">Keine Treffer.</div>';
    } else {
      const mod = id => WIKI_CONFIG.modules.find(m => m.id === id);
      results.innerHTML = hits.map(h =>
        `<a href="${r}/${h.file}">
          <strong>${h.title}</strong>
          <span>${mod(h.module)?.icon} ${mod(h.module)?.label}</span>
        </a>`
      ).join('');
    }
    results.style.display = 'block';
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) results.style.display = 'none';
  });
}

// ── INDEX PAGE ───────────────────────────────────────────────
function buildIndexPage() {
  const container = document.getElementById('wiki-index');
  if (!container) return;

  let html = '';

  WIKI_CONFIG.modules.forEach(mod => {
    const pages = WIKI_CONFIG.pages.filter(p => p.module === mod.id);
    if (!pages.length) return;

    const done = pages.filter(p => p.status === 'fertig').length;
    const draft = pages.filter(p => p.status === 'entwurf').length;
    const total = pages.length;

    html += `
      <div class="module-block">
        <div class="module-header" style="border-left-color:${mod.color}">
          <span class="module-icon">${mod.icon}</span>
          <div>
            <div class="module-title">${mod.label}</div>
            <div class="module-meta">${done} fertig · ${draft} Entwurf · ${total - done - draft} geplant</div>
          </div>
          <div class="module-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${Math.round((done/total)*100)}%;background:${mod.color}"></div>
            </div>
            <span>${Math.round((done/total)*100)}%</span>
          </div>
        </div>
        <div class="page-list">`;

    pages.forEach(p => {
      const b = STATUS_BADGE[p.status];
      const clickable = p.status !== 'geplant';
      html += clickable
        ? `<a class="page-item" href="${p.file}">
            <span class="page-title">${p.title}</span>
            <span class="badge ${b.cls}">${b.label}</span>
           </a>`
        : `<div class="page-item disabled">
            <span class="page-title">${p.title}</span>
            <span class="badge ${b.cls}">${b.label}</span>
           </div>`;
    });

    html += `</div></div>`;
  });

  container.innerHTML = html;
}

// ── TOPBAR ───────────────────────────────────────────────────
function buildTopbar() {
  const r = getRoot();
  const el = document.querySelector('.topbar .brand');
  if (el) {
    el.href = `${r}/index.html`;
    el.innerHTML = `${WIKI_CONFIG.brand}<span>Wiki</span>`;
  }
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildTopbar();
  buildSidebar();
  buildSearch();
  buildIndexPage();
});
