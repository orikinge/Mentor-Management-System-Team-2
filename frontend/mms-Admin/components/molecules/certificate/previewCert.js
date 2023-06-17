import { PDFViewer, BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import Template from "./Certificate";
import { Button } from "../../../components/atoms/Button";
import React, { useCallback, useRef, useState } from "react";
import { toPng, toJpeg } from "html-to-image";
import NoSSRWrapper from "components/DisableSSR";

const CertificatePreview = ({ data }) => {
  return (
    <NoSSRWrapper>
      <div style={{ flexGrow: 1 }}>
        <PDFViewer
          showToolbar={false}
          style={{
            width: "100%",
            height: "70vh",
            backgroundColor: "white",
            border: "none",
            borderStyle: "none",
          }}>
          <Template data={data} />
        </PDFViewer>
        <div></div>

        <PDFDownloadLink
          document={<Template data={data} />}
          fileName="certificate.pdf">
          {({ loading }) =>
            loading ? (
              "Loading document..."
            ) : (
              <Button variant="normal" size="large" className="mt-4">
                Download as pdf
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
    </NoSSRWrapper>
  );
};

export default CertificatePreview;
