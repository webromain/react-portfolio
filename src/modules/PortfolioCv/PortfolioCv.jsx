import "./PortfolioCv.css";
import srcportfolio from "./../../assets/pdf/romain-poisson-cv.pdf";

function PortfolioCv() {
  return (
    <section id="cv" className="cv-section">
      {/* En-tête */}
      <div className="cv-header">
        <h2 className="section-title">$ CV</h2>
        {/* <p className="cv-subtitle">
          Développeur Full Stack en alternance avec une passion pour
          l'innovation
        </p> */}
      </div>
      <div className="cv-content">
        <iframe src={srcportfolio} />
      </div>
    </section>
  );
}

export default PortfolioCv;
