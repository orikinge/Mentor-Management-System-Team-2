import React from "react";
import { Icons } from "../../components/atoms/Icons";
import { Button } from "../../components/atoms/Button";
import styles from "./styles/selector.module.scss";

export const Selector = ({ showUserList, title, value, type }) => {
  return (
    <div className={`flex flex-align-center gap-16 ${styles.select_box}`}>
      <div className={`flex flex-column flex-justify-center`}>
        <h1>{title}</h1>
        <div className={`flex gap-16 flex-align-center ${styles.select_count}`}>
          <p>{value} Selected </p>
          <Icons name="remove-tag" />
        </div>
      </div>
      <div>
        {type === "link" ? (
          <a href="/criteria-setup" target="_blank">
            <Button variant="normal" size="small">
              Select
            </Button>
          </a>
        ) : (
          <Button onClick={showUserList} variant="normal" size="small">
            Select
          </Button>
        )}
      </div>
    </div>
  );
};
