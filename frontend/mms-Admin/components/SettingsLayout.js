import React from "react";
import Sidebar from "./settings/SideBar";
import styles from "./componentStyles/settingslayout.module.css";

const SettingsLayout = ({ children }) => {
  return (
    <div className={styles.main_div}>
      <Sidebar />
      <div className={styles.sub_div}>{children}</div>
    </div>
  );
};

export default SettingsLayout;
