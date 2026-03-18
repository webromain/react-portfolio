import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import projectsData from "../projects.json";
import "./ProjectDetail.css";

// Importer toutes les images du dossier projects
const images = import.meta.glob(
  "../../../assets/img/projects/*.{png,jpg,jpeg,gif,webp}",
  {
    eager: true,
    import: "default",
  },
);

// Fonction pour créer un slug à partir du titre
const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

function ProjectDetail() {
  const { projectSlug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Chercher le projet par slug
    const foundProject = projectsData.projects.find(
      (p) => createSlug(p.name) === projectSlug,
    );
    if (foundProject) {
      // Extraire le nom du fichier depuis le chemin et importer l'image
      const imageName = foundProject.image.split("/").pop();
      const imagePath = `../../../assets/img/projects/${imageName}`;
      const importedImage = images[imagePath];

      setProject({
        ...foundProject,
        image: importedImage || foundProject.image,
      });
    } else {
      navigate("/");
    }
  }, [projectSlug, navigate]);

  if (!project) {
    return <div className="project-detail-loading">Chargement...</div>;
  }

  return (
    <div className="project-detail-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Retour aux projets
      </button>

      <div className="project-detail-content">
        <h1 className="project-detail-title">{project.name}</h1>
        <p className="project-detail-date">
          Créé le {new Date(project.date).toLocaleDateString("fr-FR")}
        </p>

        <div className="project-detail-description">
          <h2>Description</h2>
          <p>{project.description}</p>
        </div>

        <div className="project-detail-tech">
          <h2>Technologies utilisées</h2>
          <div className="tech-list">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-item">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ✅ AJOUTE CETTE SECTION SI TON PROJET A UNE DÉMO LIVE */}
        {project.demoUrl && (
          <div className="project-demo-section">
            <h2>Démo en ligne</h2>
            <iframe
              src={project.demoUrl}
              title={`${project.name} - Démo`}
              className="project-demo-iframe"
            />
          </div>
        )}

        <div className="project-detail-link">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-button"
          >
            Visiter le projet →
          </a>
        </div>
      </div>
      <div className="project-detail-header">
        <img
          src={project.image}
          alt={project.name}
          className="project-hero-image"
        />
      </div>
    </div>
  );
}

export default ProjectDetail;
