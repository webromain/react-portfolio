# 📸 Exemple - Ajouter des images pour un projet

## Étape 1 : Créer le dossier du projet

Créez un dossier dedans `src/assets/img/projects/` :

```
src/assets/img/projects/portdesigns/
```

## Étape 2 : Ajouter les images

Créez des fichiers image dans ce dossier :

```
src/assets/img/projects/portdesigns/
├── image.png          # Image 1
├── image1.png         # Image 2
├── image2.png         # Image 3
└── image3.png         # Image 4
```

Ou avec des noms descriptifs :

```
src/assets/img/projects/portdesigns/
├── homepage.png
├── products.png
├── shopping-cart.png
└── checkout.png
```

## Étape 3 : Mettre à jour projects.json

Modifiez le tableau `images` du projet :

```json
{
  "id": 1,
  "name": "PORT Designs",
  "description": "Refonte complète d'un site ecommerce et migration.",
  "image": "portdesigns.png",
  "images": [
    "portdesigns/image.png",
    "portdesigns/image1.png",
    "portdesigns/image2.png",
    "portdesigns/image3.png"
  ],
  "technologies": ["PHP", "Smarty", "Prestashop", "SQL (MariaDB)", "Git"],
  "href": "https://portdesigns.com",
  "date": "2025-10-01"
}
```

Ou avec les noms descriptifs :

```json
{
  "id": 1,
  "name": "PORT Designs",
  "description": "Refonte complète d'un site ecommerce et migration.",
  "image": "portdesigns.png",
  "images": [
    "portdesigns/homepage.png",
    "portdesigns/products.png",
    "portdesigns/shopping-cart.png",
    "portdesigns/checkout.png"
  ],
  "technologies": ["PHP", "Smarty", "Prestashop", "SQL (MariaDB)", "Git"],
  "href": "https://portdesigns.com",
  "date": "2025-10-01"
}
```

## Étape 4 : C'est tutto ! ✅

L'appli charge automatiquement les images et crée une galerie interactive avec :

- 🎯 **Navigation au clavier** : flèches < >
- 👆 **Vignettes cliquables** : cliquez sur une image pour la voir
- 📊 **Compteur** : 1 / 4 images
- 📱 **Responsive** : fonctionne sur tous les écrans

## Format SIMPLE (Optionnel)

Les images restent à la racine si vous préférez :

```json
"images": [
  "portdesigns.png",
  "portdesigns1.png",
  "portdesigns2.png"
]
```

Les deux formats marchent ! 🎉

---

## ✅ À vérifier

- ✓ Dossier créé dans `src/assets/img/projects/`
- ✓ Images placées dans le dossier
- ✓ Chemin des images mis à jour dans `projects.json`
- ✓ Syntaxe JSON valide (pas de virgule manquante)

## 🎨 Conseils

- **Utilisez des images de même ratio** pour un meilleur rendu
- **Nommez les images logiquement** : accueil, produits, panier, etc.
- **Compressez les images** pour plus de performance
- **Testez sur mobile** - la galerie s'adapte automatiquement

Prêt ? Ajouter vos images et profitez de la galerie ! 🚀
