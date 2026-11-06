#!/bin/sh
# PreToolUse(Bash) guard: refuse direct `node .ds-sync/resync.mjs` invocations.
#
# WHY: on this repo the driver's verdict is ALWAYS ok:false and its capture
# stage is ALWAYS skipped "prior_failure", even on a healthy re-sync —
# package-build.mjs wipes ds-bundle/ including the Font Awesome files that
# tokens/tokens.css @imports, so its own validate stage can never pass.
# Reading that verdict at face value means either believing a healthy sync
# failed, or missing a real failure inside the expected one. That is not a
# hypothetical: it is what happened. See .design-sync/NOTES.md.
#
# Matches EXECUTION only, not inspection — `grep`/`sed`/`cat` on the driver
# stay allowed, since reading it is how you re-check the mirrored logic.
set -e

cmd=$(jq -r '.tool_input.command // ""' 2>/dev/null || true)

# Match at a COMMAND POSITION only: start of a line, or just after a shell
# separator (; && || |), allowing leading whitespace and env assignments.
#
# An earlier version matched the path anywhere `node` preceded it on the same
# segment, which fired on any command whose text merely *mentioned* the
# invocation — it blocked `git commit` on a message describing this very hook.
# Requiring a command position means prose keeps the path away from the start
# of a line (quoted, backticked, or mid-sentence) and no longer trips it.
if ! printf '%s' "$cmd" | grep -qE '(^|[;|]|&&|\|\|)[[:space:]]*([A-Za-z_][A-Za-z0-9_]*=[^[:space:]]*[[:space:]]+)*(sudo[[:space:]]+)?node[[:space:]][^;&|]*\.ds-sync/resync\.mjs'; then
  exit 0
fi

cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Do not run .ds-sync/resync.mjs directly — on this repo its verdict is ALWAYS ok:false and its capture stage is ALWAYS skipped 'prior_failure', even when the re-sync is healthy, because package-build.mjs wipes the Font Awesome files that tokens/tokens.css @imports and its own validate stage can never pass. Run `npm run design-sync` instead: it sequences the Font Awesome copy correctly and emits the one trustworthy verdict (exit 0 = genuinely clean). Fetch the anchor first via DesignSync get_file _ds_sync.json -> .design-sync/.cache/remote-sync.json. Details in .design-sync/NOTES.md. Reading the driver (grep/sed/cat) is not blocked."}}
JSON
