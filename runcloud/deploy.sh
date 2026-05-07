#!/bin/bash
# RunCloud deploy script for PBAC Next.js + Payload CMS
# Invoked by RunCloud after a git pull when a deploy is triggered.
#
# Required environment (set on the server, NOT committed):
#   DATABASE_URI       Postgres connection string for Payload CMS
#   PAYLOAD_SECRET     Random secret used by Payload to sign auth tokens
#
# These should live in /home/runcloud/.env.pbac (chmod 600). The script
# sources that file and writes a fresh .env.local for the build/runtime.

set -euo pipefail

APP_DIR="/home/runcloud/webapps/pbac"
APP_NAME="pbac"
APP_PORT="3000"
NODE_VERSION="22"
SECRETS_FILE="/home/runcloud/.env.pbac"

cd "$APP_DIR"

echo "▶ Loading nvm + Node ${NODE_VERSION}"
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install "$NODE_VERSION" >/dev/null 2>&1 || true
nvm use "$NODE_VERSION"
node --version
npm --version

echo "▶ Sourcing secrets from ${SECRETS_FILE}"
if [ ! -f "$SECRETS_FILE" ]; then
  cat <<EOF >&2
✗ MISSING SECRETS FILE: $SECRETS_FILE
  Create it manually (one-time, via SSH or RunCloud File Manager) with:
    DATABASE_URI=postgres://...
    PAYLOAD_SECRET=...
  chmod 600 $SECRETS_FILE
  Then re-trigger deploy.
EOF
  exit 1
fi
set -a
# shellcheck disable=SC1090
source "$SECRETS_FILE"
set +a

echo "▶ Writing .env.local"
cat > "$APP_DIR/.env.local" <<EOF
DATABASE_URI=${DATABASE_URI}
PAYLOAD_SECRET=${PAYLOAD_SECRET}
EOF
chmod 600 "$APP_DIR/.env.local"

echo "▶ Installing dependencies"
npm install --legacy-peer-deps --no-audit --no-fund

echo "▶ Building Next.js"
NODE_OPTIONS="--max-old-space-size=2048" npm run build

echo "▶ Ensuring PM2 is installed"
if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

echo "▶ Restarting app with PM2"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 reload "$APP_NAME" --update-env
else
  cd "$APP_DIR"
  PORT="$APP_PORT" pm2 start npm --name "$APP_NAME" -- start
fi
pm2 save

echo "▶ Writing nginx custom config snippet"
NGINX_DIR="/etc/nginx-rc/extra.d"
NGINX_CONF="$NGINX_DIR/$APP_NAME.location.before.conf"
if [ -d "$NGINX_DIR" ] && [ -w "$NGINX_DIR" ]; then
  cat > "$NGINX_CONF" <<EOF
location / {
    proxy_pass http://127.0.0.1:${APP_PORT};
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_cache_bypass \$http_upgrade;
}
EOF
  echo "  Wrote $NGINX_CONF"
  if command -v sudo >/dev/null 2>&1 && sudo -n nginx -t >/dev/null 2>&1; then
    sudo nginx -s reload && echo "  nginx reloaded"
  else
    echo "  ⚠ nginx not reloaded automatically — reload manually from RunCloud UI (Settings → Web App → Rebuild)"
  fi
else
  echo "  ⚠ $NGINX_DIR not writable. Add nginx proxy_pass via RunCloud UI:"
  echo "      Settings → Web App → Custom Nginx Config → paste the location block from runcloud/nginx-extra.conf"
fi

echo "✓ Deploy finished — app should be live at port $APP_PORT and proxied by nginx."
