import { Link } from "react-router-dom";
import { getProjectThumbnail } from "./imageLoader";
import "./ProjectCard.css";

// Fonction pour créer un slug à partir du titre
const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replaceAll(/[^\w\s-]/g, "")
    .replaceAll(/\s+/g, "-");
};

/**
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string[]} technologies
 * @property {string} date
 * @property {string} [image]
 * @property {string[]} [images]
 */

/**
 * Composant de carte pour afficher un projet dans la grille
 * @param {Object} props
 * @param {Project} props.project - Les données du projet
 */
function ProjectCard({ project }) {
  const { name, description, technologies, date } = project;
  const projectSlug = createSlug(name);
  const imageUrl = getProjectThumbnail(project);

  return (
    <Link to={`/projects/${projectSlug}`} className="project-card-link">
      <div className="project-card">
        <div className="project-card-image">
          <img
            src={imageUrl}
            alt={name}
            onError={(e) => {
              // Masquer l'image cassée pour éviter l'icône de placeholder
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.classList.add("no-image");
            }}
          />
        </div>
        <div className="project-card-content">
          <h3 className="project-card-title">{name}</h3>
          <p className="project-card-description">{description}</p>
          <div className="project-card-tech">
            {technologies.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
          <p className="project-card-date">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
