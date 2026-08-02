#!/usr/bin/env bash
# Regenera entrega.pdf y entrega-preview.png a partir de index.html.
# Requiere Google Chrome.
set -euo pipefail

cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || CHROME="$(command -v google-chrome || command -v chromium)"

COMMON=(--headless=new --disable-gpu --no-sandbox --hide-scrollbars
        --virtual-time-budget=8000)

echo "Generando entrega.pdf…"
"$CHROME" "${COMMON[@]}" \
  --no-pdf-header-footer \
  --print-to-pdf=entrega.pdf \
  "file://$PWD/index.html"

# La altura debe superar la del documento para capturarlo entero de una vez.
echo "Generando entrega-preview.png…"
"$CHROME" "${COMMON[@]}" \
  --force-device-scale-factor=1 \
  --window-size=1440,16000 \
  --screenshot=entrega-preview.png \
  "file://$PWD/index.html"

echo "Listo."
ls -lh entrega.pdf entrega-preview.png
