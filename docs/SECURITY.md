# 🔐 Sécurité

## Mesures en place

| Mesure | Détail |
|--------|--------|
| **Content-Security-Policy** | Meta tag CSP dans `index.html` |
| **Referrer-Policy** | `strict-origin-when-cross-origin` |
| **XSS** | Pas de `dangerouslySetInnerHTML`, pas de `eval()` |
| **Liens externes** | `rel="noopener noreferrer"` sur tous les `target="_blank"` |
| **Iframe sandboxé** | `sandbox="allow-scripts allow-same-origin"` + validation HTTPS |
| **Docker non-root** | Utilisateur `appuser` dans le container de prod |
| **Docker socket** | Monté en `:ro` + `no-new-privileges` |
| **Webhook** | Vérification signature HMAC-SHA256, secrets en env vars |
| **localStorage** | `JSON.parse` protégé par `try/catch` |
| **`.gitignore`** | `.env`, `.env.*` exclus du versioning |
| **`.dockerignore`** | `node_modules`, `.env`, `.git` exclus de l'image |

---

## Points d'attention

- Le formulaire de contact n'a pas encore de protection CSRF ni CAPTCHA (backend pas connecté)
- Le rate-limiting est uniquement côté client (localStorage)
- L'animation typewriter utilise `innerHTML` sur du contenu statique — à surveiller si le contenu devient dynamique

---

## Variables d'environnement

Ne jamais commiter de secrets dans le code. Utiliser des variables d'environnement :

```env
# .env (ignoré par Git)
VITE_API_URL=https://api.example.com
```

> ⚠️ Seules les variables préfixées `VITE_` sont exposées au client.

Pour le webhook server :

```env
PORTAINER_URL=https://...
PORTAINER_TOKEN=...
STACK_ID=...
GITHUB_WEBHOOK_SECRET=...
```

---

## Audit réalisé (29 Mars 2026)

### Résultat

| Sévérité | Trouvés | Corrigés |
|----------|---------|----------|
| 🔴 Critique | 0 | — |
| 🟠 Haute | 2 | ✅ 2 |
| 🟡 Moyenne | 5 | ✅ 4 |
| 🔵 Basse | 3 | ✅ 3 |
| ℹ️ Info | 2 | ✅ 2 |

### Corrections appliquées

- Iframe `demoUrl` : ajout `sandbox`, validation HTTPS, `referrerPolicy`
- Liens externes : ajout `rel="noopener noreferrer"` sur GitHub, LinkedIn, Instagram
- `JSON.parse` localStorage : protégé par `try/catch` dans `Semaine.jsx` et `PortfolioContact.jsx`
- Webhook : vérification signature HMAC-SHA256, secrets via env vars
- SVGs JSX : `class` → `className`
- `.gitignore` : ajout `.env`, `.env.*`
- Dockerfile : utilisateur non-root `appuser`
- Docker socket : monté en `:ro` + `no-new-privileges` + `tmpfs`
- `index.html` : ajout CSP + `Referrer-Policy`
