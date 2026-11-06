#!/usr/bin/env node
// run-resync.mjs — the one command to re-sync this package. Use this instead
// of calling .ds-sync/resync.mjs directly.
//
// WHY THIS EXISTS
//
// package-build.mjs opens with `rmSync(OUT, { recursive: true, force: true })`
// and has no preserve list, so every build wipes ds-bundle/ — including the
// Font Awesome files that tokens/tokens.css's
// `@import url("./fontawesome/css/all.min.css")` depends on. cfg.cssEntry is
// appended into _ds_bundle.css verbatim, @import and all, and the converter
// never resolves or copies the imported asset (cfg.extraEntries is
// JS-module-only; cfg.extraFonts drops the .fa-* glyph rules). There is no
// post-build hook.
//
// The consequence: .ds-sync/resync.mjs runs build -> diff -> validate ->
// capture in one process, so its OWN validate stage always fails
// [CSS_IMPORT_MISSING], its verdict is always ok:false, and capture is always
// skipped "prior_failure" — even on a perfectly healthy re-sync. That made the
// driver's verdict useless as a signal and buried real failures in an expected
// one.
//
// This wrapper restores a single trustworthy verdict by putting the copy where
// it belongs and re-running the stages it invalidated:
//
//   .ds-sync/resync.mjs   (build + diff authoritative; its validate/capture
//                          stages are expected to fail/skip — ignored here,
//                          and --no-render-check keeps that pass cheap)
//   copy-fontawesome.sh
//   package-validate.mjs  (authoritative, tiered — see renderTier)
//   package-capture.mjs   (changed + added worklist, plus the canary
//                          spot-check picks — see pickCanary)
//
// MIRRORED from the driver, as pure exported functions with tests in
// run-resync.test.mjs: the render-check tiering condition (renderTier) and the
// tier-1 canary pick (pickCanary). MIRRORED_DRIVER_SHA pins the driver version
// they were copied from and warns on drift. Both fail safe if stale — they
// over-render and over-capture, never under.
//
// NOT mirrored: the driver's reference-drift baseline handling, which is
// storybook-shape-only and cannot trigger on this package-shape repo.
// Grading the resulting sheets is still your job.
//
// Usage: node .design-sync/run-resync.mjs   (or: npm run design-sync)
//
// Fetch the anchor first, or the diff has nothing to compare against:
//   DesignSync get_file _ds_sync.json -> .design-sync/.cache/remote-sync.json

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = './ds-bundle';
const CONFIG = '.design-sync/config.json';
const REMOTE = '.design-sync/.cache/remote-sync.json';
const NM = './node_modules';
const ENTRY = './dist/index.js';
const GRADE_CACHE = resolve('.design-sync', '.cache', 'review'); // package shape

// This wrapper mirrors two decisions that live in .ds-sync/resync.mjs — the
// render-check tiering condition and the canary spot-check pick — so that
// skipping the driver's own validate/capture stages costs nothing. Both are
// hand-copied, which means a skill update can silently put them out of date.
// Pin the driver we mirrored: on mismatch, warn loudly and keep going (the
// mirrored logic degrades safely — it over-renders and over-captures — so a
// stale copy is a review prompt, never a hard stop).
const MIRRORED_DRIVER_SHA = '509db748227c1ea3';

const readJson = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } };
const run = (cmd, args) => spawnSync(cmd, args, { stdio: 'inherit' }).status ?? 1;
const die = (msg) => { console.error(`\n✗ ${msg}`); process.exit(1); };

// -- The two decisions mirrored from .ds-sync/resync.mjs, kept as pure
// functions so run-resync.test.mjs can exercise every branch without a build.

// Render-check tiering. With a healthy anchor, equal bundle+styling hashes and
// nothing changed/added/render-churned, every preview's render inputs are
// byte-identical to the last upload — re-rendering them tests the local
// chromium install, not the artifacts.
export function renderTier(diff) {
  const inert = diff?.anchorReason === 'ok' && diff.upload
    && !diff.upload.bundle && !diff.upload.styling
    && !(diff.changed?.length || diff.added?.length || diff.renderChurned?.length);
  if (!inert) return { args: [], label: 'full render check' };
  return diff.upload.any
    ? { args: ['--render-sample', '10'], label: 'render check sampled (~10): no component moved' }
    : { args: ['--no-render-check'], label: 'render check skipped: anchored no-change re-sync' };
}

