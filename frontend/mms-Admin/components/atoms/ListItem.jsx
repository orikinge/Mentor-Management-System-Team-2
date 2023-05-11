import React from "react";
import styles from "./styles/list_item.module.scss";

export const ListItem = ({ className, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.wrapper} ${styles.list_item} ${className}`}>
      {children}
    </div>
  );
};
