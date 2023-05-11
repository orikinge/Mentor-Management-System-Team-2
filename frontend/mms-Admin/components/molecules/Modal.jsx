import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/modal.module.scss";
import { Icons } from "../atoms/Icons";

function Modal({ show, children }) {
  // capture if the component has been rendered on client.
  const [isBrowser, setIsBrowser] = useState(false);

  // update isBrowser value once component has rendered.
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className={`flex flex-align-center ${styles.modal_content_wrapper}`}>
      <div className={styles.modal_content}>
        <div className={styles.modal_body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root"),
    );
  } else {
    return null;
  }
}

export default Modal;