// Tier-1 canary pick. Sources held but artifacts churned, so grades are KEPT
// and a bounded sample is re-captured for confirmation via its [SPOT_CHECK]
// sheet. The driver's reference-drift trigger is storybook-only (gated on
// shape === 'storybook'); this package-shape repo can only trigger on render
// churn, so that branch is intentionally absent.
export function pickCanary(diff, worklist, { isCapturable, cardModeOf, capOf, shuffle }) {
  const churned = (diff?.renderChurned ?? []).filter(isCapturable);
  const pool = [...new Set(churned)].filter((n) => !worklist.includes(n));
  if (!pool.length) return [];
  // Prefer picks with a recorded verdict to confirm against; one without is
  // captured fresh and surfaces as pending.
  const clean = (n) => capOf(n)?.pendingGrade === false;
  // Non-grid card modes render a different default view than the solo-graded
  // stories — keep at least one in the picks.
  const single = (n) => ['single', 'column'].includes(cardModeOf(n)) || capOf(n)?.portal === true;
  const picks = new Set();
  const singles = pool.filter(single);
  if (singles.length) picks.add(singles.find(clean) ?? singles[0]);
  const rest = shuffle(pool.filter((n) => !picks.has(n)));
  rest.sort((a, b) => Number(clean(b)) - Number(clean(a))); // stable: random within clean/unclean
  for (const n of rest) { if (picks.size >= 5) break; picks.add(n); }
  return [...picks];
}

// Run only when invoked directly; importing for tests must not run the pipeline.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();

