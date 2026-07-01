const VARIANTS = {
  "display-1": { fontSize: 48, lineHeight: "60px", letterSpacing: "-0.02em" },
  "display-2": { fontSize: 36, lineHeight: "48px", letterSpacing: "-0.01em" },
  "display-3": { fontSize: 30, lineHeight: "40px", letterSpacing: 0 },
  "display-4": { fontSize: 24, lineHeight: "32px", letterSpacing: 0 },
  "title-1":   { fontSize: 20, lineHeight: "28px", letterSpacing: 0 },
  "title-2":   { fontSize: 18, lineHeight: "28px", letterSpacing: 0 },
  "title-3":   { fontSize: 16, lineHeight: "24px", letterSpacing: 0 },
  "body":      { fontSize: 14, lineHeight: "20px", letterSpacing: 0 },
  "caption-1": { fontSize: 12, lineHeight: "18px", letterSpacing: 0 },
  "caption-2": { fontSize: 10, lineHeight: "16px", letterSpacing: 0 },
};

const WEIGHTS = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
};

const DEFAULT_TAG = {
  "display-1": "h1",
  "display-2": "h2",
  "display-3": "h3",
  "display-4": "h4",
  "title-1":   "h5",
  "title-2":   "h6",
  "title-3":   "h6",
  "body":      "p",
  "caption-1": "span",
  "caption-2": "span",
};

export function Text({
  variant = "body",
  weight = "regular",
  mono = false,
  color,
  as,
  style,
  children,
  ...props
}) {
  const scale = VARIANTS[variant] ?? VARIANTS["body"];
  const Tag = as ?? DEFAULT_TAG[variant] ?? "span";

  const computedStyle = {
    fontFamily: mono ? "'JetBrains Mono', monospace" : "'DM Sans', sans-serif",
    fontSize: scale.fontSize,
    lineHeight: scale.lineHeight,
    letterSpacing: scale.letterSpacing,
    fontWeight: mono ? 400 : (WEIGHTS[weight] ?? 400),
    margin: 0,
    ...(color ? { color } : {}),
    ...style,
  };

  return (
    <Tag style={computedStyle} {...props}>
      {children}
    </Tag>
  );
}
