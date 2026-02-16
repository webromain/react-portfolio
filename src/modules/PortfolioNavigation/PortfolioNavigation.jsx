import "./PortfolioNavigation.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import logo from "../../assets/img/logos/portfolio-logo-rp.png";

function PortfolioNavigation() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleFullScreen = () => {
    const themeButton = document.querySelector(".theme");
    const backNav = document.getElementById("root");
    if (isFullScreen) {
      document.body.style.margin = "";
      document.body.style.borderRadius = "var(--soft-border)";
      if (themeButton) themeButton.style.right = "30px";
      if (backNav) backNav.style.borderRadius = "var(--soft-border)";
      setIsFullScreen(false);
    } else {
      document.body.style.margin = "0";
      document.body.style.borderRadius = "0";
      if (themeButton) themeButton.style.right = "14px";
      if (backNav) backNav.style.borderRadius = "0";
      setIsFullScreen(true);
    }
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleConfirm = () => {
    window.location.href = "#projects";
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/* Menu mobile et backdrop avec createPortal */}
      {isMobileMenuOpen &&
        createPortal(
          <>
            {/* Backdrop mobile */}
            <div className="mobile-menu-backdrop" onClick={closeMobileMenu} />

            {/* Menu mobile */}
            <div className="mobile-menu open">
              <button
                className="mobile-menu-close"
                onClick={closeMobileMenu}
                aria-label="Fermer le menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </button>
              <nav className="mobile-nav">
                <a
                  href="/"
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  Accueil
                </a>
                <a
                  href="#contact"
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  Contact
                </a>
                <a
                  href="#projects"
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  Projets
                </a>
                <a
                  href="#about"
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  À propos
                </a>
              </nav>
            </div>
          </>,
          document.body,
        )}

      <div className="navigation-container">
        <nav className="navigation">
          <a href="/" className="nav-link logo">
            <img src={logo} alt="Logo" />
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
        </nav>
        <div className="h1-container">
          <h1>romain@poisson:~$ portfolio</h1>
        </div>
        <div className="options">
          <a href="#contact">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
              />
            </svg>
          </a>
          <a onClick={handleFullScreen}>
            {isFullScreen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-fullscreen-exit"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-fullscreen"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5" />
              </svg>
            )}
          </a>
          <a className="close" onClick={handlePopup}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </a>
        </div>

        {showPopup &&
          createPortal(
            <div className="popup-overlay">
              <div className="popup">
                <h2>Êtes-vous sûr de vouloir quitter ?</h2>
                <p>Vous allez être redirigé vers la page des projets.</p>
                <div className="popup-buttons">
                  <button className="popup-btn confirm" onClick={handleConfirm}>
                    Oui
                  </button>
                  <button className="popup-btn cancel" onClick={handleCancel}>
                    Annuler
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )}

        {/* Burger menu button */}
        <button
          className={`burger-menu ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </>
  );
}

export default PortfolioNavigation;
