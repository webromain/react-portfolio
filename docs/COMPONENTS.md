# 🧩 Modules et composants

## PortfolioHeader

**Chemin** : `src/modules/PortfolioHeader/`

Header principal affiché uniquement sur la page d'accueil. Contient :
- Animation typewriter progressive (titre, sous-titre)
- Liens sociaux (GitHub, LinkedIn, Instagram)
- Lien vers le CV
- Liste des compétences (badges animés)

**Props** : aucune

---

## PortfolioNavigation

**Chemin** : `src/modules/PortfolioNavigation/`

Barre de navigation affichée sur toutes les pages sauf l'accueil. Liens vers : Accueil, Contact, À propos, CV.

---

## ProjectsList

**Chemin** : `src/modules/ProjectsList/ProjectsList.jsx`

Grille responsive de cartes projets. Charge les données depuis `projects.json` et rend un `ProjectCard` par projet.

```jsx
<ProjectsList />
```

---

## ProjectCard

**Chemin** : `src/modules/ProjectsList/ProjectCard.jsx`

Carte individuelle d'un projet avec image, technologies (badges), date et lien vers le détail.

**Props** :

| Prop | Type | Description |
|------|------|-------------|
| `project` | `object` | Objet projet complet (voir [GALLERY.md](GALLERY.md)) |

**Interactions** :
- **Hover** : translate Y(-8px), changement de border, ombre
- **Click** : navigation vers `/projects/{slug}`
- **Image hover** : scale(1.05)

---

## ProjectDetail

**Chemin** : `src/modules/ProjectsList/pages/ProjectDetail.jsx`

Page détail d'un projet. Utilise le slug de l'URL pour trouver le projet dans `projects.json`. Affiche la description complète, les technologies, la galerie d'images, et un lien externe optionnel.

Si le projet a un champ `demoUrl` (HTTPS uniquement), un iframe sandboxé est affiché.

---

## ImageGallery

**Chemin** : `src/modules/ProjectsList/ImageGallery.jsx`

Galerie d'images interactive :
- Navigation par flèches (clavier et souris)
- Vignettes cliquables
- Compteur d'images (ex: 2 / 5)
- Responsive

**Props** :

| Prop | Type | Description |
|------|------|-------------|
| `images` | `string[]` | Tableau d'URLs d'images |
| `projectName` | `string` | Nom du projet (attribut alt) |

Voir le guide complet dans [GALLERY.md](GALLERY.md).

---

## ThemeToggle

**Chemin** : `src/modules/ThemeToggle/`

Bouton flottant (rendu via React Portal) pour basculer entre thème clair et sombre. La préférence est persistée dans `localStorage`.

---

## PortfolioContact

**Chemin** : `src/modules/PortfolioContact/`

Formulaire de contact avec :
- Validation email (regex) et longueur du message
- Protection anti-spam côté client (cooldown 5s + limite 3 msg/jour)
- Actuellement désactivé (backend pas encore connecté)

---

## PortfolioAbout

**Chemin** : `src/modules/PortfolioAbout/`

Section « À propos » avec présentation personnelle.

---

## PortfolioCv

**Chemin** : `src/modules/PortfolioCv/`

Redirige automatiquement vers le fichier PDF du CV via `window.location.href`.

---

## Graphe de dépendances

```
App (main.jsx)
├── Router (react-router-dom)
├── ScrollToTop
├── ThemeToggle (React Portal)
└── Layout
    ├── PortfolioHeader (accueil uniquement)
    ├── PortfolioNavigation (autres pages)
    ├── {children}
    │   ├── ProjectsList
    │   │   └── ProjectCard[] → Link → /projects/:slug
    │   ├── ProjectDetail
    │   │   └── ImageGallery
    │   ├── PortfolioContact
    │   ├── PortfolioAbout
    │   └── PortfolioCv
    └── PortfolioFooter
```
