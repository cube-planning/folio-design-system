// FlowRow — Folio Design System (Composite)
// The wrapper for a Source -> Connection -> Destination overview: a tinted panel
// that lays its <FlowCard> children out in a 1fr 40px 1fr 40px 1fr grid and puts
// an arrow in each 40px column between them. Spec from the Integrations overview
// (Figma "Folio DS — 2026 UI Refresh — Eng Handoff", node 186:27964).
//
//   children     : the FlowCards, in order. Arrows are inserted between them.
//   marginBottom : space below the panel (default 24)
//
// FlowCard is a fixed 300px wide, so give the panel at least 300 x 3 + 40 x 2 +
// 48 (padding) = 1028px.

import { Children, cloneElement } from "react";

// Token-valued hexes, matching how the other composites inline theirs.
const COLORS = {
  panel: "#F8FAFC",   // gray-100
  border: "#E3E8EF",  // gray-300
  arrow: "#CDD5E0",   // gray-400
};

export function FlowRow({ children, marginBottom = 24 }) {
  const kids = Children.toArray(children);
  const out = [];
  kids.forEach((kid, i) => {
    if (i) {
      out.push(
        <div
          key={`arrow-${i}`}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.arrow, fontSize: 16 }}
        >
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </div>
      );
    }
    out.push(cloneElement(kid, { key: `card-${i}` }));
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 40px 1fr 40px 1fr",
        alignItems: "center",
        marginBottom,
        background: COLORS.panel,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: 24,
      }}
    >
      {out}
    </div>
  );
}