function main() {
if (!existsSync('.ds-sync/resync.mjs')) {
  die('.ds-sync/ is not staged — re-stage the skill scripts first (see .design-sync/NOTES.md "Re-sync command")');
}

const driverSha = createHash('sha256').update(readFileSync('.ds-sync/resync.mjs')).digest('hex').slice(0, 16);
if (driverSha !== MIRRORED_DRIVER_SHA) {
  console.error(`! .ds-sync/resync.mjs changed since this wrapper mirrored it (${MIRRORED_DRIVER_SHA} -> ${driverSha}).`);
  console.error("  Re-check the render-check tiering block and the canary pick against the driver, then update");
  console.error(`  MIRRORED_DRIVER_SHA in ${'.design-sync/run-resync.mjs'}. Continuing — the mirrored logic fails safe.\n`);
}
if (!existsSync(REMOTE)) {
  console.error(`! ${REMOTE} is missing — the diff will run without an anchor and report every component as changed.`);
  console.error('  Fetch it first: DesignSync get_file _ds_sync.json -> that path.\n');
}

// -- 1. resync: build + diff. Its validate/capture stages are expected
// casualties of the wipe; only build and diff are authoritative here.
//
// --no-render-check is passed on purpose. resync's validate stage is going to
// fail [CSS_IMPORT_MISSING] no matter what, but it runs the full 56-preview
// render check on the way there — so without this flag every re-sync pays for
// two full chromium render passes and throws the first one away. The diff
// stage is unaffected (it runs before validate, and renderChurned comes from
// hashes, not from rendering); capture is scoped by .sync-diff.json, not by
// validate. The real render check happens in step 3.
console.error('── 1/4  build + diff (.ds-sync/resync.mjs)\n');
run(process.execPath, ['.ds-sync/resync.mjs',
  '--config', CONFIG, '--node-modules', NM, '--entry', ENTRY, '--out', OUT, '--remote', REMOTE,
  '--no-render-check']);

const verdict = readJson(resolve(OUT, '.resync-verdict.json'));
if (!verdict) die('no .resync-verdict.json — resync died before writing one (usage error?). Nothing was rebuilt.');
if (!verdict.stages?.build?.ok) die(`build stage failed (exit ${verdict.stages?.build?.exit}) — fix that first; ds-bundle/ is incomplete.`);
if (!verdict.stages?.diff?.ok) die(`diff stage failed (exit ${verdict.stages?.diff?.exit}) — check the anchor at ${REMOTE}.`);

if (verdict.learningsUnmerged?.length) {
  die(`unfolded learnings: ${verdict.learningsUnmerged.join(', ')} — fold them into NOTES.md/conventions.md before syncing.`);
}

// -- 2. the copy the build wiped. Must land before validate.
console.error('\n── 2/4  restoring Font Awesome into ds-bundle/\n');
if (run('sh', ['.design-sync/copy-fontawesome.sh']) !== 0) die('copy-fontawesome.sh failed');

// -- 3. the authoritative validate, tiered the way the driver would have
// tiered it. Mirrors the condition in .ds-sync/resync.mjs: with a healthy
// anchor, equal bundle+styling hashes and nothing changed/added/render-churned,
// every preview's render inputs are byte-identical to the last upload, so
// re-rendering them tests the local chromium install rather than the artifacts.
// Kept in sync with that block by hand — if a skill update changes the
// condition, this goes stale in the SAFE direction (it over-renders).
const diff = readJson(resolve(OUT, '.sync-diff.json'));
const tier = renderTier(diff);
console.error(`\n── 3/4  validate (authoritative) — ${tier.label}\n`);
if (run(process.execPath, ['.ds-sync/package-validate.mjs', OUT, ...tier.args]) !== 0) {
  die('validate failed — see the tagged lines above. Check each warn against NOTES.md "Known render warns"; one that is not recorded there is new.');
}

// -- 4. capture, scoped the way the driver would have scoped it.
//
// isCapturable, package shape: a compiled _preview/<Name>.js exists (i.e. an
// authored .design-sync/previews/<Name>.tsx). Floor-card components are the
// deliberate baseline, not gradable work — passing one through would either
// fail the stage [ZERO_MATCH] or park it in pendingGrade with no sheet ever
// coming to clear it.
const isCapturable = (n) => existsSync(resolve(OUT, '_preview', `${n}.js`));
const worklist = [...(diff?.changed ?? []), ...(diff?.added ?? [])].filter(isCapturable);

const cfgObj = readJson(resolve(CONFIG)) ?? {};
const capCache = new Map();
const canaryPicks = pickCanary(diff, worklist, {
  isCapturable,
  cardModeOf: (n) => cfgObj.overrides?.[n]?.cardMode,
  capOf: (n) => {
    if (!capCache.has(n)) capCache.set(n, readJson(join(GRADE_CACHE, `${n}.json`)));
    return capCache.get(n);
  },
  shuffle: (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
});

if (canaryPicks.length) {
  console.error(`\n◉ canary: ${diff.renderChurned.length} component(s) re-rendered with unchanged sources`
    + ` — spot-checking ${canaryPicks.length} with grades kept: ${canaryPicks.join(', ')}`);
}

if (worklist.length || canaryPicks.length) {
  const scope = worklist.length ? worklist : canaryPicks;
  console.error(`\n── 4/4  capture: ${scope.join(', ')}\n`);
  const args = ['.ds-sync/package-capture.mjs', '--out', OUT, '--components', scope.join(',')];
  if (canaryPicks.length) args.push('--spot-check-components', canaryPicks.join(','));
  if (run(process.execPath, args) !== 0) die('capture failed');
} else {
  console.error('\n── 4/4  capture: nothing to capture (no component sources moved)\n');
}

const up = diff?.upload;
console.error('─'.repeat(64));
console.error('✓ re-sync clean.');
if (up?.any) {
  const parts = [];
  if (up.components?.length) parts.push(`components: ${up.components.join(', ')}`);
  if (up.bundle) parts.push('bundle');
  if (up.styling) parts.push('styling');
  if (up.aux) parts.push('aux');
  console.error(`  upload: ${parts.join(' | ')}`);
  if (up.deletePaths?.length) console.error(`  delete: ${up.deletePaths.join(', ')}`);
  console.error('  Upload plan MUST include fontawesome/** — see NOTES.md.');
} else {
  console.error('  upload: nothing (no-change re-sync)');
}
if (worklist.length) console.error(`  grade these sheets: ${worklist.join(', ')}`);
if (canaryPicks.length) console.error(`  confirm these [SPOT_CHECK] sheets (grades kept): ${canaryPicks.join(', ')}`);
console.error('─'.repeat(64));
}
