# 🚀 Portfolio — Romain POISSON

Portfolio personnel de développeur Full Stack, construit avec **React 19**, **Vite 7**, **Tailwind CSS** et déployé via **Docker** + **Portainer** avec auto-déploiement sur push GitHub.

🌐 **Production** : [portfolio.romainpoisson.com](https://portfolio.romainpoisson.com)

---

## 📋 Documentation

| Doc | Contenu |
|-----|---------|
| 📖 **[Architecture](docs/ARCHITECTURE.md)** | Arborescence, flux de données, routing, thème, styles et design |
| 🧩 **[Composants](docs/COMPONENTS.md)** | Tous les modules React : props, comportement, graphe de dépendances |
| 🖼️ **[Galerie & Projets](docs/GALLERY.md)** | Ajouter un projet, gérer les images, structure du JSON |
| 🐳 **[Déploiement](docs/DEPLOYMENT.md)** | Docker, Portainer, git-poller, webhook, scripts utilitaires |
| 🔐 **[Sécurité](docs/SECURITY.md)** | Mesures en place, audit, variables d'environnement |

---

## 🛠️ Stack technique

| Catégorie | Technologie |
|-----------|-------------|
| **Framework** | React 19.2 |
| **Bundler** | Vite 7.3 (SWC) |
| **Routing** | React Router DOM 7.12 |
| **CSS** | Tailwind CSS 3.4 + CSS custom |
| **Linting** | ESLint 9 + eslint-plugin-react-hooks |
| **Conteneurisation** | Docker multi-stage (node:20-alpine) |
| **Serveur prod** | `serve` (SPA statique) |
| **Reverse proxy** | nginx-proxy + Let's Encrypt (HTTPS auto) |
| **Orchestration** | Docker Compose + Portainer |
| **CI/CD** | Git Poller (polling GitHub API toutes les 5 min) |

---

## ⚡ Démarrage rapide

### Prérequis

- **Node.js** ≥ 18 LTS
- **npm** ≥ 9

### En 3 commandes

```bash
git clone https://github.com/webromain/react-portfolio.git
cd react-portfolio
npm install
npm run dev
```

L'app est accessible à **http://localhost:5173**

### Script Windows automatisé

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1 -Start
```

### Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement avec HMR |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Prévisualisation du build de prod |
| `npm run lint` | Vérification ESLint |

---

## ✨ Fonctionnalités

- 🖼️ Affichage dynamique des projets avec galerie d'images interactive
- 🔗 Navigation fluide SPA (React Router v7)
- 📱 Design responsive (mobile, tablette, desktop)
- 🌗 Thème clair / sombre persisté
- ⌨️ Animation typewriter sur le header
- 📄 Page CV avec téléchargement PDF
- 📬 Formulaire de contact (préparé, backend en cours)
- 🐳 Déploiement Docker avec rebuild auto sur push GitHub

---

## 👨‍💻 Guide rapide de développement

### Ajouter un projet

→ Voir [docs/GALLERY.md](docs/GALLERY.md)

### Ajouter un module

```bash
mkdir src/modules/MonModule
```

```jsx
// src/modules/MonModule/MonModule.jsx
import "./MonModule.css";

function MonModule() {
  return <section id="mon-module">{/* Contenu */}</section>;
}
export default MonModule;
```

Puis ajouter la route dans `src/main.jsx` :

```jsx
<Route path="/ma-page" element={<Layout><MonModule /></Layout>} />
```

### Conventions de nommage

| Type | Convention | Exemple |
|------|-----------|---------|
| Composants React | PascalCase | `ProjectCard.jsx` |
| Fichiers CSS | PascalCase (même nom) | `ProjectCard.css` |
| Données JSON | kebab-case | `projects.json` |
| Classes CSS | kebab-case | `.project-card-title` |

---

## ❓ FAQ

| Problème | Solution |
|----------|----------|
| Le serveur ne démarre pas | `rm -rf node_modules && npm install` |
| Les projets ne s'affichent pas | Vérifier la syntaxe JSON de `projects.json` |
| Les images manquent | Vérifier le chemin dans `public/assets/img/projects/` |
| Le thème ne se sauvegarde pas | Vérifier que localStorage n'est pas bloqué |
| Le build Docker échoue | `docker build -t test .` + `docker logs portfolio-app` |
| Le git-poller ne détecte rien | `docker logs portfolio-git-poller` (rate-limit GitHub : 60 req/h) |

---

## 📝 Licence

Projet personnel — Romain POISSON © 2026

---

**Version** : 2.0.0 · **Dernière mise à jour** : 29 Mars 2026
