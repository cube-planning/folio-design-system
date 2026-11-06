import { useState } from "react";

const C = {
  navy: "#12264d", navyDark: "#0a1229", green: "#70cf98", greenDk: "#30886c",
  blue: "#163d83", purple: "#7C3AED", gray: "#64748B", grayLt: "#F1F5F9",
  border: "#E2E8F0", red: "#e0564c", amber: "#D97706", white: "#fff"
};

const users = [
  { name: "Sarah Chen", role: "Finance", ask: 4250, build: 1875, mcp: 340 },
  { name: "Mike Rodriguez", role: "Admin", ask: 3100, build: 3750, mcp: 215 },
  { name: "Ben Taylor", role: "Business", ask: 1875, build: 0, mcp: 0 },
  { name: "Lisa Park", role: "Finance", ask: 2500, build: 625, mcp: 890 },
  { name: "Alex Kim", role: "Admin", ask: 750, build: 250, mcp: 2150 },
  { name: "Jordan Lee", role: "Finance", ask: 1250, build: 1250, mcp: 175 },
];
users.forEach(u => u.total = u.ask + u.build + u.mcp);

const months = [
  { m: "Jan", v: 2800 }, { m: "Feb", v: 3200 }, { m: "Mar", v: 4100 },
  { m: "Apr", v: 3800 }, { m: "May", v: 5200 }, { m: "Jun", v: 4600 }, { m: "Jul", v: 5100 }
];

const packs = [
  { c: "1,000", p: "$100", q: 40 },
  { c: "5,000", p: "$500", q: 200 },
  { c: "10,000", p: "$1,000", q: 400 },
  { c: "25,000", p: "$2,500", q: 1000 },
  { c: "50,000", p: "$5,000", q: 2000 },
];

const CONSUMED = 28845, ALLOC = 50000;

function Bar({ pct, color, h = 8 }) {
  return (
    <div style={{ background: "#E8ECF1", borderRadius: h/2, height: h, width: "100%" }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: color, borderRadius: h/2, transition: "width 0.5s" }} />
    </div>
  );
}

function Card({ children, style }) {
  return <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px", ...style }}>{children}</div>;
}

function NavItem({ label, active, indent }) {
  return (
    <div style={{
      padding: indent ? "8px 20px 8px 32px" : "9px 20px", fontSize: 13,
      color: active ? C.white : "rgba(255,255,255,0.45)", fontWeight: active ? 600 : 400,
      background: active ? "rgba(255,255,255,0.08)" : "transparent",
      borderLeft: active ? `3px solid ${C.green}` : "3px solid transparent",
      cursor: "pointer", transition: "all 0.15s"
    }}>{label}</div>
  );
}

