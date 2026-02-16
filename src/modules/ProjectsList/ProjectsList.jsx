import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import projectsData from "./projects.json";
import "./ProjectsList.css";

// Importer toutes les images du dossier projects
const images = import.meta.glob(
  "../../assets/img/projects/*.{png,jpg,jpeg,gif,webp}",
  {
    eager: true,
    import: "default",
  },
);

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Charger les projets et remplacer les chemins d'images
    const projectsWithImages = projectsData.projects.map((project) => {
      // Extraire le nom du fichier depuis le chemin
      const imageName = project.image.split("/").pop();
      const imagePath = `../../assets/img/projects/${imageName}`;

      // Chercher l'image importée
      const importedImage = images[imagePath];

      // Si l'image n'a pas été résolue par Vite, construire un fallback URL
      let imageUrl;
      if (importedImage) {
        imageUrl = importedImage;
      } else {
        try {
          imageUrl = new URL(`../../assets/img/projects/${imageName}`, import.meta.url).href;
        } catch (e) {
          imageUrl = project.image;
        }
      }

      return {
        ...project,
        image: imageUrl,
      };
    });

    setProjects(projectsWithImages);
  }, []);

  const addProject = (newProject) => {
    const projectWithId = {
      id: projects.length + 1,
      date: new Date().toISOString().split("T")[0],
      ...newProject,
    };
    setProjects([...projects, projectWithId]);
  };

  return (
    <section id="projects" className="projects-list-container">
      <h2 className="section-title">:~$ My Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsList;
