(function () {
  'use strict';

  /* ─── CSS ─────────────────────────────────────────────────────────────── */
  var CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@500&display=swap');

.sb {
  width: 255px;
  min-width: 255px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: width 0.2s ease, min-width 0.2s ease;
  overflow: hidden;
}
.sb.col { width: 52px; min-width: 52px; }

.sb-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.08), 0px 1px 2px rgba(0,0,0,0.06);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sb-hdr {
  height: 48px;
  padding: 16px 12px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  white-space: nowrap;
}
.sb.col .sb-hdr {
  flex-direction: column;
  height: auto;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px 0 8px;
}

.logo-wm { display: flex; align-items: center; width: 78.7px; height: 30.71px; flex-shrink: 0; }
.logo-wm svg { width: 78.7px; height: 30.71px; display: block; }
.logo-ic { display: none; align-items: center; justify-content: center; }
.sb.col .logo-wm { display: none; }
.sb.col .logo-ic { display: flex; }

.col-btn {
  width: 28px; height: 28px;
  border: none; border-radius: 4px;
  background: transparent; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.sb-nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px 0;
}
.sb-nav::-webkit-scrollbar { width: 4px; }
.sb-nav::-webkit-scrollbar-thumb { background: #CDD5E0; border-radius: 2px; }

.dv { height: 1px; background: #E3E8EF; margin: 8px 0; }

.nav-section { display: flex; flex-direction: column; gap: 4px; padding: 8px; }
.sb.col .nav-section { padding: 0; align-items: center; }

/* Section header — Lato Medium 12px, gray/700 */
.sec {
  display: flex; align-items: center; gap: 4px;
  height: 20px; padding: 0 8px;
  font-family: 'Lato', sans-serif;
  font-size: 12px; font-weight: 500; color: #4A5567;
  white-space: nowrap;
}
.sb.col .sec { justify-content: center; padding: 0; }
.sb.col .sec-lbl { display: none; }
.sb.col .sec-crt { display: none; }

/* Nav items — content at 32px from card edge */
.ni {
  height: 32px; padding: 0 32px;
  display: flex; align-items: center; gap: 8px;
  border-radius: 4px; cursor: pointer;
  position: relative; white-space: nowrap;
  text-decoration: none; color: inherit; width: 100%;
}
.ni.home { padding: 0 32px; border-radius: 0; }

.nav-section .ni:hover {
  background: #E8F0FE; border-radius: 0;
  margin-left: -8px; margin-right: -8px;
  width: calc(100% + 16px);
  padding-left: 32px; padding-right: 24px;
}
.ni.home:hover { background: #E8F0FE; border-radius: 0; }

.nav-section .ni.active {
  background: #EFF6FF;
  border-left: 3px solid #2667D8; border-radius: 0;
  padding-left: 29px; padding-right: 24px;
  margin-left: -8px; margin-right: -8px;
  width: calc(100% + 16px);
}
.ni.home.active {
  background: #EFF6FF;
  border-left: 3px solid #2667D8;
  padding-left: 29px; border-radius: 0;
}

.ni.active .ni-lbl { color: #2667D8; font-weight: 600; }
.ni.active .ni-ic  { color: #2667D8; }

.ni-ic {
  width: 22px; height: 22px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: #4A5567;
}

/* Inactive label — DM Sans Regular 14px, gray/900 */
.ni-lbl { font-size: 14px; font-weight: 400; color: #222B3A; }
.ni.active .ni-lbl { color: #2667D8; }

.sb.col .ni { padding: 0; width: 36px; justify-content: center; border-radius: 4px; }
.sb.col .ni.home { padding: 0; border-radius: 4px; }
.sb.col .ni-lbl { display: none; }

.sb.col .ni:hover::after {
  content: attr(data-label);
  position: absolute; left: calc(100% + 8px);
  top: 50%; transform: translateY(-50%);
  background: #222B3A; color: #fff;
  font-size: 12px; font-weight: 500;
  padding: 4px 10px; border-radius: 4px;
  white-space: nowrap; z-index: 300; pointer-events: none;
}

/* Sub-nav items (e.g. Library → Reports, Files) */
.ni-sub-wrap { padding-left: 42px; display: flex; flex-direction: column; }
.ni-sub {
  display: flex; align-items: center;
  height: 32px; padding: 4px 16px 4px 18px;
  border-left: 2px solid #E3E8EF;
  font-size: 14px; font-weight: 400; color: #222B3A;
  cursor: pointer; white-space: nowrap; text-decoration: none;
}
.ni-sub:hover { background: #E8F0FE; }
.ni-sub.active { color: #2667D8; font-weight: 600; border-left-color: #2667D8; }
.sb.col .ni-sub-wrap { display: none; }

/* Apps section */
.apps-wrap { padding: 0 8px 16px; }
.sb.col .apps-wrap { padding: 0 0 8px; }

.apps-sec {
  display: flex; align-items: center; gap: 4px;
  padding: 8px 8px 4px;
  font-family: 'Lato', sans-serif;
  font-size: 12px; font-weight: 500; color: #4A5567;
}
.sb.col .apps-sec { justify-content: center; padding: 8px 0 4px; }
.sb.col .apps-sec .sec-lbl { display: none; }
.sb.col .apps-sec .sec-crt { display: none; }

.apps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px; padding: 4px 0;
}
/* 8th tile (Slides) forced to col 1 → produces Figma's 4/3/2 row layout */
.apps-grid .app-tile:nth-child(8) { grid-column: 1; }
.sb.col .apps-grid { display: flex; flex-direction: column; align-items: center; gap: 4px; }

.app-tile {
  display: flex; flex-direction: column;
  align-items: center; gap: 4px;
  padding: 4px 0; border-radius: 8px;
  cursor: pointer; position: relative;
}
.app-tile:hover { background: #E8F0FE; }

.app-circ {
  width: 32px; height: 32px; border-radius: 50%;
  background: #EEF0F4; border: 1.5px solid #DDE1E8;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.app-lbl {
  font-size: 10px; font-weight: 500; color: #353F4F;
  text-align: center; line-height: 1.2;
}
.sb.col .app-lbl { display: none; }

.sb.col .app-tile:hover::after {
  content: attr(data-label);
  position: absolute; left: calc(100% + 8px);
  top: 50%; transform: translateY(-50%);
  background: #222B3A; color: #fff;
  font-size: 12px; font-weight: 500;
  padding: 4px 10px; border-radius: 4px;
  white-space: nowrap; z-index: 300; pointer-events: none;
}
`;

  /* ─── HTML template ───────────────────────────────────────────────────── */
  var SEC_CARET = '<svg class="sec-crt" width="8" height="5" viewBox="0 0 10 6" fill="none"><path d="M4.29 5.71C4.68 6.1 5.32 6.1 5.71 5.71L9.71 1.71C10 1.42 10.08.99 9.92.62 9.77.24 9.4 0 9 0H1C.6 0 .23.25.08.62c-.16.38-.07.81.21 1.1L4.29 5.71z" fill="#677489"/></svg>';

  var HTML = `
    <div class="sb-card">
      <div class="sb-hdr">
        <div class="logo-wm" data-icon="wordmark"></div>
        <div class="logo-ic" data-icon="logoMark"></div>
        <button class="col-btn" onclick="toggleSB()" aria-label="Toggle sidebar">
          <span id="cicon" data-icon="collapseLeft"></span>
        </button>
      </div>

      <div class="sb-nav">

        <div class="ni home" data-label="Home">
          <div class="ni-ic" data-icon="home"></div>
          <span class="ni-lbl">Home</span>
        </div>

        <div class="dv"></div>

        <div class="nav-section">
          <div class="sec">${SEC_CARET}<span class="sec-lbl">Reporting &amp; Analytics</span></div>
          <div class="ni" data-label="Cube BI"><div class="ni-ic" data-icon="cubeBI"></div><span class="ni-lbl">Cube BI</span></div>
          <div class="ni" data-label="Boards"><div class="ni-ic" data-icon="boards"></div><span class="ni-lbl">Boards</span></div>
          <div class="ni" data-label="Smart Variance"><div class="ni-ic" data-icon="smartVariance"></div><span class="ni-lbl">Smart Variance</span></div>
          <div class="ni" data-label="Cube AI"><div class="ni-ic" data-icon="aiAnalyst"></div><span class="ni-lbl">Cube AI</span></div>
        </div>

        <div class="dv"></div>

        <div class="nav-section">
          <div class="sec">${SEC_CARET}<span class="sec-lbl">Planning</span></div>
          <div class="ni" data-label="Scenarios"><div class="ni-ic" data-icon="scenarios"></div><span class="ni-lbl">Scenarios</span></div>
          <div class="ni" data-label="Workflows"><div class="ni-ic" data-icon="workflows"></div><span class="ni-lbl">Workflows</span></div>
          <div class="ni" data-label="Library"><div class="ni-ic" data-icon="library"></div><span class="ni-lbl">Library</span></div>
          <div class="ni-sub-wrap">
            <a class="ni-sub" data-label="Reports"><span>Reports</span></a>
            <a class="ni-sub" data-label="Files"><span>Files</span></a>
          </div>
        </div>

        <div class="dv"></div>

        <div class="nav-section">
          <div class="sec">${SEC_CARET}<span class="sec-lbl">Modeling</span></div>
          <div class="ni" data-label="Dimensions"><div class="ni-ic" data-icon="dimensions"></div><span class="ni-lbl">Dimensions</span></div>
          <div class="ni" data-label="Formulas"><div class="ni-ic" data-icon="formulas"></div><span class="ni-lbl">Formulas</span></div>
          <div class="ni" data-label="Tags"><div class="ni-ic" data-icon="tags"></div><span class="ni-lbl">Tags</span></div>
        </div>

        <div class="dv"></div>

        <div class="nav-section">
          <div class="sec">${SEC_CARET}<span class="sec-lbl">Data</span></div>
          <div class="ni" data-label="Integrations"><div class="ni-ic" data-icon="integrations"></div><span class="ni-lbl">Integrations</span></div>
          <div class="ni" data-label="Data Export"><div class="ni-ic" data-icon="dataExport"></div><span class="ni-lbl">Data Export</span></div>
        </div>

        <div class="dv"></div>

        <div class="nav-section">
          <div class="sec">${SEC_CARET}<span class="sec-lbl">Admin</span></div>
          <div class="ni" data-label="Users"><div class="ni-ic" data-icon="users"></div><span class="ni-lbl">Users</span></div>
          <div class="ni" data-label="Currencies"><div class="ni-ic" data-icon="currencies"></div><span class="ni-lbl">Currencies</span></div>
          <div class="ni" data-label="Audit Trail"><div class="ni-ic" data-icon="auditTrail"></div><span class="ni-lbl">Audit Trail</span></div>
          <div class="ni" data-label="Usages"><div class="ni-ic" data-icon="usages"></div><span class="ni-lbl">Usages</span></div>
        </div>

        <div class="dv"></div>

        <div class="apps-wrap">
          <div class="apps-sec">${SEC_CARET}<span class="sec-lbl">Apps</span></div>
          <div class="apps-grid">
            <div class="app-tile" data-label="AI Plugin"><div class="app-circ" data-icon="aiPlugin"></div><span class="app-lbl">AI Plugin</span></div>
            <div class="app-tile" data-label="ChatGPT"><div class="app-circ" data-icon="chatgpt"></div><span class="app-lbl">ChatGPT</span></div>
            <div class="app-tile" data-label="Claude"><div class="app-circ" data-icon="claude"></div><span class="app-lbl">Claude</span></div>
            <div class="app-tile" data-label="Excel"><div class="app-circ" data-icon="excel"></div><span class="app-lbl">Excel</span></div>
            <div class="app-tile" data-label="Sheets"><div class="app-circ" data-icon="sheets"></div><span class="app-lbl">Sheets</span></div>
            <div class="app-tile" data-label="Slack"><div class="app-circ" data-icon="slack"></div><span class="app-lbl">Slack</span></div>
            <div class="app-tile" data-label="Teams"><div class="app-circ" data-icon="teams"></div><span class="app-lbl">Teams</span></div>
            <div class="app-tile" data-label="Slides"><div class="app-circ" data-icon="slides"></div><span class="app-lbl">Slides</span></div>
            <div class="app-tile" data-label="PowerPoint"><div class="app-circ" data-icon="powerpoint"></div><span class="app-lbl">PowerPoint</span></div>
          </div>
        </div>

      </div>
    </div>
  `;

  /* ─── Style injection (once per page) ────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById('portal-sidebar-styles')) return;
    var style = document.createElement('style');
    style.id = 'portal-sidebar-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ─── Custom element ─────────────────────────────────────────────────── */
  class PortalSidebar extends HTMLElement {
    connectedCallback() {
      injectStyles();

      this.id = 'sb';
      this.classList.add('sb');
      this.innerHTML = HTML;

      /* Set active nav item from active="Label" attribute */
      var active = this.getAttribute('active') || 'Home';
      this.querySelectorAll('.ni[data-label], .ni-sub[data-label]').forEach(function (el) {
        if (el.getAttribute('data-label') === active) el.classList.add('active');
      });

      /* Nav-click: move active class across all .ni items */
      var allNi = this.querySelectorAll('.ni');
      allNi.forEach(function (ni) {
        ni.addEventListener('click', function () {
          allNi.forEach(function (i) { i.classList.remove('active'); });
          ni.classList.add('active');
        });
      });
    }
  }

  if (!customElements.get('portal-sidebar')) {
    customElements.define('portal-sidebar', PortalSidebar);
  }

  /* ─── Collapse toggle (called by collapse button onclick) ────────────── */
  window.toggleSB = function () {
    var s = document.getElementById('sb');
    if (!s) return;
    var collapsed = s.classList.toggle('col');
    var ic = document.getElementById('cicon');
    if (ic && window.SIDEBAR_ICONS) {
      ic.innerHTML = collapsed
        ? window.SIDEBAR_ICONS.collapseRight
        : window.SIDEBAR_ICONS.collapseLeft;
    }
  };

}());
