// Fails if any page template's `.page-content` has a horizontal padding other than 24px.
// Rule: CLAUDE.md § "Page content margin". Full-bleed pages (padding: 0) are allowed
// but must be listed in FULL_BLEED, and their inner gutters must still be 24px.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FULL_BLEED = new Set(['templates/homepage.html', 'templates/cube-staff-connections.html']);
const bad = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) { check(p); checkWrapper(p); }
  }
}

function check(file) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/\.page-content\s*\{([^}]*)\}/g)) {
    const pad = m[1].match(/padding:\s*([^;]+)/);
    if (!pad) continue;
    const v = pad[1].trim();
    if (v === '24px' || (v === '0' && FULL_BLEED.has(file))) continue;
    bad.push(`${file}: .page-content padding is "${v}", expected 24px`);
  }
}

function checkWrapper(file) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/(?:^|\n)\s*\.pg\s*\{([^}]*)\}/g)) {
    if (/margin[^;]*auto|max-width/.test(m[1])) {
      bad.push(`${file}: .pg must not center or cap width (margin auto / max-width) - the left margin grows with the window`);
    }
  }
}

walk('templates');
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
console.log('page-content padding OK (24px everywhere)');
