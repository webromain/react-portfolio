import "./PortfolioHeader.css";
import PortfolioNavigation from "../PortfolioNavigation/PortfolioNavigation.jsx";
import { useEffect, useRef } from "react";

function PortfolioHeader() {
  const titleRef = useRef(null);
  const h3Ref = useRef(null);
  const h4Ref = useRef(null);
  const pRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const typeTextWithSpans = (element, speed = 10, delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Sauvegarder le HTML original pour garder les spans
        const originalHTML = element.innerHTML;

        // Extraire tout le texte visible (incluant les spans)
        const getAllText = (el) => {
          let text = "";
          for (let node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
              text += node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              text += getAllText(node);
            }
          }
          return text;
        };

        const fullText = getAllText(element);
        let displayText = "";
        let index = 0;

        element.style.visibility = "visible";
        element.innerHTML = ""; // Vider le contenu

        const timer = setInterval(() => {
          if (index < fullText.length) {
            displayText += fullText[index];

            // Reconstruire le HTML progressivement en gardant la structure
            let rebuilt = "";
            let charCount = 0;
            let htmlIndex = 0;

            for (let i = 0; i <= displayText.length; i++) {
              // Parcourir l'HTML original et reconstruire jusqu'à la position correcte
              if (htmlIndex < originalHTML.length) {
                const char = originalHTML[htmlIndex];
                rebuilt += char;

                // Compter les caractères visibles (pas les tags)
                if (char !== "<" && char !== ">") {
                  if (!originalHTML.substring(htmlIndex).startsWith("</")) {
                    const isInTag =
                      originalHTML.lastIndexOf("<", htmlIndex) >
                      originalHTML.lastIndexOf(">", htmlIndex);
                    if (!isInTag) charCount++;
                  }
                }

                if (charCount > displayText.length) break;
                htmlIndex++;
              }
            }

            // Approche plus simple: reconstruire depuis le HTML original
            let result = "";
            let visibleCount = 0;
            for (
              let i = 0;
              i < originalHTML.length && visibleCount < displayText.length;
              i++
            ) {
              result += originalHTML[i];

              // Compter les caractères visibles
              if (originalHTML[i] !== "<") {
                const isInTag =
                  originalHTML.lastIndexOf("<", i) >
                  originalHTML.lastIndexOf(">", i);
                if (!isInTag) visibleCount++;
              }
            }

            element.innerHTML = result;
            index++;
          } else {
            clearInterval(timer);
            element.innerHTML = originalHTML;
            resolve();
          }
        }, speed);
      }, delay);
    });
  };

  const typeText = (element, speed = 10, delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const originalText = element.textContent;
        let displayedText = "";
        let index = 0;

        // Vider le texte puis le rendre visible pour éviter de voir le texte complet
        element.textContent = "";
        element.style.visibility = "visible";

        const timer = setInterval(() => {
          if (index < originalText.length) {
            displayedText += originalText[index];
            element.textContent = displayedText;
            index++;
          } else {
            clearInterval(timer);
            element.textContent = originalText; // Restaurer le texte complet à la fin
            resolve();
          }
        }, speed);
      }, delay);
    });
  };

  useEffect(() => {
    // Éviter de réexécuter l'animation avec un useRef
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const animate = async () => {
      if (titleRef.current && h3Ref.current && h4Ref.current && pRef.current) {
        await typeTextWithSpans(titleRef.current, 16, 100);
        await typeText(h3Ref.current, 2, 100);
        await typeText(h4Ref.current, 2, 100);
        pRef.current.style.opacity = "1";
      }
    };

    animate();
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("light");
    localStorage.setItem(
      "theme",
      html.classList.contains("light") ? "light" : "dark",
    );
  };

  // Charger le thème sauvegardé au montage
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
    }
  }

  return (
    <header className="portfolio-header">
      <PortfolioNavigation />
      <div className="wrapper">
        <div className="command-line">
          <h2
            className="portfolio-title"
            ref={titleRef}
            style={{ visibility: "hidden" }}
          >
            <span>Romain@POISSON</span>:<span>~</span>$
          </h2>
          <div className="cursor"></div>
        </div>
        <div className="portfolio-subtitle">
          <h3 ref={h3Ref} style={{ visibility: "hidden" }}>
            Développeur Full Stack & Data/IA
          </h3>
          <h4 ref={h4Ref} style={{ visibility: "hidden" }}>
            EPSI - Ecole d'ingénierie informatique - Paris
          </h4>
          <p
            ref={pRef}
            style={{ opacity: 0, transition: "opacity 0.3s ease" }}
          >
            Je suis une personne sérieuse et persévérante, aimant la rigueur
            et le travail bien fait.
          </p>
        </div>
        <div className="socials">
          <a
            href="https://github.com/webromain"
            className="github"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-github"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/romain-poisson-1a493726a/"
            className="linkedin"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-linkedin"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/romain.web"
            className="instagram"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
            Instagram
          </a>
          <a href="/cv" className="cv">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-file-earmark-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0m2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755" />
            </svg>
            CV
          </a>
        </div>
        <div className="skills">
          <div className="html">
            <div className="bullet"></div>
            <div>HTML/CSS</div>
          </div>
          <div className="react">
            <div className="bullet"></div>
            <div>React</div>
          </div>
          <div className="php">
            <div className="bullet"></div>
            <div>PHP</div>
          </div>
          <div className="javascript">
            <div className="bullet"></div>
            <div>JavaScript</div>
          </div>
          <div className="python">
            <div className="bullet"></div>
            <div>Python & Panda</div>
          </div>
          <div className="django">
            <div className="bullet"></div>
            <div>Django</div>
          </div>
          <div className="cpp">
            <div className="bullet"></div>
            <div>C++</div>
          </div>
          <div className="wordpress">
            <div className="bullet"></div>
            <div>Wordpress & Prestashop</div>
          </div>
          <div className="sql">
            <div className="bullet"></div>
            <div>SQL</div>
          </div>
          <div className="github">
            <div className="bullet"></div>
            <div>GitHub</div>
          </div>
        </div>
        <div className="theme" onClick={toggleTheme}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-moon-stars-fill"
            viewBox="0 0 16 16"
          >
            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default PortfolioHeader;
