import Image from "next/image";
import React from "react";
import { Button } from "../atoms/Button";
import styles from "./styles/modal.module.scss";

export const ShareReportConfirmationDialogue = ({ onClose, onConfirm }) => {
  return (
    <div className="flex flex-column flex-align-center">
      <h1 className={styles.modal_title}>Share report via email</h1>
      <Image
        width={300}
        height={300}
        src="/assets/images/send-via-email.svg"
        alt="Send via email"
      />
      <div className={`flex gap-16 flex-align-center`}>
        <Button variant="white" bordered size="large" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="normal" bordered size="large" onClick={onConfirm}>
          Open Email App
        </Button>
      </div>
    </div>
  );
};
