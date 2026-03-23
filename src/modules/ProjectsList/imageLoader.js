/**
 * Utilitaire pour charger les images des projets
 * Version simplifiée
 */

/**
 * Résout l'URL d'une image
 * @param {string} imageName - Nom du fichier image
 * @returns {string} URL de l'image
 */
export const resolveImage = (imageName) => {
  if (!imageName) return "";

  // En Vite, les assets dans /src/assets sont accessibles via /assets
  return `/assets/img/projects/${imageName}`;
};

/**
 * Charge les images pour un projet
 * Si le projet a un tableau "images", les charge toutes
 * Sinon, utilise le champ "image"
 * @param {object} project - Objet projet
 * @returns {array} Tableau d'URLs d'images
 */
export const loadProjectImages = (project) => {
  if (
    project?.images &&
    Array.isArray(project.images) &&
    project.images.length > 0
  ) {
    return project.images.map(resolveImage).filter(Boolean);
  }

  if (project?.image) {
    const resolved = resolveImage(project.image);
    return resolved ? [resolved] : [];
  }

  return [];
};

/**
 * Retourne la première image d'un projet pour la carte
 * @param {object} project - Objet projet
 * @returns {string} URL de la première image
 */
export const getProjectThumbnail = (project) => {
  const images = loadProjectImages(project);
  return images.length > 0 ? images[0] : "";
};
