import React from "react";
import styles from "../componentStyles/archive.module.css";
import Icon from "../Icon";

function Archive({ searchData }) {
  return (
    <div className={styles.main_div}>
      <div className={styles.main_sub_div}>
        <div className={styles.main_sub_icon}>
          <Icon
            icon={"/assets/images/BlackGoogleLogo.svg"}
            width={"48px"}
            height={"48px"}
          />
        </div>
        <div className={styles.main_sub_content}>
          <p>Google Africa Scholarship Program</p>
          <div className={styles.main_sub_con_main}>
            <div className={styles.main_sub_con}>
              <span className={styles.main_sub_content_timeicon}>
                <Icon
                  icon={"/assets/images/ClockLogo.svg"}
                  width={"16.5px"}
                  height={"16.5px"}
                />
              </span>
              <div className={styles.main_sub_content_time}>Dec 12, 2022</div>
            </div>
            <div className={styles.main_sub_con}>
              <span className={styles.main_sub_content_timeicon1}>
                <Icon
                  icon={"/assets/images/MainClockLogo.svg"}
                  width={"18px"}
                  height={"18px"}
                />
              </span>
              <div className={styles.main_sub_content_time}>8:00 pm</div>
            </div>
            <div className={styles.main_sub_con}>
              <span className={styles.main_sub_content_archor}>
                <Icon
                  icon={"/assets/images/Archor.svg"}
                  width={"20px"}
                  height={"20px"}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Archive;
