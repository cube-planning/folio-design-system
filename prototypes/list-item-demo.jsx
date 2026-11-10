import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ListItem } from "../components/ListItem.jsx";

function Demo() {
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState("b");
  const [checkedMap, setCheckedMap] = useState({ a: "checked", b: "unchecked", c: "mixed" });

  function toggleCheck(key) {
    setCheckedMap((m) => ({ ...m, [key]: m[key] === "checked" ? "unchecked" : "checked" }));
  }

  return (
    <div style={{ display: "flex", gap: 48, padding: 32, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ width: 260 }}>
        <h3>Single Select</h3>
        <ListItem label="Parent category" tree expanded={expanded} onToggleExpand={() => setExpanded(e => !e)} />
        <ListItem label="Option A" level={1} selected={selected === "a"} onClick={() => setSelected("a")} />
        <ListItem label="Option B" level={1} selected={selected === "b"} onClick={() => setSelected("b")} />
        <ListItem label="Disabled option" level={1} disabled />
      </div>
      <div style={{ width: 260 }}>
        <h3>Multi Select (tree)</h3>
        <ListItem label="Region" multi tree expanded onToggleExpand={() => {}} checked="mixed" />
        <ListItem label="North" level={1} multi checked={checkedMap.a} onClick={() => toggleCheck("a")} />
        <ListItem label="South" level={1} multi checked={checkedMap.b} onClick={() => toggleCheck("b")} />
        <ListItem label="East" level={1} multi checked={checkedMap.c} onClick={() => toggleCheck("c")} />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Demo />);