export default function App() {
  const [view, setView] = useState("admin");
  const [showModal, setShowModal] = useState(false);
  const [selPack, setSelPack] = useState(null);
  const [bought, setBought] = useState(false);
  const [sortBy, setSortBy] = useState("total");
  const [asc, setAsc] = useState(false);
  const [period, setPeriod] = useState("ytd");

  const isGate = view === "gate";
  const consumed = isGate ? 50000 : CONSUMED;
  const remaining = ALLOC - consumed;
  const pct = Math.round((consumed / ALLOC) * 100);

  const sorted = [...users].sort((a, b) => asc ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]);
  const doSort = (col) => { if (sortBy === col) setAsc(!asc); else { setSortBy(col); setAsc(false); } };
  const arrow = (col) => <span style={{ opacity: sortBy === col ? 1 : 0.3, marginLeft: 3, fontSize: 9 }}>{sortBy === col && asc ? "▲" : "▼"}</span>;

  const maxM = Math.max(...months.map(m => m.v));

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", background: "#F8FAFC", fontSize: 13 }}>
      {/* Sidebar */}
      <div style={{ width: 200, background: C.navyDark, padding: "16px 0", flexShrink: 0, minHeight: "100vh" }}>
        <div style={{ padding: "0 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: C.green }}>cube</span>
          <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>ATX Associates</div>
        </div>
        <div style={{ padding: "10px 0 4px" }}>
          {["Dashboard", "Reports", "Boards", "Tables", "AI Analyst"].map(i => <NavItem key={i} label={i} />)}
        </div>
        <div style={{ padding: "10px 20px 4px", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: 1.2 }}>Admin</div>
        {["Users", "Permissions"].map(i => <NavItem key={i} label={i} />)}
        <NavItem label="Usage" active />
        {["Audit Trail"].map(i => <NavItem key={i} label={i} />)}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "24px 28px", maxWidth: 960, overflow: "auto" }}>
        {/* View Toggle */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, background: C.grayLt, borderRadius: 8, padding: 3, width: "fit-content" }}>
          {[["admin", "Admin View"], ["gate", "Hard Gate (0 credits)"], ["personal", "Personal View"]].map(([k, l]) => (
            <button key={k} onClick={() => setView(k)} style={{
              padding: "6px 14px", fontSize: 11, fontWeight: 600, borderRadius: 6, border: "none", cursor: "pointer",
              background: view === k ? C.white : "transparent", color: view === k ? C.navy : C.gray,
              boxShadow: view === k ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
            }}>{l}</button>
          ))}
        </div>

        {/* Gate Banner */}
        {isGate && (
          <div style={{ background: "#FEE2E2", border: `1px solid ${C.red}`, borderRadius: 10, padding: "14px 20px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#991B1B" }}>Your workspace has used all its AI credits.</div>
              <div style={{ fontSize: 12, color: "#B91C1C", marginTop: 2 }}>All AI features are blocked until credits are purchased.</div>
            </div>
            <button onClick={() => setShowModal(true)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: C.red, color: C.white, fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>
              Purchase Credits
            </button>
          </div>
        )}

        {/* Personal View */}
        {view === "personal" ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: C.navy, margin: 0 }}>Your AI Credit Usage</h1>
                <p style={{ fontSize: 12, color: C.gray, margin: "3px 0 0" }}>Personal consumption for the current contract year.</p>
              </div>
            </div>
            <Card style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.gray, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Your Total Usage</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: C.navy }}>4,250</div>
              <div style={{ fontSize: 11, color: C.gray }}>credits consumed this year</div>
            </Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { label: "AI Analyst", val: "3,500", sub: "140 questions", color: C.greenDk },
                { label: "Smart Analysis", val: "500", sub: "20 runs", color: C.greenDk },
                { label: "Smart Forecast", val: "250", sub: "2 forecasts", color: C.blue },
              ].map((f, i) => (
                <Card key={i}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: f.color, marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.navy }}>{f.val}</div>
                  <div style={{ fontSize: 10, color: C.gray }}>{f.sub}</div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Admin / Gate Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: C.navy, margin: 0 }}>AI Credit Usage</h1>
                <p style={{ fontSize: 12, color: C.gray, margin: "3px 0 0" }}>Monitor workspace consumption and purchase packs.</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <select value={period} onChange={e => setPeriod(e.target.value)} style={{ padding: "7px 10px", borderRadius: 7, border: `1px solid ${C.border}`, fontSize: 12, color: C.navy, background: C.white }}>
                  <option value="month">Current Month</option>
                  <option value="3mo">Last 3 Months</option>
                  <option value="ytd">Year to Date</option>
                  <option value="full">Full Year</option>
                </select>
                <button style={{ padding: "7px 14px", borderRadius: 7, border: `1px solid ${C.border}`, fontSize: 12, color: C.navy, background: C.white, cursor: "pointer" }}>Export CSV</button>
                <button onClick={() => setShowModal(true)} style={{ padding: "7px 16px", borderRadius: 7, border: "none", fontSize: 12, color: C.white, background: C.greenDk, cursor: "pointer", fontWeight: 600 }}>Purchase Credits</button>
              </div>
            </div>

            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
              {[
                { label: "Allocated", val: "50,000", sub: "50,000 base + 0 purchased", color: C.navy },
                { label: "Consumed", val: consumed.toLocaleString(), sub: `${pct}% of allocation`, color: C.navy },
                { label: "Remaining", val: remaining.toLocaleString(), sub: isGate ? "Projected EOY: 72,000" : "Projected EOY: 46,200", color: isGate ? C.red : C.greenDk },
                { label: "Alert Status", val: isGate ? "100%" : "50%", sub: isGate ? "HARD GATE ACTIVE" : "Threshold reached", color: isGate ? C.red : C.amber },
              ].map((c, i) => (
                <Card key={i}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.gray, textTransform: "uppercase", letterSpacing: 0.5 }}>{c.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: c.color, marginTop: 3 }}>{c.val}</div>
                  <div style={{ fontSize: 10, color: c.label === "Alert Status" && isGate ? C.red : C.gray, fontWeight: isGate && c.label === "Alert Status" ? 700 : 400, marginTop: 1 }}>{c.sub}</div>
                </Card>
              ))}
            </div>

            {/* Progress */}
            <Card style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.navy }}>Pool Consumption</span>
                <span style={{ fontSize: 12, color: C.gray }}>{consumed.toLocaleString()} / {ALLOC.toLocaleString()}</span>
              </div>
              <Bar pct={pct} color={isGate ? C.red : C.greenDk} h={10} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                {[{ l: "50%", c: C.amber, a: pct >= 50 }, { l: "75%", c: "#e08b4c", a: pct >= 75 }, { l: "90%", c: C.red, a: pct >= 90 }, { l: "100%", c: C.red, a: pct >= 100 }].map((t, i) => (
                  <span key={i} style={{ fontSize: 9, color: t.a ? t.c : "#CBD5E1", fontWeight: t.a ? 700 : 400 }}>{t.a ? "●" : "○"} {t.l}</span>
                ))}
              </div>
            </Card>

            {/* Two Col */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <Card>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 12 }}>Consumption by Tier</div>
                {[
                  { l: "Ask", v: isGate ? 24000 : 13725, c: C.greenDk, p: isGate ? 48 : 48 },
                  { l: "Build", v: isGate ? 18500 : 7750, c: C.blue, p: isGate ? 37 : 27 },
                  { l: "MCP", v: isGate ? 7500 : 7370, c: C.purple, p: isGate ? 15 : 25 },
                ].map((t, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: t.c }}>{t.l}</span>
                      <span style={{ fontSize: 11, color: C.gray }}>{t.v.toLocaleString()} ({t.p}%)</span>
                    </div>
                    <Bar pct={t.p} color={t.c} h={5} />
                  </div>
                ))}
              </Card>
              <Card>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 12 }}>Monthly Trend</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80, padding: "0 2px" }}>
                  {months.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <div style={{ width: "100%", maxWidth: 28, height: `${(d.v / maxM) * 65}px`, background: i === months.length - 1 ? C.greenDk : "#C8E6D8", borderRadius: 2 }} />
                      <span style={{ fontSize: 8, color: C.gray }}>{d.m}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: C.gray, marginTop: 8, textAlign: "center" }}>Soft cap: 6,250/mo. Current: 5,100.</div>
              </Card>
            </div>

            {/* Table */}
            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 10 }}>Per-User Breakdown</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "7px 10px", color: C.gray, fontWeight: 600, fontSize: 10 }}>User</th>
                    <th style={{ textAlign: "left", padding: "7px 10px", color: C.gray, fontWeight: 600, fontSize: 10 }}>Role</th>
                    {[["ask", "Ask"], ["build", "Build"], ["mcp", "MCP"], ["total", "Total"]].map(([k, l]) => (
                      <th key={k} onClick={() => doSort(k)} style={{ textAlign: "right", padding: "7px 10px", color: k === "total" ? C.navy : C.gray, fontWeight: 600, fontSize: 10, cursor: "pointer" }}>{l}{arrow(k)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((u, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 ? C.grayLt : "transparent" }}>
                      <td style={{ padding: "8px 10px", fontWeight: 600, color: C.navy }}>{u.name}</td>
                      <td style={{ padding: "8px 10px", color: C.gray }}>{u.role}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", color: C.greenDk }}>{u.ask.toLocaleString()}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", color: C.blue }}>{u.build.toLocaleString()}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", color: C.purple }}>{u.mcp.toLocaleString()}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: 700, color: C.navy }}>{u.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => { setShowModal(false); setSelPack(null); setBought(false); }}>
          <div style={{ background: C.white, borderRadius: 14, padding: "24px 28px", width: 380 }} onClick={e => e.stopPropagation()}>
            {!bought ? (<>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: C.navy, margin: "0 0 3px" }}>Purchase Credits</h2>
              <p style={{ fontSize: 12, color: C.gray, margin: "0 0 16px" }}>Select a pack. Credits available instantly.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {packs.map((p, i) => (
                  <div key={i} onClick={() => setSelPack(i)} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 14px", borderRadius: 8, cursor: "pointer",
                    border: selPack === i ? `2px solid ${C.greenDk}` : `1px solid ${C.border}`,
                    background: selPack === i ? "#f0faf4" : C.white
                  }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{p.c} credits</div>
                      <div style={{ fontSize: 10, color: C.gray }}>~{p.q} Ask questions</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: selPack === i ? C.greenDk : C.navy }}>{p.p}</div>
                  </div>
                ))}
              </div>
              <button disabled={selPack === null} onClick={() => setBought(true)} style={{
                width: "100%", padding: "10px", borderRadius: 8, border: "none",
                fontSize: 13, fontWeight: 700, marginTop: 14, cursor: selPack !== null ? "pointer" : "default",
                color: C.white, background: selPack !== null ? C.greenDk : "#CBD5E1"
              }}>
                {selPack !== null ? `Buy ${packs[selPack].c} credits for ${packs[selPack].p}` : "Select a pack"}
              </button>
            </>) : (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ width: 48, height: 48, borderRadius: 24, background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 22, color: C.greenDk }}>✓</div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: C.greenDk, margin: "0 0 6px" }}>Credits Added!</h2>
                <p style={{ fontSize: 12, color: C.gray, margin: "0 0 3px" }}>{packs[selPack].c} credits added to your workspace.</p>
                <p style={{ fontSize: 11, color: C.gray, margin: "0 0 16px" }}>AI features are now available. Invoice sent.</p>
                <button onClick={() => { setShowModal(false); setSelPack(null); setBought(false); }} style={{ padding: "9px 22px", borderRadius: 7, border: "none", fontSize: 13, fontWeight: 600, color: C.white, background: C.greenDk, cursor: "pointer" }}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
