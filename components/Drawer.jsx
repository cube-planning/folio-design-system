const COLORS = {
  cobalt500: "#173D82",
  gray200:   "#E4E7EC",
  gray900:   "#101828",
  gray600:   "#475467",
  white:     "#FFFFFF",
};

export function Drawer({ open = true, title, subtitle, onClose, footer, children, style }) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.3)",
          zIndex: 40,
        }}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 400,
          background: COLORS.white,
          borderRadius: "16px 0 0 16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          fontFamily: "'DM Sans', sans-serif",
          ...style,
        }}
      >
        {/* Header */}
        <div style={{
          padding: 16,
          borderBottom: `2px solid ${COLORS.cobalt500}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexShrink: 0,
        }}>
          <div>
            {title && (
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: COLORS.gray900, lineHeight: "28px" }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: COLORS.gray600, lineHeight: "20px" }}>
                {subtitle}
              </p>
            )}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close drawer"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: COLORS.gray600, fontSize: 16, padding: 4,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Scrollable body */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: 16,
            borderTop: `1px solid ${COLORS.gray200}`,
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            flexShrink: 0,
          }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
