const COLORS = {
  cobalt800: "#0B1932",
  cobalt100: "#C6D3EC",
  gray800:   "#1D2939",
  gray300:   "#D0D5DD",
  gray50:    "#F9FAFB",
  green500:  "#229E66",
};

export function Badge({ variant = "lifecycle", children }) {
  if (variant === "lifecycle") {
    return (
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        paddingInline: 8,
        paddingBlock: 2,
        borderRadius: 9999,
        background: COLORS.cobalt100,
        color: COLORS.cobalt800,
        fontSize: 12,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        lineHeight: "18px",
        whiteSpace: "nowrap",
      }}>
        {children}
      </span>
    );
  }

  if (variant === "active") {
    return (
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        paddingLeft: 4,
        paddingRight: 8,
        paddingBlock: 3,
        borderRadius: 9999,
        background: COLORS.gray50,
        border: `1px solid ${COLORS.gray300}`,
        color: COLORS.gray800,
        fontSize: 12,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        lineHeight: "18px",
        whiteSpace: "nowrap",
      }}>
        <span style={{
          width: 6,
          height: 6,
          borderRadius: 9999,
          background: COLORS.green500,
          flexShrink: 0,
        }} aria-hidden="true" />
        {children}
      </span>
    );
  }

  return null;
}
