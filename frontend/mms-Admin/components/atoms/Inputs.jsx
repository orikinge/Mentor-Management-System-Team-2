import React from "react";
import styles from "./styles/inputs.module.scss";

export const Inputs = (props) => {
  if (props.type === "text")
    return (
      <div
        className={`flex flex-align-center gap-16 ${styles.input_container}`}>
        <input {...props} className={`${styles.input} ${props.className}`} />

        {props.icon ? <div>{props.icon}</div> : null}
      </div>
    );

  if (props.type === "select")
    return (
      <div className={styles.input_container}>
        <div className={`${styles.select_wrapper}`}>
          <select className={`${styles.select}`}>
            {props.options?.map((item, idx) => (
              <option key={idx} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <span class="focus"></span>
        </div>
      </div>
    );

  return <div>Inputs</div>;
};
