import { useEffect } from "react";
import pdfUrl from "./../../assets/pdf/romain-poisson-cv.pdf";

function PortfolioCv() {
  useEffect(() => {
    window.location.replace(pdfUrl);
  }, []);

  return null;
}

export default PortfolioCv;
