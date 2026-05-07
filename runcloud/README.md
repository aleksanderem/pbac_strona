# RunCloud deployment notes for PBAC

Web app: **pbac** on server **atlas** (138.201.133.106), domain **pbac.pl**.

## What's automated via API

- Web app `pbac` created at `/home/runcloud/webapps/pbac` (RunCloud webapp ID 2860266)
- GitHub deploy key registered on repo (key id 150756913)
- Git connection: `aleksanderem/pbac_strona` → branch `main` (RunCloud git ID 318905)
- `autoDeploy: true` so RunCloud runs `runcloud/deploy.sh` on every webhook hit
- RunCloud's stored `deployScript` simply invokes `bash runcloud/deploy.sh` — full deploy logic lives in this repo

## What you must do once manually

### 1. Add GitHub webhook → RunCloud

GitHub repo Settings → Webhooks → Add webhook:

- Payload URL: `https://manage.runcloud.io/webhooks/git/3yBEv4jzQuOPV8EaCK5jOy2Z1778149260/eXuVHiwPQBE2UoUGXOtnynpglkESkpMi`
- Content type: `application/json`
- SSL verification: enabled
- Events: just `push`
- Active: yes

Without this webhook, autoDeploy never fires. You can also trigger deploy by pushing to main.

### 2. Create secrets file on the server

SSH (RunCloud Console → Server → Web SSH) or use RunCloud File Manager as user `runcloud`:

```bash
cat > /home/runcloud/.env.pbac <<'EOF'
DATABASE_URI=postgres://postgres:1gy4RpxVeg5e06OEXEQn8tQLd1GyD4HvrpVX4oC3YQGVmiroiLyLbKt8Ei7jTzDv@46.225.152.204:5433/postgres
PAYLOAD_SECRET=ursVIlyySFE1rl3cja4mqDHGP5aYFKYwM+iM9kgRl14=
EOF
chmod 600 /home/runcloud/.env.pbac
```

`deploy.sh` sources this file and writes `.env.local` for the build/runtime. The file is outside the webapp dir so it survives `git reset --hard`.

### 3. Install Node 22 and PM2 if not present

If runcloud user doesn't have nvm yet:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 22
nvm alias default 22
npm install -g pm2
pm2 startup   # follow printed instructions to enable on boot
```

(The deploy script installs Node 22 and pm2 if missing, but a one-time setup makes the first deploy faster.)

### 4. Configure nginx custom config in RunCloud UI

The deploy script tries to write `/etc/nginx-rc/extra.d/pbac.location.before.conf` automatically. If it doesn't have permission, add it manually:

RunCloud UI → server `Atlas` → Web Application `pbac` → Settings → Custom Nginx Config →
paste the contents of `runcloud/nginx-extra.conf` into the **Before location block** area → Save → Rebuild.

### 5. Add SSL

RunCloud UI → Web Application `pbac` → SSL/TLS → Let's Encrypt → enable for `pbac.pl` (and `www.pbac.pl` if applicable).

DNS A record `pbac.pl → 138.201.133.106` is already in place per user.

## After all manual steps

Push any commit to main (or click "Force Deploy" in RunCloud UI) → webhook → `deploy.sh` runs → app restarts on port 3000 → nginx proxies port 80/443 → `pbac.pl` serves the live Next.js app.

## How to check it works

```bash
ssh runcloud@138.201.133.106
pm2 status               # should show pbac online
pm2 logs pbac --lines 50 # recent logs
curl -I http://127.0.0.1:3000        # internal Node
curl -I https://pbac.pl              # via nginx + Let's Encrypt
```

Admin panel at `https://pbac.pl/admin` (first visit asks to create admin user).
