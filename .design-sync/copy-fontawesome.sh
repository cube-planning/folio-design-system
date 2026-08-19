#!/bin/sh
# Required after every package-build.mjs / resync.mjs run and before
# package-validate.mjs / upload: ds-bundle/ is wiped on each rebuild, so the
# Font Awesome files referenced by tokens/tokens.css's `@import
# url("./fontawesome/css/all.min.css")` (see NOTES.md) must be re-copied in
# every time. There is no converter config hook for "extra static asset
# copied verbatim" — cfg.extraFonts only extracts @font-face blocks and
# drops the .fa-* icon-glyph rules, so it can't carry this file.
set -e
mkdir -p ds-bundle/fontawesome/css ds-bundle/fontawesome/webfonts
cp vendor/fontawesome/css/all.min.css ds-bundle/fontawesome/css/
cp vendor/fontawesome/webfonts/fa-solid-900.woff2 \
   vendor/fontawesome/webfonts/fa-regular-400.woff2 \
   vendor/fontawesome/webfonts/fa-light-300.woff2 \
   vendor/fontawesome/webfonts/fa-brands-400.woff2 \
   ds-bundle/fontawesome/webfonts/
echo "Font Awesome files copied into ds-bundle/fontawesome/"
