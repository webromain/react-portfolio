// ============================================================================
// IMPORTS - Dépendances et modules
// ============================================================================
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";

// Composants de pages
import ProjectsList from "./modules/ProjectsList/ProjectsList.jsx";
import ProjectDetail from "./modules/ProjectsList/pages/ProjectDetail.jsx";
import PortfolioContact from "./modules/PortfolioContact/PortfolioContact.jsx";
import PortfolioAbout from "./modules/PortfolioAbout/PortfolioAbout.jsx";
import PortfolioCv from "./modules/PortfolioCv/PortfolioCv.jsx";

// Composants de layout
import PortfolioHeader from "./modules/PortfolioHeader/PortfolioHeader.jsx";
import PortfolioNavigation from "./modules/PortfolioNavigation/PortfolioNavigation.jsx";
import PortfolioFooter from "./modules/PortfolioFooter/PortfolioFooter.jsx";
import ThemeToggle from "./modules/ThemeToggle/ThemeToggle.jsx";

// Styles globaux
import "./index.css";

// ============================================================================
// SCROLL TO TOP - Reset le scroll à chaque navigation
// ============================================================================
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // S'il y a un hash, scroll vers l'élément avec cet ID
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 0);
        return;
      }
    }

    // Sinon, scroll au top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location]);

  return null;
}

// ============================================================================
// LAYOUT - Structure commune de la page (header + contenu + footer)
// ============================================================================
function Layout({ children }) {
  const location = useLocation();

  if (!children) {
    return null;
  }

  // Affiche le header uniquement sur la page d'accueil
  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* Header uniquement sur la page d'accueil */}
      {isHomePage && <PortfolioHeader />}

      {/* Navigation sur toutes les pages sauf page d'accueil */}
      {!isHomePage && <PortfolioNavigation />}

      {/* Contenu spécifique de la page */}
      {children}

      {/* Footer partout */}
      <PortfolioFooter />
    </>
  );
}

// ============================================================================
// APP - Routeur principal avec les différentes pages
// ============================================================================
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Page d'accueil - Liste des projets */}
        <Route
          path="/"
          element={
            <Layout>
              <ProjectsList />
              <PortfolioContact />
              <PortfolioAbout />
            </Layout>
          }
        />

        {/* Page de détail d'un projet */}
        <Route
          path="/projects/:projectSlug"
          element={
            <Layout>
              <ProjectDetail />
            </Layout>
          }
        />

        {/* Page de contact */}
        <Route
          path="/contact"
          element={
            <Layout>
              <PortfolioContact />
            </Layout>
          }
        />

        {/* Page About */}
        <Route
          path="/about"
          element={
            <Layout>
              <PortfolioAbout />
            </Layout>
          }
        />

        {/* Page CV */}
        <Route
          path="/cv"
          element={
            <Layout>
              <PortfolioCv />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

// ============================================================================
// POINT D'ENTRÉE - Rend l'application React dans le DOM
// ============================================================================
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ThemeToggle />
  </StrictMode>,
);
