import "./PortfolioAbout.css";

function PortfolioAbout() {
  return (
    <section id="about" className="about-section">
      {/* En-tête */}
      <div className="about-header">
        <h2 className="section-title">$ À Propos</h2>
      </div>

      {/* Introduction */}
      <div className="about-intro">
        <p className="intro-text">
          Développeur full stack passionné par l'innovation et l'intelligence
          artificielle. Actuellement en{" "}
          <strong>3e année de Bachelor à l'EPSI</strong>, en alternance chez{" "}
          <strong>PORT Designs</strong>. Je crée des solutions web modernes et
          performantes.
        </p>
      </div>

      {/* Contenu principal */}
      <div className="about-content">
        {/* Section Parcours */}
        <div className="about-card">
          <div className="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-book-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
            </svg>
          </div>
          <h3>Mon Parcours</h3>
          <div className="about-text">
            <p>
              Diplômé d'un baccalauréat général en Mathématiques et Sciences
              Numériques & Informatique, j'ai poursuivi mon cursus au sein de
              l'école EPSI en me spécialisant dans le{" "}
              <strong>développement full stack</strong> et l'<strong>IA</strong>
              .
            </p>
            <p>
              Mon parcours académique m'a permis de maîtriser les technologies
              modernes et de développer une expertise solide en architecture
              logicielle et bonnes pratiques de développement.
            </p>
          </div>
        </div>

        {/* Section Expérience */}
        <div className="about-card">
          <div className="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-briefcase-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5" />
              <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z" />
            </svg>
          </div>
          <h3>Expérience Professionnelle</h3>
          <div className="about-text">
            <p>
              Chez <strong>PORT Designs</strong>, j'ai contribué à la{" "}
              <strong>refonte complète du site</strong> de l'entreprise. Au-delà
              du développement, j'ai participé à la création d'un chatbot
              personnalisé, démontrant ma capacité à travailler sur des projets
              transversaux et innovants.
            </p>
            <p>
              Cette expérience m'a apporté une compréhension profonde des enjeux
              métier et m'a formé aux pratiques professionnelles essentielles du
              développement en équipe.
            </p>
          </div>
        </div>

        {/* Section Réalisations */}
        <div className="about-card">
          <div className="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-archive-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z" />
            </svg>
          </div>
          <h3>Réalisations & Projets</h3>
          <div className="about-text">
            <ul className="projects-list">
              <li>
                <strong>Portfolio en React</strong> — Avec infrastructure
                complète et galerie multi-images
              </li>
              <li>
                <strong>Site PORT Designs</strong> — Refonte complète + chatbot
                IA
              </li>
              <li>
                <strong>Jeu Flappy Bird</strong> — Développement en C++ avec
                SFML
              </li>
              <li>
                <strong>Projets académiques</strong> — Cartes Pokémon,
                E-commerce, Système d'authentification NFC
              </li>
            </ul>
          </div>
        </div>

        {/* Section Objectifs */}
        <div className="about-card">
          <div className="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-bullseye"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
              <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </div>
          <h3>Objectifs Professionnels</h3>
          <div className="about-text">
            <p>
              <strong>Devenir développeur full stack et IA performant</strong>,
              capable de transformer des idées en solutions concrètes. Je
              recherche des environnements qui me permettront de :
            </p>
            <ul className="goals-list">
              <li>Travailler sur des projets de grande envergure</li>
              <li>Approfondir mes compétences en technologies émergentes</li>
              <li>Contribuer à des solutions innovantes et impactantes</li>
            </ul>
          </div>
        </div>

        {/* Section Valeurs */}
        <div className="about-card">
          <div className="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-bounding-box"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            </svg>
          </div>
          <h3>Mes Valeurs</h3>
          <div className="about-text">
            <p>
              Déterminé, sérieux et enthousiaste, j'apporte discipline et
              rigueur à chaque projet. Mes pratiques sportives (judo, tennis,
              musculation) m'ont enseigné la persévérance et l'excellence.
            </p>
            <p>
              Je suis motivé par l'apprentissage continu et convaincu que la
              passion est la clé du succès professionnel.
            </p>
          </div>
        </div>
      </div>

      {/* Section Appel à l'action */}
      <div className="about-cta">
        <p>
          Intéressé pour discuter de projets ?{" "}
          <a href="#contact" className="cta-link">
            Contactez-moi
          </a>
        </p>
      </div>
    </section>
  );
}

export default PortfolioAbout;
