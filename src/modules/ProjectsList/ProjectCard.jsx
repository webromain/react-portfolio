import { Link } from "react-router-dom";
import "./ProjectCard.css";

// Fonction pour créer un slug à partir du titre
const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

function ProjectCard({ project }) {
  const { name, description, image, technologies, date } = project;
  const projectSlug = createSlug(name);

  return (
    <Link to={`/projects/${projectSlug}`} className="project-card-link">
      <div className="project-card">
        <div className="project-card-image">
          <img
            src={image}
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
            {technologies.map((tech, index) => (
              <span key={index} className="tech-badge">
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
