import { Avatar, Card, Space, Col, Row } from "antd";
import cardStyle from "../styles/admin/about.module.css";
import Icon from "./Icon";
import { Icon as Iconn } from "./Icon/Icon";
import styles from "./componentStyles/customCard.module.css";

export const PostCard = ({ data }) => {
  return (
    <Row className={styles.container_width} sm={24}>
      <Card className={styles.card}>
        <Row span={24} className={styles.row_justify}>
          <div className={cardStyle.about_header}>
            <Avatar
              size={45}
              icon={
                <Icon
                  icon={"/assets/images/admin_avatar.png"}
                  width={"45px"}
                  height={"45px"}
                />
              }
            />
            <div style={{ marginLeft: "18px" }} className={styles.profile}>
              <p className={styles.title}>Alison Davis</p>
              <p className={styles.role}>Mentor Manager</p>
            </div>
          </div>

          <Iconn name="Horizon" />
        </Row>
        <div className={styles.row_mt}>
          <p className={styles.data_title}>{data.title.toUpperCase()}</p>
        </div>
        <Row >
          <div className={styles.data_post}>
            <p>{data.post}</p>
          </div>
        </Row>
        <Row className={styles.icons_container}>
          <Col className={styles.icons} sm={3}>
            <Iconn name="Comment" />
            <Iconn name="Share" />
            <Iconn name="BookMark" />
          </Col>
          <Col sm={21} className={styles.clock_icon}>
            <Iconn name="Clock" />
          </Col>
        </Row>
      </Card>
    </Row>
  );
};
