# 🖼️ Galerie d'images et gestion des projets

## Structure des données

Les projets sont définis dans `src/modules/ProjectsList/projects.json` :

```json
{
  "projects": [
    {
      "id": 1,
      "name": "Nom du Projet",
      "description": "Description détaillée du projet.",
      "image": "dossier/image1.png",
      "images": [
        "dossier/image1.png",
        "dossier/image2.png",
        "dossier/image3.png"
      ],
      "technologies": ["React", "Node.js", "PostgreSQL"],
      "href": "https://lien-externe.com",
      "date": "2025-06-15"
    }
  ]
}
```

### Champs

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `id` | number | ✅ | Identifiant unique |
| `name` | string | ✅ | Nom affiché (le slug URL est généré automatiquement) |
| `description` | string | ✅ | Description du projet |
| `image` | string | ✅ | Image principale (thumbnail) |
| `images` | string[] | ❌ | Tableau pour la galerie |
| `technologies` | string[] | ✅ | Stack technique |
| `href` | string | ❌ | Lien externe vers le projet |
| `demoUrl` | string | ❌ | URL de démo (HTTPS, affichée en iframe sandboxé) |
| `date` | string | ✅ | Date de création (YYYY-MM-DD) |

---

## Ajouter un nouveau projet

### Étape 1 — Créer le dossier d'images

```
public/assets/img/projects/monprojet/
```

### Étape 2 — Ajouter les images

```
public/assets/img/projects/monprojet/
├── screenshot1.png
├── screenshot2.png
└── screenshot3.png
```

Formats supportés : **PNG, JPG, JPEG, GIF, WebP**

### Étape 3 — Ajouter l'entrée dans `projects.json`

```json
{
  "id": 10,
  "name": "Mon Nouveau Projet",
  "description": "Description détaillée du projet.",
  "image": "monprojet/screenshot1.png",
  "images": [
    "monprojet/screenshot1.png",
    "monprojet/screenshot2.png",
    "monprojet/screenshot3.png"
  ],
  "technologies": ["React", "Node.js"],
  "href": "https://github.com/webromain/monprojet",
  "date": "2026-03-29"
}
```

### Étape 4 — C'est tout ✅

Le slug de l'URL est généré automatiquement à partir du `name` :
- "Mon Nouveau Projet" → `/projects/mon-nouveau-projet`

---

## Structure des dossiers images

```
public/assets/img/projects/
├── portdesigns/
│   ├── portdesigns1.png
│   ├── portdesigns2.png
│   └── portdesigns3.png
├── blogvangogh/
│   ├── blogvangogh1.png
│   └── blogvangogh2.png
└── monprojet/
    ├── screenshot1.png
    └── screenshot2.png
```

---

## Fonctionnalités de la galerie

- 🎯 Navigation clavier (flèches ← →)
- 👆 Vignettes cliquables en bas
- 📊 Compteur d'images (ex: 2 / 4)
- 📱 Responsive mobile et desktop
- 🎨 Transitions fluides entre images

---

## Conseils

- **Même ratio** — Utilisez des images de même ratio pour un rendu homogène
- **Compression** — Compressez les images pour la performance
- **Thumbnail** — Le champ `image` sert de thumbnail ; si `images` est présent, il alimente la galerie
- **Nommage** — Nommez les images logiquement (`accueil.png`, `produits.png`, etc.)
- **Ordre** — Les images s'affichent dans l'ordre du tableau `images`

---

## Checklist

- ✅ Dossier créé dans `public/assets/img/projects/`
- ✅ Images placées dans le dossier
- ✅ Chemin des images correct dans `projects.json`
- ✅ Syntaxe JSON valide (pas de virgule manquante)
- ✅ Testé sur mobile
