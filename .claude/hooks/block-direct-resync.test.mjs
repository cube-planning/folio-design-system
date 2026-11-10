#!/usr/bin/env node
// Tests for the PreToolUse guard in block-direct-resync.sh.
//
// The fixtures live in this file rather than inline in a shell command on
// purpose: the guard is a LEXICAL match over the raw Bash command text and
// cannot tell code from quoted prose, so a shell one-liner containing these
// fixtures would itself be denied by the guard under test.
//
// Run: node .claude/hooks/block-direct-resync.test.mjs

import { execFileSync } from "node:child_process";

const HOOK = ".claude/hooks/block-direct-resync.sh";
const ask = (command) => {
  const out = execFileSync("sh", [HOOK], {
    input: JSON.stringify({ tool_name: "Bash", tool_input: { command } }),
    encoding: "utf8",
  });
  return out.trim() ? "deny" : "allow";
};

const P = "node .ds-sync/resync.mjs";
const cases = [
  // Real invocations — must be denied.
  ["deny", `${P} --config .design-sync/config.json --out ./ds-bundle`, "plain invocation"],
  ["deny", `cd /tmp && ${P} --out x`,                                  "after &&"],
  ["deny", `foo; ${P}`,                                               "after ;"],
  ["deny", `NODE_ENV=dev ${P} --out x`,                               "with env assignment"],
  ["deny", `   ${P}`,                                                 "leading whitespace"],
  ["deny", `ls | ${P}`,                                               "after a pipe"],

  // Prose that merely mentions it — must be allowed. This is the regression:
  // an earlier version denied `git commit` on a message describing the hook.
  ["allow", `git commit -m "guard denies direct \`${P}\` calls"`,      "commit message mentioning it"],
  ["allow", `echo "run ${P} at your peril"`,                          "echoed prose"],

  // Inspection — must stay allowed; reading the driver is how the mirrored
  // renderTier/pickCanary logic gets re-verified after a drift warning.
  ["allow", "grep -n canary .ds-sync/resync.mjs",                     "grep the driver"],
  ["allow", "sed -n 1,70p .ds-sync/resync.mjs",                       "sed the driver"],
  ["allow", "shasum -a 256 .ds-sync/resync.mjs",                      "shasum the driver"],
  ["allow", "cat .ds-sync/resync.mjs",                                "cat the driver"],

  // The sanctioned paths and unrelated commands.
  ["allow", "npm run design-sync",                                    "npm run design-sync"],
  ["allow", "node .design-sync/run-resync.mjs",                       "the wrapper itself"],
  ["allow", "node .ds-sync/package-validate.mjs ./ds-bundle",          "standalone validate"],
  ["allow", "node .ds-sync/package-capture.mjs --out ./ds-bundle",     "standalone capture"],
  ["allow", "ls",                                                     "unrelated command"],
];

let failed = 0;
for (const [want, command, label] of cases) {
  const got = ask(command);
  const ok = got === want;
  if (!ok) failed++;
  console.log(`  ${ok ? "✓" : "✗"} ${label.padEnd(34)} expected ${want}, got ${got}`);
}
console.log(failed ? `\n✗ ${failed} failing\n` : `\n✓ all ${cases.length} passing\n`);
process.exit(failed ? 1 : 0);
