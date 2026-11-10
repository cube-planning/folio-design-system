// Modal — Folio Design System
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) — confirmed intentional, generic addition.
// Centered dialog for confirmations, forms, and short focused tasks.
// Reuses Button for the header close action and all footer actions —
// never a raw <button> — and Folio color/spacing/shadow tokens throughout.
//
// Axes:
//   size   : "compact" (400px) | "default" (480px) | "large" (640px)
//   footer : pass <Button> elements (secondary/primary, or destructive for
//            destructive flows) — Modal only supplies layout, not the actions

import { Button } from "./Button.jsx";

const SIZE = {
  compact: 400,
  default: 480,
  large: 640,
};

export function Modal({
  open = true,
  size = "default",
  title,
  subtitle,
  onClose,
  footer,
  children,
  style,
}) {
  if (!open) return null;

  const width = SIZE[size] ?? SIZE.default;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--color-overlay-default)",
          zIndex: "var(--z-overlay)",
        }}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width,
          maxHeight: "calc(100vh - 64px)",
          background: "var(--color-white)",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "var(--shadow-lg)",
          zIndex: "var(--z-modal)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--font-base)",
          ...style,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "var(--spacing-4)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "var(--spacing-4)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-1)", minWidth: 0 }}>
            {title && (
              <h2
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--color-text-primary)",
                  lineHeight: "28px",
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--color-text-secondary)",
                  lineHeight: "20px",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {onClose && (
            <Button
              variant="ghost-gray"
              size="large"
              icon={<i className="fa-solid fa-xmark" aria-hidden="true" />}
              aria-label="Close modal"
              onClick={onClose}
            />
          )}
        </div>

        {/* Scrollable body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "var(--spacing-4)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
            fontSize: 14,
            color: "var(--color-text-primary)",
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: "var(--spacing-4)",
              borderTop: "1px solid var(--color-gray-200)",
              display: "flex",
              gap: "var(--spacing-2)",
              justifyContent: "flex-end",
              flexShrink: 0,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
