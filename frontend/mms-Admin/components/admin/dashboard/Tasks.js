import { Col, Row, Space, Typography } from "antd";
import { Button } from "components/Button";
import { Icon } from "components/Icon/Icon";
import { Loader } from "components/Loader";
import styles from "styles/admin/dashboard.module.scss";

const Tasks = ({ tasks, loading }) => {
  const { Paragraph } = Typography;
  return (
    <div className={styles.card_container}>
      <Row justify={"space-between"}>
          <Paragraph>
            <p className={styles.card_header_text}>Tasks overview</p>
          </Paragraph>
      </Row>
      <Row gutter={[16, 16]}>
        <Col
          md={4}
          sm={24}
          className={styles.task_status_card}
        >
          <p>In Progress</p>
        </Col>
        <Col md={20} sm={24}>
          <Row gutter={[16, 16]}>
          {tasks?.map((task) => {
            return (
              <Col md={8} sm={12} xs={24} key={task.title}>
                <div className={styles.card}>
                  <Icon name="Task" width={25} height={33} color="#058b94" />
                  <Paragraph className={styles.paragraph}>
                    <p>{task.title}</p>
                    <small>
                      <Icon name="Calendar" width={18} height={18} />
                      {task.daysLeft} 2 days from now
                    </small>
                  </Paragraph>
                </div>
              </Col>
            )})}
          </Row>
        </Col>
      </Row>
      <Row justify={"end"}>
        <Space className={styles.space}>
          <Button type="primary">View all</Button>
        </Space>
      </Row>
    </div>
  );
};

export default Tasks;
