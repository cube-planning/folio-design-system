import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Select } from "../components/Select.jsx";

function Demo() {
  const [single, setSingle] = useState(null);
  const [multi, setMulti] = useState([]);

  return (
    <div style={{ display: "flex", gap: 48, padding: 32, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ width: 240 }}>
        <Select
          label="Single select"
          placeholder="Choose one"
          options={["North", "South", "East", "West"]}
          value={single}
          onChange={setSingle}
        />
      </div>
      <div style={{ width: 240 }}>
        <Select
          label="Multi select"
          placeholder="Choose many"
          options={["North", "South", "East", "West"]}
          value={multi}
          multi
          onChange={setMulti}
        />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Demo />);
