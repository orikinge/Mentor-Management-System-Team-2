import React from "react";
import Image from "next/image";
import styles from "./componentStyles/splashscreen.module.css";

function SplashScreen() {
  return (
    <div>
      <div className={styles.container}>
        <Image
          src="/assets/images/logo.png"
          width="224.27px"
          height="200px"
          alt="site_logo"
        />
      </div>
      <p className={styles.logo_text}>Mentor Management System</p>
    </div>
  );
}

export default SplashScreen;
