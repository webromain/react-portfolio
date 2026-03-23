# Guide - Système de Galerie d'Images

## 📸 Comment ajouter plusieurs images à un projet

Le système supporte maintenant plusieurs images par projet avec galerie interactive.

### Structure du dossier

Créez un dossier pour chaque projet dans `src/assets/img/projects/` :

```
src/assets/img/projects/
├── portdesigns/
│   ├── image.png
│   ├── image1.png
│   ├── image2.png
│   └── ...
├── projectvangogh/
│   ├── image.png
│   └── image1.png
└── emploidutemps/
    ├── image.png
    ├── image1.png
    └── image2.png
```

### Dans projects.json

Ajoutez un tableau `images` pour chaque projet :

```json
{
  "id": 1,
  "name": "PORT Designs",
  "description": "Refonte complète d'un site ecommerce et migration.",
  "image": "portdesigns/image.png",
  "images": [
    "portdesigns/image.png",
    "portdesigns/image1.png",
    "portdesigns/image2.png"
  ],
  "technologies": ["PHP", "Smarty", "Prestashop"],
  "href": "https://portdesigns.com",
  "date": "2025-10-01"
}
```

### ⚡ Syntaxe rapide (Optionnel)

Vous pouvez aussi utiliser une syntaxe plus simple :

```json
"images": [
  "portdesigns.png",
  "portdesigns1.png",
  "portdesigns2.png"
]
```

## 🎨 Fonctionnalités

✅ **Galerie interactive** avec navigation au clavier et à la souris  
✅ **Vignettes de prévisualisation** - cliquez pour voir l'image  
✅ **Compteur d'images** - voir quelle image vous consultez  
✅ **Responsive** - adapté mobile et desktop  
✅ **Animations fluides** - transitions douces entre images

## 📱 Comment ça marche

1. **ProjectCard.jsx** - Affiche la première image (thumbnail)
2. **ImageGallery.jsx** - Composant réutilisable pour la galerie
3. **imageLoader.js** - Charge automatiquement toutes les images

## ✏️ Exemple complet

Pour le projet "PORT Designs", voici la configuration final :

```json
{
  "id": 1,
  "name": "PORT Designs",
  "description": "Refonte complète d'un site ecommerce et migration.",
  "image": "portdesigns.png",
  "images": [
    "portdesigns.png",
    "portdesigns1.png",
    "portdesigns2.png",
    "portdesigns3.png"
  ],
  "technologies": ["PHP", "Smarty", "Prestashop", "SQL (MariaDB)", "Git"],
  "href": "https://portdesigns.com",
  "date": "2025-10-01"
}
```

Puis créez les fichiers image :

- `src/assets/img/projects/portdesigns.png`
- `src/assets/img/projects/portdesigns1.png`
- `src/assets/img/projects/portdesigns2.png`
- `src/assets/img/projects/portdesigns3.png`

## 🔄 Ordre et nommage

Les images s'affichent dans l'ordre du tableau `images`. Nommez-les logiquement :

- `image.png`, `image1.png`, `image2.png` (numérique)
- Ou avec des noms descriptifs : `accueil.png`, `produits.png`, `checkout.png`

---

**Notes** :

- Au minimum, un projet doit avoir une image dans le tableau `images`
- Le champ `image` est optionnel s'il y a un tableau `images`
- Les formats supportés : PNG, JPG, JPEG, GIF, WebP
