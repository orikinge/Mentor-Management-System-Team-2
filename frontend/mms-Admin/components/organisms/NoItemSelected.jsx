import React from "react";
import styles from "./styles/empty_screen.module.scss";
import { Icons } from "../atoms/Icons";

const NoItemSelected = () => {
  return (
    <div
      className={`flex flex-align-center flex-justify-center ${styles.empty_report_screen}`}>
      <div className="flex flex-column flex-align-center">
        <Icons name="report-details" />
        <h1>No item selected yet </h1>
        <p>Select an item from the list to view report details</p>
      </div>
    </div>
  );
};

export default NoItemSelected;
