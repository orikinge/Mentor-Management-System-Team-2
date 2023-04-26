import PrimaryBtn from "components/Buttons/PrimaryBtn";
import { Row, Col } from "antd";
import styles from "../componentStyles/broadcast.module.css";

const BroadcastHeader = () => {
  return (
    <div className={styles.broadcast_header}>
      <Row>
        <Col span={8}>
          <p className={styles.broadcast_title}>Broadcast Message</p>
        </Col>
        <Col span={8} offset={8}>
          <PrimaryBtn />
        </Col>
      </Row>
    </div>
  );
};

export default BroadcastHeader;
