import React from "react";
import styles from "./styles/stats.module.scss";
import { Button } from "../../components/atoms/Button";

export const Stats = ({ icon, number, text }) => {
  return (
    <div
      className={`flex flex-justify-between flex-align-center ${styles.stats}`}>
      <div className="flex flex-align-center gap-16">
        {icon && icon}

        <div className={`flex flex-align-center gap-16 ${styles.stat}`}>
          {number && <h1 className={styles.stat_numbers}>{number}</h1>}
          {text && <p className={styles.stat_text}>{text}</p>}
        </div>
      </div>

      <div>
        <Button variant="normal" size="small">
          View
        </Button>
      </div>
    </div>
  );
};
