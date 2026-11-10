#!/usr/bin/env node
// sync-tokens-to-figma.js
// Syncs tokens.css → Figma Variables (Primitives collection).
// Run order: colors → spacing → radius → border-width → shadows.
//
// Usage:
//   export FIGMA_API_KEY=your_personal_access_token
//   node sync-tokens-to-figma.js
//
// Requires Node 18+ (built-in fetch).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const FILE_KEY   = 'Q7G87Bmjx2aYNVDKYLlBaG';
const TOKENS_CSS = path.join(__dirname, 'tokens', 'tokens.css');
const COLLECTION = 'Primitives';

// ── Auth ─────────────────────────────────────────────────────────────────────

const API_KEY = process.env.FIGMA_API_KEY;
if (!API_KEY) {
  console.error('Error: FIGMA_API_KEY is not set.');
  console.error('Run:   export FIGMA_API_KEY=your_personal_access_token');
  process.exit(1);
}

// ── CSS parsers ───────────────────────────────────────────────────────────────

// Returns { '--color-gray-100': '#F8FAFC', ... }
function parseColorTokens(css) {
  const out = {};
  const re = /--color-([\w-]+)\s*:\s*(#[0-9A-Fa-f]{6,8})/g;
  let m;
  while ((m = re.exec(css)) !== null) out[`--color-${m[1]}`] = m[2].toUpperCase();
  return out;
}

// Returns { '--spacing-1': 4, '--spacing-2': 8, ... }  (pixel values as numbers)
function parseSpacingTokens(css) {
  const out = {};
  const re = /--spacing-([\w]+)\s*:\s*(\d+)px/g;
  let m;
  while ((m = re.exec(css)) !== null) out[`--spacing-${m[1]}`] = parseInt(m[2], 10);
  return out;
}

// Returns { '--radius-sm': 4, '--radius-full': 9999, ... }
function parseRadiusTokens(css) {
  const out = {};
  const re = /--radius-([\w-]+)\s*:\s*(\d+)px/g;
  let m;
  while ((m = re.exec(css)) !== null) out[`--radius-${m[1]}`] = parseInt(m[2], 10);
  return out;
}

// Returns { '--border-width-sm': 1, ... }  (empty if no tokens exist)
function parseBorderWidthTokens(css) {
  const out = {};
  const re = /--border-width-([\w-]+)\s*:\s*(\d+)px/g;
  let m;
  while ((m = re.exec(css)) !== null) out[`--border-width-${m[1]}`] = parseInt(m[2], 10);
  return out;
}

// Returns { '--shadow-xs': '0px 1px 2px rgba(16, 24, 40, 0.05)', ... }
function parseShadowTokens(css) {
  const out = {};
  const re = /--shadow-([\w-]+)\s*:\s*([^;]+)/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    const val = m[2].replace(/\/\*.*?\*\//g, '').trim();
    if (val) out[`--shadow-${m[1]}`] = val;
  }
  return out;
}

// ── Name mapping ──────────────────────────────────────────────────────────────
// CSS  --color-white       → Figma  base/white
// CSS  --color-black       → Figma  base/black
// CSS  --color-gray-100    → Figma  gray/100
// CSS  --spacing-4         → Figma  spacing/4
// CSS  --radius-sm         → Figma  radius/sm
// CSS  --border-width-sm   → Figma  border-width/sm
// CSS  --shadow-xs         → Figma  shadow/xs

function colorToFigmaName(cssVar) {
  const name = cssVar.replace('--color-', '');
  if (name === 'white') return 'base/white';
  if (name === 'black') return 'base/black';
  const i = name.lastIndexOf('-');
  return i === -1 ? name : name.slice(0, i) + '/' + name.slice(i + 1);
}
const spacingToFigmaName     = v => v.replace('--spacing-',      'spacing/');
const radiusToFigmaName      = v => v.replace('--radius-',       'radius/');
const borderWidthToFigmaName = v => v.replace('--border-width-', 'border-width/');
const shadowToFigmaName      = v => v.replace('--shadow-',       'shadow/');

// ── Color helpers ─────────────────────────────────────────────────────────────

function hexToRgba(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
  };
}

