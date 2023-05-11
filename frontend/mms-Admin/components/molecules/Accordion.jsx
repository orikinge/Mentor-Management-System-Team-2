import React, { useState } from "react";
import styles from "./styles/accordion.module.scss";

export const Accordion = ({ header, body, footer, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.accordion}>
      <div className={styles.header} onClick={() => setOpen((prev) => !prev)}>
        {header}
      </div>
      {open && (
        <div>
          <div className={styles.accordion_body}>{body}</div>
          {footer && (
            <div className={`flex flex-justify-end ${styles.accordion_footer}`}>
              {footer}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
