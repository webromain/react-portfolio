import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import projectsData from "../projects.json";
import ImageGallery from "../ImageGallery";
import { loadProjectImages } from "../imageLoader";
import "./ProjectDetail.css";

// Fonction pour créer un slug à partir du titre
const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replaceAll(/[^\w\s-]/g, "")
    .replaceAll(/\s+/g, "-");
};

function ProjectDetail() {
  const { projectSlug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [projectImages, setProjectImages] = useState([]);

  useEffect(() => {
    // Chercher le projet par slug
    const foundProject = projectsData.projects.find(
      (p) => createSlug(p.name) === projectSlug,
    );
    if (foundProject) {
      setProject(foundProject);
      const images = loadProjectImages(foundProject);
      setProjectImages(images);
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
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-item">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ✅ AJOUTE CETTE SECTION SI TON PROJET A UNE DÉMO LIVE */}
        {project.demoUrl && /^https:\/\//.test(project.demoUrl) && (
          <div className="project-demo-section">
            <h2>Démo en ligne</h2>
            <iframe
              src={project.demoUrl}
              title={`${project.name} - Démo`}
              className="project-demo-iframe"
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        )}

        <div className="project-detail-link">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-button"
            >
              Visiter le projet →
            </a>
          )}
        </div>
      </div>

      <div className="project-detail-header">
        <ImageGallery images={projectImages} projectName={project.name} />
      </div>
    </div>
  );
}

export default ProjectDetail;
