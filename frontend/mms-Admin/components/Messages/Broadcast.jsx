import { Icon } from "components/Icon/Icon";
import styles from "../componentStyles/broadcast.module.css";
import { Row, Col } from "antd";
const Broadcast = ({ message, sender, time, date }) => {
  return (
    <div className={styles.broadcast_message}>
      <p className={styles.date}>{date}</p>
      <div className={styles.text_message}>
        <p className={styles.message}>{message}</p>
        <div></div>
        <Row className={styles.message_footer}>
          <Col span={8}>
            <p className={styles.sender}>{sender}</p>
          </Col>
          <Col span={8} offset={8}>
            <p className={styles.time}>
              {time}
              <span className={styles.double_check}>
                <Icon name="DoubleCheck" />
              </span>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Broadcast;
