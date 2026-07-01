// ============================================================
// WERKZEUGKASTEN ENGINE
// Baut Sidebar und Tool-Viewer für werkzeugkasten.html
// Abhängigkeit: wk-config.js (WK_CONFIG) muss vorher geladen sein
// ============================================================

// ── CSS INJECTION ────────────────────────────────────────────
(function injectStyles() {
  const css = `
    /* ── Werkzeugkasten Topbar-Extras ── */
    .wk-topbar-title {
      font-family: Arial, sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--muted);
      margin-left: 0.5rem;
      white-space: nowrap;
    }
    .wk-back-link {
      font-family: Arial, sans-serif;
      font-size: 0.8rem;
      color: var(--muted);
      text-decoration: none;
      margin-left: auto;
      padding: 4px 10px;
      border: 1px solid var(--line);
      border-radius: 6px;
      white-space: nowrap;
      transition: color 0.15s, border-color 0.15s;
      margin-right: 0.5rem;
    }
    .wk-back-link:hover { color: var(--accent); border-color: var(--accent); }

    /* ── Sidebar Kategorie-Trennlabel ── */
    .wk-cat-label {
      display: block;
      font-family: Arial, sans-serif;
      font-size: 0.63rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--muted);
      padding: 0.55rem 1rem 0.15rem;
      opacity: 0.65;
      cursor: default;
      user-select: none;
    }

    /* ── Tool-Link in Sidebar ── */
    .wk-tool {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.32rem 1rem 0.32rem 1.25rem;
      font-size: 0.82rem;
      font-family: Arial, sans-serif;
      color: var(--text);
      text-decoration: none;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      box-sizing: border-box;
      transition: background 0.1s, color 0.1s;
      line-height: 1.35;
    }
    .wk-tool:hover { background: var(--hover); color: var(--accent); }
    .wk-tool.active {
      color: var(--accent);
      font-weight: 700;
      background: var(--hover);
    }

    /* Referenz-Badge "(→ WK I)" */
    .wk-ref {
      display: inline-block;
      font-size: 0.6rem;
      font-weight: 400;
      color: var(--muted);
      background: var(--line);
      border-radius: 3px;
      padding: 1px 4px;
      margin-left: auto;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ── Viewer ── */
    .wk-welcome {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      color: var(--muted);
      font-family: Arial, sans-serif;
      gap: 0.8rem;
    }
    .wk-welcome-icon { font-size: 3rem; }
    .wk-welcome h2 { font-size: 1.2rem; font-weight: 600; color: var(--text); margin: 0; }
    .wk-welcome p  { font-size: 0.88rem; margin: 0; max-width: 320px; }

    .wk-viewer { display: none; }
    .wk-viewer-header {
      padding-bottom: 0.8rem;
      margin-bottom: 1rem;
      border-bottom: 2px solid var(--line);
    }
    .wk-viewer-header h2 {
      font-size: 1.35rem;
      font-weight: 700;
      margin: 0 0 0.2rem;
    }
    .wk-viewer-source {
      font-size: 0.78rem;
      color: var(--muted);
      font-family: Arial, sans-serif;
    }

    .wk-images {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .wk-image-wrap {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.10);
      background: #fff;
      line-height: 0;
    }
    .wk-image {
      width: 100%;
      height: auto;
      display: block;
    }
    .wk-image-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      background: var(--card);
      border: 2px dashed var(--line);
      border-radius: 8px;
      color: var(--muted);
      font-family: Arial, sans-serif;
      font-size: 0.85rem;
      flex-direction: column;
      gap: 0.5rem;
    }
    .wk-image-placeholder span { font-size: 1.5rem; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();

// ── LOOKUP: Tool-ID → Tool-Objekt ────────────────────────────
function buildToolIndex() {
  const idx = {};
  WK_CONFIG.gruppen.forEach(g => {
    g.kategorien.forEach(k => {
      k.tools.forEach(t => { idx[t.id] = t; });
    });
  });
  return idx;
}
const TOOL_INDEX = buildToolIndex();

// ── SIDEBAR ──────────────────────────────────────────────────
const WK_SIDEBAR_KEY = 'wfw_wk_sidebar_open';

function buildWKSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  let html = '';

  WK_CONFIG.gruppen.forEach((gruppe, gi) => {
    const groupDomId = `wk-group-${gruppe.id}`;
    // Erste Gruppe standardmäßig offen, Rest zu
    const startOpen = gi === 0;

    html += `
      <div class="nav-section">
        <div class="nav-heading collapsible ${startOpen ? 'open' : ''}"
             onclick="wkToggleGroup('${groupDomId}', this)">
          <span>${gruppe.icon} ${gruppe.label}</span>
          <span class="collapse-arrow">${startOpen ? '▾' : '▸'}</span>
        </div>
        <div class="module-pages" id="${groupDomId}" style="display:${startOpen ? 'block' : 'none'}">`;

    gruppe.kategorien.forEach(kat => {
      // Kategorie-Label (außer für Übersicht-Kategorie ohne Label)
      if (kat.label) {
        html += `<span class="wk-cat-label">${kat.label}</span>`;
      }

      kat.tools.forEach(tool => {
        const icon = tool.icon || '●';
        const refBadge = tool.quelle
          ? `<span class="wk-ref">→ ${tool.quelle}</span>`
          : '';
        html += `
          <button class="wk-tool" id="wk-btn-${tool.id}" onclick="wkShowTool('${tool.id}')">
            <span style="font-size:9px;opacity:0.55;flex-shrink:0">${icon}</span>
            <span style="flex:1">${tool.label}</span>
            ${refBadge}
          </button>`;
      });
    });

    html += `</div></div>`;
  });

  sidebar.innerHTML = html;
}

function wkToggleGroup(id, heading) {
  const el     = document.getElementById(id);
  const isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  heading.classList.toggle('open', !isOpen);
  heading.querySelector('.collapse-arrow').textContent = isOpen ? '▸' : '▾';
}

// ── SIDEBAR TOGGLE (☰) ───────────────────────────────────────
function initWKSidebarToggle() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  const btn = document.createElement('button');
  btn.className = 'sidebar-toggle';
  btn.innerHTML = '☰';
  btn.title = 'Navigation ein-/ausblenden';

  const brand = topbar.querySelector('.brand');
  if (brand) topbar.insertBefore(btn, brand);
  else topbar.prepend(btn);

  const stored = localStorage.getItem(WK_SIDEBAR_KEY);
  const startOpen = stored !== null ? stored === 'true' : true; // WK: default offen
  if (!startOpen) document.body.classList.add('sidebar-collapsed');

  btn.addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('sidebar-collapsed');
    localStorage.setItem(WK_SIDEBAR_KEY, (!collapsed).toString());
  });
}

// ── TOOL ANZEIGEN ────────────────────────────────────────────
let activeToolId = null;

function wkShowTool(toolId) {
  const tool = TOOL_INDEX[toolId];
  if (!tool) return;

  // Vorherigen aktiven Button deaktivieren
  if (activeToolId) {
    const prev = document.getElementById(`wk-btn-${activeToolId}`);
    if (prev) prev.classList.remove('active');
  }
  activeToolId = toolId;
  const btn = document.getElementById(`wk-btn-${toolId}`);
  if (btn) btn.classList.add('active');

  // Welcome ausblenden, Viewer einblenden
  const welcome = document.getElementById('wk-welcome');
  const viewer  = document.getElementById('wk-viewer');
  if (welcome) welcome.style.display = 'none';
  if (viewer)  viewer.style.display  = 'block';

  // Titel setzen
  const titleEl = document.getElementById('wk-tool-title');
  if (titleEl) titleEl.textContent = tool.label;

  // Quelle anzeigen
  const sourceEl = document.getElementById('wk-tool-source');
  if (sourceEl) {
    sourceEl.textContent = tool.quelle
      ? `Details aus ${tool.quelle}`
      : '';
  }

  // Bilder rendern
  const imagesEl = document.getElementById('wk-images');
  if (!imagesEl) return;

  imagesEl.innerHTML = '';
  tool.seiten.forEach((src, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'wk-image-wrap';

    const img = document.createElement('img');
    img.className = 'wk-image';
    img.alt = `${tool.label} – Seite ${i + 1}`;
    img.loading = 'lazy';

    // Bild nicht gefunden → Platzhalter
    img.onerror = function () {
      const ph = document.createElement('div');
      ph.className = 'wk-image-placeholder';
      ph.innerHTML = `<span>📷</span><strong>${tool.label} – Seite ${i + 1}</strong><small>${src}</small>`;
      wrap.replaceChildren(ph);
    };
    img.src = src;

    wrap.appendChild(img);
    imagesEl.appendChild(wrap);
  });

  // Hash für Direktverlinkung aktualisieren
  history.replaceState(null, '', `#${toolId}`);

  // Zum Viewer scrollen (auf kleinen Bildschirmen)
  if (window.innerWidth < 768) {
    viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ── HASH-NAVIGATION ──────────────────────────────────────────
function handleHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash && TOOL_INDEX[hash]) {
    wkShowTool(hash);

    // Gruppe des Tools aufklappen
    WK_CONFIG.gruppen.forEach(g => {
      g.kategorien.forEach(k => {
        if (k.tools.some(t => t.id === hash)) {
          const el = document.getElementById(`wk-group-${g.id}`);
          if (el) {
            el.style.display = 'block';
            const heading = el.previousElementSibling;
            if (heading) {
              heading.classList.add('open');
              const arrow = heading.querySelector('.collapse-arrow');
              if (arrow) arrow.textContent = '▾';
            }
          }
        }
      });
    });
  }
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initWKSidebarToggle();
  buildWKSidebar();
  handleHash();
  window.addEventListener('hashchange', handleHash);
});