function rgbaToHex({ r, g, b }) {
  const x = v => Math.round(v * 255).toString(16).padStart(2, '0').toUpperCase();
  return `#${x(r)}${x(g)}${x(b)}`;
}

function colorsMatch(figmaColor, hex) {
  const t = hexToRgba(hex);
  return (
    Math.round(figmaColor.r * 255) === Math.round(t.r * 255) &&
    Math.round(figmaColor.g * 255) === Math.round(t.g * 255) &&
    Math.round(figmaColor.b * 255) === Math.round(t.b * 255)
  );
}

// Alias variables have value = { type: 'VARIABLE_ALIAS', id: '...' }
function isAlias(value) {
  return value !== null && typeof value === 'object' && 'type' in value;
}

// ── Figma REST API ────────────────────────────────────────────────────────────

async function figmaGet(endpoint) {
  const res = await fetch(`https://api.figma.com/v1${endpoint}`, {
    headers: { 'X-Figma-Token': API_KEY },
  });
  if (!res.ok) throw new Error(`GET ${endpoint} → ${res.status} ${await res.text()}`);
  return res.json();
}

async function figmaPost(endpoint, body) {
  const res = await fetch(`https://api.figma.com/v1${endpoint}`, {
    method: 'POST',
    headers: { 'X-Figma-Token': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${endpoint} → ${res.status} ${await res.text()}`);
  return res.json();
}

// ── Diff engine ───────────────────────────────────────────────────────────────

function diffGroup({ tokens, varsByName, modeId, collectionId, nameFn, resolvedType, scopes, valueForPayload, valuesMatch, formatOld }) {
  const updates = [], creates = [], inSync = [], skipped = [];

  for (const [cssVar, tokenValue] of Object.entries(tokens)) {
    const figmaName = nameFn(cssVar);
    const existing  = varsByName[figmaName];

    if (!existing) {
      creates.push({
        cssVar, figmaName, tokenValue,
        varPayload: { action: 'CREATE', id: `tmp:${figmaName}`, name: figmaName, variableCollectionId: collectionId, resolvedType, scopes },
        modePayload: { variableId: `tmp:${figmaName}`, modeId, value: valueForPayload(tokenValue) },
      });
      continue;
    }

    const current = existing.valuesByMode[modeId];
    if (isAlias(current)) { skipped.push(figmaName); continue; }

    if (valuesMatch(current, tokenValue)) {
      inSync.push(figmaName);
    } else {
      updates.push({
        cssVar, figmaName,
        oldDisplay: formatOld(current),
        newDisplay: String(tokenValue),
        modePayload: { variableId: existing.id, modeId, value: valueForPayload(tokenValue) },
      });
    }
  }

  return { updates, creates, inSync, skipped };
}

// ── Sync runner ───────────────────────────────────────────────────────────────

async function syncGroup(label, diff) {
  const { updates, creates, inSync, skipped } = diff;

  console.log(`\n── ${label} ${'─'.repeat(Math.max(0, 44 - label.length))}`);
  console.log(`  Will update  : ${updates.length}`);
  console.log(`  Will create  : ${creates.length}`);
  console.log(`  Already in sync: ${inSync.length}`);
  console.log(`  Aliased (skipped): ${skipped.length}`);

  if (updates.length === 0 && creates.length === 0) {
    console.log('  ✓ Nothing to do.');
    return;
  }

  if (updates.length > 0) {
    console.log('\n  Updating:');
    for (const u of updates) {
      console.log(`    ${u.figmaName.padEnd(28)} ${u.oldDisplay} → ${u.newDisplay}`);
    }
  }
  if (creates.length > 0) {
    console.log('\n  Creating:');
    for (const c of creates) {
      console.log(`    ${c.figmaName.padEnd(28)} ${String(c.tokenValue)}  (new)`);
    }
  }

  await figmaPost(`/files/${FILE_KEY}/variables`, {
    variableCollections: [],
    variableModes: [],
    variables: creates.map(c => c.varPayload),
    variableModeValues: [
      ...updates.map(u => u.modePayload),
      ...creates.map(c => c.modePayload),
    ],
  });

  const parts = [];
  if (updates.length) parts.push(`${updates.length} updated`);
  if (creates.length) parts.push(`${creates.length} created`);
  console.log(`\n  ✓ ${parts.join(', ')}.`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Parse tokens.css
  console.log('Reading tokens.css…');
  const css = fs.readFileSync(TOKENS_CSS, 'utf-8');

  const colorTokens       = parseColorTokens(css);
  const spacingTokens     = parseSpacingTokens(css);
  const radiusTokens      = parseRadiusTokens(css);
  const borderWidthTokens = parseBorderWidthTokens(css);
  const shadowTokens      = parseShadowTokens(css);

  console.log(`  Colors: ${Object.keys(colorTokens).length}  |  Spacing: ${Object.keys(spacingTokens).length}  |  Radius: ${Object.keys(radiusTokens).length}  |  Border-width: ${Object.keys(borderWidthTokens).length}  |  Shadows: ${Object.keys(shadowTokens).length}`);

  // 2. Fetch Figma variables
  console.log('\nFetching Figma variables…');
  const { meta } = await figmaGet(`/files/${FILE_KEY}/variables/local`);
  const { variables, variableCollections } = meta;

  // Ensure the Primitives collection exists
  const primitives = Object.values(variableCollections).find(c => c.name === COLLECTION);
  if (!primitives) throw new Error(`Collection "${COLLECTION}" not found in Figma file. Run the initial sync first.`);

  const modeId = primitives.modes[0].modeId;
  const varsByName = {};
  for (const v of Object.values(variables)) varsByName[v.name] = v;
  console.log(`  Found ${Object.keys(varsByName).length} existing variables in "${COLLECTION}"`);

  const base = { varsByName, modeId, collectionId: primitives.id };

  // 3. Colors
  await syncGroup('Colors', diffGroup({
    ...base, tokens: colorTokens, nameFn: colorToFigmaName,
    resolvedType: 'COLOR', scopes: ['ALL_SCOPES'],
    valueForPayload: hexToRgba,
    valuesMatch: (cur, hex) => !isAlias(cur) && typeof cur === 'object' && colorsMatch(cur, hex),
    formatOld: cur => typeof cur === 'object' && !isAlias(cur) ? rgbaToHex(cur) : '(alias)',
  }));

  // 4. Spacing
  await syncGroup('Spacing', diffGroup({
    ...base, tokens: spacingTokens, nameFn: spacingToFigmaName,
    resolvedType: 'FLOAT', scopes: ['WIDTH_HEIGHT', 'GAP'],
    valueForPayload: v => v,
    valuesMatch: (cur, val) => typeof cur === 'number' && cur === val,
    formatOld: cur => typeof cur === 'number' ? `${cur}px` : '(alias)',
  }));

  // 5. Border Radius
  await syncGroup('Border Radius', diffGroup({
    ...base, tokens: radiusTokens, nameFn: radiusToFigmaName,
    resolvedType: 'FLOAT', scopes: ['CORNER_RADIUS'],
    valueForPayload: v => v,
    valuesMatch: (cur, val) => typeof cur === 'number' && cur === val,
    formatOld: cur => typeof cur === 'number' ? `${cur}px` : '(alias)',
  }));

  // 6. Border Width (parses --border-width-* tokens; currently none exist in tokens.css)
  await syncGroup('Border Width', diffGroup({
    ...base, tokens: borderWidthTokens, nameFn: borderWidthToFigmaName,
    resolvedType: 'FLOAT', scopes: ['STROKE_FLOAT'],
    valueForPayload: v => v,
    valuesMatch: (cur, val) => typeof cur === 'number' && cur === val,
    formatOld: cur => typeof cur === 'number' ? `${cur}px` : '(alias)',
  }));

  // 7. Shadows (stored as STRING — Figma has no native shadow variable type)
  await syncGroup('Shadows', diffGroup({
    ...base, tokens: shadowTokens, nameFn: shadowToFigmaName,
    resolvedType: 'STRING', scopes: ['ALL_SCOPES'],
    valueForPayload: v => v,
    valuesMatch: (cur, val) => typeof cur === 'string' && cur === val,
    formatOld: cur => typeof cur === 'string' ? cur.slice(0, 30) + '…' : '(alias)',
  }));

  console.log('\n✓ Sync complete.\n');
}

main().catch(err => {
  console.error('\nError:', err.message);
  process.exit(1);
});
