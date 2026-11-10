#!/usr/bin/env node
// Tests for the two decisions run-resync.mjs mirrors from .ds-sync/resync.mjs.
// These exist because those branches are otherwise only exercised by a real
// re-sync whose shape you can't choose — the sampled tier and the canary need
// a specific diff to fire, so before this they were shipped unverified.
//
// Run: node .design-sync/run-resync.test.mjs   (or: npm run design-sync:test)

import { renderTier, pickCanary } from './run-resync.mjs';

let failed = 0;
const eq = (name, actual, expected) => {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) { console.log(`  ✓ ${name}`); return; }
  console.log(`  ✗ ${name}\n      expected ${e}\n      actual   ${a}`);
  failed++;
};

const diff = (o) => ({ anchorReason: 'ok', changed: [], added: [], renderChurned: [], upload: { any: false, bundle: false, styling: false, aux: false }, ...o });

console.log('\nrenderTier');
eq('anchored no-change re-sync -> skip',
  renderTier(diff({})).args, ['--no-render-check']);
eq('render-inert upload (docs/anchor only) -> sample ~10',
  renderTier(diff({ upload: { any: true, bundle: false, styling: false, aux: true } })).args, ['--render-sample', '10']);
eq('bundle ships -> full',
  renderTier(diff({ upload: { any: true, bundle: true, styling: false } })).args, []);
eq('styling ships -> full',
  renderTier(diff({ upload: { any: true, bundle: false, styling: true } })).args, []);
eq('a component changed -> full',
  renderTier(diff({ changed: ['Button'], upload: { any: true, bundle: false, styling: false } })).args, []);
eq('a component was added -> full',
  renderTier(diff({ added: ['NewThing'], upload: { any: true, bundle: false, styling: false } })).args, []);
eq('render churn -> full',
  renderTier(diff({ renderChurned: ['Badge'], upload: { any: true, bundle: false, styling: false } })).args, []);
eq('unhealthy anchor -> full even with nothing to ship',
  renderTier(diff({ anchorReason: 'not_provided' })).args, []);
eq('missing diff artifact -> full',
  renderTier(null).args, []);

console.log('\npickCanary');
const harness = (over = {}) => ({
  isCapturable: () => true,
  cardModeOf: () => undefined,
  capOf: () => ({ pendingGrade: false }),
  shuffle: (a) => a, // deterministic for tests
  ...over,
});

eq('no churn -> no picks',
  pickCanary(diff({}), [], harness()), []);
eq('churn -> picks the churned',
  pickCanary(diff({ renderChurned: ['Badge', 'Tag'] }), [], harness()), ['Badge', 'Tag']);
eq('bounded at 5',
  pickCanary(diff({ renderChurned: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] }), [], harness()).length, 5);
eq('worklist members are excluded (they get a full capture already)',
  pickCanary(diff({ renderChurned: ['Badge', 'Tag'] }), ['Badge'], harness()), ['Tag']);
eq('uncapturable (floor-card) members are dropped',
  pickCanary(diff({ renderChurned: ['Badge', 'Floor'] }), [], harness({ isCapturable: (n) => n !== 'Floor' })), ['Badge']);
eq('deduplicates',
  pickCanary(diff({ renderChurned: ['Badge', 'Badge'] }), [], harness()), ['Badge']);
eq('a single/column cardMode member is always kept in the picks',
  pickCanary(diff({ renderChurned: ['A', 'B', 'C', 'D', 'E', 'Drawer'] }), [],
    harness({ cardModeOf: (n) => (n === 'Drawer' ? 'single' : undefined) })).includes('Drawer'), true);
eq('a portal member counts as single too',
  pickCanary(diff({ renderChurned: ['A', 'B', 'C', 'D', 'E', 'Portal'] }), [],
    harness({ capOf: (n) => ({ pendingGrade: false, portal: n === 'Portal' }) })).includes('Portal'), true);
eq('graded members are preferred over ungraded',
  pickCanary(diff({ renderChurned: ['Ungraded', 'Graded'] }), [],
    harness({ capOf: (n) => ({ pendingGrade: n === 'Ungraded' }) })), ['Graded', 'Ungraded']);
eq('missing capture json is treated as ungraded, not a crash',
  pickCanary(diff({ renderChurned: ['Badge'] }), [], harness({ capOf: () => null })), ['Badge']);

console.log(failed ? `\n✗ ${failed} failing\n` : '\n✓ all passing\n');
process.exit(failed ? 1 : 0);
