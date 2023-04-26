import React from 'react';
import styles from "./componentStyles/notificationicon.module.css";

const NotificationIcon = ({ count }) => {
  return (
    <div className={styles.notification_icon}>
      {count}
    </div>
  );
};

export default NotificationIcon;
