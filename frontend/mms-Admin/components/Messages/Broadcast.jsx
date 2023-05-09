import { Icon } from "components/Icon/Icon";
import styles from "../componentStyles/broadcast.module.css";

const BroadcastMessage = ({ message, sender, time, date }) => {
  return (
    <div className={styles.broadcast_message}>
      <p className={styles.date}>{date}</p>
      <div className={styles.text_message}>
        <p className={styles.message}>{message}</p>

        <div className="flex flex-justify-between flex-align-center">
          <p className={styles.sender}>{sender}</p>
          <p className={styles.time}>
            {time}
            <span className={styles.double_check}>
              <Icon name="DoubleCheck" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BroadcastMessage;
