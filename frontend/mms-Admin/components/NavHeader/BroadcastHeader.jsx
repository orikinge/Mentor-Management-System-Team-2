import { Button } from "antd";
import styles from "../componentStyles/broadcast.module.css";

const BroadcastHeader = () => {
  return (
    <div className="flex flex-justify-between flex-align-center">
      <p className={styles.broadcast_title}>Broadcast Message</p>
      <Button className={styles.close_btn}>Close</Button>
    </div>
  );
};

export default BroadcastHeader;
