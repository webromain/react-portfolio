# 🐳 Déploiement et CI/CD

## Architecture de production

```
┌─────────────────┐     ┌───────────────────┐
│  nginx-proxy    │────▶│  portfolio-app    │
│  (reverse proxy │     │  (serve -s dist)  │
│  + Let's Encrypt│     │  port 3000        │
│  HTTPS auto)    │     └───────────────────┘
└─────────────────┘
                        ┌───────────────────┐
                        │  git-poller       │
                        │  (docker:alpine)  │
                        │  polling GitHub   │
                        │  toutes les 5 min │
                        └───────────────────┘
```

---

## Dockerfile (multi-stage)

- **Stage 1 (builder)** : `node:20-alpine`, `npm ci`, `npm run build`
- **Stage 2 (production)** : `node:20-alpine`, `serve -s dist`, utilisateur non-root `appuser`

---

## docker-compose.yml

Le fichier définit deux services :

| Service | Image | Rôle |
|---------|-------|------|
| `portfolio` | Build depuis GitHub | Serveur de l'app React |
| `git-poller` | `docker:latest` | Surveille GitHub, rebuild si nouveau commit |

### Variables d'environnement (service portfolio)

| Variable | Valeur |
|----------|--------|
| `NODE_ENV` | `production` |
| `VIRTUAL_HOST` | `portfolio.romainpoisson.com` |
| `LETSENCRYPT_HOST` | `portfolio.romainpoisson.com` |
| `LETSENCRYPT_EMAIL` | `admin@romainpoisson.com` |

---

## Déployer via Portainer

1. Dans Portainer → **Stacks** → **Add stack**
2. Coller le contenu de `docker-compose.yml`
3. Cliquer **Deploy the stack**
4. Le portfolio est accessible via le domaine configuré dans `VIRTUAL_HOST`

Pour mettre à jour : **Stacks** → sélectionner la stack → remplacer le contenu → **Update the stack**

---

## Auto-déploiement — Git Poller

Le service `git-poller` dans le docker-compose :

1. Interroge l'API GitHub toutes les **300 secondes** (5 min)
2. Compare le SHA du dernier commit avec le SHA déployé
3. Si nouveau commit détecté → `docker build` + `docker run` avec la nouvelle image
4. Stocke le SHA dans `/tmp/last_sha`

### Sécurité du poller

- Docker socket monté en **lecture seule** (`:ro`)
- `no-new-privileges: true`
- `/tmp` monté en `tmpfs` (RAM, 1 Mo)

### Configuration

Le script `scripts/git-poller.sh` est configurable via variables d'environnement :

| Variable | Défaut | Description |
|----------|--------|-------------|
| `REPO` | `webromain/react-portfolio` | Repo GitHub |
| `BRANCH` | `main` | Branche à surveiller |
| `CONTAINER_NAME` | `portfolio-app` | Nom du container à rebuild |
| `INTERVAL` | `300` | Intervalle de polling (secondes) |

---

## Alternative — Webhook GitHub (optionnel)

Le fichier `scripts/webhook-server.js` est un serveur Express qui reçoit les webhooks GitHub et redéploie la stack via l'API Portainer.

**Variables d'environnement requises** :

```env
PORTAINER_URL=https://votre-portainer.com
PORTAINER_TOKEN=votre-token-api
STACK_ID=id-de-la-stack
GITHUB_WEBHOOK_SECRET=votre-secret
```

La signature HMAC-SHA256 du webhook est vérifiée avant tout traitement.

---

## Scripts utilitaires

### `scripts/setup.ps1` (Windows)

Script PowerShell d'installation automatisée :

```powershell
# Installation simple
powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1

# Avec installation de Node.js si absent
powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1 -InstallNode

# Installation + lancement du serveur dev
powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1 -InstallNode -Start
```

Actions : vérifie Node.js, `npm ci`, configure Tailwind si absent, installe react-snowfall.

---

## Build local

```bash
# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Build Docker local
docker build -t portfolio-test .
docker run -p 3000:3000 portfolio-test
```

---

## Troubleshooting

### Le build Docker échoue

```bash
# Tester le build localement
docker build -t portfolio-test .

# Vérifier les logs
docker logs portfolio-app
```

### Le git-poller ne détecte pas les changements

- Vérifier les logs : `docker logs portfolio-git-poller`
- L'API GitHub a un rate-limit de 60 req/h sans token
- Pour un token : ajouter `-H "Authorization: token VOTRE_TOKEN"` dans le curl du script
