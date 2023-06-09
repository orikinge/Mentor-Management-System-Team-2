// import logo from './images/logo.png';
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const myStyle = {
  backgroundImage: "url('/assets/images/mentor_certificate.svg')",
  height: "80vh",
  // marginTop:'-70px',
  fontSize: "50px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  overflowYy: "scroll"
};

function ReactPdf() {
  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("l", "in",[8.5,11]);
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("cert.pdf");
    });
  };

  return (
    <div className="wrapper">
      <div className="receipt-box">
        <div className="actual-receipt" style={myStyle}>
          <h4>Here</h4>
          <h4>Here</h4>
          <h4>Here</h4>
        </div>
        {/* end of actual receipt */}

        {/* receipt action */}
        <div className="receipt-actions-div">
          <div className="actions-right">
            <button
              className="receipt-modal-download-button"
              onClick={downloadPDF}
              disabled={!(loader === false)}>
              {loader ? <span>Downloading</span> : <span>Download</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactPdf;
