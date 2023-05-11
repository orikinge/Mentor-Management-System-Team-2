import React, { useCallback, useRef, useState } from "react";
import { toPng, toJpeg } from "html-to-image";
import Image from "next/image";
import styles from "./styles/certificates.module.scss";
import { Select } from "antd";
import { Button } from "../../components/atoms/Button";

const Certificate = ({
  logoURL,
  badgeURL,
  signatureURL,
  certification,
  fullName,
}) => {
  const ref = useRef(null);
  const [downloadFormat, setDownloadFormat] = useState("JPG");
  const [imageJPG, setImageJPG] = useState();

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toJpeg(ref.current, { quality: 0.95 }).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = dataUrl;
      link.click();
      setImageJPG(dataUrl);
    });
  }, [ref]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <div
        className={`flex flex-justify-center flex-column ${styles.wrapper}`}
        ref={ref}>
        <div className="flex flex-justify-center">
          <Image width={250} height={80} alt="logo" src={logoURL} />
        </div>

        <p className="flex flex-justify-center">This acknowledges that</p>

        <h1 className={`flex flex-justify-center ${styles.bearer_name}`}>
          {fullName}
        </h1>

        <p className="flex flex-justify-center">
          Has successfully completed all the requirements to be recognized as
        </p>

        <p
          className={`flex flex-justify-center ${styles.certification_lead_text}`}>
          GOOGLE CLOUD CERTIFIED
        </p>

        <h1 className={`flex flex-justify-center ${styles.certification_text}`}>
          {certification}
        </h1>

        <div className={`flex flex-justify-between`}>
          <div>
            <Image width={50} height={50} alt="signature" src={signatureURL} />
          </div>
          <Image width={80} height={80} alt="badge" src={badgeURL} />
        </div>
      </div>

      <div className="flex flex-justify-end flex-align-center gap-10">
        <p>Download as: </p>
        <Select
          className={styles.download_format_options}
          defaultValue={downloadFormat}
          onChange={handleChange}
          options={[
            {
              value: "JPG",
              label: "JPG",
            },
          ]}
        />
        <Button onClick={onButtonClick} variant="normal" size="large">
          Download
        </Button>
      </div>
    </>
  );
};

export default Certificate;
