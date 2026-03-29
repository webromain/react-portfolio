# 🏗️ Architecture du projet

## Arborescence

```
react-portfolio/
├── index.html                     # Point d'entrée HTML (CSP incluse)
├── package.json                   # Dépendances et scripts
├── vite.config.js                 # Configuration Vite
├── tailwind.config.js             # Configuration Tailwind CSS
├── postcss.config.js              # Configuration PostCSS
├── eslint.config.js               # Configuration ESLint 9 (flat config)
├── Dockerfile                     # Build multi-stage (builder + prod)
├── docker-compose.yml             # Stack Docker (app + git-poller)
├── .dockerignore                  # Exclusions Docker
├── .gitignore                     # Exclusions Git
│
├── public/                        # Assets statiques (copiés tels quels)
│   └── assets/img/projects/       # Images des projets (par dossier)
│       ├── blogvangogh/
│       ├── crudjsonphp/
│       ├── ecomdjango/
│       ├── flappybirdclone/
│       ├── notea/
│       ├── pokemoncards/
│       └── portdesigns/
│
├── src/                           # Code source
│   ├── main.jsx                   # Point d'entrée React (Router + Layout)
│   ├── index.css                  # Styles globaux + Tailwind directives
│   ├── assets/
│   │   ├── img/logos/             # Logos
│   │   └── pdf/                   # CV en PDF
│   └── modules/                   # Modules fonctionnels
│       ├── PortfolioHeader/       # Header avec animation typewriter
│       ├── PortfolioNavigation/   # Barre de navigation
│       ├── PortfolioFooter/       # Footer
│       ├── PortfolioAbout/        # Section À propos
│       ├── PortfolioContact/      # Formulaire de contact
│       ├── PortfolioCv/           # Page CV (redirect PDF)
│       ├── ProjectsList/          # Liste + détails + galerie projets
│       │   ├── ProjectsList.jsx   # Grille des projets
│       │   ├── ProjectCard.jsx    # Carte projet individuelle
│       │   ├── ImageGallery.jsx   # Galerie d'images interactive
│       │   ├── imageLoader.js     # Utilitaire chargement images
│       │   ├── projects.json      # Données des projets
│       │   └── pages/
│       │       └── ProjectDetail.jsx  # Page détail projet
│       ├── ThemeToggle/           # Bouton thème clair/sombre
│       ├── WeekSchedule/          # Planificateur hebdomadaire
│       └── ScheduleHeader/        # Header du planificateur
│
├── scripts/                       # Scripts utilitaires
│   ├── setup.ps1                  # Installation Windows (PowerShell)
│   ├── git-poller.sh              # Polling GitHub + rebuild Docker
│   └── webhook-server.js          # Webhook GitHub → Portainer (optionnel)
│
└── docs/                          # Documentation détaillée
    ├── ARCHITECTURE.md            # Ce fichier
    ├── COMPONENTS.md              # Modules et composants
    ├── DEPLOYMENT.md              # Docker, Portainer, CI/CD
    ├── GALLERY.md                 # Galerie d'images et projets
    └── SECURITY.md                # Sécurité
```

---

## Flux de données

```
main.jsx (Router)
├── Layout
│   ├── PortfolioHeader (page d'accueil uniquement)
│   ├── PortfolioNavigation (autres pages)
│   ├── {children} ← Routes ci-dessous
│   └── PortfolioFooter
├── Route "/" → ProjectsList + PortfolioContact + PortfolioAbout
├── Route "/projects/:projectSlug" → ProjectDetail (+ ImageGallery)
├── Route "/contact" → PortfolioContact
├── Route "/about" → PortfolioAbout
└── Route "/cv" → PortfolioCv (redirect PDF)
+ ThemeToggle (portal, toujours visible)
```

---

## Routing

Le projet utilise **React Router v7** avec navigation par slug.

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | Layout → ProjectsList + Contact + About | Page d'accueil |
| `/projects/:projectSlug` | Layout → ProjectDetail | Détail d'un projet |
| `/contact` | Layout → PortfolioContact | Page de contact |
| `/about` | Layout → PortfolioAbout | Page À propos |
| `/cv` | PortfolioCv | Redirection vers le PDF |

Le composant `ScrollToTop` gère le scroll : remise en haut de page à chaque navigation, ou scroll vers l'ancre si un hash est présent (`/#contact`).

---

## Thème clair / sombre

Le thème est géré par la classe CSS `light` sur `<html>`. Le composant `ThemeToggle` :
- Bascule la classe au clic
- Persiste le choix dans `localStorage` (clé : `theme`)
- Est rendu via un React Portal (toujours visible)
- Le thème est restauré au chargement via `PortfolioHeader`

---

## Styles et design

### Palette de couleurs

| Couleur | Code | Utilisation |
|---------|------|-------------|
| Indigo | `#6366f1` | Primaire, accents |
| Purple | `#a855f7` | Gradients, secondaire |
| Dark slate | `#0f172a` | Fond principal (dark) |
| Light slate | `#e2e8f0` | Texte principal |

### Gradients

```css
/* Gradient primaire */
background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);

/* Gradient texte */
background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
-webkit-background-clip: text;
```

### Breakpoints responsive

| Taille | Breakpoint | Cible |
|--------|-----------|-------|
| Mobile | < 768px | Smartphones |
| Tablette | 768px - 1024px | Tablettes |
| Desktop | > 1024px | Ordinateurs |

### Fichiers CSS clés

| Fichier | Rôle |
|---------|------|
| `src/index.css` | Styles globaux + directives Tailwind |
| `PortfolioHeader.css` | Header, animation, socials |
| `ProjectsList.css` | Grille des projets |
| `ProjectCard.css` | Carte projet + hover effects |
| `ProjectDetail.css` | Page détail |
| `ImageGallery.css` | Galerie d'images |
