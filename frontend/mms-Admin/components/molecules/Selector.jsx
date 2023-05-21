import React from "react";
import { Icons } from "../../components/atoms/Icons";
import { Button } from "../../components/atoms/Button";
import styles from "./styles/selector.module.scss";

export const Selector = ({ showUserList }) => {
  return (
    <div className={`flex flex-align-center gap-16 ${styles.select_box}`}>
      <div className={`flex flex-column flex-justify-center`}>
        <h1>Add Mentor Manager</h1>
        <div className={`flex gap-16 flex-align-center ${styles.select_count}`}>
          <p>09 Selected </p>
          <Icons name="remove-tag" />
        </div>
      </div>
      <div>
        <Button onClick={showUserList} variant="normal" size="small">
          Select
        </Button>
      </div>
    </div>
  );
};
