#!/usr/bin/env bash
# Regenerates the local-only preview copy of the template.
#
# The committed .dc.html has no React script tag on purpose — the design
# project host puts React on the page before _ds_bundle.js runs. Served
# straight from this repo there is no React, so the bundle throws
# "Cannot set properties of undefined (setting 'jsx')" and every panel
# renders empty. This inserts the vendored React ahead of support.js in a
# throwaway copy, leaving the real template untouched.
#
#   ./preview-local.sh
#   # then serve the repo root and open:
#   # http://localhost:<port>/templates/glass-dashboard-mock/_verify.local.html
#
# _verify.local.html is disposable — delete it whenever, and never commit it.

set -euo pipefail
cd "$(dirname "$0")"

sed 's|<script src="./support.js"></script>|<script src="../../ds-bundle/_vendor/react.js"></script>\n&|' \
  GlassDashboardMock.dc.html > _verify.local.html

echo "wrote _verify.local.html — open it at /templates/glass-dashboard-mock/_verify.local.html"
