import { useState } from "react";
import "./ImageGallery.css";

/**
 * Composant de galerie d'images interactive avec navigation
 * @param {Object} props
 * @param {string[]} props.images - Tableau d'URLs d'images
 * @param {string} props.projectName - Nom du projet
 */
function ImageGallery({ images, projectName }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="image-gallery-empty">Pas d'image disponible</div>;
  }

  const currentImage = images[currentImageIndex];

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="image-gallery">
      <div className="gallery-main">
        <img
          src={currentImage}
          alt={`${projectName} - Galerie ${currentImageIndex + 1}`}
          className="gallery-main-image"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="gallery-nav-button gallery-nav-prev"
              aria-label="Image précédente"
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              className="gallery-nav-button gallery-nav-next"
              aria-label="Image suivante"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              onClick={() => setCurrentImageIndex(index)}
              className={`gallery-thumbnail ${
                index === currentImageIndex ? "active" : ""
              }`}
              aria-label={`Voir photo ${index + 1}`}
            >
              <img
                src={image}
                alt={`Aper\u00e7u ${index + 1} de ${projectName}`}
              />
            </button>
          ))}
          <div className="gallery-counter">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
