import React from "react";
import styles from "./styles/loader.module.scss";

export const Loader = () => {
  return (
    <>
      <div
        className={`flex flex-align-center flex-justify-center ${styles.loader_wrapper}`}>
        <div className={`flex flex-column flex-align-center`}>
          <div className={`mb-1 ${styles.loader}`} />
          <p>Loading content...</p>
        </div>
      </div>
    </>
  );
};


export const CustomLoader = ({text}) => {
  return (
    <>
      <div
        className={`flex flex-align-center flex-justify-center ${styles.loader_wrapper}`}>
        <div className={`flex flex-column flex-align-center`}>
          <div className={`mb-1 ${styles.loader}`} />
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

