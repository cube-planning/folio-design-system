// TabGroup — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Tab Group (node 215:27676, Input-Tab page)
//
// Judgment call: the Figma node is purely a layout container of Tab instances (a "Primary" strip
// of card-style tabs, or a "Secondary" strip of underline tabs) — every visual state (active/inactive
// colors, borders, underline) already lives in components/Tab.jsx. TabGroup does not re-render any
// of that; it just lays Tab instances out in a row and tracks which index is active, composing the
// existing Tab component rather than duplicating its styles.
//
//   tabs       : [{ label, icon? }]
//   activeIndex: index of the active tab
//   onChange   : (index) => void
//   type       : "primary" (card-style, matches Figma's w-[270px] fixed strip) | "secondary" (underline,
//                Figma's 8px-gapped strip) — passed straight through to each Tab

import { Tab } from "./Tab.jsx";

export function TabGroup({ tabs = [], activeIndex = 0, onChange, type = "primary" }) {
  const gap = type === "secondary" ? 8 : 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap,
        fontFamily: "'DM Sans', sans-serif",
      }}
      role="tablist"
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab.label ?? i}
          type={type}
          active={i === activeIndex}
          first={i === 0}
          icon={tab.icon}
          onClick={() => onChange?.(i)}
        >
          {tab.label}
        </Tab>
      ))}
    </div>
  );
}
