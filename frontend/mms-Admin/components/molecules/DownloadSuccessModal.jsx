import React from "react";
import styles from "./styles/modal.module.scss";
import Image from "next/image";
import { Button } from "../atoms/Button";

export const DownloadSuccessModal = ({ onClose, onConfirm }) => {
  return (
    <div className="flex flex-column flex-align-center">
      <h1 className={styles.modal_title}>Report Downloaded Successfully!</h1>
      <Image
        width={300}
        height={300}
        src="/assets/images/report-sent.svg"
        alt="download report"
      />
      <div className={`flex gap-16 flex-align-center`}>
        <Button variant="normal" bordered size="large" onClick={onConfirm}>
          Done
        </Button>
      </div>
    </div>
  );
};
